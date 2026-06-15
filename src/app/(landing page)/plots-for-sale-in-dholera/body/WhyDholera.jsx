import React from "react";

const highlights = [
  {
    title: "India's First Planned Smart City",
    body: "Dholera SIR is a government-planned city under the DMIC corridor, ensuring structured development, better planning, and long-term credibility.",
  },
  {
    title: "Strong Infrastructure Push",
    body: "Major projects like the Ahmedabad-Dholera Expressway, Dholera International Airport, and Tata Semiconductor Plant are improving connectivity and driving real demand.",
  },
  {
    title: "₹6 Lakh Crore Investment",
    body: "Backed by Fortune 500 companies, ₹6 lakh crore investment is accelerating Dholera's development. Dholera continues to attract buyer interest.",
  },
  {
    title: "Early-Stage Investment Opportunity",
    body: "Dholera is still in a developing phase, allowing investors to enter at lower prices with strong long-term potential.",
  },
];

function HighlightCard({ title, body }) {
  return (
    <button className="text-left w-full rounded-lg border flex flex-col gap-2 transition-all duration-250 p-[clamp(0.75rem,2vw,1.25rem)] border-[#d3b36b] bg-[#d3b36b]/5 hover:border-[#d3b36b]/60">
      <span className="text-[clamp(0.95rem,1.4vw,1.15rem)] font-semibold leading-snug text-gray-900">
        {title}
      </span>
      <span className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed text-gray-600">
        {body}
      </span>
    </button>
  );
}

export default function WhyDholera() {
  return (
    <section className="bg-white py-[calc(0.5rem+2vw)]" id="dholera">
      <div className="px-[clamp(1rem,4vw,2.5rem)]">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-[clamp(1rem,4vw,2rem)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#d3b36b]" />
            <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-[#d3b36b] leading-tight max-w-5xl mx-auto">
              Dholera Smart City{" "}
              <span className="text-black">: Shaping India’s Urban Future</span>
            </h2>
            <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#d3b36b]" />
          </div>
        </div>

        {/* Body Copy */}
        <div className="max-w-7xl mx-auto text-center mb-[clamp(1rem,2.5vw,1.75rem)]">
          <p className="text-[clamp(0.875rem,1.1vw,1rem)] text-gray-800 leading-relaxed">
            Dholera Smart City is India’s first greenfield smart city under the
            Delhi-Mumbai Industrial Corridor (DMIC), located near Ahmedabad.
            Planned as a future-ready hub, it features modern infrastructure,
            industrial zones, wide roads, and smart governance systems. With
            major developments like Dholera International Airport, a large solar
            park, and active industrial areas, it is emerging as one of
            Gujarat’s most important growth regions.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-[clamp(0.5rem,1.5vw,0.875rem)]">
          {highlights.map((item) => (
            <HighlightCard
              key={item.title}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
