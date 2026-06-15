"use client";
import React, { useState } from "react";
import {
  TrendingUp,
  Plug,
  Users,
  Landmark,
  ShoppingBag,
  UtensilsCrossed,
  HeartPulse,
  GraduationCap,
  Home as HomeIcon,
} from "lucide-react";

const BRAND_GOLD = "#d3b36b";

const projects = [
  {
    id: "retail",
    icon: ShoppingBag,
    gold: true,
    title: "Retail & Commercial Services",
    description:
      "Small shops, daily convenience stores, and essential service outlets that support local residents.",
  },
  {
    id: "hospitality",
    icon: UtensilsCrossed,
    gold: false,
    title: "Hospitality & Food Services",
    description:
      "Restaurants, cafés, guest houses, and hospitality spaces serving the residential community.",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    gold: true,
    title: "Healthcare & Wellness",
    description:
      "Clinics, pharmacies, wellness centers, and healthcare facilities for everyday medical needs.",
  },
  {
    id: "education",
    icon: GraduationCap,
    gold: false,
    title: "Education & Community Facilities",
    description:
      "Schools, training institutes, community halls, and social infrastructure spaces.",
  },
  {
    id: "residential",
    icon: HomeIcon,
    gold: true,
    title: "Residential & Housing Projects",
    description:
      "Apartments, villas, plotted developments, and other housing projects for modern living.",
  },
];

const benefits = [
  {
    id: "appreciation",
    icon: TrendingUp,
    gold: true,
    title: "High Appreciation Potential",
    description:
      "Strategic location and planned infrastructure support long-term value growth.",
  },
  {
    id: "flexibility",
    icon: HomeIcon,
    gold: false,
    title: "Mixed-Use Flexibility",
    description:
      "Allows integrated development combining residential with supporting commercial activities.",
  },
  {
    id: "infrastructure",
    icon: Plug,
    gold: true,
    title: "Plug & Play Infrastructure",
    description:
      "Ready access to roads, utilities, and planned city infrastructure reduces setup time.",
  },
  {
    id: "community",
    icon: Users,
    gold: false,
    title: "Community-Centric Planning",
    description:
      "Designed to create organized neighborhoods with essential amenities nearby.",
  },
  {
    id: "government",
    icon: Landmark,
    gold: true,
    title: "Government-Backed Development",
    description:
      "Part of the Dholera Smart City initiative supported by structured planning and policy frameworks.",
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

export default function ResidentialZoneCards() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBenefit, setActiveBenefit] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

      {/* Section 1 */}
      <section>
        <SectionHeader
          label="Dholera Zoning Overview"
          title="What's Allowed in Residential Zones?"
          subTitle="Residential zones in Dholera support housing, daily services, and community needs. They are suitable for buyers planning residential bulk land, housing projects, or long-term investment"
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
          label="Investment Benefits"
          title="Why Invest in Dholera Residential Zones?"
          subTitle="Dholera residential zones are gaining interest due to planned infrastructure and future housing demand. For long-term buyers, bulk land offers better planning and location clarity."
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