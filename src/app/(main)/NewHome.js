"use client";
import React, { useEffect, useState } from "react";

import HOME2 from "./components/home/carosuel";
import FAQSection from "./components/Faq";
import Dholeravideos from "./components/home/Dholeravideos";
import BrowsePropertiesSection from "./components/home/Projects";
import Location from "./components/home/Location";
import About from "./components/home/About";
import WhyUs from "./components/home/WhyUs";
import Imagegallery from "./components/home/Imagegallery";
import BrowseUpdates from "./components/home/BrowseUpdates";
import TestimonialPagination from "./components/Testimonials";
import { AnimatePresence } from "framer-motion";
import BrochureForm from "./components/BrochureForm";
import MegaIndustries from "./components/home/MegaIndusties";
import Notifications from "./components/Notifications";
import AbtDT from "./components/home2/abtDT";

export default function NewHome({openForm}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Check localStorage to see if popup was already shown
      const popupShown = localStorage.getItem('popupShown');
      
      if (!popupShown) {
        const timer = setTimeout(() => {
          openForm();
          localStorage.setItem('popupShown', 'true');
        }, 2000); // 5 seconds

        const handleScroll = () => {
          if (window.scrollY > window.innerHeight * 0.05) {
            openForm();
            localStorage.setItem('popupShown', 'true');
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
          }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
          clearTimeout(timer);
        };
      }
    }
  }, [openForm]);


  const downloadBrochure = () => {
    
    const brochureUrl = "https://shorturl.at/t7uyU";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "Dholera-Smart-City-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };


  return (
    <>
      {/* Carosuel */}
       <link rel="canonical" href="https://www.dholeratimes.com/" />
             <meta name="robots" content="index, follow"/>

      <div>
        <HOME2 />
      </div>
      <div className="pt-8 pb-8 text-2xl md:text-5xl font-semibold  text-center">
        <p>
          {" "}
          Welcome to Dholera Smart City
          <br /> India’s First Greenfield Smart Megacity{" "}
        </p>
      </div>
      <div>
        <FAQSection />
      </div>
      <div>
        <Dholeravideos />
      </div>
      <div>
        <AbtDT/>
      </div>
      <div>
        <section id="investment-benefits" className=" py-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Investment Returns Section */}
  

            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg p-8 animate-on-scroll">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 animate-on-scroll from-left">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 font-poppins mb-4">
                    Investment Returns
                  </h3>
                  <div className="w-20 h-1 bg-[#d7b36c] mb-6"></div>
                  <p className="text-lg md:text-xl text-gray-700 font-poppins mb-6">
                    Be a part of Dholera's growth story! With the region set to
                    become a hub for industries like aviation, electronics, and
                    renewable energy, your investment in Emerald City promises
                    not just a home but a future full of possibilities.
                  </p>
                  <div className="flex flex-col md:text-xl sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        if (isFormSubmitted) {
                          downloadBrochure();
                        } else {
                          openBrochureForm();
                        }
                      }}
                      className={`inline-flex items-center px-6 py-3 ${
                        isFormSubmitted
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-[#d7b36c] hover:bg-[#c2a05e]"
                      } text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 font-poppins shadow-md animate-float`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            isFormSubmitted
                              ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              : "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          }
                        />
                      </svg>
                      {isFormSubmitted ? "Download Brochure" : "Get Brochure"}
                    </button>
                  </div>
                </div>
                <Notifications/>
                <div className="md:w-1/2 animate-on-scroll from-right">
                  <div className="bg-white rounded-lg p-8 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-semibold text-gray-800">
                        ROI Projection
                      </div>
                      <div className="text-[#d7b36c] font-bold text-3xl">
                        10x
                      </div>
                    </div>
                    <div className="w-full bg-[#d7b36c] rounded-full h-3 mb-4">
                      <div
                        className="bg-[#d7b36c] h-3 rounded-full transition-all duration-1000 animate-shimmer"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-8">
                      <span>Current Value</span>
                      <span>Projected by 2030</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">
                          Starting From
                        </div>
                        <div className="text-lg md:text-xl font-bold text-gray-800">
                          ₹6,700/sq.ft
                        </div>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">
                          Investment Period
                        </div>
                        <div className="text-lg md:text-xl font-bold text-gray-800">
                          5-7 Years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <BrowsePropertiesSection/>
      </div>
      <div>
          <Location/>
      </div>
      <div>
        <About/>
      </div>
      <div>
        <WhyUs/>
      </div>
      <div>
        <Imagegallery/>
      </div>
      <div>
        <MegaIndustries/>
      </div>
      <div>
        <BrowseUpdates/>
      </div>
      <div>
        <TestimonialPagination/>
      </div>
      <AnimatePresence>
        {isBrochureFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[1000]">
            <BrochureForm
              title="Get Instant Access to Our Brochure"
              buttonName="Download Now"
              onClose={closeBrochureForm}
              onSuccess={() => setIsFormSubmitted(true)}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
