import { useEffect } from "react";

export default function ClickSpark() {
  useEffect(() => {
    const handleClick = (e) => {
      for (let i = 0; i < 14; i++) {
        const spark = document.createElement("div");

        spark.style.position = "fixed";
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;

        // BIGGER
        spark.style.width = "8px";
        spark.style.height = "8px";

        spark.style.background = "#ffeb3b";
        spark.style.borderRadius = "50%";
        spark.style.pointerEvents = "none";
        spark.style.zIndex = 999999;

        // glow
        spark.style.boxShadow = "0 0 10px 4px rgba(255,230,0,0.8)";

        spark.style.opacity = 1;
        spark.style.transform = `translate(-50%, -50%)`;

        const angle = (Math.PI * 2 * i) / 14;

        // longer explosion
        const distance = 75 + Math.random() * 30;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        spark.animate(
          [
            { transform: `translate(${x}px, ${y}px) scale(1.4)`, opacity: 0 },
          ],
          {
            duration: 580,
            easing: "cubic-bezier(.33,.01,.4,1.03)",
          }
        );

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), 600);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}
