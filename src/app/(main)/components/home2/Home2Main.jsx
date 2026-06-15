import React from "react";
import HOME2 from "./carosuel";
import Dholera from "./Dholera";
import LatestUpdates from "../Latest-updates";
import WhyDT from "./WhyDT";
import AboutDT from "./AboutDT";
import TestimonialPagination from "./Testimonials";
import FAQS from "./FAQs";
import PopupForm from "./PopUpForm";
import BulkLand from "../BulkLandForm";
import ObservedSection from "./ObservedSection_codex_temp";

export default function Home2Main() {
  return (
    <>
      <HOME2 />

      <ObservedSection animation="fade-up">
        <Dholera />
      </ObservedSection>

      <ObservedSection animation="fade-right">
        <AboutDT />
      </ObservedSection>

      <ObservedSection animation="fade-up" delay={80}>
        <LatestUpdates />
      </ObservedSection>

      <ObservedSection animation="fade-left">
        <WhyDT />
      </ObservedSection>

      <ObservedSection animation="scale-soft">
        <BulkLand
          title="Invest in Registry-Ready Plots in Dholera Starting from ₹8 Lakh"
          buttonName="Get A Call Back"
          pageName="Home"
        />
      </ObservedSection>

      <ObservedSection animation="fade-up">
        <FAQS />
      </ObservedSection>

      <ObservedSection animation="fade-up" delay={80}>
        <TestimonialPagination />
      </ObservedSection>

      <PopupForm />
    </>
  );
}
