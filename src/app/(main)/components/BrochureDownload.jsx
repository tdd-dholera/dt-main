"use client";
import { useState,useCallback, useRef } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function BrochureDownload({
  onClose,
  title,
  subtitle = "",
  buttonName,
  thankYouTitle = "Thank You!",
  thankYouMessage = "Your request has been submitted successfully.",
  source = "Dholera Times",
  link,
  ids,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const router = useRouter();
  const pathname = usePathname();

  // PDF download URL
  const pdfUrl = link;

  // Function to download PDF
  const downloadPDF = () => {
    try {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "brochure.pdf"; // You can customize the filename
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Fallback: open in new tab
      window.open(pdfUrl, "_blank");
    }
  };

  // Handle close function
  const handleClose = () => {
    if (onClose && typeof onClose === "function") {
      onClose();
    }
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
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      setSubmissionCount(0);
      localStorage.setItem("formSubmissionCount", "0");
      localStorage.setItem("lastSubmissionTime", now.toString());
    } else if (submissionCount >= 3) {
      setErrorMessage(
        "You have reached the maximum submission limit. Try again after 24 hours.",
      );
      return false;
    }

    return true;
  };

  const onRecaptchaSuccess = async (token) => {
    try {
      const now = Date.now();

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
            source: "Dholera Times",
            tags: ["Dholera Investment", "Website Lead", "Dholera Times"],
            recaptchaToken: token,
          }),
        },
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowPopup(true);
        setSubmissionCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem("formSubmissionCount", newCount.toString());
          localStorage.setItem("lastSubmissionTime", now.toString());
          return newCount;
        });
        /* Google Tag */
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form",
        });

        // Download PDF immediately after successful submission
        downloadPDF();

        // Show thank you popup for 2 seconds
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          handleClose();

          // Get current pathname for return URL
          const currentPath = pathname || window.location.pathname;

          // Push to thank-you route with return URL
          router.push(`/thankyou`);
        }, 2000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again.",
      );
    } finally {
      setIsLoading(false);
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
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

    // If reCAPTCHA is loaded, render it in the ref
    if (window.grecaptcha && recaptchaLoaded) {
      try {
        if (recaptchaRef.current && !recaptchaRef.current.innerHTML) {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            callback: onRecaptchaSuccess,
            theme: "dark",
          });
        } else {
          window.grecaptcha.reset();
          window.grecaptcha.execute();
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

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent modal content click from closing modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Thank You Page */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-800 flex justify-center items-center z-[1001]"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="text-center text-white px-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {thankYouTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl"
              >
                {thankYouMessage}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-md opacity-80 mt-2"
              >
                Your brochure is downloading...
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-sm opacity-70 mt-1"
              >
                Redirecting you back...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      {!showThankYou && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4 z-[1000]"
          onClick={handleBackdropClick}
        >
          <motion.div
            id="contact-form-container"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-gray-800   p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full relative"
            onClick={handleModalContentClick}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#b69b5e] rounded-full p-1 transition-all duration-200 hover:bg-gray-700 z-10"
              aria-label="Close form"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6 pt-4"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                {title}
              </h2>
            </motion.div>

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
                <p className="text-[#d3b36b] text-sm mt-2">
                  Your brochure is downloading...
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocus={loadRecaptcha}
                onPointerEnter={loadRecaptcha}
                className="space-y-5"
              >
                {errorMessage && (
                  <div className="p-3 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d3b36b]" />
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b69b5e] border border-gray-700 hover:border-[#d3b36b] transition-colors"
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
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    minLength="10"
                    maxLength="15"
                    required
                    className="w-full p-4 pl-12 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b69b5e] border border-gray-700 hover:border-[#d3b36b] transition-colors"
                  />
                </motion.div>

                {/* reCAPTCHA container */}
                <div className="flex justify-center">
                  <div ref={recaptchaRef}></div>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || !recaptchaLoaded}
                  id="brochure"
                  className="w-full py-3 px-6 bg-[#d3b36b] text-black rounded-lg hover:bg-[#b69b5e] transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "Verifying..."
                    : recaptchaLoaded
                      ? buttonName
                      : "Loading..."}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
