import React, { useState } from "react";
import { motion } from "framer-motion";

const DholeraFeaturesDark = () => {
  const features = [
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 shadow-lg shadow-yellow-400/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#d8b66d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      ),
      title:
        "Recognition as a Special Economic Zone (SEZ) and Employment Opportunities",
      content:
        "Developing the Delhi-Mumbai Industrial Corridor (DMIC) is India's biggest project to be undertaken today. Dholera Smart City Gujarat has been declared as a Special Economic Zone (SEZ), meaning companies have been offered special benefits for setting up base here. Companies are being given special incentives including tax breaks, fast-track approval processes, and cheaper land leases.",
    },
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 shadow-lg shadow-yellow-400/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#d8b66d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      ),
      title: "Administration and Employment Opportunities",
      content:
        "A special Administrative and Business Tower called the ABCD building has been created for faster administrative processes. Companies like TATA and Vedanta have already marked their presence in this Gujarat smart city. TATA will set up their semiconductor manufacturing plant here which is expected to change the industry's dynamics across the world. The Dholera City Gujarat is expected to generate more than 8 lakh jobs.",
    },
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 shadow-lg shadow-yellow-400/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#d8b66d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
      title: "Real Estate Plots",
      content:
        "Dholera Smart City Gujarat is systematically planned to include dedicated residential, commercial, and industrial zones. Multiple global companies have already shown interest in setting up offices here, and Foreign Direct Investment (FDI) is expected to pour in, too. Dholera metro city residential plots are currently one of the top-ranked for investment purposes. Returns are expected to skyrocket in the next three years. From November 2022 to March 2024 alone, the land rates saw a 3X jump - a land appreciation every investor loves!",
    },
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 shadow-lg shadow-yellow-400/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#d8b66d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
      ),
      title: "India's Largest Solar Power Project",
      content:
        "In the Dholera SIR project, a special focus has been laid on renewable energies. The construction of India's largest solar project has already begun here, and it will boost not just the region's sustainable power consumption but that of many regions around it. This 4,400 MegaWatt solar power plant is said to change how energy production will look in this region. Dholera smart city is a platinum-rated green city meaning sustainability and environment-friendliness will be an integral part of it.",
    },
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 shadow-lg shadow-yellow-400/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#d8b66d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
      ),
      title: "World-class Civic Amenities",
      content:
        "Sustainable and cost-effective civic amenities will be an integral part of this smart city. While planning each amenity, inspiration has been taken from successful cities across the world like Singapore and Dubai. The Dholera smart city's global-level infrastructure will include a central cooling system for the city which will eliminate the need for individual air conditioners. The detailed planning of the water system will ensure that there is never a water shortage in the area. All water supply, electrical, and other resource lines have been laid underground to ensure hassle-free operations on the ground.",
    },
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 shadow-lg shadow-yellow-400/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#d8b66d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      ),
      title: "Towards Technology-first India",
      content:
        "To step closer towards a digital-first India, a city-wide wifi will be installed. The city will have an IoT-enabled smart infrastructure. A one-stop administration app for all administrative needs has been planned exclusively for the Dholera Smart City Gujarat.",
    },
  ];

  // State to track which cards have been expanded
  const [expandedCards, setExpandedCards] = useState({});

  // Function to toggle expanded state for a card
  const toggleReadMore = (index) => {
    setExpandedCards({
      ...expandedCards,
      [index]: !expandedCards[index],
    });
  };

  // Function to get truncated content (about 5-6 lines)
  const getTruncatedContent = (content) => {
    // About 150-200 characters is roughly 5-6 lines depending on container width
    return content.slice(0, 180) + (content.length > 180 ? "..." : "");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(253, 224, 71, 0.1), 0 10px 10px -5px rgba(253, 224, 71, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const contentVariants = {
    collapsed: { height: "auto", opacity: 1 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "6rem",
      transition: {
        delay: 0.4,
        duration: 0.6,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="w-full bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="md:text-center max-sm:ml-7 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-[#d8b66d] mb-6"
            variants={titleVariants}
          >
            Key Features That Make Dholera a Prime Investment
          </motion.h3>
          <motion.div
            className="w-24 h-1 bg-[#d8b66d] mx-auto mb-8"
            variants={underlineVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.5, duration: 0.8 },
            }}
            viewport={{ once: true }}
          >
            Discover why Dholera Smart City is becoming one of India's most
            promising investment destinations with these outstanding features
            and developments.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#151f28] rounded-lg shadow-lg p-6 transition-all duration-300 border border-gray-700"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div className="mb-4" variants={iconVariants}>
                {feature.icon}
              </motion.div>
              <motion.h6
                className="text-xl font-bold mb-3 text-[#d8b66d]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {feature.title}
              </motion.h6>
              <motion.div
                className="text-gray-300"
                variants={contentVariants}
                initial="collapsed"
                animate={expandedCards[index] ? "expanded" : "collapsed"}
              >
                {feature.title === "Real Estate Plots" ? (
                  <>
                    {expandedCards[index] ? (
                      <>
                        Dholera Smart City Gujarat is systematically planned to
                        include dedicated residential, commercial, and
                        industrial zones. Multiple global companies have already
                        shown interest in setting up offices here, and Foreign
                        Direct Investment (FDI) is expected to pour in, too.
                        <br />
                        <br />
                        Dholera metro city residential plots are currently one
                        of the top-ranked for investment purposes. Returns are
                        expected to skyrocket in the next three years. From
                        November 2022 to March 2024 alone, the land rates saw a{" "}
                        <motion.span
                          className="text-[#d8b66d] font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          3X jump
                        </motion.span>{" "}
                        - a land appreciation every investor loves!
                      </>
                    ) : (
                      getTruncatedContent(
                        "Dholera Smart City Gujarat is systematically planned to include dedicated residential, commercial, and industrial zones. Multiple global companies have already shown interest in setting up offices here, and Foreign Direct Investment (FDI) is expected to pour in, too."
                      )
                    )}
                  </>
                ) : feature.title ===
                  "Administration and Employment Opportunities" ? (
                  <>
                    {expandedCards[index] ? (
                      <>
                        A special Administrative and Business Tower called the{" "}
                        <motion.em
                          className="text-yellow-200"
                          whileHover={{ scale: 1.05 }}
                        >
                          ABCD
                        </motion.em>{" "}
                        building has been created for faster administrative
                        processes. Companies like TATA and Vedanta have already
                        marked their presence in this Gujarat smart city. TATA
                        will set up their semiconductor manufacturing plant here
                        which is expected to change the industry's dynamics
                        across the world. The Dholera City Gujarat is expected
                        to generate more than 8 lakh jobs.
                      </>
                    ) : (
                      getTruncatedContent(
                        "A special Administrative and Business Tower called the ABCD building has been created for faster administrative processes. Companies like TATA and Vedanta have already marked their presence in this Gujarat smart city."
                      )
                    )}
                  </>
                ) : (
                  <>
                    {expandedCards[index]
                      ? feature.content
                      : getTruncatedContent(feature.content)}
                  </>
                )}
                {feature.content.length > 180 && (
                  <motion.button
                    onClick={() => toggleReadMore(index)}
                    className="mt-2 text-[#d8b66d] hover:text-yellow-300 font-medium focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedCards[index] ? "Read Less" : "Read More"}
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DholeraFeaturesDark;
