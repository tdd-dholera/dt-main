import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingIcons from "./components/Floating";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* ── Google Tag Manager ── */}
        <GoogleTagManager gtmId="GTM-NLL6M3PL" />

        <meta
          name="google-site-verification"
          content="w4B8pqZZDySMLUmxZYsGxeKSCsTI_aHk-myN3iKS3CU"
        />
      </head>

      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLL6M3PL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ScrollToTop />
        <Navbar />

        <div className="pt-20">{children}</div>

        <FloatingIcons />
        <Footer />
      </body>
    </html>
  );
}
