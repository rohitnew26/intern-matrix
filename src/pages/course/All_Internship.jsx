import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { getCourseDetailPath } from "../../utils/helpers";
import CourseCardSkeleton from "../skeletonLoadingUi/CourseCardSkeleton";

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadCourses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("courses").select("*");

        if (error) throw error;

        const arr = data || [];

        if (!ignore && Array.isArray(arr)) {
          const formatted = arr.map((course) => ({
            ...course,
            name: course.title,
            image: course.thumbnail_url || course.thumbnail || course.image,
            offerPrice: course.offerprice || Math.round((course.price_cents || 0) / 100),
            originalPrice: course.mrp_cents ? Math.round(course.mrp_cents / 100) : Math.round((course.price_cents || 0) / 100),
            price: Math.round((course.price_cents || 0) / 100),
            category: course.category,
            course_type: course.course_type || course.type || course.category || "General",
            desc: (course.overview || course.description || "").replace(/<[^>]+>/g, ""),
          }));

          setCourses(formatted.reverse());
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch industrial training data", err);
          setError(err);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadCourses();
    return () => (ignore = true);
  }, []);

  const filteredSkills = useMemo(() => {
    return courses.filter((skill) =>
      (skill?.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  // Resolve image URLs robustly: accept absolute URLs, root-relative, and relative paths
  const getValidImage = (img) => {
    const placeholder = "https://via.placeholder.com/600x400?text=No+Image"; // external fallback
    if (!img) return placeholder;
    try {
      // absolute http(s) URL
      if (/^https?:\/\//i.test(img)) return img;
      // root-relative path
      if (img.startsWith("/")) return img;
      // relative path - make it absolute relative to origin
      return `${window.location.origin}/${img.replace(/^\.?\//, "")}`;
    } catch (e) {
      console.warn("getValidImage failed for", img, e);
      return placeholder;
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
        Industrial Training
      </h1>

      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
        Our Industrial Training program is designed to equip students and
        working professionals with hands-on, real-time practical experience.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <input
          type="text"
          placeholder="Search industrial training..."
          className="px-4 py-2 border rounded-[25px] w-full sm:w-72 shadow-md focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link
          to="/course"
          className="flex justify-center items-center gap-2 font-semibold"
        >
          <Compass size={28} className="text-indigo-700" /> Explore Courses
        </Link>
      </div>

      {loading && <CourseCardSkeleton />}
      {error && (
        <>
          {" "}
          <CourseCardSkeleton />
          <p className="text-center text-red-500"> Network error. Please try again later.</p>
        </>
      )}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredSkills.map((skill, idx) => {
          const detailPath = getCourseDetailPath(skill, `course-${idx}`);

          return (
            <div
              key={idx}
              className="relative rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2
              transition-all duration-500 border border-indigo-200 hover:border-indigo-400
              overflow-hidden"
            >
              <Link to={detailPath} state={{ course: skill, finalOfferPrice: skill.offerPrice }}>
                <div className="relative">
                  <img
                    src={getValidImage(skill?.image)}
                    alt={skill?.name || "course thumbnail"}
                    className="h-[180px] w-full object-cover"
                    onError={(e) => {
                      // Log helpful debug info when an image fails to load
                      try {
                        console.warn("Image failed to load for course:", skill?.name, "src:", e.currentTarget.src);
                      } catch (err) {
                        console.warn("Image onError handler error", err);
                      }
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />

                  <div className="absolute top-3 right-3 z-10 bg-yellow-100/60 text-gray-900 text-xl font-semibold px-4 py-1 rounded-full shadow">
                    {skill.course_type || "General"}
                  </div>
                </div>
              </Link>

              <div className="p-4">
                {/* category is now shown as an overlay on the thumbnail */}

                <h2 className="text-xl font-bold text-slate-900">
                  {skill.name}
                </h2>

                <div className="flex items-center justify-between mt-2 w-full">
                  {/* Left: Rating */}
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm font-semibold">
                      {skill?.rating || "4.8"}
                    </span>
                  </div>

                  {/* Right: Duration */}
                  <span className="text-xl font-semibold">
                    {skill?.duration || "3 weeks"}
                  </span>
                </div>

                <p className="clamp-2 text-slate-700 text-sm mt-3 mb-4">
                  {skill.desc}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <span className=" text-lg text-gray-500 line-through font-semibold">
                      ₹{skill.originalPrice}
                    </span>
                    {(skill.offerPrice || skill.price) && (
                      <span className="text-green-600 text-lg text-bold">
                        ₹{skill.offerPrice || skill.price}
                      </span>
                    )}
                  </div>

                  <Link
                    to={detailPath}
                    state={{ course: skill, finalOfferPrice: skill.offerPrice }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
 