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
import CourseSkeletonuLoadingUi from "../../pages/skeletonLoadingUi/CourseDetailsLoadingUi.jsx";

import RecognizedTrusted from "../../components/banner/RecognizedTrusted";
import LazyImage from "../../components/common/LazyImage";
import OfferCelebration from "../../components/OfferCelebration";
import {
  fetchCourseById,
  fetchCourseBySlug,
  fetchCourses,
} from "../../services/courseService";
import {
  getCourseSlug,
  parseCourseRouteParam,
  slugify,
} from "../../utils/helpers";
import apiClient from "../../services/apiClient";
import { createPhonePePayment } from "../../services/phonepeService";
import ShowEnrollmentFlow from "./ShowEnrollmentFlowSimple";
import CourseChapter from "./CourseChapter";

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
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0); // fraction, e.g. 0.99 = 99% off
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
  const [skillsData, setSkillsData] = useState([]);
  const [celebrateTrigger, setCelebrateTrigger] = useState(false);
  const [showEnrollmentFlow, setShowEnrollmentFlow] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
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

  // Get finalOfferPrice from location state if passed from OnlineCourseCard
  const locationState = location.state || {};
  const passedFinalOfferPrice = locationState.finalOfferPrice;

  const fallbackCourse = useMemo(() => {
    if (!safeCourseParam && !courseSlug && !courseIdentifier) return null;
    if (!Array.isArray(skillsData) || skillsData.length === 0) return null;
    const match = matchCourseFromList(skillsData);
    if (!match) return null;
    const slug = getCourseSlug(match, match.skillId || match.id || match.name);
    return { ...match, slug };
  }, [
    courseIdentifier,
    courseSlug,
    matchCourseFromList,
    safeCourseParam,
    skillsData,
  ]);

  // Consolidated fetch: skillsData and course details in one effect
  useEffect(() => {
    let ignore = false;

    const loadCourseAndSkills = async () => {
      setCourseError("");
      setLoadingCourse(true);

      try {
        let skillsArray = [];
        let courseData = null;

        // First, fetch all courses from backend API
        try {
          const response = await apiClient.get("/api/user/courses");
          let backendCourses = response.data || [];

          // Handle both array and object response formats
          if (
            backendCourses &&
            typeof backendCourses === "object" &&
            !Array.isArray(backendCourses)
          ) {
            backendCourses =
              backendCourses.courses ||
              backendCourses.data ||
              backendCourses.items ||
              [];
          }

          if (Array.isArray(backendCourses) && backendCourses.length) {
            skillsArray = backendCourses;

            // Search by title using slugified comparison
            const foundCourse = backendCourses.find((course) => {
              const courseTitle = slugify(course.title || course.name || "");
              const searchParam = slugify(safeCourseParam || courseSlug || "");
              return courseTitle === searchParam;
            });

            if (foundCourse) {
              // normalize couponDiscount from backend fields if present
              const parsedCouponDiscount = parseBackendCouponDiscount(
                foundCourse.couponDiscount ??
                  foundCourse.coupondiscount ??
                  foundCourse.coupon_discount ??
                  foundCourse.discount
              );

              courseData = {
                id: foundCourse.id,
                title: foundCourse.title,
                name: foundCourse.title,
                description: foundCourse.description,
                desc: foundCourse.description,
                instructor_name: foundCourse.instructor_name || "Instructor",
                instructor: foundCourse.instructor_name || "Instructor",
                level: foundCourse.level || "Beginner",
                cover_image: foundCourse.thumbnail,
                image: foundCourse.thumbnail,
                price: foundCourse.originalprice || 0,
                offerPrice:
                  foundCourse.offerprice || foundCourse.originalprice || 0,
                price_cents: foundCourse.price_cents || 0,
                category: foundCourse.category || "General",
                tags: foundCourse.tags
                  ? Array.isArray(foundCourse.tags)
                    ? foundCourse.tags
                    : []
                  : [],
                rating: foundCourse.rating || 4.8,
                duration: foundCourse.duration,
                lessons: foundCourse.lessons,
                slug: foundCourse.slug || slugify(foundCourse.title),
                content: foundCourse.content || [],
                chapters: foundCourse.chapters || [],
                couponcode: foundCourse.couponcode,
                couponDiscount: parsedCouponDiscount,
              };
            }
          }
        } catch (backendErr) {
          console.warn("Failed to fetch from backend API", backendErr);
        }

        // If course not found, try fallback methods
        if (!courseData) {
          const attemptedSlugs = new Set();

          const tryFetchBySlug = async (value) => {
            const slugCandidate = (value || "").trim();
            if (!slugCandidate || attemptedSlugs.has(slugCandidate))
              return null;
            attemptedSlugs.add(slugCandidate);
            try {
              return await fetchCourseBySlug(slugCandidate);
            } catch (slugError) {
              console.warn(
                "fetchCourseBySlug failed",
                slugCandidate,
                slugError
              );
              return null;
            }
          };

          if (safeCourseParam) {
            courseData = await tryFetchBySlug(safeCourseParam);
            if (courseData) {
              courseData.couponDiscount = parseBackendCouponDiscount(
                courseData.couponDiscount ??
                  courseData.coupondiscount ??
                  courseData.coupon_discount ??
                  courseData.discount
              );
            }
          }

          if (!courseData && courseSlug && courseSlug !== safeCourseParam) {
            courseData = await tryFetchBySlug(courseSlug);
            if (courseData) {
              courseData.couponDiscount = parseBackendCouponDiscount(
                courseData.couponDiscount ??
                  courseData.coupondiscount ??
                  courseData.coupon_discount ??
                  courseData.discount
              );
            }
          }

          if (!courseData && courseIdentifier) {
            try {
              courseData = await fetchCourseById(courseIdentifier);
              if (courseData) {
                courseData.couponDiscount = parseBackendCouponDiscount(
                  courseData.couponDiscount ??
                    courseData.coupondiscount ??
                    courseData.coupon_discount ??
                    courseData.discount
                );
              }
            } catch (idError) {
              console.warn("fetchCourseById failed", courseIdentifier, idError);
            }
          }

          if (!courseData) {
            try {
              const catalog = await fetchCourses();
              const catalogMatch = matchCourseFromList(catalog);
              if (catalogMatch) {
                const slug = getCourseSlug(
                  catalogMatch,
                  catalogMatch.skillId || catalogMatch.id || catalogMatch.name
                );
                courseData = { ...catalogMatch, slug };
                courseData.couponDiscount = parseBackendCouponDiscount(
                  catalogMatch.couponDiscount ??
                    catalogMatch.coupondiscount ??
                    catalogMatch.coupon_discount ??
                    catalogMatch.discount
                );
              }
            } catch (catalogError) {
              console.warn("Catalog fallback failed", catalogError);
            }
          }
        }

        if (!ignore) {
          // Set skills data
          if (Array.isArray(skillsArray)) {
            setSkillsData(skillsArray);
          }

          // Set course data
          if (courseData) {
            setCourse(courseData);
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
          console.error("Failed to fetch course and skills", err);
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

    loadCourseAndSkills();

    return () => {
      ignore = true;
    };
  }, [courseIdentifier, courseSlug, matchCourseFromList, safeCourseParam]);

  const [showMore, setShowMore] = useState(false);
  const SPECIAL_COUPON_CODE = "MEGA99";
  const SPECIAL_DISCOUNT = 0.99; // 99% off
  const DEFAULT_COUPON_DISCOUNT = 0.25; // 25% off legacy

  // Parse backend coupon discount values which may be numbers or strings
  const parseBackendCouponDiscount = (raw) => {
    if (raw == null) return undefined;
    // If it's already a number
    if (typeof raw === "number") {
      // assume values > 1 are percentage like 25 => 0.25
      return raw > 1
        ? Math.min(Math.max(raw / 100, 0), 0.9999)
        : Math.min(Math.max(raw, 0), 0.9999);
    }
    const s = String(raw).trim();
    if (!s) return undefined;
    // strings like "25%"
    if (s.endsWith("%")) {
      const n = parseFloat(s.slice(0, -1));
      if (!isNaN(n)) return Math.min(Math.max(n / 100, 0), 0.9999);
    }
    // numeric string "0.25" or "25"
    const f = parseFloat(s.replace(/[^0-9.\-]/g, ""));
    if (!isNaN(f)) {
      return f > 1
        ? Math.min(Math.max(f / 100, 0), 0.9999)
        : Math.min(Math.max(f, 0), 0.9999);
    }
    return undefined;
  };

  // Price handling: compute original (stored price), offer price (if present),
  // and coupon-discounted price based on applied discount.
  // Use finalOfferPrice from location state if passed from OnlineCourseCard
  const rawOriginal =
    course?.price ??
    (course?.price_cents ? Math.round(course.price_cents / 100) : 0);
  const rawOffer = passedFinalOfferPrice ?? course?.offerPrice ?? rawOriginal;

  const originalNumeric =
    parseFloat(String(rawOriginal).replace(/[^0-9.]/g, "")) || 0;
  const offerNumeric =
    parseFloat(String(rawOffer).replace(/[^0-9.]/g, "")) ||
    originalNumeric ||
    0;

  const basePriceCents = Math.round(offerNumeric * 100);
  const effectiveDiscount = isCouponApplied ? couponDiscount : 0;
  const discountedPriceCents = Math.max(
    Math.round(basePriceCents * (1 - effectiveDiscount)),
    1
  );

  const priceCents =
    basePriceCents > 0 && isCouponApplied
      ? discountedPriceCents
      : basePriceCents;

  const displayAmount = Math.max(Math.round(priceCents / 100), 1);
  const originalAmount = Math.max(Math.round(originalNumeric), 0);
  const offerAmount = Math.max(Math.round(offerNumeric), 0);
  const couponAmount = Math.max(Math.round(discountedPriceCents / 100), 1);
  const redirectTarget = encodeURIComponent(
    location.pathname + location.search
  );

  const courseName = course?.name || course?.title || "Course";

  const courseSubtitle =
    course?.subtitle ||
    "Join this course to enhance your skills and advance your career.";

  const instructorName =
    course?.instructor || course?.instructor_name || "Instructor";
  const courseImage =
    course?.image || course?.cover_image || "/placeholder-course.jpg";
  const courseLevel = course?.level || "Beginner";
  const courseDuration = course?.duration || "Self-paced";
  const courseUpdated = course?.updated || "Recently updated";
  const ratingValue = course?.rating;
  const ratingCount = course?.ratersCount;
  const courseLessons = Array.isArray(course?.content) ? course.content : [];
  const courseChapters = Array.isArray(course?.chapters) ? course.chapters : [];

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

  const loadCheckoutScript = () => {
    if (document.getElementById("phonepe-checkout-js"))
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "phonepe-checkout-js";
      script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load PhonePe checkout"));
      document.body.appendChild(script);
    });
  };

  const openWithToken = async (token, checkoutBaseUrl) => {
    const tokenUrl = `${checkoutBaseUrl}?token=${token}`;
    try {
      await loadCheckoutScript();
      if (window.PhonePeCheckout?.transact) {
        window.PhonePeCheckout.transact({
          tokenUrl,
          callback: () => {
            // Nothing to do; server will poll status/redirect page handles it
          },
          type: "IFRAME",
        });
        return;
      }
    } catch (e) {
      console.error("checkout.js load error", e);
    }
    // Fallback: hard redirect
    window.location.href = tokenUrl;
  };

  const handleOpenEnrollment = async () => {
    if (!user) {
      setCheckoutError("Please log in to continue your enrollment.");
      navigate(`/login?redirect=${redirectTarget}`);
      return;
    }

    if (!course) {
      setCheckoutError("Course data is still loading. Please try again.");
      return;
    }

    if (isProcessingPayment) {
      return; // Prevent double clicks
    }

    // Directly initiate PhonePe payment
    setIsProcessingPayment(true);
    setCheckoutError("");

    try {
      const paymentData = await createPhonePePayment({
        amount: displayAmount,
        currency: "INR",
        courseId: course.id || course.skillId,
        courseSlug: courseSlug,
        userEmail: user.email,
        userName: profile?.fullName || user.email?.split("@")[0] || "Student",
      });

      const payUrl = paymentData?.payPageUrl || paymentData?.redirectUrl;
      const token = paymentData?.token;
      const checkoutBaseUrl = paymentData?.checkoutBaseUrl;

      if (payUrl) {
        window.location.href = payUrl;
      } else if (token && checkoutBaseUrl) {
        await openWithToken(token, checkoutBaseUrl);
        setIsProcessingPayment(false);
      } else {
        setCheckoutError("Failed to initiate payment. Please try again.");
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      const detail = error?.details?.error || error?.details?.message;
      const detailJson = error?.details ? JSON.stringify(error.details) : "";
      setCheckoutError(
        detail ||
          detailJson ||
          error.message ||
          "Failed to create payment. Please try again."
      );
      setIsProcessingPayment(false);
    }
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

    const normalizedCode = rawCode.toLowerCase().trim();

    // Global 99% off coupon
    if (normalizedCode === SPECIAL_COUPON_CODE.toLowerCase()) {
      setIsCouponApplied(true);
      setCouponDiscount(SPECIAL_DISCOUNT);
      setCouponError("");
      return;
    }

    // Check if the entered code matches the backend coupon code
    if (!course?.couponcode) {
      setCouponError("No coupon code available for this course.");
      setIsCouponApplied(false);
      return;
    }

    const backendCode = course.couponcode.toLowerCase().trim();

    if (normalizedCode !== backendCode) {
      // setCouponError(`Invalid coupon code. Use: ${course.couponcode}`);
      setCouponError("Invalid coupon code.");
      setIsCouponApplied(false);
      setCouponDiscount(0);
      return;
    }

    setIsCouponApplied(true);
    // Use backend-provided couponDiscount when available, else fallback to default
    const backendDiscount = parseBackendCouponDiscount(
      course?.couponDiscount ??
        course?.coupondiscount ??
        course?.coupon_discount ??
        course?.discount
    );
    setCouponDiscount(
      typeof backendDiscount === "number"
        ? backendDiscount
        : DEFAULT_COUPON_DISCOUNT
    );
    setCouponError("");
    // trigger visual celebration in parent (OfferCelebration)
    // set a short-lived trigger state to signal celebration component
    setCelebrateTrigger(true);
    setTimeout(() => setCelebrateTrigger(false), 1200);
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode("");
    setCouponError("");
    setCouponDiscount(0);
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
        {/* <p>Loading course details...</p> */}
        <CourseSkeletonuLoadingUi />
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
          <div className="mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80 relative">
            <LazyImage
              src={courseImage}
              alt={courseName}
              className="w-full h-full bg-white"
              imgClassName="w-full h-auto object-contain p-3 rounded-2xl"
              placeholderNode={
                <div className="flex items-center justify-center p-6">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                </div>
              }
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

              {/* <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar size={18} className="text-blue-200 shrink-0" />
                
              </div> */}

              <div className="flex items-center justify-center md:justify-start gap-2">
                <User size={18} className="text-blue-200 shrink-0" />
                <span className="text-sm sm:text-base">
                  <span className="font-semibold">Instructor:</span>{" "}
                  {instructorName}
                </span>
              </div>
            </div>

            {/* Price, Enroll Button & Coupon */}

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="text-xl sm:text-2xl font-bold flex items-baseline gap-2">
                  {/* Show original price when it's different from the displayed price */}
                  {originalAmount > 0 && originalAmount !== displayAmount && (
                    <span className="text-base sm:text-lg line-through opacity-70">
                      ₹{originalAmount}
                    </span>
                  )}

                  {/* If there's an offer price (different from original) and no coupon, show it as main price */}
                  {/* If coupon applied, displayAmount will be the coupon price */}
                  <span>₹{displayAmount}</span>
                </p>

                {/* Small badge when coupon is applied */}
                {isCouponApplied && (
                  <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {Math.round((couponDiscount || 0) * 100)}% OFF Applied
                  </span>
                )}
              </div>

              {/* If coupon is applied and the offer price is different from the coupon price, show the offer price as reference */}
              {isCouponApplied &&
                offerAmount > 0 &&
                offerAmount !== couponAmount && (
                  <p
                    className="text-[1rem] text-white line-through decoration-red-300
"
                  >
                    Offer Price: ₹{offerAmount}
                  </p>
                )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3">
                <button
                  onClick={handleOpenEnrollment}
                  disabled={isProcessingPayment}
                  className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Redirecting...
                    </span>
                  ) : (
                    "Enroll Now"
                  )}
                </button>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={
                      // course?.couponcode
                      // ? `Hint: ${course.couponcode}` :
                      "Enter coupon code"
                    }
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

              {checkoutError && (
                <p className="text-xs text-red-200 bg-red-500/20 px-3 py-2 rounded-md text-left">
                  {checkoutError}
                </p>
              )}

              {/* {course?.couponcode && !isCouponApplied && (
                <p className="text-xs text-green-200 text-left">
                  Valid code:{" "}
                  <span className="font-semibold">{course.couponcode}</span>
                </p>
              )} */}
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

        {/* --- Course Description Section --- */}
        {course?.description && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Course Description
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </>
        )}

        {/* --- Course Content Section --- */}
        <h1 className="mt-10 font-semibold text-3xl mb-6">Course Content</h1>
        <CourseChapter chapters={courseChapters} />
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

        <RecognizedTrusted />

        {/* --- Specialization Description Section --- */}
        <div className="mt-10 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            What You'll Learn
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
      {/* Celebration component listens to `celebrateTrigger` and shows confetti/modal */}
      <OfferCelebration
        trigger={celebrateTrigger}
        duration={1400}
        playSound={true}
        discountPercentage={Math.round((couponDiscount || 0) * 100)}
        onApply={() => {
          // optional: any action after celebration completes
        }}
      />
    </>
  );
};

