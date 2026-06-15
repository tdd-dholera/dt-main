"use client";
import { useState } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What projects are allowed in the City Centre Zone in Dholera?",
    answer:
      "The City Centre Zone allows commercial, hospitality, retail, office, civic, healthcare, cultural, residential, and mixed-use projects, with permissions depending on road width.",
  },
  {
    question: "Why should I invest in bulk land in Dholera’s City Centre Zone?",
    answer:
      "It is promoted as a premium investment zone because of its central location, high footfall potential, landmark value, business visibility, and high ROI potential.",
  },
  {
    question: "Is the City Centre Zone well connected in Dholera?",
    answer:
      "Yes. The page highlights seamless connectivity to Dholera International Airport, which supports visibility, accessibility, and commercial growth.",
  },
  {
    question: "What type of businesses can invest in the City Centre Zone?",
    answer:
      "The zone is suitable for retail shops, malls, restaurants, hotels, office complexes, cinemas, hospitals, training centres, art galleries, convention centres, serviced apartments, and mixed-use developments.",
  },
  {
    question: "What is the size and starting investment of the City Centre Zone in Dholera?",
    answer:
      "The page lists the City Centre Zone area as 1,678.045 sq. yards and promotes government-approved bulk land in Dholera starting from ₹2 Cr.",
  },
];


export default function FAQS() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = faqs;

  const renderAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return (
        <ul className="list-disc list-inside space-y-2">
          {answer.map((item, idx) => (
            <li key={idx} className="text-gray-600 text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>;
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 gap-6 md:gap-12 max-w-7xl mx-auto">
          {/* Left Section (40%) */}
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-[#151f28] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-4">Have more questions?</p>

            <div className="pt-4">
              <a
                className="inline-block bg-[#b69b5e] hover:bg-[#d3b36b] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
                href="tel:+919958993549"
              >
                Give us a missed call
              </a>
            </div>
          </div>

          {/* Right Section (60%) */}
          <div className="w-full md:w-3/5 md:pl-24 md:pr-4 md:mt-0">
            <div className="space-y-1">
              {displayedFaqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-gray-900 font-medium pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 transition-transform duration-200">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-4 px-0">{renderAnswer(faq.answer)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {/* {faqs.length > 5 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 text-[#b69b5e] hover:text-[#d3b36b] font-semibold transition-colors duration-200"
                >
                  {showAll ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>Show More FAQs ({faqs.length - 5} more)</span>
                      <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}