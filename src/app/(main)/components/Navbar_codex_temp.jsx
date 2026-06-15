"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false);
  const [isMobileBlogsOpen, setIsMobileBlogsOpen] = useState(false);

  const blogsDropdownRef = useRef(null);
  const desktopMenuRef = useRef(null);
  const menuOpenRef = useRef(null);

  // ── FB Pixel page-view tracking ──────────────────────────────
  const pathname = usePathname();
  useEffect(() => {
    trackPageView();
  }, [pathname]);

  // ── Close dropdowns on outside click ─────────────────────────
  useEffect(() => {
    function handler(e) {
      if (
        blogsDropdownRef.current &&
        !blogsDropdownRef.current.contains(e.target)
      )
        setIsBlogsDropdownOpen(false);
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(e.target))
        setIsDesktopMenuOpen(false);
      if (menuOpenRef.current && !menuOpenRef.current.contains(e.target))
        setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────
  const handleCallClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "call_click_organic",
      lead_type: "call",
      device: window.innerWidth <= 768 ? "mobile" : "desktop",
    });
    window.location.href = "tel:+919958993549";
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed z-40 w-full max-sm:pt-2 max-sm:pb-2 pt-4 pb-4 bg-[#151f28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 max-sm:h-16 items-center">
          {/* Logo */}
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

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex items-baseline space-x-1">
              <Link
                href="/dholera-residential-plots"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Residential
              </Link>

              <Link
                href="/dholera-sir"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Dholera SIR
              </Link>

              <Link
                href="/dholera-updates/blogs"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Dholera Blogs
              </Link>

              <Link
                href="/dholera-updates/latest-updates"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Dholera News
              </Link>

              <Link
                href="/bulk-land"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Bulk Land
              </Link>
              
              <Link
                href="/contact/inquiry"
                className="text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Desktop overflow hamburger */}
            <div className="relative ml-4" ref={desktopMenuRef}>
              <button
                onClick={() => setIsDesktopMenuOpen((p) => !p)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
              >
                <Menu className="h-6 w-6" />
              </button>
              {isDesktopMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl z-50 border border-gray-100 overflow-hidden">
                  {DESKTOP_OVERFLOW.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => setIsDesktopMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Mobile top bar ── */}
          <div className="lg:hidden flex items-center gap-4">
            <div
              onClick={handleCallClick}
              className="text-[#d8b66d] mt-3 animate-bounce duration-2000 flex items-center space-x-2 cursor-pointer"
            >
              <Image
                src={call}
                alt="call"
                height={30}
                width={30}
                className="animate-image-tint"
              />
              <p className="animate-color-change">Call Now</p>
            </div>
            <button onClick={() => setIsMenuOpen((p) => !p)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile full-screen menu ── */}
      {isMenuOpen && (
        <div
          ref={menuOpenRef}
          className="lg:hidden bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-md fixed top-0 left-0 w-full h-screen z-50 p-6 overflow-y-auto"
        >
          {/* Mobile header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" onClick={closeMenu}>
              <Image
                src={logo2}
                alt="Dholera Times Logo"
                width={120}
                height={120}
              />
            </Link>
            <button onClick={closeMenu}>
              <X className="h-8 w-8 text-white" />
            </button>
          </div>

          {/* Mobile links */}
          <div className="space-y-2">
            {[
              { title: "About Dholera SIR", path: "/dholera-sir" },
              { title: "Our Projects", path: "/dholera-residential-plots" },
              { title: "Dholera Blogs", path: "/dholera-updates/blogs" },
              {
                title: "Dholera News",
                path: "/dholera-updates/latest-updates",
              },
              { title: "Bulk Land Deals", path: "/bulk-land" },
              { title: "Gallery", path: "/gallery/dholera-sir-progress" },
              { title: "About Us", path: "/about" },
              { title: "Contact Us", path: "/contact/inquiry" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center text-white text-lg py-4 px-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                onClick={closeMenu}
              >
                <span className="ml-2">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}