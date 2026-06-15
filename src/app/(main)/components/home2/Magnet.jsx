"use client"
import React, { useState, useEffect, useRef } from 'react'

export default function Magnet() {

    const [formData, setFormData] = useState({ 
      fullName: "", 
      phone: "",
      investmentAmt: "",
      city: ""
    });
    const [submissionCount, setSubmissionCount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const recaptchaRef = useRef(null);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
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
        const storedCount = parseInt(localStorage.getItem("formSubmissionCount") || "0", 10);
        const lastSubmissionTime = parseInt(localStorage.getItem("lastSubmissionTime") || "0", 10);
        
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
            if (storedCount >= 3) {
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
  
      // Phone validation - accept various formats (10-15 digits)
      if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
        setErrorMessage("Please enter a valid phone number (10-15 digits)");
        return false;
      }
  
      // Check submission limits
      if (submissionCount >= 3) {
        setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
        setIsDisabled(true);
        return false;
      }
  
      return true;
    };
  
    const onRecaptchaSuccess = async (token) => {
      try {
        // Build notes field with city and investment amount
        const notesArray = [];
        if (formData.city) {
          notesArray.push(`City: ${formData.city}`);
        }
        if (formData.investmentAmt) {
          notesArray.push(`Investment Amount: ${formData.investmentAmt}`);
        }
        const notes = notesArray.join(' | ');

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
                notes: notes, // City and Investment Amount combined
                source: "Dholera Times",
              },
              source: "Dholera Times Website",
              tags: ["Dholera Investment", "Website Lead", "Bulk Land"],
              recaptchaToken: token,
            }),
          }
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
            setFormData({ fullName: "", phone: "", investmentAmt: "", city: "" });
            setShowPopup(true);
  
            // Update submission count
            const newCount = submissionCount + 1;
            setSubmissionCount(newCount);
            if (typeof window !== "undefined") {
              localStorage.setItem("formSubmissionCount", newCount.toString());
              localStorage.setItem("lastSubmissionTime", Date.now().toString());
            }
            /* Google Tag */
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "lead_form",
              page_name: "Dholera Times",
            });
  
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
        setErrorMessage("Security verification not loaded. Please refresh the page.");
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
    <>
      <div className='bg-[#151f28] flex items-center justify-center p-6 z-50'>
        <div className='w-full max-w-6xl'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
              <div>
                <label className='block text-xs md:text-base font-medium uppercase tracking-wide mb-2 text-[#d3b36b]'>
                  Investment Amount
                </label>
                <div className='relative'>
                  <select 
                    name="investmentAmt"
                    value={formData.investmentAmt}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-transparent border-b-2 border-[#d3b36b]/30 text-sm md:text-lg outline-none transition-colors appearance-none cursor-pointer pr-10 text-[#d3b36b] focus:border-[#d3b36b]'
                  >
                    <option value="">Select Amount</option>
                    <option value="10-25">₹10L - ₹25L</option>
                    <option value="25-50">₹25L - ₹50L</option>
                    <option value="50-100">₹50L - ₹1Cr</option>
                    <option value="100+">₹1Cr+</option>
                  </select>
                  <div className='absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none'>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 7L11 1" stroke="#d3b36b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className='block text-xs md:text-base font-medium uppercase tracking-wide mb-2 text-[#d3b36b]'>
                  Full Name*
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className='w-full px-4 py-3 bg-transparent border-b-2 border-[#d3b36b]/30 text-sm md:text-lg outline-none transition-colors text-[#d3b36b] focus:border-[#d3b36b] placeholder:text-[#d3b36b]/40'
                  required
                />
              </div>
              
              <div>
                <label className='block text-xs md:text-base font-medium uppercase tracking-wide mb-2 text-[#d3b36b]'>
                  City
                </label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city "
                  className='w-full px-4 py-3 bg-transparent border-b-2 border-[#d3b36b]/30 text-sm md:text-lg outline-none transition-colors text-[#d3b36b] focus:border-[#d3b36b] placeholder:text-[#d3b36b]/40'
                />
              </div>
              
              <div>
                <label className='block text-xs md:text-base font-medium uppercase tracking-wide mb-2 text-[#d3b36b]'>
                  Phone Number*
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit number"
                  maxLength="10"
                  className='w-full px-4 py-3 bg-transparent border-b-2 border-[#d3b36b]/30 text-sm md:text-lg outline-none transition-colors text-[#d3b36b] focus:border-[#d3b36b] placeholder:text-[#d3b36b]/40'
                  required
                />
              </div>

              <div className='mt-8 max-sm:flex max-sm:justify-center max-sm:items-center'>
                <button 
                  type="submit"
                  disabled={isDisabled || isLoading}
                  className='w-full md:px-12 py-2 rounded-lg bg-[#d3b36b] text-[#151f28] font-semibold uppercase tracking-wide text-sm md:text-lg transition-all hover:bg-[#c4a45c] hover:shadow-lg hover:shadow-[#d3b36b]/30 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className='mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm'>
                {errorMessage}
              </div>
            )}

            {/* Hidden reCAPTCHA container */}
            <div ref={recaptchaRef} className='mt-4'></div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[100]'>
          <div className='bg-[#151f28] p-8 rounded-lg border-2 border-[#d3b36b] max-w-md'>
            <h3 className='text-2xl font-bold text-[#d3b36b] mb-4'>Thank You!</h3>
            <p className='text-gray-300 mb-6'>Your submission has been received successfully.</p>
            <button 
              onClick={() => setShowPopup(false)}
              className='px-6 py-2 bg-[#d3b36b] text-[#151f28] font-semibold rounded-lg hover:bg-[#c4a45c] transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}