"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import westwyn from "@/assets/residential/residency/westwyn-residency-dholera-times-map-location.webp";

import {
  FaRoad,
  FaTrain,
  FaRoute,
  FaIndustry,
  FaPlaneDeparture,
  FaWhatsapp,
  FaHospital,
  FaBus,
  FaMapMarkedAlt,
  FaPhone,
} from "react-icons/fa";
import { Fence } from "lucide-react";

const FeatureCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
      <span className="text-xl">{icon}</span>
    </div>
    <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
    <p className="text-[#151f28] font-bold text-lg">{value}</p>
  </div>
);

const WestWynAboutSection = () => {
  const [counters, setCounters] = useState({
    plotSize: 0,
    price: 0,
    amenities: 0,
  });

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

  const locationFeatures = [
    {
      icon: FaRoad,
      text: "Direct Entry from Major District Road (MDR)",
      highlight: "Excellent road connectivity",
    },
    {
      icon: FaMapMarkedAlt, // optional if you want a location icon
      text: "Located in Pipariya, Dholera",
      highlight: "Prime location in Dholera region",
    },
    {
      icon: FaTrain,
      text: "2 Minutes from Railway Connectivity",
      highlight: "Easy rail access",
    },
    {
      icon: Fence,
      text: "5 Minutes from Dholera SIR Boundary",
      highlight: "Close to key industrial hub",
    },
    {
      icon: FaRoute,
      text: "12 Minutes from Ahmedabad–Dholera Expressway",
      highlight: "Fast access to major corridor",
    },
    {
      icon: FaHospital,
      text: "17 Minutes from RMS Multi-Specialty Hospital",
      highlight: "Fast access to major corridor",
    },
    {
      icon: FaIndustry,
      text: "22 Minutes from Tata Semiconductor Plant & Industrial Zones",
      highlight: "Industrial growth corridor",
    },
    {
      icon: FaPlaneDeparture,
      text: "30 Minutes from Dholera International Airport",
      highlight: "Global connectivity",
    },
  ];

  const projectFeatures = [
    { icon: "📐", title: "Plot Size", value: "124,152, & 187 Sq.Yards" },
    { icon: "🏗️", title: "Project Type", value: "Residential Dholera Plots" },
    { icon: "💰", title: "Price", value: "₹6,500/Sq.Yd" },
    { icon: "📍", title: "Location", value: "Pipariya, Dholera" },
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
        <h2 className="text-2xl md:text-3xl pt-8 font-bold text-gray-900">
          WestWyn Residency -{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d3b36b] to-[#c9992a]">
            Government Approved Plots in Dholera
          </span>
        </h2>
      </div>
      <div className="relative md:flex md:space-x-8 max-w-7xl mx-auto px-4 py-4">
        {/* Left Section - Header */}
        <div className="text-center mb-8 md:w-1/2">
          <div className="h-full flex flex-col">
            <p className="text-base text-gray-600 text-left max-w-4xl mx-auto leading-relaxed mb-4">
              Looking for a secure and future-ready investment? WestWyn
              Residency offers government approved plots in Dholera starting ₹8
              lakh, designed for buyers who value location, connectivity, and
              long-term growth. Located in Pipariya, one of the most Developed
              zones in Dholera. Further, this premium residential plotted
              development by Dholera Times provides a perfect opportunity to
              invest in Dholera plots with clarity, transparency, and immediate
              registry. With rising demand for plots in Dholera, WestWyn
              Residency stands out as a practical and well-planned investment
              choice.
            </p>
            <div className="flex-grow flex items-center">
              <Image
                src={westwyn}
                alt="WestWyn Residency Location Map - Dholera Times"
                className="rounded-xl w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Location Features */}
        <div className="md:w-1/2">
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-4 rounded-3xl shadow-xl border border-gray-100/50 h-full transform hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="mb-6">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Prime Location
                </h3>
                
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 flex-grow">
              {locationFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-3 md:p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/50 hover:border-[#d3b36b]/30 hover:shadow-lg transition-all duration-300 group"
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

      <div className="max-w-7xl mx-auto px-4 md:pt-4 pb-8 bg-gray-200 p-4 rounded-xl">
        <p className="text-base md:text-xl font-semibold text-gray-900 mb-6 md:mb-8 leading-relaxed text-center pl-3 md:pl-4">
          Get Complete Details of WestWyn Residency
        </p>

        <div className="flex sm:flex-row gap-4 max-w-3xl mx-auto">
          <a href="https://wa.me/919958993549" className="flex-1">
            <span className="w-full bg-[#d3b36b] border-2 border-[#d3b36b] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-[#f8f5e6] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm md:text-base">
              <FaWhatsapp className="w-5 h-5" />
              Enquire Now
            </span>
          </a>
          <a href="tel:+919958993549" className="flex-1">
            <span className="w-full bg-white border-2 border-[#d3b36b] text-[#d3b36b] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-[#f8f5e6] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm md:text-base">
              <FaPhone className="w-5 h-5 rotate-90" />
              Call Now
            </span>
          </a>
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
  );
};

export default WestWynAboutSection;
