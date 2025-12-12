import React, { useEffect, useMemo, useState, useRef } from "react";
import { FaStar } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { Compass, Clock, Users, TrendingUp, Sparkles, Search, Filter } from "lucide-react";
import { motion, useInView } from "motion/react";
import { fetchCourses } from "../../services/courseService";
import { getCourseDetailPath } from "../../utils/helpers";
import LazyImage from "../../components/common/LazyImage";

// Enhanced Course Card Component
const CourseCard = ({ skill, idx, detailPath }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Determine badge type
  const getBadge = () => {
    if (skill.new) return { text: "NEW", color: "from-red-500 to-pink-500" };
    if (skill.popular) return { text: "POPULAR", color: "from-orange-500 to-amber-500" };
    if (skill.bestseller) return { text: "BESTSELLER", color: "from-green-500 to-emerald-500" };
    if (idx < 2) return { text: "TRENDING", color: "from-purple-500 to-indigo-500" };
    return null;
  };
  
  const badge = getBadge();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="absolute inset-[2px] bg-white rounded-2xl" />
      
      {/* Content wrapper */}
      <div className="relative">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-3 right-3 z-10 bg-gradient-to-r ${badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}
          >
            <Sparkles className="w-3 h-3" />
            {badge.text}
          </motion.div>
        )}

        {/* Image Section */}
        <Link to={detailPath} className="block relative overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <LazyImage
              asBackground
              src={skill.image || skill.cover_image || "/placeholder-course.jpg"}
              className="h-full w-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category pill */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 rounded-full px-3 py-1.5 shadow-sm">
                {skill.category || "General"}
              </span>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-black/70 backdrop-blur-sm text-white rounded-full px-3 py-1.5">
                <Clock className="w-3 h-3" />
                {skill.duration || "4 weeks"}
              </span>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <Link to={detailPath}>
            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {skill.name || skill.title}
            </h2>
          </Link>

          {/* Rating & Students */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(skill.rating || 4.8) ? "text-yellow-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 ml-1">
                {skill.rating || "4.8"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Users className="w-3 h-3" />
              <span>{skill.students || "1.2k"} students</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {skill.desc || skill.description || "Master industry-relevant skills with hands-on projects and expert mentorship."}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-4">
            {/* Price & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-[150px]">
                {skill.price && (
                  <span className="text-gray-400 line-through text-sm whitespace-nowrap">
                    ₹{skill.price}
                  </span>
                )}
                <span className="text-xl font-bold text-green-600 whitespace-nowrap">
                  ₹{skill.offerPrice || skill.price || "999"}
                </span>
              </div>

              <motion.div
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={detailPath}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                >
                  Enroll Now
                  <TrendingUp className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        if (!ignore && Array.isArray(data) && data.length) {
          console.log("📚 Courses loaded:", data);
          console.log("📍 Sample course with branch:", data[0]);
          setCourses(data);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load courses", err);
          setError(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
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
      const branchArray = Array.from(branchSet).sort();
      if (branchArray.length > 0) {
        console.log("🏢 Available branches:", branchArray);
      }
      return branchArray;
    },
    [sourceData]
  );

  const levels = ["Beginner", "Intermediate", "Advanced"];

  // Dynamically extract unique categories
  const categories = useMemo(
    () =>
      [
        ...new Set(
          sourceData.map((c) => c.category || c.tags?.[0] || "")
        ),
      ].filter(Boolean),
    [sourceData]
  );

  const filteredSkills = useMemo(() => {
    const s = search.toLowerCase();

    const result = sourceData.filter((skill) => {
      const skillName = (skill.name || skill.title || "").toLowerCase();
      const branchName = (skill.branch || "").toLowerCase();
      const categoryName = (skill.category || skill.tags?.[0] || "").toLowerCase();

      const matchesSearch =
        s === "" ||
        skillName.includes(s) ||
        branchName.includes(s) ||
        categoryName.includes(s);

      // Handle branch filter with proper string comparison
      const courseBranch = (skill.branch || "").trim();
      const branchMatches = !selectedBranch || courseBranch === selectedBranch;

      // Debug logging when branch filter is active
      if (selectedBranch && !branchMatches) {
        console.debug(`❌ Course \"${skill.title}\" - branch mismatch. Expected: \"${selectedBranch}\", Got: \"${courseBranch}\"`);
      }

      return (
        matchesSearch &&
        branchMatches &&
        (!selectedLevel || skill.level === selectedLevel) &&
        (!selectedCategory || (skill.category || skill.tags?.[0]) === selectedCategory)
      );
    });

    if (selectedBranch) {
      console.log(`🔍 Branch filter \"${selectedBranch}\" - Found ${result.length} matching courses`);
    }

    return result;
  }, [sourceData, search, selectedBranch, selectedLevel, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-6 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Industry-Ready Programs
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Industrial Training
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Equip yourself with hands-on, real-time practical experience through structured
          learning, expert mentorship, and project-based training.
        </p>
      </motion.div>

      {/* Mobile Filter Button */}
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

      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
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
            }}
            className="w-full border py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Clear Filters
          </button>

          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Category</h3>
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

          {/* Branch Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Branch</h3>
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

          {/* Difficulty Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Difficulty</h3>
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
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Link 
              to="/course" 
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-md"
            >
              <Compass size={20} />
              Explore All Courses
            </Link>
          </motion.div>

          {/* Error State */}
          {error && !courses.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 mb-8 bg-red-50 py-3 px-6 rounded-lg inline-block mx-auto"
            >
              Unable to load courses right now. Please try again later.
            </motion.p>
          )}

          {/* Course Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Loading Skeletons */}
            {loading && !courses.length &&
              Array.from({ length: 8 }).map((_, idx) => (
                <motion.div
                  key={`skeleton-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl overflow-hidden bg-white shadow-lg"
                >
                  <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" />
                    <div className="flex justify-between items-center pt-4">
                      <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
                      <div className="h-10 bg-gray-200 rounded-xl w-24 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}

            {/* Course Cards */}
            {filteredSkills.slice(0, 8).map((skill, idx) => {
              const detailPath = getCourseDetailPath(skill, `course-${idx}`);
              return (
                <CourseCard
                  key={idx}
                  skill={skill}
                  idx={idx}
                  detailPath={detailPath}
                />
              );
            })}
          </div>

          {/* No Results */}
          {!loading && filteredSkills.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
