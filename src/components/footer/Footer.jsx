import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white pt-16 pb-10 font-sans border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />

      <div className="relative w-[90%] md:w-[85%] mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-yellow-500/25 bg-gradient-to-r from-yellow-500/10 via-black/60 to-white/5 p-6 md:p-8 mb-12 shadow-lg shadow-yellow-500/20">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_10%,rgba(234,179,8,0.25),transparent_35%)]" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-yellow-400">Always Intern (White) × Matrix (Yellow)</p>
              <h3 className="text-2xl md:text-3xl font-black leading-tight">Weekly wins, zero fluff.</h3>
              <p className="text-gray-300 max-w-2xl text-sm md:text-base">Actionable coding drops, hiring signals, and project briefs—built for people who actually ship.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/online-internship"
                onClick={scrollToTop}
                className="px-5 py-3 rounded-xl bg-yellow-500 text-black font-semibold tracking-wide shadow-lg shadow-yellow-500/30 hover:-translate-y-1 transition-transform duration-300"
              >
                Explore Internships
              </Link>
              <button
                type="button"
                onClick={scrollToTop}
                className="px-4 py-3 rounded-xl border border-white/20 text-white font-semibold tracking-wide hover:border-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="flex flex-col gap-5 col-span-2 lg:col-span-1">
            {/* <Link to="/" onClick={scrollToTop} className="inline-flex flex-col items-start gap-3 group">
              <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-3xl overflow-hidden ">
                <div className="absolute " />
                <img
                  src="/icon.webp"
                  alt="InternMatrix logo"
                  className="h-full w-full object-contain p-4 md:p-5 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="leading-tight">
                <div className="text-3xl md:text-4xl font-black tracking-tight">
                  <span className="text-white">Intern</span>
                  <span className="text-yellow-500">Matrix</span>
                </div>
              </div>
            </Link> */}

            <Link to="/" onClick={scrollToTop} className="inline-flex items-center  group">
  <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-3xl overflow-hidden">
    <img
      src="/icon.webp"
      alt="InternMatrix Logo"
      className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform"
    />
  </div>

  <div className="leading-tight flex items-center">
    <span className="text-3xl md:text-4xl font-black tracking-tight text-white">
      Intern
    </span>
    <span className="text-3xl md:text-4xl font-black tracking-tight text-yellow-500">
      Matrix
    </span>
  </div>
</Link>


            <p className="text-gray-300 text-base leading-relaxed max-w-xl">
              We coach developers to build, iterate, and lead with production-ready skills.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/internmatrix/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/internmatrix/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/internmatrix?igsh=ZG5qZjZ0ZHkyeDhp"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 h-1 w-10 bg-yellow-500 rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-gray-300 text-sm font-medium">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Home</Link></li>
              <li><Link to="/online-internship" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Online Internship</Link></li>
              <li><Link to="/industrial-training" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Industrial Training</Link></li>
              <li><Link to="/sample-certificate" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Sample Certificate</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">About Us</Link></li>
              <li><Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Our Courses</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Contact</Link></li>
              <li><Link to="/refund-policy" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 relative inline-block">
              Top Skills
              <span className="absolute bottom-0 left-0 h-1 w-10 bg-yellow-500 rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-gray-300 text-sm font-medium">
              <li><Link to="/industrial-training" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Web Development</Link></li>
              <li><Link to="/industrial-training" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">App Development</Link></li>
              <li><Link to="/industrial-training" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">UI/UX Design</Link></li>
              <li><Link to="/industrial-training" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Digital Marketing</Link></li>
              <li><Link to="/industrial-training" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Data Science</Link></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-gray-300 text-sm">Stay in the loop with product drops, hiring partners, and new cohorts.</p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/30 via-transparent to-yellow-500/20 blur" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="relative w-full p-3 bg-black/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-yellow-500/30 hover:-translate-y-0.5 hover:shadow-yellow-500/45 transition-transform"
              >
                Subscribe
              </button>
            </form>
            <div className="pt-3 border-t border-white/10">
              <p className="text-sm font-semibold text-white mb-2">Verify Certificate</p>
              <Link
                to="/verify-certificate"
                onClick={scrollToTop}
                className="inline-flex items-center justify-center w-full py-3 border border-yellow-500 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                Verify Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Intern Matrix. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" onClick={scrollToTop} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" onClick={scrollToTop} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link
              to="/refund-policy"
              className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-colors duration-300"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed right-6 bottom-6 h-12 w-12 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-xl shadow-yellow-500/40 hover:-translate-y-1 transition-transform"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;