"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export default function PopupScroll({ title }) {
  // Popup states
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Auto-popup after 5 seconds
  useEffect(() => {
    const sessionPopupShown = sessionStorage.getItem("popupShownThisSession");

    if (!sessionPopupShown) {
      const handleScroll = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;

        // Trigger popup when user scrolls between 50-60%
        if (scrollPercentage >= 50 && scrollPercentage <= 60) {
          setShowFormPopup(true);
          sessionStorage.setItem("popupShownThisSession", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Load reCAPTCHA
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
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.mobileNumber.trim()) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      setErrorMessage("Please enter a valid mobile number (10-15 digits)");
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
              phone: formData.mobileNumber,
              source: "Dholera Times",
            },
            source: "Dholera Times Popup",
            tags: ["Dholera Investment", "Popup Lead", "Dholera Times"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({ fullName: "", mobileNumber: "" });
        setShowThankYou(true);

        setTimeout(() => {
          setShowThankYou(false);
          setShowFormPopup(false);
        }, 3000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaRef.current) {
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

    if (!recaptchaRef.current.innerHTML) {
      try {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onRecaptchaSuccess,
          theme: "light",
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
        setErrorMessage("Error with verification. Please try again.");
        setIsLoading(false);
      }
    } else {
      window.grecaptcha.execute();
    }
  };

  const handlePopupClose = () => {
    setShowFormPopup(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handlePopupClose();
    }
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
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
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
                {/* Section 1: Heading */}
                <div className="text-center mb-6">
                  <button
                    onClick={handlePopupClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    {title}
                  </h1>
                </div>

                {/* Section 3: Form Fields */}
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
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d3b36b]" />
                      <input
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b69b5e] border border-gray-700 hover:border-[#d3b36b] transition-colors"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d3b36b]" />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b69b5e] border border-gray-700 hover:border-[#d3b36b] transition-colors"
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div ref={recaptchaRef}></div>
                  </div>

                  {/* Section 4: Submit Button with Tagline */}
                  <button
                    type="submit"
                    disabled={isLoading || !recaptchaLoaded}
                    className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                      isLoading || !recaptchaLoaded
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-[#debe6b] hover:bg-[#b69b5e] text-white transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "Get Plot Details"
                    )}
                  </button>

                  {/* Section 5: Privacy Notice */}
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
