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
    basePlotPriceYards: 6700, // Base price without PLC
    plotAreaFeet: '',
    totalPaymentYards: '',
    maintenanceRate: 500, // Default maintenance rate
    maintenanceCharge: 0,
    totalCharges: 0,
    plotTotalPayment: 0,
  });

  // Calculate the final plot price including PLC
  const plotPriceWithPLC = parseFloat(formData.basePlotPriceYards) + (parseFloat(formData.plc) || 0);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formData.plotAreaYards && formData.basePlotPriceYards) {
      const plotPrice = plotPriceWithPLC;
      const totalPayment = formData.plotAreaYards * plotPrice;
      const maintenance = formData.plotAreaYards * formData.maintenanceRate; // Use selected maintenance rate
      const totalCharges = maintenance + 15000; // Legal Fee is Rs15000
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
  }, [formData.plotAreaYards, formData.basePlotPriceYards, formData.plc, formData.maintenanceRate]);

  // Function to generate the PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    const { name, phone, email, plc, plotNo, plotAreaYards, plotAreaFeet, totalPaymentYards, maintenanceRate, maintenanceCharge, totalCharges, plotTotalPayment } = formData;

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
          [`Maintenance Charge (${maintenanceRate} x Size)`, `Rs. ${formattedMaintenanceCharge}`],
          ['Legal Fee (Per Sale Deed)', 'Rs. 20,000.00'],
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
    };

    img.onerror = () => {
      console.error("Error loading image.");
    };
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl shadow-gray-500 rounded-lg p-6 mt-10">
      <p className="text-center text-3xl font-bold text-gray-700 mb-4">Plot Price Calculation</p>
      <form>
        <table className="w-full border-collapse">
          <tbody>
            {/* Name */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Name</td>
              <td className="p-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            {/* Phone Number */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Phone Number</td>
              <td className="p-2">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </td>
            </tr>
            {/* Email */}
            <tr className="border-b">
              <td className="p-2 font-semibold">Email</td>
              <td className="p-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
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
                  value="15000.00"
                  className="border p-2 w-full rounded"
                  readOnly
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
                  className="border p-2 w-full rounded"
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
                  className="border p-2 w-full rounded"
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="button"
          onClick={generatePDF}
          className="bg-blue-600 text-white p-2 mt-6 w-full rounded hover:bg-blue-700 transition-colors"
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
}