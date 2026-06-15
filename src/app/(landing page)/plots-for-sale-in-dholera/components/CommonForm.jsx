"use client";
import { useState,useCallback, useRef } from "react";
import React from "react";
import { motion } from "framer-motion";

export default function CommonForm({ title, button }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const getLeadSource = () => {
    if (typeof window === "undefined") return "Dholera Times";
    const params = new URLSearchParams(window.location.search);
    if (params.has("twclid")) return "Dholera Times Twitter Ads";
    if (params.has("gad_source")) return "Dholera Times Google Ads";
    if (params.has("")) return "Dholera Times";
    return "Dholera Times ";
  };

  const loadRecaptcha = useCallback(() => {
    if (recaptchaLoaded) return;
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);
  }, [recaptchaLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(""); // Clear error messages on input change
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    // Phone validation - accept various formats (10-15 digits)
    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Check submission limits
    if (submissionCount >= 20) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      setIsDisabled(true);
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      // Prepare notes from additional fields
      const notesArray = [];
      if (formData.city) notesArray.push(`City: ${formData.city}`);
      const notes = notesArray.join(" | ");

      // Resolve source dynamically from URL params at submission time
      const source = getLeadSource();

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
              source: source,
            },
            tags: ["Dholera Investment", "Website Lead", "Taboola Hero"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({
          fullName: "",
          phone: "",
        });

        // Notify parent component of successful submission
        if (onSuccess) {
          onSuccess();
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_landing_page_dt",
        });
      } else {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        setErrorMessage(
          `Submission failed (${response.status}). Please try again.`,
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        recaptchaRef.current
      ) {
        try {
          window.grecaptcha.reset();
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

    if (!recaptchaLoaded || !window.grecaptcha) {
      setErrorMessage(
        "Security verification not loaded. Please refresh the page.",
      );
      setIsLoading(false);
      return;
    }

    // Render reCAPTCHA if not already rendered
    if (!recaptchaRef.current.innerHTML) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      // Execute existing reCAPTCHA
      window.grecaptcha.execute();
    }
  };

  return (
    <div>
      <section className="py-12 bg-black">
        <div className="container mx-auto px-6 sm:px-12">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-white text-xl md:text-3xl font-semibold text-center">
              {title}
            </h3>

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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-300">
                  Your request has been submitted successfully. We'll contact
                  you shortly.
                </p>
              </div>
            ) : isDisabled ? (
              <div className="text-center py-8">
                <p className="text-center text-red-400 font-semibold">
                  You have reached the maximum submission limit. Try again after
                  24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocus={loadRecaptcha}
                onPointerEnter={loadRecaptcha}
                className="mt-12 space-y-6"
              >
                {errorMessage && (
                  <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="max-sm:space-y-4 md:flex justify-center items-center gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="fullName"
                      className="block text-white text-sm font-medium mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="phone"
                      className="block text-white text-sm font-medium mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    disabled={isLoading || isDisabled || !recaptchaLoaded}
                    className={`w-full font-bold py-3 px-6 rounded-lg transition duration-300 ${
                      isLoading || isDisabled || !recaptchaLoaded
                        ? "bg-gray-600 cursor-not-allowed text-gray-400"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-md"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Get A Call Back"}
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
