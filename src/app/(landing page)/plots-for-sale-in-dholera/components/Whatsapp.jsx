"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const PHONE = "+919958993549";
const WA_URL = `https://wa.me/919958993549?text=${encodeURIComponent("Hi, I need a call back")}`;

// Safe GTM push — won't throw if dataLayer isn't ready yet
function pushEvent(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
  
 const FloatingButtons = () => {
/*  const handleCallClick = () => {
      _tfa.push({notify: 'event', name: 'Whatsapp', id: 2018249})
    window.location.href = `tel:${PHONE}`;
  };

  const handleWhatsAppClick = () => {
      _tfa.push({notify: 'event', name: 'Whatsapp', id: 2018249})
    // noopener,noreferrer — security best practice for _blank links
    window.open(WA_URL, "_blank", "noopener,noreferrer");
  }; */

  return (
    <div
      className="trackerx fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-around lg:hidden z-50"
      role="toolbar"
      aria-label="Quick contact options"
    >
      <button
        //onClick={handleWhatsAppClick}
        className="flex items-center justify-center gap-2 text-green-500 text-lg font-semibold touch-manipulation"
        id="whatsapp-mobile"
        type="button"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} aria-hidden="true" />
        WhatsApp
      </button>

      <button
        //onClick={handleCallClick}
        className="flex items-center justify-center gap-2 text-blue-500 text-lg font-semibold touch-manipulation"
        id="call-now-mobile"
        type="button"
        aria-label="Call us now"
      >
        <FaPhoneAlt size={24} aria-hidden="true" />
        Call
      </button>
    </div>
  );
};

export default FloatingButtons;