"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  BedDouble,
  Building2,
  Hospital,
  Home,
  Eye,
  Plug,
  Layers,
  Users,
  Landmark,
} from "lucide-react";

const BRAND_GOLD = "#d3b36b";

const projects = [
  {
    id: "retail",
    icon: ShoppingCart,
    gold: true,
    title: "Retail & Shopping Complexes",
    description:
      "Commercial outlets, malls, and retail spaces designed to serve high-traffic areas.",
  },
  {
    id: "hospitality",
    icon: BedDouble,
    gold: false,
    title: "Hospitality & Accommodation",
    description:
      "Hotels, business stays, and serviced apartments benefiting from prime connectivity.",
  },
  {
    id: "corporate",
    icon: Building2,
    gold: true,
    title: "Corporate & Commercial Offices",
    description:
      "Office spaces and business hubs located along major access routes.",
  },
  {
    id: "healthcare",
    icon: Hospital,
    gold: false,
    title: "Healthcare & Wellness Facilities",
    description:
      "Hospitals, clinics, and wellness centers in easily accessible locations.",
  },
  {
    id: "residential",
    icon: Home,
    gold: true,
    title: "Residential & Mixed-Use Housing",
    description:
      "Integrated developments combining residential units with commercial spaces.",
  },
];

const benefits = [
  {
    id: "visibility",
    icon: Eye,
    gold: true,
    title: "Prime Visibility & Frontage",
    description:
      "Strategic roadside exposure ensures maximum visibility and branding advantage.",
  },
  {
    id: "infrastructure",
    icon: Plug,
    gold: false,
    title: "Plug & Play Infrastructure",
    description:
      "Well-planned roads, utilities, and smart city infrastructure are already in place.",
  },
  {
    id: "versatile",
    icon: Layers,
    gold: true,
    title: "Versatile Development Options",
    description:
      "Suitable for commercial, residential, hospitality, or mixed-use projects.",
  },
  {
    id: "footfall",
    icon: Users,
    gold: false,
    title: "High Footfall Potential",
    description:
      "Located along major corridors that attract strong movement and business activity.",
  },
  {
    id: "government",
    icon: Landmark,
    gold: true,
    title: "Government Incentives & Flexibility",
    description:
      "Supported by planned development policies encouraging growth and investment.",
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
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
            ${item.gold
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

export default function HighAccessCorridorCards() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBenefit, setActiveBenefit] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

      {/* Section 1 */}
      <section>
        <SectionHeader
          label="Zoning Overview"
          title="What's Allowed in High Access Corridor Zones?"
          subTitle="High Access Corridor zones support retail, hotels, offices, healthcare, and mixed-use projects with better road access and visibility."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {projects.map((project) => (
            <FlipCard
              key={project.id}
              item={project}
              isFlipped={activeProject === project.id}
              onFlip={() =>
                setActiveProject(
                  activeProject === project.id ? null : project.id
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
          title="Why Invest in Dholera High Access Corridor Zone?"
          subTitle="Dholera High Access Corridor offers better access, visibility, and flexible land use for future commercial or mixed-use planning."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit) => (
            <FlipCard
              key={benefit.id}
              item={benefit}
              isFlipped={activeBenefit === benefit.id}
              onFlip={() =>
                setActiveBenefit(
                  activeBenefit === benefit.id ? null : benefit.id
                )
              }
            />
          ))}
        </div>
      </section>

    </div>
  );
}