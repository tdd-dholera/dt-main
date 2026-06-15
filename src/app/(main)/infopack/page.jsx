"use client";
import {
  Users,
  Building,
  BadgeCheck,
  AreaChart,
  MapPin,
  Video,
  Home,
} from "lucide-react";
import bg from "@/assets/pexels.jpg";
import estate1 from "@/assets/residential/westwyn-estates/westwyn-estates-dholera-times-desktop.webp";
import county1 from "@/assets/residential/westwyn-county-banner.webp";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaVideo, FaBuilding } from "react-icons/fa";
import LatestUpdates from "./Latest-updates";
import DholeraCarousel from "./gallery";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animated component wrapper
const AnimatedSection = ({ children, variants = fadeInUp, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FixedNavigation = ({ currentPage = "home" }) => (
  <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-20 w-[95%] max-w-2xl">
    <motion.div
      className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-200/50 px-3 py-3 md:px-6 md:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-center gap-2 md:gap-6">
        <Link
          href="/infopack/locations"
          className={`group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "locations"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] hover:text-[#151f28] hover:bg-gray-50 border-gray-300"
          }`}
        >
          <FaMapMarkerAlt className="text-sm md:text-lg" />
          <span className="font-semibold text-sm md:text-base">Locations</span>
        </Link>

        <Link
          href="/infopack/videos"
          className={`group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "videos"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gray-50 border-gray-300 hover:bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] hover:text-[#151f28]"
          }`}
        >
          <FaVideo className="text-sm md:text-lg" />
          <span className="font-semibold text-sm md:text-base">Videos</span>
        </Link>

        <Link
          href="/infopack/inventory"
          className={`group flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "inventory"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gray-50 border-gray-300 hover:bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] hover:text-[#151f28]"
          }`}
        >
          <FaBuilding className="text-sm md:text-lg" />
          <span className="font-semibold text-xs md:text-base whitespace-nowrap">
            Available Plots
          </span>
        </Link>
      </div>
    </motion.div>
  </div>
);

const WhyDholeraGrowth = () => (
  <AnimatedSection variants={staggerContainer}>
    <div className="bg-gradient-to-br from-[#151f28] via-[#1a2832] to-[#151f28] p-8 rounded-3xl shadow-2xl border-2 border-[#d3b36b]/40">
      <AnimatedSection className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Why Dholera is the
          <span className="text-[#d3b36b]"> Future of India</span>
        </h2>
        <div className="h-1.5 w-40 mb-4 bg-gradient-to-r from-transparent via-[#d3b36b] to-transparent mx-auto rounded-full" />
        <p className="text-white leading-relaxed mb-2 text-justify">
          Dholera offers the perfect balance between government support, 
          location, and affordability making it the most future-proof 
          investment destination in India.
        </p>
      </AnimatedSection>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  {/* Left Column */}
  <div className="space-y-6">
    <AnimatedSection variants={slideInLeft}>
      <div className="group bg-white/95 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#d3b36b]/20 transition-all duration-300 border border-[#d3b36b]/20 hover:border-[#d3b36b]/60 hover:scale-105 h-full min-h-[160px] flex flex-col">
        <h3 className="text-xl font-bold text-[#151f28] mb-4 group-hover:text-[#d3b36b] transition-colors">
          🚀 Infrastructure-First Planning
        </h3>
        <p className="text-gray-700 flex-grow">
          Roads, water, and ICT systems already operational in key zones.
        </p>
      </div>
    </AnimatedSection>

    <AnimatedSection variants={slideInLeft}>
      <div className="group bg-white/95 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#d3b36b]/20 transition-all duration-300 border border-[#d3b36b]/20 hover:border-[#d3b36b]/60 hover:scale-105 h-full min-h-[160px] flex flex-col">
        <h3 className="text-xl font-bold text-[#151f28] mb-4 group-hover:text-[#d3b36b] transition-colors">
          💰 High ROI Zone
        </h3>
        <p className="text-gray-700 flex-grow">
          Investors entering at early-bird stage are securing higher returns on their investment.
        </p>
      </div>
    </AnimatedSection>

    <AnimatedSection variants={slideInLeft}>
      <div className="group bg-white/95 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#d3b36b]/20 transition-all duration-300 border border-[#d3b36b]/20 hover:border-[#d3b36b]/60 hover:scale-105 h-full min-h-[160px] flex flex-col">
        <h3 className="text-xl font-bold text-[#151f28] mb-4 group-hover:text-[#d3b36b] transition-colors">
          🏭 Industrial Magnet
        </h3>
        <p className="text-gray-700 flex-grow">
          Over ₹3 Lakh crore investment by government and global companies like TATA, Tokyo Electron, Tillman Global, etc.
        </p>
      </div>
    </AnimatedSection>
  </div>

  {/* Right Column */}
  <div className="space-y-6">
    <AnimatedSection
      variants={{
        hidden: { opacity: 0, x: 60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <div className="group bg-white/95 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#d3b36b]/20 transition-all duration-300 border border-[#d3b36b]/20 hover:border-[#d3b36b]/60 hover:scale-105 h-full min-h-[160px] flex flex-col">
        <h3 className="text-xl font-bold text-[#151f28] mb-4 group-hover:text-[#d3b36b] transition-colors">
          🎯 Strategic Location
        </h3>
        <p className="text-gray-700 flex-grow">
          Positioned in the heart of Gujarat with strong connectivity to Ahmedabad, Bhavnagar, Vadodara, and other major cities.
        </p>
      </div>
    </AnimatedSection>

    <AnimatedSection
      variants={{
        hidden: { opacity: 0, x: 60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <div className="group bg-white/95 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#d3b36b]/20 transition-all duration-300 border border-[#d3b36b]/20 hover:border-[#d3b36b]/60 hover:scale-105 h-full min-h-[160px] flex flex-col">
        <h3 className="text-xl font-bold text-[#151f28] mb-4 group-hover:text-[#d3b36b] transition-colors">
          🌆 Sustainable Smart Living
        </h3>
        <p className="text-gray-700 flex-grow">
          Backed by renewable energy vision, and planned infrastructure for housing, healthcare, and education.
        </p>
      </div>
    </AnimatedSection>

    <AnimatedSection
      variants={{
        hidden: { opacity: 0, x: 60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <div className="group bg-white/95 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#d3b36b]/20 transition-all duration-300 border border-[#d3b36b]/20 hover:border-[#d3b36b]/60 hover:scale-105 h-full min-h-[160px] flex flex-col">
        <h3 className="text-xl font-bold text-[#151f28] mb-4 group-hover:text-[#d3b36b] transition-colors">
          ⚡ Plug and Play Infrastructure
        </h3>
        <p className="text-gray-700 flex-grow">
          Roads, Underground water lines, electric wires, ICT, and SCADA sensors already installed for industries.
        </p>
      </div>
    </AnimatedSection>
  </div>
</div>
    </div>
  </AnimatedSection>
);

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <meta name="robots" content="noindex, nofollow" />
      {/* Hero Section */}
      <div className="relative">
        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 ">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center space-y-6 mb-16">
              <div className="inline-block">
                <h1 className="text-3xl md:text-5xl font-black text-[#d3b36b] mb-4 tracking-tight">
                  Dholera: India's Smart City Revolution
                </h1>
                <div className="h-2 bg-gradient-to-r from-transparent via-[#d3b36b] to-transparent rounded-full"></div>
              </div>

              <p className="text-[#d3b36b] text-2xl md:text-3xl font-bold tracking-wide">
                Dholera matlab{" "}
                <span className="text-[#151f28]">Dholera Times</span>
              </p>

              <AnimatedSection variants={scaleIn}>
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-[#d3b36b]/40 max-w-5xl mx-auto mt-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#151f28] mb-4 text-center">
                    The Vision of{" "}
                    <span className="text-[#d3b36b]">Dholera SIR</span>
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-2 text-justify">
                    Dholera Special Investment Region (SIR) is the flagship 
                    model of India’s smart city vision and the first city 
                    developed under the Gujarat Special Investment Region 
                    (SIR) Act. Spread across{" "}
                    <span className="font-bold text-[#d3b36b]">922.5 sq. km, </span>
                     it is a greenfield smart city and a key node of the 
                     Delhi-Mumbai Industrial Corridor (DMIC), being developed 
                     with strong support from the Government of India and the 
                     Government of Gujarat.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-2 text-justify">
                    Planned as a self-sustained global hub for manufacturing, 
                    innovation, and urban living, Dholera brings together 
                    advanced technology, world-class infrastructure, and sustainable 
                    design setting the standard for future Indian cities.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6 text-justify">Dholera isn’t just a project - it’s India’s answer to global 
                    smart city challenges, combining digital governance, green energy, 
                    and inclusive growth.
                  </p>
                </div>
              </AnimatedSection>
            </AnimatedSection>

            {/* Stats Grid */}
            
          </div>
        </div>
      </div>

      {/* Why Dholera Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <WhyDholeraGrowth />
        </div>
      </div>

      <div>
        <AnimatedSection variants={staggerContainer}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                {[
                  {
                    value: "8",
                    label: "Projects",
                    icon: Building,
                  },
                  { value: "1245+", label: "Plots Sold Out", icon: BadgeCheck },
                  { value: "647+", label: "Happy Customers", icon: Users },
                  { value: "2 Lakh", label: "Sq. Yards Sold", icon: AreaChart },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <AnimatedSection key={index} variants={scaleIn}>
                      <div className="group bg-[#1a2832]/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#d3b36b]/20 border-2 border-[#d3b36b]/30 hover:border-[#d3b36b]/60">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-[#d3b36b] rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                            <Icon className="h-7 w-7 text-[#151f28]" />
                          </div>
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-[#d3b36b] mb-3">
                          {stat.value}
                        </div>
                        <div className="text-sm md:text-base text-gray-300 font-medium leading-snug">
                          {stat.label}
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </AnimatedSection>
      </div>

      {/* Projects Grid Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-[#d3b36b] mb-4">
              Our Projects
            </h2>
            <div className="h-1.5 w-40 bg-gradient-to-r from-transparent via-[#d3b36b] to-transparent mx-auto rounded-full" />
          </AnimatedSection>

          <AnimatedSection variants={staggerContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <AnimatedSection variants={slideInLeft}>
                <Link
                  href="/dholera-residential-plots/westwyn-estate"
                  className="group block transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d3b36b]/30 hover:border-[#d3b36b]/60">
                    <Image
                      src={estate1}
                      alt="Westwyn Estate"
                      className="w-full h-52 object-contain md:object-cover md:h-72 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#d3b36b] mb-2">
                        WestWyn Estate - A Smart Investment for Smart Future
                      </h3>
                      <p className="text-[#151f28]">
                        Located 0 KM from Dholera SIR boundary, on the Vadhela–Navda 
                        State Highway, WestWyn Estate offers register-ready plots just
                        5 minutes from Ahmedabad-Dholera Expressway. Investors are 
                        securing register ready Dholera plots  near the Hebatpur 
                        Industrial Area, with high ROI potential.
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>

              <AnimatedSection variants={slideInLeft} className="md:hidden">
                <Link
                  href="/dholera-residential-plots/westwyn-county"
                  className="group block transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d3b36b]/30 hover:border-[#d3b36b]/60">
                    <Image
                      src={county1}
                      alt="Westwyn County"
                      className="w-full h-52 object-contain md:object-cover md:h-72 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#d3b36b] mb-2">
                        WestWyn County - Premium Plots, Promising Returns
                      </h3>
                      <p className="text-[#151f28]">
                        WestWyn County is a premium residential plotting 
                        project located on the Fedra-Pipli State Highway. 
                        It offers government approved plots (150 sq. yds to 325 sq. yds), 
                        just 15 minutes from Dholera International Airport. 
                        WestWyn County stands out as a trusted choice, 
                        backed by strong location advantage and future growth potential.
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>

              <AnimatedSection variants={slideInRight} className="max-sm:hidden">
                <Link
                  href="/dholera-residential-plots/westwyn-county"
                  className="group block transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d3b36b]/30 hover:border-[#d3b36b]/60">
                    <Image
                      src={county1}
                      alt="Westwyn County"
                      className="w-full h-52 object-contain md:object-cover md:h-72 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#d3b36b] mb-2">
                        WestWyn County - Premium Plots, Promising Returns
                      </h3>
                      <p className="text-[#151f28]">
                        WestWyn County is a premium plot located along the
                        Fedra–Pipli Highway in the Dholera region. The project
                        offers government-approved residential plots ranging
                        from 150 sq. yds to 325 sq. yds, combining smart design,
                        connectivity, and long-term appreciation.
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <section aria-labelledby="updates-heading" className="pt-8">
              <h2
                id="updates-heading"
                className="bg-[#d3b36b] text-gray-900 text-xl md:text-3xl lg:text-4xl text-center p-3 md:p-5 font-semibold mx-auto rounded-md"
              >
                Stay Updated with Latest Developments in Dholera Smart City
              </h2>
              <LatestUpdates />
            </section>
          </AnimatedSection>
        </div>
      </div>

      <AnimatedSection>
        <div>
          <DholeraCarousel />
        </div>
      </AnimatedSection>

      {/* Fixed Navigation - Moved to bottom */}
      <FixedNavigation />
    </div>
  );
}
