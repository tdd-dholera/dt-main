"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Users,
  Shield,
  Car,
  Baby,
  Waves,
  Globe,
  Trees,
  Lightbulb,
  Activity,
  MapPin,
  Home,
  Heart,
  Zap,
  SquareDashed,
} from "lucide-react";
import { FaRoad } from "react-icons/fa";

const ProjectAmenities = () => {
  const [showAll, setShowAll] = useState(false);

  const amenities = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Club House & Co-Working Space",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gated Community",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "EV Charging Station",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Kids Play Area",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "24/7 Security & CCTV Surveillance",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Swimming Pool",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "App-based Society Management",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Trees className="w-8 h-8" />,
      title: "Lush Green Surroundings",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Baby className="w-8 h-8" />,
      title: "Indoor Games & Gymnasium",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Automated Street Light",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Jogging Track",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <FaRoad className="w-8 h-8" />,
      title: "Internal Roads",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <SquareDashed className="w-8 h-8" />,
      title: "Project Boundary",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Yoga Deck & Senior Citizen Zone",
      color: "from-[#151f28] to-[#d3b36b]",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Power & Water Supply",
      color: "from-[#151f28] to-[#d3b36b]",
    },
  ];

  const [initialItems, setInitialItems] = useState(8); // start with 8 (matches SSR)

  useEffect(() => {
    setInitialItems(window.innerWidth < 768 ? 6 : 8);
  }, []);

  const visibleAmenities = showAll
    ? amenities
    : amenities.slice(0, initialItems);

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#151f28]">
            Project <span className="text-[#d3b36b]">Essentials</span>
          </h2>
          <div className="w-20 h-1 bg-[#d3b36b] mx-auto mb-6"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#151f28] leading-relaxed">
            WestWyn County offers comprehensive amenities designed for modern
            living and secure investment
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleAmenities.map((amenity, index) => (
            <div
              key={index}
              className="group relative bg-[#1e2a36] rounded-xl p-6 border border-[#2a3a4a] hover:border-[#d3b36b] hover:rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-3xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {amenity.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#d3b36b] mb-2 group-hover:text-[#d3b36b] transition-colors duration-300">
                {amenity.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {amenity.description}
              </p>

              {/* Hover effect accent */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#d3b36b] group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {amenities.length > initialItems && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-[#b69b5e] hover:bg-[#d3b36b] text-[#151f28] font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>View All Amenities</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAmenities;