export default CourseDetails;


































// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { Clock, Calendar, User, Video } from "lucide-react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import img1 from "../../assets/courseData/img/1.svg";
// import img2 from "../../assets/courseData/img/2.svg";
// import img3 from "../../assets/courseData/img/3.svg";
// import BannerSection from "../../components/banner/offer.jsx";
// import { useAuth } from "../../context/AuthContext";
// import CourseSkeletonuLoadingUi from "../../pages/skeletonLoadingUi/CourseDetailsLoadingUi.jsx";

// import RecognizedTrusted from "../../components/banner/RecognizedTrusted";
// import LazyImage from "../../components/common/LazyImage";
// import {
//   fetchCourseById,
//   fetchCourseBySlug,
//   fetchCourses,
// } from "../../services/courseService";
// import {
//   getCourseSlug,
//   parseCourseRouteParam,
//   slugify,
// } from "../../utils/helpers";
// import apiClient from "../../services/apiClient";
// import { createPhonePePayment } from "../../services/phonepeService";
// import ShowEnrollmentFlow from "./ShowEnrollmentFlowSimple";
// import CourseChapter from "./CourseChapter";

// const specializationData = [
//   "In today's data-driven world, Python is an essential tool for unlocking insights.",
//   "This Specialization will guide you from a Python beginner to someone who can confidently apply Python to solve complex data problems.",
//   "You'll gain hands-on experience with core Python syntax, data structures, and essential libraries like NumPy and pandas.",
//   "Google experts will guide you through this Specialization by providing hands-on activities that simulate relevant tasks.",
//   "You will learn to frame analysis problems using structured thinking and SMART questions.",
//   "Write efficient Python code in Jupyter Notebooks, mastering variables, functions, and data structures.",
//   "Manipulate and analyze datasets with pandas and NumPy, learning to filter, group, and aggregate data.",
//   "Clean and prepare real-world data, handling missing values and validating data quality.",
//   "Summarize and interpret data using descriptive statistics to support business decisions.",
//   "By the time you're finished, you'll be able to confidently apply Python to solve complex data problems and communicate your findings to stakeholders.",
//   "Apply your Python skills through hands-on projects that simulate real data professional workflows.",
// ];

