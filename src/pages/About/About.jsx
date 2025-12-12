import React, { useEffect, useRef, useState } from "react";
import aboutImage from "../../assets/images/contactImage.jpg";
import { FaChalkboardTeacher, FaAward, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";
 

const StatCard = ({ label, value, suffix = "", decimals = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        let started = false;
        let frame;

        const duration = 1400; // Smooth 1.4s anime
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const animateCount = (start) => {
            const now = performance.now();
            const progress = Math.min((now - start) / duration, 1);

            const eased = easeOutCubic(progress);
            const next = value * eased;

            setDisplayValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next));

            if (progress < 1) {
                frame = requestAnimationFrame(() => animateCount(start));
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    const start = performance.now();
                    frame = requestAnimationFrame(() => animateCount(start));
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value, decimals]);

    const formatted = decimals
        ? displayValue.toFixed(decimals)
        : displayValue.toLocaleString();

    return (
        <div
            ref={ref}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-black to-black px-6 py-8 border border-white/5 shadow-xl shadow-yellow-500/10"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-2">
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-yellow-400 drop-shadow-[0_6px_20px_rgba(234,179,8,0.2)]">
                    {formatted}
                    <span className="text-2xl md:text-3xl text-yellow-300/90 font-semibold">{suffix}</span>
                </h3>
                <p className="text-gray-300 font-semibold uppercase tracking-[0.18em] text-xs md:text-sm text-center">
                    {label}
                </p>
            </div>
        </div>
    );
};

const About = () => {
    const stats = [
        { label: "Students Trained", value: 1000, suffix: "+" },
        { label: "Industry Instructors", value: 30, suffix: "+" },
        { label: "Real Projects", value: 100, suffix: "+" },
        { label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1 }
    ];

    const pillars = [
        {
            title: "Expert Instructors",
            copy: "Learn from people who ship production code and mentor teams every day.",
            icon: <FaChalkboardTeacher />
        },
        {
            title: "Hands-on Projects",
            copy: "Ship portfolio-ready builds with code reviews, not just watch-alongs.",
            icon: <FaLaptopCode />
        },
        {
            title: "Verified Certificates",
            copy: "Stand out with proof of skills that employers can instantly verify.",
            icon: <FaAward />
        }
    ];

    return (
        <div className="w-full font-sans overflow-x-hidden bg-[#070707] text-white">
            <div className="relative w-full min-h-[340px] md:min-h-[420px] flex items-center">
                <img
                    src={aboutImage}
                    alt="About Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-slate-900/70" />
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_32%)]" />

                <div className="relative z-10 w-[90%] md:w-[85%] mx-auto flex flex-col gap-4 py-14 md:py-20">
                    <p className="text-yellow-400 font-semibold tracking-[0.25em] uppercase text-xs md:text-sm">Who We Are</p>
                    <h1 className="text-4xl md:text-6xl font-black leading-[1.1] max-w-3xl">
                        About <span className="text-white">Intern</span>
                        <span className="text-yellow-500">Matrix</span>
                    </h1>
                    <p className="text-gray-300 max-w-2xl text-lg md:text-xl">
                        We build confident engineers through brutal honesty, hands-on work, and a community that ships.
                    </p>
                    {/* <div className="flex flex-wrap gap-3 mt-4">
                        <span className="px-4 py-2 rounded-full border border-yellow-500/60 bg-yellow-500/10 text-sm font-semibold uppercase tracking-wide">
                            Always for Intern (White)
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold uppercase tracking-wide text-yellow-400">
                            Matrix (Yellow)
                        </span>
                    </div> */}
                </div>
            </div>

            <div className="relative w-[90%] md:w-[85%] mx-auto -mt-16 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <div className="absolute -top-5 -left-5 w-28 h-28 bg-yellow-500 rounded-tl-3xl blur-sm opacity-70" />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-br-3xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-yellow-500/10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-yellow-500/10" />
                        <img
                            src={aboutImage}
                            alt="Our Mission"
                            className="w-full h-[420px] object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-6 text-gray-200">
                    <p className="text-yellow-400 font-bold uppercase tracking-[0.18em] text-xs">Our Mission</p>
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                        Empowering the next generation of builders
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        We bridge theory and production-grade execution with ruthless clarity. You will practice, ship, and iterate with mentors who have solved the problems you are facing.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Every path blends guided labs, live feedback, and hiring signals so you can show proof of skill, not just course completion.
                    </p>
                    <Link to="/signup">
                        <button className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold tracking-wide shadow-lg shadow-yellow-500/30 hover:-translate-y-1 hover:shadow-yellow-500/50 transition-transform duration-300">
                            Join us today
                            <span aria-hidden className="text-xl">→</span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-black py-14">
                <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>
            </div>

            <div className="w-[90%] md:w-[85%] mx-auto my-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white inline-block">
                        Why Choose InternMatrix?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        Intentional curriculum, unapologetic standards, and the coaching you need to go from tutorial follower to teammate who ships.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-black p-8 shadow-xl shadow-black/30 transition-transform duration-300 hover:-translate-y-2 hover:shadow-yellow-500/25"
                        >
                            <div className="absolute inset-x-0 -top-10 h-24 blur-3xl bg-yellow-500/10" />
                            <div className="relative z-10 w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-yellow-400 text-2xl mb-6 border border-yellow-500/40 shadow-inner shadow-yellow-500/30">
                                {pillar.icon}
                            </div>
                            <h3 className="relative z-10 text-xl font-bold text-white text-center mb-3">{pillar.title}</h3>
                            <p className="relative z-10 text-gray-300 leading-relaxed text-center">
                                {pillar.copy}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;