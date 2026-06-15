"use client";
import React, { useState } from "react";
import Image from "next/image";
import hero from "@/assets/gallery/galleryHero.webp";
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


export default function DholeraProgressPage() {
 const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: "Solar Park Dholera",
    caption: "5000 MW Solar Park – Dholera",
  },
  {
    id: 2,
    src: img2,
    alt: "Ahmedabad-Dholera Expressway",
    caption: "Ahmedabad–Dholera Expressway Butterfly Junction",
  },
  {
    id: 3,
    src: img4,
    alt: "Dholera International Airport",
    caption: "Ahmedabad–Dholera Expressway",
  },
  {
    id: 4,
    src: img7,
    alt: "Dholera ReNew Power Plant ",
    caption: "Cargo Terminal – Dholera International Airport",
  },
  {
    id: 5,
    src: img5,
    alt: "Dholera Activation Area Infrastructure",
    caption: "Infrastructure – Dholera Activation Area",
  },
  {
    id: 6,
    src: img6,
    alt: "Tata Semiconductor Plant Dholera",
    caption: "Main Gate – Tata Semiconductor Plant",
  },
  {
    id: 7,
    src: img3,
    alt: "Dholera Expressway",
    caption: "ReNew Solar Cell Manufacturing Plant",
  },
  {
    id: 8,
    src: img8,
    alt: "Dholera Riverfront Development",
    caption: "Riverfront – Dholera Activation Area",
  },
  {
    id: 9,
    src: img9,
    alt: "Dholera International Airport Runway",
    caption: "Runway – Dholera International Airport",
  },
  {
    id: 10,
    src: img10,
    alt: "Dholera Silk Route Park",
    caption: "Silk Route Park – Activation Area",
  },
  {
    id: 11,
    src: img11,
    alt: "Semiconductor Plant in Dholera ",
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
    alt: "Residential Plots in Dholera",
    caption: "WestWyn Estate – Dholera Residential Plots",
  },
];


  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
      <title>Dholera Smart City Gallery | Dholera Times</title>
      <meta
        name="description"
        content="Explore the Dholera Smart City gallery by Dholera Times featuring project visuals, site progress, and development updates in Dholera SIR"
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera SIR, Dholera Gujarat, Smart City Dholera, Dholera Project, Dholera Investment"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/gallery/dholera-sir-progress"
      />
      <meta name="robots" content="index, follow" />

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src={hero}
          alt="Dholera SIR Progress"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
          <div className="text-center px-6 py-10 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Dholera SIR Progress in Every Frame
            </h1>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Gallery Grid with Enhanced Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer bg-white"
              onClick={() => openPopup(image)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Caption */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{image.alt}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold z-10"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="bg-white p-4 text-center">
              <h3 className="text-lg font-bold">{selectedImage.alt}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
