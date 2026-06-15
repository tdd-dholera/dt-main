import Image from "next/image";
import React from "react";
import Link from "next/link";
import hero from "@/assets/bulk-land-dholera-times-desktop.webp";
import heroM from "@/assets/bulk-land-dholera-times-mobile.webp";
import residential from "@/assets/bulkLand/residential-zone-dholera-times.webp";
import industrial from "@/assets/bulkLand/industrial-zone-dholera-times.webp";
import hac from "@/assets/bulkLand/high-access-corridor-zone-dholera-times.webp";
import cityCenter from "@/assets/bulkLand/city-centre-zone-dholera-times.webp";
import knowledge from "@/assets/bulkLand/knowledge-and-it-zone-dholera-times.webp";
import recreation from "@/assets/bulkLand/recreation-and-sports-zone-dholera-times.webp";
import BulkLand from "../components/BulkLandForm";
import FAQS from "./FAQs";
import AboutBulkLand from "./AboutBulkLand";

export default function page() {
  const bulkLandCategories = [
    {
      id: 1,
      title: "Residential Zone",
      image: residential,
      href: "/bulk-land/residential",
      description: "Suitable for buyers exploring bulk land for plotted development, housing planning, township-style use, or long-term residential investment in Dholera SIR.",
    },
    {
      id: 2,
      title: "Industrial Zone",
      image: industrial,
      href: "/bulk-land/industrial",
      description: "Bulk land options for buyers tracking industrial growth, manufacturing activity, warehouse planning, and infrastructure-linked development around Dholera.",
    },
    {
      id: 3,
      title: "High Access Corridor",
      image: hac,
      href: "/bulk-land/high-access-corridor",
      description: "Land options positioned around important access routes, suitable for buyers who prefer better road connectivity, movement visibility, and future development access.",
    },
    {
      id: 4,
      title: "City Centre",
      image: cityCenter,
      href: "/bulk-land/city-centre",
      description: "Bulk land options around central development areas, suitable for buyers exploring commercial, mixed-use, service-based, or future urban planning opportunities.",
    },
    {
      id: 5,
      title: "Knowledge & IT",
      image: knowledge,
      href: "/bulk-land/knowledge-it",
      description: "Suitable for buyers exploring land around education, IT, office, institutional, or future service-sector development possibilities in Dholera SIR.",
    },
    {
      id: 6,
      title: "Recreation & Sports",
      image: recreation,
      href: "/bulk-land/recreation-sports",
      description: "Land options near lifestyle, recreation, sports, and community-focused development areas, suitable for long-term planning around future social infrastructure.",
    },
  ];



  return (
    <>
      <title>Bulk Land in Dholera Smart City | High ROI Investment</title>
      <meta
        name="description"
        content="Invest in bulk land in Dholera Smart City with AUDA-approved plots ideal for residential, commercial, and industrial projects near Dholera International Airport."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera Gujarat, Dholera SIR, Dholera Project, Invest in Dholera, Dholera Property Investment"
      />
      <link rel="canonical" href="https://www.dholeratimes.com/bulk-land" />
      <div id="hero" className="relative w-full overflow-hidden">
        {/* ── DESKTOP (lg+): translateX sliding ──────────────────────────── */}
        <div
          className="hidden lg:flex w-full transition-transform duration-700 ease-in-out"
        >
          <div className="w-full flex-shrink-0 relative">
            <div className="relative w-full md:h-[50vh] aspect-[3/1]">
              <Image
                src={hero}
                alt="Bulk Land in Dholera Smart City"
                fill
                className="object-cover aspect-[3/1]"
                fetchPriority="high"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* ── MOBILE (< lg): opacity-fade + swipe ────────────────────────── */}
        <div
          className="relative block lg:hidden w-full"
          style={{ aspectRatio: "5/4" }}
          role="region"
          aria-label="Mobile image carousel"
        > 
          <div>
            <Image
              src={heroM}
              alt="Bulk Land in Dholera Smart City"
              fill
              className="object-cover"
              fetchPriority="high"
              sizes="100vw"
              quality={85}
            />
          </div>
        </div>
      </div>
      

      <div>
        <h1 className="text-2xl  md:text-3xl pt-8 font-bold text-black text-center mb-2">
          Explore Bulk Land Growth Zones in Dholera SIR
        </h1>
      </div>

      <div>
        <AboutBulkLand/>
      </div>

      <div className="text-xl text-center font-semibold pt-4">
        Explore zones in bulk land
      </div>

      {/* 3-Column Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bulkLandCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[#d3b36b] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-white">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BulkLand title="Looking to Invest in Bulk Land Parcels in Dholera SIR" />
      <FAQS/>
    </>
  );
}
