// import React from "react";
// import contactImage from "../../assets/images/contactImage.jpg";
// import { IoLocationOutline } from "react-icons/io5";
// import { FiPhoneCall } from "react-icons/fi";
// import { MdOutlineMessage } from "react-icons/md";

// const Contact = () => {

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         message: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [responseMsg, setResponseMsg] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setResponseMsg("");

//         try {
//             const res = await axios.post(
//                 "https://portfolio-backend-orpin-one.vercel.app/api/contact",
//                 formData
//             );

//             setResponseMsg(res.data.message);
//             setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });

//         } catch (error) {
//             setResponseMsg(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-full overflow-x-hidden font-sans">
//             {/* Hero Section */}
//             <div className="relative w-full h-80">
//                 <img
//                     src={contactImage}
//                     alt="Background"
//                     className="absolute inset-0 w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-slate-900/80"></div>
//                 <div className="absolute z-10 top-1/2 -translate-y-1/2 left-6 md:left-32 flex flex-col gap-2 text-white">
//                     <p className="text-yellow-400 font-semibold tracking-wider uppercase">Get in Touch</p>
//                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Contact Us</h1>
//                 </div>
//             </div>

//             {/* Main Section */}
//             <div className="my-20 w-[90%] md:w-[85%] mx-auto flex flex-col lg:flex-row justify-between gap-12 p-2">

//                 {/* Left Info */}
//                 <div className="flex flex-col gap-10 w-full lg:w-5/12 lg:pr-8">
//                     <h1 className="text-4xl text-black font-bold mb-4">
//                         Keep In Touch With Us
//                         <div className="h-1 rounded-full bg-yellow-500 w-16 mt-1.5"></div>
//                     </h1>
//                     <p className="text-gray-600 leading-relaxed text-lg">
//                         We would love to hear from you. Send us your message anytime!
//                     </p>

//                     <div className="flex items-start gap-5 group cursor-default">
//                         <div className="bg-black h-14 w-14 flex items-center justify-center text-yellow-400 text-2xl rounded-full">
//                             <IoLocationOutline />
//                         </div>
//                         <div className="font-medium text-gray-700">
//                             <h3 className="text-black font-bold text-lg mb-1">Our Location</h3>
//                             <p>KAIMA SHIKOH, P.CITY MAROOFGANJ PATNA, 800008</p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-5 group cursor-default">
//                         <div className="bg-black h-14 w-14 flex items-center justify-center text-yellow-400 text-2xl rounded-full">
//                             <FiPhoneCall />
//                         </div>
//                         <div className="font-medium text-gray-700">
//                             <h3 className="text-black font-bold text-lg mb-1">Phone Number</h3>
//                             <p>+91 9288075422</p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-5 group cursor-default">
//                         <div className="bg-black h-14 w-14 flex items-center justify-center text-yellow-400 text-2xl rounded-full">
//                             <MdOutlineMessage />
//                         </div>
//                         <div className="font-medium text-gray-700">
//                             <h3 className="text-black font-bold text-lg mb-1">Email Address</h3>
//                             <p>info@internmatrix.com</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Form */}
//                 <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full lg:w-7/12 relative overflow-hidden">
//                     <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500"></div>

//                     <h2 className="text-3xl font-bold mb-8 text-black">
//                         Send a Message
//                         <div className="h-1 rounded-full bg-yellow-500 w-10 mt-1"></div>
//                     </h2>

//                     <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
//                         <input
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             type="text"
//                             placeholder="First Name"
//                             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
//                             required
//                         />
//                         <input
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             type="text"
//                             placeholder="Last Name"
//                             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
//                             required
//                         />
//                         <input
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             type="email"
//                             placeholder="Your Email"
//                             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
//                             required
//                         />
//                         <input
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             type="tel"
//                             placeholder="Your Phone Number"
//                             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
//                             required
//                         />
//                         <textarea
//                             name="message"
//                             value={formData.message}
//                             onChange={handleChange}
//                             rows="5"
//                             placeholder="Your Message"
//                             className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg resize-none"
//                             required
//                         ></textarea>

//                         {responseMsg && (
//                             <p className="text-center font-semibold text-green-600">
//                                 {responseMsg}
//                             </p>
//                         )}

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full cursor-pointer bg-black text-yellow-400 py-3 rounded-lg font-semibold text-lg shadow-md hover:-translate-y-1 transition-all"
//                         >
//                             {loading ? "Sending..." : "SEND MESSAGE"}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Contact;


    
import React, { useState } from "react";
import axios from "axios";
import contactImage from "../../assets/images/contactImage.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await axios.post(
        "https://portfolio-backend-orpin-one.vercel.app/api/contact",
        formData
      );

      setResponseMsg(res.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setResponseMsg(error.response?.data?.message || "Something went wrong");
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
              <p>KAIMA SHIKOH, P.CITY MAROOFGANJ PATNA, 800008</p>
            </div>
          </div>

          {/* Map Section */}
          <h2 className="text-2xl font-bold mt-4 text-black">Find Our Studio</h2>
          <div className="h-1 w-16 bg-yellow-500 rounded mb-3"></div>

          <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.932386889088!2d85.05990387447929!3d26.65598047677797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eab6bc954965b1%3A0xffeb4b56ac0d258c!2sThe%20weddings%20chapter!5e0!3m2!1sen!2sin!4v1707033103274!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a
            href="https://maps.app.goo.gl/qiMmGoviEU86WMso7"
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
              <p className="text-center font-semibold text-green-600">
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
