import React, { useEffect, useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../services/courseService";
import { getCourseDetailPath } from "../../utils/helpers";
import LazyImage from "../../components/common/LazyImage";

let hasPrefetchedCourseDetails = false;
const prefetchCourseDetails = () => {
  if (hasPrefetchedCourseDetails) return;
  hasPrefetchedCourseDetails = true;
  import("./CourseDetails.jsx");
};


const Courses = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [priceRange, setPriceRange] = useState(5000);  // Increased from 2000
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
        // Just filter for industrial training courses
        const industrialCourses = (data || []).filter((c) => {
          const courseType = (c.course_type || "").trim().toLowerCase();
          return courseType.includes("industrial");
        });

        console.log("📦 Fetched industrial courses:", industrialCourses.length);
        if (industrialCourses.length > 0) {
          console.log("💰 Sample course pricing:", {
            title: industrialCourses[0].title,
            price_cents: industrialCourses[0].price_cents,
            price: industrialCourses[0].price,
            offerPrice: industrialCourses[0].offerPrice,
            originalPrice: industrialCourses[0].originalPrice
          });
        }

        if (!ignore) {
          const coursesToUse = industrialCourses.length > 0 ? industrialCourses : data;
          setCourses(coursesToUse);
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
      const priceValue =
        parseInt(course.price, 10) ||
        Math.round((course.price_cents || 0) / 100) ||
        0;

      // Normalize duration for comparison (extract number and ignore singular/plural)
      const courseDuration = (course.duration || "").trim().toLowerCase();
      const durationNumber = courseDuration.match(/\d+/)?.[0] || "";

      // If search is empty, match all courses. Otherwise, match search terms
      const matchesSearch = s === "" ||
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
        priceValue <= priceRange
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

  return ( 
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-6 p-4 relative">
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

        {/* Sidebar */}
        <aside
          className={`bg-white rounded-xl p-5 shadow-md space-y-6 w-72 lg:w-64 flex-shrink-0
        lg:sticky lg:top-24 transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed top-0 left-0 h-full lg:h-auto z-40 overflow-y-auto`}
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

          {/* Category - moved above Instructor */}
          <div>
            <h2 className="font-semibold text-lg mb-2">category</h2>
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

          {/* Duration */}
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
                  <span>{dur} week{dur !== "1" ? "s" : ""}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Branch */}
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

          {/* Difficulty */}
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

          {/* Price */}
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

        {/* Main Content */}
        <section className="flex-1">
          {/* Search */}
          <div className="w-full flex justify-center mb-5">
            <input
              type="text"
              placeholder="Search industrial training..."
              className="border w-full sm:w-96 px-4 py-2 rounded-full shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && !courses.length && (
            <p className="text-center text-red-500 text-sm mb-4">
             Loading courses...
            </p>
          )}

          {/* Course grid */}
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading &&
              !courses.length &&
              [...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-72 bg-gray-200 rounded-2xl animate-pulse"
                />
              ))}

            {filteredCourses.map((skill, idx) => {
              const detailPath = getCourseDetailPath(skill);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
                >
                  <Link
                    to={detailPath}
                    onMouseEnter={prefetchCourseDetails}
                    onFocus={prefetchCourseDetails}
                  >
                    <div className="relative">
                      <LazyImage
                        asBackground
                        src={
                          skill.cover_image || skill.thumbnail || "/placeholder-course.jpg"
                        }
                        className="h-44 sm:h-48 w-full bg-center bg-cover rounded-t-xl"
                      >
                        <span className="absolute top-3 left-3 inline-block bg-white text-black text-sm px-3 py-2 rounded-full font-bold shadow-md">
                             {skill.duration || skill.tags?.[0] || "2 weeks"}
                        </span>
                      </LazyImage>
                    </div>
                  </Link>

                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">
                      {skill.name || skill.title}
                    </h2>

                    <div className="flex items-center gap-1 mb-3">
                      <FaStar className="text-yellow-400" size={16} />
                      <span className="text-sm font-semibold text-gray-800">
                        {skill.rating || "4.8"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {skill.subtitle ||
                        "Build job-ready experience via real projects and professional mentors."}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <p className="text-gray-500 line-through text-xl">
                          ₹{skill.price}
                        </p>
                        <p className="text-green-600 font-bold text-lg">
                          ₹{skill.offerPrice || skill.price}
                        </p>
                      </div>

                      <Link
                        to={detailPath}
                        onMouseEnter={prefetchCourseDetails}
                        onFocus={prefetchCourseDetails}
                        className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-md"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredCourses.length === 0 && (
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
