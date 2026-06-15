"use client";
import React, { useState } from "react";
import Image from "next/image";
import desktopImage from "@/assets/residential/sold-out/paradise-plots-dholera-times-desktop.webp";
import mobileImage from "@/assets/residential/sold-out/paradise-plots-dholera-times-mobile.webp";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import BrochureDownload from "../../components/BrochureDownload";

const FeatureCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
      {icon}
    </div>
    <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
    <p className="text-[#151f28] font-bold text-lg">{value}</p>
  </div>
);

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

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  const projectFeatures = [
    { icon: "📐", title: "Plot Size", value: "177-300 Sq.Yards" },
    { icon: "🏗️", title: "Project Type", value: "Residential Dholera Plots" },
    { icon: "💰", title: "Starting Price", value: "₹6,700/Sq.Yd" },
    { icon: "📍", title: "Location", value: "Dholera SIR" },
  ];

  return (
    <>
      <title>Paradise 2 Dholera | Premium Plots in Smart City</title>
      <meta
        name="description"
        content="Dholera Times presents Paradise 2 - affordable plots near Dholera airport and expressway, perfect for long-term real estate investment growth."
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-residential-plots/paradise-2"
      />
      <meta name="robots" content="index, follow" />

      <div className="bg-gray-100">
        <div className="bg-[#151f28] text-white">
          <div className="py-4">
            {/* Image Container */}
            <div className="relative aspect-[5/4] md:aspect-[3/1] w-full overflow-hidden">
              {/* Background Image */}
              <Image
                src={desktopImage}
                alt="Paradise 2 residential plots in Dholera Gujarat"
                fill
                className="hidden object-cover md:block"
                sizes="(min-width: 1280px) 1280px, 100vw"
                priority
              />
              <Image
                src={mobileImage}
                alt="Paradise 2 residential plots in Dholera Gujarat"
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                priority
              />

              {/* Bottom Overlay Box */}
              <div className="max-w-7xl mx-auto  hidden md:flex absolute bottom-0 left-0 right-0 bg-[#0d1620]/90 backdrop-blur-sm border-t border-white/10 px-6 py-4 items-center gap-5">
                {/* Status */}
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

                {/* Title + Subtitle */}
                <div className="shrink-0 space-y-2">
                  <Link
                    href="/dholera-residential-plots/westwyn-estate"
                    className="text-white text-2xl font-bold leading-tight m-0"
                  >
                    WestWyn Estates
                  </Link>
                  <div className="text-[#d3b36b] text-xs mt-1">
                    Registry Ready Plot Starting From ₹10 Lakh
                  </div>
                </div>

                <div className="w-px h-12 bg-white/10 shrink-0" />

                {/* Price */}
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

                {/* Spacer — pushes buttons to far right */}
                <div className="flex-1" />

                <div className="w-px h-12 bg-white/10 shrink-0" />

                {/* CTAs — right corner */}
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
              </div>
            </div>

            <div className="md:hidden mt-6">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 w-full">
                <div className="grid gap-4 p-4">
                  {/* Categories & Price */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="px-3 py-1.5 text-white bg-green-500 rounded-full text-sm font-medium">
                        Ongoing
                      </span>
                    </div>
                    <div className="text-xl font-bold text-[#151f28]">
                      ₹6,700
                      <span className="text-sm text-gray-600 ml-1">/Sq.Yd</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <Link href="/dholera-residential-plots/westwyn-estate" className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      WestWyn Estates
                    </Link>
                  </div>

                  {/* Contact & Buttons */}
                  <div className="flex flex-col justify-between">
                    <div className="flex items-center order-2 gap-2 text-gray-700 text-base py-2">
                      <a
                        href="tel:+919958993549"
                        className="flex-1 text-center bg-[#d3b36b] hover:bg-[#d3b15c] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        📞 Site Visit
                      </a>
                      <button
                        onClick={openBrochureForm}
                        className="flex-1 bg-[#151f28] text-[#d3b15c] hover:bg-[#d3b15c] hover:text-[#151f28] px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        📄 Brochure
                      </button>
                    </div>
                    <div className="text-[#151f28] order-1 text-lg font-semibold">
                      <p>Registry Ready Plot Starting From ₹10 Lakh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectFeatures.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {brochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <BrochureDownload
              title="Get the Complete Project Brief"
              buttonName="Download Brochure"
              onClose={() => closeBrochureForm()}
              link="https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
