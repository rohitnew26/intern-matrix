import React, { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";

import MouseTracker from "./components/common/MouseTracker";
import TouchSpark from "./components/common/TouchSpark";
import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./pages/Home/Home";
import Course from "./pages/course/course";
const CourseDetails = lazy(() => import("./pages/course/CourseDetails"));

import IndustrialTraining from "./pages/course/IndustrialTraining.jsx";
const IndustrialTrainingCard = lazy(() => import("./pages/course/IndustrialTrainingCard.jsx"));
const OnlineInternshipsCard = lazy(() => import("./pages/course/OnlineCourseCard.jsx"));

// Internship imports
const CseInternship = lazy(() => import("./pages/internship/CseInternship.jsx"));
const EceInternship = lazy(() => import("./pages/internship/EceInternship.jsx"));
const CivilInternship = lazy(() => import("./pages/internship/CivilInternship.jsx"));
const MeInternship = lazy(() => import("./pages/internship/MeInternship.jsx"));

import All_intenship from "./pages/course/All_Internship.jsx";
import VerifyCertificate from "./pages/Certificates/VerifyCertificate";
import SampleCertificate from "./pages/Certificates/SampleCertificate.jsx";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/UserDashboard/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserInfo from "./pages/auth/UserInfo.jsx";
import Callback from "./pages/auth/Callback.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import Support from "./pages/RefundPolicy/Support.jsx";
import AdminControlRoom from "./pages/Admin/AdminControlRoom";
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
const PhonePeReturn = lazy(() => import("./pages/payment/PhonePeReturn"));

// New Admin Panel
const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
const AdminDashboardNew = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminCourses = lazy(() => import("./pages/Admin/AdminCourses"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));
const AdminFixer = lazy(() => import("./pages/Admin/AdminFixer"));

import FAQSection from "./components/banner/FAQSection.jsx";
import BenefitsSection from "./components/banner/BenefitsSection.jsx";

import PrivacyPolicy from "./components/footer/Privacy.jsx";
import TermsofService from "./components/footer/Terms.jsx";
import NavBar from "./components/Navbar";
import CouponBanner from "./components/common/CouponBanner";
import Footer from "./components/footer/Footer";
import About from "./pages/About/About";

import { useAuth } from "./context/AuthContext";

const ADMIN_EMAIL_FINGERPRINTS = ["d1294e7e"];

const LazyPageFallback = () => (
  <div className="fixed inset-0 pointer-events-none flex items-start justify-center">
    <div className="mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-pulse" />
  </div>
);

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
    const redirectTarget = encodeURIComponent(
      location.pathname + location.search
    );
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
    const redirectTarget = encodeURIComponent(
      location.pathname + location.search
    );
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
          This admin console only allows approved gmail addresses. Please sign
          in with an allow-listed account to continue.
        </p>
      </div>
    );
  }

  return children;
}

function LegacyCourseRedirect() {
  const { courseId } = useParams();
  if (!courseId) {
    return <Navigate to="/course" replace />;
  }
  const normalized = courseId.replace(/^\/+/, "");
  // Redirect old /course/:courseId links to the new /course/:courseParam route
  return <Navigate to={`/course/${encodeURIComponent(normalized)}`} replace />;
}

function App() {
  return (
    <>
      <MouseTracker />
      <TouchSpark />
      <ScrollToTop />

      <NavBar />
      <CouponBanner />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              {/* <CourseCard /> */}
              <IndustrialTraining/>

              <Contact /> 
              <BenefitsSection />
               <FAQSection /> 
            </>
          }
        />

        <Route path="/course" element={<Course />} /> 
        <Route path="/contact" element={<Contact />} />
        
        {/* --- NEW ADMIN PANEL --- */}
        <Route
          path="/no-admin-control"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LazyPageFallback />}>
                <AdminDashboardNew />
              </Suspense>
            }
          />
          <Route
            path="courses"
            element={
              <Suspense fallback={<LazyPageFallback />}>
                <AdminCourses />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<LazyPageFallback />}>
                <AdminOrders />
              </Suspense>
            }
          />
          <Route
            path="fix"
            element={
              <Suspense fallback={<LazyPageFallback />}>
                <AdminFixer />
              </Suspense>
            }
          />
        </Route>

        {/* --- ADMIN DASHBOARD ROUTE (Updated with AdminRoute) --- */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        /> */}

        <Route
          path="/industrial-training"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <IndustrialTrainingCard />
            </Suspense>
          }
        />
        <Route
          path="/internship/cse"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <CseInternship />
            </Suspense>
          }
        />
        <Route
          path="/internship/ece"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <EceInternship />
            </Suspense>
          }
        />
        <Route
          path="/internship/civil"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <CivilInternship />
            </Suspense>
          }
        />
        <Route
          path="/internship/me"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <MeInternship />
            </Suspense>
          }
        />
        <Route
          path="/online-internship"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <OnlineInternshipsCard />
            </Suspense>
          }
        />
        <Route
          path="/course/:courseParam"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <CourseDetails />
            </Suspense>
          }
        />
        <Route path="/course/:courseId" element={<LegacyCourseRedirect />} />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
 
        <Route path="/all-internship" element={<All_intenship />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-details" element={<UserInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/sample-certificate" element={<SampleCertificate />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsofService />} />
        <Route
          path="/payment/return"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <PhonePeReturn />
            </Suspense>
          }
        />

        <Route
          path="/admin-no-guess-no-check"
          element={
            <AdminRoute>
              <AdminControlRoom />
            </AdminRoute>
          }
        /> 
        <Route
          path="/:courseSlug"
          element={
            <Suspense fallback={<LazyPageFallback />}>
              <CourseDetails />
            </Suspense>
          }
        /> 
      </Routes>
         
      <Footer />
    </>
  );
}

export default App;


 