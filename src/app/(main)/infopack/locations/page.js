"use client";
import React, { useState, useEffect, useRef } from "react";
import bg from "@/assets/bg-image.webp";
import Link from "next/link";
import { FaMapMarkerAlt, FaVideo, FaBuilding } from "react-icons/fa";

  //naviagtion tab
const FixedNavigation = ({ currentPage = "locations" }) => (
  <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-20 w-[95%] max-w-2xl">
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-200/50 px-3 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-center gap-2 md:gap-6">
        <Link
          href="/infopack/locations"
          className={`group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "locations"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gray-700 border-gray-300"
          }`}
        >
          <FaMapMarkerAlt className="text-sm md:text-lg" />
          <span className="font-semibold text-sm md:text-base">Locations</span>
        </Link>

        <Link
          href="/infopack/videos"
          className={`group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "videos"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gray-700 border-gray-300"
          }`}
        >
          <FaVideo className="text-sm md:text-lg" />
          <span className="font-semibold text-sm md:text-base">Videos</span>
        </Link>

        <Link
          href="/infopack/inventory"
          className={`group flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "inventory"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gray-700 border-gray-300"
          }`}
        >
          <FaBuilding className="text-sm md:text-lg" />
          <span className="font-semibold text-xs md:text-base whitespace-nowrap">
            Available Plots
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const locations = [
 {
    name: "WestWyn Residency",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4395.496159798104!2d71.98350837596773!3d22.22599997974006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f2d000a9dce15%3A0x11321e23c1c9298c!2sWestWyn%20Residency!5e1!3m2!1sen!2sin!4v1775131856118!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/RtiA6KcF5cr94jEG6",
  },
  {
    name: "WestWyn Estates",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4395.187065104911!2d71.91267047596803!3d22.23585807973304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f33007987615f%3A0x28c9c473efaffc7c!2sWestWyn%20Estates!5e1!3m2!1sen!2sin!4v1775131748459!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/ZcfH7r7QVi8F2n3F7",
  },
  {
    name: "WestWyn County",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4580.5316429671975!2d72.17771279999998!3d22.448890000000105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ed900459779db%3A0xe211952def5d9bab!2sWestWyn%20County!5e1!3m2!1sen!2sin!4v1753684185448!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/DM97JCjuQotau73j7",
  },
  {
    name: "Dholera International Airport",
    coordinates: "22°31'50.2\"N 72°02'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4420.349690016662!2d72.30066889999551!3d22.35245658219883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f210061a11ded%3A0xd9b68d7064988291!2sYashnand%20Engineers%20and%20Contractors%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1744287663714!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/zmuKb7sAwUt1cimp9",
  },
  {
    name: "TATA Semiconductor",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4424.265940861396!2d72.1980051!3d22.2286835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f25005f33eaa3%3A0x15756b95b1ebde4a!2sTata%20Electronics%20Private%20Limited!5e1!3m2!1sen!2sin!4v1744287710047!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/j7QTwgdeFNBF4Fer9",
  },
  {
    name: "ReNew Solar Plant",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10523.298366847725!2d72.2001527342238!3d22.221203952366253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f252fd5610c47%3A0x40c757ece7a9838f!2sReNew%20Solar%20Cell!5e1!3m2!1sen!2sin!4v1744287385226!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/UajRzCGCj1cNbW9T8",
  },
  {
    name: "Maritime Park",
    coordinates: "22°41'50.2\"N 72°21'18.8\"E",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4424.504206549407!2d72.19462990000001!3d22.221132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f25ad3a2d92bd%3A0x5ebb4b680f8bdeb7!2sMaritime%20Park%20Dholera!5e1!3m2!1sen!2sin!4v1744287754083!5m2!1sen!2sin",
    link: "https://maps.app.goo.gl/ZN7qNLW7rAy7ArZU7",
  },
];

export default function LocationsComponent() {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [heights, setHeights] = useState({});
  const contentRefs = useRef(locations.map(() => React.createRef()));

  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("list");
      }
    };

    // Set initial value
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Calculate heights for smooth animations
  useEffect(() => {
    const newHeights = {};
    contentRefs.current.forEach((ref, index) => {
      if (ref.current) {
        newHeights[index] = ref.current.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [expandedLocation]);

  const toggleLocation = (index) => {
    if (expandedLocation === index) {
      setExpandedLocation(null);
    } else {
      setExpandedLocation(index);
    }
  };



  // List view for mobile
  const renderListView = () => {
    return (
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        {locations.map((location, index) => (
          <div key={index} className="border-b last:border-b-0 border-gray-300">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-300"
              onClick={() => toggleLocation(index)}
            >
              <h2 className="text-2xl font-semibold text-gray-900 transition-colors duration-300">
                {location.name}
              </h2>
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                  expandedLocation === index
                    ? "bg-[#d8b66d] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-500 ${expandedLocation === index ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight:
                  expandedLocation === index ? `${heights[index]}px` : "0px",
                opacity: expandedLocation === index ? 1 : 0,
              }}
            >
              <div ref={contentRefs.current[index]} className="p-4 bg-gray-50">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-4 transform transition-transform duration-500 ease-out">
                  <iframe
                    src={location.mapSrc}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={location.name}
                  />
                </div>
                <div className="flex justify-center transform transition-all duration-500 ease-out">
                  <a
                    href={location.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full text-center"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Grid view for desktop
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 pt-8 ">
        {locations.map((location, index) => (
          <div
            key={index}
            className="bg-[#151f28] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl text-center font-semibold text-[#f1cf86]">
                {location.name}
              </h2>
            </div>
            <div className="relative w-full">
              <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9]">
                <iframe
                  src={location.mapSrc}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={location.name}
                />
              </div>
            </div>
            <div className="p-4 bg-[#151f28] flex justify-center items-center">
              <a
                href={location.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-center font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-3 px-4 py-8 pt-32 sm:px-6 lg:px-8">
      <meta name="robots" content="noindex, nofollow" />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/infopack/locations"
      />
      {/*  <h1 className="md:text-5xl font-bold text-3xl text-center text-gray-500 p-4 animate-fadeIn">DHOLERA LOCATIONS</h1> */}
      <p className="text-center md:text-xl md:font-medium font-semibold mb-6 animate-fadeIn">
        Know more about nearby landmarks and our project's location on Google
        Maps
      </p>

      {/* Toggle view buttons for desktop */}
      {!isMobile && (
        <div className="flex justify-center mb-6 animate-fadeIn">
          <div className="inline-flex rounded-md shadow-2xl" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#d8b66d] text-white border-[#d8b66d]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid View
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#d8b66d] text-white border-[#d8b66d]"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              List View
            </button>
          </div>
        </div>
      )}

      {/* Add animation for the container */}
      <div className="animate-fadeIn">
        {isMobile || viewMode === "list" ? renderListView() : renderGridView()}
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      <FixedNavigation currentPage="locations"/>
    </div>
  );
}
