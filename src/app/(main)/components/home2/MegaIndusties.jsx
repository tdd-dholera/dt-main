import React from "react";
import Avaada from "@/assets/Avaada.webp";
import Chiripal from "@/assets/Chiripal.webp";
import Dawat from "@/assets/Dawat.webp";
import HP from "@/assets/HP.webp";
import Polycab from "@/assets/Polyacab.webp";
import Renew from "@/assets/Renew.webp";
import TATA from "@/assets/TATA chemical.webp";
import Torrent from "@/assets/Torrent.webp";
import Vedanta from "@/assets/Vedanta.webp";
import Image from "next/image";
import bg from "@/assets/pexels2.jpg";
import Cubic from "@/assets/Cubic.webp";

export default function MegaIndustries() {
  const companies = [
    { name: "Avaada", logo: Avaada },
    { name: "Chiripal", logo: Chiripal },
    { name: "Cubic", logo: Cubic },
    { name: "Dawat", logo: Dawat },
    { name: "HP", logo: HP },
    { name: "Polycab", logo: Polycab },
    { name: "Renew", logo: Renew },
    { name: "TATA Chemicals", logo: TATA },
    { name: "Torrent", logo: Torrent },
    { name: "Vedanta", logo: Vedanta },
  ];

  // Duplicate the array to create seamless looping
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <>
      <div className="relative py-8">
        <Image
          src={bg}
          alt="Background Image"
          fill
          className="absolute inset-0 -z-10 opacity-30 object-cover"
        />
        <div className=" max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-[28px] font-bold text-[#151f28]">
              Mega Industries Investment in Dholera SIR
            </h3>
            <div className="w-24 h-1 mt-4 mb-4 bg-yellow-600 mx-auto"></div>
          </div>

          <div className="bg-gray-50 p-8 text-justify rounded-lg">
            <p className=" leading-relaxed">
              Dholera Smart City is emerging as an industrial powerhouse in
              Gujarat. The Tata Semiconductor Plant is boosting India’s
              electronics sector, while renewable energy hubs are making Dholera
              SIR a leader in green energy. The Ahmedabad Dholera Expressway and
              Dholera International Airport is unlocking global connectivity.
              Alongside, activation areas, town planning schemes, and water
              treatment projects ensure sustainable urban development making
              property in Dholera Smart City one of the best investment choices
              in India.
            </p>
            {/* <p className="text-lg leading-relaxed">
            <span className="font-semibold">
              Dholera is fast emerging as India's industrial powerhouse.
            </span>{" "}
            With giants like{" "}
            <span className="font-semibold">
              Tata, Vedanta-Foxconn, Renew Power
            </span>{" "}
            &amp; many more investing in land and infrastructure, the region is
            poised to become a{" "}
            <span className="font-semibold">
              global manufacturing and semiconductor hub 
            </span>
          </p> */}
            {/*  <span className="text-blue-600">
              <a href="/DholeraSIR/mega-industries"> Read More</a>
            </span> */}
          </div>

          <div className="marquee-container py-8">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {duplicatedCompanies.map((company, index) => (
                <div
                  key={index}
                  className="mx-8 flex-shrink-0 flex items-center justify-center"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                  /*   width={160}
                    height={80} */
                    className="object-contain w-40 h-28 "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