// const CourseDetails = () => {
//   const PAYMENT_UPI_ID = "Internmatrix@ibl";
//   const [checkoutError, setCheckoutError] = useState("");
//   const [checkoutSuccess, setCheckoutSuccess] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const [isCouponApplied, setIsCouponApplied] = useState(false);
//   const [couponError, setCouponError] = useState("");
//   const [couponDiscount, setCouponDiscount] = useState(0); // fraction, e.g. 0.99 = 99% off
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = useParams();
//   const safeCourseParam =
//     params.courseSlug ||
//     params.courseId ||
//     params.slug ||
//     params.courseParam ||
//     "";
//   const routeInfo = useMemo(
//     () => parseCourseRouteParam(safeCourseParam),
//     [safeCourseParam]
//   );
//   const courseSlug = routeInfo.slug || "";
//   const courseIdentifier = routeInfo.id || "";
//   const { user, profile } = useAuth();

//   const normalizedTargets = useMemo(() => {
//     return [safeCourseParam, courseSlug, courseIdentifier]
//       .filter(Boolean)
//       .map((value) => slugify(value));
//   }, [courseIdentifier, courseSlug, safeCourseParam]);

//   const matchCourseFromList = useCallback(
//     (list = []) => {
//       if (!Array.isArray(list) || !list.length || !normalizedTargets.length) {
//         return null;
//       }

