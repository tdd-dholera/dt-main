import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Plane,
  Building,
  Factory,
  Zap,
  TrendingUp,
} from "lucide-react";

const InvestmentTimeline = () => {
  const [animatedItems, setAnimatedItems] = useState([]);

  const milestones = [
    {
      year: "2025",
      multiplier: "Current",
      price: "₹6,500/sq.yd",
      title: <span>Your Investment<br className="max-sm:hidden" /> Entry Point</span>,
      description:
        "Prime opportunity to invest in India's first smart city with world-class infrastructure under development",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      year: "2027-2029",
      multiplier: "5x Returns",
      price: "₹32,500/sq.yd",
      title: "Dholera-Ahmedabad Expressway & Airport Launch",
      description:
        "Direct connectivity to Ahmedabad via expressway and inaugural commercial flights at Dholera Airport",
      icon: <Plane className="w-6 h-6" />,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      year: "2030-2032",
      multiplier: "7x Returns",
      price: "₹45,500/sq.yd",
      title: "Tata Semiconductor Operations",
      description:
        "Tata's semiconductor manufacturing facility becomes fully operational, creating massive employment and industrial growth",
      icon: <Factory className="w-6 h-6" />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      year: "2033-2035",
      multiplier: "10x Returns",
      price: "₹65,000/sq.yd",
      title: "Complete Smart City Ecosystem",
      description:
        "All TP zones operational with full smart city infrastructure, making Dholera Gujarat's prime investment destination",
      icon: <Building className="w-6 h-6" />,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedItems((prev) => {
        if (prev.length < milestones.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const InvestmentCard = ({ milestone, index, isAnimated }) => (
    <div
      className={`relative transition-all duration-700 transform ${
        isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Timeline connector - Desktop only */}
      {index < milestones.length - 1 && (
        <div className="hidden lg:block absolute top-20 left-full w-8 h-1 bg-gray-300 z-0">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-0 h-0 border-l-[8px] border-l-gray-400 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent"></div>
          </div>
        </div>
      )}

      {/* Mobile Timeline Connector - Vertical */}
      {index < milestones.length - 1 && (
        <div className="lg:hidden absolute left-1/2 top-full transform -translate-x-1/2 w-1 h-8 bg-gray-300 z-0">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-t-[8px] border-t-gray-400 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`${milestone.bgColor} ${milestone.borderColor} border-2 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8 relative z-10 w-full`}
      >
        <div className="text-center mb-4">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${milestone.color} text-white mb-3`}
          >
            {milestone.icon}
          </div>
          <div className="text-base sm:text-lg font-bold text-[#151f28]">
            {milestone.year}
          </div>
          <div
            className={`text-base sm:text-lg font-semibold ${
              milestone.color === "bg-blue-500"
                ? "text-blue-600"
                : milestone.color === "bg-green-500"
                  ? "text-green-600"
                  : milestone.color === "bg-purple-500"
                    ? "text-purple-600"
                    : "text-yellow-600"
            }`}
          >
            {milestone.multiplier}
          </div>
          <div className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
            {milestone.price}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-sm sm:text-base font-semibold text-[#151f28] mb-2">
            {milestone.title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#151f28] mb-3 sm:mb-4 px-2">
          Investment Growth Timeline
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
          Watch your investment multiply as Dholera Smart City reaches key
          development milestones
        </p>
      </div>

      <div className="relative">
        {/* Background timeline line for desktop */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gray-300 z-0"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {milestones.map((milestone, index) => (
            <InvestmentCard
              key={index}
              milestone={milestone}
              index={index}
              isAnimated={animatedItems.includes(index)}
            />
          ))}
        </div>
      </div>

      {/* Investment Summary */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">₹9.44L</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Initial Investment</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">(151 sq.yd plot)</div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
              ₹94.38L
            </div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Projected Value by 2035</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">(10x returns)</div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
              ₹84.94L
            </div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Potential Profit</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">(≈900% growth)</div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center px-2">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
            <strong>Why Dholera?</strong> India's first smart city with
            government backing, strategic location, and world-class
            infrastructure
          </p>
          {/* CTA or LEAD FORM */}
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center px-2">
          *Projections are estimates based on current development plans. Past
          performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
};

export default InvestmentTimeline;