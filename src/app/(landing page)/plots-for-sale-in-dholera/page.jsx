import React from "react";
import Hero from "./body/Hero";
import WhyDholera from "./body/WhyDholera";
import Residency from "./body/Residency";
import Form from "./components/Form";
import CTAsection from "./body/CTAsection";
import WhyBMA from "./body/WhyBMA";
import TestimonialPagination from "./body/Testimonials";
import Footer from "./body/Footer";
import FAQSection from "./body/FAQs";
import PopupScroll from "./components/PopupScroll";

export default function page() {
  return (
    <>

      <div>
        <Hero />
        <Residency />
        <WhyDholera />
        <WhyBMA />
        <CTAsection
          text1="Get Expert Guidance for"
          text2="Dholera Plots"
          subTitle="Have questions about Dholera investments? Our team is here to guide you."
        />

        <TestimonialPagination />
        <FAQSection />
        <Footer />
      </div>
      <PopupScroll />
      <Form title="Registry Ready Plots Starting From ₹10 Lakh in Dholera" />
    </>
  );
}
