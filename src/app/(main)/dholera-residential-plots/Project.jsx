"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CARD_WIDTH = 340;
const GAP = 32;
const CARDS_VISIBLE = 4;

export default function ProjectsSlider({ projects }) {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, projects.length - CARDS_VISIBLE);

  const scrollTo = (index) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrent(clamped);
    trackRef.current?.scrollTo({
      left: clamped * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP));
      setCurrent(Math.min(idx, maxIndex));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [maxIndex]);

  return (
    <div className="relative px-6">
      {/* Prev Button */}
      <button
        onClick={() => scrollTo(current - 1)}
        disabled={current === 0}
        aria-label="Previous"
        className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-[#debe6b] text-[#151f28] transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [scroll-snap-type:x_mandatory]"
      >
        {projects.map((post) => (
          <div
            key={post._id}
            className="flex-shrink-0 w-[340px] [scroll-snap-align:start]"
          >
            <Link
              href={
                post.slug?.current
                  ? `/dholera-residential-plots/${post.slug.current}`
                  : "#"
              }
              className="block h-full"
            >
              <div className="rounded-3xl shadow-xl overflow-hidden border-2 border-[#debe6b]/20 bg-[#fbfbfb] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                <div className="relative h-52 flex-shrink-0">
                  {post.mainImage && (
                    <Image
                      src={post.mainImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2 line-clamp-1 text-[#151f28]">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm leading-relaxed mb-4 line-clamp-3 flex-grow text-[#151f28]/75">
                      {post.description}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-1.5 px-5 py-2.5 font-semibold rounded-xl text-sm mt-auto bg-[#debe6b] text-[#151f28] w-fit">
                    View Project
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => scrollTo(current + 1)}
        disabled={current >= maxIndex}
        aria-label="Next"
        className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-[#debe6b] text-[#151f28] transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-[#debe6b]" : "w-2 bg-[#151f28]/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
