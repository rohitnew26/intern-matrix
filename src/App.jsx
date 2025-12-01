  



// import React from "react";
// import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";

// import MouseTracker from "./components/common/MouseTracker";
// import TouchSpark from "./components/common/TouchSpark";
// import ScrollToTop from "./components/common/ScrollToTop";

// import Home from "./pages/Home/Home";
// import Course from "./pages/course/course";
// import CourseDetails from "./pages/course/CourseDetails";
// import CourseCard from "./pages/course/CourseCard";
// import VerifyCertificate from "./pages/Certificates/VerifyCertificate";
// import Contact from "./pages/Contact/Contact";
// import Dashboard from "./pages/UserDashboard/Dashboard";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import UserInfo from "./pages/auth/UserInfo.jsx";
// import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
// import AdminControlRoom from "./pages/Admin/AdminControlRoom";
 
// import PrivacyPolicy from './components/footer/Privacy.jsx'
// import TermsofService from './components/footer/Terms.jsx'
// import NavBar from "./components/Navbar";
// import Footer from "./components/footer/Footer";
// import About from "./pages/About/About";

// import { useAuth } from "./context/AuthContext";

// const ADMIN_EMAIL_FINGERPRINTS = ["d1294e7e"];

// const fingerprintEmail = (value = "") => {
//   const normalized = value.trim().toLowerCase();
//   let hash = 2166136261;
//   for (let i = 0; i < normalized.length; i += 1) {
//     hash ^= normalized.charCodeAt(i);
//     hash = Math.imul(hash, 16777619);
//   }
//   return (hash >>> 0).toString(16);
// };

// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Checking session...
//       </div>
//     );
//   }

//   if (!user) {
//     const redirectTarget = encodeURIComponent(location.pathname + location.search);
//     return <Navigate to={`/login?redirect=${redirectTarget}`} replace />;
//   }

//   return children;
// }

// function AdminRoute({ children }) {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Validating admin access...
//       </div>
//     );
//   }

//   if (!user) {
//     const redirectTarget = encodeURIComponent(location.pathname + location.search);
//     return <Navigate to={`/login?redirect=${redirectTarget}`} replace />;
//   }

//   const normalizedEmail = (user.email || "").toLowerCase();
//   const provider = (user.app_metadata?.provider || "").toLowerCase();
//   const emailFingerprint = fingerprintEmail(normalizedEmail);
//   const isAllowListed = ADMIN_EMAIL_FINGERPRINTS.includes(emailFingerprint);

//   if (!isAllowListed) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
//         <p className="text-2xl font-semibold mb-2">Access denied</p>
//         <p className="text-sm text-slate-300 max-w-md">
//           This admin console only allows approved gmail addresses. Please sign in with an allow-listed account to continue.
//         </p>
//       </div>
//     );
//   }

//   if (provider !== "google" && provider !== "email" && provider !== "magiclink") {
//     console.warn("AdminRoute: Allow-listed user signed in via", provider, "provider.");
//   }

//   return children;
// }

// function LegacyCourseRedirect() {
//   const { courseId } = useParams();
//   if (!courseId) {
//     return <Navigate to="/course" replace />;
//   }
//   const normalized = courseId.replace(/^\/+/, "");
//   return <Navigate to={`/${encodeURIComponent(normalized)}`} replace />;
// }

// function App() {
//   return (
//     <>
//       <MouseTracker />
//       <TouchSpark />
//       <ScrollToTop />

//       <NavBar />

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Home />
//               <CourseCard />
//               <Contact />
//             </>
//           }
//         />

//         <Route path="/course" element={<Course />} />
//         <Route path="/Course" element={<Navigate to="/course" replace />} />
//         <Route path="/courses" element={<Navigate to="/course" replace />} />
//         <Route path="/Courses" element={<Navigate to="/course" replace />} />
//         <Route path="/course/:courseId" element={<LegacyCourseRedirect />} />
//         <Route path="/details" element={<Navigate to="/course" replace />} />
//         <Route path="/details/:courseId" element={<LegacyCourseRedirect />} />
//         <Route path="/verify" element={<VerifyCertificate />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Protected dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/add-details" element={<UserInfo />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/refund-policy" element={<RefundPolicy />} />

