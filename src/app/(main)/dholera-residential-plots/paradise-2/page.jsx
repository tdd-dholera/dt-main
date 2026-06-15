import React from "react";
import Hero from "./Hero";
import WestWynAboutSection from "./About";
import CommonForm from "../../components/CommonForm";

export default function page() {
  return (
    <>
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/dholera-residential-plots/paradise-2"
      />
      <div>
        <Hero />
        <WestWynAboutSection />
        <div className="">
          <CommonForm title="Missed Paradise 2? Discover Westwyn Estate Registry Ready Dholera Plots under 10 Lakh" />
        </div>
      </div>
    </>
  );
}
