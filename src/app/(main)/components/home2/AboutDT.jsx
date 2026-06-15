import React from "react";
import img from "@/assets/hero/westwyn-estates-dholera-homepage.webp";
import img2 from "@/assets/hero/westwyn-residency-dholera-homepage.webp";
import Image from "next/image";
import Link from "next/link";
import Magnet from "./Magnet";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const PROJECTS = [
  {
    image: img2,
    name: "WestWyn Residency",
    subtext: "Registry-Ready Plots From ₹8 Lakh*",
    tag: "Premium Plots",
    href: "/dholera-residential-plots/westwyn-residency",
    description:
      "WestWyn Residency is a gated plotting society in Pipariya, Dholera, offering residential plots with immediate possession and long-term growth potential.It is designed for buyers seeking a well-connected location, and a promising residential opportunity in Dholera’s emerging growth areas.",
    points: [
      "Starting from ₹8 lakh",
      "Prime Location: 5 Minutes from SIR boundary, 30 Minutes from Dholera International Airport",
      "Documentation: NA/NOC/Title clear plots, Registry-ready",
      "Premium Amenities: Project Boundary, Gated Community, App-Based Management, EV Charging Station, 24/7 Security & CCTV",
    ],
  },
  {
    image: img,
    name: "WestWyn Estates",
    subtext: "State Highway Plots in Dholera Starting from ₹10 Lakh*",
    tag: "Plotted Residential",
    href: "/dholera-residential-plots/westwyn-estate",
    description:
      "Located in Polarpur, Dholera, WestWyn Estates is a premium residential plotting project with larger plot options, strong location appeal, and excellent connectivity via State Highway-117, Bhimnath Railway Station, the Dholera SIR boundary, and the expressway corridor.",
    points: [
      "Starting from ₹10 lakh",
      "Prime Location: 5 Minutes from Bhimnath Railway Junction, 30 Minutes from TATA Semiconductor Plant",
      "Documentation: NA/NOC/Title clear plots, Registry-ready",
      "Amenities: Project Boundary, Gated Community, 24/7 Security & CCTV, EV Charging Station",
    ],
  },
];

export default function AboutDT() {


  return (
    <>
      <div className="bg-gray-50 py-8 px-4">
        <div className="">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[28px] font-bold text-center text-[#151f28] mb-6 leading-tight">
             Government-Approved Residential Plots in Dholera
            </h2>
            <p className="text-center text-[#151f28] text-semibold">
              Dholera Times brings you Premium Residential Plots opportunities
              Near Dholera SIR WestWyn Residency in Pipariya and WestWyn Estates
              in Polarpur offering well-located, registry-ready plots with
              long-term growth potential.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-[clamp(1.25rem,3vw,2rem)] mb-[clamp(2.5rem,5vw,4rem)] max-w-7xl mx-auto pt-4">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[5/4] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-[clamp(1rem,2vw,1.5rem)]">
                  <h3 className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-[#151f28] mb-1">
                    {project.name}
                  </h3>
                  <p className="text-[clamp(1rem,2vw,1.125rem)] font-semibold text-[#d3b36b] mb-3">
                    {project.subtext}
                  </p>
                  <p className="text-[clamp(0.7rem,1.5vw,1rem)] text-[#151f28] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <ul className="space-y-1 mb-3">
                    {project.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-[clamp(0.7rem,1.5vw,1.125rem)] text-[#151f28] leading-snug"
                      >
                        <FaCheckCircle className="text-[#d3b36b] mt-[2px] flex-shrink-0 text-[clamp(0.5rem,1.5vw,1rem)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={project.href}
                    className="inline-flex items-center gap-2 text-[clamp(0.75rem,1vw,0.825rem)] font-semibold text-[#d3b36b] border border-[#d3b36b] px-4 py-2 rounded-full hover:bg-[#d3b36b] hover:text-white transition-colors duration-200"
                  >
                    View Project Details <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Magnet />
      </div>
    </>
  );
}