//       return (
//         list.find((item) => {
//           const slugCandidates = [
//             item?.slug,
//             item?.skillId,
//             item?.id,
//             getCourseSlug(
//               item,
//               item?.skillId || item?.id || item?.name || "course"
//             ),
//             item?.name,
//             item?.title,
//           ]
//             .filter(Boolean)
//             .map((value) => slugify(value));

//           return slugCandidates.some((candidate) =>
//             normalizedTargets.includes(candidate)
//           );
//         }) || null
//       );
//     },
//     [normalizedTargets]
//   );

//   const [course, setCourse] = useState(null);
//   const [courseError, setCourseError] = useState("");
//   const [loadingCourse, setLoadingCourse] = useState(true);
//   const [skillsData, setSkillsData] = useState([]);
//   const [showEnrollmentFlow, setShowEnrollmentFlow] = useState(false);
//   const [enrollmentStep, setEnrollmentStep] = useState(1);
//   const [paymentConfirmed, setPaymentConfirmed] = useState(false);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [detailsForm, setDetailsForm] = useState({
//     utrNumber: "",
//     fullName: "",
//     collegeName: "",
//     email: "",
//     phone: "",
//     joiningDate: "",
//     endDate: "",
//     isCR: "No",
//     paymentScreenshot: null,
//     course: "",
//   });
//   const [isAdvancingStep, setIsAdvancingStep] = useState(false);
//   const [upiCopied, setUpiCopied] = useState(false);
//   const paymentStepTimer = useRef(null);
  
//   // Get finalOfferPrice from location state if passed from OnlineCourseCard
//   const locationState = location.state || {};
//   const passedFinalOfferPrice = locationState.finalOfferPrice;

//   const fallbackCourse = useMemo(() => {
//     if (!safeCourseParam && !courseSlug && !courseIdentifier) return null;
//     if (!Array.isArray(skillsData) || skillsData.length === 0) return null;
//     const match = matchCourseFromList(skillsData);
//     if (!match) return null;
//     const slug = getCourseSlug(match, match.skillId || match.id || match.name);
//     return { ...match, slug };
//   }, [
//     courseIdentifier,
//     courseSlug,
//     matchCourseFromList,
//     safeCourseParam,
//     skillsData,
//   ]);

//   // Consolidated fetch: skillsData and course details in one effect
//   useEffect(() => {
//     let ignore = false;

//     const loadCourseAndSkills = async () => {
//       setCourseError("");
//       setLoadingCourse(true);

//       try {
//         let skillsArray = [];
//         let courseData = null;

//         // First, fetch all courses from backend API
//         try {
//           const response = await apiClient.get("/api/user/courses");
//           let backendCourses = response.data || [];

//           // Handle both array and object response formats
//           if (
//             backendCourses &&
//             typeof backendCourses === "object" &&
//             !Array.isArray(backendCourses)
//           ) {
//             backendCourses =
//               backendCourses.courses ||
//               backendCourses.data ||
//               backendCourses.items ||
//               [];
//           }

//           if (Array.isArray(backendCourses) && backendCourses.length) {
//             skillsArray = backendCourses;

//             // Search by title using slugified comparison
//             const foundCourse = backendCourses.find((course) => {
//               const courseTitle = slugify(course.title || course.name || "");
//               const searchParam = slugify(safeCourseParam || courseSlug || "");
//               return courseTitle === searchParam;
//             });

//             if (foundCourse) {
//                 // normalize couponDiscount from backend fields if present
//                 const parsedCouponDiscount = parseBackendCouponDiscount(
//                   foundCourse.couponDiscount ?? foundCourse.coupondiscount ?? foundCourse.coupon_discount ?? foundCourse.discount
//                 );

