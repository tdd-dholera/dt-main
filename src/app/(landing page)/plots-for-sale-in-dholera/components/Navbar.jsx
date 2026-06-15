"use client";
import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/DT-logo-transparent.png";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import GetinTouch from "./GetinTouch";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGetInTouchDropdownOpen, setIsGetInTouchDropdownOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  
  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const handleNavigation = (section) => {
    setIsMenuOpen(false);

    if (pathname === '/plots-for-sale-in-dholera') {
      const element = document.getElementById(section.replace('#', ''));
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push(`/plots-for-sale-in-dholera${section}`);
    }
  };

  const toggleGetInTouchDropdown = () => {
    setIsGetInTouchDropdownOpen(!isGetInTouchDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInTouchRef = useRef(null);
  const menuToggleRef = useRef(null);

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Navigation items
  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#westwyn-residency", label: "Westwyn Residency" },
    { href: "#dholera", label: "About Dholera" },
    { href: "#Why-BMA", label: "Why Dholera Times" },
  ];

  return (
    <nav className="bg-white h-20 md:h-24 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation("#hero")} 
            className="flex-shrink-0"
          >
            <Image
              src={logo}
              height={70}
              width={70}
              alt="Logo"
              className="cursor-pointer max-sm:h-[50px] max-sm:w-[50px]"
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="text-black hidden md:flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <button
                key={label}
                onClick={() => handleNavigation(href)}
                className="hover:text-[#e1b24c] text-[clamp(0.7rem,1vw,1.25rem)] transition duration-200"
              >
                {label}
              </button>
            ))}
            
            <div ref={getInTouchRef} className="relative group">
              <button
                className="text-black px-3 py-2 text-[clamp(0.7rem,1vw,1.25rem)] cursor-pointer flex items-center gap-1"
                onClick={toggleGetInTouchDropdown}
                onMouseEnter={() => setIsGetInTouchDropdownOpen(true)}
                onMouseLeave={() => setIsGetInTouchDropdownOpen(false)}
              >
                Get in Touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-black transition-transform duration-300 ${
                    isGetInTouchDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isGetInTouchDropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50 w-48"
                    onMouseEnter={() => setIsGetInTouchDropdownOpen(true)}
                    onMouseLeave={() => setIsGetInTouchDropdownOpen(false)}
                  >
                    <div className="py-2">
                      <button
                        onClick={openContactForm}
                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                      >
                        Book A Free Site Visit
                      </button>
                      <Link
                        href="tel:+918130371647"
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                        id="call-now"
                      >
                        Call Now
                      </Link>
                      <Link
                        href="https://wa.me/918130371647"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="whatsapp-git"
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                      >
                        WhatsApp Us
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu section with Get in Touch dropdown */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative">
              <button
                className="text-black text-base font-semibold px-3 py-2 cursor-pointer flex items-center gap-1"
                onClick={toggleGetInTouchDropdown}
              >
                Get in Touch
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-black transition-transform duration-300 ${
                    isGetInTouchDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isGetInTouchDropdownOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50 w-48"
                  >
                    <div className="py-2">
                      <button
                        onClick={openContactForm}
                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                      >
                        Enquire Now
                      </button>
                      <a
                        href="tel:+918130371647"
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                      >
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/918130371647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={toggleMenu} ref={menuToggleRef}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 font-semibold">
              {navItems.map(({ href, label }) => (
                <button
                  key={label}
                  onClick={() => handleNavigation(href)}
                  className="text-black hover:text-[#e1b24c] transition duration-200 text-left px-4 py-2"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <GetinTouch
              title="Best Investment-Ready Locations in Dholera"
              buttonName="Get A Call Back"
              onClose={() => setIsContactFormOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}