// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const auth = useAuth();
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <div className="text-xl font-bold">Kryptodian</div>
        <Link to="/" className="hover:underline mt-1">
          Dashboard
        </Link>
        <Link to="/portfolio" className="hover:underline mt-1">
          Fund
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm">
          {auth.user?.first_name} {auth.user?.last_name}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
