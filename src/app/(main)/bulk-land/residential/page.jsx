import Image from "next/image";
import React from "react";
import banner from "@/assets/bulkLand/residential-bulk-land-desktop.webp";
import bannerMob from "@/assets/bulkLand/residential-bulk-land-mobile.webp";
import {
  TrendingUp,
  LayoutGrid,
  Plug,
  Users,
  Landmark,
  ShoppingBag,
  UtensilsCrossed,
  HeartPulse,
  GraduationCap,
  Home,
  HomeIcon,
  ArrowRight,
} from "lucide-react";
import residentialMap from "@/assets/bulkLand/residential-zone-dholera-times.webp";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import { getResidentialLinks } from "../InterLink";
import ResidentialZoneCards from "./cards";
import FAQS from "./FAQs";

// Horizontal Scroll Design
const HorizontalScrollInterlink = ({ properties }) => {
  return (
    <div className="bg-gradient-to-r from-[#deae3c]/10 to-[#deae3c]/5 py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Discover Other Investment Zones
          </h3>
          <p className="text-gray-600">Swipe to explore more opportunities</p>
        </div>

        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {properties.map((property) => (
            <a
              key={property.id}
              href={property.link}
              className="group flex-shrink-0 w-64 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-semibold text-sm line-clamp-2">
                    {property.title}
                  </h4>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">{property.area}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#deae3c] font-medium text-sm">
                    Explore Zone
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#deae3c] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function page() {
  const relatedProperties = getResidentialLinks();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "Dholera Times",
            alternateName: "DT",
            url: "https://www.dholeratimes.com/",
            logo: "https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdt.7009f759.webp&amp;w=256&amp;q=75",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572970112485",
              "https://www.instagram.com/dholeratimes/",
              "https://www.youtube.com/@dholeratimes",
              "https://x.com/dholeratimes",
            ],
          }),
        }}
      />
      <title>Residential Bulk Land in Dholera | Smart City Plots</title>
      <meta
        name="description"
        content="Explore Dholera Smart City’s Residential Zone - premium bulk land for housing, retail, and community projects with strong ROI and connectivity advantages."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera Gujarat, Invest in Dholera, Dholera Project, Dholera Property Investment"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/bulk-land/residential"
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full ">
        {/* Banner Image */}
        <Image
          src={banner}
          alt="Dholera SIR Residential Zone"
          className="h-full w-full object-cover max-sm:hidden"
          fill
          priority
        />
        <Image
          src={bannerMob}
          alt="Dholera SIR Residential Zone"
          className="h-full w-full object-cover md:hidden"
          fill
          priority
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Main Title - Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold tracking-wide mb-2 md:mb-4">
              RESIDENTIAL ZONE
            </h1>
            <p className="text-white text-lg font-light tracking-wider">
              Where Opportunities Multiply
            </p>
          </div>
        </div>
      </div>

      {/* Zone Info Cards */}
      <div className=" w-full  z-10">
        <div className="p-4 md:p-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h2>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  24167.55 Sq. Yards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Residential Dholera Development
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Future Growth
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  High ROI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Interlink - Alternative placement */}

      <div>
        {/* Description Section */}
        <div className="max-w-5xl mx-auto text-justify px-2 md:px-4 py-8">
          <p className="text-center mb-4 font-semibold text-lg md:text-2xl">
            Future-Ready Residential Bulk Land in Dholera
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                  Where homes meet opportunity, the Residential Zone in Dholera
                  Smart City is designed for people, progress, and prosperity.
                  As part of the Dholera Smart City project, it offers modern
                  housing supported by schools, hospitals, retail outlets, and
                  recreation spaces.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Built for families, developers, and investors, this zone
                  provides quality living with profitable growth. As part of the
                  Dholera Project under DMIC, it promotes sustainable
                  communities with green spaces, infrastructure, and
                  connectivity to Dholera International Airport and the
                  Ahmedabad–Dholera distance corridor.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={residentialMap}
                  alt="residential Zone Dholera SIR land plots"
                  className="w-full max-w-96 h-96 object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ResidentialZoneCards />
      </div>

      <BulkLand
        title="Invest in Govt. Approved Bulk Land in Dholera Starting 2Cr"
        pageName="residential-bulk-land"
      />
      <FAQS/>
      <HorizontalScrollInterlink properties={relatedProperties} />


      <div>
        <Table />
      </div>
    </>
  );
}
