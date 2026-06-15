"use client";
import React from "react";

const text = "NA/NOC & Title Clear | AUDA Approved | Immediate Registry | Resale & Buyback Assistance";

const Running = () => {
  return (
    <div className="w-full overflow-hidden bg-black py-2.5">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="inline-block text-[#d3b36b] px-5 py-1.5 rounded-lg shadow text-[15px] font-semibold shrink-0 mr-10">
          {text}
        </span>
        {/* duplicate for seamless loop */}
        
      </div>
    </div>
  );
};

export default Running;