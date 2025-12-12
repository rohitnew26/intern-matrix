// // import React, { useState } from "react";
// // import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import logo from "../assets/images/icon.webp";

// // const NavBar = () => {
// //   const [open, setOpen] = useState(false);
// //   const [isLoggingOut, setIsLoggingOut] = useState(false);

// //   const { user, profile, signOut } = useAuth();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const displayName = profile?.full_name || user?.email || "User";
// //   const initials = displayName
// //     .split(" ")
// //     .map((s) => s?.[0] || "")
// //     .join("")
// //     .slice(0, 2)
// //     .toUpperCase();

// //   const menuClass = ({ isActive }) =>
// //     `relative group ${isActive ? "text-yellow-400" : "text-white"} transition`;

// //   const handleLogout = async () => {
// //     if (isLoggingOut) return;
// //     setIsLoggingOut(true);
// //     try {
// //       await signOut();
// //       setOpen(false);
// //       navigate("/login");
// //       setTimeout(() => {
// //         window.location.reload();
// //       }, 100);
// //     } catch (err) {
// //       console.error("Logout failed", err);
// //     } finally {
// //       setIsLoggingOut(false);
// //     }
// //   };

// //   return (
// //     <nav className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg">
// //       <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
// //         {/* Logo */}
// //         <Link to="/" className="flex items-center gap-2">
// //           <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
// //           <h2 className="text-white text-2xl font-bold tracking-wide">
// //             Intern<span className="text-yellow-400">Matrix</span>
// //           </h2>
// //         </Link>

// //         {/* Desktop Menu */}
// //         <div className="hidden md:flex items-center space-x-8 text-white">
// //           <NavLink to="/" className={menuClass}>
// //             Home
// //           </NavLink>
// //           <NavLink to="/industrial-training" className={menuClass}>
// //             Industrial Training
// //           </NavLink>

// //           <NavLink to="/online-internship" className={menuClass}>
// //             Online Internship
// //           </NavLink>
// //           <NavLink to="/verify-certificate" className={menuClass}>
// //             Verify Certificate
// //           </NavLink>
// //           <NavLink to="/contact" className={menuClass}>
// //             Contact
// //           </NavLink>
// //         </div>

// //         {/* Desktop Auth */}
// //         <div className="hidden md:flex items-center space-x-4">
// //           {user ? (
// //             <>
// //               <div className="flex flex-col items-end mr-2">
// //                 <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-300/80">
// //                   {profile?.full_name}
// //                 </span>
// //               </div>
// //               <button
// //                 onClick={() => navigate("/dashboard")}
// //                 className="flex items-center gap-3 px-3 py-1.5 border-2 border-yellow-400 text-yellow-400 rounded-full"
// //               >
// //                 {profile?.avatar_url ? (
// //                   <img
// //                     src={profile.avatar_url}
// //                     alt="Avatar"
// //                     className="w-8 h-8 rounded-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-yellow-400">
// //                     {initials}
// //                   </div>
// //                 )}
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <Link
// //                 to={`/login?redirect=${encodeURIComponent(
// //                   location.pathname + location.search
// //                 )}`}
// //                 className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full"
// //               >
// //                 Login
// //               </Link>
// //               <Link
// //                 to="/signup"
// //                 className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full font-semibold"
// //               >
// //                 Sign Up
// //               </Link>
// //             </>
// //           )}
// //         </div>

// //         {/* Hamburger Button (three-line) */}
// //         <button
// //           className="md:hidden relative w-10 h-10 flex items-center justify-center"
// //           onClick={() => setOpen(!open)}
// //           aria-label={open ? "Close menu" : "Open menu"}
// //         >
// //           <span
// //             className={`absolute block w-7 h-[2px] bg-white rounded transition-transform duration-300 ${
// //               open ? "translate-y-0 rotate-45" : "-translate-y-2"
// //             }`}
// //           />
// //           <span
// //             className={`absolute block w-7 h-[2px] bg-white rounded transition-opacity duration-200 ${
// //               open ? "opacity-0" : "opacity-100"
// //             }`}
// //           />
// //           <span
// //             className={`absolute block w-7 h-[2px] bg-white rounded transition-transform duration-300 ${
// //               open ? "translate-y-0 -rotate-45" : "translate-y-2"
// //             }`}
// //           />
// //         </button>
// //       </div>

