 

import React, { useCallback, useEffect, useRef, useState } from "react";
import sound from "../assets/sounds/firework.mp3";

const OfferCelebration = ({
  buttonLabel = "Apply Offer",
  duration = 3000,
  playSound = true,
  onApply = () => {},
  trigger = false,
  onStart = () => {},
  discountPercentage = 25, // dynamic discount from parent (CourseDetails)
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);
  const reducedMotionRef = useRef(false);

  /* ---------------- Preload Audio Once ---------------- */
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(sound);
    audioRef.current.preload = "auto";
    audioRef.current.volume = 1;
  }, []);

  /* ---------------- Play Sound Instantly ---------------- */
  const playSoundEffect = useCallback(() => {
    if (!playSound || reducedMotionRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0; // restart instantly
    audio.play().catch(() => {});
  }, [playSound]);

  /* ---------------- Reduced Motion ---------------- */
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotionRef.current = mq.matches;
      mq.addEventListener("change", (e) => (reducedMotionRef.current = e.matches));
    } catch {}
  }, []);

  /* ---------------- Fallback Confetti ---------------- */
  const fallbackConfetti = useCallback((canvas, runFor = 2000) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const random = (min, max) => Math.random() * (max - min) + min;
    const colors = ["#ff6b6b", "#f8c102", "#4ade80", "#60a5fa", "#a78bfa", "#fb923c", "#f472b6"];

    const particles = Array.from({ length: 100 }).map(() => ({
      x: random(0, w),
      y: random(-100, 0),
      vx: random(-2, 2),
      vy: random(2, 8),
      size: random(6, 14),
      color: colors[Math.floor(random(0, colors.length))]
    }));

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    timeoutRef.current = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, w, h);
    }, runFor);
  }, []);

  /* ---------------- Confetti Loader ---------------- */
  const runConfetti = useCallback(
    async (runFor = 2000) => {
      if (reducedMotionRef.current) return;
      try {
        const module = await import("canvas-confetti");
        const confetti = module.default;

        const end = Date.now() + runFor;
        const interval = setInterval(() => {
          if (Date.now() > end) return clearInterval(interval);

          confetti({
            particleCount: 60,
            spread: 70,
            origin: { x: Math.random(), y: Math.random() * 0.4 }
          });
        }, 200);
      } catch {
        fallbackConfetti(canvasRef.current, runFor);
      }
    },
    [fallbackConfetti]
  );

  /* ---------------- Start Celebration ---------------- */
  const startCelebration = useCallback(() => {
    setIsOpen(true);

    playSoundEffect(); // plays instantly (no delay)
    runConfetti(duration);

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      onApply();
    }, duration + 2000);
  }, [duration, playSoundEffect, onApply]);

  /* ---------------- External Trigger ---------------- */
  useEffect(() => {
    if (trigger) {
      onStart();
      startCelebration();
    }
  }, [trigger]);

  /* ---------------- Cleanup ---------------- */
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <button className="oc-btn" onClick={startCelebration}>
        🎉 {buttonLabel}
      </button>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 50
        }}
      />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold text-yellow-600">
              🎊 Congratulations! Enjoy your extra {discountPercentage}% discount!
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferCelebration;
