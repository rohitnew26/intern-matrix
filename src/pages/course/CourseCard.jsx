import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { skillsData as fallbackSkills } from "../../assets/courseData/data";
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
        if (!ignore && Array.isArray(data) && data.length) {
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

  const sourceData = courses.length ? courses : fallbackSkills;

  const filteredSkills = useMemo(() => {
    return sourceData.filter((skill) =>
      (skill.name || skill.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sourceData, search]);

  return (
    <div className="min-h-screen  px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-2">Skills & Courses</h1>
      <p className="text-center text-gray-600 mb-8">
        Browse through core tech skills and learn from trusted sources.
      </p>

      {/* Search & Filter */}
      <div className="flex flex-col gap-20 sm:flex-row gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder=" Search skill..."
          className="px-4 py-2 border rounded-[25px] w-full sm:w-64 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/course" className="flex justify-center items-center">
          <Compass size={32} className="text-black" />
          Explore courses
        </Link>
      </div>

      {error && !courses.length && (
        <p className="text-center text-sm text-red-500 mb-4">
          Unable to load live catalog right now. Showing saved courses instead.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && !courses.length &&
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="h-80 rounded-3xl bg-white/10 animate-pulse"
            />
          ))}
        {filteredSkills.slice(0, 8).map((skill, idx) => {
          const detailPath = getCourseDetailPath(skill, `course-${idx}`);
          return (
          <div
            key={idx}
            className="relative rounded-3xl overflow-hidden
                 bg-white/15 backdrop-blur-xl 
                 border border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.2)]
                 hover:bg-white/25 hover:shadow-[0_8px_35px_rgba(0,0,0,0.25)]
                 transition-all duration-500 hover:scale-[1.04]"
          >
            {/* NEW Badge */}
            {skill.new && (
              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                NEW
              </span>
            )}

            {/* Banner Section */}
            <div className="p-4">
              <Link to={detailPath}>
                <div
                  className="h-[180px] w-full mb-4 overflow-hidden rounded-2xl bg-cover bg-center 
                       shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]"
                  style={{
                    backgroundImage: `url(${skill.image || skill.cover_image || "/placeholder-course.jpg"})`,
                  }}
                >
                  <p className="m-3 inline-flex text-xs font-bold bg-white/80 text-gray-900 rounded-lg px-3 py-[2px]">
                    {skill.category || "General"}
                  </p>
                </div>
              </Link>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 drop-shadow-sm">
                {skill.name || skill.title}
              </h2>

              {/* Rating + Instructor */}
              <div className="flex items-center justify-between mt-2 mb-3">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span className="text-sm font-semibold text-slate-800">
                    {skill.rating || "4.8"}
                  </span>
                  <span className="text-xs text-slate-600">
                    ({skill.ratersCount || 120})
                  </span>
                </div>

                {/* <p className="text-xs bg-white/40 text-slate-900 px-3 py-[3px] rounded-xl backdrop-blur-lg font-medium">
                  By {skill.instructor || "Unknown"}
                </p> */}
              </div>

              {/* Description */}
              <p className="clamp-2 text-slate-800 text-sm mb-4 leading-snug">
                {skill.desc || skill.description}
              </p>
            </div>

            {/* Price + Button */}
            <div className="px-4 pb-4 flex justify-between items-center">
               <div className="flex items-center gap-2">
              <p className="text-lg font-bold line-through font-semibold text-indigo-700">
                ₹{skill.price || Math.round((skill.price_cents || 0) / 100)}
              </p>

              <p className="text-green-600 font-bold">
                ₹{skill.offerPrice || Math.round((skill.price_cents || 0) / 100)}
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
        );})}
      </div>
    </div>
  );
}
