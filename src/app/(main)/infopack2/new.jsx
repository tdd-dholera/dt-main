
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaDownload } from "react-icons/fa";
import LatestUpdates from "../components/Latest-updates";

// Import images
import maps from "@/assets/locations.webp";
import videos from "@/assets/videos.webp";
import inventory from "@/assets/plot.webp";
import bg from "@/assets/bg-image.webp";
import dholeraSIRprogress from "@/assets/dholeraSIRprogress.webp";
import dholeraSite from "@/assets/dholeraSite.webp";
import expressway from "@/assets/expressway2.webp";
import semiconductor from "@/assets/semiconductor2.webp";
import airport from "@/assets/airport.webp";

// Feature card component for better reusability
const FeatureCard = ({ href, image, alt, title }) => (
  <Link
    href={href}
    className="space-y-4 block group"
    aria-label={`View ${title}`}
  >
    <div className="overflow-hidden rounded-lg shadow-2xl">
      <Image
        src={image}
        alt={alt}
        className="h-40 md:h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        width={400}
        height={300}
      />
    </div>
    <p className="font-semibold text-center md:text-2xl">{title}</p>
  </Link>
);

// Gallery link component for reusability
const GalleryLink = ({ image, alt }) => (
  <Link
    href="/gallery/Dholera-SIR-progress"
    className="block bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
    aria-label="View photo gallery"
  >
    <div className="relative">
      <Image
        src={image}
        alt={alt}
        width={1200}
        height={600}
        className="w-full object-contain md:h-96"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
      />
      <div className="flex justify-between items-center w-full px-4 py-3 bg-gray-900 hover:bg-amber-400 text-amber-400 hover:text-gray-900 transition-all">
        <p className="text-lg md:text-2xl font-light">PHOTO GALLERY</p>
        <p className="text-lg md:text-2xl font-semibold">SEE MORE</p>
      </div>
    </div>
  </Link>
);

export default function Info() {
  return (
    <main
      className="py-16 px-4 sm:px-6 lg:px-8 min-h-[70vh] overflow-auto relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <link rel="canonical" href="https://www.dholeratimes.com/infopack" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="text-center space-y-6"
        >
          <h1
            id="hero-heading"
            className="font-bold text-2xl md:text-4xl lg:text-5xl text-gray-800"
          >
            Secure Your Future in Dholera Smart City
          </h1>
          <p className="text-black md:font-semibold text-lg md:text-xl max-w-3xl mx-auto">
            Verified Residential Plots • Immediate Registry • Trusted by 400+
            Investors
          </p>

          <div className="pt-4">
            <Link
              href="https://shorturl.at/8OD6u"
              className="bg-gray-800 text-amber-400 font-semibold flex gap-4 items-center p-4 rounded-md md:text-xl hover:bg-gray-700 transition-colors"
              aria-label="Download Dholera Times Brochure"
            >
              <FaDownload aria-hidden="true" />
              Download WestWyn County Brochure
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="pt-8">
          <h2 id="features-heading" className="sr-only">
            Dholera Information Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              href="/infopack/locations"
              image={maps}
              alt="Map of Dholera Smart City locations"
              title="Locations"
            />
            <FeatureCard
              href="/infopack/videos"
              image={videos}
              alt="Videos about Dholera Smart City"
              title="Videos"
            />
            <FeatureCard
              href="/infopack/inventory"
              image={inventory}
              alt="Available plots in Dholera Smart City"
              title="Available Plots"
            />
          </div>
        </section>

        {/* Latest Updates Section */}
        <section aria-labelledby="updates-heading" className="pt-8">
          <h2
            id="updates-heading"
            className="bg-amber-300 text-gray-900 text-xl md:text-3xl lg:text-4xl text-center p-3 md:p-5 font-semibold mx-auto rounded-md mb-8"
          >
            Explore Latest Progress Around Dholera
          </h2>
          <LatestUpdates />
        </section>


        <section aria-labelledby="updates-heading" className="pt-8">
          <h2
            id="updates-heading"
            className="bg-amber-300 text-gray-900 text-xl md:text-3xl lg:text-4xl text-center p-3 md:p-5 font-semibold mx-auto rounded-md mb-8"
          >
            Our Project Location
          </h2>
        
        </section>

        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Feature */}
            <div className="flex flex-col">
              <Image
                src={expressway}
                alt="expressway"
                className="w-full h-48 md:h-64 object-cover rounded-t-lg"
                width={400}
                height={300}
              />
              <div className="px-4 py-3 bg-gray-900 hover:bg-amber-400 text-amber-400 hover:text-gray-900 transition-all rounded-b-lg">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light">
                  Ahmedabad Dholera Expressway within 6km
                </p>
              </div>
            </div>

            {/* Second Feature */}
            <div className="flex flex-col">
              <Image
                src={airport}
                alt="airport"
                className="w-full h-48 md:h-64 object-cover rounded-t-lg"
                width={400}
                height={300}
              />
              <div className="px-4 py-3 bg-gray-900 hover:bg-amber-400 text-amber-400 hover:text-gray-900 transition-all rounded-b-lg">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light">
                  Dholera international Airport within 14km
                </p>
              </div>
            </div>

            {/* Third Feature */}
            <div className="flex flex-col">
              <Image
                src={semiconductor}
                alt="semiconductor"
                className="w-full h-48 md:h-64 object-cover rounded-t-lg"
                width={400}
                height={300}
              />
              <div className="px-4 py-3 bg-gray-900 hover:bg-amber-400 text-amber-400 hover:text-gray-900 transition-all rounded-b-lg">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light">
                  TATA Semiconductor Plant within 10km
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
