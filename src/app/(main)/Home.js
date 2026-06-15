"use client";
import Image from "next/image";
import hero from "@/assets/hero5.webp";
import dsir from "@/assets/dsir.png";
import { FaUser, FaPhoneAlt, FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import DholeraInvestmentGuide from "./components/Investment";
import FAQSection from "./components/Faq";
import Link from "next/link";
import "swiper/css";
import bg from "@/assets/pexels2.jpg"
import TestimonialPagination from "./components/Testimonials";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get submission count and last submission timestamp
    let submissionCount = localStorage.getItem("formSubmissionCount") || 0;
    let lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

    // Check if 24 hours have passed since the last submission
    if (lastSubmissionTime) {
      const timeDifference = Date.now() - parseInt(lastSubmissionTime, 10);
      const hoursPassed = timeDifference / (1000 * 60 * 60); // Convert ms to hours

      if (hoursPassed >= 24) {
        // Reset submission count after 24 hours
        submissionCount = 0;
        localStorage.setItem("formSubmissionCount", 0);
        localStorage.setItem("lastSubmissionTime", Date.now().toString());
      }
    }

    // Restrict submission after 3 attempts
    if (submissionCount >= 3) {
      alert(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      setIsLoading(false);
      return;
    }

    // Validate form data
    if (!formData.fullName || !formData.phone) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // API Request
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`, // Use environment variable
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              source:"Dholera Times"
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead"],
          }),
        }
      );

      // Store response text before parsing
      const responseText = await response.text();

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          setFormData({ fullName: "", phone: "" }); // Reset form
          setShowPopup(true); // Show popup on success

          // Increment submission count & store time
          submissionCount++;
          localStorage.setItem("formSubmissionCount", submissionCount);
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          // Handle unexpected response
          console.log("Response Text:", responseText);
        }
      } else {
        console.error("Server Error:", responseText);
        throw new Error(responseText || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
  
      <main className="w-full -z-10 h-full ">
        <div className="relative w-full max-sm:h-[100vh] h-[80vh] flex md:items-center md:justify-center">
          {/* Background Image */}
          <Image
            src={hero}
            alt="Dholera Smart City Plan"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content Wrapper */}
          <div className="absolute w-full flex flex-col max-sm:mt-32 items-center px-6 md:flex-row md:justify-around md:px-20">
            {/* Left Section - Text */}
            <div className="text-white text-center">
              <h2 className="text-5xl md:text-6xl font-bold">DHOLERA</h2>
              <p className="text-xl md:text-2xl mt-2 border-t-2 border-b-2 border-white px-4 py-2">
                A SMART CITY
              </p>
              <p className="text-lg md:text-xl mt-2">
                GREENFIELD INDUSTRIAL SMART CITY
              </p>
            </div>

            {/* Right Section - Form */}
            <div className="p-8 bg-transparent rounded-2xl shadow-xl w-full max-w-md border border-gray-300 backdrop-blur-md mt-8 md:mt-0">
            
              <h2 className="text-2xl font-semibold text-center text-white mb-6">
                Let's Connect
              </h2>

              {isDisabled ? (
                <p className="text-center text-red-500 font-semibold">
                  You have reached the maximum submission limit. Try again after
                  24 hours.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                 
                  <div className="relative flex items-center w-full">
                    <FaUser className="absolute left-4 text-gray-500" />
                    <input
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-12 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                  </div>

                  <div className="relative flex items-center w-full">
                    <FaPhoneAlt className="absolute left-4 text-gray-500" />
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone Number"
                      className="w-full p-3 pl-12 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full p-3 text-white rounded-lg font-medium shadow-md transition-all duration-300 click
      ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#be9233] hover:bg-[#dbaf51] hover:text-black hover:shadow-lg active:scale-95 "}
    `}
                  >
                    {isLoading ? "Submitting..." : "Get a call back"}
                  </button>

                  {/* Call Us Section */}
                  
                 
               
                </form>
              )}

              {showPopup && (
                <>
                  <style jsx global>{`
                    body {
                      overflow: hidden;
                    }
                  `}</style>

                  <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    style={{ backdropFilter: "blur(5px)" }}
                  >
                    <div
                      className="bg-white p-8 rounded-xl w-full max-w-md text-center shadow-2xl transform transition-all scale-100 opacity-100"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-[#151f28] mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        You'll get a call back shortly
                      </p>

                      <div className="space-y-3">
                        <Link href="/projects">
                          <button className="w-full p-3 bg-[#151f28] text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium">
                            Explore Projects
                          </button>
                        </Link>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="w-full p-3 text-[#151f28] border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Carousel Section */}
          {/*  <div className="absolute bottom-0 w-full p-6">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="h-[200px] bg-blue-500 text-white flex items-center justify-center">
              <h3>Slide 1</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[200px] bg-red-500 text-white flex items-center justify-center">
              <h3>Slide 2</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[200px] bg-green-500 text-white flex items-center justify-center">
              <h3>Slide 3</h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div> */}
        </div>
        <FAQSection />

        <div className="relative">
        <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-30"
      />
          <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Dholera Smart City: Vision & Development
                </h2>
                <p className="text-gray-600 mb-6">
                  Explore the future of Gujarat's premier planned urban
                  development project
                </p>

                <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                  {isPlaying ? (
                    <>
                      {/* Loader while iframe loads */}
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                          <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-red-600 animate-spin"></div>
                        </div>
                      )}
                      {/* Iframe loads when playing */}
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/hNbWaEU1d_A?si=rXk2EQPRG65Q3VJ3&autoplay=1"
                        title="Dholera Smart City: Vision & Development"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                      ></iframe>
                    </>
                  ) : (
                    /* Custom thumbnail with play button */
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => {
                        setIsPlaying(true);
                        setIsLoading(true);
                      }}
                    >
                      <img
                        src="https://img.youtube.com/vi/hNbWaEU1d_A/hqdefault.jpg"
                        alt="Dholera Smart City Investment Guide Video"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Play button SVG, sized smaller on mobile */}
                        <svg
                          className="w-12 h-12 text-white opacity-80 sm:w-16 sm:h-16"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 ">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    #DholeraSmartCity
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    #SmartCityGujarat
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    #DholeraInvestment
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    #DholeraDevelopment
                  </span>
                </div>
                  <a href="/infopack/videos" className="inline-flex my-5 items-center px-3 py-1 rounded-full text-lg font-semibold bg-[#d8b66d] text-white">
                    Know More <FaArrowAltCircleRight className="mx-3"/>
                  </a>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Presented by Dholera Times
                </div>
                <div className="flex space-x-4">
                  <button className="text-gray-500 hover:text-red-600 transition">
                    <span className="sr-only">Share</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-red-600 transition">
                    <span className="sr-only">Save</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <section>
        {/* DHOLERA SIR */}
        <div>
          <div className="relative">
        <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-40 opacity-30"
      />
            <div className=" max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Content section */}
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                      Dholera Smart City
                      <span className="block text-blue-600">
                        The Future of Gujarat
                      </span>
                    </h1>

                    <p className="text-lg leading-relaxed text-gray-700">
                      Dholera Smart City Gujarat is India's first planned smart
                      city, developing in the heart of the state of Gujarat
                      along the Delhi-Mumbai Industrial Corridor (DMIC). Dholera
                      Special Investment Region (SIR) is India's 95,000-crore
                      greenfield smart city project that has been declared as
                      the biggest project by Forbes Magazine. It is being called
                      an 'investment haven' for all real estate investors.{" "}
                      <strong className="text-gray-900">Dholera Times</strong>{" "}
                      is the most trusted real estate partner for investment
                      opportunities in the Dholera Smart City Gujarat.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700">
                      Dholera Special Investment Region (SIR) is a crucial step
                      towards
                      <strong className="text-gray-900"> New India</strong>, and
                      the government aims to complete it in 4 phases by 2042.
                      Once fully developed, smart city Dholera is expected to
                      become an industrial power centre and overtake Dubai and
                      China. The city has been meticulously planned to equip it
                      with facilities to foster exponential development in the
                      coming years. The mission is to make it a fully
                      self-sustaining city.
                    </p>

                    <div className="mt-8">
                      <Link
                        href="/DholeraSIR"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#b98e31] hover:bg-[#dcb86a] shadow-md transition duration-150 ease-in-out"
                      >
                        Explore Dholera SIR
                      </Link>
                    </div>
                  </div>

                  {/* Image section */}
                  <div className="relative h-96 md:h-auto overflow-hidden rounded-xl">
                    {/* Placeholder image - would be replaced with your actual image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-300 opacity-20"></div>
                    <Image
                      src={dsir}
                      alt="Dholera Smart City"
                      className="w-full h-full object-cover"
                    />

                    {/* Stats overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <div className="grid grid-cols-3 gap-6 text-white">
                        <div className="text-center">
                          <div className="text-2xl font-bold max-sm:text-lg">
                            ₹95,000 Cr
                          </div>
                          <div className="text-sm">Investment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold max-sm:text-lg">
                            920 km²
                          </div>
                          <div className="text-sm">Development Area</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold max-sm:text-lg">
                            2042
                          </div>
                          <div className="text-sm">Completion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div>
          <DholeraInvestmentGuide />
        </div>
        <div>
          <TestimonialPagination/>
        </div>
      </section>
    </>
  );
}
