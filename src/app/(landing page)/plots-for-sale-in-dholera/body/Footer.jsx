"use client";
import React from "react";
import Link from "next/link";

import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  PhoneCall,
} from "lucide-react";

const Footer = () => {
  const handleCallClick = () => {
    // 🔥 Google Tag Manager event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "click_to_call",
      lead_type: "phone",
      device: "mobile",
    });

    // 📞 Call trigger
    window.location.href = "tel:+919958993549";
  };

  return (
    <footer id="footer" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#d3b36b] mb-4 border-b border-yellow-200 pb-2">
              About Us
            </h3>
            <p className="text-black mb-4">
              Dholera Times delivers verified, clear documentation and project
              details in Dholera - trusted by 561+ investors for transparent,
              expert-led investments.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61573763438050"
                className="text-gray-500 hover:text-[#d3b36b] transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/dholeratimes"
                className="text-gray-500 hover:text-[#d3b36b] transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/dholeratimes/"
                className="text-gray-500 hover:text-[#d3b36b] transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/dholera-times"
                className="text-gray-500 hover:text-[#d3b36b] transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#d3b36b] mb-4 border-b border-yellow-200 pb-2">
              Policies
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/copyright"
                  className="text-black hover:text-[#d3b36b] transition flex items-center"
                >
                  <span className="mr-2">›</span> Copyright Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/terms"
                  className="text-black hover:text-[#d3b36b] transition flex items-center"
                >
                  <span className="mr-2">›</span> Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/privacy"
                  className="text-black hover:text-[#d3b36b] transition flex items-center"
                >
                  <span className="mr-2">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/plots-for-sale-in-dholera/policy/refund-and-cancellation"
                  className="text-black hover:text-[#d3b36b] transition flex items-center"
                >
                  <span className="mr-2">›</span> Refund & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-semibold text-[#d3b36b] mb-4 border-b border-yellow-200 pb-2">
              Reach Our Head office
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 text-yellow-500 mr-3 mt-1">
                  <MapPin size={18} />
                </div>
                <span className="text-black">
                  Dlf Capital Greens, Shivaji Marg, Karampura Industrial Area,
                  Karam Pura, Delhi - 110015, India
                </span>
              </li>
              <li className="flex items-center">
                <div className="flex-shrink-0 text-yellow-500 mr-3">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:info@Dholera Times.com"
                  className="text-black hover:text-[#d3b36b] transition"
                >
                  info@dholeratimes.com
                </a>
              </li>
              <li className="flex items-center" onClick={handleCallClick}>
                <div className="flex-shrink-0 text-yellow-500 mr-3">
                  <PhoneCall size={18} />
                </div>
                <a
                  href="tel:+919958993549"
                  className="text-black hover:text-[#d3b36b] transition"
                >
                  +91 99 58 99 35 49
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Dholera Times™. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
