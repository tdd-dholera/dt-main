"use client"
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import icon from "@/assets/pdfIcon.webp"

function formatIndianNumber(value) {
  return parseFloat(value).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CostSheet() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotNo: '',
    plc: '',
    plotAreaYards: '',
    basePlotPriceYards: 9250, // Base price without PLC
    plotAreaFeet: '',
    totalPaymentYards: '',
    maintenanceRate: 500, // Default maintenance rate
    maintenanceCharge: 0,
    oneTimeMaintenance: 50000, // Default one-time maintenance value
    totalCharges: 0,
    plotTotalPayment: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  // Calculate the final plot price including PLC
  const plotPriceWithPLC = parseFloat(formData.basePlotPriceYards) + (parseFloat(formData.plc) || 0);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage(""); // Clear error messages on input change
  };

  useEffect(() => {
    if (formData.plotAreaYards && formData.basePlotPriceYards) {
      const plotPrice = plotPriceWithPLC;
      const totalPayment = formData.plotAreaYards * plotPrice;
      const maintenance = formData.plotAreaYards * formData.maintenanceRate;
      const totalCharges = maintenance + 20000 + parseFloat(formData.oneTimeMaintenance); // Legal Fee + One Time Maintenance
      const plotTotalPayment = totalPayment + totalCharges;
      const plotAreaFeet = formData.plotAreaYards * 9;
  
      setFormData(prevData => ({
        ...prevData,
        plotAreaFeet,
        totalPaymentYards: totalPayment.toFixed(2),
        maintenanceCharge: maintenance.toFixed(2),
        totalCharges: totalCharges.toFixed(2),
        plotTotalPayment: plotTotalPayment.toFixed(2),
      }));
    }

    // Get submission count from localStorage
    if (typeof window !== "undefined") {
      setSubmissionCount(
        parseInt(localStorage.getItem("costSheetSubmissionCount") || "0", 10)
      );
      setLastSubmissionTime(
        parseInt(localStorage.getItem("costSheetLastSubmissionTime") || "0", 10)
      );
    }
  }, [formData.plotAreaYards, formData.basePlotPriceYards, formData.plc, formData.maintenanceRate, formData.oneTimeMaintenance]);

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMessage("Please fill in Name, Phone, and Email fields to generate PDF");
      return false;
    }

    // Simple phone validation
    if (!/^\d{10,15}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number (10-15 digits)");
      return false;
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    // Check submission limits
    const now = Date.now();
    const hoursPassed = (now - lastSubmissionTime) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      // Reset counter if 24 hours have passed
      setSubmissionCount(0);
      localStorage.setItem("costSheetSubmissionCount", "0");
      localStorage.setItem("costSheetLastSubmissionTime", now.toString());
    } else if (submissionCount >= 5) {
      setErrorMessage("You have reached the maximum PDF generation limit. Try again after 24 hours.");
      return false;
    }

    return true;
  };

