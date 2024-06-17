import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../components/react-hook-form/input";
import { PasswordInput } from "../components/react-hook-form/PasswordInput";
import { useAuth } from "../context/AuthProvider";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const methods = useForm<FormData>({ mode: "onChange" });
  const { loginAction } = useAuth();

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    loginAction({ username: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212528]">
      <div className="bg-[#212528] p-10 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-white">CRYPTO</h1>
          <p className="text-gray-400">Secure your digital assets</p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
            />
            <PasswordInput
              id="password"
              name="password"
              placeholder="Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-full font-bold ${
                isValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-600 cursor-not-allowed text-gray-500"
              }`}
            >
              Sign In
            </button>
          </form>
        </FormProvider>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
