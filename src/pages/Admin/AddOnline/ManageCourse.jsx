import React, { useEffect, useState } from "react";
import {
  getCourses,
  updateCourse,
  deleteCourse,
} from "../../../services/authApi";
import { uploadSingleFile } from "../../../services/uploadService";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalprice: "",
    offerprice: "",
    rating: "",
    category: "",
    couponcode: "",
    couponDiscount: "",
    duration: "",
    instructor: "",
    instructor_name: "",
    level: "",
    course_type: "",
    branch: "", // ⭐ BRANCH
    thumbnailUrl: "",
    chapters: [],
  });

  const resolveCourseId = (c) =>
    c?.id ?? c?.courseid ?? c?.courseId ?? c?._id ?? null;

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const data = await getCourses();

      const normalized = (data || []).map((c) => ({
        ...c,
        courseid: c.courseid ?? c.courseId ?? c.id ?? c._id,
        chapters: Array.isArray(c?.chapters) ? c.chapters : [],
      }));

      setCourses(normalized);
    } catch (error) {
      toast.error("Failed to fetch courses");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Upload thumbnail image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const imageUrl = await uploadSingleFile(file);
      setFormData({ ...formData, thumbnailUrl: imageUrl });
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete
  const handleDelete = async (course) => {
    const id = resolveCourseId(course);
    if (!id) return toast.error("Invalid course id");
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  // Edit course (load to modal)
  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      originalprice: course.originalprice,
      offerprice: course.offerprice,
      category: course.category,
      couponcode: course.couponcode,
      rating: course.rating,
      couponDiscount: course.couponDiscount,
      duration: course.duration,
      instructor: course.instructor,
      instructor_name: course.instructor_name,
      level: course.level,
      course_type: course.course_type ?? course.courseType ?? course.type ?? "",
      branch: course.branch ?? "", // ⭐ BRANCH
      thumbnailUrl: course.thumbnail,
      chapters: Array.isArray(course.chapters) ? course.chapters : [],
    });
  };

  // Chapter actions
  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [
        ...formData.chapters,
        { title: "", subtittle: "", video_url: "", content: "" },
      ],
    });
  };

  const handleChapterChange = (index, field, value) => {
    const updated = [...formData.chapters];
    updated[index][field] = value;
    setFormData({ ...formData, chapters: updated });
  };

  // Update course
  const handleUpdate = async () => {
    setLoadingUpdate(true);
    try {
      const courseId = resolveCourseId(editingCourse);
      if (!courseId) return toast.error("Invalid course id for update");

      // Map chapters to send chapter_title, chapter_subtittle, video_url and content to backend
      const payload = {
        ...formData,
        chapters: formData.chapters.map((ch) => ({
          chapter_title: ch.title,
          chapter_subtittle: ch.subtittle,
          video_url: ch.video_url,
          content: ch.content,
        })),
      };

      const response = await updateCourse(courseId, payload);
      toast.success("Course updated successfully");

      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      toast.error("Update failed!");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <h1 className="text-3xl font-bold text-center mb-6">Manage Courses</h1>

      {/* Table Display */}
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Chapters</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={resolveCourseId(course)}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3">{course.title}</td>
                <td className="p-3">
                  {course.chapters.map((ch, i) => (
                    <p key={i}>📘 {ch.title}</p>
                  ))}
                </td>
                <td className="p-3">{course.category}</td>
                <td className="p-3">
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt="thumb"
                      className="w-16 h-10 rounded"
                    />
                  )}
                </td>

                <td className="p-3 text-center flex justify-center gap-4">
                  <FaEdit
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleEdit(course)}
                  />
                  <FaTrash
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDelete(course)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center overflow-y-auto py-10">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>

            {/** Thumbnail Upload Section */}
            <div className="mb-4">
              <label className="font-bold block mb-1">Thumbnail</label>
              {formData.thumbnailUrl && (
                <img
                  src={formData.thumbnailUrl}
                  className="w-44 h-24 rounded"
                />
              )}
              <input
                type="file"
                className="mt-2"
                onChange={handleImageUpload}
                accept="image/*"
              />
              {uploadingImage && <p className="text-blue-600">Uploading...</p>}
            </div>

            {/** Form Inputs */}
            {[
              { label: "Title", name: "title" },
              { label: "Description", name: "description", textarea: true },
              {
                label: "Original Price",
                name: "originalprice",
                type: "number",
              },
              { label: "Offer Price", name: "offerprice", type: "number" },
              { label: "Category", name: "category" },
              { label: "Coupon Code", name: "couponcode" },
              { label: "rating", name: "rating" },
              { label: "coupon Discount", name: "couponDiscount" },
              { label: "Duration", name: "duration" },
              { label: "Instructor", name: "instructor" },
              { label: "Instructor Name", name: "instructor_name" },
              { label: "Level", name: "level" },
            ].map((field, i) => (
              <div key={i} className="mb-2">
                {field.textarea ? (
                  <textarea
                    className="border p-2 w-full rounded"
                    placeholder={field.label}
                    value={formData[field.name]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    placeholder={field.label}
                    className="border p-2 w-full rounded"
                    value={formData[field.name]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}

            {/* Course Type Select */}
            <div className="mb-2">
              <label className="font-bold block mb-1">Course Type</label>
              <select
                className="border p-2 w-full rounded"
                value={formData.course_type}
                onChange={(e) =>
                  setFormData({ ...formData, course_type: e.target.value })
                }
              >
                <option value="Online Training">Online Training</option>
                <option value="Industrial Training">Industrial Training</option>
                <option value="Courses">Courses</option>
                <option value="Offline Training">Offline Training</option>
              </select>
            </div>

            {/* Branch Select */}
            <div className="mb-2">
              <label className="font-bold block mb-1">Branch</label>
              <select
                className="border p-2 w-full rounded"
                value={formData.branch}
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
              >
                <option value="">Select Branch</option>

                <option value="CSE,IT,IOT,AIML,DS,Robotics,Mechatronics">
                  CSE, IT, IOT, AI-ML, DS, Robotics
                </option>
                <option value="ECE,EE,EIE,EEE">ECE, EE, EIE, EEE</option>
                <option value="ME,Automobile,Mechatronics,Robotics">
                  ME, Automobile, Mechatronics
                </option>
                <option value="CE">Civil Engineering (CE)</option>
                <option value="CHE">Chemical Engineering (CHE)</option>

                <option value="Aeronautical">Aeronautical</option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
            </div>

            <h3 className="font-bold mt-4 mb-2">Chapters</h3>

            {formData.chapters.map((ch, index) => (
              <div key={index} className="border p-2 rounded mb-2">
                <input
                  type="text"
                  placeholder="Chapter Title"
                  className="border p-2 w-full mb-2 rounded"
                  value={ch.title}
                  onChange={(e) =>
                    handleChapterChange(index, "title", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Chapter Subtitle"
                  className="border p-2 w-full mb-2 rounded"
                  value={ch.subtittle}
                  onChange={(e) =>
                    handleChapterChange(index, "subtittle", e.target.value)
                  }
                />
                <input
                  type="url"
                  placeholder="Video URL"
                  className="border p-2 w-full mb-2 rounded"
                  value={ch.video_url}
                  onChange={(e) =>
                    handleChapterChange(index, "video_url", e.target.value)
                  }
                />
                <textarea
                  placeholder="Content"
                  className="border p-2 w-full rounded"
                  value={ch.content}
                  onChange={(e) =>
                    handleChapterChange(index, "content", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              className="bg-green-600 text-white px-3 py-1 rounded mb-3"
              onClick={addChapter}
            >
              + Add Chapter
            </button>

            <div className="flex justify-end gap-3 mt-3 pb-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditingCourse(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdate}
                disabled={loadingUpdate}
              >
                {loadingUpdate ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourse;
