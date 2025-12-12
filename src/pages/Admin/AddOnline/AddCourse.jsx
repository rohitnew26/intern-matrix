// import React, { useEffect, useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import Quill from "quill";
// import { addCourse } from "../../../services/authApi";
// import ImageUploader from "./ImageUploader";
// import "react-toastify/dist/ReactToastify.css";
// import "quill/dist/quill.snow.css";

// const AddCourse = () => {
//   const descriptionEditorRef = useRef(null);
//   const descriptionQuillRef = useRef(null);

//   const [loading, setLoading] = useState(false);

//   const [title, setTitle] = useState("");
//   const [courseType, setCourseType] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [originalPrice, setOriginalPrice] = useState("");
//   const [offerPrice, setOfferPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [duration, setDuration] = useState("");
//   const [level, setLevel] = useState("");
//   const [couponcode, setCouponcode] = useState("");
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [instructor_name, setInstructorName] = useState("");

//   const [chapters, setChapters] = useState([
//     {
//       title: "",
//       subtittle: "",
//       video_url: "",
//       content: "",
//       editorRef: React.createRef(),
//       quill: null,
//     },
//   ]);

//   const toolbarOptions = [
//     ["bold", "italic", "underline", "strike"],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     ["clean"],
//   ];

//   useEffect(() => {
//     if (!descriptionQuillRef.current && descriptionEditorRef.current) {
//       descriptionQuillRef.current = new Quill(descriptionEditorRef.current, {
//         theme: "snow",
//         modules: { toolbar: toolbarOptions },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     chapters.forEach((ch, idx) => {
//       if (!ch.quill && ch.editorRef.current) {
//         const quill = new Quill(ch.editorRef.current, {
//           theme: "snow",
//           modules: { toolbar: toolbarOptions },
//         });

//         quill.on("text-change", () => {
//           updateChapter(idx, "content", quill.root.innerHTML);
//         });

//         const updated = [...chapters];
//         updated[idx].quill = quill;
//         setChapters(updated);
//       }
//     });
//   }, [chapters]);

//   const addChapter = () => {
//     setChapters([
//       ...chapters,
//       {
//         title: "",
//         subtittle: "",
//         video_url: "",
//         content: "",
//         editorRef: React.createRef(),
//         quill: null,
//       },
//     ]);
//   };

//   const removeChapter = (index) => {
//     if (chapters.length === 1) return;
//     setChapters(chapters.filter((_, i) => i !== index));
//   };

//   const updateChapter = (index, key, value) => {
//     const updated = [...chapters];
//     updated[index][key] = value;
//     setChapters(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const courseData = {
//       title,
//       course_type: courseType,
//       subtitle,
//       description: descriptionQuillRef.current.root.innerHTML,
//       originalprice: Number(originalPrice),
//       offerprice: Number(offerPrice),
//       category,
//       chapters: chapters.map((ch) => ({
//         chapter_title: ch.title,
//         chapter_subtittle: ch.subtittle,
//         video_url: ch.video_url,
//         content: ch.content,
//       })),
//       couponcode,
//       duration,
//       level,
//       instructor: null,
//       instructor_name,
//       thumbnailUrl,
//     };

//     try {
//       const data = await addCourse(courseData);

//       if (data.success) {
//         toast.success("🎉 Course Added Successfully!");

//         setTitle("");
//         setCourseType("");
//         setSubtitle("");
//         setOriginalPrice("");
//         setOfferPrice("");
//         setCategory("");
//         setDuration("");
//         setLevel("");
//         setCouponcode("");
//         setThumbnailUrl("");
//         setInstructorName("");
//         descriptionQuillRef.current.root.innerHTML = "";
//         setChapters([
//           {
//             title: "",
//             subtittle: "",
//             video_url: "",
//             content: "",
//             editorRef: React.createRef(),
//             quill: null,
//           },
//         ]);
//       } else {
//         toast.error(data.message || "Failed to add course");
//       }
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-full">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl space-y-8 border border-gray-200"
//       >
//         <h2 className="text-3xl font-semibold text-gray-800 text-center">
//           Add New Course
//         </h2>

