 

// import React from "react";

// const CourseSkeleton = () => {
//   return (
//     <div className="min-h-screen bg-white px-3 sm:px-6 md:px-10 py-6 font-sans w-full">

//       {/* Announcement Banner */}
//       <div className="w-full h-10 sm:h-12 bg-blue-300/40 rounded-xl animate-pulse shadow-sm"></div>

//       {/* Hero Course Card */}
//       <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 sm:p-10 md:p-14 mt-6 shadow-2xl animate-pulse">
//         <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

//           {/* Course Image */}
//           <div className="w-full md:w-4/12">
//             <div className="bg-white rounded-2xl shadow-xl p-3 border border-blue-100">
//               <div className="aspect-video w-full bg-slate-200 rounded-xl"></div>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex flex-col w-full text-white gap-4">

//             {/* Title */}
//             <div className="h-10 w-4/6 bg-blue-300/40 rounded-lg"></div>

//             {/* Sub description */}
//             <div className="h-4 w-full bg-blue-300/40 rounded-md"></div>
//             <div className="h-4 w-5/6 bg-blue-300/40 rounded-md"></div>

//             {/* Badge */}
//             <div className="h-7 w-28 bg-blue-300/50 rounded-full"></div>

//             {/* Course meta */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-blue-300/40 rounded-full"></div>
//                 <div className="h-4 w-40 bg-blue-300/40 rounded-md"></div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-blue-300/40 rounded-full"></div>
//                 <div className="h-4 w-48 bg-blue-300/40 rounded-md"></div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-5 h-5 bg-blue-300/40 rounded-full"></div>
//                 <div className="h-4 w-36 bg-blue-300/40 rounded-md"></div>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="flex gap-4 items-center">
//               <div className="h-6 w-24 bg-blue-300/40 rounded-md"></div>
//               <div className="h-10 w-28 bg-blue-300/60 rounded-lg"></div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-2">
//               <div className="h-12 w-full sm:w-40 bg-yellow-200/70 rounded-xl"></div>
//               <div className="h-12 w-full sm:w-56 bg-blue-300/40 rounded-xl"></div>
//               <div className="h-12 w-full sm:w-28 bg-blue-300/40 rounded-xl"></div>
//             </div>

//             <div className="h-4 w-24 bg-blue-300/40 rounded-md"></div>
//           </div>
//         </div>
//       </div>

//       {/* Rating Row */}
//       <div className="w-full bg-white rounded-2xl py-4 px-6 shadow-md border border-slate-200 flex justify-center items-center gap-3 mt-6 animate-pulse">
//         <div className="w-6 h-6 bg-yellow-200 rounded-full"></div>
//         <div className="h-5 w-48 bg-slate-200 rounded-md"></div>
//       </div>

//       {/* Description Skeleton */}
//       <div className="bg-white rounded-2xl p-6 md:p-10 shadow-md border border-slate-200 mt-6 animate-pulse">
//         <div className="h-8 w-60 bg-slate-300 rounded-md mb-6"></div>

//         <div className="space-y-3">
//           <div className="h-4 w-full bg-slate-200 rounded-md"></div>
//           <div className="h-4 w-10/12 bg-slate-200 rounded-md"></div>
//           <div className="h-4 w-full bg-slate-200 rounded-md"></div>
//           <div className="h-4 w-8/12 bg-slate-200 rounded-md"></div>
//         </div>

//         <div className="space-y-3 pt-6">
//           <div className="h-5 w-48 bg-slate-300 rounded-md"></div>
//           <div className="h-5 w-52 bg-slate-300 rounded-md"></div>
//           <div className="h-5 w-60 bg-slate-300 rounded-md"></div>
//           <div className="h-5 w-40 bg-slate-300 rounded-md"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseSkeleton;




import React from "react";

// CourseSkeletonLoadingUI.jsx
// Minimal & professional circular loading indicator (white spinner for dark backgrounds)
// Usage: <CourseSkeletonLoadingUI />

export default function CourseSkeletonLoadingUI() {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <div
        className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"
      />
    </div>
  );
}

/* Example Usage
<div className="min-h-screen flex items-center justify-center bg-black">
  <CourseSkeletonLoadingUI />
</div>
*/