// //       {/* Mobile Menu */}
// //       {open && (
// //         <div className="md:hidden bg-black/95 px-6 pb-6 space-y-4 flex flex-col text-white">
// //           <Link to="/" onClick={() => setOpen(false)}>
// //             Home
// //           </Link>
// //           <Link to="/industrial-training" onClick={() => setOpen(false)}>
// //             Industrial Training
// //           </Link>
// //           <Link to="/online-internship" onClick={() => setOpen(false)}>
// //             Online Internship
// //           </Link>
// //           <Link to="/verify-certificate" onClick={() => setOpen(false)}>
// //             Verify Certificate
// //           </Link>
// //           <Link to="/contact" onClick={() => setOpen(false)}>
// //             Contact
// //           </Link>

// //           {user && (
// //             <Link to="/dashboard" onClick={() => setOpen(false)}>
// //               Dashboard
// //             </Link>
// //           )}

// //           {user ? (
// //             <button
// //               onClick={() => navigate("/dashboard")}
// //               className="px-3 py-2 border-2 border-yellow-400 rounded-full"
// //             >
// //               Dashboard
// //             </button>
// //           ) : (
// //             <>
// //               <Link
// //                 to={`/login?redirect=${encodeURIComponent(
// //                   location.pathname + location.search
// //                 )}`}
// //                 className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full w-full"
// //               >
// //                 Login
// //               </Link>
// //               <Link
// //                 to="/signup"
// //                 className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full w-full font-semibold"
// //               >
// //                 Sign Up
// //               </Link>
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default NavBar;

// import React, { useState } from "react";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import logo from "../assets/images/icon.webp";

// const NavBar = () => {
//   const [open, setOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   // Desktop dropdown state
//   const [showTrainingDropdown, setShowTrainingDropdown] = useState(false);
//   const [leaveTimer, setLeaveTimer] = useState(null);

//   // Mobile dropdown state
//   const [showTraining, setShowTraining] = useState(false);

//   const { user, profile, signOut } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const displayName = profile?.full_name || user?.email || "User";
//   const initials = displayName
//     .split(" ")
//     .map((s) => s?.[0] || "")
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   const menuClass = ({ isActive }) =>
//     `relative group ${isActive ? "text-yellow-400" : "text-white"} transition`;

//   const handleLogout = async () => {
//     if (isLoggingOut) return;
//     setIsLoggingOut(true);
//     try {
//       await signOut();
//       setOpen(false);
//       navigate("/login");
//       setTimeout(() => window.location.reload(), 100);
//     } catch (err) {
//       console.error("Logout failed", err);
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <nav className="sticky top-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg">
//       <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
//           <h2 className="text-white text-2xl font-bold tracking-wide">
//             Intern<span className="text-yellow-400">Matrix</span>
//           </h2>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-8 text-white">
//           <NavLink to="/" className={menuClass}>
//             Home
//           </NavLink>
//           <NavLink to="/industrial-training" className={menuClass}>
//            Industrial Training
//           </NavLink>
//           {/* Industrial Training Dropdown with 1s stay after leave */}
//           <div
//             className="relative"
//             onMouseEnter={() => {
//               clearTimeout(leaveTimer);
//               setShowTrainingDropdown(true);
//             }}
//             onMouseLeave={() => {
//               const timer = setTimeout(() => {
//                 setShowTrainingDropdown(false);
//               }, 1000);
//               setLeaveTimer(timer);
//             }}
//           >
//             <NavLink   className={menuClass}>
//                Internship
//             </NavLink>

//             {showTrainingDropdown && (
//               <div className="absolute left-0 flex flex-col bg-black/95 text-white rounded-lg shadow-lg mt-2 w-48 border border-yellow-400/40 animate-fadeIn">
//                 <Link
//                   to="/branch/cse"
//                   className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
//                 >
//                   CSE
//                 </Link>
//                 <Link
//                   to="/branch/ece"
//                   className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
//                 >
//                   ECE
//                 </Link>
//                 <Link
//                   to="/branch/ce"
//                   className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
//                 >
//                   CE
//                 </Link>
//                 <Link
//                   to="/branch/me"
//                   className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
//                 >
//                   ME
//                 </Link>
//               </div>
//             )}
//           </div>

