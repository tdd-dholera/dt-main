import React from "react";
import {
  Building,
  Users,
  AreaChart,
  BadgeCheck,
  MapPin,
  FileCheck,
  Clock,
  Target,
  Eye,
  Award,
  CheckCircle,
  Phone,
  Shield,
  Search,
  FileText,
  Headphones,
} from "lucide-react";
import hero from "@/assets/consultation-image.webp";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <title>About Dholera Times | Dholera Smart City Updates</title>
      <meta
        name="description"
        content="Dholera Times offers trusted insights, project details, and investment updates about Dholera Smart City and Dholera SIR development."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera SIR, Dholera Gujarat, Dholera Project, Dholera Investment, Smart City Dholera"
      />
      <link
          rel="canonical"
          href="https://www.dholeratimes.com/about"
        />
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden bg-[#151f28]">
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 py-10">
            <h1 className="text-center text-2xl md:text-4xl text-white font-bold mb-4">
              Transforming Visions into Reality:
              <br />
              <span className="text-[#d3b36b]">About Dholera Times</span>
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Step Into India’s First Greenfield Smart City – Dholera with
              Dholera Times
            </p>
          </div>
        </div>
      </div>

      {/* Our Story & Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#151f28]">
                About Dholera Times
              </h2>
              <div className="space-y-6 text-gray-700  leading-relaxed">
                <p>
                  At <strong className="text-[#d3b36b]">Dholera Times</strong>,
                  we are redefining how people discover and understand real
                  estate opportunities in India's first greenfield smart city –
                  Dholera Smart City.
                </p>
                <p>
                  We specialize in delivering transparent, secure, and
                  growth-oriented insights on AUDA-approved projects, ensuring
                  that investors, brokers, and homebuyers access legally clear,
                  registry-ready plots with the potential for assured
                  appreciation.
                </p>
                <p>
                  With a strong focus on trust, timely updates, and an
                  investor-first approach,{" "}
                  <strong className="text-[#d3b36b]">Dholera Times</strong>{" "}
                  bridges the gap between opportunity and authentic information.
                </p>
              </div>
            </div>

            {/* Right - Value Icons */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-bold text-[#151f28] mb-2">
                  Trust & Transparency
                </h3>
                <p className="text-sm text-gray-600">
                  100% verified information
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <Award className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-bold text-[#151f28] mb-2">
                  8+ Years Of Expertise
                </h3>
                <p className="text-sm text-gray-600">Proven track record</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <FileCheck className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-bold text-[#151f28] mb-2">
                  Government-Approved
                </h3>
                <p className="text-sm text-gray-600">AUDA certified projects</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <Users className="h-12 w-12 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-bold text-[#151f28] mb-2">
                  Client-Centric Approach
                </h3>
                <p className="text-sm text-gray-600">
                  Your success is our priority
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#151f28]">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Services Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <Phone className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-semibold text-[#151f28] mb-2">
                  Consultation & Site Visits
                </h3>
                <p className="text-sm text-gray-600">
                  Expert guidance & free site visits
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <Search className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-semibold text-[#151f28] mb-2">
                  Project Selection Guidance
                </h3>
                <p className="text-sm text-gray-600">
                  Find the perfect investment
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <FileText className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-semibold text-[#151f28] mb-2">
                  Legal & Registration Support
                </h3>
                <p className="text-sm text-gray-600">
                  Complete documentation help
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <Headphones className="h-10 w-10 text-[#d3b36b] mx-auto mb-4" />
                <h3 className="font-semibold text-[#151f28] mb-2">
                  Post-sale Service & Updates
                </h3>
                <p className="text-sm text-gray-600">
                  Ongoing support & updates
                </p>
              </div>
            </div>

            {/* Right - House Image */}
            <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src={hero}
                alt="Dholera Smart City Vision"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#151f28]">
            Our Achievements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "7",
                label: "Total No. of Projects",
                icon: <Building className="h-8 w-8" />,
              },
              {
                value: "1000",
                label: "Plots Sold",
                icon: <BadgeCheck className="h-8 w-8" />,
              },
              {
                value: "400",
                label: "Happy Customers",
                icon: <Users className="h-8 w-8" />,
              },
              {
                value: "5 Lakh Sq. Yards",
                label: "Sold",
                icon: <AreaChart className="h-8 w-8" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center border hover:border-[#d3b36b] transition-colors"
              >
                <div className="text-[#d3b36b] mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#151f28] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Journey, Promise */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Mission */}
          <div className="mb-12">
            <div className="bg-[#d3b36b] p-10 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#151f28]/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="bg-[#151f28]/10 p-3 rounded-xl mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-100">
                    To make property exploration hassle-free, transparent, and
                    reliable.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-100">
                    To guide investors, NRIs, and channel partners with expert
                    insights and trusted updates.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-100">
                    To deliver long-term value through verified information on
                    premium projects in India's fastest-growing smart city.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Vision */}
            <div className="bg-[#151f28] p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-white mr-3" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">
                To become the most reliable information hub for Dholera Smart
                City – empowering buyers, investors, and businesses with
                knowledge-driven decisions that shape a smarter tomorrow.
              </p>
            </div>

            {/* Journey */}
            <div className="bg-[#151f28] p-8 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-white mr-3" />
                <h3 className="text-2xl font-bold">Our Journey</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                Born with a vision to provide clarity and authenticity,{" "}
                <strong className="text-[#d3b36b]">Dholera Times</strong> has
                grown into a trusted platform for real estate seekers. From
                ground reports and project updates to government notifications
                and market insights, our journey is built on credibility and
                continuous growth alongside Dholera Smart City's progress.
              </p>
            </div>
          </div>

          {/* Promise */}
          <div className="border-2 border-[#d3b36b] p-8 rounded-2xl bg-[#d3b36b] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-[#151f28]/10 p-3 rounded-xl mr-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Promise</h3>
            </div>
            <p className="text-white mb-6 text-lg">
              At <strong className="text-white">Dholera Times</strong>, we
              promise to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white">
                  Deliver verified updates you can trust.
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white">
                  Provide transparent guidance with no hidden agendas.
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white">
                  Keep you informed with real-time growth insights.
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#151f28] mr-3 mt-1 flex-shrink-0" />
                <span className="text-white">
                  Stand as your long-term partner in every investment decision.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