//                 courseData = {
//                 id: foundCourse.id,
//                 title: foundCourse.title,
//                 name: foundCourse.title,
//                 description: foundCourse.description,
//                 desc: foundCourse.description,
//                 instructor_name: foundCourse.instructor_name || "Instructor",
//                 instructor: foundCourse.instructor_name || "Instructor",
//                 level: foundCourse.level || "Beginner",
//                 cover_image: foundCourse.thumbnail,
//                 image: foundCourse.thumbnail,
//                 price: foundCourse.originalprice || 0,
//                 offerPrice:
//                   foundCourse.offerprice || foundCourse.originalprice || 0,
//                 price_cents: foundCourse.price_cents || 0,
//                 category: foundCourse.category || "General",
//                 tags: foundCourse.tags
//                   ? Array.isArray(foundCourse.tags)
//                     ? foundCourse.tags
//                     : []
//                   : [],
//                 rating: foundCourse.rating || 4.8,
//                 duration: foundCourse.duration,
//                 lessons: foundCourse.lessons,
//                 slug: foundCourse.slug || slugify(foundCourse.title),
//                 content: foundCourse.content || [],
//                 chapters: foundCourse.chapters || [],
//                 couponcode: foundCourse.couponcode,
//                 couponDiscount: parsedCouponDiscount,
//               };
//             }
//           }
//         } catch (backendErr) {
//           console.warn("Failed to fetch from backend API", backendErr);
//         }

//         // If course not found, try fallback methods
//         if (!courseData) {
//           const attemptedSlugs = new Set();

//           const tryFetchBySlug = async (value) => {
//             const slugCandidate = (value || "").trim();
//             if (!slugCandidate || attemptedSlugs.has(slugCandidate)) return null;
//             attemptedSlugs.add(slugCandidate);
//             try {
//               return await fetchCourseBySlug(slugCandidate);
//             } catch (slugError) {
//               console.warn("fetchCourseBySlug failed", slugCandidate, slugError);
//               return null;
//             }
//           };

//           if (safeCourseParam) {
//             courseData = await tryFetchBySlug(safeCourseParam);
//             if (courseData) {
//               courseData.couponDiscount = parseBackendCouponDiscount(
//                 courseData.couponDiscount ?? courseData.coupondiscount ?? courseData.coupon_discount ?? courseData.discount
//               );
//             }
//           }

//           if (!courseData && courseSlug && courseSlug !== safeCourseParam) {
//             courseData = await tryFetchBySlug(courseSlug);
//             if (courseData) {
//               courseData.couponDiscount = parseBackendCouponDiscount(
//                 courseData.couponDiscount ?? courseData.coupondiscount ?? courseData.coupon_discount ?? courseData.discount
//               );
//             }
//           }

//           if (!courseData && courseIdentifier) {
//             try {
//               courseData = await fetchCourseById(courseIdentifier);
//               if (courseData) {
//                 courseData.couponDiscount = parseBackendCouponDiscount(
//                   courseData.couponDiscount ?? courseData.coupondiscount ?? courseData.coupon_discount ?? courseData.discount
//                 );
//               }
//             } catch (idError) {
//               console.warn("fetchCourseById failed", courseIdentifier, idError);
//             }
//           }

//           if (!courseData) {
//             try {
//               const catalog = await fetchCourses();
//               const catalogMatch = matchCourseFromList(catalog);
//                 if (catalogMatch) {
//                 const slug = getCourseSlug(
//                   catalogMatch,
//                   catalogMatch.skillId || catalogMatch.id || catalogMatch.name
//                 );
//                 courseData = { ...catalogMatch, slug };
//                 courseData.couponDiscount = parseBackendCouponDiscount(
//                   catalogMatch.couponDiscount ?? catalogMatch.coupondiscount ?? catalogMatch.coupon_discount ?? catalogMatch.discount
//                 );
//               }
//             } catch (catalogError) {
//               console.warn("Catalog fallback failed", catalogError);
//             }
//           }
//         }

//         if (!ignore) {
//           // Set skills data
//           if (Array.isArray(skillsArray)) {
//             setSkillsData(skillsArray);
//           }

//           // Set course data
//           if (courseData) {
//             setCourse(courseData);
//           } else if (fallbackCourse) {
//             setCourse(fallbackCourse);
//             setCourseError(
//               "Showing saved course details while live data loads."
//             );
//           } else {
//             setCourse(null);
//             setCourseError("Course not found.");
//           }
//         }
//       } catch (err) {
//         if (!ignore) {
//           console.error("Failed to fetch course and skills", err);
//           if (fallbackCourse) {
//             setCourse(fallbackCourse);
//             setCourseError(
//               "Showing saved course details while live data loads."
//             );
//           } else {
//             setCourse(null);
//             setCourseError("Unable to load this course right now.");
//           }
//         }
//       } finally {
//         if (!ignore) {
//           setLoadingCourse(false);
//         }
//       }
//     };

//     loadCourseAndSkills();

//     return () => {
//       ignore = true;
//     };
//   }, [
//     courseIdentifier,
//     courseSlug,
//     matchCourseFromList,
//     safeCourseParam,
//   ]);

//   const [showMore, setShowMore] = useState(false);
//   const SPECIAL_COUPON_CODE = "MEGA99";
//   const SPECIAL_DISCOUNT = 0.99; // 99% off
//   const DEFAULT_COUPON_DISCOUNT = 0.25; // 25% off legacy

//   // Parse backend coupon discount values which may be numbers or strings
//   const parseBackendCouponDiscount = (raw) => {
//     if (raw == null) return undefined;
//     // If it's already a number
//     if (typeof raw === "number") {
//       // assume values > 1 are percentage like 25 => 0.25
//       return raw > 1 ? Math.min(Math.max(raw / 100, 0), 0.9999) : Math.min(Math.max(raw, 0), 0.9999);
//     }
//     const s = String(raw).trim();
//     if (!s) return undefined;
//     // strings like "25%"
//     if (s.endsWith("%")) {
//       const n = parseFloat(s.slice(0, -1));
//       if (!isNaN(n)) return Math.min(Math.max(n / 100, 0), 0.9999);
//     }
//     // numeric string "0.25" or "25"
//     const f = parseFloat(s.replace(/[^0-9.\-]/g, ""));
//     if (!isNaN(f)) {
//       return f > 1 ? Math.min(Math.max(f / 100, 0), 0.9999) : Math.min(Math.max(f, 0), 0.9999);
//     }
//     return undefined;
//   };

//   // Price handling: compute original (stored price), offer price (if present),
//   // and coupon-discounted price based on applied discount.
//   // Use finalOfferPrice from location state if passed from OnlineCourseCard
//   const rawOriginal = course?.price ??
//     (course?.price_cents ? Math.round(course.price_cents / 100) : 0);
//   const rawOffer = passedFinalOfferPrice ?? (course?.offerPrice ?? rawOriginal);

