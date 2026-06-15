import Link from "next/link";
import "./project.css";
import Image from "next/image";
import ProjectsSlider from "./Project";

import hero from "@/assets/residential-hero.webp";
import heroM from "@/assets/residential-mob-view.webp";
import westwyn_estate from "@/assets/residential/westwyn-estates/westwyn-estates-dholera-times-desktop.webp";
import westwyn_residency from "@/assets/residential/residency/westwyn-residency-dholera-times-desktop.webp";
import westwyn from "@/assets/residential/sold-out/westwyn-county-dholera-times-desktop.webp";
import orchid from "@/assets/residential/sold-out/orchid-plots-dholera-times-desktop.webp";
import paradise1 from "@/assets/residential/sold-out/paradise-plots-dholera-times-desktop.webp";
import paradise2 from "@/assets/residential/sold-out/paradise-plots-dholera-times-desktop.webp";
import maple from "@/assets/residential/sold-out/pride-plots-dholera-times-desktop.webp";
import marina from "@/assets/residential/sold-out/pride-plots-dholera-times-desktop.webp";
import pride from "@/assets/residential/sold-out/pride-plots-dholera-times-desktop.webp";
import LeadForm from "./LeadForm";
import SoldOutSlider from "./SoldOutProjects";
import InvestmentBenefits from "./WhyInvest";

const projectsData = [
  {
    _id: "1",
    title: "WestWyn Residency",
    slug: { current: "westwyn-residency" },
    mainImage: westwyn_residency,
    description:
      "Own premium plots at WestWyn Residency a newly launch project in Polarpur, Dholera. Located near Dholera SIR and major infrastructure, offering well-connected plots with instant registry.",
    categories: [{ title: "Under Construction" }, { title: "Latest" }],
    location: "Pipariya, Dholera, Gujarat",
    status: "ongoing",
  },
  {
    _id: "2",
    title: "WestWyn Estates",
    slug: { current: "westwyn-estate" },
    mainImage: westwyn_estate,
    description:
      "Step into Dholera's growth with WestWyn Estates premium plots in Polarpur. With direct entry from State Highway-117 and just minutes from Bhimnath Railway Station.",
    categories: [{ title: "Under Construction" }, { title: "Latest" }],
    location: "Vadhela, Dholera, Gujarat",
    status: "ongoing",
  },
  {
    _id: "3",
    title: "WestWyn County",
    slug: { current: "westwyn-county" },
    mainImage: westwyn,
    description:
      "Premium township with spacious plots, world-class connectivity, and Tata Semiconductor Fab nearby.",
    categories: [{ title: "Sold Out" }, { title: "Premium" }],
    location: "Fedra-Pipli State Highway, Dholera, Gujarat",
    status: "sold out",
  },
  {
    _id: "4",
    title: "Orchid",
    slug: { current: "orchid" },
    mainImage: orchid,
    description:
      "Peaceful residential project with smart amenities and direct connectivity to Ahmedabad Dholera Expressway.",
    categories: [{ title: "Sold Out" }, { title: "Smart Living" }],
    location: "Gamph, Dholera",
    status: "sold-out",
  },
  {
    _id: "5",
    title: "Paradise",
    slug: { current: "paradise-1" },
    mainImage: paradise1,
    description:
      "Luxury plotted developments close to Dholera International Airport, designed for long term investors and smart living.",
    categories: [{ title: "Sold Out" }, { title: "Luxury" }],
    location: "Shela, Dholera",
    status: "sold-out",
  },
  {
    _id: "6",
    title: "Paradise 2",
    slug: { current: "paradise-2" },
    mainImage: paradise2,
    description:
      "Luxury plotted developments close to Dholera International Airport, designed for long term investors and smart living.",
    categories: [{ title: "Sold Out" }, { title: "Luxury" }],
    location: "Shela, Dholera",
    status: "sold-out",
  },
  {
    _id: "7",
    title: "Maple Township",
    slug: { current: "maple" },
    mainImage: maple,
    description:
      "Affordable premium plots near the ABCD Building, Dholera, and Smart City Booking Centre, ideal for families and investors.",
    categories: [{ title: "Sold Out" }, { title: "Affordable" }],
    location: "Gamph, Gujarat",
    status: "sold-out",
  },
  {
    _id: "8",
    title: "Marina Bay",
    slug: { current: "marina-bay" },
    mainImage: marina,
    description:
      "A unique project inspired by coastal living, situated near Dholera Port and the Solar Power Plant, ideal for future growth.",
    categories: [{ title: "Sold Out" }, { title: "Coastal Living" }],
    location: "Gamph, Dholera",
    status: "sold-out",
  },
  {
    _id: "9",
    title: "Pride",
    slug: { current: "pride" },
    mainImage: pride,
    description:
      "Prestigious township with eco-friendly infrastructure and assured growth potential in Dholera Metro City.",
    categories: [{ title: "Sold Out" }, { title: "Eco-Friendly" }],
    location: "Kasindra, Dholera",
    status: "sold-out",
  },
];

