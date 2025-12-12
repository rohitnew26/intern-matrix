import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X, Clock, Copy, Check, Sparkles, Gift } from "lucide-react";

export default function InternshipCouponBanner({
  code = "INTERN25",
  message = "Flat 25% Off on Internship Enrollment — Limited Seats!",
  bgColor = "from-slate-900 via-slate-800 to-slate-700",
  accentColor = "bg-amber-400",
  ctaText = "Apply for Industrial Training"
}) {
  const initialTime = { days: 0, hours: 23, minutes: 59, seconds: 59 };

  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const { pathname } = useLocation();

  const shouldShowOnRoute = () => {
    if (!pathname) return false;
    const p = pathname.toLowerCase();
    if (p === "/" || p === "" || p === "/home") return true;
    if (p.includes("signup") || p.includes("login")) return true;
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        else {
          return { ...initialTime };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = num => String(num).padStart(2, "0");

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Only show on Home, Signup and Login pages
  if (!shouldShowOnRoute()) return null;
  if (!visible) return null;

  return (
    <div 
      className="fixed top-24 left-3 right-auto z-50 w-[320px] sm:left-6 sm:w-[380px] animate-in fade-in slide-in-from-left duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${bgColor} shadow-2xl rounded-2xl p-4 sm:p-5 border border-amber-400/40 transition-all duration-300 ${isHovered ? 'scale-[1.02] shadow-amber-500/20' : ''}`}>
        
        {/* Animated background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-white/10 transition-all p-1.5 rounded-full z-10"
        >
          <X size={16} />
        </button>

        {/* Header with icon */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30">
            <Gift size={20} className="text-slate-900" />
          </div>
          <div>
            <h2 className="text-white text-base sm:text-lg font-bold tracking-tight flex items-center gap-1">
              <Sparkles size={14} className="text-amber-400" />
              Limited Time Offer!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Get <span className="text-green-400 font-bold">25% - 80% OFF</span> on Internship
            </p>
          </div>
        </div>

        {/* Coupon code section */}
        <div className="flex items-center justify-between gap-3 bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 px-3 py-1.5 rounded-lg font-bold text-sm tracking-wider shadow-lg">
                {code}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-lg blur opacity-40 -z-10" />
            </div>

            <button
              onClick={copyCode}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-amber-400/20">
            <Clock size={14} className="text-amber-400 animate-pulse" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-white font-mono font-bold text-sm tabular-nums">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-amber-400 font-bold text-xs animate-pulse">:</span>
              <span className="text-white font-mono font-bold text-sm tabular-nums">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-amber-400 font-bold text-xs animate-pulse">:</span>
              <span className="text-white font-mono font-bold text-sm tabular-nums">
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Urgency text */}
        <p className="text-center text-amber-300/80 text-[11px] sm:text-xs mt-3 font-medium">
          ⚡ Hurry! Offer ends soon. Limited seats available.
        </p>
      </div>
    </div>
  );
}
