import React from "react";
import { Percent, Users, Briefcase, GraduationCap, Laptop, Globe } from "lucide-react";

const benefits = [
  {
    icon: <Percent size={32} />,
    title: "Discounts",
    description:
      "Unlock exclusive discounts on Intern Matrix courses, workshops, and certifications, making advanced technology education accessible for everyone on campus.",
  },
  {
    icon: <Users size={32} />,
    title: "Sponsorships",
    description:
      "Empower your campus with Intern Matrix sponsorships for events, hackathons, and projects, driving innovation and creativity among students.",
  },
  {
    icon: <Briefcase size={32} />,
    title: "Career Opportunities",
    description:
      "Leverage Intern Matrix certifications and professional networks to connect with top companies worldwide and secure rewarding career opportunities.",
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Technology Transfer",
    description:
      "Bring your university degrees into the digital era with Intern Matrix technology transfer solutions, offering seamless online education for global reach.",
  },
  {
    icon: <Laptop size={32} />,
    title: "Internships",
    description:
      "Gain practical experience with internships offered by Intern Matrix, bridging the gap between academic learning and real-world applications.",
  },
  {
    icon: <Globe size={32} />,
    title: "Global Recognition",
    description:
      "Showcase your commitment to innovation and excellence, win prestigious awards, and earn recognition as a leader in technology education on a global stage.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="w-full bg-white py-12 px-4 md:px-10 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Benefits</h2>
        <p className="text-gray-700 max-w-3xl">
          Get exclusive access to skill acquisition programmes, events, projects, technology transfers, awards,
          internships, job opportunities from globally recognised organisations for your students.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="border border-[#3b45ff] rounded-2xl p-6 hover:shadow-md transition bg-white"
          >
            <div className="text-[#3b45ff] mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}