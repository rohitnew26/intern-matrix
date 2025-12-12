// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// import logo1 from "../../assets/images/aicte.webp";
// import logo2 from "../../assets/images/MCA.webp";
// import logo3 from "../../assets/images/msme.webp";
// import logo4 from "../../assets/images/skillIndia.webp";
// import logo5 from "../../assets/images/microsoft.webp";
// import logo6 from "../../assets/images/ISO.webp";

// const RecognizedTrusted = () => {
//   const logos = [
//     { src: logo1, alt: "AICTE", name: "AICTE Approved" },
//     { src: logo2, alt: "MCA", name: "MCA Registered" },
//     { src: logo6, alt: "ISO", name: "ISO 9001:2015 Certified" },
//     { src: logo3, alt: "MSME", name: "MSME Registered" },
//     { src: logo4, alt: "Skill India", name: "Skill India Partner" },
//     { src: logo5, alt: "Microsoft", name: "Microsoft Partner" },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const prefersReducedMotion = useReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion || isPaused) return;
    
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % logos.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [logos.length, prefersReducedMotion, isPaused]);

//   const getVisibleLogos = () => {
//     const indices = [];
//     for (let i = -1; i <= 1; i++) {
//       indices.push((currentIndex + i + logos.length) % logos.length);
//     }
//     return indices;
//   };

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);
//   };

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % logos.length);
//   };

//   return (
//     <section className="py-6 sm:py-10 px-3 sm:px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col gap-2 sm:gap-3 items-center text-center">
//           <motion.span 
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 text-[10px] sm:text-xs font-semibold tracking-wider uppercase border border-yellow-200/50 shadow-sm"
//           >
//             ✦ Recognized & Trusted ✦
//           </motion.span>
//           <motion.h2 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
//           >
//             Recognized & Trusted By
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl"
//           >
//             Our certificates and programs are recognized by leading companies and institutions.
//           </motion.p>
//         </div>

//         <div className="mt-6 sm:mt-8">
//           {prefersReducedMotion ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 items-center" aria-label="Partner recognitions">
//               {logos.map((logo, index) => (
//                 <div
//                   key={logo.alt + index}
//                   className="flex items-center justify-center px-2 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-white/95"
//                 >
//                   <img
//                     src={logo.src}
//                     alt={`${logo.alt} partner logo`}
//                     className="h-16 sm:h-20 md:h-24 object-contain"
//                     loading="lazy"
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div 
//               className="relative flex items-center justify-center py-8 sm:py-12" 
//               aria-label="Partner recognitions carousel"
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               {/* Navigation Arrows */}
//               <button
//                 onClick={goToPrevious}
//                 className="absolute left-2 sm:left-8 z-20 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 hover:text-slate-900 hover:scale-110"
//                 aria-label="Previous logo"
//               >
//                 <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

//               <div className="relative flex items-center justify-center">
//                 {/* Left Logo */}
//                 <div className="absolute left-0 -translate-x-full sm:-translate-x-3/4 md:-translate-x-1/2">
//                   <motion.div
//                     key={`left-${logos[getVisibleLogos()[0]].alt}`}
//                     className="flex flex-col items-center justify-center"
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 0.35, scale: 0.6, x: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//                     style={{ filter: "blur(2px) grayscale(30%)" }}
//                   >
//                     <div className="p-4 sm:p-6 rounded-2xl">
//                       <img
//                         src={logos[getVisibleLogos()[0]].src}
//                         alt={`${logos[getVisibleLogos()[0]].alt} partner logo`}
//                         className="h-20 sm:h-28 md:h-32 w-auto object-contain"
//                         loading="lazy"
//                       />
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Center Logo - Always in center with slide effect */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`center-${logos[getVisibleLogos()[1]].alt}-${currentIndex}`}
//                     className="flex flex-col items-center justify-center z-10"
//                     initial={{ x: 200, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     exit={{ x: -200, opacity: 0 }}
//                     transition={{ 
//                       duration: 0.5, 
//                       ease: [0.4, 0, 0.2, 1]
//                     }}
//                   >
//                     <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
//                       <img
//                         src={logos[getVisibleLogos()[1]].src}
//                         alt={`${logos[getVisibleLogos()[1]].alt} partner logo`}
//                         className="h-28 sm:h-40 md:h-48 w-auto object-contain"
//                         loading="lazy"
//                       />
//                     </div>
//                     <motion.span
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ delay: 0.2, duration: 0.3 }}
//                       className="mt-3 text-sm sm:text-base font-medium text-slate-700"
//                     >
//                       {logos[getVisibleLogos()[1]].name}
//                     </motion.span>
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Right Logo */}
//                 <div className="absolute right-0 translate-x-full sm:translate-x-3/4 md:translate-x-1/2">
//                   <motion.div
//                     key={`right-${logos[getVisibleLogos()[2]].alt}`}
//                     className="flex flex-col items-center justify-center"
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 0.35, scale: 0.6, x: 0 }}
//                     exit={{ opacity: 0, x: 50 }}
//                     transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//                     style={{ filter: "blur(2px) grayscale(30%)" }}
//                   >
//                     <div className="p-4 sm:p-6 rounded-2xl">
//                       <img
//                         src={logos[getVisibleLogos()[2]].src}
//                         alt={`${logos[getVisibleLogos()[2]].alt} partner logo`}
//                         className="h-20 sm:h-28 md:h-32 w-auto object-contain"
//                         loading="lazy"
//                       />
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>

//               <button
//                 onClick={goToNext}
//                 className="absolute right-2 sm:right-8 z-20 p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 hover:text-slate-900 hover:scale-110"
//                 aria-label="Next logo"
//               >
//                 <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           )}

//           {/* Progress indicators */}
//           {!prefersReducedMotion && (
//             <div className="flex justify-center items-center gap-2 pb-4">
//               {logos.map((logo, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`transition-all duration-500 rounded-full ${
//                     index === currentIndex
//                       ? "bg-gradient-to-r from-yellow-400 to-amber-500 w-8 h-2.5 shadow-md shadow-yellow-200"
//                       : "bg-slate-200 hover:bg-slate-300 w-2.5 h-2.5"
//                   }`}
//                   aria-label={`Go to ${logo.alt}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecognizedTrusted; 

import React from "react";
import { motion } from "motion/react";

import logo1 from "../../assets/images/aicte.webp";
import logo2 from "../../assets/images/MCA.webp";
import logo3 from "../../assets/images/msme.webp";
import logo4 from "../../assets/images/skillIndia.webp";
import logo5 from "../../assets/images/microsoft.webp";
import logo6 from "../../assets/images/ISO.webp";

const RecognizedTrusted = () => {
  const logos = [logo1, logo2, logo6, logo3, logo4, logo5];

  return (
    <section className="py-16 px-4 text-center bg-white">
      
      {/* Heading + Subtitle */}
      <div className="flex flex-col gap-2 sm:gap-3 items-center text-center mb-10">
        
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-yellow-50 text-yellow-700 
          text-[10px] sm:text-xs font-semibold tracking-wider uppercase border border-yellow-200 shadow-sm"
        >
          ✦ Recognized & Trusted ✦
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight"
        >
          Recognized & Trusted By
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl"
        >
          Our certificates and programs are recognized by leading companies and institutions.
        </motion.p>
      </div>

      {/* Logos */}
      <div className="grid grid-cols-3 sm:flex justify-center items-center gap-6 flex-wrap">
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            alt="Partner logo"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="w-16 sm:w-20 md:w-28 mx-auto hover:opacity-80 transition-all"
          />
        ))}
      </div>

    </section>
  );
};

export default RecognizedTrusted;


 