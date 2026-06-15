"use client";
import Image from "next/image";
import get from "@/assets/contact-dholera-times-desktop.webp";
import getM from "@/assets/contact-dholera-times-mobile.webp";
import {
  FaPhoneAlt,
  FaHeadset,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import ContactForm from "../../components/ContactForm";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactDetails() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dholera Times",
    image: "",
    "@id": "",
    url: "https://www.dholeratimes.com/",
    telephone: "+91 99589 93549",
    priceRange: "7Lac",
    address: {
      "@type": "PostalAddress",
      streetAddress: "JMD MEGAPOLIS, 620, Badshahpur Sohna Rd Hwy, Sector 48",
      addressLocality: "Gurugram",
      postalCode: "122018",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4195542,
      longitude: 77.0386216,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:30",
      closes: "19:30",
    },
    sameAs: [
      "https://www.facebook.com/people/Dholera-Times",
      "https://x.com/dholeratimes/",
      "https://www.instagram.com/p/DJVtydWBCoK/",
      "https://www.youtube.com/@dholeratimes",
      "https://www.linkedin.com/company/dholera-times",
      "https://www.dholeratimes.com/",
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dholeratimes.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us",
        item: "https://www.dholeratimes.com/contact",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Inquiry",
        item: "https://www.dholeratimes.com/contact/inquiry",
      },
    ],
  };

  return (
    <>
      <meta name="robots" content="index, dofollow" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="bg-gray-900 w-full">
        <title>
          Contact Us | Dholera Times – Real Estate Experts in Dholera Smart City
        </title>
        <meta
          name="description"
          content="Get in touch with our team for plot bookings, site visits, or investment advice in Dholera Smart City. Call, WhatsApp or visit us."
        />
        <meta
          name="keywords"
          content="Expert guidance on dholera Smart City, Contact dholera times , Dholera investment consultation, Book plot in dholera , Dholera inquiry, Dholera Investment "
        />
        <link
          rel="canonical"
          href="https://www.dholeratimes.com/contact/inquiry"
        />

        <div className="relative h-[50vh] w-full ">
          {/* Banner Image */}
          <Image
            src={get}
            alt="Get in touch with Dholera Times team for inquiries and support"
            className="h-full w-full object-cover max-sm:hidden"
            fill
            priority
          />
          <Image
            src={getM}
            alt="Get in touch with Dholera Times team for inquiries and support"
            className="h-full w-full object-cover md:hidden"
            fill
            priority
          />
        </div>
      </div>

      <div className="">
        {/* Header Section */}

        {/* Contact Cards Section */}
        <div className="bg-white pt-4 pb-2">
          <h1 className="text-center mb-6 font-bold text-4xl max-sm:text-3xl max-sm:ml-4 max-sm:text-left">
            Get Expert Guidance on Dholera Smart City
          </h1>
          <p className="max-w-5xl mx-auto pb-6">
            Looking for trusted guidance on Dholera Smart City investment
            opportunities? Contact Dholera Times for expert assistance on
            residential plots, project updates, legal clarity, site visits, and
            investment consultation. Our team helps investors make informed
            decisions with transparent support and verified information.
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-10">
            {/* Call Us */}
            <div className="hover:scale-105 shadow-2xl transition-transform duration-300">
              <a
                href="tel:+919958993549"
                className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-center gap-4 items-center text-center"
              >
                <FaPhoneAlt className="text-gray-800 text-3xl" />
                <h2 className="text-lg font-semibold text-gray-800">Call Us</h2>
              </a>
            </div>

            {/* WhatsApp */}
            <div className="hover:scale-105 shadow-2xl transition-transform duration-300">
              <a
                href="https://api.whatsapp.com/send?phone=919958993549"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-center gap-4 items-center text-center"
              >
                <FaWhatsapp className="text-gray-800 text-3xl" />
                <h2 className="text-lg font-semibold text-gray-800">
                  WhatsApp Us
                </h2>
                
              </a>
            </div>
          </div>

          {/* Address Section */}

          {/* Social Media Links */}
          <div className="mt-10 ">
            {/* Contact Info & Contact Form */}
            <div className="flex flex-col max-sm:flex-col-reverse md:flex-row justify-center items-center gap-16 p-6">
              {/* Contact Info Section */}
              <div className="max-w-2xl text-left">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Speak With Dholera Property Experts
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Whether you want details about Dholera plots, pricing,
                      location advantages, or government-backed infrastructure
                      developments, our experts are here to assist you.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {[
                      "Get answers to your Dholera investment questions",
                      "Request project details and pricing",
                      "Book a Dholera site visit",
                      "Get guidance on registry-ready plots",
                      "Discuss long-term investment opportunities",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Form Section */}
              <div>
                <ContactForm
                  title="Enquire Now"
                  headline="Book your free consultation with our Dholera expert — no obligations, just guidance. Fields marked with * are mandatory."
                  buttonName="Get A Call Back"
                />
              </div>
            </div>
            <div className="space-y-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Follow Us
              </h2>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61573763438050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-3xl hover:text-blue-800"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://x.com/dholeratimes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-3xl hover:text-blue-600"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/dholeratimes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-3xl hover:text-pink-700"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/dholera-times"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-3xl hover:text-blue-900"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
