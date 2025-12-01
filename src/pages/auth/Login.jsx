 




import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/images/contactImage.jpg";
import { supabase } from "../../services/supabaseClient";
import { useAuth } from "../../context/AuthContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirectTo = redirectParam ? decodeURIComponent(redirectParam) : "/dashboard";

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
  };

  // LOGIN WITH EMAIL & PASSWORD
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast.success("You're logged in! Redirecting...");
      navigate(redirectTo, { replace: true });

    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}${redirectTo}` },
      });

      if (error) throw error;

    } catch (err) {
      console.error("Google Login Error:", err.message);
      toast.error("Google sign-in failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 relative">
        <img src={loginImage} alt="Login Visual" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute z-10 flex flex-col justify-center h-full px-20 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <br /> Dev<span className="text-yellow-500">Skills</span>
          </h1>
          <p className="text-gray-200 text-lg">
            Master coding with expert-driven courses. Login to continue your journey.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 md:px-16 lg:px-24 py-10">
        <div className="w-full max-w-[450px]">

          <div className="mb-10">
            <p className="text-gray-500 text-sm font-semibold tracking-wider mb-2">Start Learning</p>
            <h2 className="text-4xl font-bold text-black">
              Login to Account
              <div className="h-1.5 bg-yellow-500 w-16 mt-3 rounded-full"></div>
            </h2>
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-6">
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg pr-12"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-yellow-600">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-black text-yellow-400 py-3 rounded-lg font-bold hover:-translate-y-1 transition" disabled={loading}>
              {loading ? "Signing in..." : "LOG IN"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-0.5 bg-gray-200 w-full"></div>
            <p className="text-gray-400 text-sm font-medium">OR</p>
            <div className="h-0.5 bg-gray-200 w-full"></div>
          </div>

          <button onClick={handleGoogleLogin} className="w-full flex items-center gap-3 border py-3 rounded-lg hover:bg-gray-50">
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold hover:text-yellow-600 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} pauseOnHover={false} />
    </div>
  );
}
