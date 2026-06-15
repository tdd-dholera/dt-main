import React from "react";
import Hero from "./Hero";
import WestWynAboutSection from "./About";
import CommonForm from "../../components/CommonForm";

export default function page() {
  return (
    <>
      <div>
        <Hero />
        <WestWynAboutSection />
        <div className="">
          <CommonForm title="Missed Marina Bay? Discover Westwyn Estate Registry Ready Dholera Plots under 10 Lakh" />
        </div>
      </div>
    </>
  );
}