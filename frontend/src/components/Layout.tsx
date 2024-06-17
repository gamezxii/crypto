import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar />
      <div className="container mx-auto p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
