 
    
import React, { useState } from "react";
import contactImage from "../../assets/images/contactImage.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";

import apiClient from "../../services/apiClient";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // success or error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    setMsgType("");

    try {
      const res = await apiClient.post("/api/contact/submit", formData);

      setMsgType("success");
      setResponseMsg(res.data.message || "Message sent successfully!");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Clear message after 5 seconds
      setTimeout(() => {
        setResponseMsg("");
      }, 5000);
    } catch (error) {
      setMsgType("error");
      setResponseMsg(
        error.response?.data?.message || 
        error.message || 
        "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-80">
        <img
          src={contactImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>
        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-6 md:left-32 flex flex-col gap-2 text-white">
          <p className="text-yellow-400 font-semibold tracking-wider uppercase">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Contact Us</h1>
        </div>
      </div>

      {/* Main Section */}
      <div className="my-20 w-[90%] md:w-[85%] mx-auto flex flex-col lg:flex-row justify-between gap-12 p-2">

        {/* Left Info */}
        <div className="flex flex-col gap-10 w-full lg:w-5/12 lg:pr-8">
          <h1 className="text-4xl text-black font-bold mb-4">
            Keep In Touch With Us
            <div className="h-1 rounded-full bg-yellow-500 w-16 mt-1.5"></div>
          </h1>
          <p className="text-gray-600 leading-relaxed text-lg">
            We would love to hear from you. Send us your message anytime!
          </p>

          {/* Location Section */}
          <div className="flex items-start gap-5 group cursor-default">
            <div className="bg-black h-14 w-14 flex items-center justify-center text-yellow-400 text-2xl rounded-full">
              <IoLocationOutline />
            </div>
            <div className="font-medium text-gray-700">
              <h3 className="text-black font-bold text-lg mb-1">Our Location</h3>
              <p>Intern Matrix, NARAYAN Bhawan, KAIMA SHIKOH, Marufganj, Patna City, Patna, Bihar 800008</p>
            </div>
          </div>

          {/* Map Section */}
          <h2 className="text-2xl font-bold mt-4 text-black">Our Office Address</h2>
          <div className="h-1 w-16 bg-yellow-500 rounded mb-3"></div>

          <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Intern%20Matrix%20Patna%20Bihar&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Intern Matrix location"
            ></iframe>
          </div>

          <a
            href="https://maps.app.goo.gl/RTwhgJGb1yzF56hb6"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg shadow hover:bg-yellow-600 transition-all text-center"
          >
            Get Directions
          </a>

          {/* Phone */}
          <div className="flex items-start gap-5 group cursor-default">
            <div className="bg-black h-14 w-14 flex items-center justify-center text-yellow-400 text-2xl rounded-full">
              <FiPhoneCall />
            </div>
            <div className="font-medium text-gray-700">
              <h3 className="text-black font-bold text-lg mb-1">Phone Number</h3>
              <p>+91 9288075422</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-5 group cursor-default">
            <div className="bg-black h-14 w-14 flex items-center justify-center text-yellow-400 text-2xl rounded-full">
              <MdOutlineMessage />
            </div>
            <div className="font-medium text-gray-700">
              <h3 className="text-black font-bold text-lg mb-1">Email Address</h3>
              <p>info@internmatrix.com</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full lg:w-7/12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500"></div>

          <h2 className="text-3xl font-bold mb-8 text-black">
            Send a Message
            <div className="h-1 rounded-full bg-yellow-500 w-10 mt-1"></div>
          </h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Your Phone Number"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg resize-none"
              required
            ></textarea>

            {responseMsg && (
              <p className={`text-center font-semibold p-3 rounded-lg ${
                msgType === "success" 
                  ? "bg-green-50 text-green-600 border border-green-200" 
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {responseMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-black text-yellow-400 py-3 rounded-lg font-semibold text-lg shadow-md hover:-translate-y-1 transition-all"
            >
              {loading ? "Sending..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
