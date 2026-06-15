"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserIcon, PhoneIcon, MailIcon } from "lucide-react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submission starts
    setError("");

    // Validate form data
    if (!formData.fullName || !formData.phoneNumber || !formData.emailId) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Format phone number (remove any non-digit characters)
    const formattedPhone = formData.phoneNumber.replace(/\D/g, '');
    
    // Additional validation for phone number
    if (formattedPhone.length < 10) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    try {
      // Log the request details for debugging
      console.log("Submitting data:", {
        name: formData.fullName,
        phone: formattedPhone,
        email: formData.emailId
      });

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
              phone: formattedPhone,
              email: formData.emailId,
            },
            source: "Dholera Times Website",
            tags: ["Dholera Investment", "Event Lead"],
          }),
        }
      );

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      if (response.ok) {
        if (responseText === "OK" || responseText.toLowerCase().includes("success")) {
          setFormData({ fullName: "", phoneNumber: "", emailId: "" });
          setShowPopup(true);
        } else {
          console.error("Unexpected response:", responseText);
          setError("Unexpected response from server. Please try again.");
        }
      } else {
        console.error("Server error:", response.status, responseText);
        setError(`Server error (${response.status}). Please try again later.`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            Join us
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-[#151f28]">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md p-3 border focus:ring-[#151f28] focus:border-[#151f28]"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone no <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md p-3 border focus:ring-[#151f28] focus:border-[#151f28]"
                    placeholder="Enter your phone number"
                    maxLength="15" // Set a reasonable max length
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md p-3 border focus:ring-[#151f28] focus:border-[#151f28]"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm py-2">{error}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 text-white bg-[#151f28] rounded-md hover:bg-red-900 focus:ring-2 focus:ring-offset-2 focus:ring-[#151f28] ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending Request..." : "Send Request"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-2xl">
            <h3 className="text-2xl font-semibold text-[#151f28] mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">You'll get a call back shortly</p>
            <div className="space-y-3">
              <Link href="/pages/projects" className="block">
                <button className="w-full p-3 bg-[#151f28] text-white rounded-lg hover:bg-blue-600 transition-all">
                  Explore Projects
                </button>
              </Link>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full p-3 text-[#151f28] border border-gray-300 rounded-lg hover:bg-gray-100 transition-all mt-3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}