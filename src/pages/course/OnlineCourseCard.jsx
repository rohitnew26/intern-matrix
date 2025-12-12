import React, { useEffect, useMemo, useState, useRef } from "react";
import { Filter, Clock, Users, TrendingUp, Sparkles, Search, X } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "motion/react";
import { fetchCourses } from "../../services/courseService";
import { getCourseDetailPath } from "../../utils/helpers";
import LazyImage from "../../components/common/LazyImage";

let hasPrefetchedCourseDetails = false;
const prefetchCourseDetails = () => {
  if (hasPrefetchedCourseDetails) return;
  hasPrefetchedCourseDetails = true;
  import("./CourseDetails.jsx");
};

// Enhanced Course Card Component
const EnhancedCourseCard = ({ skill, idx, detailPath, finalOfferPrice }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefetchProps = {
    onMouseEnter: prefetchCourseDetails,
    onFocus: prefetchCourseDetails,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <Link to={detailPath} {...prefetchProps}>
        <div className="relative overflow-hidden">
          <LazyImage
            asBackground
            src={skill.cover_image || skill.thumbnail || "/placeholder-course.jpg"}
            className="h-44 sm:h-48 w-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Duration badge */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs px-3 py-1.5 rounded-full font-semibold shadow-md">
            <Clock className="w-3 h-3" />
            {skill.duration || skill.tags?.[0] || "2 weeks"}
          </span>
          
          {/* Level badge */}
          {skill.level && (
            <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-md">
              {skill.level}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link to={detailPath} {...prefetchProps}>
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {skill.name || skill.title}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {skill.subtitle || "Build job-ready experience via real projects and professional mentors."}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${i < Math.floor(skill.rating || 4.8) ? "text-yellow-400" : "text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-600">{skill.rating || "4.8"}</span>
        </div>

        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {skill.price && (
              <span className="text-gray-400 line-through text-sm">₹{skill.price}</span>
            )}
            <span className="text-green-600 font-bold text-lg">
              {finalOfferPrice ? `₹${finalOfferPrice}` : ""}
            </span>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={detailPath}
              state={{ finalOfferPrice, courseData: skill }}
              {...prefetchProps}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Enroll
              <TrendingUp className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        
        // fetchCourses() already normalizes data with correct prices
        // Just filter for online courses
        const onlineTrainingCourses = (data || []).filter(
          (c) => (c.course_type || "").toLowerCase().includes("online")
        );

        console.log("📦 Fetched online courses:", onlineTrainingCourses.length);
        if (onlineTrainingCourses.length > 0) {
          console.log("💰 Sample course pricing:", {
            title: onlineTrainingCourses[0].title,
            price_cents: onlineTrainingCourses[0].price_cents,
            price: onlineTrainingCourses[0].price,
            offerPrice: onlineTrainingCourses[0].offerPrice,
            originalPrice: onlineTrainingCourses[0].originalPrice
          });
        }

        if (!ignore) {
          setCourses(onlineTrainingCourses);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch courses from backend", err);
          setError(err.message || "Failed to load courses");
          setCourses([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadCourses();
    return () => {
      ignore = true;
    };
  }, []);

  const sourceData = courses;

  // Dynamically extract unique branches from course data
  const branches = useMemo(
    () => {
      const branchSet = new Set();
      sourceData.forEach((c) => {
        if (c.branch && c.branch.trim()) {
          branchSet.add(c.branch.trim());
        }
      });
      // Sort the branches for consistent display
      const branchArray = Array.from(branchSet).sort();
      if (branchArray.length > 0) {
        console.log("🏢 Available branches:", branchArray);
      }
      return branchArray;
    },
    [sourceData]
  );

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const durations = ["2", "3", "4", "5", "8", "12"];

  const categories = useMemo(
    () =>
      [
        ...new Set(sourceData.map((c) => c.category || c.tags?.[0] || "")),
      ].filter(Boolean),
    [sourceData]
  );

  const filteredCourses = useMemo(() => {
    const s = search.toLowerCase();

    const result = sourceData.filter((course) => {
      const courseName = (course.name || course.title || "").toLowerCase();
      const branchName = (course.branch || "").toLowerCase();
      const categoryName = (
        course.category ||
        course.tags?.[0] ||
        ""
      ).toLowerCase();

      // derive a numeric price value when available; if not available, leave undefined
      const priceValue =
        course.price !== null &&
        course.price !== undefined &&
        course.price !== ""
          ? Number(course.price)
          : course.price_cents
          ? Math.round((course.price_cents || 0) / 100)
          : undefined;

      const courseDuration = (course.duration || "").toLowerCase().trim();
      const durationNumber = courseDuration.match(/\d+/)?.[0] || "";

      const matchesSearch =
        s === "" ||
        courseName.includes(s) ||
        branchName.includes(s) ||
        categoryName.includes(s);

      // Handle branch filter with proper string comparison
      const courseBranch = (course.branch || "").trim();
      const branchMatches = !selectedBranch || courseBranch === selectedBranch;

      // Debug logging when branch filter is active
      if (selectedBranch && !branchMatches) {
        console.debug(`❌ Course "${course.title}" - branch mismatch. Expected: "${selectedBranch}", Got: "${courseBranch}"`);
      }

      return (
        matchesSearch &&
        branchMatches &&
        (!selectedLevel || course.level === selectedLevel) &&
        (!selectedCategory ||
          (course.category || course.tags?.[0]) === selectedCategory) &&
        (!selectedDuration || durationNumber === selectedDuration) &&
        // if price is not provided by backend, do not exclude the course based on price filter
        (priceValue === undefined || priceValue <= priceRange)
      );
    });

    if (selectedBranch) {
      console.log(`🔍 Branch filter "${selectedBranch}" - Found ${result.length} matching courses`);
    }

    return result;
  }, [
    sourceData,
    search,
    selectedBranch,
    selectedLevel,
    selectedCategory,
    selectedDuration,
    priceRange,
  ]);

  const displayCourses = useMemo(
    () => filteredCourses.slice().reverse(),
    [filteredCourses]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-6 p-4 relative">
      <button
        onClick={() => setShowSidebar(true)}
        className={`lg:hidden fixed bottom-6 right-6 z-40 bg-black text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${
          showSidebar ? "hidden" : "flex"
        }`}
      >
        <Filter size={18} /> Filter
      </button>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <aside
        className={`bg-white rounded-xl p-5 shadow-md space-y-6 w-72 lg:w-64 shrink-0
        lg:sticky lg:top-24 transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative fixed top-0 left-0 h-full lg:h-auto z-40 lg:z-auto overflow-y-auto`}
      >
        <div className="flex items-center justify-between lg:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <button
          onClick={() => {
            setSelectedBranch("");
            setSelectedLevel("");
            setSelectedCategory("");
            setSelectedDuration("");
            setPriceRange(5000);
          }}
          className="w-full border py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Clear Filters
        </button>

        <div>
          <h2 className="font-semibold text-lg mb-2">Category</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategory === ""}
                onChange={() => setSelectedCategory("")}
              />
              <span>All</span>
            </label>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Duration</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedDuration === ""}
                onChange={() => setSelectedDuration("")}
              />
              <span>All</span>
            </label>
            {durations.map((dur) => (
              <label key={dur} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDuration === dur}
                  onChange={() => setSelectedDuration(dur)}
                />
                <span>{dur} weeks</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Branch</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBranch === ""}
                onChange={() => setSelectedBranch("")}
              />
              <span>All</span>
            </label>
            {branches.map((b) => (
              <label key={b} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBranch === b}
                  onChange={() => setSelectedBranch(b)}
                />
                <span>{b}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Difficulty</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedLevel === ""}
                onChange={() => setSelectedLevel("")}
              />
              <span>All</span>
            </label>
            {levels.map((l) => (
              <label key={l} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLevel === l}
                  onChange={() => setSelectedLevel(l)}
                />
                <span>{l}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Price Range</h2>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-600">₹ 0 – {priceRange}</p>
        </div>
      </aside>

      <section className="flex-1">
        <div className="w-full flex justify-center mb-5">
          <input
            type="text"
            placeholder="Search Online Internships..."
            className="border w-full sm:w-96 px-4 py-2 rounded-full shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && !courses.length && (
          <p className="text-center text-red-500 text-sm mb-4">
            Network error. Please try again later.
          </p>
        )}

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading &&
            !courses.length &&
            [...Array(8)].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" />
                  <div className="flex justify-between items-center pt-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded-full w-24 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}

          {displayCourses.map((skill, idx) => {
            const detailPath = getCourseDetailPath(skill);
            const finalOfferPrice = skill.offerPrice ?? skill.price ?? "";

            return (
              <EnhancedCourseCard
                key={idx}
                skill={skill}
                idx={idx}
                detailPath={detailPath}
                finalOfferPrice={finalOfferPrice}
              />
            );
          })}

          {displayCourses.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No Results Found
            </p>
          )}
        </main>
      </section>
    </div>
  );
};

export default Courses;
