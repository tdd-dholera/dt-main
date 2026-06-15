import React from "react";
import Hero from "./Hero";
import WestWynAboutSection from "./About";
import WestWynEstate from "./WhyInvest";
import ProjectAmenities from "./Amenities";
import FAQS from "./FAQs";
import CommonForm from "../../components/CommonForm";

export default function page() {
  return (
    <>
      <div>
        <Hero />
        <WestWynAboutSection />
        <div>
          <CommonForm title="Get Plots Starting From ₹8 Lakh in Dholera" />
        </div>
        <WestWynEstate />
        <ProjectAmenities />
        <FAQS />
      </div>
    </>
  );
}
