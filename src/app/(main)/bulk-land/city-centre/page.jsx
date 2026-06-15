import Image from "next/image";
import React from "react";
import banner from "@/assets/bulkLand/city-centre-bulk-land-desktop.webp";
import bannerMob from "@/assets/bulkLand/city-centre-bulk-land-mobile.webp";
import {

  ArrowRight,
} from "lucide-react";
import residentialMap from "@/assets/bulkLand/city-centre-zone-dholera-times.webp";
import Table from "./table";
import BulkLand from "../../components/BulkLandForm";
import { getCityCenterLinks, getResidentialLinks } from "../InterLink";
import CityCentreZoneCards from "./Cards";
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
  const relatedProperties = getCityCenterLinks();

  const cardStyle = `
    .golden-card {
      background-color: rgba(211, 179, 107, 0.1);
      transition: background-color 0.3s ease;
    }
    .golden-card:hover {
      background-color: rgba(211, 179, 107, 0.2);
    }
    .dark-card {
      background-color: rgba(21, 31, 40, 0.1);
      transition: background-color 0.3s ease;
    }
    .dark-card:hover {
      background-color: rgba(21, 31, 40, 0.2);
    }
  `;

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
      <title>City Centre Zone Dholera | Commercial Land Investment</title>
      <meta
        name="description"
        content="The City Centre Zone of Dholera Smart City is the commercial core - ideal for retail, offices, and hospitality projects near Dholera International Airport."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera, Gujarat, Dholera International Airport, Dholera Project, Invest in Dholera"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/bulk-land/city-centre"
      />

      <div className="relative h-[50vh] w-full ">
        {/* Banner Image */}
        <Image
          src={banner}
          alt="Commercial Bulk Land Dholera SIR "
          className="h-full w-full object-cover max-sm:hidden"
          fill
          priority
        />
        <Image
          src={bannerMob}
          alt="Commercial Bulk Land Dholera SIR "
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
              CITY CENTRE ZONE
            </h1>
            <p className="text-white text-lg font-light tracking-wider">
              Where Opportunities Multiply
            </p>
          </div>
        </div>

        {/* Bottom Info Card */}
      </div>
      <div className=" w-full  z-10">
        <div className="p-4 md:p-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <h2 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Zone Area
                </h2>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  1,678.045 Sq. Yards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">
                  Key Permissions
                </h3>
                <p className="text-gray-700 text-sm md:text-lg font-medium">
                  Dholera Commercial & Hospitality Development
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

      {/* Description Section */}
      <div className="max-w-5xl mx-auto text-justify px-2 md:px-4 py-8">
        <p className="text-center mb-4 font-semibold text-lg md:text-2xl">
          Premium Bulk Land in Dholera’s City Centre Zone
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                The City Centre is the heartbeat of Dholera Smart City, blending
                commerce, governance, and culture. As a key part of the Dholera
                Smart City project, it is planned for retail, hotels, corporate
                towers, and civic spaces, making it the most prestigious hub of
                the Dholera Project.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                With seamless connectivity to Dholera International Airport, the
                City Centre ensures maximum visibility, footfall, and
                global-standard facilities, making it a landmark destination of
                Dholera, Gujarat. This prime urban core highlights the
                integrated planning and future-ready vision of the Dholera Smart
                City project.
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

      <div>
        <CityCentreZoneCards />
      </div>

      <BulkLand
        title="Invest in Govt. Approved Bulk Land in Dholera Starting 2Cr"
        pageName="city-centre-bulk-land"
      />
      <FAQS/>
      <HorizontalScrollInterlink properties={relatedProperties} />

      <div>
        <Table />
      </div>
    </>
  );
}
