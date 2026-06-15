"use client";
import React, { useEffect } from "react";
import govtApprovedProject from "@/assets/icons/verified-auda-approved.webp";
import salesDeed from "@/assets/icons/immediate-sale-deed.webp";
import afterSales from "@/assets/icons/resale-support.webp";
import buybackguarantee from "@/assets/icons/high-roi-potential.webp";
import days365 from "@/assets/icons/365-day-site-visit.webp";
import dueD from "@/assets/icons/due-diligence-team.webp";

import Image from "next/image";
import {
  Users,
  Building,
  BadgeCheck,
  AreaChart,
} from "lucide-react";
const features = [
  {
    icon: govtApprovedProject,
    title: "Verified AUDA-approved Dholera plots",
    description: "Fully government approved and verified",
  },
  {
    icon: salesDeed,
    title: "Immediate Sale-deed Registration",
    description: "Quick documentation and registration",
  },
  {
    icon: days365,
    title: "365-day Site Visit Assistance",
    description: "Comprehensive post-purchase assistance",
  },
  {
    icon: dueD,
    title: "In-house Due Diligence Team",
    description: "No hidden charges, clear pricing structure",
  },
  {
    icon: buybackguarantee,
    title: "Projects with High ROI Potential",
    description: "*Terms & Conditions Apply*",
  },
  {
    icon: afterSales,
    title: "Resale Support & Buyback Assistance*",
    description: "*Terms & Conditions Apply*",
  },
];

export default function WhyDT() {
  

  useEffect(() => {
    // Initialize animation observers when component mounts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document
      .querySelectorAll(
        ".fade-in-up, .feature-item, .project-image, .amenity-item, .investment-calculator",
      )
      .forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      // Ensure we clean up by enabling scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
     

      <div id="westwyn-county" className="westwyn-container bg-gray-50 py-8">
        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Header */}
            <div className="md:col-span-2 text-center">
              <h2 className="text-2xl md:text-[28px] font-bold text-[#151f28] mt-6 mb-6">
                Dholera Times : Trusted Developers in Dholera
              </h2>
              <p className="text-gray-600">
                Dholera Times helps buyers find residential plots in good
                locations across Dholera with registry-ready documents and full
                support from enquiry to booking.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="westwyn-feature-card feature-item flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={112}
                          height={126}
                          className="object-contain "
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-[#151f28]">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              {
                value: "7+ Projects",
                label: "Successfully Sold Out",
                icon: <Building className="h-8 w-8" />,
              },
              {
                value: "957+ Plots",
                label: "Plots Sold",
                icon: <BadgeCheck className="h-8 w-8" />,
              },
              {
                value: "561+",
                label: "Happy Clients",
                icon: <Users className="h-8 w-8" />,
              },
              {
                value: "2 Lakh+ Sq. Yd",
                label: "Dholera Land Sold",
                icon: <AreaChart className="h-8 w-8" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900 p-3 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#d8b66e]/20 flex flex-col items-center"
              >
                <div className="text-[#d8b66e] mb-3">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-semibold text-[#d8b66e] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
