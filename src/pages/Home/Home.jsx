import { Link } from "react-router-dom";
import img from "../../assets/images/home.jpg";

import logo1 from "../../assets/images/aicte.webp";
import logo2 from "../../assets/images/MCA.webp";
import logo3 from "../../assets/images/msme.webp";
import logo4 from "../../assets/images/skillIndia.webp";
import logo5 from "../../assets/images/microsoft.webp";
import logo6 from "../../assets/images/ISO.webp";

function Home() {
  return (
    <div className="">
      {/* ------------ HERO SECTION ------------ */}
      <section
        className="flex justify-center items-center min-h-screen w-full bg-cover bg-center px-4 py-10 sm:py-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${img})`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center animate-fadeUp">
          <h1 className="typing text-2xl sm:text-4xl md:text-5xl font-bold leading-snug text-white">
            Learn & Grow with{" "}
            <span className="text-yellow-300">InternMatrix</span>
          </h1>

          <p className="fade-up mt-3 sm:mt-6 text-base sm:text-lg md:text-xl text-white px-2">
            Gain real-world, job-ready skills through industry-focused
            internship program. <strong>InternMatrix’ internships</strong>, and
            get certified.
          </p>

          <div className="fade-up mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
              to="/course"
              className="fade-up px-6 sm:px-8 py-3 rounded-full font-bold bg-gradient-to-r from-red-400 to-red-300 text-white shadow-lg hover:scale-105 transition w-full sm:w-auto text-center"
            >
              Explore Skills
            </Link>
              
              <Link
              to="/verify"
              className="px-6 sm:px-8 py-3 rounded-full font-bold border-4 border-yellow-300 text-white hover:bg-yellow-300 hover:text-gray-900 transition w-full sm:w-auto text-center"
            >
              Verify Certificate
            </Link>
           
            <Link
              to="/sample-certificate"
              className="px-6 sm:px-8 py-3 rounded-full font-bold text-black-200 bg-yellow-300 hover:text-gray-900 transition w-full sm:w-auto text-center"
            >
              Sample Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* ------------ FEATURES SECTION ------------ */}
      <section className="py-16 px-4 text-center bg-gray-100">
        <h2 clasamplessName="text-3xl sm:text-4xl font-semibold mb-10">
          Why Choose InternMatrix?
        </h2>

        <div className="flex justify-center flex-wrap gap-6">
          {[
            {
              title: "🎓 Learn Skills",
              desc: "Structured learning paths created by experts.",
            },
            {
              title: "💼 Internships",
              desc: "Work on real-time industry projects.",
            },
            {
              title: "📜 Certification",
              desc: "ISO-recognized & AICTE verified certificates.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 border-2 border-blue-700 rounded-xl w-full sm:w-64 bg-white shadow transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl sm:text-2xl mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    

      <section className="py-12 px-4 text-center bg-white">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
    Recognized & Trusted By
  </h2>

  <p className="text-sm mb-6 text-gray-600">
    Our certificates and programs are recognized by leading companies &
    institutions.
  </p>

  {/* <div
    className="
      flex flex-nowrap sm:flex-wrap
      justify-center gap-4 sm:gap-6 items-center
      overflow-x-auto sm:overflow-visible
      scrollbar-hide py-2
    "
  >
    {[logo1, logo2,logo6, logo3, logo4, logo5].map((logo, index) => (
      <img
        key={index}
        src={logo}
        alt="partner"
        className="
          w-12 sm:w-20 md:w-32
          opacity-70 hover:opacity-100
          transition
        "
      />
    ))}
  </div> */}
<div
  className="
    grid grid-cols-3 sm:flex
    justify-center gap-4 sm:gap-6 items-center
    py-2
  "
>
  {[logo1, logo2, logo6, logo3, logo4, logo5].map((logo, index) => (
    <img
      key={index}
      src={logo}
      alt="partner"
      className="
        w-16 sm:w-20 md:w-32
        mx-auto
        opacity-70 hover:opacity-100
        transition
      "
    />
  ))}
</div>


</section>


      {/* ------------ CTA SECTION ------------ */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-black to-gray-900 text-white">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Start Your Journey with{" "}
          <span className="text-yellow-300">InternMatrix</span>
        </h2>

        <p className="mt-3 sm:mt-4 text-lg sm:text-xl">
          Join thousands who transformed their careers.
        </p>

        <button className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 rounded-full font-bold bg-gradient-to-r from-yellow-300 to-yellow-200 text-black shadow-lg hover:scale-105 transition">
          Start Learning
        </button>
      </section>
    </div>
  );
}

export default Home;