//           <NavLink to="/online-internship" className={menuClass}>
//             Online Internship
//           </NavLink>
//           <NavLink to="/verify-certificate" className={menuClass}>
//             Verify Certificate
//           </NavLink>
//           <NavLink to="/contact" className={menuClass}>
//             Contact
//           </NavLink>
//         </div>

//         {/* Desktop Auth */}
//         <div className="hidden md:flex items-center space-x-4">
//           {user ? (
//             <>
//               <div className="flex flex-col items-end mr-2">
//                 <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-300/80">
//                   {profile?.full_name}
//                 </span>
//               </div>

//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="flex items-center gap-3 px-3 py-1.5 border-2 border-yellow-400 text-yellow-400 rounded-full"
//               >
//                 {profile?.avatar_url ? (
//                   <img
//                     src={profile.avatar_url}
//                     alt="Avatar"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-yellow-400">
//                     {initials}
//                   </div>
//                 )}
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to={`/login?redirect=${encodeURIComponent(
//                   location.pathname + location.search
//                 )}`}
//                 className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full font-semibold"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Hamburger Button */}
//         <button
//           className="md:hidden relative w-10 h-10 flex items-center justify-center"
//           onClick={() => setOpen(!open)}
//         >
//           <span
//             className={`absolute block w-7 h-[2px] bg-white rounded transition-transform duration-300 ${
//               open ? "translate-y-0 rotate-45" : "-translate-y-2"
//             }`}
//           />
//           <span
//             className={`absolute block w-7 h-[2px] bg-white rounded transition-opacity duration-200 ${
//               open ? "opacity-0" : "opacity-100"
//             }`}
//           />
//           <span
//             className={`absolute block w-7 h-[2px] bg-white rounded transition-transform duration-300 ${
//               open ? "translate-y-0 -rotate-45" : "translate-y-2"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-black/95 px-6 pb-6 space-y-4 flex flex-col text-white">
//           <Link to="/" onClick={() => setOpen(false)}>
//             Home
//           </Link>

//           {/* Mobile Dropdown */}
//           <div className="flex flex-col">
//             <button
//               className="flex justify-between items-center w-full py-2"
//               onClick={() => setShowTraining(!showTraining)}
//             >
//               <span>Industrial Training</span>
//               <span>{showTraining ? "▲" : "▼"}</span>
//             </button>

//             {showTraining && (
//               <div className="ml-4 flex flex-col space-y-2 text-yellow-300">
//                 <Link
//                   to="/industrial-training/cse"
//                   onClick={() => setOpen(false)}
//                 >
//                   CSE
//                 </Link>
//                 <Link
//                   to="/industrial-training/ece"
//                   onClick={() => setOpen(false)}
//                 >
//                   ECE
//                 </Link>
//                 <Link
//                   to="/industrial-training/ce"
//                   onClick={() => setOpen(false)}
//                 >
//                   CE
//                 </Link>
//                 <Link
//                   to="/industrial-training/me"
//                   onClick={() => setOpen(false)}
//                 >
//                   ME
//                 </Link>
//               </div>
//             )}
//           </div>

//           <Link to="/online-internship" onClick={() => setOpen(false)}>
//             Online Internship
//           </Link>
//           <Link to="/verify-certificate" onClick={() => setOpen(false)}>
//             Verify Certificate
//           </Link>
//           <Link to="/contact" onClick={() => setOpen(false)}>
//             Contact
//           </Link>

//           {user && (
//             <Link to="/dashboard" onClick={() => setOpen(false)}>
//               Dashboard
//             </Link>
//           )}

//           {!user && (
//             <>
//               <Link
//                 to={`/login?redirect=${encodeURIComponent(
//                   location.pathname + location.search
//                 )}`}
//                 className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full w-full"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full w-full font-semibold"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;





