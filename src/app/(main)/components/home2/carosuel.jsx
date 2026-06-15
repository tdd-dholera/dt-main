"use client";

import { getImageProps } from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "@/assets/hero/abcd-building-dholera-homepage.webp";
import hero2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage.webp";
import hero3 from "@/assets/hero/dholera-smart-city-indias-planned-smart-city-homepage.webp";
import heroM1 from "@/assets/hero/abcd-building-dholera-homepage-mobile.webp";
import heroM2 from "@/assets/hero/dholera-sir-indias-first-semiconductor-city-homepage-mobile.webp";
import heroM3 from "@/assets/hero/dholera-smart-city-mobile-banner-dholera-times.webp";
import HeroForm from "./HeroForm";

const slides = [
  { desktop: hero1, mobile: heroM1, alt: "ABCD Building Dholera" },
  { desktop: hero2, mobile: heroM2, alt: "TATA Semiconductor Plant Dholera" },
  { desktop: hero3, mobile: heroM3, alt: "Dholera Activation Area" },
];

const DESKTOP_WIDTHS = [640, 750, 828, 1080, 1200, 1920];
const MOBILE_WIDTHS = [640];

function nextImageUrl(src, width, quality = 85) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

function buildSrcSet(image, widths, quality = 85) {
  return widths
    .map((width) => `${nextImageUrl(image.src, width, quality)} ${width}w`)
    .join(", ");
}

function HeroSlideImage({ slide, isFirst }) {
  return (
    <picture className="block h-full w-full">
      <source
        media="(min-width: 768px)"
        sizes="100vw"
        srcSet={buildSrcSet(slide.desktop, DESKTOP_WIDTHS)}
      />
      <source
        media="(max-width: 767px)"
        sizes="100vw"
        srcSet={buildSrcSet(slide.mobile, MOBILE_WIDTHS)}
      />
      <img
        src={nextImageUrl(slide.mobile.src, 640)}
        alt={slide.alt}
        width={slide.mobile.width}
        height={slide.mobile.height}
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </picture>
  );
}

export default function HOME2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCount = parseInt(
      localStorage.getItem("heroFormSubmissionCount") || "0",
      10,
    );
    const lastSubmission = parseInt(
      localStorage.getItem("heroFormLastSubmissionTime") || "0",
      10,
    );

    if (lastSubmission) {
      const hoursPassed = (Date.now() - lastSubmission) / (1000 * 60 * 60);

      if (hoursPassed >= 24) {
        localStorage.setItem("heroFormSubmissionCount", "0");
        localStorage.setItem(
          "heroFormLastSubmissionTime",
          Date.now().toString(),
        );
      } else {
        setSubmissionCount(storedCount);
        if (storedCount >= 20) setIsDisabled(true);
      }
    } else {
      setSubmissionCount(storedCount);
    }
  }, []);

  const updateSubmissionCount = useCallback(() => {
    setSubmissionCount((prev) => {
      const next = prev + 1;

      if (typeof window !== "undefined") {
        localStorage.setItem("heroFormSubmissionCount", String(next));
        localStorage.setItem("heroFormLastSubmissionTime", String(Date.now()));
      }

      if (next >= 20) setIsDisabled(true);
      return next;
    });
  }, []);

  const handleFormSuccess = useCallback(() => {
    setShowPopup(true);
    updateSubmissionCount();
  }, [updateSubmissionCount]);

  const nextSlide = useCallback(
    () => setCurrentSlide((p) => (p + 1) % slides.length),
    [],
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [nextSlide]);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-black mb-2">Thank You!</h2>
            <p className="text-gray-600 text-sm mb-4">
              Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#deae3c] hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const isFirst = index === 0;

            return (
              <div key={index} className="w-full flex-shrink-0 relative">
                <div className="relative w-full aspect-[5/8] md:aspect-auto md:h-[80vh]">
                  <HeroSlideImage slide={slide} isFirst={isFirst} />
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/60" />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-20 -translate-x-1/3"
          style={{ right: "clamp(4.5rem, calc(3rem + 2.5vw), 7rem)" }}
        >
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        <div className="flex md:hidden absolute bottom-20 left-0 right-0 z-20 px-4 pb-6">
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>

        <button
          onClick={prevSlide}
          className="absolute max-sm:hidden top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-[#151f28]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute max-sm:hidden top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-[#151f28]" />
        </button>
      </div>
    </>
  );
}
