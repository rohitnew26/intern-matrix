// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import signupImage from "../../assets/images/contactImage.jpg";
// import { supabase } from "../../services/supabaseClient";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const Signup = () => {
//   const navigate = useNavigate();

//   const [accountType, setAccountType] = useState("student");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const { data, error } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/login`,
//           data: {
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             accountType,
//           },
//         },
//       });

//       if (error) throw error;

//       alert(
//         "Signup successful!\n\nPlease verify your email. A verification link has been sent to your email address."
//       );

//       navigate("/login");

//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: { redirectTo: `${window.location.origin}/dashboard` },
//       });

//       if (error) throw error;

//     } catch (err) {
//       console.error(err);
//       alert("Google sign-in failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full font-sans">
//       {/* LEFT SIDE IMAGE */}
//       <div className="hidden lg:flex w-1/2 relative">
//         <img
//           src={signupImage}
//           alt="Signup Visual"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/60"></div>

//         <div className="absolute z-10 flex flex-col justify-center h-full px-20 text-white">
//           <h1 className="text-5xl font-bold mb-6">
//             Join the <br />
//             Inten<span className="text-yellow-500">Matrix</span> Community
//           </h1>
//           <p className="text-gray-200 text-lg leading-relaxed">
//             Build skills for today, tomorrow, and beyond.
//             Education to future-proof your career.
//           </p>
//         </div>
//       </div>

//       {/* RIGHT FORM SECTION */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 md:px-16 lg:px-24 py-10">

//         <div className="w-full max-w-[500px]">
//           {/* HEADER */}
//           <div className="mb-8">
//             <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
//               Free Register
//             </p>
//             <h2 className="text-4xl font-bold text-black">
//               Create an Account
//               <div className="h-1.5 rounded-full bg-yellow-500 w-16 mt-3"></div>
//             </h2>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
//             {/* NAME ROW */}
//             <div className="flex flex-col md:flex-row gap-5">
//               <div className="flex flex-col gap-2 w-full">
//                 <label className="text-sm font-semibold text-gray-700">First Name</label>
//                 <input
//                   required
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleOnChange}
//                   placeholder="John"
//                   className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
//                 />
//               </div>

//               <div className="flex flex-col gap-2 w-full">
//                 <label className="text-sm font-semibold text-gray-700">Last Name</label>
//                 <input
//                   required
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleOnChange}
//                   placeholder="Doe"
//                   className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* EMAIL */}
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-semibold text-gray-700">Email Address</label>
//               <input
//                 required
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleOnChange}
//                 placeholder="Enter your email"
//                 className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
//               />
//             </div>

//             {/* PASSWORD ROW */}
//             <div className="flex flex-col md:flex-row gap-5">
//               <div className="flex flex-col gap-2 w-full relative">
//                 <label className="text-sm font-semibold text-gray-700">Password</label>
//                 <input
//                   required
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleOnChange}
//                   placeholder="Create password"
//                   className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg pr-10"
//                 />
//                 <span
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-10 mt-1 cursor-pointer text-gray-500 text-lg"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </span>
//               </div>

//               <div className="flex flex-col gap-2 w-full relative">
//                 <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
//                 <input
//                   required
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleOnChange}
//                   placeholder="Confirm password"
//                   className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg pr-10"
//                 />
//                 <span
//                   onClick={() => setShowConfirmPassword((prev) => !prev)}
//                   className="absolute right-3 top-10 mt-1 cursor-pointer text-gray-500 text-lg"
//                 >
//                   {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </span>
//               </div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-4 w-full bg-black text-yellow-400 py-2.5 rounded-lg font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
//             >
//               {loading ? "Creating Account..." : "CREATE ACCOUNT"}
//             </button>
//           </form>

//           {/* DIVIDER */}
//           <div className="flex items-center gap-4 my-6">
//             <div className="h-0.5 bg-gray-200 w-full"></div>
//             <p className="text-gray-400 text-sm font-medium">OR</p>
//             <div className="h-0.5 bg-gray-200 w-full"></div>
//           </div>

//           {/* GOOGLE LOGIN */}
//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg hover:bg-gray-50"
//           >
//             <FcGoogle className="text-2xl" />
//             <span className="font-medium text-gray-700">Sign up with Google</span>
//           </button>

//           <p className="mt-6 text-center text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="font-bold text-black hover:text-yellow-600 underline underline-offset-4">
//               Log In
//             </Link>
//           </p>
//         </div>
//       </div>

      
//       <ToastContainer position="top-right" autoClose={2500} pauseOnHover={false} />
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../../assets/images/contactImage.jpg";
import { supabase } from "../../services/supabaseClient";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("student");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            accountType,
          },
        },
      });

      if (error) throw error;

      toast.success(
        "Signup successful! Please verify your email. A verification link has been sent."
      );

      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });

      if (error) throw error;

    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={signupImage}
          alt="Signup Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute z-10 flex flex-col justify-center h-full px-20 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Join the <br />
            Inten<span className="text-yellow-500">Matrix</span> Community
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Build skills for today, tomorrow, and beyond.
            Education to future-proof your career.
          </p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 md:px-16 lg:px-24 py-10">

        <div className="w-full max-w-[500px]">
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
              Free Register
            </p>
            <h2 className="text-4xl font-bold text-black">
              Create an Account
              <div className="h-1.5 rounded-full bg-yellow-500 w-16 mt-3"></div>
            </h2>
          </div>

          {/* FORM */}
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-semibold text-gray-700">First Name</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                  placeholder="John"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                  placeholder="Doe"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>
            </div>

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
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-2 w-full relative">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Create password"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-10 mt-1 cursor-pointer text-gray-500 text-lg"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="flex flex-col gap-2 w-full relative">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm password"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg pr-10"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-10 mt-1 cursor-pointer text-gray-500 text-lg"
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-black text-yellow-400 py-2.5 rounded-lg font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-0.5 bg-gray-200 w-full"></div>
            <p className="text-gray-400 text-sm font-medium">OR</p>
            <div className="h-0.5 bg-gray-200 w-full"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg hover:bg-gray-50"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium text-gray-700">Sign up with Google</span>
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-black hover:text-yellow-600 underline underline-offset-4">
              Log In
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} pauseOnHover={false} />
    </div>
  );
};

export default Signup;
