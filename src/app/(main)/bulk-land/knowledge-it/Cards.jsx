"use client";
import React, { useState } from "react";
import {
  Cpu,
  FlaskConical,
  GraduationCap,
  Building2,
  Home,
  Lightbulb,
  BrainCircuit,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { TbBuildingSkyscraper } from "react-icons/tb";

const BRAND_GOLD = "#d3b36b";

const benefits = [
  {
    id: "it",
    icon: Cpu,
    gold: true,
    title: "IT & Technology Parks",
    description:
      "Dedicated spaces for software companies, tech firms, and IT-enabled services.",
  },
  {
    id: "rnd",
    icon: FlaskConical,
    gold: false,
    title: "Research & Development Facilities",
    description:
      "Innovation centers and labs focused on advanced research and product development.",
  },
  {
    id: "education",
    icon: GraduationCap,
    gold: true,
    title: "Educational Institutions",
    description:
      "Universities, training institutes, and skill development centers supporting knowledge growth.",
  },
  {
    id: "corporate",
    icon: Building2,
    gold: false,
    title: "Corporate & Office Spaces",
    description:
      "Modern office complexes for startups, enterprises, and multinational companies.",
  },
  {
    id: "residential",
    icon: Home,
    gold: true,
    title: "Supporting Residential & Mixed-Use",
    description:
      "Integrated residential and commercial developments serving the workforce ecosystem.",
  },
];

const projects = [
  {
    id: "retail",
    icon: Lightbulb,
    gold: true,
    title: "Retail & Commercial Services",
    description:
      "Supporting commercial outlets that cater to professionals and business communities.",
  },
  {
    id: "innovation",
    icon: BrainCircuit,
    gold: false,
    title: "Innovation Ecosystem",
    description:
      "Planned environment designed to foster collaboration, startups, and technology growth.",
  },
  {
    id: "global",
    icon: Globe2,
    gold: true,
    title: "Global Competitiveness",
    description:
      "Strategic positioning to attract national and international IT investments.",
  },
  {
    id: "infrastructure",
    icon: TbBuildingSkyscraper,
    gold: false,
    title: "Modern Infrastructure",
    description:
      "Smart city planning with high-speed connectivity and advanced utilities.",
  },
  {
    id: "growth",
    icon: TrendingUp,
    gold: true,
    title: "Long-Term Value Growth",
    description:
      "Strong appreciation potential driven by tech-led economic development.",
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

export default function KnowledgeITZoneCards() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeBenefit, setActiveBenefit] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

      {/* Section 1 */}
      <section>
        <SectionHeader
          label="Dholera Zoning Overview"
          title="What's Allowed in Knowledge and IT Zones?"
          subTitle="Knowledge & IT zones support IT parks, offices, research, education, and mixed-use development. These zones are suitable for buyers looking at land linked to future business growth."
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
          title="Why Invest in Dholera Knowledge and IT Zones?"
          subTitle="Dholera Knowledge & IT Zone supports future IT, education, office, and research-based development. It is suitable for long-term business and commercial land planning."
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