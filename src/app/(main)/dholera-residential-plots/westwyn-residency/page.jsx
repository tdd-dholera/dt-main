import React from "react";
import Hero from "./Hero";
import WestWynAboutSection from "./About";

import ProjectAmenities from "./Amenities";
import FAQS from "./FAQs";
import CommonForm from "../../components/CommonForm";

export default function page() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "BookMyAssets",
            alternateName: "BMA",
            url: "https://www.dholeratimes.com/",
            logo: "https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdt.7009f759.webp&amp;w=256&amp;q=75",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/profile.php?id=61572970112485",
              "https://www.instagram.com/dholeratimes/",
              "https://www.youtube.com/@dholeratimes",
              "https://x.com/dholeratimes",
            ],
          }),
        }}
      />
      <div>
        <Hero />
        <WestWynAboutSection />
        <ProjectAmenities />

        <div>
          <CommonForm title="Invest in Dholera Residential Plots" />
        </div>
        <FAQS />
       
      </div>
    </>
  );
}