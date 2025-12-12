import React from "react";

const CourseContentSkeleton = () => {
  return (
    <div className="w-full bg-white py-10 px-4 sm:px-8 md:px-16">
      {/* Top Title */}
      <div className="h-9 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>

      {/* Skeleton list items */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="w-full bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6 animate-pulse"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Title line */}
                <div className="h-5 w-64 bg-gray-200 rounded-md mb-3"></div>
                {/* Subtitle lines */}
                <div className="h-4 w-80 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 w-60 bg-gray-200 rounded-md"></div>
              </div>

              {/* Icon Placeholder */}
              <div className="h-6 w-6 bg-gray-200 rounded-full ml-3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentSkeleton;
