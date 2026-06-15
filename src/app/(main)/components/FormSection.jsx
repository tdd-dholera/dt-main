"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { motion } from "framer-motion";
import "./about.css";

export default function CommonForm({ title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaWidgetId = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        try {
          const script = document.createElement("script");
          script.src = "https://www.google.com/recaptcha/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => setRecaptchaLoaded(true);
          script.onerror = () => {
            console.error("Failed to load reCAPTCHA script");
            setRecaptchaLoaded(true);
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true);
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    // Prevent modal close when clicking inside
    const handleClickInside = (e) => {
      e.stopPropagation();
    };

    const formElement = document.getElementById("contact-form-container");
    if (formElement) {
      formElement.addEventListener("click", handleClickInside);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("click", handleClickInside);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    // Simple phone validation
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      // Reset counter if 24 hours have passed
      setSubmissionCount(0);
      if (typeof window !== "undefined") {
        localStorage.setItem("formSubmissionCount", "0");
        localStorage.setItem("lastSubmissionTime", now.toString());
      }
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const response = await fetch(
        "https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
          },
          body: JSON.stringify({
            fields: {
              name: formData.fullName,
              phone: formData.phone,
              message: formData.message,
              source: "Dholera Times Dholera-Sir/Dholera-Update Page",
            },
            source: "Dholera Times ",
            tags: ["Dholera Investment", "Website Lead"],
          }),
        }
      );

      const responseText = await response.text();

      if (response.ok) {
        // Success handling
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          if (typeof window !== "undefined") {
            localStorage.setItem("formSubmissionCount", newCount.toString());
            localStorage.setItem("lastSubmissionTime", Date.now().toString()); // Fixed this line
          }
          return newCount;
        });
      } else {
        // Parse response as JSON if possible, otherwise use text
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText };
        }
        throw new Error(errorData.message || "Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again."
      );
    } finally {
      setIsLoading(false);

      // Reset reCAPTCHA
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current);
        } catch (err) {
          console.error("Error resetting reCAPTCHA:", err);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (window.grecaptcha && recaptchaLoaded && siteKey) {
      try {
        if (recaptchaWidgetId.current === null && recaptchaRef.current) {
          recaptchaWidgetId.current = window.grecaptcha.render(
            recaptchaRef.current,
            {
              sitekey: siteKey,
              callback: onRecaptchaSuccess,
              theme: "dark",
            }
          );
        } else if (recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
          window.grecaptcha.execute(recaptchaWidgetId.current);
        }
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      setErrorMessage("reCAPTCHA not loaded. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="py-12 bg-gray-100 animate-gradient-x">
        <div className="container mx-auto px-6 sm:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-gray-900 text-3xl sm:text-4xl font-bold text-center">
              {title}
            </h2>
            <p className="text-gray-900 mt-4 text-center">
              Still have questions after reading the FAQs? Contact us today for
              the best advice, clear answers, and personal assistance.
            </p>

            {showPopup ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-4 inline-block"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
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
                </motion.div>
                <h3 className="text-2xl font-bold text-[#d8b66d] mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-900">
                  Your request has been submitted successfully. We'll contact
                  you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-12 space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-gray-900 text-sm md:text-lg font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#151f28] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d8b66d]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-900 text-sm md:text-lg font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#151f28] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d8b66d]"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div ref={recaptchaRef}></div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#d8b66d] hover:bg-[#cba64f] disabled:bg-gray-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}