"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const MAX_SUBMISSIONS = 20;
const SUBMISSION_RESET_MS = 24 * 60 * 60 * 1000;

export default function BulkLand({ title, buttonName, pageName }) {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const recaptchaRef = useRef(null);
  const recaptchaRendered = useRef(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Read submission count from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedCount = parseInt(
      localStorage.getItem("formSubmissionCount") || "0",
      10,
    );
    const lastSubmissionTime = parseInt(
      localStorage.getItem("lastSubmissionTime") || "0",
      10,
    );
    const now = Date.now();

    if (now - lastSubmissionTime > SUBMISSION_RESET_MS) {
      localStorage.removeItem("formSubmissionCount");
      localStorage.removeItem("lastSubmissionTime");
    } else {
      setSubmissionCount(savedCount);
      if (savedCount >= MAX_SUBMISSIONS) setIsDisabled(true);
    }
  }, []);

  // Auto-popup on 50-60% scroll
  useEffect(() => {
    const sessionPopupShown = sessionStorage.getItem("popupShownThisSession");
    if (sessionPopupShown) return;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / documentHeight) * 100;

      if (scrollPercentage >= 50 && scrollPercentage <= 60) {
        setShowFormPopup(true);
        sessionStorage.setItem("popupShownThisSession", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLeadSource = () => {
    if (typeof window === "undefined") return "Dholera Times";
    const params = new URLSearchParams(window.location.search);
    if (params.has("twclid")) return "Dholera Times Twitter Ads";
    if (params.has("gad_source")) return "Dholera Times Google Ads";
    return "Dholera Times";
  };

  const loadRecaptcha = useCallback(() => {
    if (recaptchaLoaded) return;
    if (typeof window === "undefined") return;

    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      setRecaptchaLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);
  }, [recaptchaLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    if (submissionCount >= MAX_SUBMISSIONS) {
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
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead", "Bulk Land"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowThankYou(true);

        const newCount = submissionCount + 1;
        setSubmissionCount(newCount);

        if (typeof window !== "undefined") {
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        }

        if (newCount >= MAX_SUBMISSIONS) setIsDisabled(true);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "lead_form_landing_page_dt"});
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
          recaptchaRendered.current = false;
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

    if (!recaptchaRendered.current) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "light",
        });
        recaptchaRendered.current = true;
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      window.grecaptcha.execute();
    }
  };

  const handlePopupClose = () => setShowFormPopup(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handlePopupClose();
  };

  return (
    <AnimatePresence>
      {showFormPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 pt-12 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handlePopupClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-3xl"
            >
              ×
            </button>

            {showThankYou ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">We will contact you shortly.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                </div>

                <form
                  onSubmit={handleSubmit}
                  onFocus={loadRecaptcha}
                  onPointerEnter={loadRecaptcha}
                >
                  {errorMessage && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm mb-4">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div ref={recaptchaRef}></div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isDisabled || !recaptchaLoaded}
                    className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                      isLoading || isDisabled || !recaptchaLoaded
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-[#d3b36b] hover:bg-[#eab308] text-white transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      buttonName || "Get A Call Back"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">
                      We respect your privacy. Your details are safe with us.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
