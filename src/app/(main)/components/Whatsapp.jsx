"use client";

import React, { useId } from "react";
import Image from "next/image";
import whatsapp from "@/assets/whatsapp.svg";
import "./whatsapp.css";

export default function Whatsapp() {
  const id = useId();
  const circlePathId = `circlePath-${id}`;

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click_organic",
        lead_type: "whatsapp",
        device: window.innerWidth <= 768 ? "mobile" : "desktop",
      });

      window.open("https://wa.me/919958993549?text=Hi", "_blank");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div
        onClick={handleWhatsAppClick}
        className="fixed bottom-5 right-5 z-10 cursor-pointer"
      >
        <div className="relative h-20 w-20 rounded-full bg-white shadow-lg flex items-center justify-center">
          {/* Rotating Circular Text */}
          <svg
            className="absolute w-24 h-24 animate-spin-slow"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id={circlePathId}
                d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
              />
            </defs>
            <text fill="black" fontSize="12" fontWeight="bold">
              <textPath
                href={`#${circlePathId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                Let's Connect ● We're Online ●
              </textPath>
            </text>
          </svg>

          {/* WhatsApp Icon */}
          <div className="absolute">
            <Image src={whatsapp} alt="WhatsApp" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
}