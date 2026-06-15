"use client";
import React, { useState } from "react";
import Image from "next/image";
import estates from "@/assets/residential/westwyn-estates/westwyn-estates-dholera-times-desktop.webp";
import estatesM from "@/assets/residential/westwyn-estates/westwyn-estates-dholera-times-mobile.webp";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "../../components/BrochureDownload";

const PhoneIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
  </svg>
);

const DocIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="#d3b36b"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

export default function Hero() {
  const [brochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => setIsBrochureFormOpen(true);
  const closeBrochureForm = () => setIsBrochureFormOpen(false);

  const projectFeatures = [
    { icon: "📐", title: "Plot Size", value: "152 and 200 Sq.Yards" },
    { icon: "🏗️", title: "Project Type", value: "Residential Dholera Plots" },
    { icon: "💰", title: "Price", value: "₹6,700/Sq.Yd" },
    { icon: "📍", title: "Location", value: "Polarpur, Dholera" },
  ];

  return (
    <>
      <title>WestWyn Estates Dholera | Premium Plots in Smart City</title>
      <meta
        name="description"
        content="Discover WestWyn Estates Dholera plots exclusively on Dholera Times - premium smart city plots with high investment growth potential in Gujarat."
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-residential-plots/westwyn-estate"
      />
      <meta name="robots" content="index, follow" />

      <div className="bg-gray-100">
        <div className="bg-[#151f28] text-white">
          <div className="py-4">
            {/* Image Container */}
            <div className="relative aspect-[5/4] md:aspect-[3/1] w-full overflow-hidden">
              {/* Background Image */}
              <Image
                src={estates}
                alt="WestWyn Estates Residential Plots in Dholera Gujarat"
                fill
                className="hidden object-cover md:block"
                sizes="(min-width: 1280px) 1280px, 100vw"
                priority
              />
              <Image
                src={estatesM}
                alt="WestWyn Estates Residential Plots in Dholera Gujarat"
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                priority
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Desktop Overlay Bar — hidden on mobile */}
              {/* <div className="hidden md:flex absolute bottom-0 left-0 right-0 bg-[#0d1620]/90 backdrop-blur-sm border-t border-white/10 px-6 py-4 items-center gap-5">
                
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="relative flex"
                    style={{ width: 10, height: 10 }}
                  >
                    <span className="animate-ping absolute inline-flex rounded-full bg-green-400 w-full h-full opacity-75" />
                    <span className="relative inline-flex rounded-full bg-green-500 w-[10px] h-[10px]" />
                  </span>
                  <span className="text-green-400 text-[11px] font-bold tracking-widest uppercase">
                    Ongoing
                  </span>
                </div>

                <div className="w-px h-9 bg-white/10 shrink-0" />

               
                <div className="shrink-0 space-y-2">
                  <Link
                    href="/dholera-residential-plots/westwyn-estate"
                    className="text-white text-2xl font-bold leading-tight m-0"
                  >
                    WestWyn Estate
                  </Link>
                  <div className="text-[#d3b36b] text-xs mt-1">
                    Registry Ready Plot under ₹10 Lakh
                  </div>
                </div>

                <div className="w-px h-12 bg-white/10 shrink-0" />

               
                <div className="shrink-0">
                  <div className="text-[#d3b36b] text-[26px] font-extrabold leading-none">
                    ₹6,700{" "}
                    <span className="text-white/35 text-xs font-normal">
                      /Sq.Yd
                    </span>
                  </div>
                  <div className="text-white/35 text-[10px] tracking-widest uppercase mt-0.5">
                    Starting Price
                  </div>
                </div>

         
                <div className="flex-1" />

                <div className="w-px h-12 bg-white/10 shrink-0" />

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="tel:+919958993549"
                    className="flex items-center gap-2 bg-[#d3b36b] hover:bg-[#c9a558] text-[#0d1620] px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <PhoneIcon />
                    Site Visit
                  </a>

                  <button
                    onClick={openBrochureForm}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#d3b36b]/50 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <DocIcon />
                    Brochure
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Mobile Section */}
      </div>

      <AnimatePresence>
        {brochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Get the Complete Project Brief"
              buttonName="Download Brochure"
              onClose={closeBrochureForm}
              link="https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
