

import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Lock, Play, FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { slugify } from "../../utils/helpers";
import CourseContentSkeleton from "../skeletonLoadingUi/CourseContentSkeleton";
import { toast } from "react-hot-toast"; // Ensure toast library imported

const CourseChapter = ({ chapters = [] }) => {
  const [openSection, setOpenSection] = useState(null);
  const [displayChapters, setDisplayChapters] = useState(
    Array.isArray(chapters) ? chapters : []
  );

  const params = useParams();
  const safeCourseParam =
    params.courseSlug || params.courseId || params.slug || params.courseParam || "";

  useEffect(() => {
    if (Array.isArray(chapters) && chapters.length) {
      setDisplayChapters(chapters);
      return;
    }

    let ignore = false;

    const fetchChapters = async () => {
      if (!safeCourseParam) return;

      try {
        const resp = await apiClient.get("/api/user/courses");
        let data = resp.data || [];

        if (data && typeof data === "object" && !Array.isArray(data)) {
          data = data.courses || data.data || [];
        }

        if (!Array.isArray(data) || !data.length) return;

        const target = slugify(String(safeCourseParam));

        const found = data.find((item) => {
          const candidates = [
            item?.slug,
            item?.skillId,
            item?.id,
            item?.title,
            item?.name,
          ]
            .filter(Boolean)
            .map((v) => slugify(String(v)));

          return candidates.includes(target);
        });

        if (!found) return;

        let parsed = [];

        if (Array.isArray(found.chapters)) parsed = found.chapters;
        else if (typeof found.chapters === "string") {
          try {
            parsed = JSON.parse(found.chapters);
          } catch {
            parsed = [];
          }
        }

        if (!ignore) setDisplayChapters(parsed);
      } catch (err) {
        console.warn("Failed to Load Chapters", err);
      }
    };

    fetchChapters();
    return () => (ignore = true);
  }, [chapters, safeCourseParam]);

  const handleLockedClick = () => {
    toast.error("🔐 Enroll to continue watching", {
      style: {
        borderRadius: "10px",
        background: "#1f2937",
        color: "#fff",
        fontWeight: "600",
      },
    });
  };

  if (!displayChapters || displayChapters.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <p className="text-gray-500 text-center text-lg">No Course Content Available</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg  rounded-2xl p-6 w-full">

      <div className="space-y-5">
        {displayChapters.map((chapter, index) => {
          const chapterTitle =
            chapter.chapter_title || chapter.chapterTitle || chapter.title || `Chapter ${index + 1}`;

          const chapterSubtitle =
            chapter.chapter_subtittle || chapter.chapter_subtitle || chapter.subtitle || "";

          const lessons =
            Array.isArray(chapter.lessons) && chapter.lessons.length
              ? chapter.lessons
              : Array.isArray(chapter.content) && chapter.content.length
              ? chapter.content
              : [];

          const videoUrl = chapter.video_url || chapter.videoUrl || "";

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 cursor-pointer p-4"
                onClick={() => setOpenSection(openSection === index ? null : index)}
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{chapterTitle}</h3>
                  {chapterSubtitle && (
                    <p className="text-sm text-gray-600 mt-1">{chapterSubtitle}</p>
                  )}
                </div>
                <span className="text-indigo-600 transition">
                  {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {openSection === index && (
                <div className="bg-white p-4 animate-fadeIn space-y-4">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between border-b pb-3 last:border-none"
                      >
                        <div className="flex items-center gap-3 text-gray-800">
                          {lesson.video_url || lesson.videoUrl ? (
                            <Play size={20} />
                          ) : (
                            <FileText size={20} />
                          )}

                          <span className="font-medium">
                            {lesson.title || lesson.name || `Lesson ${lessonIndex + 1}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-600">
                            {lesson.duration || "00:00"}
                          </span>
                          <Lock size={18} className="text-gray-600" />
                        </div>
                      </div>
                    ))
                  ) : videoUrl ? (
                    <button
                      onClick={handleLockedClick}
                      className="flex items-center justify-between w-full bg-gray-50 p-3 font-medium text-gray-700 rounded-xl shadow-sm hover:shadow transition "
                    >
                      <span>Watch video</span>
                      <Lock size={18} className="text-gray-600" />
                    </button>
                  ) : (
                    <CourseContentSkeleton />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseChapter;

 