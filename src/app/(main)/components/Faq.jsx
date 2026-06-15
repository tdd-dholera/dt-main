import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import bg from "@/assets/pexels2.jpg"; // Replace with the actual path to your background image

const faqs = [
  {
    question: "What is Dholera Smart City?",
    answer:
      "Dholera Smart City is India’s first planned greenfield smart city, located in Ahmedabad, Gujarat. It is part of the Delhi-Mumbai Industrial Corridor (DMIC) project and is envisioned as a global hub for economic activities through advanced infrastructure, technology, and sustainable development.",
  },
  {
    question: "What are the major projects planned in Dholera?",
    answer: [
      "Dholera International Airport.",
      "India’s first semiconductor plant by TATA - ₹91,000 Cr investment.",
      "Asia’s largest solar park - 5,000MW",
      "ReNew Power solar cell manufacturing unit",
    ],
  },
  {
    question: "Why should we invest in Dholera?",
    answer: [
      "India’s first fully planned smart city, built from scratch",
      "Upcoming expressway to be operational in 1-2 months",
      "International airport set for completion by 2026",
      "₹90,000 Cr investment by TATA in India's first semiconductor plant, boosting growth potential",
    ],
  },
  {
    question: "I live in Delhi NCR. Why should I invest so far away?",
    answer: [
      "Helps diversify your investment portfolio",
      "Requires a smaller investment amount (low ticket size)",
      "Offers potential for high returns",
    ],
  },
  {
    question: "Is my land investment secure?",
    answer: [
      "Located in a gated community",
      "Registry-ready",
      "N.A. (Non-Agricultural) and N.O.C. (No Objection Certificate) approvals",
    ],
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative  p-6">
      <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-30"
      />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 relative">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="border rounded-lg p-4 shadow-md bg-gray-900 bg-opacity-80"
            >
              <button
                className="w-full flex justify-between items-center text-[#edc46b] text-left text-xl font-bold"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-lg text-[#f6d99a] overflow-hidden"
                  >
                    {Array.isArray(faq.answer) ? (
                      <ul className="list-disc pl-5">
                        {faq.answer.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
