// Navbar component
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.webp"; 
export default function AuthNavbar() {
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-md flex items-center justify-start">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </Link>
    </nav>
  );
}
