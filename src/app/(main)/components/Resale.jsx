import { useState, useEffect, useRef } from "react";
import { User, Phone, MessageCircle } from "lucide-react";

export default function ContactForm({ 
  title = "Contact Us", 
  headline = "Fill out the form below and we'll get back to you soon", 
  buttonName = "Submit Form" 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    // Load reCAPTCHA script
    const loadRecaptcha = () => {
      if (typeof window !== "undefined" && !window.grecaptcha) {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => {
          console.error("Failed to load reCAPTCHA script");
          setRecaptchaLoaded(false);
        };
        document.head.appendChild(script);
      } else if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      }
    };

    loadRecaptcha();

    return () => {
      // Cleanup reCAPTCHA
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone) {
      setErrorMessage("Please fill in all required fields");
      return false;
    }

    if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    return true;
  };

  const handleRecaptchaVerification = async () => {
    if (!window.grecaptcha || !recaptchaLoaded) {
      throw new Error("reCAPTCHA not loaded");
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action: 'submit' })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Validate form
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Check submission limits
    let submissionCount = localStorage.getItem("formSubmissionCount") || 0;
    let lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

    if (lastSubmissionTime) {
      const timeDifference = Date.now() - parseInt(lastSubmissionTime, 10);
      const hoursPassed = timeDifference / (1000 * 60 * 60);

      if (hoursPassed >= 24) {
        submissionCount = 0;
        localStorage.setItem("formSubmissionCount", 0);
        localStorage.setItem("lastSubmissionTime", Date.now().toString());
      }
    }

    if (submissionCount >= 3) {
      setErrorMessage("You have reached the maximum submission limit. Try again after 24 hours.");
      setIsDisabled(true);
      setIsLoading(false);
      return;
    }

    try {
      // Verify reCAPTCHA
      const token = await handleRecaptchaVerification();

      // API Request
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
              name: formData.name,
              phone: formData.phone,
              message: formData.message,
              source: "Dholera Times Resale",
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead"],
            recaptchaToken: token,
          }),
        }
      );

      const responseText = await response.text();

      if (response.ok) {
        if (responseText === "OK" || responseText.toLowerCase().includes("success")) {
          setFormData({ name: "", phone: "", message: "" });
          setShowPopup(true);

          submissionCount++;
          setSubmissionCount(submissionCount);
          localStorage.setItem("formSubmissionCount", submissionCount);
          localStorage.setItem("lastSubmissionTime", Date.now().toString());
           /* Google Tag */
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "lead_form",
          });
        } else {
          console.log("Response Text:", responseText);
          setErrorMessage("Submission received but with unexpected response");
        }
      } else {
        throw new Error(responseText || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      <div className="bg-white p-8 shadow-2xl w-full max-w-2xl mx-auto border border-gray-200 rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-[#151f28] mb-4">
          {title}
        </h2>
        <p className="text-base text-center text-gray-600 mb-8">
          {headline}
        </p>
        
        {errorMessage && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        {isDisabled ? (
          <p className="text-center text-red-500 font-semibold">
            You have reached the maximum submission limit. Try again after 24 hours.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Mobile Number Input */}
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                name="phone"
                type="tel"
                placeholder="Mobile Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Message Input */}
            <div className="relative">
              <MessageCircle className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <textarea
                name="message"
                placeholder="Plot details"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm bg-gray-50 focus:bg-white resize-none"
                rows="4"
              ></textarea>
            </div>

            {/* reCAPTCHA - invisible */}
            <div 
              ref={recaptchaRef} 
              className="g-recaptcha" 
              data-sitekey={siteKey} 
              data-size="invisible"
            ></div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isDisabled || !recaptchaLoaded}
              className={`w-full p-4 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                isLoading || isDisabled || !recaptchaLoaded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95 transform"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Submitting...
                </div>
              ) : (
                buttonName
              )}
            </button>
            
            <p className="font-normal text-sm text-center text-gray-600">
              🔒 100% Privacy | ⚡ Fast Response | 👥 Personalized Support
            </p>
          </form>
        )}
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl transform animate-pulse">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#151f28] mb-4">
                Thank You!
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Your form has been submitted successfully. We'll get back to you soon.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}