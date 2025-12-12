import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
// course data comes from backend via `fetchCourses` (no local fallback)
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { fetchCourses } from "../../services/courseService";
import { getCourseDetailPath } from "../../utils/helpers";

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
        const data = await fetchCourses();

        // Set reversed data only once
        if (!ignore && Array.isArray(data) && data.length > 0) {
          setCourses(data.reverse());
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadCourses();
    return () => (ignore = true);
  }, []);

  // Use backend-provided reversed data
  const sourceData = courses; // `courses` is already reversed when set

  const filteredSkills = useMemo(() => {
    return sourceData.filter((skill) =>
      (skill?.name || skill?.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sourceData, search]);

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
        Industrial Training
      </h1>

      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
        Our Industrial Training program is designed to equip students and
        working professionals with hands-on, real-time practical experience.
        With structured learning, expert mentorship, and project-based training,
        participants gain industry-level skills that enhance employability and
        accelerate career growth.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <input
          type="text"
          placeholder="Search skill..."
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
              <Link to={detailPath}>
                <div
                  className="h-[180px] w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      skill?.image || skill?.cover_image || "/placeholder.jpg"
                    })`,
                  }}
                />
              </Link>

              <div className="p-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {skill?.name || skill?.title}
                </h2>

                <div className="flex items-center gap-1 mt-2">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm font-semibold">
                    {skill?.rating || "4.8"}
                  </span>
                </div>

                <p className="clamp-2 text-slate-700 text-sm mt-3 mb-4">
                  {skill?.desc || skill?.description}
                </p>

                <div className="px-4 pb-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* Original Price - Only show if offerPrice exists */}
                    {skill?.offerPrice && (
                      <p className="text-lg font-bold line-through text-indigo-700">
                        ₹
                        {skill?.price ||
                          Math.round((skill?.price_cents || 0) / 100)}
                      </p>
                    )}

                    {/* Display Offer Price or regular price */}
                    <p className="text-green-600 font-bold">
                      ₹
                      {skill?.offerPrice ||
                        skill?.price ||
                        Math.round((skill?.price_cents || 0) / 100)}
                    </p>
                  </div>

                  <Link
                    to={detailPath}
                    className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-xl 
                      shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Enroll Now
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
