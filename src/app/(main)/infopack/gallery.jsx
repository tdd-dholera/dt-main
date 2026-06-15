"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import img1 from "@/assets/gallery/sir/5000mw-solar-park-dholera-times.webp";
import img2 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-butterfly-dholera-times.webp";
import img3 from "@/assets/gallery/sir/ahmedabad-dholera-expressway-dholera-times.webp";
import img4 from "@/assets/gallery/sir/cargo-terminal-dholera-international-airport-dholera-times.webp";
import img5 from "@/assets/gallery/sir/infrastruction-activation-area-dholera-times.webp";
import img6 from "@/assets/gallery/sir/main-gate-tata-semiconductor-plant-dholera-times.webp";
import img7 from "@/assets/gallery/sir/renew-solar-cell-manufacturing-plant-dholera-times.webp";
import img8 from "@/assets/gallery/sir/riverfront-dholera-activation-area-dholera-times.webp";
import img9 from "@/assets/gallery/sir/runway-dholera-international-airport-dholera-times.webp";
import img10 from "@/assets/gallery/sir/silk-route-park-activation-area-dholera-times.webp";
import img11 from "@/assets/gallery/sir/tata-semiconductor-plant-construction-dholera-times.webp";
import img12 from "@/assets/gallery/sir/tata-solar-park-dholera-times.webp";
import img13 from "@/assets/gallery/sir/water-treatment-plant-dholera-times.webp";
import img14 from "@/assets/gallery/sir/westwyn-estate-dholera-residential-plots.webp";

import Image from "next/image";


export default function DholeraCarousel() {
const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: "5000 MW Solar Park Dholera",
    caption: "5000 MW Solar Park – Dholera",
  },
  {
    id: 2,
    src: img2,
    alt: "Ahmedabad Dholera Expressway Butterfly Junction",
    caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
  },
  {
    id: 3,
    src: img3,
    alt: "Ahmedabad Dholera Expressway",
    caption: "Ahmedabad–Dholera Expressway",
  },
  {
    id: 4,
    src: img4,
    alt: "Cargo Terminal Dholera International Airport",
    caption: "Cargo Terminal – Dholera International Airport",
  },
  {
    id: 5,
    src: img5,
    alt: "Activation Area Infrastructure Dholera",
    caption: "Infrastructure – Dholera Activation Area",
  },
  {
    id: 6,
    src: img6,
    alt: "Main Gate Tata Semiconductor Plant Dholera",
    caption: "Main Gate – Tata Semiconductor Plant",
  },
  {
    id: 7,
    src: img7,
    alt: "ReNew Solar Cell Manufacturing Plant Dholera",
    caption: "ReNew Solar Cell Manufacturing Plant",
  },
  {
    id: 8,
    src: img8,
    alt: "Riverfront Dholera Activation Area",
    caption: "Riverfront – Dholera Activation Area",
  },
  {
    id: 9,
    src: img9,
    alt: "Runway Dholera International Airport",
    caption: "Runway – Dholera International Airport",
  },
  {
    id: 10,
    src: img10,
    alt: "Silk Route Park Activation Area Dholera",
    caption: "Silk Route Park – Activation Area",
  },
  {
    id: 11,
    src: img11,
    alt: "Tata Semiconductor Plant Construction Dholera",
    caption: "Tata Semiconductor Plant – Construction Phase",
  },
  {
    id: 12,
    src: img12,
    alt: "Tata Solar Park Dholera",
    caption: "Tata Solar Park – Dholera",
  },
  {
    id: 13,
    src: img13,
    alt: "Water Treatment Plant Dholera",
    caption: "Water Treatment Plant – Dholera",
  },
  {
    id: 14,
    src: img14,
    alt: "WestWyn Estate Dholera Residential Plots",
    caption: "WestWyn Estate – Dholera Residential Plots",
  },
];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, galleryImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex items-center justify-center w-full p-2 md:p-4 py-4 md:py-8">
      {/* Carousel Section */}
      <div className="max-w-6xl w-full mx-auto">
        <div className="relative rounded-2xl w-full max-w-4xl mx-auto overflow-hidden shadow-2xl bg-[#151f28]">
          {/* Main Image Display */}
          <div className="relative h-auto aspect-[3/2] w-full flex items-center justify-center">
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              fill
              className="aspect-[3/2]"
              priority
            />
            {/* Image Number Overlay */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 hover:scale-110 transition-all z-10 bg-[#d3b36b]"
          >
            <ChevronLeft size={24} className="text-[#151f28]" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 hover:scale-110 transition-all z-10 bg-[#d3b36b]"
          >
            <ChevronRight size={24} className="text-[#151f28]" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute bottom-4 left-4 rounded-full p-3 hover:scale-110 transition-all bg-[#d3b36b]"
          >
            {isPlaying ? (
              <Pause size={20} className="text-[#151f28]" />
            ) : (
              <Play size={20} className="text-[#151f28]" />
            )}
          </button>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full text-sm font-semibold bg-[#d3b36b] text-[#151f28]">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Image Info */}
        <div className="mt-6 p-4 text-center">
          <h3 className="text-2xl font-bold mb-2 text-[#d3b36b]">
            {galleryImages[currentIndex].alt}
          </h3>
          <p className="text-lg text-gray-300">
            {galleryImages[currentIndex].caption}
          </p>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-3 pb-4 justify-center">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? "border-yellow-500 scale-110" 
                    : "border-gray-600 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}