//   const originalNumeric =
//     parseFloat(String(rawOriginal).replace(/[^0-9.]/g, "")) || 0;
//   const offerNumeric =
//     parseFloat(String(rawOffer).replace(/[^0-9.]/g, "")) || originalNumeric || 0;

//   const basePriceCents = Math.round(offerNumeric * 100);
//   const effectiveDiscount = isCouponApplied ? couponDiscount : 0;
//   const discountedPriceCents = Math.max(
//     Math.round(basePriceCents * (1 - effectiveDiscount)),
//     1,
//   );

//   const priceCents = basePriceCents > 0 && isCouponApplied
//     ? discountedPriceCents
//     : basePriceCents;

//   const displayAmount = Math.max(Math.round(priceCents / 100), 1);
//   const originalAmount = Math.max(Math.round(originalNumeric), 0);
//   const offerAmount = Math.max(Math.round(offerNumeric), 0);
//   const couponAmount = Math.max(Math.round(discountedPriceCents / 100), 1);
//   const redirectTarget = encodeURIComponent(
//     location.pathname + location.search
//   );

//   const courseName = course?.name || course?.title || "Course";

//   const courseSubtitle =
//     course?.subtitle ||
//     "Join this course to enhance your skills and advance your career.";

//   const instructorName =
//     course?.instructor || course?.instructor_name || "Instructor";
//   const courseImage =
//     course?.image || course?.cover_image || "/placeholder-course.jpg";
//   const courseLevel = course?.level || "Beginner";
//   const courseDuration = course?.duration || "Self-paced";
//   const courseUpdated = course?.updated || "Recently updated";
//   const ratingValue = course?.rating ;
//   const ratingCount = course?.ratersCount ;
//   const courseLessons = Array.isArray(course?.content) ? course.content : [];
//   const courseChapters = Array.isArray(course?.chapters) ? course.chapters : [];

//   const sanitizePhone = (value) => {
//     const digitsOnly = String(value || "").replace(/[^0-9]/g, "");
//     if (digitsOnly.length >= 8) return digitsOnly.slice(0, 10);
//     return "";
//   };

//   useEffect(() => {
//     if (!user) return;

//     setDetailsForm((prev) => ({
//       ...prev,
//       fullName:
//         prev.fullName ||
//         profile?.full_name ||
//         user.user_metadata?.full_name ||
//         "",
//       email: prev.email || user.email || "",
//       phone:
//         prev.phone ||
//         sanitizePhone(
//           profile?.phone || user.user_metadata?.phone || user.phone || ""
//         ),
//       course: prev.course || courseName || "",
//     }));
//   }, [profile, user, courseName]);

//   useEffect(() => {
//     return () => {
//       if (paymentStepTimer.current) {
//         clearTimeout(paymentStepTimer.current);
//       }
//     };
//   }, []);

//   const loadCheckoutScript = () => {
//     if (document.getElementById("phonepe-checkout-js")) return Promise.resolve();
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.id = "phonepe-checkout-js";
//       script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
//       script.onload = () => resolve();
//       script.onerror = () => reject(new Error("Failed to load PhonePe checkout"));
//       document.body.appendChild(script);
//     });
//   };

//   const openWithToken = async (token, checkoutBaseUrl) => {
//     const tokenUrl = `${checkoutBaseUrl}?token=${token}`;
//     try {
//       await loadCheckoutScript();
//       if (window.PhonePeCheckout?.transact) {
//         window.PhonePeCheckout.transact({
//           tokenUrl,
//           callback: () => {
//             // Nothing to do; server will poll status/redirect page handles it
//           },
//           type: "IFRAME",
//         });
//         return;
//       }
//     } catch (e) {
//       console.error("checkout.js load error", e);
//     }
//     // Fallback: hard redirect
//     window.location.href = tokenUrl;
//   };

//   const handleOpenEnrollment = async () => {
//     if (!user) {
//       setCheckoutError("Please log in to continue your enrollment.");
//       navigate(`/login?redirect=${redirectTarget}`);
//       return;
//     }

//     if (!course) {
//       setCheckoutError("Course data is still loading. Please try again.");
//       return;
//     }

//     if (isProcessingPayment) {
//       return; // Prevent double clicks
//     }

//     // Directly initiate PhonePe payment
//     setIsProcessingPayment(true);
//     setCheckoutError("");
    
//     try {
//       const paymentData = await createPhonePePayment({
//         amount: displayAmount,
//         currency: "INR",
//         courseId: course.id || course.skillId,
//         courseSlug: courseSlug,
//         userEmail: user.email,
//         userName: profile?.fullName || user.email?.split("@")[0] || "Student",
//       });

//       const payUrl = paymentData?.payPageUrl || paymentData?.redirectUrl;
//       const token = paymentData?.token;
//       const checkoutBaseUrl = paymentData?.checkoutBaseUrl;

//       if (payUrl) {
//         window.location.href = payUrl;
//       } else if (token && checkoutBaseUrl) {
//         await openWithToken(token, checkoutBaseUrl);
//         setIsProcessingPayment(false);
//       } else {
//         setCheckoutError("Failed to initiate payment. Please try again.");
//         setIsProcessingPayment(false);
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       const detail = error?.details?.error || error?.details?.message;
//       const detailJson = error?.details ? JSON.stringify(error.details) : "";
//       setCheckoutError(
//         detail || detailJson || error.message || "Failed to create payment. Please try again."
//       );
//       setIsProcessingPayment(false);
//     }
//   };

//   const closeEnrollmentFlow = () => {
//     setShowEnrollmentFlow(false);
//     setEnrollmentStep(1);
//     setPaymentConfirmed(false);
//     setIsAdvancingStep(false);
//     if (paymentStepTimer.current) {
//       clearTimeout(paymentStepTimer.current);
//       paymentStepTimer.current = null;
//     }
//   };

//   const handleDetailChange = (field, value) => {
//     setDetailsForm((prev) => ({
//       ...prev,
//       [field]:
//         field === "phone" ? value.replace(/[^0-9]/g, "").slice(0, 12) : value,
//     }));
//   };

//   const proceedToDetailsStep = () => {
//     setIsAdvancingStep(true);
//     setEnrollmentStep("waiting");
//     paymentStepTimer.current = setTimeout(() => {
//       setEnrollmentStep(2);
//       setIsAdvancingStep(false);
//     }, 2000);
//   };

//   const handleApplyCoupon = () => {
//     const rawCode = couponCode.trim();
//     if (!rawCode) {
//       setCouponError("Please enter a coupon code.");
//       return;
//     }

//     const normalizedCode = rawCode.toLowerCase().trim();

