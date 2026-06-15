import { useState, useEffect, useRef } from "react";
import { FaUser, FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/dt.webp";
import { useRouter, usePathname } from "next/navigation"

export default function Popup({
  onClose,
  title,
  thankYouTitle = "Thank You!",
  thankYouMessage = "Your request has been submitted successfully.",
  source = "Dholera Times",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [showFormPopup, setShowFormPopup] = useState(true); 
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const router = useRouter();
  const pathname = usePathname();
  const [showForm, setShowForm] = useState(false);

  const [timeLeft, setTimeLeft] = useState(10000);

  useEffect(() => {
    let timer;

    if (showForm) {
      setTimeLeft(10000);

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 5000);
    }

    return () => clearInterval(timer); // Cleanup
  }, [showForm]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const [wasTriggered, setWasTriggered] = useState(false);

  // Parse title to extract price and time info
  const parseTitle = (title) => {
    const priceMatch = title.match(/₹([0-9,]+)/);
    const timeMatch = title.match(/(\d+:\d+:\d+)/);
    const price = priceMatch ? `₹${priceMatch[1]}` : "₹9250";
    const timeLeft = timeMatch ? timeMatch[1] : null;

    return {
      price,
      timeLeft,
      mainText: "For This WEEK",
      subText: ""
    };
  };

  const titleInfo = parseTitle(title);

  useEffect(() => {
    setShowFormPopup(true);
    setWasTriggered(true);
  }, []);
  // Handle close function
  const handleClose = () => {
    setShowFormPopup(false);
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  useEffect(() => {
    // Load localStorage data
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("formSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10)
      );
    }

    // Load reCAPTCHA script
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
            setRecaptchaLoaded(true); // Fallback
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error("reCAPTCHA script loading error:", err);
          setRecaptchaLoaded(true); // Fallback
        }
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Handle Escape key press
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

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
        "You have reached the maximum submission limit. Try again after 24 hours."
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
            source: "BookMyAssets Google Ads",
            tags: ["Dholera Investment", "Website Lead", "BookMyAssets"],
            recaptchaToken: token,
          }),
        }
      );

      if (response.ok) {
        setFormData({ fullName: "", phone: "" });
        setShowSubmissionSuccess(true);
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

        // Show thank you popup for 2 seconds
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          handleClose();
          router.push(`/more-info/thankyou`);
        }, 3000);
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage(
        error.message || "Error submitting form. Please try again."
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
            className="fixed inset-0 bg-gray-900 flex justify-center items-center z-[1001]"
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
                <div className="w-24 h-24 bg-[#FDB913] rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-black"
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
                Redirecting you back...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal */}
      {showFormPopup && !showThankYou && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 p-4 z-[1000]"
          onClick={handleBackdropClick}
        >
          <motion.div
            id="contact-form-container"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full relative overflow-visible border border-[#FDB913]"
            onClick={handleModalContentClick}
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-black p-4 rounded-full shadow-2xl border-4 border-white relative"
              >
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                {/* Shine effect */}
                <div className="absolute top-2 left-2 w-4 h-4 bg-white opacity-40 rounded-full blur-sm"></div>
              </motion.div>
            </div>

            {/* Header Section with Gradient Background */}
            <div className="bg-black text-white p-6 pb-8 pt-12 relative rounded-t-2xl">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-[#FDB913] focus:outline-none focus:ring-2 focus:ring-[#FDB913]/50 rounded-full p-2 transition-all duration-200 hover:bg-[#151f28] z-10"
                aria-label="Close form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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

              {/* Content Section */}
              <div className="text-center">
                {/* Exclusive Deal Section */}
                <div className="mb-3">
                  <span className="bg-[#FDB913] text-black px-3 py-1 rounded-full text-sm font-bold inline-flex items-center gap-2">
                    <FaClock className="text-xs" />
                    Inaugural Offer
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-1 leading-tight text-[#FDB913]">
                  {titleInfo.mainText}
                </h2>

                {titleInfo.price && (
                  <div className="flex flex-col items-center gap-1 mb-2">
                    <div className="text-2xl line-through text-gray-400">
                      ₹9500/sq. yard
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-white">
                      {titleInfo.price}/sq. yard
                    </div>
                  </div>
                )}

                <p className="text-white/90 text-lg">
                  {titleInfo.subText}
                </p>

                {titleInfo.timeLeft && (
                  <div className="bg-[#FDB913] text-black px-4 py-2 rounded-lg inline-flex items-center gap-2 font-bold mb-6">
                    <FaClock className="text-sm" />
                    {formatTime(timeLeft)} left!
                  </div>
                )}
              </div>
            </div>

            {/* Form Section */}
            <div className="p-6 bg-white rounded-b-2xl">
              {showSubmissionSuccess ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-4 inline-block"
                  >
                    <div className="w-16 h-16 bg-[#FDB913] rounded-full flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-black"
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
                  <h3 className="text-2xl font-bold text-[#FDB913] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[#151f28]">
                    Your request has been submitted successfully. We'll contact
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FDB913]" />
                    <input
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-12 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDB913] border border-gray-600 hover:border-[#FDB913] transition-colors"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FDB913]" />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      minLength="10"
                      maxLength="15"
                      required
                      className="w-full p-3 pl-12 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDB913] border border-gray-600 hover:border-[#FDB913] transition-colors"
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
                    id="popup"
                    disabled={isLoading || !recaptchaLoaded}
                    className="w-full py-4 px-6 bg-[#FDB913] text-black rounded-xl hover:bg-[#FDB913]/90 transition-all shadow-lg hover:shadow-[#FDB913]/25 font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : recaptchaLoaded ? (
                      <>
                        Talk To Investment Advisor
                      </>
                    ) : (
                      "Loading..."
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting, you agree to receive calls/WhatsApp messages about our services
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}