"use client"
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { X } from "lucide-react"; // Import the X icon from lucide-react

export default function PopupForm({ title, headline, buttonName, onClose, trustBadge }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get submission count and last submission timestamp
    let submissionCount = localStorage.getItem("formSubmissionCount") || 0;
    let lastSubmissionTime = localStorage.getItem("lastSubmissionTime");

    // Check if 24 hours have passed since the last submission
    if (lastSubmissionTime) {
      const timeDifference = Date.now() - parseInt(lastSubmissionTime, 10);
      const hoursPassed = timeDifference / (1000 * 60 * 60); // Convert ms to hours

      if (hoursPassed >= 24) {
        // Reset submission count after 24 hours
        submissionCount = 0;
        localStorage.setItem("formSubmissionCount", 0);
        localStorage.setItem("lastSubmissionTime", Date.now().toString());
      }
    }

    // Restrict submission after 20 attempts
    if (submissionCount >= 20) {
      alert(
        "You have reached the maximum submission limit. Try again after 24 hours."
      );
      setIsLoading(false);
      setIsDisabled(true);
      return;
    }

    // Validate form data
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
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
              name: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              source: "Dholera Times",
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Website Lead"],
          }),
        }
      );

      // Store response text before parsing
      const responseText = await response.text();

      // Check response status and handle accordingly
      if (response.ok) {
        if (
          responseText === "OK" ||
          responseText.toLowerCase().includes("success")
        ) {
          setFormData({ fullName: "", email: "", phone: "" }); // Reset all form fields
          setShowPopup(true); // Show popup on success

          // Increment submission count & store time
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
          // Handle unexpected response
          console.log("Response Text:", responseText);
          alert("Submission received but with unexpected response");
        }
      } else {
        console.error("Server Error:", responseText);
        throw new Error(responseText || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-blue-50 to-white p-8 shadow-2xl w-full max-w-lg md:min-w-[600px] mx-auto border border-gray-200 rounded-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#151f28] transition"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-3xl font-bold text-center text-[#151f28] mb-6">
          {title}
        </h2>
        <h2 className="font-medium text-center text-[#151f28] mb-6">
          {headline}
        </h2>
        {isDisabled ? (
          <p className="text-center text-red-500 font-semibold">
            You have reached the maximum submission limit. Try again after 24
            hours.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-500" />
              <input
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-500" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
              />
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-4 text-gray-500" />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 rounded-xl border border-gray-300 text-[#151f28] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isDisabled}
              className={`w-full p-4 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ${
                isLoading || isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#be9233] hover:bg-[#dbaf51] hover:shadow-lg active:scale-95"
              }`}
            >
              {isLoading ? "Submitting..." : buttonName}
            </button>
            <p className="font-normal text-lg text-center text-blue-500">{trustBadge}</p>
          </form>
        )}
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-lg">
            <h3 className="text-2xl font-bold text-center text-[#151f28] mb-4">
              Thank You!
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Your form has been submitted successfully. We'll get back to you
              soon.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#be9233] hover:bg-[#dbaf51] text-white font-semibold py-3 px-4 rounded-xl transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}