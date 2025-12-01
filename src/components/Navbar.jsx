import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/icon.webp";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuClass = ({ isActive }) =>
    `relative group ${isActive ? "text-yellow-400" : "text-white"} transition`;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut();
      setMenuOpen(false);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Intern Matrix Logo"
            className="w-9 h-9 object-contain"
          />
          <h2 className="text-white text-2xl font-bold tracking-wide">
            Intern<span className="text-yellow-400">Matrix</span>
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          <NavLink to="/" className={menuClass}>
            Home
          </NavLink>
          <NavLink to="/course" className={menuClass}>
            Courses
          </NavLink>
          
          <NavLink to="/verify" className={menuClass}>
            Verify Certificate
          </NavLink>
          <NavLink to="/contact" className={menuClass}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={menuClass}>
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {user ? (
            <>
              <div className="flex flex-col items-end mr-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-300/80">
                  Logged in
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full cursor-pointer"
              >
                {profile?.full_name || user.email}
              </button>
              {/* <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-500/10 transition disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button> */}

              {menuOpen && (
                <div className="absolute right-0 top-14 bg-black text-white rounded-lg shadow-xl py-3 px-4 space-y-3 w-48">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-yellow-400"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to={`/login?redirect=${encodeURIComponent(
                  location.pathname + location.search
                )}`}
                className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full font-semibold cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 px-6 pb-6 space-y-4 flex flex-col text-white">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="/course"
            onClick={() => setOpen(false)}
            className="hover:text-yellow-400"
          >
            Courses
          </Link>
          <Link
            to="/verify"
            onClick={() => setOpen(false)}
            className="hover:text-yellow-400"
          >
            Verify Certificate
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-yellow-400"
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="hover:text-yellow-400"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <>
              <div className="text-left">
                <p className="text-xs text-white/60 uppercase tracking-[0.25em] mb-1">
                  Logged in
                </p>
                <button className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full w-full">
                  {profile?.full_name || user.email}
                </button>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-red-600 text-white rounded-full w-full font-semibold disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/login?redirect=${encodeURIComponent(
                  location.pathname + location.search
                )}`}
                className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full w-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full w-full font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