const submitToCRM = async () => {
  try {
    // Clean and validate the data before sending
    const phoneNumber = formData.phone.replace(/\D/g, ''); // Remove non-digits
    const cleanedName = formData.name.trim();
    const cleanedEmail = formData.email.trim().toLowerCase();

    // Additional validation
    if (!cleanedName || cleanedName.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }
    
    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error("Phone number must be at least 10 digits");
    }
    
    if (!cleanedEmail.includes('@') || !cleanedEmail.includes('.')) {
      throw new Error("Invalid email format");
    }

    // Format according to TeleCRM API requirements
    const crmData = {
      phoneNumber: phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`,
      fields: {
        name: cleanedName,
        email: cleanedEmail,
        phone: phoneNumber,
        source: "Dholera Times - Cost Sheet"
      }
    };

    console.log("Submitting to CRM:", crmData);

    // Use the correct API endpoint format
    const apiUrl = `https://api.telecrm.in/enterprise/67a30ac2989f94384137c2ff/autoupdatelead`;
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TELECRM_API_KEY}`,
      },
      body: JSON.stringify(crmData),
    });

    console.log("CRM Response status:", response.status);
    console.log("CRM Response headers:", response.headers);

    // Check if response is successful
    if (response.ok) {
      // Try to parse JSON response, but handle cases where response might be empty
      let data = {};
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
          console.log("CRM Response data:", data);
        } catch (jsonError) {
          console.log("Response is not valid JSON, but request was successful");
        }
      }

      // Success - update submission count
      const now = Date.now();
      setSubmissionCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("costSheetSubmissionCount", newCount.toString());
        localStorage.setItem("costSheetLastSubmissionTime", now.toString());
        return newCount;
      });
      
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return true;
    } else {
      // Handle error responses
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        errorMessage = errorData.message || errorData.error || errorData.details || errorMessage;
      } catch (jsonError) {
        // If we can't parse the error response, try to get response text
        try {
          const errorText = await response.text();
          console.log("Error response text:", errorText);
          if (errorText) errorMessage = errorText;
        } catch (textError) {
          console.log("Could not parse error response");
        }
      }
      
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("CRM submission error:", error);
    
    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      setErrorMessage("Network error: Could not connect to CRM. Please check your internet connection or disable ad blockers.");
    } else if (error.message.includes('401')) {
      setErrorMessage("Authentication error: Invalid API key. Please contact support.");
    } else if (error.message.includes('400')) {
      setErrorMessage("Bad request: Please check your input data format.");
    } else if (error.message.includes('429')) {
      setErrorMessage("Too many requests: Please wait a moment and try again.");
    } else if (error.message.includes('500')) {
      setErrorMessage("Server error: CRM service is temporarily unavailable.");
    } else if (error.message.includes('INVALID_DATA')) {
      setErrorMessage("Invalid data format: Please check your name, phone, and email fields.");
    } else {
      setErrorMessage(`CRM submission failed: ${error.message}. PDF will still be generated.`);
    }
    
    return false;
  }
};
  // Function to generate the PDF
  const generatePDF = async () => {
    setIsLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // Submit to CRM first
    await submitToCRM();

    const doc = new jsPDF();

    const { name, phone, email, plc, plotNo, plotAreaYards, plotAreaFeet, totalPaymentYards, maintenanceRate, maintenanceCharge, oneTimeMaintenance, totalCharges, plotTotalPayment } = formData;

    let startY = 40;

    // Load image and draw it before adding text
    const img = new Image();
    img.src = icon.src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Add image to PDF (top left corner)
      doc.addImage(img, "WEBP",  5, 5, 185, 38);

      // Project Heading
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      let pageWidth = doc.internal.pageSize.getWidth();
      const head = document.querySelector("h1")?.innerText || "Cost Sheet";
      let text = doc.getTextWidth(head);
      let xPosition = (pageWidth - text) / 2;
      doc.text(head, xPosition, 48);

      startY += 10;

      // Format Indian Numbers
      const formattedplc = formatIndianNumber(plc);
      const formattedPricePerYard = formatIndianNumber(plotPriceWithPLC);
      const formattedTotalPaymentYards = formatIndianNumber(totalPaymentYards);
      const formattedMaintenanceCharge = formatIndianNumber(maintenanceCharge);
      const formattedOneTimeMaintenance = formatIndianNumber(oneTimeMaintenance);
      const formattedTotalCharges = formatIndianNumber(totalCharges);
      const formattedPlotTotalPayment = formatIndianNumber(plotTotalPayment);

      // Table with details
      autoTable(doc,{
        startY: startY,
        body: [
          ['Name', name],
          ['Phone', phone],
          ['Email', email],
          ['PlotNo', plotNo],
          ['Plot Area (Sq. Yards)', plotAreaYards],
          ['Plot Area (Sq. Feet)', plotAreaFeet],
          ['Plot Price per Sq. Yard', `Rs. ${formatIndianNumber(formData.basePlotPriceYards)}`],
          ['Preffered Location Charges (PLC)', `Rs. ${formattedplc}`],
          ['Final Plot Price per Sq. Yard', `Rs. ${formattedPricePerYard}`],
          ['Total Payment', `Rs. ${formattedTotalPaymentYards}`],
        ],
        theme: 'grid',
        styles: { fontSize: 12, cellPadding: 3, lineWidth: 0.5, lineColor: [0, 0, 0] },
        headStyles: { fillColor: [0, 51, 102], textColor: 255, fontStyle: 'bold', lineWidth: 0.8 },
        alternateRowStyles: { fillColor: [225, 230, 255] },
        columnStyles: {
          0: { halign: 'left', cellWidth: 'auto' },
          1: { halign: 'right', cellWidth: 80 }
        }
      });

      let finalY = doc.lastAutoTable.finalY + 6;

      // Additional Charges Heading
      doc.setFontSize(14);
      doc.text('Additional Charges', pageWidth / 2, finalY, { align: "center" });

      // Table for Additional Charges
      autoTable(doc,{
        startY: finalY + 4,
        body: [
          [`Development Charge (${maintenanceRate} x Size)`, `Rs. ${formattedMaintenanceCharge}`],
          ['Legal Fee (Per Sale Deed)', 'Rs. 20,000.00'],
          ['Maintenance For 3 years', `Rs. ${formattedOneTimeMaintenance}`],
          ['Total Charges', `Rs. ${formattedTotalCharges}`],
          ['Plot Total Payment', `Rs. ${formattedPlotTotalPayment}`],
        ],
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 3, lineWidth: 0.5, lineColor: [0, 0, 0] },
        headStyles: { fillColor: [0, 51, 102], textColor: 255, fontStyle: "bold", lineWidth: 0.8 },
        alternateRowStyles: { fillColor: [225, 230, 255] },
        columnStyles: {
            0: { halign: 'left', cellWidth: 'auto' },
            1: { halign: 'right', cellWidth: 80 }
        }
      });

      finalY = doc.lastAutoTable.finalY;

      // Terms & Conditions Section
      doc.setFontSize(10);
      doc.text('Terms & Conditions:', 15, finalY + 8);
      doc.setFontSize(9);
      const terms = [
        "1. The booking amount is Rs. 50,000.",
        "2. You can request a refund within 30 days, and the payment will be returned to you within 7 days.",
        "3. This is a system-generated document and does not require a signature.",
        "4. The plot price and charges are subject to change without prior notice.",
        "5. Maintenance charges are one-time and non-refundable.",
        "6. Legal fees cover documentation and registration expenses.",
        "7. The final payment must be completed within the stipulated period.",
        "8. Full payment is to be completed within 30 days.",
        "9. For registry, stamp duty is 4.9% for females and 5.9% for males.",
        "10. Preferred Location Charge (PLC) will be added where necessary."
      ];

      terms.forEach((term, index) => {
        doc.text(term, 15, finalY + 18 + index * 5);
      });

      // Date of Generation
      let date = new Date().toLocaleDateString();
      doc.setFontSize(9);
      doc.text(`Date of Generation: ${date}`, 15, doc.internal.pageSize.height - 5);

      // Save PDF
      doc.save('Plot_Details.pdf');
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error("Error loading image.");
      setIsLoading(false);
    };
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl shadow-gray-500 rounded-lg p-6 mt-10">
      <p className="text-center text-3xl font-bold text-gray-700 mb-4">Plot Price Calculation</p>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form>
        <table className="w-full border-collapse">
          <tbody>
            {/* Name */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Name *</td>
              <td className="p-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </td>
            </tr>
            {/* Phone Number */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Phone Number *</td>
              <td className="p-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  minLength="10"
                  maxLength="15"
                  required
                />
              </td>
            </tr>
            {/* Email */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Email *</td>
              <td className="p-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </td>
            </tr>
            {/* Plot No */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot No</td>
              <td className="p-2">
                <input
                  type="text"
                  name="plotNo"
                  value={formData.plotNo}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
            {/* PLC */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Preferred Location Charge (PLC)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="plc"
                  value={formData.plc}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
            {/* Plot Area */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Area (Sq. Yards)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="plotAreaYards"
                  value={formData.plotAreaYards}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
            {/* Plot Area (Feet) */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Area (Sq. Feet)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="plotAreaFeet"
                  value={formData.plotAreaFeet}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            {/* Base Plot Price per Yard */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Base Plot Price per Sq. Yard</td>
              <td className="p-2">
                <input
                  type="number"
                  name="basePlotPriceYards"
                  value={formData.basePlotPriceYards}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>
            {/* Final Plot Price per Yard (calculated) */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Final Plot Price per Sq. Yard (Base + PLC)</td>
              <td className="p-2">
                <input
                  type="text"
                  value={plotPriceWithPLC.toFixed(2)}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
            {/* Total Payment */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Total Payment</td>
              <td className="p-2">
                <input
                  type="text"
                  name="totalPaymentYards"
                  value={formData.totalPaymentYards}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>

            {/* Additional Charges Section */}
            <tr className="border-b bg-gray-100">
              <td colSpan="2" className="p-2 font-bold text-center">Additional Charges</td>
            </tr>

            {/* Maintenance Charge Rate Dropdown */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Maintenance Charge Rate</td>
              <td className="p-2">
                <select
                  name="maintenanceRate"
                  value={formData.maintenanceRate}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="100">100</option>
                  <option value="500">500</option>
                </select>
              </td>
            </tr>

            {/* Maintenance Charge */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Maintenance Charge ({formData.maintenanceRate} x Size)</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.maintenanceCharge}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>

            {/* Legal Fee */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Legal Fee (Per Sale Deed)</td>
              <td className="p-2">
                <input
                  type="text"
                  value="20000.00"
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2 font-semibold">One Time Maintenance(for 3 years)</td>
              <td className="p-2">
                <input
                  type="number"
                  name="oneTimeMaintenance"
                  value={formData.oneTimeMaintenance}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </td>
            </tr>

            {/* Total Charges */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Total Charges</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.totalCharges}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>

            {/* Plot Total Payment */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Plot Total Payment</td>
              <td className="p-2">
                <input
                  type="text"
                  value={formData.plotTotalPayment}
                  className="border p-2 w-full rounded bg-gray-100"
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="button"
          onClick={generatePDF}
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 mt-6 w-full rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating PDF..." : "Generate PDF"}
        </button>
        
        <p className="text-sm text-gray-600 mt-2 text-center">
          * Required fields for PDF generation
        </p>
      </form>
    </div>
  );
}