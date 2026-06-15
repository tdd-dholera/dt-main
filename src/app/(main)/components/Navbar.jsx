

"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/fbpixel";
import logo from "@/assets/dt.webp";
import logo2 from "@/assets/dtlogobg.png";
import call from "@/assets/call.svg";

const DESKTOP_OVERFLOW = [
  { title: "Gallery", path: "/gallery/dholera-sir-progress" },
  { title: "About Us", path: "/about" },
  { title: "NRI Guide", path: "/nri-investment-guide-dholera" },
  { title: "Channel Partner", path: "/channel-partner" },
];

const MAIN_LINKS = [
  { title: "Residential", path: "/dholera-residential-plots" },
  { title: "Dholera SIR", path: "/dholera-sir" },
  { title: "Dholera Blogs", path: "/dholera-updates/blogs" },
  { title: "Dholera News", path: "/dholera-updates/latest-updates" },
  { title: "Bulk Land", path: "/bulk-land" },
  { title: "Contact Us", path: "/contact/inquiry" },
];

const MOBILE_LINKS = [
  { title: "About Dholera SIR", path: "/dholera-sir" },
  { title: "Our Projects", path: "/dholera-residential-plots" },
  { title: "Dholera Blogs", path: "/dholera-updates/blogs" },
  { title: "Dholera News", path: "/dholera-updates/latest-updates" },
  { title: "Bulk Land Deals", path: "/bulk-land" },
  { title: "Gallery", path: "/gallery/dholera-sir-progress" },
  { title: "About Us", path: "/about" },
  { title: "Contact Us", path: "/contact/inquiry" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  const desktopMenuRef = useRef(null);
  const menuOpenRef = useRef(null);
  const closeTimerRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  const isActivePath = (path) => pathname === path || pathname.startsWith(`${path}/`);

  const desktopLinkClass = (path) =>
    `px-4 py-2 rounded-lg transition-all duration-300 ${
      isActivePath(path)
        ? "bg-[#debe6b] text-black"
        : "text-white hover:bg-white/10"
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center text-lg py-4 px-4 rounded-xl transition-all duration-300 ${
      isActivePath(path)
        ? "bg-[#debe6b] text-black"
        : "text-white hover:bg-white/10"
    }`;

  const handleCallClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_click_organic",
      lead_type: "call",
      device: window.innerWidth <= 768 ? "mobile" : "desktop",
    });
    window.location.href = "tel:+919958993549";
  };

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsMobileMenuVisible(true);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setIsMobileMenuVisible(false);
    }, 280);
  };

  const toggleMenu = () => {
    if (isMobileMenuVisible && isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  useEffect(() => {
    function handler(e) {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(e.target)) {
        setIsDesktopMenuOpen(false);
      }

      if (menuOpenRef.current && !menuOpenRef.current.contains(e.target)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <nav className="fixed z-40 w-full max-sm:pt-2 max-sm:pb-2 pt-4 pb-4 bg-[#151f28] shadow-[0_0.5rem_1.75rem_rgba(0,0,0,0.16)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 max-sm:h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="Dholera Times Logo"
                width={150}
                height={150}
                className="h-16 w-auto max-sm:h-16"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex items-baseline space-x-1">
              {MAIN_LINKS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={desktopLinkClass(item.path)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="relative ml-4" ref={desktopMenuRef}>
              <button
                type="button"
                aria-label="Open more navigation links"
                aria-expanded={isDesktopMenuOpen}
                onClick={() => setIsDesktopMenuOpen((p) => !p)}
                className={`text-white p-2 rounded-lg transition-all duration-300 ${
                  isDesktopMenuOpen ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <Menu className="h-6 w-6" />
              </button>

              {isDesktopMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white shadow-xl rounded-xl z-50 border border-gray-100 overflow-hidden animate-[dropdownIn_180ms_ease-out]">
                  {DESKTOP_OVERFLOW.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-3 transition-colors duration-150 ${
                        isActivePath(item.path)
                          ? "bg-[#deae3c] text-black"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsDesktopMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <div
              onClick={handleCallClick}
              className="relative text-[#d8b66d] mt-3 flex items-center space-x-2 cursor-pointer transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              <span className="relative z-10 inline-flex h-[1.875rem] w-[1.875rem] items-center justify-center animate-[callNowFloat_2.5s_ease-in-out_infinite]">
                <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8b66d]/70 animate-[callNowPulse_1.9s_ease-out_infinite]" />
                <Image
                  src={call}
                  alt="call"
                  height={30}
                  width={30}
                  className="animate-image-tint"
                />
              </span>
              <p className="animate-color-change">Call Now</p>
            </div>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuVisible && (
        <div
          ref={menuOpenRef}
          className={`lg:hidden bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-md fixed top-0 left-0 w-full h-screen z-50 p-6 overflow-y-auto ${
            isMenuOpen
              ? "animate-[mobileMenuIn_360ms_ease-out]"
              : "animate-[mobileMenuOut_280ms_ease-in_forwards]"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={closeMenu}>
              <Image
                src={logo2}
                alt="Dholera Times Logo"
                width={120}
                height={120}
              />
            </Link>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
            >
              <X className="h-8 w-8 text-white" />
            </button>
          </div>

          <div className="space-y-2">
            {MOBILE_LINKS.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${mobileLinkClass(item.path)} animate-[mobileMenuItemIn_320ms_ease-out_both]`}
                style={{ animationDelay: `${index * 45}ms` }}
                onClick={closeMenu}
              >
                <span className="ml-2">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes callNowFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-0.25rem);
          }
        }

        @keyframes callNowPulse {
          0% {
            opacity: 0.75;
            transform: translate(-50%, -50%) scale(0.88);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-0.375rem) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes mobileMenuIn {
          from {
            opacity: 0;
            transform: translateY(-0.75rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileMenuOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-0.75rem);
          }
        }

        @keyframes mobileMenuItemIn {
          from {
            opacity: 0;
            transform: translateX(-0.5rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
