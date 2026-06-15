"use client";

import { useEffect, useRef, useState } from "react";

const hiddenAnimationClasses = {
  "fade-up": "translate-y-8 opacity-0",
  "fade-left": "translate-y-6 opacity-0 md:translate-y-0 md:translate-x-8",
  "fade-right": "translate-y-6 opacity-0 md:translate-y-0 md:-translate-x-8",
  "scale-soft": "scale-[0.98] opacity-0",
};

export default function ObservedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hiddenClass =
    hiddenAnimationClasses[animation] || hiddenAnimationClasses["fade-up"];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`w-full max-w-full overflow-x-clip ${className}`}>
      <div
        className={`transition-all duration-700 ease-out ${
          isVisible
            ? "translate-x-0 translate-y-0 scale-100 opacity-100"
            : `${hiddenClass} motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100`
        }`}
        style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      >
        {children}
      </div>
    </section>
  );
}
