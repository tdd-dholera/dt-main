"use client";
import { useState, useEffect } from "react";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PopupForm from "../../components/PopupForm";

export default function InvestmentBenefits() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate benefits every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle swipe for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    } else if (isRightSwipe) {
      setHoveredBenefit(
        (prev) => (prev - 1 + benefits.length) % benefits.length
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const updateHoveredBenefit = (index) => {
    setHoveredBenefit(index);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openModal = (benefit, index) => {
    setSelectedBenefit({ ...benefit, index });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBenefit(null);
  };

  const benefits = [
    {
      title: "Prime Location Advantage",
      icon: "📍",
      description: "Positioned at the heart of Dholera's growth corridor, near the most active sectors of Dholera SIR.",
      body: "WestWyn County offers early access to the city's fastest-developing areas. The close proximity to Ahmedabad–Dholera Expressway and the airport ensures superior accessibility, making it ideal for investors and future residents.",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "NRI-Friendly & Hassle-Free Investment",
      icon: "🌐",
      description: "Designed for NRI investors seeking secure and legally transparent options.",
      body: "With clear-title plots, registry-ready documentation, and additional support like resale and buy-back assistance*, managing investments from abroad is straightforward and reliable.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Government-Backed Smart City Infrastructure",
      icon: "🏛️",
      description: "As part of Dholera Smart City, benefits from central and state government-backed development.",
      body: "Industrial, residential, and infrastructure projects in the region ensure planned growth and long-term value, making it one of the smartest Dholera SIR investment opportunities.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Exceptional Growth Potential",
      icon: "📈",
      description: "Positioned for strong appreciation with rapid industrialization and rising residential demand.",
      body: "With the city's rapid industrialization, rising residential demand, and proximity to the Dholera International Airport, plots in WestWyn County are positioned for strong appreciation. Early investors can gain maximum returns as the city transforms into a modern, government and industry-supported smart metro city.",
      image: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&h=600&fit=crop&crop=center",
    },
    {
      title: "Exceptional Growth Opportunities",
      icon: "✅",
      description:
        "Early investors benefit from rapid value growth in a developing region.",
      body: "Early investors can benefit from rapid value growth as residential, industrial, and commercial projects shape the region. With plots in Dholera witnessing increasing demand, WestWyn Estate offers one of the smartest Dholera SIR investment opportunities.",
      image:
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&h=600&fit=crop&crop=center",
    },
     {
      title: "Modern Living & Trusted Legacy",
      icon: "🤝",
      description:
        "Experience modern living ",
      body: "A gated community with green landscapes, wide roads, and amenities designed for comfort, security, and sustainability, built by a developer trusted by investors, with six successful projects already sold out.",
      image:
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&h=600&fit=crop&crop=center",
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(222, 190, 107, 0.2), 0 8px 10px -6px rgba(222, 190, 107, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalContentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <div className="bg-[#151f28] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why Invest in <span className="text-[#d3b36b]">WestWyn County</span>
            ?
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Discover the unique advantages that make WestWyn County the premier
            investment opportunity in Dholera SIR.
          </p>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Image/Visual Section */}
          <div className="lg:w-1/2">
            {!isMobile ? (
              <>
                <motion.div
                  className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
                  key={hoveredBenefit}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src={benefits[hoveredBenefit].image}
                    alt={benefits[hoveredBenefit].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151f28]/80 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">
                          {benefits[hoveredBenefit].icon}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold">
                          {benefits[hoveredBenefit].title}
                        </h3>
                      </div>
                      <p className="text-base md:text-lg opacity-90">
                        {benefits[hoveredBenefit].description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Section - Moved under image for PC */}
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#d3b36b]/10 to-[#d3b36b]/5 border border-[#d3b36b]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-lg font-bold mb-2">
                    Ready to Invest in Dholera's Future?
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    Join the early investors securing premium plots in WestWyn
                    Estate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <motion.a
                    href="tel:+919958993549"
                      className="bg-[#d3b36b] hover:bg-[#d4b15f] text-[#151f28] text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Schedule Site Visit
                    </motion.a>
                    <motion.button
                    onClick={openContactForm}
                      className="border border-[#d3b36b] text-[#d3b36b] hover:bg-[#d3b36b]/10 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                     Contact Now
                    </motion.button>
                  </div>
                </motion.div>
              </>
            ) : (
              <div
                className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredBenefit}
                    className="w-full h-full"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={benefits[hoveredBenefit].image}
                      alt={benefits[hoveredBenefit].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151f28]/80 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">
                            {benefits[hoveredBenefit].icon}
                          </span>
                          <h3 className="text-xl font-bold">
                            {benefits[hoveredBenefit].title}
                          </h3>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed">
                          {benefits[hoveredBenefit].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {benefits.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        hoveredBenefit === index
                          ? "bg-[#d3b36b] scale-125"
                          : "bg-white/50"
                      }`}
                      onClick={() => updateHoveredBenefit(index)}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#151f28]/70 hover:bg-[#151f28] text-[#d3b36b] p-2 rounded-full transition-all duration-300"
                  onClick={() =>
                    updateHoveredBenefit(
                      hoveredBenefit > 0
                        ? hoveredBenefit - 1
                        : benefits.length - 1
                    )
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#151f28]/70 hover:bg-[#151f28] text-[#d3b36b] p-2 rounded-full transition-all duration-300"
                  onClick={() =>
                    updateHoveredBenefit(
                      hoveredBenefit < benefits.length - 1
                        ? hoveredBenefit + 1
                        : 0
                    )
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Benefits Cards Section */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((benefit, index) => {
                const isHighlighted = hoveredBenefit === index;

                return (
                  <motion.div
                    key={benefit.title}
                    className={`group border rounded-xl p-4 md:p-5 cursor-pointer transition-all duration-300 
                      ${
                        isHighlighted
                          ? "border-[#d3b36b] bg-[#d3b36b]/10 transform scale-[1.02]"
                          : "border-gray-700 hover:border-[#d3b36b]/50"
                      }`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={() => openModal(benefit, index)}
                    onMouseEnter={() => !isMobile && setHoveredBenefit(index)}
                  >
                    <div className="flex items-start mb-3">
                      <motion.div
                        className="text-2xl md:text-3xl mr-3"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#d3b36b]">
                        {benefit.title}
                      </h3>
                    </div>

                    <motion.div
                      className="text-sm text-gray-300"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.4 }}
                    >
                      {benefit.description}
                    </motion.div>

                    <motion.div
                      className="mt-3 flex items-center text-[#d3b36b] text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHighlighted ? 1 : 0 }}
                    >
                      Learn more
                      <motion.div
                        className="ml-1"
                        animate={{ x: isHighlighted ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section for Mobile - Keep it below cards on mobile */}
            {isMobile && (
              <motion.div
                className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#d3b36b]/10 to-[#d3b36b]/5 border border-[#d3b36b]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-2">
                  Ready to Invest in Dholera's Future?
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  Join the early investors securing premium plots in WestWyn
                  Estate.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <motion.a
                  href="tel:+919958993549"
                    className="bg-[#d3b36b] hover:bg-[#d4b15f] text-[#151f28] text-sm text-center font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Site Visit
                  </motion.a>
                  <motion.button
                  onClick={openContactForm}
                    className="border border-[#d3b36b] text-[#d3b36b] hover:bg-[#d3b36b]/10 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Now
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showModal && selectedBenefit && (
          <motion.div
            className="fixed inset-0 bg-[#151f28]/90 flex items-center justify-center z-50 p-4"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-[#1e2a36] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                {/* Modal Header with Image */}
                <div className="mb-6">
                  <motion.div
                    className="w-full h-48 md:h-64 rounded-lg overflow-hidden mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <img
                      src={selectedBenefit.image}
                      alt={selectedBenefit.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <motion.div
                      className="text-3xl mr-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      {selectedBenefit.icon}
                    </motion.div>
                    <motion.h3
                      className="text-xl font-semibold text-white"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedBenefit.title}
                    </motion.h3>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-300">{selectedBenefit.description}</p>
                </motion.div>

                <motion.div
                  className="border-t border-gray-700 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="font-medium text-white mb-2">
                    Detailed Information:
                  </h4>
                  <p className="text-gray-300">{selectedBenefit.body}</p>
                </motion.div>

                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={closeModal}
                    className="bg-[#d3b36b] hover:bg-[#d4b15f] text-[#151f28] font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
       {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <PopupForm
              title="Plots Under ₹10 Lakhs"
              buttonName="Get A Call Back"
              onClose={() => closeContactForm()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