// Returns grid col class based on number of available projects (max 4)
function getGridClass(count) {
  switch (count) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 md:grid-cols-2";
    case 3:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    default:
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
  }
}

function isSoldOut(post) {
  if (!post.categories) return false;
  const cats = Array.isArray(post.categories)
    ? post.categories
    : [post.categories];
  return cats.some((c) => c.title?.toLowerCase() === "sold out");
}

// Reusable available project card
function AvailableCard({ post }) {
  return (
    <Link
      href={
        post.slug?.current
          ? `/dholera-residential-plots/${post.slug.current}`
          : "#"
      }
      className="block h-full"
    >
      <div className="rounded-3xl shadow-xl overflow-hidden border-2 border-[#debe6b]/20 bg-[#fbfbfb] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
        <div className="relative h-56 flex-shrink-0">
          {post.mainImage && (
            <Image
              src={post.mainImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 line-clamp-1 text-[#151f28]">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-sm leading-relaxed mb-4 line-clamp-3 flex-grow text-[#151f28]/75">
              {post.description}
            </p>
          )}
          <div className="inline-flex items-center gap-1.5 px-5 py-2.5 font-semibold rounded-xl text-sm mt-auto bg-[#debe6b] text-[#151f28] w-fit">
            View Project
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const availableProjects = projectsData.filter((p) => !isSoldOut(p));
  const soldOutProjects = projectsData.filter((p) => isSoldOut(p));

  const useSlider = availableProjects.length > 4;

  return (
    <div className="min-h-screen">
      <title>Residential Plots in Dholera Smart City | Dholera Times</title>
      <meta
        name="description"
        content="Premium residential plots in Dholera Smart City. Explore projects like WestWyn, Paradise, Orchid, and more with the top Dholera investment value."
      />
      <meta
        name="keywords"
        content="Dholera residential plots, Dholera Smart City, Dholera plots, Dholera investment, investment in Dholera"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-residential-plots"
      />
      <meta name="robots" content="index, follow" />

      {/* Hero */}
      <div className="relative overflow-hidden h-[50vh] w-full">
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src={hero}
            alt="Dholera SIR Project"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="md:hidden absolute inset-0 w-full h-full">
          <Image
            src={heroM}
            alt="Dholera SIR Project"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#fbfbfb]">
              Our <span className="text-[#debe6b]">Residential Projects</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Available Projects */}
      {availableProjects.length > 0 && (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section heading */}
            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-[#151f28]">
                Investment Ready Plots in{" "}
                <span className="text-[#debe6b]">Dholera</span>
              </h2>
              <p className="max-w-2xl mx-auto text-[#151f28]/70">
                Secure a future-ready asset in India's first smart city
              </p>
            </div>

            {/* Grid (≤4 projects) or Slider (>4 projects) */}
            {useSlider ? (
              <ProjectsSlider projects={availableProjects} />
            ) : (
              <div
                className={`grid gap-6 ${getGridClass(availableProjects.length)}`}
              >
                {availableProjects.map((post) => (
                  <AvailableCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {/* Lead Form */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="rounded-3xl p-8 lg:p-12 shadow-2xl border-2 border-[#debe6b]/30 bg-[#151f28]">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-[#fbfbfb]">
                    Get <span className="text-[#debe6b]">Project Details</span>
                  </h3>
                  <p className="text-lg text-[#fbfbfb]/80">
                    Connect with our investment team for personalized guidance
                  </p>
                </div>
                <LeadForm buttonName="Get A Call Back" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <InvestmentBenefits/>
      </div>

      {/* Sold Out Projects */}
      {soldOutProjects.length > 0 && (
        <div className="py-20 bg-[#151f28]/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-[28px] font-bold mb-6 text-[#151f28]">
                Sold Out <span className="text-[#debe6b]">Projects</span>
              </h2>
              <p className="text-xl max-w-2xl mx-auto text-[#151f28]/70">
                Our successful investment projects with proven returns
              </p>
            </div>

            <SoldOutSlider projects={soldOutProjects} />
          </div>
        </div>
      )}
    </div>
  );
}