//         {/* Title and Course Type */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Course Title"
//             className="w-full p-3 border rounded-lg"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <select
//             value={courseType}
//             onChange={(e) => setCourseType(e.target.value)}
//             className="p-3 border rounded-lg"
//             required
//           >
//             <option value="">Select Course Type</option>
//             <option value="Online Training">Online Training</option>
//             <option value="Industrial Training">Industrial Training</option>
//             <option value="Courses">Courses</option>
//             <option value="Offline Training">Offline Training</option>
//             <option value="opdation">Opdation</option>
//           </select>
//         </div>

//         {/* Subtitle */}
//         <input
//           type="text"
//           placeholder="Course Subtitle"
//           className="w-full p-3 border rounded-lg"
//           value={subtitle}
//           onChange={(e) => setSubtitle(e.target.value)}
//           required
//         />

//         {/* Description */}
//         <label className="font-medium">Course Description</label>
//         <div
//           ref={descriptionEditorRef}
//           className="bg-white min-h-[200px] mt-2 border rounded-lg p-2"
//         ></div>

//         {/* Pricing / Category */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="number"
//             placeholder="Original Price (₹)"
//             value={originalPrice}
//             onChange={(e) => setOriginalPrice(e.target.value)}
//             className="p-3 border rounded-lg"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Offer Price (₹)"
//             value={offerPrice}
//             onChange={(e) => setOfferPrice(e.target.value)}
//             className="p-3 border rounded-lg"
//             required
//           />
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="p-3 border rounded-lg"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Full Stack Development">
//               Full Stack Development
//             </option>
//             <option value="Frontend Development">Frontend Development</option>
//             <option value="Backend Development">Backend Development</option>
//             <option value="Full Stack Development">
//               Full Stack Development
//             </option>
//             <option value="Backend Development">Backend Development</option>
//             <option value="Mobile App Development">
//               Mobile App Development
//             </option>
//             <option value="AI & Machine Learning">AI & Machine Learning</option>
//             <option value="Data Science">Data Science</option>
//             <option value="Cybersecurity">Cybersecurity</option>
//             <option value="Cloud Computing & DevOps">
//               Cloud Computing & DevOps
//             </option>
//             <option value="Blockchain & Web3">Blockchain & Web3</option>
//             <option value="UI/UX Design">UI/UX Design</option>
//             <option value="Digital Marketing">Digital Marketing</option>
//             <option value="Game Development">Game Development</option>
//             <option value="AR/VR & Metaverse">AR/VR & Metaverse</option>
//             <option value="Robotics & Automation">Robotics & Automation</option>
//             <option value="Software Testing & QA">Software Testing & QA</option>
//             <option value="Data Engineering">Data Engineering</option>
//             <option value="Big Data">Big Data</option>
//             <option value="Business Analytics">Business Analytics</option>
//             <option value="Ethical Hacking">Ethical Hacking</option>
//             <option value="Internet of Things (IoT)">
//               Internet of Things (IoT)
//             </option>
//             <option value="E-Commerce & No-Code Tools">
//               E-Commerce & No-Code Tools
//             </option>
//             <option value="Product Management">Product Management</option>
//           </select>
//         </div>

//         {/* Extra Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="p-3 border rounded-lg"
//           />

//           <select
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             className="p-3 border rounded-lg"
//             required
//           >
//             <option value="">Select Level</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Coupon Code"
//             value={couponcode}
//             onChange={(e) => setCouponcode(e.target.value)}
//             className="p-3 border rounded-lg"
//           />

//           <input
//             type="text"
//             placeholder="Instructor Name"
//             value={instructor_name}
//             onChange={(e) => setInstructorName(e.target.value)}
//             className="p-3 border rounded-lg"
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <h3 className="font-medium text-lg mb-2">Upload Thumbnail</h3>
//         <ImageUploader onUploadComplete={(url) => setThumbnailUrl(url)} />

//         {thumbnailUrl && (
//           <img
//             src={thumbnailUrl}
//             alt="thumbnail"
//             className="w-48 rounded-lg mt-2 shadow-md"
//           />
//         )}

//         {/* CHAPTERS SECTION */}
//         <h3 className="text-2xl font-semibold text-gray-700 mt-6">
//           Course Chapters
//         </h3>
//         {chapters.map((chapter, index) => (
//           <div
//             key={index}
//             className="p-4 bg-gray-50 border rounded-lg space-y-3"
//           >
//             <input
//               type="text"
//               placeholder="Chapter Title"
//               value={chapter.title}
//               onChange={(e) => updateChapter(index, "title", e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               required
//             />

