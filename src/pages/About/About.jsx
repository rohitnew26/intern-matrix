import React from "react";
import aboutImage from "../../assets/images/contactImage.jpg";
import { FaChalkboardTeacher, FaUsers, FaAward, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="w-full font-sans overflow-x-hidden">


            <div className="relative w-full h-80">
                <img
                    src={aboutImage}
                    alt="About Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-slate-900/80"></div>


                <div className="absolute z-10 top-1/2 -translate-y-1/2 left-6 md:left-32 flex flex-col gap-2 text-white">
                    <p className="text-yellow-400 font-semibold tracking-wider uppercase">
                        Who We Are
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        About Intern<span className="text-yellow-500">Matrix</span>
                    </h1>
                </div>
            </div>


            <div className="w-[90%] md:w-[85%] mx-auto my-20 flex flex-col lg:flex-row items-center gap-16">


                <div className="w-full lg:w-1/2 relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500 rounded-tl-3xl -z-10"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black rounded-br-3xl -z-10"></div>
                    <img
                        src={aboutImage}
                        alt="Our Mission"
                        className="w-full h-[400px] object-cover rounded-xl shadow-xl border-4 border-white"
                    />
                </div>

                {/* Right: Content */}
                <div className="w-full lg:w-1/2">
                    <p className="text-yellow-600 font-bold uppercase tracking-wide text-sm mb-2">Our Mission</p>
                    <h2 className="text-4xl font-bold text-black mb-6">
                        Empowering the Next Generation of Developers
                        <div className="h-1.5 rounded-full bg-yellow-500 w-20 mt-3"></div>
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        At InternMatrix, we believe that quality education should be accessible to everyone.
                        We bridge the gap between theoretical learning and industry demands by providing
                        hands-on, project-based courses taught by industry experts.
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Whether you are starting your coding journey or looking to upskill, our platform
                        provides the tools, community, and certification you need to succeed in the modern tech world.
                    </p>

                    <Link to="/signup">
                        <button className="bg-black text-yellow-400 px-8 py-3 rounded-lg font-bold tracking-wide shadow-lg hover:bg-black cursor-pointer hover:-translate-y-1 transition-all duration-300">
                            JOIN US TODAY
                        </button>
                    </Link>
                </div>
            </div>


            <div className="w-full bg-black py-16 text-white">
                <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">


                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">10k+</h3>
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">Students</p>
                    </div>


                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">50+</h3>
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">Instructors</p>
                    </div>


                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">120+</h3>
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">Courses</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-yellow-400">4.9</h3>
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">Star Rating</p>
                    </div>

                </div>
            </div>

            {/* --------Why Choose Us -------- */}
            <div className="w-[90%] md:w-[85%] mx-auto my-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black inline-block">
                        Why Choose InternMatrix?
                        <div className="h-1.5 rounded-full bg-yellow-500 w-1/2 mx-auto mt-3"></div>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group text-center">
                        <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-yellow-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <FaChalkboardTeacher />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">Expert Instructors</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Learn from industry veterans who have worked at top tech companies. Real-world experience, not just theory.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
                        <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-yellow-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <FaLaptopCode />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">Hands-on Projects</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Don't just watch videos. Build real projects that you can add to your portfolio and show to recruiters.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group text-center">
                        <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-yellow-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <FaAward />
                        </div>
                        <h3 className="text-xl font-bold text-black mb-3">Verified Certificates</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Earn certificates upon completion that are recognized by top employers and shareable on LinkedIn.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default About;