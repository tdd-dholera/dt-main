import React from 'react'
import Image from "next/image";
import residential from "@/assets/bulkLand/residential-bulk-land-mobile.webp"
import industial from "@/assets/bulkLand/industrial-bulk-land-mobile.webp";
import cityCenter from "@/assets/bulkLand/city-centre-bulk-land-mobile.webp"
import knowledgeIT from "@/assets/bulkLand/knowledge-it-bulk-land-mobile.webp"
import HAC from "@/assets/bulkLand/high-access-corridor-bulk-land-mobile.webp"
import sport from "@/assets/bulkLand/recreation-sports-bulk-land-mobile.webp"

// Function 1: All properties except residential
export const getResidentialLinks = () => {
  return [
    {
      id: 1,
      image: industial,
      title: "Industrial Zone",
      area: "28311.75 sq. yards",
      price: "85,00,000",
      link: "/bulk-land/industrial"
    },
    {
      id: 2,
      image: cityCenter,
      title: "City Centre Zone",
      area: "1678.045 sq. yards",
      price: "58,75,000",
      link: "/bulk-land/city-centre"
    },
    {
      id: 3,
      image: knowledgeIT,
      title: "Knowledge & IT Zone",
      area: "3039.32 sq. yards",
      price: "72,25,000",
      link: "/bulk-land/knowledge-it"
    },
    {
      id: 4,
      image: HAC,
      title: "High Access Corridor Zone",
      area: "6091.41 sq. yards",
      price: "41,80,000",
      link: "/bulk-land/high-access-corridor"
    },
    {
      id: 5,
      image: sport,
      title: "Recreation, Sports & Entertainment Zone",
      area: "11120.45 sq. yards",
      price: "48,50,000",
      link: "/bulk-land/recreation-sports"
    }
  ];
};

// Function 2: All properties except industrial
export const getIndustrialLinks = () => {
  return [
    {
      id: 1,
      image: residential,
      title: "Residential Zone",
      area: "24167.55 Sq. Yards",
      price: "45,00,000",
      link: "/bulk-land/residential"
    },
    {
      id: 2,
      image: cityCenter,
      title: "City Centre Zone",
      area: "1678.045 sq. yards",
      price: "58,75,000",
      link: "/bulk-land/city-centre"
    },
    {
      id: 3,
      image: knowledgeIT,
      title: "Knowledge & IT Zone",
      area: "3039.32 sq. yards",
      price: "72,25,000",
      link: "/bulk-land/knowledge-it"
    },
    {
      id: 4,
      image: HAC,
      title: "High Access Corridor Zone",
      area: "6091.41 sq. yards",
      price: "41,80,000",
      link: "/bulk-land/high-access-corridor"
    },
    {
      id: 5,
      image: sport,
      title: "Recreation, Sports & Entertainment Zone",
      area: "11120.45 sq. yards",
      price: "48,50,000",
      link: "/bulk-land/recreation-sports"
    }
  ];
};

// Function 3: All properties except cityCenter
export const getCityCenterLinks = () => {
  return [
    {
      id: 1,
      image: residential,
      title: "Residential Zone",
      area: "24167.55 Sq. Yards",
      price: "45,00,000",
      link: "/bulk-land/residential"
    },
    {
      id: 2,
      image: industial,
      title: "Industrial Zone",
      area: "28311.75 sq. yards",
      price: "85,00,000",
      link: "/bulk-land/industrial"
    },
    {
      id: 3,
      image: knowledgeIT,
      title: "Knowledge & IT Zone",
      area: "3039.32 sq. yards",
      price: "72,25,000",
      link: "/bulk-land/knowledge-it"
    },
    {
      id: 4,
      image: HAC,
      title: "High Access Corridor Zone",
      area: "6091.41 sq. yards",
      price: "41,80,000",
      link: "/bulk-land/high-access-corridor"
    },
    {
      id: 5,
      image: sport,
      title: "Recreation, Sports & Entertainment Zone",
      area: "11120.45 sq. yards",
      price: "48,50,000",
      link: "/bulk-land/recreation-sports"
    }
  ];
};

