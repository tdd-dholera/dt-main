import Image from "next/image";
import img1 from "@/assets/ad-page/icons/bookmyassets-365-days-assistance-icon.svg";
import img2 from "@/assets/ad-page/icons/bookmyassets-buy-back-assistance-icon.svg";
import img3 from "@/assets/ad-page/icons/bookmyassets-due-diligence-team-icon.svg";
import img4 from "@/assets/ad-page/icons/bookmyassets-immediate-sale-deed-icon.svg";
import img5 from "@/assets/ad-page/icons/bookmyassets-resale-support-icon.svg";
import ROI from "@/assets/ad-page/champions-of-dholera-real-estate-bookmyassets.webp";

const icons = [
  { id: 1, icon: img3, label: "Due Diligence Team" },
  { id: 2, icon: img4, label: "Immediate Sale Deed" },
  { id: 3, icon: img1, label: "365 Days Site Visit" },
  { id: 4, icon: img5, label: "Resale Support" },
  { id: 5, icon: img2, label: "Buyback Assistance" },
];

const COUNTERS = [
  { value: "7+ Projects", label: "Successfully Sold Out" },
  { value: "2 Lakh+ Sq. Yd", label: "Dholera Land Sold" },
  { value: "957+ Plots", label: "Registry Delivered" },
  { value: "561+ Clients", label: "Investor Client Base" },
];

export default function WhyBMA() {
  return (
    <section className="bg-white py-[clamp(0.75rem,6vw,1rem)]" id="Why-BMA">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-[clamp(1rem,4vw,2rem)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#d3b36b]" />
            <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
              Why Invest With{" "}
              <span className="text-[#d3b36b]">Dholera Times</span>
            </h2>
            <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#d3b36b]" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-4 md:gap-6">
          {/* Left — 40% */}
          <div className="w-full md:w-2/5 md:pb-4">
            <div className="relative w-full aspect-[5/4] rounded-lg overflow-hidden ">
              <Image
                src={ROI}
                alt="Dholera SIR — India's first semiconductor hub"
                fill
                sizes=""
                className="object-contain aspect-[5/4] h-full w-auto"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-center space-y-6">
              Dholera Times is the trusted of Smart investors looking for
              Dholera plots for sale with location clarity, expert guidance and
              long-term potential. We explore developing and high growth
              potential land in Dholera to deliver future growth potential to our
              clients with 100% trust and transparency.
            </p>
            <div className="py-4">
              <div className="px-[calc(0.5rem+1vw)] max-w-7xl mx-auto">
                <div className="grid grid-cols-2 gap-3">
                  {COUNTERS.map(({ value, label }) => (
                    <div
                      key={label}
                      className="
            flex flex-col justify-center items-center
            h-[120px] sm:h-auto
            p-4 sm:p-[calc(0.75rem+0.2vw)]
            bg-white rounded-2xl shadow-md
            hover:shadow-xl transition-shadow
          "
                    >
                      <div className="text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#d3b36b] mb-2">
                        {value}
                      </div>
                      <p className="text-xs sm:text-sm md:text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-700 font-medium text-center leading-snug">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center mb-[clamp(1rem,4vw,2rem)]">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
              A Name You Can Trust <span className="text-[#d3b36b]"></span>
            </h2>
          </div>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {icons.map((item, index) => {
            const isLastOdd =
              index === icons.length - 1 && icons.length % 2 !== 0;
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center gap-3 p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow
                  ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <div className="relative w-[clamp(7rem,8vw,9rem)] h-[clamp(7rem,8vw,9rem)]">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-[clamp(0.75rem,1.5vw,0.95rem)] font-medium text-gray-700">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
