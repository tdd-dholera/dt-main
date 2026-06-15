import {
  getblogs,
  getProjectInfo,
  getUpdates,
  getNews,
} from "@/sanity/lib/api";
import hero from "@/assets/DholeraSirhero.webp";
import Image from "next/image";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";
import Link from "next/link";
import LeadFormSlug from "../dholera-updates/latest-updates/[slug]/LeadForm";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import BulkLand from "../components/BulkLandForm";
import BlogSlider from "./BlogSlider";

export default async function BlogsPage() {
  // Fetch data and handle potential errors
  let posts = [];
  try {
    const postsData = await getProjectInfo();
    posts = Array.isArray(postsData) ? postsData : [];

    // Sort by publishedAt date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);
      const dateB = new Date(b.publishedAt || b._createdAt || 0);
      return dateB - dateA; // Descending order (newest first)
    });

    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  // Fetch news for sidebar (changed from getUpdates to getnews)
  let trendingBlogs = [];
  try {
    const newsData = await getNews();
    trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
    console.log("News data fetched:", trendingBlogs.length);
  } catch (error) {
    console.error("Error fetching news:", error);
    // Fallback to getUpdates if getnews fails
    try {
      const updatesData = await getUpdates();
      trendingBlogs = Array.isArray(updatesData) ? updatesData.slice(0, 5) : [];
      console.log("Fallback to updates data:", trendingBlogs.length);
    } catch (fallbackError) {
      console.error("Error fetching updates as fallback:", fallbackError);
    }
  }

  
  return (
    <>
      <title>About Dholera SIR | Smart City Dholera Gujarat</title>
      <meta
        name="description"
        content="Learn about Dholera SIR, Gujarat's first and largest smart city project, offering investment opportunities, infrastructure, and growth potential."
      />
      <link rel="canonical" href="https://www.dholeratimes.com/dholera-sir" />
      <meta name="robots" content="index, follow" />

      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="md:relative md:h-[65vh] overflow-hidden">
          <Image
            src={hero}
            alt="Dholera SIR Aerial View"
            className="w-full md:h-full h-auto object-contain md:object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 md:bg-black/60"></div>
          <div className="absolute inset-0 md:flex md:items-center md:justify-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-5xl font-bold text-white">
                About Dholera SIR
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* What Is Dholera Smart City Section */}
      <div className="bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-6">
            What Is Dholera Smart City?
          </p>
          <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
              Dholera SIR (Special Investment Region) is one of India&apos;s
              most ambitious greenfield smart city developments, planned in
              Gujarat as a future-ready industrial and economic hub. Located
              within the Delhi-Mumbai Industrial Corridor (DMIC) framework,
              Dholera is designed to support large-scale manufacturing, advanced
              industries, logistics, and modern urban living. It is also
              described by NICDC as the largest node under DMIC, with a planned
              area of around 920 sq. km.
            </p>
            <p>
              What makes Dholera Smart City different is its long-term planning.
              Instead of growing in an unplanned way, the city is being
              developed with integrated infrastructure such as wide roads,
              utility corridors, water systems, power networks, digital
              connectivity, and industrial zoning. This planned approach is
              intended to create a strong foundation for industries, businesses,
              professionals, and future residents.
            </p>
            <p>
              For businesses searching for a location with scale,
              infrastructure, and future growth potential, Dholera SIR Gujarat
              is positioned as a next-generation destination for manufacturing,
              logistics, technology, and industrial investment.
            </p>
          </div>
        </div>
      </div>

      <BulkLand
        title="Invest in Registry-Ready Plots in Dholera Starting from ₹8 Lakh"
        buttonName="Get A Call Back"
        pageName="aboutSir"
      />

      {/* Mega Projects Section */}
      <div className="bg-gray-50 py-14 px-4 flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
        <div className="lg:w-1/4 sticky top-6">
          <div className="bg-white p-6 translate-y-16 rounded-xl shadow-md border-l-4 border-[#d7b56d]">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Latest News on Dholera SIR
            </h2>
            {trendingBlogs.length > 0 ? (
              <div className="space-y-6">
                {trendingBlogs.map((post) => (
                  <TrendingBlogItem key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No news available at the moment.</p>
            )}
          </div>
        </div>

        <div className="lg:w-3/4">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-8">
            Mega Projects in Dholera
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🛣️</div>
              <h4 className="text-lg font-bold mb-2">
                <Link
                  href="/dholera-sir-blogs/dholera-ahmedabad-expressway"
                  className="hover:text-[#deae3c]"
                >
                  Ahmedabad-Dholera Expressway
                </Link>
              </h4>
              <p className="text-gray-700 text-sm">
                High-Speed Connectivity Corridor to Dholera
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">✈️</div>
              <h4 className="text-lg font-bold mb-2">
                <Link
                  href="/dholera-sir-blogs/dholera-international-airport"
                  className="hover:text-[#deae3c]"
                >
                  Dholera International Airport
                </Link>
              </h4>
              <p className="text-gray-700 text-sm">
                India&apos;s Second Largest Airport
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">💻</div>
              <h4 className="text-lg font-bold mb-2">
                Tata Semiconductor Plant
              </h4>
              <p className="text-gray-700 text-sm">
                India&apos;s First Semiconductor Fab
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">☀️</div>
              <h4 className="text-lg font-bold mb-2">
                <Link
                  href="/dholera-sir-blogs/dholera-solar-power-project"
                  className="hover:text-[#deae3c]"
                >
                  Dholera Solar Park
                </Link>
              </h4>
              <p className="text-gray-700 text-sm">
                One of Asia&apos;s Largest Solar Plants
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🚢</div>
              <h4 className="text-lg font-bold mb-2">Dholera Sea Port</h4>
              <p className="text-gray-700 text-sm">
                Proposed Deep-Sea Trade Gateway
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🚇</div>
              <h4 className="text-lg font-bold mb-2">
                <Link
                  href="/dholera-sir-blogs/ahmedabad-dholera-monorail-project-2025"
                  className="hover:text-[#deae3c]"
                >
                  Dholera Monorail
                </Link>
              </h4>
              <p className="text-gray-700 text-sm">High Speed Metro And Rail</p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="text-lg font-bold mb-2">
                <Link
                  href="/about-dholera-sir/abcd-building-dholera"
                  className="hover:text-[#deae3c]"
                >
                  ABCD Building
                </Link>
              </h4>
              <p className="text-gray-700 text-sm">
                Dholera&apos;s Central Command Hub
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🏘️</div>
              <h4 className="text-lg font-bold mb-2">Activation Area</h4>
              <p className="text-gray-700 text-sm">
                Dholera&apos;s First Operational Smart Zone
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🏭</div>
              <h4 className="text-lg font-bold mb-2">DMIC</h4>
              <p className="text-gray-700 text-sm">
                India&apos;s Largest Industrial Corridor
              </p>
            </div>

            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">🚂</div>
              <h4 className="text-lg font-bold mb-2">
                Dedicated Freight Corridor
              </h4>
              <p className="text-gray-700 text-sm">
                High-Speed National Freight Network
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Invest in Dholera Section */}
      <div className="bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-4">
            Why Invest in Dholera?
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10 text-center max-w-3xl mx-auto">
            Investing in Dholera attracts attention because the city is being
            built around long-term infrastructure, industrial growth, and
            strategic connectivity. It is not just a land story; it is an
            infrastructure-led development story. Here are the strongest reasons
            why Dholera investment stands out:
          </p>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reason 1 */}
            <div className="border-l-4 border-[#d7b56d] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Strategic Location
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Dholera enjoys a highly strategic location in Gujarat, making it
                one of the most promising emerging investment destinations in
                India. Its planned connectivity with Ahmedabad and other major
                industrial corridors increases its importance for business,
                logistics, trade, and future urban growth. With road, airport,
                sea port, and railway connectivity, Dholera is being seen as a
                gateway for long-term development and economic expansion.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="border-l-4 border-[#d7b56d] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                India&apos;s First Planned Greenfield Smart City
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Dholera is India&apos;s first planned greenfield smart city,
                developing with a modern vision from scratch. Unlike other
                cities that expand in an unstructured way, Dholera is being
                designed with planned roads, utility networks, industrial zones,
                residential areas, and plug &amp; play infrastructure. This
                planned development model creates strong potential for
                sustainable growth, better livability, and organized urban
                expansion.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="border-l-4 border-[#d7b56d] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Major Companies in Dholera
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Many big companies have invested in Dholera such as Tata
                Electronics, Tata Chemicals, ReNew, Polycab India, Jabil, and
                more. With investments exceeding ₹3 lakh crore, Dholera SIR is
                evolving into a long-term hub for advanced manufacturing, clean
                energy, and planned urban infrastructure.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="border-l-4 border-[#d7b56d] pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Future-Ready Urban Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Dholera is not just being developed as an industrial zone, but
                as a future-ready smart city built for the next generation. Its
                vision includes modern infrastructure, better mobility,
                efficient urban planning, integrated utilities, and a strong
                environment for business growth. This future-focused approach
                makes Dholera appealing to investors who want to be part of a
                location that is planned for tomorrow&apos;s economy, urban
                lifestyle, and industrial transformation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-[#151f28] mb-3">
                🚀 Ready to Invest in Dholera SIR?
              </h2>
              <p className="text-gray-600 text-lg">
                Get expert guidance and exclusive investment opportunities
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="tel:+919958993549"
                className="bg-[#d3b36b] text-white flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaPhone className="rotate-90" /> Call Now
              </Link>
              <Link
                href="https://wa.me/919958993549?text=Hi"
                className="border-2 border-[#151f28] text-[#d3b36b] flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-semibold hover:bg-[#caac66] hover:text-white transition-all duration-300"
              >
                <FaWhatsapp /> WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — Sidebar + Blog Grid */}
      <div className="bg-gray-50 px-4 py-12">
        <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
          {/* Left Sidebar */}

          {/* Blog Grid */}
          <BlogSlider posts={safePosts} />
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-[#151f28] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Dholera SIR
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest dholera investment
            opportunities and updates.
          </p>
          <Link
            href="/contact"
            className="bg-[#b69b5e] hover:bg-[#d3b36b] text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