//     // Global 99% off coupon
//     if (normalizedCode === SPECIAL_COUPON_CODE.toLowerCase()) {
//       setIsCouponApplied(true);
//       setCouponDiscount(SPECIAL_DISCOUNT);
//       setCouponError("");
//       return;
//     }

//     // Check if the entered code matches the backend coupon code
//     if (!course?.couponcode) {
//       setCouponError("No coupon code available for this course.");
//       setIsCouponApplied(false);
//       return;
//     }

//     const backendCode = course.couponcode.toLowerCase().trim();

//     if (normalizedCode !== backendCode) {
//       // setCouponError(`Invalid coupon code. Use: ${course.couponcode}`);
//        setCouponError("Invalid coupon code.");
//       setIsCouponApplied(false);
//       setCouponDiscount(0);
//       return;
//     }

//     setIsCouponApplied(true);
//     // Use backend-provided couponDiscount when available, else fallback to default
//     const backendDiscount = parseBackendCouponDiscount(
//       course?.couponDiscount ?? course?.coupondiscount ?? course?.coupon_discount ?? course?.discount
//     );
//     setCouponDiscount(typeof backendDiscount === "number" ? backendDiscount : DEFAULT_COUPON_DISCOUNT);
//     setCouponError("");
//   };

//   const handleRemoveCoupon = () => {
//     setIsCouponApplied(false);
//     setCouponCode("");
//     setCouponError("");
//     setCouponDiscount(0);
//   };

//   const handleCopyUpi = async () => {
//     try {
//       await navigator.clipboard.writeText(PAYMENT_UPI_ID);
//       setUpiCopied(true);
//       setTimeout(() => setUpiCopied(false), 2000);
//     } catch (error) {
//       console.warn("Unable to copy UPI id", error);
//     }
//   };

//   const visibleData = showMore
//     ? specializationData
//     : specializationData.slice(0, 5);

//   const levelColor = {
//     Beginner: "bg-green-100 text-green-800",
//     Intermediate: "bg-yellow-100 text-yellow-800",
//     Advanced: "bg-red-100 text-red-800",
//   };

//   if (loadingCourse) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-black">
//         {/* <p>Loading course details...</p> */}
//         <CourseSkeletonuLoadingUi />
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white bg-black">
//         <p>
//           {courseError ||
//             "Course not found. Try picking another program from the catalog."}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="max-w-6xl mx-auto mt-10 p-6">
//         <BannerSection />

//         {courseError && course && (
//           <p className="text-center text-sm text-yellow-200 mb-4">
//             {courseError}
//           </p>
//         )}

//         {/* --- Top Split Section --- */}
//         <div
//           className="mt-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
//   transition-all duration-500 shadow-lg rounded-2xl p-6 mb-6 
//   flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start"
//         >
//           {/* Left: Image */}
//           <div className="mx-auto bg-white rounded-2xl shadow-md overflow-hidden w-56 sm:w-64 md:w-72 lg:w-80 relative">
//             <LazyImage
//               src={courseImage}
//               alt={courseName}
//               className="w-full h-full bg-white"
//               imgClassName="w-full h-auto object-contain p-3 rounded-2xl"
//               placeholderNode={
//                 <div className="flex items-center justify-center p-6">
//                   <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
//                 </div>
//               }
//             />
//           </div>

//           {/* Divider (visible only on desktop) */}
//           <div className="hidden md:flex items-center h-64">
//             <div className="w-px h-full bg-white/40"></div>
//           </div>

//           {/* Right: Course Info */}
//           <div className="flex-1 text-center md:text-left text-white">
//             <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//               {courseName}
//             </h1>
//             <p className="text-base sm:text-lg mb-3">{courseSubtitle}</p>

//             <span
//               className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                 levelColor[courseLevel] || "bg-slate-200 text-slate-800"
//               }`}
//             >
//               {courseLevel}
//             </span>

//             {/* Course details with icons */}
//             <div className="mt-5 space-y-3">
//               <div className="flex items-center justify-center md:justify-start gap-2">
//                 <Clock size={18} className="text-blue-200 shrink-0" />
//                 <span className="text-sm sm:text-base">
//                   <span className="font-semibold">Duration:</span>{" "}
//                   {courseDuration}
//                 </span>
//               </div>

//               {/* <div className="flex items-center justify-center md:justify-start gap-2">
//                 <Calendar size={18} className="text-blue-200 shrink-0" />
                
//               </div> */}

//               <div className="flex items-center justify-center md:justify-start gap-2">
//                 <User size={18} className="text-blue-200 shrink-0" />
//                  <span className="text-sm sm:text-base">
//                   <span className="font-semibold">Instructor:</span>{" "}
//                   {instructorName}
//                 </span>
//               </div>
//             </div>

//             {/* Price, Enroll Button & Coupon */}

//             <div className="mt-6 flex flex-col gap-3">
//               <div className="flex items-center gap-3">
//                 <p className="text-xl sm:text-2xl font-bold flex items-baseline gap-2">
//                   {/* Show original price when it's different from the displayed price */}
//                   {originalAmount > 0 && originalAmount !== displayAmount && (
//                     <span className="text-base sm:text-lg line-through opacity-70">
//                       ₹{originalAmount}
//                     </span>
//                   )}

//                   {/* If there's an offer price (different from original) and no coupon, show it as main price */}
//                   {/* If coupon applied, displayAmount will be the coupon price */}
//                   <span>₹{displayAmount}</span>
//                 </p>

//                 {/* Small badge when coupon is applied */}
//                 {isCouponApplied && (
//                   <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                     {Math.round((couponDiscount || 0) * 100)}% OFF Applied
//                   </span>
//                 )}
//               </div>

//               {/* If coupon is applied and the offer price is different from the coupon price, show the offer price as reference */}
//               {isCouponApplied && offerAmount > 0 && offerAmount !== couponAmount && (
//                 <p className="text-xs text-white/80">Offer Price: ₹{offerAmount}</p>
//               )}

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-3">
//                 <button
//                   onClick={handleOpenEnrollment}
//                   disabled={isProcessingPayment}
//                   className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold px-6 py-2 rounded-md text-sm sm:text-base border shadow-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//                 >
//                   {isProcessingPayment ? (
//                     <span className="flex items-center gap-2">
//                       <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Redirecting...
//                     </span>
//                   ) : (
//                     "Enroll Now"
//                   )}
//                 </button>

