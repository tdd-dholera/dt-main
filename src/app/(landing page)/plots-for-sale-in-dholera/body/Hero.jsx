// Hero.jsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "@/assets/ad-page/hero/residential-plots-in-dholera-bookmyassets-desktop-banner.webp";
import img2 from "@/assets/ad-page/hero/residential-plots-in-dholera-bookmyassets-mobile-banner.webp";
import HeroForm from "./HeroForm";
import Running from "../components/Marquee";

const points = [
  {
    title: "Registry-Ready Plots",
    desc: "Suitable for buyers exploring high-growth land opportunities in India's first greenfield smart city.",
  },
  {
    title: "Immediate Possession",
    desc: "Focused on long-term planning — we guide you through timelines, returns, and exit strategies.",
  },
  {
    title: "Near Dholera SIR",
    desc: "Access maps, master plans, and plot layout walkthroughs before making any decision.",
  },
];

const PointsList = () => (
  <div className="flex flex-col gap-[clamp(1rem,1.75vw,1.5rem)] w-[clamp(500px,45vw,700px)]">
    <h1 className="text-white font-bold text-[clamp(1.5rem,2.7vw,2.45rem)] leading-tight mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Govt Approved Plots in Dholera
      <br />
      <span className="text-[#d3b36b]">Starting from ₹8 Lakh</span>
    </h1>

    <p className="text-white text-[clamp(0.75rem,1.5vw,1.2rem)] mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Explore premium plotted opportunities in Dholera.
      <br />
      Get brochure, price list, location details, and expert guidance from
      Dholera Times.
    </p>

    {points.map((point, i) => (
      <div
        key={i}
        className="flex gap-[clamp(0.5rem,1vw,0.875rem)] items-center"
      >
        <div className="shrink-0 w-[clamp(1.5rem,2.15vw,1.8rem)] h-[clamp(1.5rem,2.15vw,1.8rem)] rounded-full border border-yellow-500/60 flex items-center justify-center">
          <span className="text-[#d3b36b] text-[clamp(0.8rem,1.2vw,1rem)] font-semibold">
            ➤
          </span>
        </div>
        <p className="text-white font-medium text-[clamp(0.35rem,1.35vw,1.5rem)] leading-snug">
          {point.title}
        </p>
      </div>
    ))}
  </div>
);

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // Check submission limit on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("heroFormSubmissionCount") || "0",
        10,
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("heroFormLastSubmissionTime") || "0",
        10,
      );

      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          setSubmissionCount(0);
          localStorage.setItem("heroFormSubmissionCount", "0");
          localStorage.setItem(
            "heroFormLastSubmissionTime",
            Date.now().toString(),
          );
        } else {
          setSubmissionCount(storedCount);
          if (storedCount >= 20) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }
  }, []);

  const updateSubmissionCount = () => {
    const newCount = submissionCount + 1;
    setSubmissionCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("heroFormSubmissionCount", newCount.toString());
      localStorage.setItem("heroFormLastSubmissionTime", Date.now().toString());
    }
    if (newCount >= 20) {
      setIsDisabled(true);
    }
  };

  const handleFormSuccess = () => {
    setShowPopup(true);
    updateSubmissionCount();
  };

  return (
    <div id="hero">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-black mb-2">Thank You!</h2>
            <p className="text-gray-600 text-sm mb-4">
              Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="relative w-full h-screen aspect-[3/1] hidden md:block">
        <Image
          src={img1}
          alt="Dholera Smart City Plots"
          fill
          className="object-cover w-full h-screen"
          priority
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-black/75" />

        <div className="absolute inset-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-[clamp(.7rem,3.2vw,3.2rem)]">
          <PointsList />
          <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative w-full min-h-screen">
          <Image
            src={img2}
            alt="Dholera Smart City Plots"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 z-20 flex flex-col px-4 py-6 justify-center gap-4 overflow-y-auto">
            <h1 className="text-white font-bold text-[clamp(1.5rem,6vw,2rem)] leading-tight mb-2">
              Govt Approved Plots in Dholera
              <br />
              <span className="text-[#d3b36b]">Starting from ₹8 Lakh</span>
            </h1>

            {points.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full border border-yellow-500/60 flex items-center justify-center">
                  <span className="text-[#d3b36b] text-[0.6rem] font-semibold">
                    ➤
                  </span>
                </div>
                <div>
                  <p className="mt-1 text-white font-medium text-sm leading-snug">
                    {point.title}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-2 border-t border-yellow-600/20 pt-4">
              <HeroForm isDisabled={isDisabled} onSuccess={handleFormSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
