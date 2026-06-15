"use client"
import React, { useState, useEffect, useRef } from "react";

const locations = [
  {
    name: "City Center Projects Allowed on Road Below 25m",
    text: `Restaurants, Food Plazas and 
Food Streets; Neighbourhood 
Retail Shop; Community Hall; 
Health Club; Dispensary; Place 
of Worship smaller than 
1000sqm`},
  {
    name: "City Center Projects Allowed on Road 25m to Below 55m",
    text: `Multi‐level Parking; Office 
Complex, Retail Mall, Cinema 
Hall; Commercial Complex, 
Restaurants, Food Plazas and 
Food Streets; Other Retail; 
Public/ Govt Institutional 
Buildings, Training Centre; Art 
Gallery; Diagnostic/Radiology 
Centre; Hospital C and D; 
Health/Welfare Centre; Place 
of Worship larger than 
1000sqm; Public 
Facility/Infrastructure/ 
Utility Buildings; 
Petrol/CNG/LPG Pump `
  },
  {
    name: "City Center Projects Allowed on Road 55m and Above",
    text: `Convention and Exhibition 
Centre; Sports Complex; 
Auditorium; 
Integrated Multimodal 
Passenger Transport Hub; 
Dormitories; 
Museum; Super specialty 
Hospital 
Residential Multi‐storey 
Apartments; Serviced 
Apartments, Petrol/CNG/LPG 
Pump and all uses given above`
  }
];

export default function Table() {
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [heights, setHeights] = useState({});
  const contentRefs = useRef(locations.map(() => React.createRef()));

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setViewMode("list");
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

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
    setExpandedLocation(expandedLocation === index ? null : index);
  };

  // helper to format text into bullet list
  const renderText = (text) => {
    return (
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {text.split(";").map((item, i) => (
          <li key={i}>{item.trim()}</li>
        ))}
      </ul>
    );
  };

  // List view for mobile
  const renderListView = () => (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      {locations.map((location, index) => (
        <div key={index} className="border-b last:border-b-0 border-gray-300">
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-300"
            onClick={() => toggleLocation(index)}
          >
            <h2 className="text-2xl max-sm:text-lg  text-gray-900">{location.name}</h2>
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                expandedLocation === index ? "bg-[#d3b36b] text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-500 ${
                  expandedLocation === index ? "rotate-180" : ""
                }`}
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
              maxHeight: expandedLocation === index ? `${heights[index]}px` : "0px",
              opacity: expandedLocation === index ? 1 : 0,
            }}
          >
            <div ref={contentRefs.current[index]} className="p-4 bg-gray-50">
              {renderText(location.text)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Grid view for desktop
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 pt-4">
      {locations.map((location, index) => (
        <div
          key={index}
          className="bg-white  rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl text-center  text-black">
              {location.name}
            </h2>
          </div>
          <div className="p-4 text-black">
            {renderText(location.text)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className=" bg-gradient-to-b from-blue-50 to-gray-100 py-4 px-4 sm:px-6 lg:px-8 space-y-4"
    >
      <div className="w-full max-w-7xl mx-auto space-y-3 max-md:flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-2xl mb-4">Development Control Regulations for City Center Zone (as per Minimum Road Row)</p>
        <p className="text-center text-sm mb-8 animate-fadeIn">
          All details are verified from the official website of Dholera by the Government of Gujarat.
        </p>

        {!isMobile && (
          <div className="flex justify-center mb-6 animate-fadeIn">
            <div className="inline-flex rounded-md shadow-2xl" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-[#d3b36b] text-white border-[#d3b36b]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("grid")}
              >
                Grid View
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-[#d3b36b] text-white border-[#d3b36b]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("list")}
              >
                List View
              </button>
            </div>
          </div>
        )}

        <div className="animate-fadeIn">
          {isMobile || viewMode === "list" ? renderListView() : renderGridView()}
        </div>
      </div>

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
    </div>
  );
}
