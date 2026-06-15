"use client";
import React, { useState } from "react";
import {
  Factory,
  Truck,
  Wrench,
  Building2,
  Zap,
  Navigation,
  Plug,
  TrendingUp,
  Maximize2,
  Globe,
} from "lucide-react";

const BRAND_GOLD = "#d3b36b";

const projects = [
  {
    id: "connectivity",
    icon: Navigation,
    gold: true,
    title: "Strategic Connectivity",
    description:
      "Excellent access to highways, ports, airport connectivity, and freight corridors.",
  },
  {
    id: "infrastructure",
    icon: Plug,
    gold: false,
    title: "Plug-and-Play Infrastructure",
    description:
      "Pre-planned industrial infrastructure with roads, utilities, and essential services in place.",
  },
  {
    id: "roi",
    icon: TrendingUp,
    gold: true,
    title: "High ROI & Incentives",
    description:
      "Strong growth potential supported by policy-driven industrial development.",
  },

  {
    id: "scalable",
    icon: Maximize2,
    gold: false,
    title: "Scalable Land Parcels",
    description:
      "Flexible land sizes suitable for small units to large industrial projects.",
  },

  {
    id: "utilities",
    icon: Zap,
    gold: true,
    title: "Utilities & Support Services",
    description:
      "Power stations, water systems, waste management, and essential industrial services.",
  },
];

const benefits = [
  {
    id: "manufacturing",
    icon: Factory,
    gold: true,
    title: "Manufacturing & Heavy Industries",
    description:
      "Large-scale production units, processing plants, and heavy industrial operations.",
  },
  {
    id: "warehousing",
    icon: Truck,
    gold: false,
    title: "Warehousing & Logistics",
    description:
      "Storage facilities, distribution hubs, and supply chain infrastructure.",
  },
  {
    id: "light",
    icon: Wrench,
    gold: true,
    title: "Light & Medium Industries",
    description: "Small to mid-scale manufacturing and assembly units.",
  },

  {
    id: "institutional",
    icon: Building2,
    gold: false,
    title: "Institutional & Ancillary Facilities",
    description:
      "Training centers, administrative offices, and support institutions for industries.",
  },

  {
    id: "global",
    icon: Globe,
    gold: true,
    title: "Global Investment Magnet",
    description:
      "Designed to attract domestic and international manufacturing investments.",
  },
];

function FlipCard({ item, isFlipped, onFlip }) {
  const Icon = item.icon;

  return (
    <div
      className="relative cursor-pointer h-52"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Icon
            className="w-14 h-14 shrink-0"
            style={{ color: item.gold ? BRAND_GOLD : "#1f2937" }}
          />
          <p className="text-sm font-semibold text-gray-800 leading-snug">
            {item.title}
          </p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 rounded-xl border text-center transition-colors
            ${
              item.gold
                ? "bg-amber-50 border-amber-200 hover:bg-amber-100"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: item.gold ? BRAND_GOLD : "#9ca3af" }}
          />
          <p className="text-sm text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title, subTitle }) {
  return (
    <div className="text-center mb-10">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: BRAND_GOLD }}
      >
        {label}
      </p>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <div
        className="w-14 h-0.5 mx-auto mt-4 rounded-full"
        style={{ backgroundColor: BRAND_GOLD }}
      />
      <p className="text-sm mt-4">{subTitle}</p>
    </div>
  );
}

export default function IndustrialZoneCards() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBenefit, setActiveBenefit] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Section 1 */}
      <section>
        <SectionHeader
          label="Zoning Overview"
          title="What's Allowed in Industrial Zones?"
          subTitle="Industrial zones in Dholera are planned for factories, warehouses, logistics, and support services. These zones are suitable for industrial bulk land, manufacturing, storage, and long-term expansion."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {projects.map((project) => (
            <FlipCard
              key={project.id}
              item={project}
              isFlipped={activeProject === project.id}
              onFlip={() =>
                setActiveProject(
                  activeProject === project.id ? null : project.id,
                )
              }
            />
          ))}
        </div>
      </section>

      {/* Section 2 */}
      <section>
        <SectionHeader
          label="Dholera Investment Benefits"
          title="Why Invest in Dholera Industrial Zones?"
          subTitle="Dholera industrial zones are gaining interest due to planned infrastructure and industrial growth. For long-term buyers, industrial bulk land offers better planning, larger land options, and location clarity."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit) => (
            <FlipCard
              key={benefit.id}
              item={benefit}
              isFlipped={activeBenefit === benefit.id}
              onFlip={() =>
                setActiveBenefit(
                  activeBenefit === benefit.id ? null : benefit.id,
                )
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
