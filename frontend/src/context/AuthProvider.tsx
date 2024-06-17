import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthLoginMutation } from "../hooks/useAuth";

interface AuthContextType {
  user: UserType | null;
  token: string;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

interface UserType {
  first_name: string;
  last_name: string;
}

interface LoginData {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const authLoginMutation = useAuthLoginMutation();

  const getUserFromLocalStorage = (): UserType | null => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        console.error("Error parsing user JSON:", error);
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState<UserType | null>(getUserFromLocalStorage());
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  const loginAction = async (data: LoginData) => {
    authLoginMutation.mutate(data, {
      onSuccess: (res) => {
        const { token, first_name, last_name } = res;
        setUser({ first_name, last_name });
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ first_name, last_name }));
        navigate("/");
        return;
      },
      onError: (error) => {
        console.error("Error ", error);
        alert("Email or password invalid");
      },
    });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("marketPricesFavorite");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
