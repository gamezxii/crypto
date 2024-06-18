import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">CRYPTO</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/portfolio" className="hover:underline">
            Fund
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm hidden md:block">
          {auth.user?.first_name} {auth.user?.last_name}
        </div>
        <button onClick={handleLogout} className="focus:outline-none">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 0.45 0.45"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-200"
          >
            <path
              d="m0.405 0.225 -0.09 0.098m0.09 -0.098 -0.09 -0.09m0.09 0.09H0.12m0.12 0.18H0.045v-0.36H0.24"
              strokeWidth="0.03"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
