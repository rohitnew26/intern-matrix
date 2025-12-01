import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Clock, Calendar, User, Video } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import img1 from "../../assets/courseData/img/1.svg";
import img2 from "../../assets/courseData/img/2.svg";
import img3 from "../../assets/courseData/img/3.svg";
import BannerSection from "../../components/banner/offer.jsx";
import { useAuth } from "../../context/AuthContext";
import { skillsData } from "../../assets/courseData/data";
import {
  fetchCourseById,
  fetchCourseBySlug,
  fetchCourses,
} from "../../services/courseService";
import { getCourseSlug, parseCourseRouteParam, slugify } from "../../utils/helpers";
import ShowEnrollmentFlow from "./ShowEnrollmentFlow";

const specializationData = [
  "In today's data-driven world, Python is an essential tool for unlocking insights.",
  "This Specialization will guide you from a Python beginner to someone who can confidently apply Python to solve complex data problems.",
  "You'll gain hands-on experience with core Python syntax, data structures, and essential libraries like NumPy and pandas.",
  "Google experts will guide you through this Specialization by providing hands-on activities that simulate relevant tasks.",
  "You will learn to frame analysis problems using structured thinking and SMART questions.",
  "Write efficient Python code in Jupyter Notebooks, mastering variables, functions, and data structures.",
  "Manipulate and analyze datasets with pandas and NumPy, learning to filter, group, and aggregate data.",
  "Clean and prepare real-world data, handling missing values and validating data quality.",
  "Summarize and interpret data using descriptive statistics to support business decisions.",
  "By the time you're finished, you'll be able to confidently apply Python to solve complex data problems and communicate your findings to stakeholders.",
  "Apply your Python skills through hands-on projects that simulate real data professional workflows.",
];

