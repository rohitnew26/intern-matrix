import React, { useState } from "react";

const BannerSection = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="relative flex flex-col h-[8vh] w-full overflow-y-auto">
      {showBanner && (
        <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-3 px-6 shadow-md text-center flex justify-center items-center relative transition-all duration-300">
          <p className="max-w-[90%]">
            Announcing $10M seed funding from project mayhem ventures.{" "}
            <a href="#" className="underline hover:text-blue-200 transition">
              Read announcement
            </a>
          </p>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-2 text-white text-xl hover:text-gray-200"
          >
            ✖
          </button>
        </div>
      )}

     
    </div>
  );
};

export default BannerSection;
