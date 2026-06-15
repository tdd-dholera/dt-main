"use client";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import wc from "@/assets/residential/sold-out/pride-plots-dholera-times-desktop.webp";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaRoad,
  FaPlane,
  FaIndustry,
  FaClock,
  FaCity,
  FaShieldAlt,
  FaChartLine,
  FaHome,
  FaArrowCircleUp,
} from "react-icons/fa";

const WestWynAboutSection = () => {
  const [counters, setCounters] = useState({
    plotSize: 0,
    price: 0,
    amenities: 0,
  });

  const [formType, setFormType] = useState("");

  // Animation for counters
  useEffect(() => {
    const animateCounters = () => {
      const targets = { plotSize: 170, price: 10, amenities: 5 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let current = { plotSize: 0, price: 0, amenities: 0 };

      const timer = setInterval(() => {
        current.plotSize = Math.min(
          current.plotSize + targets.plotSize / steps,
          targets.plotSize,
        );
        current.price = Math.min(
          current.price + targets.price / steps,
          targets.price,
        );
        current.amenities = Math.min(
          current.amenities + targets.amenities / steps,
          targets.amenities,
        );

        setCounters({
          plotSize: Math.floor(current.plotSize),
          price: Math.floor(current.price),
          amenities: Math.floor(current.amenities),
        });

        if (
          current.plotSize >= targets.plotSize &&
          current.price >= targets.price &&
          current.amenities >= targets.amenities
        ) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    const counterSection = document.getElementById("counters-section");
    if (counterSection) {
      observer.observe(counterSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleAfterSubmit = () => {
    console.log("Form submitted successfully, type:", formType);

    if (formType === "brochure") {
      try {
        console.log("Initiating brochure download");

        setTimeout(() => {
          const link = document.createElement("a");
          link.href = "https://shorturl.at/Dv00M";
          link.target = "_blank";
          link.download = "brochure.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Download link clicked");
        }, 300);
      } catch (error) {
        console.error("Error downloading brochure:", error);
        window.open("https://shorturl.at/Dv00M", "_blank");
      }
    }
  };

  const locationFeatures = [
    {
      icon: FaRoad,
      title: "Location Strength",
      description:
        "Inside Dholera SIR, well-connected to the expressway, airport, and Dholera Metro City.",
    },
    {
      icon: FaChartLine,
      title: "Future Value Growth",
      description:
        "Investing at the development stage of Dholera Smart City ensures strong appreciation.",
    },
    {
      icon: FaShieldAlt,
      title: "Safe Purchase",
      description:
        "Every plot is NA/NOC approved, with clear titles and registry-ready documents.",
    },
    {
      icon: FaHome,
      title: "Planned Township",
      description:
        "Gated campus, internal roads, electrification, drainage, and green zones.",
    },
    {
      icon: FaIndustry,
      title: "Flexible Options",
      description:
        "Various plot sizes and payment flexibility make it suitable for both investors and end-users.",
    },
    {
      icon: FaArrowCircleUp,
      title: "High Appreciation Potential",
      description: "Positioned for long-term gains.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23deae3c' fill-opacity='0.3'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#debe6b]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#debe6b]/10 rounded-full blur-3xl"></div>

      <div className="text-center">
        <h1 className="text-2xl md:text-3xl py-4 pt-4 font-bold text-gray-900">
          Marina Bay
        </h1>
      </div>
      <div className="relative md:flex md:items-stretch md:space-x-8 max-w-7xl mx-auto px-4 py-4">
        {/* Left Section - Header */}
        <div className="text-center mb-8 md:w-1/2">
          <div className="h-full flex flex-col">
            <p className="text-base text-gray-600 text-justify max-w-4xl mx-auto leading-relaxed mb-4">
              Marina Bay is a modern plotting project situated in Village Gamph,
              Tehsil Dholera, District Ahmedabad, inside Dholera Smart City
              (Dholera SIR). With its strategic location near the
              Ahmedabad-Dholera Expressway and the proposed Dholera
              International Airport, the project offers secure residential plots
              with approvals and modern facilities as part of India’s Greenfield
              Smart City.
            </p>

            <div className="flex-grow flex items-center">
              <Image
                src={wc} // <-- replace with your paradise image variable
                alt="Marina Bay Project"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Location Features */}
        <div className="md:w-1/2">
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-3xl shadow-xl border border-gray-100/50 h-full transform hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="mb-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Strategic Location Advantage
              </h2>
              <p className="text-[#debe6b] font-medium text-sm md:text-base">
                Village Gamph, Dholera
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 flex-grow">
              {locationFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-3 md:p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/50 hover:border-[#debe6b]/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#f8f5e6] to-[#fefcf0] rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#debe6b]" />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 text-xs md:text-sm leading-tight mb-1 md:mb-2">
                      {feature.title}
                    </p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quote + CTA */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <p className="text-sm md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed border-l-4 border-[#debe6b] pl-3 md:pl-4 italic">
          "An ideal Dholera investment opportunity in Dholera Smart City with legal
          security, modern infrastructure, and strong growth potential."
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="https://wa.me/919958993549" className="flex-1">
            <span className="w-full bg-white border-2 border-[#debe6b] text-[#debe6b] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-[#f8f5e6] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm md:text-base">
              <FaWhatsapp className="w-5 h-5" />
              Book Site Visit
            </span>
          </a>
        </div>
      </div>

      {/*       <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <BrochureDownload
                onClose={closeBrochureForm}
                title="Get the Maple Brochure"
                headline="Premium plots at 0 km from Dholera SIR with 5x ROI potential"
                buttonName="Download Brochure"
                onAfterSubmit={handleAfterSubmit}
              />
            </div>
          </div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default WestWynAboutSection;
