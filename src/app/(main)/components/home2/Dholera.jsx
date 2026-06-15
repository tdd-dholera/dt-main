import React from "react";
import dholeraSite from "@/assets/dholera-smart-city-home-image2.webp";
import Image from "next/image";
import Link from "next/link";
import Magnet from "./Magnet";

export default function Dholera() {
  const locationFeatures = [
    { text: "India’s First Special Investment Region (SIR)" },
    { text: "Strong backing from both State and Central Governments" },
    { text: "Rapid industrial and infrastructure development underway" },
    { text: "Plug and play infrastructure for faster project execution" },
    { text: "High appreciation potential over the next 5 years" },
  ];

  return (
    <>
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[28px] text-center font-bold text-[#151f28] mb-6 leading-tight">
            Invest in India's First Planned Smart City: <span className="text-[#d3b36b]">Dholera SIR</span> 
          </h1>
          <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-12">
            {/* Left side - Image */}
            <div className="md:w-1/2 w-full">
              <div className="relative">
                <Image
                  src={dholeraSite}
                  alt="ABCD Building"
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="md:w-1/2 w-full">
              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-left mb-4">
                Spanning over 922.5 sq. km, Dholera SIR is part of Delhi–Mumbai
                Industrial Corridor (DMIC). With large-scale infrastructure
                planning, industrial growth, and future-ready connectivity, it
                has become India's top investment zone. <br /> Key highlights of Dholera Smart City:
              </p>

              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left mb-6">
                  {locationFeatures.map((feature, index) => {
                    const isLast = index === locationFeatures.length - 1;
                    const isOdd = locationFeatures.length % 2 !== 0;

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 ${isLast && isOdd ? "md:col-span-2" : ""}`}
                      >
                        <span className="text-sm text-gray-700 leading-snug">
                          ➣ {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/dholera-sir"
                  className="bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md inline-block w-fit"
                >
                  About Dholera SIR →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
