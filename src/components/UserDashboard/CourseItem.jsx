// import React from 'react'

// const CourseItem = ({ course }) => {
//     return (
//         <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 transition-all border border-gray-700 group">

//             {/* 1. Course Image with Zoom Effect */}
//             <div className="relative overflow-hidden h-40">
//                 <img
//                     src={course.thumbnail}
//                     alt={course.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//             </div>

//             {/* 2. Course Details */}
//             <div className="p-5">
//                 <h3 className="font-bold text-lg text-white truncate">{course.name}</h3>
//                 <p className="text-gray-400 text-sm mb-4">By {course.instructor}</p>

//                 {/* 3. Progress Bar */}
//                 <div className="mb-4">
//                     <div className="flex justify-between text-xs text-gray-400 mb-1">
//                         <span>{course.totalDuration}</span>
//                         <span>{course.completed}% Complete</span>
//                     </div>

//                     <div className="w-full bg-gray-700 rounded-full h-1.5">
//                         <div
//                             className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
//                             style={{ width: `${course.completed}%` }}
//                         ></div>
//                     </div>
//                 </div>

//                 {/* 4. Action Button */}
//                 <button className="w-full py-2.5 bg-white text-black font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-colors duration-300">
//                     {course.completed === 0 ? "Start Course" : "Continue Learning"}
//                 </button>
//             </div>

//         </div>
//     )
// }

// export default CourseItem