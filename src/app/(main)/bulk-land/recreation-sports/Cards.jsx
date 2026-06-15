"use client";
import React, { useState } from "react";
import {
  Trophy,
  FerrisWheel,
  Theater,
  HeartPulse,
  BedDouble,
  Users,
  Plane,
  Landmark,
  Layers,
  Train,
} from "lucide-react";

const BRAND_GOLD = "#d3b36b";

const benefits = [
  {
    id: "sports",
    icon: Trophy,
    gold: true,
    title: "Sports Infrastructure",
    description:
      "Stadiums, sports complexes, training academies, and recreational activity centers.",
  },
  {
    id: "amusement",
    icon: FerrisWheel,
    gold: false,
    title: "Amusement & Theme Parks",
    description:
      "Entertainment parks and leisure attractions designed for families and visitors.",
  },
  {
    id: "cultural",
    icon: Theater,
    gold: true,
    title: "Cultural & Event Venues",
    description:
      "Auditoriums, exhibition centers, and spaces for cultural programs and large gatherings.",
  },
  {
    id: "wellness",
    icon: HeartPulse,
    gold: false,
    title: "Wellness & Lifestyle Facilities",
    description:
      "Fitness centers, wellness retreats, and lifestyle-focused recreational spaces.",
  },
  {
    id: "hospitality",
    icon: BedDouble,
    gold: true,
    title: "Hospitality & Tourism",
    description:
      "Hotels, resorts, and tourism-oriented developments supporting visitor activity.",
  },
];

const projects = [
  {
    id: "footfall",
    icon: Users,
    gold: true,
    title: "High Footfall Potential",
    description:
      "Designed to attract residents, tourists, and event-driven crowds throughout the year.",
  },
  {
    id: "tourism",
    icon: Plane,
    gold: false,
    title: "Tourism & Hospitality Growth",
    description:
      "Strong potential due to planned infrastructure and rising regional tourism demand.",
  },
  {
    id: "community",
    icon: Landmark,
    gold: true,
    title: "Community & Cultural Hub",
    description:
      "Planned as a central destination for social interaction and entertainment activities.",
  },
  {
    id: "diverse",
    icon: Layers,
    gold: false,
    title: "Diverse Development Options",
    description:
      "Suitable for sports, leisure, hospitality, and mixed entertainment projects.",
  },
  {
    id: "infrastructure",
    icon: Train,
    gold: true,
    title: "Future-Ready Infrastructure",
    description:
      "Backed by smart city planning with modern connectivity and utility support.",
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

export default function RecreationZoneCards() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBenefit, setActiveBenefit] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

      {/* Section 1 */}
      <section>
        <SectionHeader
          label="Dholera Zoning Overview"
          title="What's Allowed in Recreation, Sports & Entertainment Zone?"
          subTitle="Recreation & Sports zones are planned parks, sports facilities, leisure spaces, wellness areas, and community activities. These zones are suitable for lifestyle, public-use, and future social development planning."
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
          title="Why Invest in Dholera Recreation, Sports & Entertainment Zone?"
          subTitle="This zone is suitable for land planning around sports, wellness, leisure, and community-use spaces. It supports future recreational and social infrastructure growth in Dholera."
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