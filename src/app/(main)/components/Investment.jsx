import React from "react";
import rrt from "@/assets/rrt.webp";
import expressway from "@/assets/expressway.webp";
import dia from "@/assets/DIA.webp";
import dholera from "@/assets/dhoelra.png";
import Image from "next/image";
import Link from "next/link";
import DholeraFeatures from "./DF";
import bg from "@/assets/pexels2.jpg";

const DholeraInvestmentGuide = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-30"
      />
      <section className="relative bg-[#151f28] text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-4xl max-sm:ml-7 md:text-center font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-2">
            Why Invest in{" "}
            <span className="text-[#d8b66d]">Dholera Smart City</span>
          </h2>
          <p className="max-w-7xl mt-5 max-sm:ml-7 md:text-center text-xl">
            Every bit of Gujarat’s Dholera smart city has been planned
            meticulously with a futuristic vision. Its foundation stone was set
            by the then Prime Minister, Shri Manmohan Singh. Alongside being
            spread across an area of 920 sq.km., it will be developed such that
            it is highly self-sustaining. <br />
            Some key highlights of the project that make it the prime investment
            project today are -
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6 sm:px-3 lg:px-8">
        <div className="md:text-center relative mb-12">
        <Image
          src={bg}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-30"
        />
          <h3 className="text-3xl font-bold text-gray-900">
            Unparalleled Connectivity
          </h3>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic connections at every level make Dholera a transportation
            hub of the future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <Image
                src={rrt}
                alt="Dholera Metro Train"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-0 left-0 text-white text-xl font-bold p-4">
                Intracity Connectivity
              </h3>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Dholera Metro Train
              </h4>
              <p className="text-gray-600">
                Dholera SIR project is well-connected both internally and
                externally. The region is planned to include all modern
                transport facilities like black-top roads, metro rails, smart
                buses, and more. The high-speed metro rail lines planned
                throughout the region are expected to fast-track the city’s
                daily commute.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <Image
                src={dia}
                alt="Dholera International Airport"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-0 left-0 text-white text-xl font-bold p-4">
                Global Connectivity
              </h3>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Dholera International Airport
              </h4>
              <p className="text-gray-600">
                Dholera Smart City Gujarat’s own international airport is also
                being developed and is expected to commence operations by
                December 2026. It will be equipped to handle cargo as well as
                passenger airplanes, both domestic and international.
              </p>
            </div>
          </div>

          {/* Card 3 */}

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <Image
                src={expressway}
                alt="Dholera-Ahmedabad Expressway"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="absolute bottom-0 left-0 text-white text-xl font-bold p-4">
                Intercity Connectivity
              </h3>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Central Spine Road
              </h4>
              <p className="text-gray-600">
                To speed up the connection between the smart city Dholera and
                Ahmedabad, the government has built a special 109 km long
                express highway, which is expected to be completed in the next
                three months. The central spine road, a six-lane expressway, is
                the first phase of a much larger project of the government.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DholeraFeatures />

      {/* Overview Section */}
      <Image
              src={bg}
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 -z-10 opacity-30"
            />
      <section className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Strategic Location
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Dholera City Gujarat is located near the Gulf of Khambhat which
                gives it easy port access. This has skyrocketed its chances of
                becoming one of the largest trading and manufacturing hubs in
                the world in the near future. Alongside Ahmedabad, its closest
                cities include Surat, Vadodara, Rajkot, and Gandhinagar.
              </p>
            </div>
            <div className="bg-blue-50 p-8 md:p-10 flex flex-col justify-center">
              <div className="bg-white rounded-xl shadow-md p-6 relative">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-600 text-white rounded-full px-4 py-1 text-sm font-semibold">
                  Key Project
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  PM Narendra Modi's Dream Project
                </h4>
                <p className="text-gray-600 text-md">
                  For PM Modi, Dholera SIR is a dream project. Dholera SIR has
                  the potential to redefine the country’s urban and industrial
                  landscape alongside setting a benchmark for all other cities
                  not just pan-India but also globally. Dholera Smart City
                  Gujarat is a symbol of PM Modi’s ambitious vision for India’s
                  future. Modiji has taken a personal interest in the planning,
                  investment and technological integration of the Dholera Smart
                  City Gujarat project. Smart city Dholera is a key part of the
                  government's ‘Make in India’ initiative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity Section */}

      {/* Key Features */}

      {/* Global Competition */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Heritage and Global Competition Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-2xl p-8 md:p-10 mb-16 border border-blue-100">
          <div className="md:flex items-center gap-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
                <Image
                  src={dholera}
                  alt="Dholera Road Connectivity"
                  className="w-full h-auto object-cover rounded-xl shadow-lg relative z-10"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Competing on a Global Scale
                </span>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mt-2 rounded-full"></div>
              </h2>
              <p className="text-gray-700 mb-4">
                Not just today, but from ancient times, right from the Harappan
                civilization, this region has been known for its rich trade
                history. With a well-planned greenfield approach, Dholera city
                will set a precedent for other cities across the country. It is
                to become the prime example of how Modern India’s smart cities
                will be. It is expected to give competition to Dubai and China’s
                manufacturing hubs considering its global infrastructure and
                high-return investment opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A city needs three crucial factors to make strides in
                development - employment generation, high connectivity, and
                future planning; and Gujarat's Dholera, India's first planned
                smart city, will be a standout in each of them. Due to its
                futuristic and sustainable approach, it is ranked as the top
                destination for investment in the country today.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Context & Future Vision Section */}

        {/* Investment Opportunity Section */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl py-6 shadow-2xl p-8 md:p-10 mb-16 border border-amber-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full -mt-10 -mr-10 blur-2xl"></div>
          <div className="md:flex items-center gap-10 relative z-10">
            <div className="md:w-3/5">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <span className="bg-clip-text text-[#d8b66d]">
                  A Golden Investment Opportunity
                </span>
                <div className="w-20 h-1 bg-[#d8b66d] mt-2 rounded-full"></div>
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Missing out on investing in the Dholera SIR would be missing out
                on a fortune. Because in reality, investment is the art of
                investing in the right place at the right time!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects">
                  <button className="px-6 py-3 bg-[#d8b66d] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                    Explore Investment Options
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 mt-8 md:mt-0">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#d8b66d]">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-[#d8b66d]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#151f28]">
                    Why Invest Now?
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#d8b66d] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Early investor advantage
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#d8b66d] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Government-backed project
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#d8b66d] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Potential for 3X growth
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-[#d8b66d] mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Limited-time special pricing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Call to Action */}
      <section className="bg-[#151f28] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Begin Your Investment Journey in Dholera
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            We are Dholera Times, your trusted partner for private plotting and
            all kinds of real estate investment opportunities in the Dholera
            smart city.
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:text-lg"
            >
              Explore Investment Options
            </Link>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            Contact Dholera Times - the most trusted real estate partner for
            investment opportunities in Dholera Smart City
          </p>
        </div>
      </section>
      <section className="bg-[#151f28]">
        <section className="py-5 px-4 text-white">
          <div className="max-w-7xl mx-auto">
            <h5 className="text-3xl font-bold mb-10 text-center text-[#d8b66d]">
              Major Highlights of Dholera Smart City
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>Massive 920 sq. km. smart city</div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>High-return investment</b> in residential, commercial, and
                  industrial plots
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Seamless intracity commute</b> with metro connectivity
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Central Spine Road Expressway</b> linking directly to
                  Ahmedabad
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Strategic location</b> near major ports for global trade
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Dholera International Airport</b> ensuring global
                  connectivity
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Exclusive incentives</b> for industrial projects
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>World-class civic amenities</b> for a futuristic lifestyle
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>India’s largest solar power project,</b> driving renewable
                  energy initiatives
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>PM Modi’s visionary project,</b> shaping India's smart city
                  future
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Emerging semiconductor industry hub</b>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>
                    An integral part of the Delhi-Mumbai Industrial Corridor
                    (DMIC)
                  </b>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Fully digitized administration</b> for efficient governance
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>2X</b> the size of Delhi and <b>6X</b> that of Shanghai
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  One of the top 12 fastest-growing cities across the world
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  <b>Proximity to megacities</b> - Ahmedabad, Vadodara,
                  Bhavnagar
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  Close to Gujarat International Finance Tech <b>(GIFT) city</b>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  Home to one of the largest upcoming
                  <b> semiconductor projects</b>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  India’s
                  <b> greenfield smart city </b>project
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  Currently ranked as
                  <b> India’s best land investment opportunity</b>with high
                  returns
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-[#d8b66d] font-bold text-xl">✓</div>
                <div>
                  Expected to be one of the
                  <b> biggest industrial hubs</b> across the world once complete
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
    </div>
  );
};

export default DholeraInvestmentGuide;
