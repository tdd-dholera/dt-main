"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

export default function BlogSlider({ posts }) {
  const [current, setCurrent] = useState(0);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCols(3);
      else if (window.innerWidth >= 768) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset to first slide when cols change
  useEffect(() => {
    setCurrent(0);
  }, [cols]);

  const totalSlides = Math.ceil(posts.length / cols);
  const clamp = (n) => Math.min(Math.max(n, 0), totalSlides - 1);

  const prev = () => setCurrent((c) => clamp(c - 1));
  const next = () => setCurrent((c) => clamp(c + 1));

  if (!posts.length) {
    return (
      <div className="rounded-xl bg-white p-[clamp(1.25rem,2.5vw,2rem)] text-center shadow-md">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          No Blog Posts Available
        </h3>
        <p className="text-gray-600">
          Check back soon for information about Dholera SIR investment
          opportunities.
        </p>
      </div>
    );
  }

  // Group posts into pages of `cols`
  const pages = Array.from({ length: totalSlides }, (_, i) =>
    posts.slice(i * cols, i * cols + cols)
  );

  return (
    <div className="mx-auto max-w-7xl">
      {/* Viewport */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="grid w-full min-w-0 flex-shrink-0 gap-[clamp(1rem,2vw,1.5rem)]"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                minWidth: "100%",
              }}
            >
              {page.map((post) => (
                <div key={post._id} className="min-w-0">
                  <BlogCard post={post} />
                </div>
              ))}

              {/* Fill empty slots on last page so layout doesn't break */}
              {page.length < cols &&
                Array.from({ length: cols - page.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden min-w-0 md:block" />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Dots */}
        <div className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:justify-start">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b56d] focus-visible:ring-offset-2"
              style={{
                height: 8,
                width: i === current ? 28 : 8,
                background: i === current ? "#d7b56d" : "#d1c9b8",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
            style={{ borderColor: "#d7b56d", color: "#d7b56d" }}
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            onClick={next}
            disabled={current === totalSlides - 1}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
            style={{ background: "#d7b56d" }}
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
