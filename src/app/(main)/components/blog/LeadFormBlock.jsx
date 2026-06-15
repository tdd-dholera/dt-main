"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";

export default function LeadFormBlock({
  title = "Get Dholera Project Details",
  description = "Get brochure, price details, location map, and site visit plan.",
  buttonText = "Get A Call Back",
  helperText = "Your details are safe. Our team will call you shortly.",
  sourceLabel = "Blog Lead Form",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha && siteKey) {
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
      } else if (window.grecaptcha || !siteKey) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      const storedCount = parseInt(
        localStorage.getItem("formSubmissionCount") || "0",
        10,
      );
      const lastSubmissionTime = parseInt(
        localStorage.getItem("lastSubmissionTime") || "0",
        10,
      );

      // Check if 24 hours have passed since the last submission
      if (lastSubmissionTime) {
        const timeDifference = Date.now() - lastSubmissionTime;
        const hoursPassed = timeDifference / (1000 * 60 * 60);

        if (hoursPassed >= 24) {
          // Reset submission count after 24 hours
          setSubmissionCount(0);
          localStorage.setItem("formSubmissionCount", "0");
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
        } else {
          setSubmissionCount(storedCount);
          // Check if limit reached
          if (storedCount >= 20) {
            setIsDisabled(true);
          }
        }
      } else {
        setSubmissionCount(storedCount);
      }
    }

    // Cleanup function
    return () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          window.grecaptcha.reset();
        } catch (e) {
          console.log("reCAPTCHA cleanup error:", e);
        }
      }
    };
  }, [siteKey]);

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

    // Email validation (optional field)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
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
      // API Request using the new endpoint and format
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
              source: "Dholera Times",
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead", "Common Form"],
            recaptchaToken: token,
          }),
        },
      );

      // Store response text before parsing
      const responseText = await response.text();
      console.log("TeleCRM Response:", responseText);

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          // Success handling
          setFormData({ fullName: "", email: "", phone: "" });
          setShowPopup(true);

          // Update submission count
          const newCount = submissionCount + 1;
          setSubmissionCount(newCount);
          if (typeof window !== "undefined") {
            localStorage.setItem("formSubmissionCount", newCount.toString());
            localStorage.setItem("lastSubmissionTime", Date.now().toString());
          }
        } else {
          console.log("Response Text:", responseText);
          setErrorMessage("Submission received but with unexpected response");
        }
      } else {
        console.error("Server Error:", responseText);
        throw new Error(responseText || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);

      // Reset reCAPTCHA
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
    <section className="my-8 w-full">
      <div className="rounded-[22px] border border-[#d3b36b]/35 bg-[#fffaf0] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] sm:p-6">
        <div className="mb-5">
          <h3 className="text-[clamp(1.35rem,5vw,1.65rem)] font-extrabold leading-tight text-[#111111]">
            {title}
          </h3>

          {description ? (
            <p className="mt-2 text-base leading-relaxed text-[#3f3f3f]">
              {description}
            </p>
          ) : null}
        </div>

        {success ? (
          <div className="rounded-2xl bg-white p-4 text-base font-bold leading-relaxed text-[#111111] shadow-sm">
            Thank you. Our team will share the project details shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="grid gap-1.5 text-sm font-bold text-[#222222]">
              Your Name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
                className="min-h-12 w-full rounded-xl border border-[#dddddd] bg-white px-4 text-base text-[#111111] outline-none transition focus:border-[#d3b36b] focus:ring-4 focus:ring-[#d3b36b]/20"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-bold text-[#222222]">
              Phone Number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                inputMode="tel"
                className="min-h-12 w-full rounded-xl border border-[#dddddd] bg-white px-4 text-base text-[#111111] outline-none transition focus:border-[#d3b36b] focus:ring-4 focus:ring-[#d3b36b]/20"
              />
            </label>
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
                    : "bg-[#b69b5e]hover:bg-[#d3b36b] text-white shadow-md"
                }`}
              >
                {isLoading ? "Submitting..." : "Get A Call Back"}
              </button>
            </div>

            {helperText ? (
              <p className="text-sm leading-relaxed text-[#555555]">
                {helperText}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}
