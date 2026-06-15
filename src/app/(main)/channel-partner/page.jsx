"use client";
import { useState } from "react";
import ChannelPartnerForm from "./channelPartnerForm";
import supoort from "@/assets/icons/dedicated-support-team-icon.webp";
import partner from "@/assets/icons/partner-first-culture-icon.webp";
import training from "@/assets/icons/training-and-onboarding-icon.webp";
import inventory from "@/assets/icons/registry-ready-inventory-icon.webp";
import sales from "@/assets/icons/white-labeled-sales-kit-icon.webp";
import Image from "next/image";
import hero from "@/assets/channelpartner.webp";
import heroM from "@/assets/channel-partner-mob.-view.webp";

export default function ChannelPartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <title>Channel Partner Program | Dholera Smart City</title>
      <meta
        name="description"
        content="Join Dholera Times as a channel partner for verified Dholera Smart City plots. Get transparent deals, AUDA approvals, and on-time commissions."
      />
      <meta
        name="keywords"
        content="Dholera Smart City, Dholera Gujarat, Dholera SIR, Dholera Project, Invest in Dholera, Dholera Property Investment"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/channel-partner"
      />

      <div>
        <div className="md:relative md:h-[72vh] overflow-hidden">
          <Image
            src={hero}
            alt="Dholera SIR Aerial View"
            className="w-full md:h-full h-auto object-contain md:object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-2 md:px-6">
          <div className="max-w-5xl mx-auto gap-12">
            {/* Content Column */}
            <div className=" space-y-8">
              {/* What We Offer Section */}
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-8"
                  style={{ color: "#151f28" }}
                >
                  What We Offer Our Partners
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className=" rounded-lg"
                      style={{ backgroundColor: "#d3b36b", opacity: 1 }}
                    >
                      <div className="w-11 h-11" style={{ color: "#151f28" }}>
                        <Image
                          src={sales}
                          alt="white labeled sales kit icon"
                          className="w-11 h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#151f28" }}
                      >
                        White Labeled Sales Kit
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Ready-to-use brochures, videos, pitch decks, and site
                        tour materials customized to your brand identity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div
                      className="rounded-lg"
                      style={{ backgroundColor: "#d3b36b", opacity: 1 }}
                    >
                      <div className="w-11 h-11" style={{ color: "#151f28" }}>
                        <Image
                          src={supoort}
                          alt="dedicated support team icon"
                          className="w-11 h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#151f28" }}
                      >
                        Registry Ready Inventory
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Access to verified titles with AUDA approvals, NA/NOC
                        clearance, and legally clean paperwork.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div
                      className="rounded-lg"
                      style={{ backgroundColor: "#d3b36b", opacity: 1 }}
                    >
                      <div className="w-11 h-11">
                        <Image
                          src={inventory}
                          alt="registry ready inventory icon"
                          className="w-11 h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#151f28" }}
                      >
                        Dedicated Support Team
                      </h3>
                      <p className="text-gray-600 text-sm">
                        From legal assistance to site visits, our team handles
                        the backend so you can focus entirely on clients.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div
                      className="rounded-lg"
                      style={{ backgroundColor: "#d3b36b", opacity: 1 }}
                    >
                      <div className="w-11 h-11" style={{ color: "#151f28" }}>
                        <Image
                          src={partner}
                          alt="partner first culture icon"
                          className="w-11 h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#151f28" }}
                      >
                        Partner First Culture
                      </h3>
                      <p className="text-gray-600 text-sm">
                        No favoritism, no politics just guaranteed commissions
                        paid on time, every time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 md:col-span-2">
                    <div
                      className="rounded-lg"
                      style={{ backgroundColor: "#d3b36b", opacity: 1 }}
                    >
                      <div className="w-11 h-11" style={{ color: "#151f28" }}>
                        <Image
                          src={training}
                          alt="training and onboarding icon"
                          className="w-11 h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#151f28" }}
                      >
                        Training and Onboarding
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Stay ahead with regular updates, sales training, and
                        insider insights designed to help you close faster.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Partner Section */}
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "#151f28" }}
                >
                  Why Partner with Dholera Times?
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Selling plots in Dholera Smart City has often been a challenge
                  for brokers due to unreliable developers, delayed commissions,
                  and unclear paperwork all of which erode client trust.
                  <br />
                  At Dholera Times, we are changing that narrative. We bring a
                  partner-first culture with transparent processes, verified
                  inventory, and on-time commissions, so you can focus on
                  closing sales without setbacks.
                </p>
              </div>

              {/* About WestWyn County Section */}
              <div
                className="bg-white p-4 md:p-8 rounded-xl shadow-lg border"
                style={{ borderColor: "#d3b36b", borderWidth: "1px" }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "#151f28" }}
                >
                  About WestWyn County - Your Premium Offering
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Our flagship project, WestWyn County, is a premium
                  AUDA-approved plotted development in Dholera SIR,
                  strategically located on the Fedra–Pipli Highway (100 ft
                  Road).
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#d3b36b" }}
                    ></div>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: "#151f28" }}
                      >
                        Prime Location
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Direct entry from State Highway, minutes from Expressway
                        and International Airport.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#d3b36b" }}
                    ></div>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: "#151f28" }}
                      >
                        Secure Gated Community
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Boundary wall, clear plot demarcation, and internal
                        infrastructure.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#d3b36b" }}
                    ></div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#151f28" }}
                      >
                        Exclusive Inventory
                      </h4>
                      <p className="text-gray-600 text-sm">
                        130 premium plots ranging from 150 to 325 sq. yards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#d3b36b" }}
                    ></div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#151f28" }}
                      >
                        Legal Assurance
                      </h4>
                      <p className="text-gray-600 text-sm">
                        AUDA Approved, NA/NOC obtained, 100% title clear.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Can Join Section */}
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "#151f28" }}
                >
                  Who Can Join Us?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Our Channel Partner Program is designed for professionals and
                  businesses who want to grow with Dholera Times while offering
                  clients transparent and profitable investments in Dholera
                  Smart City.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#151f28" }}
                    >
                      1
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#151f28" }}
                      >
                        Real Estate Brokers & Agents
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Independent brokers looking for reliable projects and
                        timely commissions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#d3b36b", color: "#151f28" }}
                    >
                      2
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#151f28" }}
                      >
                        Wealth Advisors & Financial Consultants
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Professionals who guide clients in safe, high-growth
                        investment options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#151f28" }}
                    >
                      3
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#151f28" }}
                      >
                        NRIs & Overseas Consultants
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Those who want to connect international buyers to
                        legally approved plots in Dholera SIR.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#d3b36b", color: "#151f28" }}
                    >
                      4
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#151f28" }}
                      >
                        Property Developers & Firms
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Businesses interested in expanding into Dholera
                        residential plots and premium projects.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#151f28" }}
                    >
                      5
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#151f28" }}
                      >
                        Influencers & Business Networks
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Anyone with a strong client base who can recommend
                        trusted real estate opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Form Column */}
      <div className="max-w-4xl mx-auto">
        <ChannelPartnerForm />
      </div>
    </div>
  );
}