//         <Route path="/privacy" element={<PrivacyPolicy />} />
//         <Route path="/terms" element={<TermsofService />} />
//         <Route
//           path="/admin-no-guess-no-check"
//           element={
//             <AdminRoute>
//               <AdminControlRoom />
//             </AdminRoute>
//           }
//         />

//         <Route path="/:courseSlug" element={<CourseDetails />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;




import React from "react";
import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";

import MouseTracker from "./components/common/MouseTracker";
import TouchSpark from "./components/common/TouchSpark";
import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./pages/Home/Home";
import Course from "./pages/course/course";
import CourseDetails from "./pages/course/CourseDetails";
import CourseCard from "./pages/course/CourseCard";
import VerifyCertificate from "./pages/Certificates/VerifyCertificate";
import SampleCertificate from "./pages/Certificates/SampleCertificate.jsx";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/UserDashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserInfo from "./pages/auth/UserInfo.jsx";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import AdminControlRoom from "./pages/Admin/AdminControlRoom";


// ____________Temp admin____________

import Admintemporary from "./pages/Admin/AdminTemp.jsx";
// ______________


import PrivacyPolicy from './components/footer/Privacy.jsx'
import TermsofService from './components/footer/Terms.jsx'
import NavBar from "./components/Navbar";
import Footer from "./components/footer/Footer";
import About from "./pages/About/About";

import { useAuth } from "./context/AuthContext";

const ADMIN_EMAIL_FINGERPRINTS = ["d1294e7e"];

const fingerprintEmail = (value = "") => {
  const normalized = value.trim().toLowerCase();
  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i += 1) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
};

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Checking session...
      </div>
    );
  }

  if (!user) {
    const redirectTarget = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectTarget}`} replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Validating admin access...
      </div>
    );
  }

  if (!user) {
    const redirectTarget = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectTarget}`} replace />;
  }

  const normalizedEmail = (user.email || "").toLowerCase();
  const provider = (user.app_metadata?.provider || "").toLowerCase();
  const emailFingerprint = fingerprintEmail(normalizedEmail);
  const isAllowListed = ADMIN_EMAIL_FINGERPRINTS.includes(emailFingerprint);

  if (!isAllowListed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
        <p className="text-2xl font-semibold mb-2">Access denied</p>
        <p className="text-sm text-slate-300 max-w-md">
          This admin console only allows approved gmail addresses. Please sign in with an allow-listed account to continue.
        </p>
      </div>
    );
  }

  if (provider !== "google" && provider !== "email" && provider !== "magiclink") {
    console.warn("AdminRoute: Allow-listed user signed in via", provider, "provider.");
  }

  return children;
}

function LegacyCourseRedirect() {
  const { courseId } = useParams();
  if (!courseId) {
    return <Navigate to="/course" replace />;
  }
  const normalized = courseId.replace(/^\/+/, "");
  return <Navigate to={`/${encodeURIComponent(normalized)}`} replace />;
}

function App() {
  return (
    <>
      <MouseTracker />
      <TouchSpark />
      <ScrollToTop />

      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <CourseCard />
              <Contact />
            </>
          }
        />

        <Route path="/course" element={<Course />} />
        <Route path="/Course" element={<Navigate to="/course" replace />} />
        <Route path="/courses" element={<Navigate to="/course" replace />} />
        <Route path="/Courses" element={<Navigate to="/course" replace />} />
        <Route path="/course/:courseId" element={<LegacyCourseRedirect />} />
        <Route path="/details" element={<Navigate to="/course" replace />} />
        <Route path="/details/:courseId" element={<LegacyCourseRedirect />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-details" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        
        <Route path="/sample-certificate" element={<SampleCertificate />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsofService />} />
        <Route
          path="/admin-no-guess-no-check"
          element={
            <AdminRoute>
              <AdminControlRoom />
            </AdminRoute>
          }
        />

         <Route path="/admintemporary" element={<Admintemporary />} />

        <Route path="/:courseSlug" element={<CourseDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
