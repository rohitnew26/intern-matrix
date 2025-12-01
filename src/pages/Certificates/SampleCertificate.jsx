import React from "react";
import certificate from "../../assets/images/certificateSample.jpg";

const CenterImage = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate;
    link.download = "certificate-sample.jpg"; // file name when downloaded
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 p-4">
      <img
        src={certificate}
        alt="Certificate Preview"
        className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg object-contain"
      />

      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CenterImage;