const CourseDetails = () => {
  const PAYMENT_UPI_ID = "Internmatrix@ibl";
  const [openSection, setOpenSection] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const safeCourseParam =
    params.courseSlug ||
    params.courseId ||
    params.slug ||
    params.courseParam ||
    "";
  const routeInfo = useMemo(
    () => parseCourseRouteParam(safeCourseParam),
    [safeCourseParam]
  );
  const courseSlug = routeInfo.slug || "";
  const courseIdentifier = routeInfo.id || "";
  const { user, profile } = useAuth();

  const normalizedTargets = useMemo(() => {
    return [safeCourseParam, courseSlug, courseIdentifier]
      .filter(Boolean)
      .map((value) => slugify(value));
  }, [courseIdentifier, courseSlug, safeCourseParam]);

  const matchCourseFromList = useCallback(
    (list = []) => {
      if (!Array.isArray(list) || !list.length || !normalizedTargets.length) {
        return null;
      }

      return (
        list.find((item) => {
          const slugCandidates = [
            item?.slug,
            item?.skillId,
            item?.id,
            getCourseSlug(
              item,
              item?.skillId || item?.id || item?.name || "course"
            ),
            item?.name,
            item?.title,
          ]
            .filter(Boolean)
            .map((value) => slugify(value));

          return slugCandidates.some((candidate) =>
            normalizedTargets.includes(candidate)
          );
        }) || null
      );
    },
    [normalizedTargets]
  );

  const [course, setCourse] = useState(null);
  const [courseError, setCourseError] = useState("");
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [showEnrollmentFlow, setShowEnrollmentFlow] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [detailsForm, setDetailsForm] = useState({
    utrNumber: "",
    fullName: "",
    collegeName: "",
    email: "",
    phone: "",
    joiningDate: "",
    endDate: "",
    isCR: "No",
    paymentScreenshot: null,
    course: "",
  });
  const [isAdvancingStep, setIsAdvancingStep] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);
  const paymentStepTimer = useRef(null);

  const fallbackCourse = useMemo(() => {
    if (!safeCourseParam && !courseSlug && !courseIdentifier) return null;
    const match = matchCourseFromList(skillsData);
    if (!match) return null;
    const slug = getCourseSlug(match, match.skillId || match.id || match.name);
    return { ...match, slug };
  }, [courseIdentifier, courseSlug, matchCourseFromList, safeCourseParam]);

  useEffect(() => {
    let ignore = false;

    const loadCourse = async () => {
      setCourseError("");
      setLoadingCourse(true);

      try {
        let data = null;

        const attemptedSlugs = new Set();

        const tryFetchBySlug = async (value) => {
          const slugCandidate = (value || "").trim();
          if (!slugCandidate || attemptedSlugs.has(slugCandidate)) return null;
          attemptedSlugs.add(slugCandidate);
          try {
            return await fetchCourseBySlug(slugCandidate);
          } catch (slugError) {
            console.warn("fetchCourseBySlug failed", slugCandidate, slugError);
            return null;
          }
        };

        if (!data && safeCourseParam) {
          data = await tryFetchBySlug(safeCourseParam);
        }

        if (!data && courseSlug && courseSlug !== safeCourseParam) {
          data = await tryFetchBySlug(courseSlug);
        }

        if (!data && courseIdentifier) {
          try {
            data = await fetchCourseById(courseIdentifier);
          } catch (idError) {
            console.warn("fetchCourseById failed", courseIdentifier, idError);
          }
        }

        if (!data) {
          try {
            const catalog = await fetchCourses();
            const catalogMatch = matchCourseFromList(catalog);
            if (catalogMatch) {
              const slug = getCourseSlug(
                catalogMatch,
                catalogMatch.skillId || catalogMatch.id || catalogMatch.name
              );
              data = { ...catalogMatch, slug };
            }
          } catch (catalogError) {
            console.warn("Catalog fallback failed", catalogError);
          }
        }

        if (!ignore) {
          if (data) {
            setCourse(data);
          } else if (fallbackCourse) {
            setCourse(fallbackCourse);
            setCourseError(
              "Showing saved course details while live data loads."
            );
          } else {
            setCourse(null);
            setCourseError("Course not found.");
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch course", err);
          if (fallbackCourse) {
            setCourse(fallbackCourse);
            setCourseError(
              "Showing saved course details while live data loads."
            );
          } else {
            setCourse(null);
            setCourseError("Unable to load this course right now.");
          }
        }
      } finally {
        if (!ignore) {
          setLoadingCourse(false);
        }
      }
    };

    loadCourse();

    return () => {
      ignore = true;
    };
  }, [
    courseIdentifier,
    courseSlug,
    fallbackCourse,
    matchCourseFromList,
    safeCourseParam,
  ]);

  const [showMore, setShowMore] = useState(false);
  const displayPrice =
    course?.offerPrice ||
    course?.price ||
    (course?.price_cents ? Math.round(course.price_cents / 100) : 0);
  const numericPrice =
    parseFloat(String(displayPrice).replace(/[^0-9.]/g, "")) || 0;
  const basePriceCents = Math.round(numericPrice * 100);
  // const discountedPriceCents = Math.round(basePriceCents * 0.83); // 25% discount
  const discountedPriceCents = Math.round(basePriceCents * 0.75);   // 25% discount

  const priceCents =
    isCouponApplied && basePriceCents > 0 ? discountedPriceCents : basePriceCents;
  const displayAmount = Math.max(Math.round(priceCents / 100), 1);
  const redirectTarget = encodeURIComponent(
    location.pathname + location.search
  );

  const courseName = course?.name || course?.title || "Course";
  const courseSubtitle = course?.subtitle || course?.description || "";
  const instructorName =
    course?.instructor || course?.instructor_name || "Instructor";
  const courseImage =
    course?.image || course?.cover_image || "/placeholder-course.jpg";
  const courseLevel = course?.level || "Beginner";
  const courseDuration = course?.duration || "Self-paced";
  const courseUpdated = course?.updated || "Recently updated";
  const ratingValue = course?.rating || "4.8";
  const ratingCount = course?.ratersCount || 120;
  const courseLessons = Array.isArray(course?.content) ? course.content : [];

  const sanitizePhone = (value) => {
    const digitsOnly = String(value || "").replace(/[^0-9]/g, "");
    if (digitsOnly.length >= 8) return digitsOnly.slice(0, 10);
    return "";
  };

  useEffect(() => {
    if (!user) return;

    setDetailsForm((prev) => ({
      ...prev,
      fullName:
        prev.fullName ||
        profile?.full_name ||
        user.user_metadata?.full_name ||
        "",
      email: prev.email || user.email || "",
      phone:
        prev.phone ||
        sanitizePhone(
          profile?.phone || user.user_metadata?.phone || user.phone || ""
        ),
      course: prev.course || courseName || "",
    }));
  }, [profile, user, courseName]);

  useEffect(() => {
    return () => {
      if (paymentStepTimer.current) {
        clearTimeout(paymentStepTimer.current);
      }
    };
  }, []);

  const handleOpenEnrollment = () => {
    if (!user) {
      setCheckoutError("Please log in to continue your enrollment.");
      navigate(`/login?redirect=${redirectTarget}`);
      return;
    }

    if (!course) {
      setCheckoutError("Course data is still loading. Please try again.");
      return;
    }

    // Pre-fill course name
    setDetailsForm((prev) => ({
      ...prev,
      course: prev.course || courseName || "",
    }));

    setShowEnrollmentFlow(true);
    setEnrollmentStep(1);
    setPaymentConfirmed(false);
    setIsAdvancingStep(false);
    setCheckoutError("");
    setCheckoutSuccess("");
  };

  const closeEnrollmentFlow = () => {
    setShowEnrollmentFlow(false);
    setEnrollmentStep(1);
    setPaymentConfirmed(false);
    setIsAdvancingStep(false);
    if (paymentStepTimer.current) {
      clearTimeout(paymentStepTimer.current);
      paymentStepTimer.current = null;
    }
  };

  const handleDetailChange = (field, value) => {
    setDetailsForm((prev) => ({
      ...prev,
      [field]:
        field === "phone" ? value.replace(/[^0-9]/g, "").slice(0, 12) : value,
    }));
  };

  const proceedToDetailsStep = () => {
    setIsAdvancingStep(true);
    setEnrollmentStep("waiting");
    paymentStepTimer.current = setTimeout(() => {
      setEnrollmentStep(2);
      setIsAdvancingStep(false);
    }, 2000);
  };

  const handleApplyCoupon = () => {
    const rawCode = couponCode.trim();
    if (!rawCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    const normalizedCode = rawCode.toUpperCase();
    const validCodes = ["GECBANKA26", "GECBANKA27"];

    if (!validCodes.includes(normalizedCode)) {
      setCouponError("Invalid coupon code. Please try again.");
      setIsCouponApplied(false);
      return;
    }

    setIsCouponApplied(true);
    setCouponError("");
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode("");
    setCouponError("");
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_UPI_ID);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2000);
    } catch (error) {
      console.warn("Unable to copy UPI id", error);
    }
  };

  const visibleData = showMore
    ? specializationData
    : specializationData.slice(0, 5);

  const levelColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  if (loadingCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>
          {courseError ||
            "Course not found. Try picking another program from the catalog."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <BannerSection />

        {courseError && course && (
          <p className="text-center text-sm text-yellow-200 mb-4">
            {courseError}
          </p>
        )}

        {/* --- Top Split Section --- */}
        <div
          className="mt-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
  transition-all duration-500 shadow-lg rounded-2xl p-6 mb-6 
  flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start"
        >
          {/* Left: Image */}
          <div className="mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80">
            <img
              src={courseImage}
              alt={courseName}
              className="w-full h-auto object-contain p-3 rounded-2xl"
            />
          </div>

          {/* Divider (visible only on desktop) */}
          <div className="hidden md:flex items-center h-64">
            <div className="w-px h-full bg-white/40"></div>
          </div>

          {/* Right: Course Info */}
          <div className="flex-1 text-center md:text-left text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {courseName}
            </h1>
            <p className="text-base sm:text-lg mb-3">{courseSubtitle}</p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                levelColor[courseLevel] || "bg-slate-200 text-slate-800"
              }`}
            >
              {courseLevel}
            </span>

            {/* Course details with icons */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock size={18} className="text-blue-200 shrink-0" />
                <span className="text-sm sm:text-base">
                  <span className="font-semibold">Duration:</span>{" "}
                  {courseDuration}
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar size={18} className="text-blue-200 shrink-0" />
                <span className="text-sm sm:text-base">
                  <span className="font-semibold">Updated:</span>{" "}
                  {courseUpdated}
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2">
               {/* <User size={18} className="text-blue-200 shrink-0" />
                 <span className="text-sm sm:text-base">
                  <span className="font-semibold">Instructor:</span>{" "}
                  {instructorName}
                </span> */}
              </div>
            </div>

            {/* Price, Enroll Button & Coupon */}

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="text-xl sm:text-2xl font-bold flex items-baseline gap-2">
                  {isCouponApplied && numericPrice > 0 && (
                    <span className="text-base sm:text-lg line-through opacity-70">
                      ₹{numericPrice}
                    </span>
                  )}
                  <span>₹{displayAmount}</span>
                </p>
                {isCouponApplied && (
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    25% OFF Applied
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3">
                <button
                  onClick={handleOpenEnrollment}
                  className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110"
                >
                  Enroll Now
                </button>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      if (couponError) setCouponError("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleApplyCoupon();
                      }
                    }}
                    disabled={isCouponApplied}
                    className="w-32 sm:w-40 px-3 py-2 rounded-md text-sm border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"
                  />

                  {!isCouponApplied ? (
                    <button
                      onClick={handleApplyCoupon}
                      className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveCoupon}
                      className="px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {couponError && (
                <p className="text-xs text-red-100 text-left">{couponError}</p>
              )}
            </div>

            {/* _________ */}

            {/* {checkoutError && (
              <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-md text-sm">
                <span className="font-semibold">⚠ Error:</span> {checkoutError}
              </div>
            )} */}

            {checkoutSuccess && (
              <div
                className="
      mt-3 flex items-start sm:items-center gap-2 
      bg-green-100 border border-green-300 
      text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base
      shadow-sm w-full max-w-full
    "
              >
                <span className="font-bold text-green-900 text-lg">✔</span>
                <p className="leading-tight break-words flex-1">
                  <span className="font-semibold">Success:</span>{" "}
                  {checkoutSuccess}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Rating Section --- */}
        <div className="bg-gray-50 p-5 rounded-xl shadow mb-6 flex items-center justify-center gap-2 text-center">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold text-gray-800 text-lg">
            {ratingValue} ({ratingCount} ratings)
          </span>
        </div>

        {/* --- Specialization Description Section --- */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Specialization - 6 Course Series
        </h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {visibleData.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 text-blue-600 font-medium hover:underline"
        >
          {showMore ? "Read Less" : "Read More"}
        </button>

        {/* --- Course Content Section --- */}
        <h1 className="mt-10 font-semibold text-2xl">Curiculam </h1>
        <div className="bg-white shadow-lg border-1 rounded-xl m-3 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
            <h2 className="text-2xl font-semibold text-gray-900 text-center sm:text-left">
              Course Lessons
            </h2>

            <button
              onClick={() =>
                setOpenSection(openSection === "all" ? null : "all")
              }
              className=" text-black px-4 py-1 rounded-md text-sm hover:bg-black hover:text-amber-50 transition"
            >
              {openSection === "all" ? "Collapse All" : "Expand All"}
            </button>
          </div>

          {courseLessons.map((section, index) => (
            <div key={index} className="border-b border-gray-200 mb-3 pb-3">
              <div
                onClick={() =>
                  setOpenSection(openSection === index ? null : index)
                }
                className="flex justify-between items-center cursor-pointer hover:text-blue-600"
              >
                <h3 className="font-semibold text-lg">
                  {section.sectionTitle}
                </h3>
                {openSection === index || openSection === "all" ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>

              {(openSection === index || openSection === "all") && (
                <ul className="mt-3 space-y-2 text-gray-700">
                  {section.lessons.map((lesson) => (
                    <li
                      key={lesson.order}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                    >
                      <span>{lesson.title}</span>
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm hover:underline"
                      >
                        <Video className="w-6 h-6 text-black" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {/* --- block Note Section --- */}

        <div className="mt-10 p-6 bg-gray-100 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8  p-6 md:p-10 rounded-2xl">
            {/* Card 1 */}
            <div
              className="w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 
                hover:scale-110"
            >
              <img
                src={img1}
                alt="Image 1"
                className="w-full h-40 md:h-48 object-contain rounded-xl mb-3"
              />
              <h1 className="text-sm md:text-base text-gray-800 font-medium">
                You can start NxtWave Academy right after Intermediate/12th
              </h1>
            </div>

            {/* Card 2 */}
            <div
              className=" h-71 w-64 md: h-77   bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 
                hover:scale-110"
            >
              <img
                src={img2}
                alt="Image 2"
                className="w-full h-40 md:h-48 object-contain rounded-xl mb-3"
              />
              <h1 className="text-sm md:text-base text-gray-800 font-medium">
                Learn 6 hours a week alongside college
              </h1>
            </div>

            {/* Card 3 */}
            <div
              className="w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 
                hover:scale-110"
            >
              <img
                src={img3}
                alt="Image 3"
                className="w-full h-40 md:h-48 object-contain rounded-xl mb-3"
              />
              <h1 className="text-sm md:text-base text-gray-800 font-medium">
                Land a high-paid software job irrespective of your
                college/branch
              </h1>
            </div>
          </div>
        </div>

        {/* --- Footer Note Section --- */}
        <div className="mt-30 flex justify-center items-center text-xl mt-10 h-60 p-6 bg-gray-100 rounded-2xl text-center text-gray-800">
          Our top notch teams and AI-powered platforms help you learn
          programming, not just coding.
        </div>
      </div>

      <ShowEnrollmentFlow
        isOpen={showEnrollmentFlow}
        onClose={closeEnrollmentFlow}
        enrollmentStep={enrollmentStep}
        paymentConfirmed={paymentConfirmed}
        setPaymentConfirmed={setPaymentConfirmed}
        proceedToDetailsStep={proceedToDetailsStep}
        isAdvancingStep={isAdvancingStep}
        handleCopyUpi={handleCopyUpi}
        upiCopied={upiCopied}
        PAYMENT_UPI_ID={PAYMENT_UPI_ID}
        displayAmount={displayAmount}
        detailsForm={detailsForm}
        handleDetailChange={handleDetailChange}
        user={user}
        course={course}
        courseIdentifier={courseIdentifier}
        courseSlug={courseSlug}
        courseName={courseName}
        priceCents={priceCents}
        setCheckoutError={setCheckoutError}
        setCheckoutSuccess={setCheckoutSuccess}
        onSuccess={closeEnrollmentFlow}
      />
    </>
  );
};

export default CourseDetails;





 