"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Clapperboard,
  Building2,
  Landmark,
  Building,
  MapPin,
  Users,
  Star,
  Layers,
  Train,
} from "lucide-react";

const BRAND_GOLD = "#d3b36b";

const benefits = [
  {
    id: "retail",
    icon: ShoppingBag,
    gold: true,
    title: "Retail & Shopping Districts",
    description:
      "Malls, high-street retail, and commercial outlets serving the city's core population.",
  },
  {
    id: "hospitality",
    icon: Clapperboard,
    gold: false,
    title: "Hospitality & Entertainment",
    description:
      "Hotels, cinemas, restaurants, and entertainment venues in prime central areas.",
  },
  {
    id: "corporate",
    icon: Building2,
    gold: true,
    title: "Corporate & Administrative Offices",
    description:
      "Office spaces for businesses, institutions, and government establishments.",
  },
  {
    id: "cultural",
    icon: Landmark,
    gold: false,
    title: "Cultural & Civic Spaces",
    description:
      "Public plazas, event venues, and civic infrastructure for community engagement.",
  },
  {
    id: "residential",
    icon: Building,
    gold: true,
    title: "Residential & Mixed-Use Living",
    description:
      "Integrated developments combining housing with commercial and lifestyle spaces.",
  },
];

const projects = [
  {
    id: "location",
    icon: MapPin,
    gold: true,
    title: "Prime Central Location",
    description:
      "Situated at the heart of Dholera Smart City with strategic importance.",
  },
  {
    id: "footfall",
    icon: Users,
    gold: false,
    title: "High Footfall & Business Potential",
    description:
      "Central positioning ensures strong movement and commercial activity.",
  },
  {
    id: "prestige",
    icon: Star,
    gold: true,
    title: "Prestige & Landmark Value",
    description:
      "City centre developments often become iconic and high-value assets.",
  },
  {
    id: "versatility",
    icon: Layers,
    gold: false,
    title: "Versatility of Development",
    description:
      "Suitable for retail, corporate, hospitality, residential, or mixed-use projects.",
  },
  {
    id: "connectivity",
    icon: Train,
    gold: true,
    title: "Seamless Connectivity",
    description:
      "Well-connected through planned roads and smart infrastructure networks.",
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

export default function CityCentreZoneCards() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBenefit, setActiveBenefit] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

      {/* Section 1 */}
      <section>
        <SectionHeader
          label="Dholera Zoning Overview"
          title="What's Allowed in City Centre Zones?"
          subTitle="City Centre zones in Dholera are planned for retail, hotels, offices, civic spaces, and mixed-use development. These zones are suitable for buyers looking for central land with strong visibility and business use. "
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
          title="Why Invest in Dholera City Centre Zone?"
          subTitle="Dholera City Centre offers better visibility, footfall, and flexible use for commercial and mixed-use development .It supports future planning for shopping, hospitality, offices, civic spaces, and residential use."
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