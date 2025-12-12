import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import {
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  ChevronRight,
  Users,
  BookOpen,
  Trophy,
} from "lucide-react";

import img from "../../assets/images/home.jpg";

import FloatingParticles from "./FloatingParticles";
import FeatureCard from "./FeatureCard";
import RecognizedTrusted from "../../components/banner/RecognizedTrusted";

function Home() {
  const navigate = useNavigate();
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true });

  const features = [
    {
      icon: GraduationCap,
      title: "Expert-Designed Curriculum",
      desc: "Master in-demand skills through comprehensive, industry-aligned learning paths developed by seasoned professionals.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Briefcase,
      title: "Real-World Experience",
      desc: "Apply your knowledge through live projects with top companies and build a competitive portfolio.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      title: "Recognized Credentials",
      desc: "Earn ISO-certified & AICTE-verified certificates that are recognized by leading employers nationwide.",
      color: "from-green-500 to-green-600",
    },
  ];

  const stats = [
    { value: "10k+", label: "Students", icon: Users },
    { value: "50+", label: "Courses", icon: BookOpen },
    { value: "95%", label: "Success Rate", icon: Trophy },
  ];

  return (
    <div className="overflow-hidden">
      {/* ------------ HERO SECTION ------------ */}
      <section
        className="relative flex justify-center items-center min-h-screen w-full bg-cover bg-center px-4 py-10 sm:py-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${img})`,
        }}
      >
        <FloatingParticles />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-300/10 border border-yellow-300/30 text-yellow-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            #1 Internship Platform in India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-4xl md:text-6xl font-bold leading-tight text-white mb-6 whitespace-nowrap"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              Learn & Grow with
              <span className="relative inline-flex whitespace-nowrap">
                <span className="text-white">Intern</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300">
                  Matrix
                </span>

                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Gain real-world, job-ready skills through industry-focused
            internship programs. Join{" "}
            <strong>
              <span className="text-white">Intern</span>
              <span className="text-yellow-400">Matrix</span>
            </strong>{" "}
            and get certified.
          </motion.p>

          {/* CTA Buttons with stagger animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          >
            {[
              {
                to: "/industrial-training",
                text: "Explore Skills",
                style:
                  "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/30",
                delay: 0.7,
              },
              {
                to: "/verify",
                text: "Verify Certificate",
                style:
                  "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
                delay: 0.8,
              },
              {
                to: "/sample-certificate",
                text: "Sample Certificate",
                style:
                  "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20",
                delay: 0.9,
              },
            ].map((btn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: btn.delay }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={btn.to}
                  className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 w-full sm:w-auto text-center inline-flex items-center gap-2 ${btn.style}`}
                >
                  {btn.text}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex justify-center items-center gap-8 sm:gap-16 text-white/80"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-yellow-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ------------ FEATURES SECTION ------------ */}
  <section className="py-20 px-4 text-center bg-gradient-to-b relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-900/30 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-900/30 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

        <motion.div
        
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green-400/10 border border-green-400/30 text-green-400 text-xs sm:text-sm font-semibold mb-4">
            ✦ Why Choose Us ✦
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-black">
            Why Choose <span className="text-black">Intern</span>
            <span className="text-yellow-400">Matrix</span>?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12">
            We provide industry-recognized training programs that help you build
            real-world skills
          </p>
        </motion.div>

        <div className="relative z-10 flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-2">
          {features.map((item, index) => (
            <FeatureCard key={index} {...item} index={index} />
          ))}
        </div>
      </section>

      {/* ------------ PARTNERS SECTION ------------ */}
      <RecognizedTrusted />

      {/* ------------ CTA SECTION ------------ */}
      <section
        ref={ctaRef}
        className="py-20 px-4 text-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={ctaInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Journey Today
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Transform Your Career with{" "}
            <span className="text-white">Intern</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              {" "}
              Matrix{" "}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who transformed their careers
            through our industry-focused programs.
          </p>

          <motion.button
            onClick={() => navigate("/industrial-training")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(250, 204, 21, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-full font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/30 inline-flex items-center gap-2 text-lg cursor-pointer"
          >
            Start Learning Now
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
