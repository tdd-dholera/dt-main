import React from "react";
import hero from "@/assets/hero5.webp";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <>
      <meta name="robots" content="index, dofollow"/>
      <link
          rel="canonical"
          href="https://www.dholeratimes.com/policies/refund"
      />
      <div className="relative w-full h-[40vh]">
        <Image src={hero} alt="hero" layout="fill" objectFit="cover" priority />
      </div>
      <div className="max-w-7xl mx-auto py-16 px-5 leading-relaxed">
        <h1 className="text-5xl font-bold pb-6">Refund & Cancellation Policy </h1>

        <ol className="list-decimal ml-6 space-y-4">
          <li>
          	In the case of cancellation, you can request a refund within 30 days and the payment will be returned to you within 7 working days of refund initiated (subject to change without prior notice).
          </li>
          <li>
          	The booking amount is Rs. 50,000 (Subject to change without prior notice).
          </li>
          <li>
          The plot price and charges are subject to change without prior notice.
          </li>
          <li>
          	Maintenance charges are one-time and non-refundable.
          </li>
          <li>
          Preferred Location Charge (PLC) will be added where necessary.
          </li>
          <li>
          The final payment must be completed within the stipulated period.
          </li>
          <li>
          Full payment is to be completed within 30 days.
          </li>
          
          <li>
       	Stamp duty on the investor's purchase of the property will be charged at 4.90% for females and 5.90% for males of the sale consideration until further notice by the Government of Gujarat. The government will charge GST in accordance with its regulations.
          </li>
          <li>
          Legal fees cover documentation and registration expenses.
          </li>
          </ol>
        <br/>
        <p>
        For further information, write to us at:{" "}
          <a
            href="mailto:info@dholeratimes.com"
            className="text-blue-600 underline font-bold"
          >
            info@dholeratimes.com
          </a>{" "}
          or call us on{" "}
          <a
            href="tel:+919958993549"
            className="text-blue-600 underline font-bold"
          >
            +91 9958993549
          </a>
          .
        </p>
      </div>
    </>
  );
}
