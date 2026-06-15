"use client";
import React, { useState, useEffect } from "react";
import westwyn from "@/assets/residential/sold-out/westwyn-county-dholera-times-desktop.webp";


import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaRoad,
  FaPlane,
  FaCity,
  FaIndustry,
  FaClock,
  FaPlaceOfWorship
} from "react-icons/fa";
import Image from "next/image";

const WestWynAboutSection = () => {
  const [counters, setCounters] = useState({
    plotSize: 0,
    price: 0,
    amenities: 0,
  });

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formHeadline, setFormHeadline] = useState("");
  const [buttonName, setButtonName] = useState("");
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
      text: "On Fedra-Pipli State Highway (100 ft road)",
      highlight: "First project on Fedra-Pipli Highway",
    },
    {
      icon: FaPlaceOfWorship,
      text: "5 minutes from Kamiyala Temple",
      highlight: "Temple Nearby",
    },
    {
      icon: FaClock,
      text: "10 minutes from Ahmedabad–Dholera Expressway",
      highlight: "Excellent connectivity",
    },
    {
      icon: FaMapMarkerAlt,
      text: "15 minutes from Dholera International Airport",
      highlight: "Prime strategic location",
    },
    {
      icon: FaIndustry,
      text: "Surrounded by industrial hubs and commercial projects",
      highlight: "Industrial corridor advantage",
    },
    {
      icon: FaCity,
      text: "Located near residential zones and commercial projects",
      highlight: "High potential for appreciation",
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
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3b36b]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d3b36b]/10 rounded-full blur-3xl"></div>

      <div className="text-center">
        <h1 className="text-2xl md:text-3xl py-4 pt-4 font-bold text-gray-900">
          WestWyn County -{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d3b36b] to-[#c9992a]">
            Secure & Government-Approved Plots in Dholera
          </span>
        </h1>
      </div>
      <div className="relative md:flex md:items-stretch md:space-x-8 max-w-7xl mx-auto px-4 py-4">
        {/* Left Section - Header */}
        <div className="text-center mb-8 md:w-1/2">
          <div className="h-full flex flex-col">
            <p className="text-base text-gray-600 text-justify max-w-4xl mx-auto leading-relaxed mb-4">
              WestWyn County offers clear-title, government-approved plots in
              the rapidly developing Dholera SIR. With registry-ready
              documentation, flexible payment plans, and complete legal
              transparency, it ensures a hassle-free investment experience
              Located within the government-backed Dholera Smart City, the
              project is ideal for both domestic and NRI investors seeking safe,
              future-ready property opportunities Secure. Transparent.
              Future-Ready – WestWyn County is where smart investments begin.
            </p>
            <div className="flex-grow flex items-center">
              <Image
                src={westwyn}
                alt="WestWyn County Location Map - Dholera Times"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Location Features */}
        <div className="md:w-1/2">
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-3xl shadow-xl border border-gray-100/50 h-full transform hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="mb-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Strategic Location Advantage
                </h2>
                <p className="text-[#d3b36b] font-medium text-sm md:text-base">
                  Fedra-Pipli Highway
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 flex-grow">
              {locationFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-3 md:p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/50 hover:border-[#d3b36b]/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#f8f5e6] to-[#fefcf0] rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#d3b36b]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs md:text-sm leading-tight mb-1 md:mb-2">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*       <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
            <div className="w-full max-w-md">
              <BrochureDownload
                onClose={closeBrochureForm}
                title="Get the WestWyn County Brochure"
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