// Function 4: All properties except knowledgeIT
export const getKnowledgeITLinks = () => {
  return [
    {
      id: 1,
      image: residential,
      title: "Residential Zone",
      area: "24167.55 Sq. Yards",
      price: "45,00,000",
      link: "/bulk-land/residential"
    },
    {
      id: 2,
      image: industial,
      title: "Industrial Zone",
      area: "28311.75 sq. yards",
      price: "85,00,000",
      link: "/bulk-land/industrial"
    },
    {
      id: 3,
      image: cityCenter,
      title: "City Centre Zone",
      area: "1678.045 sq. yards",
      price: "58,75,000",
      link: "/bulk-land/city-centre"
    },
    {
      id: 4,
      image: HAC,
      title: "High Access Corridor Zone",
      area: "6091.41 sq. yards",
      price: "41,80,000",
      link: "/bulk-land/high-access-corridor"
    },
    {
      id: 5,
      image: sport,
      title: "Recreation, Sports & Entertainment Zone",
      area: "11120.45 sq. yards",
      price: "48,50,000",
      link: "/bulk-land/recreation-sports"
    }
  ];
};

// Function 5: All properties except HAC
export const getHACLinks = () => {
  return [
    {
      id: 1,
      image: residential,
      title: "Residential Zone",
      area: "24167.55 Sq. Yards",
      price: "45,00,000",
      link: "/bulk-land/residential"
    },
    {
      id: 2,
      image: industial,
      title: "Industrial Zone",
      area: "28311.75 sq. yards",
      price: "85,00,000",
      link: "/bulk-land/industrial"
    },
    {
      id: 3,
      image: cityCenter,
      title: "City Centre Zone",
      area: "1678.045 sq. yards",
      price: "58,75,000",
      link: "/bulk-land/city-centre"
    },
    {
      id: 4,
      image: knowledgeIT,
      title: "Knowledge & IT Zone",
      area: "3039.32 sq. yards",
      price: "72,25,000",
      link: "/bulk-land/knowledge-it"
    },
    {
      id: 5,
      image: sport,
      title: "Recreation, Sports & Entertainment Zone",
      area: "11120.45 sq. yards",
      price: "48,50,000",
      link: "/bulk-land/recreation-sports"
    }
  ];
};

// Function 6: All properties except sport
export const getSportLinks = () => {
  return [
    {
      id: 1,
      image: residential,
      title: "Residential Zone",
      area: "24167.55 Sq. Yards",
      price: "45,00,000",
      link: "/bulk-land/residential"
    },
    {
      id: 2,
      image: industial,
      title: "Industrial Zone",
      area: "28311.75 sq. yards",
      price: "85,00,000",
      link: "/bulk-land/industrial"
    },
    {
      id: 3,
      image: cityCenter,
      title: "City Centre Zone",
      area: "1678.045 sq. yards",
      price: "58,75,000",
      link: "/bulk-land/city-centre"
    },
    {
      id: 4,
      image: knowledgeIT,
      title: "Knowledge & IT Zone",
      area: "3039.32 sq. yards",
      price: "72,25,000",
      link: "/bulk-land/knowledge-it"
    },
    {
      id: 5,
      image: HAC,
      title: "High Access Corridor Zone",
      area: "6091.41 sq. yards",
      price: "41,80,000",
      link: "/bulk-land/high-access-corridor"
    }
  ];
};

// Property Card Component - Next.js compatible
const PropertyCard = ({ image, title, area, price, link }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 md:p-6">
        {/* Title */}
        <h3 className="text-lg  font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>
        
        {/* Area */}
        <div className="flex items-center mb-3">
          <span className="text-sm  text-gray-600 font-medium">
            Area: <span className="text-gray-800 font-semibold">{area}</span>
          </span>
        </div>
        
        {/* Price */}
        {/* <div className="flex items-center mb-4">
          <span className="text-lg  font-bold text-gray-900">
            ₹{price}
          </span>
        </div> */}
        
        {/* Read More Button */}
        <a 
          href={link}
          className="w-full flex items-center justify-between px-4 py-2 md:py-3 rounded-lg border-2 border-[#deae3c] text-[#deae3c] font-semibold hover:bg-[#deae3c] hover:text-white transition-all duration-300 group"
        >
          <span className="text-sm ">Read More</span>
          <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Interlink Component
const Interlink = ({ properties, title = "Related Properties" }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className=" py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Explore other investment opportunities in Dholera SIR
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            image={property.image}
            title={property.title}
            area={property.area}
           
            link={property.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Interlink;