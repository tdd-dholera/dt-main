import React from "react";
import { FaWhatsapp,  FaPhoneAlt } from "react-icons/fa";
import Whatsapp from "./Whatsapp";

export default function FloatingIcons() {
  return (
    <div className="">
      {/* Call Button */}
      {/* <a href="tel:+919958993549" 
         className="bg-blue-600 text-white p-3 shadow-lg hover:bg-blue-700 transition">
        <FaPhoneAlt className=" size-5 md:size-7" />
      </a>  

      <a href="https://api.whatsapp.com/send?phone=919958993549" target="_blank" rel="noopener noreferrer"
         className="bg-green-500 text-white p-3 shadow-lg hover:bg-green-600 transition">
        <FaWhatsapp className=" size-5 md:size-7" />
      </a> */}

      <Whatsapp/>
      <Whatsapp className="left-20"/>
    </div>
  );
}