//             <input
//               type="text"
//               placeholder="Chapter Subtitle"
//               value={chapter.subtittle}
//               onChange={(e) =>
//                 updateChapter(index, "subtittle", e.target.value)
//               }
//               className="w-full p-3 border rounded-lg"
//               required
//             />

//             <input
//               type="url"
//               placeholder="Video URL"
//               value={chapter.video_url}
//               onChange={(e) =>
//                 updateChapter(index, "video_url", e.target.value)
//               }
//               className="w-full p-3 border rounded-lg"
//               required
//             />

//             <div
//               ref={chapter.editorRef}
//               className="bg-white min-h-[150px] border rounded-lg p-2"
//             ></div>

//             {chapters.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeChapter(index)}
//                 className="text-red-600"
//               >
//                 Remove Chapter
//               </button>
//             )}
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addChapter}
//           className="px-5 py-2 bg-green-600 text-white rounded-lg"
//         >
//           + Add Chapter
//         </button>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg"
//         >
//           {loading ? "Adding..." : "Add Course"}
//         </button>
//       </form>

//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//   );
// };

// export default AddCourse;

import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Quill from "quill";
import { addCourse } from "../../../services/authApi";
import ImageUploader from "./ImageUploader";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";

const AddCourse = () => {
  const descriptionEditorRef = useRef(null);
  const descriptionQuillRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [courseType, setCourseType] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [couponcode, setCouponcode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(""); // ⭐ NEW
  const [rating, setRating] = useState(""); // ⭐ NEW
  const [branch, setBranch] = useState(""); // ⭐ BRANCH
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [instructor_name, setInstructorName] = useState("");

  const [chapters, setChapters] = useState([
    {
      title: "",
      subtittle: "",
      video_url: "",
      content: "",
      editorRef: React.createRef(),
      quill: null,
    },
  ]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];

  useEffect(() => {
    if (!descriptionQuillRef.current && descriptionEditorRef.current) {
      descriptionQuillRef.current = new Quill(descriptionEditorRef.current, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });
    }
  }, []);

  useEffect(() => {
    chapters.forEach((ch, idx) => {
      if (!ch.quill && ch.editorRef.current) {
        const quill = new Quill(ch.editorRef.current, {
          theme: "snow",
          modules: { toolbar: toolbarOptions },
        });

        quill.on("text-change", () => {
          updateChapter(idx, "content", quill.root.innerHTML);
        });

        const updated = [...chapters];
        updated[idx].quill = quill;
        setChapters(updated);
      }
    });
  }, [chapters]);

  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        title: "",
        subtittle: "",
        video_url: "",
        content: "",
        editorRef: React.createRef(),
        quill: null,
      },
    ]);
  };

  const removeChapter = (index) => {
    if (chapters.length === 1) return;
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const updateChapter = (index, key, value) => {
    const updated = [...chapters];
    updated[index][key] = value;
    setChapters(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const courseData = {
      title,
      course_type: courseType,
      subtitle,
      description: descriptionQuillRef.current.root.innerHTML,
      originalprice: Number(originalPrice),
      offerprice: Number(offerPrice),
      category,
      chapters: chapters.map((ch) => ({
        chapter_title: ch.title,
        chapter_subtittle: ch.subtittle,
        video_url: ch.video_url,
        content: ch.content,
      })),
      couponcode,
      couponDiscount: Number(couponDiscount), // ⭐ NEW
      rating: Number(rating), // ⭐ NEW
      branch, // ⭐ BRANCH
      duration,
      level,
      instructor: null,
      instructor_name,
      thumbnailUrl,
    };

    try {
      const data = await addCourse(courseData);

      if (data.success) {
        toast.success("🎉 Course Added Successfully!");

        setTitle("");
        setCourseType("");
        setSubtitle("");
        setOriginalPrice("");
        setOfferPrice("");
        setCategory("");
        setDuration("");
        setLevel("");
        setCouponcode("");
        setCouponDiscount(""); // ⭐ CLEAR
        setRating(""); // ⭐ CLEAR
        setBranch(""); // ⭐ CLEAR
        setThumbnailUrl("");
        setInstructorName("");
        descriptionQuillRef.current.root.innerHTML = "";
        setChapters([
          {
            title: "",
            subtittle: "",
            video_url: "",
            content: "",
            editorRef: React.createRef(),
            quill: null,
          },
        ]);
      } else {
        toast.error(data.message || "Failed to add course");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl space-y-8 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Add New Course
        </h2>

        {/* Title / Course Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-3 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            className="p-3 border rounded-lg"
            required
          >
            <option value="">Select Course Type</option>
            <option value="Online Training">Online Training</option>
            <option value="Industrial Training">Industrial Training</option>
            <option value="Courses">Courses</option>
            <option value="Offline Training">Offline Training</option>
            <option value="opdation">Opdation</option>
          </select>
        </div>

        {/* Subtitle */}
        <input
          type="text"
          placeholder="Course Subtitle"
          className="w-full p-3 border rounded-lg"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        {/* Description */}
        <label className="font-medium">Course Description</label>
        <div
          ref={descriptionEditorRef}
          className="bg-white min-h-[200px] mt-2 border rounded-lg p-2"
        ></div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Original Price (₹)"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Offer Price (₹)"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Full Stack Development">
              Full Stack Development
            </option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack Development">
              Full Stack Development
            </option>
            <option value="Backend Development">Backend Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Cloud Computing & DevOps">
              Cloud Computing & DevOps
            </option>
            <option value="Blockchain & Web3">Blockchain & Web3</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Game Development">Game Development</option>
            <option value="AR/VR & Metaverse">AR/VR & Metaverse</option>
            <option value="Robotics & Automation">Robotics & Automation</option>
            <option value="Software Testing & QA">Software Testing & QA</option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="Big Data">Big Data</option>
            <option value="Business Analytics">Business Analytics</option>
            <option value="Ethical Hacking">Ethical Hacking</option>
            <option value="Internet of Things (IoT)">
              Internet of Things (IoT)
            </option>
            <option value="E-Commerce & No-Code Tools">
              E-Commerce & No-Code Tools
            </option>
            <option value="Product Management">Product Management</option>
          </select>
        </div>

        {/* Extra Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="p-3 border rounded-lg"
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">Select Branch</option>
            <option value="CSE,IT,IOT,AIML,DS,Robotics,Mechatronics">
              CSE, IT, IOT, AI-ML, DS
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
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponcode}
            onChange={(e) => setCouponcode(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <input
            type="number"
            step="0.1"
            placeholder="Coupon Discount (%)"
            value={couponDiscount}
            onChange={(e) => setCouponDiscount(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="p-3 border rounded-lg"
            required
          >
            <option value="">Select Rating</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.3">4.3</option>
            <option value="4.5">4.5</option>
            <option value="4.6">4.6</option>
            <option value="4.8">4.8</option>
            <option value="4.9">4.9</option>
            <option value="5.0">5.0</option>
          </select>

          <input
            type="text"
            placeholder="Instructor Name"
            value={instructor_name}
            onChange={(e) => setInstructorName(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
        </div>

        {/* Image Upload */}
        <h3 className="font-medium text-lg mb-2">Upload Thumbnail</h3>
        <ImageUploader onUploadComplete={(url) => setThumbnailUrl(url)} />

        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="thumbnail"
            className="w-48 rounded-lg mt-2 shadow-md"
          />
        )}

        {/* Chapters */}
        <h3 className="text-2xl font-semibold text-gray-700 mt-6">
          Course Chapters
        </h3>

        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 border rounded-lg space-y-3"
          >
            <input
              type="text"
              placeholder="Chapter Title"
              value={chapter.title}
              onChange={(e) => updateChapter(index, "title", e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Chapter Subtitle"
              value={chapter.subtittle}
              onChange={(e) =>
                updateChapter(index, "subtittle", e.target.value)
              }
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="url"
              placeholder="Video URL"
              value={chapter.video_url}
              onChange={(e) =>
                updateChapter(index, "video_url", e.target.value)
              }
              className="w-full p-3 border rounded-lg"
              required
            />

            <div
              ref={chapter.editorRef}
              className="bg-white min-h-[150px] border rounded-lg p-2"
            ></div>

            {chapters.length > 1 && (
              <button
                type="button"
                onClick={() => removeChapter(index)}
                className="text-red-600"
              >
                Remove Chapter
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addChapter}
          className="px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          + Add Chapter
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg"
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddCourse;
