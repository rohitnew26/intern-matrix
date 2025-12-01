import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 font-sans border-t border-gray-800">
      <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          {/* Added scrollToTop here too for the Logo */}
          <Link to="/" onClick={scrollToTop}>
            <h2 className="text-3xl font-bold tracking-tight cursor-pointer">
              Intern<span className="text-yellow-500">Matrix</span>
              {/* <span className="block text-sm font-normal text-gray-400 mt-1">by App Dost</span> */}
            </h2>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering developers with the skills to build the future.
            Join our community and master the art of coding.
          </p>

          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/internmatrix/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300">
              <FaFacebookF />
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300">
              <FaTwitter />
            </a> */}
            {/* <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300">
              <FaLinkedinIn />
            </a> */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 pb-2 relative inline-block">
            Quick Links
            <span className="absolute bottom-0 left-0 h-1 w-10 bg-yellow-500 rounded-full"></span>
          </h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm font-medium">

            {/* 2. Add onClick={scrollToTop} to every link */}
            <li>
              <Link to="/" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/sample-certificate" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Sample Certificate</Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Our Courses</Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Contact</Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-yellow-500 transition-colors">Refund Policy</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services/Skills */}
        <div>
          <h3 className="text-xl font-bold mb-6 pb-2 relative inline-block">
            Top Skills
            <span className="absolute bottom-0 left-0 h-1 w-10 bg-yellow-500 rounded-full"></span>
          </h3>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm font-medium">
            {/* Add onClick={scrollToTop} here as well */}
            <li><Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Web Development</Link></li>
            <li><Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">App Development</Link></li>
            <li><Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">UI/UX Design</Link></li>
            <li><Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Digital Marketing</Link></li>
            <li><Link to="/course" onClick={scrollToTop} className="hover:text-yellow-500 transition-colors">Data Science</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-6 pb-2 relative inline-block">
            Newsletter
            <span className="absolute bottom-0 left-0 h-1 w-10 bg-yellow-500 rounded-full"></span>
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get the latest updates and news.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm"
            />
            <button className="bg-yellow-500 text-black py-3 rounded-lg font-bold text-sm tracking-wide hover:bg-white hover:text-black transition-colors duration-300">
              SUBSCRIBE
            </button>
          </form>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="w-[90%] md:w-[85%] mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs md:text-sm">
        <p>&copy; {new Date().getFullYear()} Interrn Matrix. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
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
    </footer>
  );
};

export default Footer;