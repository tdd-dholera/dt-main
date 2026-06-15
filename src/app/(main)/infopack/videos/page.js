import { Play, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import bg from "@/assets/bg-image.webp";
import { FaMapMarkerAlt, FaVideo, FaBuilding } from "react-icons/fa";

const FixedNavigation = ({ currentPage = "home" }) => (
  <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-20 w-[95%] max-w-2xl">
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-200/50 px-3 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-center gap-2 md:gap-6">
        <Link
          href="/infopack/locations"
          className={`group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 flex-1 md:flex-none justify-center border font-bold ${
            currentPage === "locations"
              ? "bg-gradient-to-br from-[#d3b36b] to-[#c4a55d] text-[#151f28] hover:shadow-[#d3b36b]/40 border-[#d3b36b]/40"
              : "bg-[#151f28] text-white hover:bg-gray-700 border-gray-300"
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
              : "bg-[#151f28] text-white hover:bg-gray-700 border-gray-300"
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
              : "bg-[#151f28] text-white hover:bg-gray-700 border-gray-300"
          }`}
        >
          <FaBuilding className="text-sm md:text-lg" />
          <span className="font-semibold text-xs md:text-base whitespace-nowrap">
            Available Plots
          </span>
        </Link>
      </div>
    </div>
  </div>
);

export default async function VideosPage() {
  const videos = [
    {
      id: "LUPDj1r7S8k",
      title: "ReNew Solar Plant",
      duration: "unknown",
    },
    {
      id: "ZBdCoZsVKwY",
      title: "Dholera International Airport",
      duration: "unknown",
    },
    {
      id: "GonYocb879Y",
      title: "Dholera Activation Area",
      duration: "unknown",
    },
    {
      id: "l9TMQRRkLCI",
      title: "Tata's Hotel",
      duration: "unknown",
    },
    {
      id: "35K9qo0bBK4",
      title: "Ahmedabad-Dholera Expressway",
      duration: "unknown",
    },
    {
      id: "m2JMZYfbJkk",
      title: "ABCD Building",
      duration: "unknown",
    },
    {
      id: "YN-GVP12PaI",
      title: "Water Treatment Plant",
      duration: "unknown",
    },
    {
      id: "NxsY9u3vfW4",
      title: "Tata Semiconductor Plant",
      duration: "unknown",
    },
    {
      id: "j_lFW9i2gb0",
      title: "Asia's Largest Solar Park",
      duration: "unknown",
    },
    {
      id: "NDtUDS6Gf3Y",
      title: "WestWyn County",
      duration: "unknown",
    },
    {
      id: "APS0hPGGjZU",
      title: "WestWyn Estate",
      duration: "unknown",
    },
  ];

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center bg-white p-10 rounded-xl shadow-xl">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Videos Available
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find any videos at the moment. Please check back later.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#bc9849] to-[#d8b66d] text-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[87vh] bg-gradient-to-b from-blue-50 to-gray-100 py-16 pt-32 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <meta name="robots" content="noindex, nofollow" />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/infopack/videos"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

          <p className=" text-lg font-semibold max-w-2xl mx-auto leading-relaxed">
            Watch expert insights on why investing in Dholera is a smart
            financial decision and learn about the city's development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title || `YouTube Video ${index + 1}`}
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Duration badge */}
                {/*  {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                )} */}
              </div>

              <div className="p-5">
                {video.title && (
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#d8b66d] transition-colors">
                    {video.title}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Video playlist CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">
            Subscribe to our channel for more videos about Dholera Smart City
          </p>
        </div>
      </div>
      <FixedNavigation currentPage="videos" />
    </div>
  );
}
