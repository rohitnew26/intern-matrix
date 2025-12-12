// components/FeatureCard.jsx
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, desc, index, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl w-full sm:w-80 md:w-72 bg-white overflow-hidden group cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-gray-200 group-hover:border-blue-500 transition-colors duration-300" />

      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg`}
      >
        <Icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
      </motion.div>

      <h3 className="text-sm sm:text-base md:text-xl font-bold mb-2 sm:mb-3 text-gray-800">{title}</h3>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{desc}</p>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute bottom-4 right-4 flex items-center gap-1 text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Learn more <ChevronRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
