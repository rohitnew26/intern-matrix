import React, { useEffect, useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { getCourseDetailPath } from "../../utils/helpers";

const Courses = () => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadCourses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("status", "published")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (!ignore && Array.isArray(data)) {
          const formatted = data.map((course) => {
            // Direct conversion from DB paise to rupees
            const priceRupees = course.price_cents ? Math.round(course.price_cents / 100) : 0;
            const mrpRupees = course.mrp_cents ? Math.round(course.mrp_cents / 100) : priceRupees;

            return {
              ...course,
              name: course.title,
              image:
                course.thumbnail_url ||
                course.cover_image ||
                course.course_image ||
                course.banner_url ||
                course.thumbnail,
              offerPrice: priceRupees,
              originalPrice: mrpRupees,
              price: priceRupees,
              category: course.category,
              desc: course.description?.replace(/<[^>]+>/g, ""),
            };
          });

          setCourses(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setCourses([]); // just empty silently
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

  const instructors = useMemo(() => {
    return [...new Set(sourceData.map((c) => c.instructor || c.instructor_name || ""))].filter(Boolean);
  }, [sourceData]);

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const categories = useMemo(() => {
    return [...new Set(sourceData.map((c) => c.category || c.tags?.[0] || ""))].filter(Boolean);
  }, [sourceData]);

  const filteredCourses = useMemo(() => {
    const searchLower = search.toLowerCase();

    return sourceData.filter((course) => {
      const courseName = (course.name || course.title || "").toLowerCase();
      const instructorName = (course.instructor || course.instructor_name || "").toLowerCase();
      const categoryName = (course.category || course.tags?.[0] || "").toLowerCase();
      const priceValue =
        parseInt(course.price, 10) || Math.round((course.price_cents || 0) / 100) || 0;

      const matchesSearch =
        courseName.includes(searchLower) ||
        instructorName.includes(searchLower) ||
        categoryName.includes(searchLower);

      return (
        matchesSearch &&
        (!selectedInstructor || (course.instructor || course.instructor_name) === selectedInstructor) &&
        (!selectedLevel || course.level === selectedLevel) &&
        (!selectedCategory || (course.category || course.tags?.[0]) === selectedCategory) &&
        priceValue <= priceRange
      );
    });
  }, [sourceData, search, selectedInstructor, selectedLevel, selectedCategory, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row gap-5 p-4">
      <button
        onClick={() => setShowSidebar(true)}
        className={`lg:hidden fixed bottom-6 right-6 z-40 items-center gap-2 bg-white border shadow px-4 py-2 rounded-full text-sm font-semibold ${showSidebar ? "hidden" : "flex"}`}
      >
        <Filter size={16} /> Filters
      </button>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <aside
        className={`bg-white rounded-xl p-4 shadow-md space-y-6 lg:w-64 flex-shrink-0
        lg:sticky lg:top-20 transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed top-0 left-0 h-full lg:h-auto z-40 overflow-y-auto`}
      >
        <button
          onClick={() => {
            setSelectedInstructor("");
            setSelectedLevel("");
            setSelectedCategory("");
            setPriceRange(2000);
          }}
          className="w-40 text-black py-2 rounded-lg border font-semibold transition-colors"
        >
          Clear All Filters
        </button>

        {/* Instructor Filter */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Instructor</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={selectedInstructor === ""} onChange={() => setSelectedInstructor("")} />
              <span>All</span>
            </label>

            {instructors.map((i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedInstructor === i}
                  onChange={() => setSelectedInstructor(i)}
                />
                <span>{i}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Difficulty</h2>
          <div className="flex flex-col gap-2">
            {["", ...levels].map((l) => (
              <label key={l} className="flex items-center gap-2">
                <input type="checkbox" checked={selectedLevel === l} onChange={() => setSelectedLevel(l)} />
                <span>{l || "All"}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Category</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={selectedCategory === ""} onChange={() => setSelectedCategory("")} />
              <span>All</span>
            </label>

            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === c}
                  onChange={() => setSelectedCategory(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Price Range</h2>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">₹ 0 – {priceRange}</p>
        </div>
      </aside>

      {/* Right Section */}
      <section className="flex-1 w-full">
        <input
          type="text"
          placeholder="Search course..."
          className="border w-full sm:w-80 px-3 py-2 rounded-full mb-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading && !courses.length &&
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-80 rounded-2xl bg-white/40 animate-pulse" />
            ))}

          {filteredCourses.map((skill, idx) => {
            const detailPath = getCourseDetailPath(skill, `course-${idx}`);
            return (
              <div
                key={idx}
                className="relative rounded-2xl shadow transition transform hover:scale-105 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-4 mb-4">
                  <Link to={detailPath}>
                    <div
                      className="h-[180px] w-full mb-4 overflow-hidden rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${skill.image || skill.cover_image || "/placeholder-course.jpg"})`,
                      }}
                    >
                      <p className="m-3 inline-flex justify-center items-center text-sm text-black bg-amber-200 rounded-2xl h-5 font-semibold px-3">
                        {skill.category || skill.tags?.[0] || "General"}
                      </p>
                    </div>
                  </Link>

                  <h2 className="text-lg font-semibold text-gray-900">
                    {skill.name || skill.title}
                  </h2>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="text-sm font-medium text-black">
                        {skill.rating || "4.8"}
                      </span>
                      <span className="text-xs text-black">
                        ({skill.ratersCount || 120})
                      </span>
                    </div>
                  </div>

                  <p className="clamp-2 text-white text-sm mb-4">
                    {skill.desc || skill.description}
                  </p>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500 line-through font-semibold">
                        ₹{skill.originalPrice}
                      </p>
                      <p className="text-green-600 font-bold">
                        ₹{skill.offerPrice}
                      </p>
                    </div>

                    <Link
                      to={detailPath}
                      className="oswald border p-2 hover:scale-110 transition-transform duration-300 inline-block"
                    >
                      Enroll now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && filteredCourses.length === 0 && (
            <p className="col-span-full text-center">No results</p>
          )}
        </main>
      </section>
    </div>
  );
};

export default Courses;
