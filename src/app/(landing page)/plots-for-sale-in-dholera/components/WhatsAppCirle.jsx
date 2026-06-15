"use client";

import React from "react";
import Image from "next/image";
import whatsapp from "@/assets/whatsapp.svg";

export default function Whatsapp() {
  const handleWhatsappClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        lead_type: "whatsapp",
        device: "desktop",
      });

      window.open(
        "https://wa.me/919958993549?text=Hi%2C%20I%27m%20interested%20in%20Dholera%20plots.%20Please%20share%20details.",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <div
      onClick={handleWhatsappClick}
      className="hidden md:block  fixed bottom-8 right-8 z-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="relative h-24 w-24 rounded-full bg-white shadow-xl flex items-center justify-center">
        {/* Rotating SVG Text */}
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          style={{ animation: "spin-slow 5s linear infinite" }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="black"
            fontSize="11"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            <textPath
              href="#circlePath"
              startOffset="0%"
              textAnchor="bold"
              className="tracking-wider"
            >
              LET'S CONNECT ● LET'S CONNECT ●
            </textPath>
          </text>
        </svg>

        {/* WhatsApp Icon */}
        <div className="absolute flex items-center justify-center rounded-full p-3">
          <Image
            src={whatsapp}
            alt="WhatsApp"
            width={20}
            height={20}
            className="w-16 h-16"
          />
        </div>
      </div>
    </div>
  );
}
