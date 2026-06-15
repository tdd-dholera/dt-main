"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "The team helped me understand project location, documentation, and next steps clearly before I made a decision.",
    name: "Vijay Pratap",
    location: "Delhi NCR",
  },
  {
    quote:
      "My experience with DholeraTimes was smooth and professional. They explained the project details very clearly and guided me at every step.",
    name: "Neeraj Yadav",
    location: "Haryana",
  },
  {
    quote:
      "From the first call to the site visit, the team was helpful and transparent. They made the whole process easy to understand.",
    name: "Amit Sharma",
    location: "Noida",
  },
  {
    quote:
      "I was looking for a residential plot in Dholera and DholeraTimes gave me the right guidance on location, pricing, and documentation.",
    name: "Rahul Verma",
    location: "Ghaziabad",
  },
  {
    quote:
      "What I liked most was their honest support and clear communication. They helped me compare options and choose the right project.",
    name: "Pankaj Singh",
    location: "Gurugram",
  },
  {
    quote:
      "The team was very responsive and supportive throughout the process. Their guidance gave me confidence before booking my plot.",
    name: "Sandeep Chauhan",
    location: "Jaipur",
  },
  {
    quote:
      "DholeraTimes made my plot-buying journey simple with clear information, timely updates, and full support from enquiry to booking.",
    name: "Manoj Kumar",
    location: "Faridabad",
  },
  {
    quote:
      "They explained everything in a practical way, from project location to paperwork. I felt supported throughout the process.",
    name: "Deepak Rana",
    location: "Chandigarh",
  },
];

const TestimonialPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial,
  );

  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const styles = {
    background: "bg-white",
    heading: "text-gray-700",
    cardBorder: "border-2 border-[#d3b36b]",
    quote: "text-gray-700",
    name: "text-black font-semibold",
    location: "text-[#C69C21]",
    activeButton: "bg-[#d3b36b] hover:bg-[#d3b36b] text-white",
    inactiveButton:
      "border-[#FDB913] bg-[#d3b36b] text-gray-700 hover:bg-[#d3b36b] hover:text-white",
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <h3 className={`text-center text-[28px] font-semibold mb-10`}>
          What our customers says
        </h3>
        <div
          key={currentPage}
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white shadow-md rounded-lg p-6 ${styles.cardBorder} hover:shadow-lg transition-shadow duration-300`}

            >
              <p className={`italic ${styles.quote} mb-6 text-black h-20`}>
                ❝ {testimonial.quote} ❞
              </p>
              <div className="flex items-center border-t border-[#b98e31] pt-4">
                <div className="w-1 h-12 bg-[#d3b36b] mr-3 rounded-full"></div>
                <div>
                  <h3 className={styles.name}>
                    {testimonial.name} ⦁ {testimonial.type}
                  </h3>
                  <p className={` ${styles.location}`}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              } ${styles.inactiveButton} rounded-full`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === index + 1
                    ? styles.activeButton
                    : styles.inactiveButton
                }`}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } ${styles.inactiveButton} rounded-full`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-[#151f28] mb-3">
                🚀 Ready to Invest in Dholera?
              </h2>
              <p className="text-gray-600 text-lg">
                Get expert guidance and exclusive investment opportunities
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="tel:+919958993549"
                className="bg-[#d3b36b] text-white flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
               <FaPhone className="rotate-90"/> Call Now
              </Link>
              <Link
                href="https://wa.me/919958993549?text=Hi"
                className="border-2 border-[#151f28] text-[#d3b36b] flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-semibold hover:bg-[#caac66] hover:text-white transition-all duration-300"
              >
               <FaWhatsapp/> WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPagination;
