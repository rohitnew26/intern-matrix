import React, { useState } from "react";
import { uploadSingleFile } from "../../../services/uploadService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageUploader = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select an image first");
      return;
    }

    setIsLoading(true);
    try {
      const result = await uploadSingleFile(selectedFile);
      if (result?.url) {
        toast.success("Image uploaded successfully 🎉");
        onUploadComplete(result.url);
        setPreview(null);
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error(error.message || "Upload failed ❌");
    }
    setIsLoading(false);
  };

  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <input type="file" accept="image/*" onChange={handleFileSelect} />

      {preview && (
        <img
          src={preview}
          className="w-40 mt-4 rounded-lg shadow-md"
          alt="preview"
        />
      )}

      <button
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleUpload}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload Image"}
      </button>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="rounded-lg shadow-xl font-semibold text-sm"
        bodyClassName="p-3"
        progressClassName="bg-blue-500"
      />
    </div>
  );
};

export default ImageUploader;
