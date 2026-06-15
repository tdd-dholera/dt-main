"use client";
import React, { useState } from "react";
import PopupForm from "../components/PopupForm";
import residentialIcon from "@/assets/icons/residential-bulk-land-icon.svg"
import commercialIcon from "@/assets/icons/commercial-bulk-land-icon.svg"
import grwothIcon from "@/assets/icons/high-growth-potential-icon.svg"
import industrialIcon from "@/assets/icons/industrial-bulk-land-icon.svg"
import Image from "next/image";

const AboutBulkLand = () => {
  const [brochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const openBrochureForm = () => setIsBrochureFormOpen(true);
  const closeBrochureForm = () => setIsBrochureFormOpen(false);

  const cards = [
    {
      icon: residentialIcon,
      title: "Residential Planning",
      description:
        "Bulk land options suitable for plotted development and township-style planning",
    },
    {
      icon: commercialIcon,
      title: "Commercial Use",
      description:
        "Land options for buyers exploring business, retail, or service-based development.",
    },
    {
      icon: industrialIcon,
      title: "Industrial Zone",
      description:
        "Location guidance for land near industrial and infrastructure-linked growth areas.",
    },
    {
      icon: grwothIcon,
      title: "Long-Term Holding",
      description:
        "Suitable for investors looking at long-term land banking in Dholera’s growth corridor.",
    },
  ];

  const CardItem = ({ icon, title, description }) => (
    <div className="shadow-xl space-y-2 rounded-xl border-[#d3b36b] border-2 p-4">
      <div className="flex gap-4 justify-center items-center text-[#d3b36b] text-xl">
        <Image
          src={icon}
          alt={title}
          className="w-[30px] h-[30px] flex justify-center items-center"
        />
        <p>{title}</p>
      </div>
      <p className="text-left">{description}</p>
    </div>
  );
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="p-2 flex flex-col justify-center items-center">
          <p className="text-left max-w-4xl mx-auto px-4 leading-relaxed">
            Dholera SIR is becoming a key location for investors, developers,
            and business groups looking for large land parcels in a planned
            smart city region. With improving connectivity, infrastructure
            development, and industrial activity around Dholera, bulk land can
            be considered for residential planning, commercial use, industrial
            interest, and long-term land holding.
            <br />
            Explore location-based bulk land options with guidance on access,
            nearby development, land purpose, documentation clarity, and site
            visit support.
          </p>
          <div className=" flex justify-center items-center gap-8 w-full p-4 translate-y-4">
            <button
              onClick={openBrochureForm}
              className="bg-[#d3b36b] w-full p-2 rounded-xl shadow-xl  hover:scale-110 duration-300 whitespace-nowrap"
            >
              Get Bulk Land Deals
            </button>
          </div>
        </div>
        <div className="p-2">
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map((card, index) => (
              <CardItem key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
      {brochureFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <PopupForm
            title="Get Bulk Land Deals in Dholera"
            buttonName="Get A Call Back"
            onClose={closeBrochureForm}
          />
        </div>
      )}
    </section>
  );
};

export default AboutBulkLand;
