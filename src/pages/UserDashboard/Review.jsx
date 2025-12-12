import React, { useState, useRef } from "react";
import { X, User, Upload } from "lucide-react";
import ImageUploader from "../Admin/AddOnline/ImageUploader";

const AddReviewModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    college: "",
    reviewText: "",
    rating: "",
    linkedinUrl: "",
    profileImage: "",
    ownerEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref to trigger hidden uploader
  const uploadTriggerRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.reviewText.trim()) newErrors.reviewText = "Review text is required";

    const ratingValue = Number(formData.rating);
    if (!ratingValue || ratingValue < 1 || ratingValue > 5)
      newErrors.rating = "Rating must be between 1 and 5";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        profileImage: formData.profileImage || "",
        college: formData.college || "",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-2xl w-full max-w-lg relative border border-white/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Add Student Testimonial
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Profile Upload with Clickable Preview */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-medium text-lg mb-1 text-white">Profile Image</h3>

            {/* Trigger ImageUploader Manually */}
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 bg-gray-700 flex items-center justify-center cursor-pointer shadow-lg group"
              onClick={() => uploadTriggerRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="text-gray-400" size={50} />
              )}

              {/* Upload icon overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Upload size={38} className="text-yellow-400" />
              </div>
            </div>

            {/* HiddenUploader */}
            <div className="hidden">
              <ImageUploader
                ref={uploadTriggerRef}
                onUploadComplete={(url) => {
                  setImagePreview(url);
                  setFormData((prev) => ({ ...prev, profileImage: url }));
                }}
              />
            </div>
          </div>

          {/* Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="text"
            name="title"
            placeholder="Course Title / Role"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <input
            type="text"
            name="college"
            placeholder="College / Institute"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.college}
            onChange={handleChange}
          />

          <textarea
            name="reviewText"
            placeholder="Write your experience..."
            rows="4"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.reviewText}
            onChange={handleChange}
          />
          {errors.reviewText && <p className="text-red-500 text-sm">{errors.reviewText}</p>}

          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.rating}
            onChange={handleChange}
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}

          <input
            type="text"
            name="linkedinUrl"
            placeholder="LinkedIn URL (optional)"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.linkedinUrl}
            onChange={handleChange}
          />

          <input
            type="email"
            name="ownerEmail"
            placeholder="Your Email"
            className="w-full p-3 rounded-md bg-gray-700 text-white outline-none"
            value={formData.ownerEmail}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
