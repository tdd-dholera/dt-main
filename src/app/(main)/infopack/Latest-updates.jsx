"use client";
import { getblogs, getNews } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";

const RelatedBlogCard = ({ item, type }) => {
  const slug =
    type === "blog"
      ? `/dholera-updates/blogs/${item.slug?.current || "#"}`
      : `/dholera-updates/latest-updates/${item.slug?.current || "#"}`;

  return (
    <div className="flex-shrink-0 w-56 md:w-72 mx-3 snap-center cursor-pointer">
      <div className="bg-[#151f28] rounded-xl shadow-2xl overflow-hidden border border-[#d6b873]/30 transition-all duration-300 hover:scale-105">
        
        {/* Image */}
        <div className="relative w-full h-36 md:h-48 aspect-[3/2]">
          {item.mainImage ? (
            <Image
              src={urlFor(item.mainImage)
                .width(1200)
                .height(800)
                .format("webp")
                .quality(60)
                .url()}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-contain aspect-[3/2]"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <Link href={slug} className="block">

            {/* Title */}
            <h3 className="text-base font-semibold text-[#d6b873] line-clamp-2 mb-2 hover:text-white transition-colors duration-300">
              {item.title}
            </h3>

            {/* Meta */}
            <div className="text-xs text-gray-400 mb-3">
              <time className="block mb-1">
                {new Date(
                  item.publishedAt || item._createdAt
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span className="font-medium text-white">
                Dholera Times
              </span>
            </div>

            {/* CTA */}
            <span className="text-[#d6b873] hover:text-white text-sm font-medium inline-flex items-center group underline underline-offset-4">
              Read More
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
            </span>

          </Link>
        </div>
      </div>
    </div>
  );
};

/* ============================= */
/* Skeleton Loader               */
/* ============================= */

const BlogSkeleton = () => (
  <div className="flex-shrink-0 w-56 md:w-72 mx-3 snap-center">
    <div className="bg-[#151f28] rounded-xl overflow-hidden border border-[#d6b873]/30">
      <div className="w-full h-48 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-3 animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
      </div>
    </div>
  </div>
);

/* ============================= */
/* Main Component                */
/* ============================= */

export default function LatestUpdates() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        const [blogsData, updatesData] = await Promise.all([
          getblogs(),
          getNews(),
        ]);

        const combined = [...(blogsData || []), ...(updatesData || [])];

        const sorted = combined
          .sort(
            (a, b) =>
              new Date(b.publishedAt || b._createdAt) -
              new Date(a.publishedAt || a._createdAt)
          )
          .slice(0, 4);

        setContent(sorted);
      } catch (err) {
        console.error("Error loading content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  /* Auto Slide */
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    if (!loading && content.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === content.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [loading, content]);

  /* Scroll effect */
  useEffect(() => {
    if (!sliderRef.current) return;

    const cardWidth = window.innerWidth < 768 ? 280 : 320;

    sliderRef.current.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6"
        >
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <BlogSkeleton key={i} />)
            : content.map((item, index) => (
                <RelatedBlogCard
                  key={index}
                  item={item}
                  type="blog"
                />
              ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}