import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/icon.webp";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Desktop dropdown state
  const [showTrainingDropdown, setShowTrainingDropdown] = useState(false);
  const [leaveTimer, setLeaveTimer] = useState(null);

  // Mobile dropdown
  const [showTraining, setShowTraining] = useState(false);

  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const displayName = profile?.full_name || user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((s) => s?.[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuClass = ({ isActive }) =>
    `relative group ${isActive ? "text-yellow-400" : "text-white"} transition`;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut();
      setOpen(false);
      navigate("/login");
      setTimeout(() => window.location.reload(), 100);
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
          <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          <h2 className="text-white text-2xl font-bold tracking-wide">
            Intern<span className="text-yellow-400">Matrix</span>
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          <NavLink to="/" className={menuClass}>Home</NavLink>

          <NavLink to="/industrial-training" className={menuClass}>
            Industrial Training
          </NavLink>

          {/* Internship Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(leaveTimer);
              setShowTrainingDropdown(true);
            }}
            onMouseLeave={() => {
              const timer = setTimeout(() => {
                setShowTrainingDropdown(false);
              }, 1000);
              setLeaveTimer(timer);
            }}
          >
            <NavLink
              to="/internship/cse"
              className={({ isActive }) =>
                `relative transition ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              Branch
            </NavLink>

            {showTrainingDropdown && (
              <div className="absolute left-0 flex flex-col bg-black/95 text-white rounded-lg shadow-lg mt-2 w-48 border border-yellow-400/40 animate-fadeIn">
                <Link to="/internship/cse" className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition">CSE, IT, IOT, AI-ML, DS</Link>
                <Link to="/internship/ece" className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition">ECE, EE, EIE, EEE</Link>
                <Link to="/internship/civil" className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition">Civil Engineering (CE)</Link>
                <Link to="/internship/me" className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition">ME, Automobile, Mechatronics</Link>
              </div>
            )}
          </div>

          <NavLink to="/online-internship" className={menuClass}>
            Online Internship
          </NavLink>
          <NavLink to="/verify-certificate" className={menuClass}>
            Verify Certificate
          </NavLink>
          <NavLink to="/contact" className={menuClass}>
            Contact
          </NavLink>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex flex-col items-end mr-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-300/80">
                  {profile?.full_name}
                </span>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-3 px-3 py-1.5 border-2 border-yellow-400 text-yellow-400 rounded-full"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-yellow-400">
                    {initials}
                  </div>
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
                className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`absolute block w-7 h-[2px] bg-white rounded transition-transform duration-300 ${
              open ? "translate-y-0 rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute block w-7 h-[2px] bg-white rounded transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block w-7 h-[2px] bg-white rounded transition-transform duration-300 ${
              open ? "translate-y-0 -rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 px-6 pb-6 space-y-4 flex flex-col text-white">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          {/* Mobile Internship Dropdown */}
          <div className="flex flex-col">
             <Link to="/industrial-training" onClick={() => setOpen(false)}>
              Industrial Training
          </Link>
            <button
              className="flex justify-between items-center w-full py-2 text-white"
              onClick={() => setShowTraining(!showTraining)}
            >
              <span>Branch</span>
              {/* <span>{showTraining ? "▲" : "▼"}</span> */}
            </button>

            {showTraining && (
              <div className="ml-4 flex flex-col space-y-2 text-yellow-300">
                <Link to="/internship/cse" onClick={() => setOpen(false)}>CSE, IT, IOT, AI-ML, DS</Link>
                <Link to="/internship/ece" onClick={() => setOpen(false)}>ECE, EE, EIE, EEE</Link>
                <Link to="/internship/civil" onClick={() => setOpen(false)}>Civil Engineering</Link>
                <Link to="/internship/me" onClick={() => setOpen(false)}>ME, Automobile</Link>
              </div>
            )}
          </div>

          <Link to="/online-internship" onClick={() => setOpen(false)}>
            Online Internship
          </Link>
          <Link to="/verify-certificate" onClick={() => setOpen(false)}>
            Verify Certificate
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          {user && (
            <Link to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}

          {!user && (
            <>
              <Link
                to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
                className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 rounded-full w-full"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-black rounded-full w-full font-semibold"
                onClick={() => setOpen(false)}
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
