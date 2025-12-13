 

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
  const [shuffledCourses, setShuffledCourses] = useState([]); // NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Fisher–Yates shuffle
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    let ignore = false;

    const loadCourses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("type", "industrial_training")
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
              // keep common image keys CourseDetails expects
              thumbnail_url: course.thumbnail_url || course.thumbnail || course.banner_url || null,
              banner_url: course.banner_url || course.thumbnail_url || null,
              gallery_images: course.gallery_images || null,
              cover_image: course.cover_image || course.thumbnail || null,
              image:
                course.thumbnail_url ||
                course.gallery_images ||
                course.banner_url || 
                course.thumbnail,
              // price fields: include both display-friendly and canonical keys
              offerPriceDisplay: priceRupees,
              originalPriceDisplay: mrpRupees,
              price: priceRupees,
              offerPrice: priceRupees,
              originalprice: mrpRupees,
              category: course.category,
              desc: course.description?.replace(/<[^>]+>/g, ""),
              // Ensure CourseDetails can read expected fields
              description: course.description || course.overview || course.detailed_description ||"",
              overview: course.overview || course.description || "",
              detailed_description: course.detailed_description || (course.detailedDescription || { sections: [] }),
            };
          });

          const reversed = formatted.reverse();

          // 🎯 Shuffle + pick only 12
          const randomized12 = shuffleArray(reversed).slice(0, 8);

          setCourses(reversed);
          setShuffledCourses(randomized12);
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

  // 🔍 Search inside shuffled 12
  const filteredSkills = useMemo(() => {
    return shuffledCourses.filter((skill) =>
      (skill?.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [shuffledCourses, search]);

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
        Industrial Training
      </h1>

      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
        Our Industrial Training program is designed to equip students and
        working professionals with hands-on, real-time practical experience.
      </p>

      {/* Search + Explore */}
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

      {/* Loading State */}
      {loading && <CourseCardSkeleton />}

      {/* Error State */}
      {error && (
        <>
          <CourseCardSkeleton />
          <p className="text-center text-red-500">
            Network error. Please try again later.
          </p>
        </>
      )}

      {/* Cards Grid */}
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
              <Link to={detailPath} state={{ course: skill, finalOfferPrice: skill.offerPrice ?? skill.offerPriceDisplay ?? skill.price }}>
                <div className="relative">
                  <div
                    className="h-[180px] w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        skill.image || skill.thumbnail_url || skill.cover_image || "/placeholder.jpg"
                      })`,
                    }}
                  />

                  <div className="absolute top-3 right-3 z-10 bg-yellow-100/60 text-gray-900 text-xl font-semibold px-4 py-1 rounded-full shadow">
                    {skill.course_type || "General"}
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {skill.name}
                </h2>

                <div className="flex items-center justify-between mt-2 w-full">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm font-semibold">
                      {skill?.rating || "4.8"}
                    </span>
                  </div>

                  <span className="text-xl font-semibold">
                    {skill?.duration || "3 weeks"}
                  </span>
                </div>

                <p className="clamp-2 text-slate-700 text-sm mt-3 mb-4">
                  {skill.desc}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-2 items-center">
                    {skill.originalPriceDisplay ? (
                      <span className=" text-lg text-gray-500 line-through font-semibold">
                        ₹{skill.originalPriceDisplay}
                      </span>
                    ) : null}

                    <span className="text-green-600 text-lg text-bold">
                      ₹{skill.offerPriceDisplay ?? skill.price ?? 0}
                    </span>
                  </div>

                  <Link
                    to={detailPath}
                    state={{
                      course: skill,
                      finalOfferPrice:
                        skill.offerPrice ?? skill.offerPriceDisplay ?? skill.price,
                    }}
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

      {/* ⭐ Explore More Courses Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/all-internship"
          className="px-10 py-4 rounded-3xl font-semibold bg-white 
    text-indigo-700 border border-yellow-300 shadow-lg
    hover:bg-indigo-700 hover:text-white hover:border-indigo-700
    hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 
    flex items-center gap-2"
 
        >
          Explore More Courses/Internships
          <span className="text-xl">→</span>
        </Link>
      </div>
    </div>
  );
}
