import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/images/contactImage.jpg";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading, signInWithPassword } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirectTo = redirectParam
    ? decodeURIComponent(redirectParam)
    : "/";

  useEffect(() => {
    if (!authLoading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [authLoading, user, redirectTo, navigate]);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear errors when user starts typing
    setError("");
    setValidationErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // LOGIN WITH EMAIL & PASSWORD
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setError("");
    setValidationErrors({});

    // Validation
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError("Please fix the errors above and try again");
      toast.error("Please check the form for errors");
      return;
    }

    setLoading(true);

    try {
      // Use AuthContext signIn so provider updates profile/session
      const response = await signInWithPassword(formData.email, formData.password);

      if (!response) {
        throw new Error("Invalid User. Please sign up.");
      }

      // Check if user has required fields
      if (!response.token || !response.user) {
        throw new Error("Login response missing required data");
      }

      toast.success("Login successful! Redirecting...");

      // Navigate after a brief delay to allow state updates
      setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, 800);
    } catch (err) {
      console.error("Login Error:", err);
      const errorMsg = err.message || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      setLoading(true); 
      
      // Get the site URL for OAuth redirect
      const envSite = import.meta.env.VITE_SITE_URL || 
                      (typeof window !== "undefined" ? window.location.origin : "");
      
      const redirectUrl = `${envSite}/auth/callback`;

      console.debug("[Auth] Redirecting to:", redirectUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { 
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });

      if (error) {
        console.error("[Auth] supabase signInWithOAuth error:", error);
        throw error;
      }

      console.debug("[Auth] supabase signInWithOAuth data:", data);

      // Supabase SDK handles navigation to auth URL automatically
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error(err?.message || "Google sign-in failed!");
      setLoading(false);
    }
  };

 
  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={loginImage}
          alt="Login Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute z-10 flex flex-col justify-center h-full px-20 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <br /> Intern
            <span className="text-yellow-500">Matrix</span>
          </h1>
          <p className="text-gray-200 text-lg">
            Master coding with expert-driven courses. Login to continue your
            journey.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 md:px-16 lg:px-24 py-10">
        <div className="w-full max-w-[450px]">
          <div className="mb-10">
            <p className="text-gray-500 text-sm font-semibold tracking-wider mb-2">
              Start Learning
            </p>
            <h2 className="text-4xl font-bold text-black">
              Login to Account
              <div className="h-1.5 bg-yellow-500 w-16 mt-3 rounded-full"></div>
            </h2>
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-6">
            {/* ERROR MESSAGE */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold text-sm">{error}</p>
              </div>
            )}

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className={`w-full p-3 bg-gray-50 border rounded-lg transition ${
                  validationErrors.email
                    ? "border-red-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                }`}
              />
              {validationErrors.email && (
                <p className="text-red-600 text-xs font-semibold">{validationErrors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className={`w-full p-3 bg-gray-50 border rounded-lg pr-12 transition ${
                  validationErrors.password
                    ? "border-red-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                }`}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 cursor-pointer hover:text-gray-700"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {validationErrors.password && (
                <p className="text-red-600 text-xs font-semibold">{validationErrors.password}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-yellow-600"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-yellow-400 py-3 rounded-lg font-bold hover:-translate-y-1 transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "LOG IN"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-0.5 bg-gray-200 w-full"></div>
            <p className="text-gray-400 text-sm font-medium">OR</p>
            <div className="h-0.5 bg-gray-200 w-full"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center gap-3 border py-3 rounded-lg hover:bg-gray-50"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold hover:text-yellow-600 underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        pauseOnHover={false}
      />
    </div>
  );
}
 