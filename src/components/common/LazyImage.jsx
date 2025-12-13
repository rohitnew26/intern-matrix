import React, { useEffect, useRef, useState } from "react";

/**
 * LazyImage
 * Props:
 * - src: image url
 * - alt: alt text
 * - className: wrapper class(es)
 * - imgClassName: class to apply to the <img> when rendered
 * - placeholder: optional placeholder node or color
 * - asBackground: if true, render a div with background-image (useful for existing bg-cover layouts)
 * - rootMargin: IntersectionObserver rootMargin
 */
export default function LazyImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  placeholder, // legacy: color/string
  placeholderNode, // new: react node to show while loading
  asBackground = false,
  rootMargin = "200px",
  style,
  children,
  width,
  height,
  fallbackSrc = null,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  const commonWrapperStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    ...style,
  };

  // Generate a small inline SVG fallback so the UI always shows an image when none is available
  const finalFallback = (() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><rect fill='%23f3f4f6' width='600' height='400' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='28'>No image available</text></svg>`;
    try {
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    } catch (e) {
      return "/placeholder-course.jpg";
    }
  })();

  if (asBackground) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: visible
            ? `url(${loadError ? (fallbackSrc || finalFallback) : src})`
            : undefined,
          ...commonWrapperStyle,
        }}
      >
        {!loaded && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {placeholderNode ? (
              placeholderNode
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    placeholder ||
                    "linear-gradient(90deg,#f0f0f0 0%,#e8e8e8 50%,#f0f0f0 100%)",
                  filter: "blur(6px)",
                }}
              />
            )}
          </div>
        )}

        {/* Preload image invisibly to detect load completion */}
        {visible && (
          <img
            src={src}
            alt={alt}
            style={{ display: "none" }}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoadError(true);
              setLoaded(true);
            }}
            decoding="async"
          />
        )}

        {/* children (badges/overlays) */}
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={commonWrapperStyle}>
      {!loaded && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {placeholderNode ? (
            placeholderNode
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  placeholder ||
                  "linear-gradient(90deg,#f0f0f0 0%,#e8e8e8 50%,#f0f0f0 100%)",
              }}
            />
          )}
        </div>
      )}

      {visible && (
        <img
          src={loadError ? (fallbackSrc || finalFallback) : src}
          alt={alt}
          className={imgClassName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 300ms ease",
            display: "block",
          }}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoadError(true);
            setLoaded(true);
          }}
          decoding="async"
          loading="lazy"
        />
      )}

      {children}
    </div>
  );
}
