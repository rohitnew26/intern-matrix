import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-md animate-pulse overflow-hidden">

      {/* Image Skeleton */}
      <div className="h-40 sm:h-44 bg-gray-300"></div>

      <div className="p-4 sm:p-5 space-y-4">

        {/* Category chip */}
        <div className="w-28 sm:w-32 h-5 bg-gray-300 rounded-full"></div>

        {/* Title */}
        <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-14 h-4 bg-gray-300 rounded-md"></div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded-md"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
        </div>

        {/* Price + Enroll button */}
        <div className="flex justify-between items-center mt-4">
          <div className="space-y-1">
            <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
            <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
          </div>

          <div className="w-24 h-10 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export const CourseSkeletonList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 w-full px-3 sm:px-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CourseSkeletonList;