//                 <div className="flex gap-2 items-center">
//                   <input
//                     type="text"
//                     placeholder={
//                       // course?.couponcode
//                         // ? `Hint: ${course.couponcode}` : 
//                        "Enter coupon code"
//                     }
//                     value={couponCode}
//                     onChange={(e) => {
//                       setCouponCode(e.target.value);
//                       if (couponError) setCouponError("");
//                     }}
//                     onKeyPress={(e) => {
//                       if (e.key === "Enter") {
//                         handleApplyCoupon();
//                       }
//                     }}
//                     disabled={isCouponApplied}
//                     className="w-32 sm:w-40 px-3 py-2 rounded-md text-sm border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"
//                   />

//                   {!isCouponApplied ? (
//                     <button
//                       onClick={handleApplyCoupon}
//                       className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap"
//                     >
//                       Apply
//                     </button>
//                   ) : (
//                     <button
//                       onClick={handleRemoveCoupon}
//                       className="px-3 sm:px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-md text-sm transition-colors whitespace-nowrap"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {couponError && (
//                 <p className="text-xs text-red-100 text-left">{couponError}</p>
//               )}

//               {checkoutError && (
//                 <p className="text-xs text-red-200 bg-red-500/20 px-3 py-2 rounded-md text-left">{checkoutError}</p>
//               )}

//               {/* {course?.couponcode && !isCouponApplied && (
//                 <p className="text-xs text-green-200 text-left">
//                   Valid code:{" "}
//                   <span className="font-semibold">{course.couponcode}</span>
//                 </p>
//               )} */}
//             </div>

//             {/* _________ */}

//             {/* {checkoutError && (
//               <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 px-3 py-2 rounded-md text-sm">
//                 <span className="font-semibold">⚠ Error:</span> {checkoutError}
//               </div>
//             )} */}

//             {checkoutSuccess && (
//               <div
//                 className="
//       mt-3 flex items-start sm:items-center gap-2 
//       bg-green-100 border border-green-300 
//       text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base
//       shadow-sm w-full max-w-full
//     "
//               >
//                 <span className="font-bold text-green-900 text-lg">✔</span>
//                 <p className="leading-tight break-words flex-1">
//                   <span className="font-semibold">Success:</span>{" "}
//                   {checkoutSuccess}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* --- Rating Section --- */}
//         <div className="bg-gray-50 p-5 rounded-xl shadow mb-6 flex items-center justify-center gap-2 text-center">
//           <FaStar className="text-yellow-500" />
//           <span className="font-semibold text-gray-800 text-lg">
//             {ratingValue} ({ratingCount} ratings)
//           </span>
//         </div>

//         {/* --- Course Description Section --- */}
//         {course?.description && (
//           <>
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               Course Description
//             </h2>
//             <div className="bg-gray-50 p-6 rounded-xl shadow mb-6 text-gray-700 prose prose-sm max-w-none">
//               <div dangerouslySetInnerHTML={{ __html: course.description }} />
//             </div>
//           </>
//         )}

//         {/* --- Course Content Section --- */}
//         <h1 className="mt-10 font-semibold text-3xl mb-6">Course Content</h1>
//         <CourseChapter chapters={courseChapters} />
//         {/* --- block Note Section --- */}

//         <div className="mt-10 p-6 bg-gray-100 rounded-2xl">
//           <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8  p-6 md:p-10 rounded-2xl">
//             {/* Card 1 */}
//             <div
//               className="w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 
//                 hover:scale-110"
//             >
//               <img
//                 src={img1}
//                 alt="Image 1"
//                 className="w-full h-40 md:h-48 object-contain rounded-xl mb-3"
//               />
//               <h1 className="text-sm md:text-base text-gray-800 font-medium">
//                 You can start NxtWave Academy right after Intermediate/12th
//               </h1>
//             </div>

//             {/* Card 2 */}
//             <div
//               className=" h-71 w-64 md: h-77   bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 
//                 hover:scale-110"
//             >
//               <img
//                 src={img2}
//                 alt="Image 2"
//                 className="w-full h-40 md:h-48 object-contain rounded-xl mb-3"
//               />
//               <h1 className="text-sm md:text-base text-gray-800 font-medium">
//                 Learn 6 hours a week alongside college
//               </h1>
//             </div>

//             {/* Card 3 */}
//             <div
//               className="w-64 md:w-60 bg-white border rounded-2xl shadow-md p-4 text-center transition-transform duration-300 
//                 hover:scale-110"
//             >
//               <img
//                 src={img3}
//                 alt="Image 3"
//                 className="w-full h-40 md:h-48 object-contain rounded-xl mb-3"
//               />
//               <h1 className="text-sm md:text-base text-gray-800 font-medium">
//                 Land a high-paid software job irrespective of your
//                 college/branch
//               </h1>
//             </div>
//           </div>
//         </div>

//         <RecognizedTrusted />

//         {/* --- Specialization Description Section --- */}
//         <div className="mt-10 mb-10">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//             What You'll Learn
//           </h2>

//           <ul className="list-disc list-inside space-y-2 text-gray-700">
//             {visibleData.map((line, index) => (
//               <li key={index}>{line}</li>
//             ))}
//           </ul>

//           <button
//             onClick={() => setShowMore(!showMore)}
//             className="mt-3 text-blue-600 font-medium hover:underline"
//           >
//             {showMore ? "Read Less" : "Read More"}
//           </button>
//         </div>
//       </div>

//       <ShowEnrollmentFlow
//         isOpen={showEnrollmentFlow}
//         onClose={closeEnrollmentFlow}
//         enrollmentStep={enrollmentStep}
//         paymentConfirmed={paymentConfirmed}
//         setPaymentConfirmed={setPaymentConfirmed}
//         proceedToDetailsStep={proceedToDetailsStep}
//         isAdvancingStep={isAdvancingStep}
//         handleCopyUpi={handleCopyUpi}
//         upiCopied={upiCopied}
//         PAYMENT_UPI_ID={PAYMENT_UPI_ID}
//         displayAmount={displayAmount}
//         detailsForm={detailsForm}
//         handleDetailChange={handleDetailChange}
//         user={user}
//         course={course}
//         courseIdentifier={courseIdentifier}
//         courseSlug={courseSlug}
//         courseName={courseName}
//         priceCents={priceCents}
//         setCheckoutError={setCheckoutError}
//         setCheckoutSuccess={setCheckoutSuccess}
//         onSuccess={closeEnrollmentFlow}
//       />
//     </>
//   );
// };

// export default CourseDetails;