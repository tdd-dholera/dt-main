"use client";
import React from "react";
import { useState } from "react";
import {
  User,
  ChevronDown,
  ChevronUp,
  Globe,
  BookOpen,
  DollarSign,
  Building,
  FileText,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Plane,
  Sun,
  Cpu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import PopupForm from "../components/PopupForm";
import dholeraSmartCity from "@/assets/Dholera-Smart-City.webp";
import nri from "@/assets/nri-hero.webp";
import nriD from "@/assets/nri-hero.webp";

export default function NRIInvestmentGuide() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("WhyInvest");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [visibleFAQs, setVisibleFAQs] = useState(6);
  const [activeInfra, setActiveInfra] = useState(null);
  const [activeArticleFaq, setActiveArticleFaq] = useState(null);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const handleViewMore = () => {
    // Increase visible FAQs, but don't expand all
    setVisibleFAQs(Math.min(visibleFAQs + 3, faqs.length));
  };

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleScroll = (id) => {
    setActiveTab(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buttonStyle = (id) =>
    `px-6 py-4 rounded-lg font-semibold transition-all duration-300 shadow ${
      activeTab === id
        ? "bg-[#d8b66d] text-white"
        : "bg-white text-[#151f28] hover:bg-gray-100"
    }`;

  const faqs = [
    {
      question: "Who can purchase immovable property in India?",
      answer:
        "Under general permission available to them, these categories of people can buy real property in India: (i) Non-Resident Indian (NRI), (ii) Person of Indian Origin (PIO). The general permission covers only residential and commercial property purchases in India; agricultural land/plantation property/farmhouses cannot be included under its purview.",
    },
    {
      question:
        "Can NRI/PIO acquire agricultural land/plantation property/farm house in India?",
      answer:
        "No, NRIs and PIOs cannot acquire agricultural land, plantation property, or farm houses in India under the general permission.",
    },
    {
      question:
        "Are any documents required to be filed with the Reserve Bank after the purchase?",
      answer:
        "No, an NRI/PIO who purchased property through general permission does not need to submit any reports or files with the Reserve Bank.",
    },
    {
      question:
        "How many residential/commercial properties may NRI/PIO purchase under general permission?",
      answer:
        "Under general permission there are no limitations or restrictions placed upon how many properties an NRI or PIO may purchase.",
    },
    {
      question:
        "Can a foreign national of non-Indian origin resident outside India purchase immovable property in India?",
      answer:
        "No, a non-Indian national resident outside India cannot acquire immovable property unless such acquisition comes as part of an inheritance from someone residing within India. However, they can acquire or transfer immovable properties on lease agreements that last not exceeding five years.",
    },
    {
      question:
        "Can NRI/PIO repatriate the sale proceeds of immovable property?",
      answer:
        "Yes, in the event of sale of immovable property other than agricultural land/farm house/plantation property in India, the Authorised Dealer may allow repatriation of the sale proceeds outside India, provided certain conditions are satisfied. NRI/PIO are also allowed to repatriate an amount up to USD 1 million per financial year.",
    },
    {
      question:
        "Can a foreign national who is a person resident in India purchase immovable property in India?",
      answer:
        "Yes, foreign nationals residing in India under Section 2(v) of FEMA 1999 may purchase immovable property, however approval and compliance with requirements prescribed by other authorities such as State Governments would also need to be met - the burden to demonstrate residential status will ultimately lie with each individual if necessary; whereas any citizen from Pakistan, Bangladesh, Sri Lanka Afghanistan China Iran Nepal Bhutan would require prior approval of Reserve Bank prior to purchasing property in India.",
    },
    {
      question:
        "Can the branch / liaison office of a foreign company purchase immovable property in India?",
      answer:
        "Foreign companies which have established a Branch Office or other place of business in India in accordance with the Foreign Exchange Management (Establishment in India of Branch or Office or Other Place of Business) Regulations 2000 may acquire any immovable property necessary or incidental to the conduct of such activity in India. Payment should be made using foreign inward remittance through appropriate banking channels and within 90 days from the date of acquisition a Form IPI should be filed with the Reserve Bank. Such property can be mortgaged to an Authorised Dealer as security for borrowings and only repatriated upon closing down of business with prior approval from the Reserve Bank. Acquisition of immovable property by entities from Pakistan, Bangladesh, Sri Lanka, Afghanistan, China Iran Nepal or Bhutan who have established Branch Offices within India would also need prior approval of the Reserve Bank.",
    },
    {
      question:
        "Can a NRI/PIO acquire immovable property in India by way of gift? Can a foreign national acquire immovable property in India by way of gift?",
      answer:
        "(a) Yes, NRIs and PIOs can freely acquire immovable property by way of gift from either (i) a resident in India; or (ii) an NRI/PIO living abroad. However, these properties must only be commercial or residential properties and cannot include agricultural lands/plantation property/farm house in India that cannot be acquired via gift. (b) A foreign national of non-Indian origin resident outside India cannot acquire any immovable property in India by way of gift.",
    },
    {
      question: "Can a non-resident inherit immovable property in India?",
      answer:
        "Yes, anyone living outside India such as an NRI; PIO; and foreign national of non-Indian origin can inherit and hold immovable property located within India from someone who was resident there at one point in time.",
    },
    {
      question:
        "From whom can a non-resident person inherit immovable property?",
      answer:
        "An individual residing outside India (NRI, PIO or foreign national of non-Indian origin) can inherit immovable property from occupant (a) resident in India. However, any property inherited must have been acquired according to applicable foreign exchange regulations or FEMA regulations when acquired by its heir.",
    },
    {
      question:
        "Can an NRI/ PIO/foreign national sell his residential / commercial property?",
      answer:
        "(a) NRI can sell property in India to i) a person resident in India; or ii) an NRI; or iii) a PIO. (b) PIO can sell property in India to i) a person resident in India; or ii) an NRI; or iii) a PIO – with the prior approval of the Reserve Bank (c) Foreign national of non-Indian origin including a citizen of Pakistan or Bangladesh or Sri Lanka or Afghanistan or China or Iran or Nepal or Bhutan can sell property in India with prior approval of the Reserve Bank to i) a person resident in India ii) an NRI iii) a PIO",
    },
    {
      question:
        "Can a non-resident gift his residential / commercial property?",
      answer:
        "Yes. (a) NRI / PIO may gift residential / commercial property to (i) person resident in India or (ii) an NRI or (iii) PIO. (b) A foreign national of non-Indian origin requires the prior approval of the Reserve Bank for gifting the residential / commercial property.",
    },
    {
      question:
        "Can an NRI / PIO / foreign national holding an agricultural land / a plantation property / a farm house in India, gift the same?",
      answer:
        "(a) NRI / PIO can gift an agricultural land / a plantation property / a farm house in India only to a person resident in India who is a citizen of India. (b) A foreign national of non-Indian origin would require the prior approval of the Reserve Bank to gift an agricultural land / a plantation property / a farm house in India.",
    },
    {
      question:
        "Can residential / commercial property be mortgaged by NRI/ PIO?",
      answer:
        "i) NRI / PIO can mortgage a residential / commercial property to: (a) an Authorised Dealer / the housing finance institution in India without the approval of Reserve Bank (b) a bank abroad, with the prior approval of the Reserve Bank. ii) A foreign national of non-Indian origin can mortgage a residential / commercial property only with prior approval of the Reserve Bank. iii) A foreign company which has established a Branch Office or other place of business in accordance with FERA/FEMA regulations has general permission to mortgage the property with an Authorised Dealer in India.",
    },
    {
      question:
        "How can an NRI / PIO make payment for purchase of residential / commercial property in India?",
      answer:
        "Payment can be made by NRI / PIO out of: (a) funds remitted to India through normal banking channels or (b) funds held in NRE / FCNR (B) / NRO account maintained in India. No payment can be made either by traveller's cheque or by foreign currency notes or by other mode except those specifically mentioned above.",
    },
    {
      question:
        "Is repatriation of application money for booking of flat / payment made to the builder by NRI/ PIO allowed when the flat or plot is not allotted or the booking / contract is cancelled?",
      answer:
        "The Authorised Dealers can allow NRIs / PIOs to credit refund of application/ earnest money/ purchase consideration made by the house building agencies/ seller on account of non-allotment of flat/ plot/ cancellation of bookings/ deals for purchase of residential, commercial property, together with interest, if any, net of income tax payable thereon, to NRE/FCNR account, provided, the original payment was made out of NRE/FCNR account of the account holder or remittance from outside India through normal banking channels and the Authorised Dealer is satisfied about the genuineness of the transaction.",
    },
    {
      question:
        "Can NRI / PIO avail of loan from an authorised dealer for acquiring flat / house in India for his own residential use against the security of funds held in his NRE Fixed Deposit account / FCNR (B) account? How the loan can be repaid?",
      answer:
        "Yes, such loans are permitted subject to the terms and conditions laid down in Schedules 1 and 2 to the Notification No. FEMA 5/2000-RB dated May 3, 2000 viz. Foreign Exchange Management (Deposit) Regulations, 2000, as amended from time to time. Banks cannot grant fresh loans or renew existing loans in excess of Rs. 100 lakhs against NRE and FCNR (B) deposits, either to the depositors or to third parties. The banks should also not undertake artificial slicing of the loan amount to circumvent the ceiling of Rs. 100 lakh. Such loans can be repaid in the following manner: (a) by way of inward remittance through normal banking channel or (b) by debit to the NRE / FCNR (B) / NRO account of the NRI/ PIO or (c) out of rental income from such property (d) by the borrower's close relatives, as defined in section 6 of the Companies Act, 1956, through their account in India by crediting the borrower's loan account.",
    },
    {
      question:
        "Can NRI / PIO, avail of housing loan in Rupees from an Authorised Dealer or a Housing Finance Institution in India approved by the National Housing Bank for purchase of residential accommodation or for the purpose of repairs / renovation / improvement of residential accommodation ? How can such loan be repaid?",
      answer:
        "Yes, NRI/PIO can avail of housing loan in Rupees from an Authorised Dealer or a Housing Finance Institution subject to certain terms and conditions laid down in Regulation 8 of Notification No. FEMA 4/2000-RB dated May 3, 2000 viz. Foreign Exchange Management (Borrowing and lending in rupees) Regulations, 2000, as amended from time to time. Authorised Dealers/ Housing Finance Institutions can also lend to the NRIs/ PIOs for the purpose of repairs/renovation/ improvement of residential accommodation owned by them in India.Such a loan can be repaid (a) by way of inward remittance through normal banking channel or (b) by debit to the NRE / FCNR (B) / NRO account of the NRI / PIO or (c) out of rental income from such property; or (d) by the borrower's close relatives, as defined in section 6 of the Companies Act, 1956, through their account in India by crediting the borrower's loan account.",
    },
    {
      question:
        "Can NRI/PIO avail of housing loan in Rupees from his employer in India?",
      answer:
        "Yes, subject to certain terms and conditions given in Regulation 8A of Notification No. FEMA 4/2000-RB dated May 3, 2000 and A.P. (DIR Series) Circular No.27 dated October 10, 2003, i.e., (i) The loan shall be granted only for personal purposes including purchase of housing property in India; (ii) The loan shall be granted in accordance with the lender's Staff Welfare Scheme/Staff Housing Loan Scheme and subject to other terms and conditions applicable to its staff resident in India; (iii) The lender shall ensure that the loan amount is not used for the purposes specified in sub-clauses (i) to (iv) of clause (1) and in clause (2) of Regulation 6 of Notification No.FEMA.4/2000-RB dated May 3, 2000. (iv) The lender shall credit the loan amount to the borrower's NRO account in India or shall ensure credit to such account by specific indication on the payment instrument; (v) The loan agreement shall specify that the repayment of loan shall be by way of remittance from outside India or by debit to NRE/NRO/FCNR Account of the borrower and the lender shall not accept repayment by any other means.",
    },
    {
      question:
        "Can NRI / PIO repatriate outside India the sale proceeds of immovable property held in India?",
      answer:
        "(a) In the event of sale of immovable property other than agricultural land / farm house / plantation property in India by a NRI / PIO, the Authorised Dealer may allow repatriation of the sale proceeds outside India, provided the following conditions are satisfied, namely: (i) the immovable property was acquired by the seller in accordance with the provisions of the foreign exchange law in force at the time of acquisition by him or the provisions of these Regulations; (ii) the amount to be repatriated does not exceed: · the amount paid for acquisition of the immovable property in foreign exchange received through normal banking channels, or · the amount paid out of funds held in Foreign Currency Non-Resident Account, or · the foreign currency equivalent (as on the date of payment) of the amount paid where such payment was made from the funds held in Non-Resident External account for acquisition of the property; and (iii) in the case of residential property, the repatriation of sale proceeds is restricted to not more than two such properties. For this purpose, repatriation outside India means the buying or drawing of foreign exchange from an authorised dealer in India and remitting it outside India through normal banking channels or crediting it to an account denominated in foreign currency or to an account in Indian currency maintained with an authorised dealer from which it can be converted in foreign currency. (b) in case the property is acquired out of Rupee resources and/or the loan is repaid by close relatives in India (as defined in Section 6 of the Companies Act, 1956), the amount can be credited to the NRO account of the NRI/PIO. The amount of capital gains, if any, arising out of sale of the property can also be credited to the NRO account. NRI/PIO are also allowed by the Authorised Dealers to repatriate an amount up to USD 1 million per financial year out of the balance in the NRO account / sale proceeds of assets by way of purchase / the assets in India acquired by him by way of inheritance / legacy. This is subject to production of documentary evidence in support of acquisition, inheritance or legacy of assets by the remitter, and a tax clearance / no objection certificate from the Income Tax Authority for the remittance. Remittances exceeding US $ 1,000,000 (US Dollar One million only) in any financial year requires prior permission of the Reserve Bank. (c) A person referred to in sub-section (5) of Section 6 of the Foreign Exchange Management Act 3[3][3], or his successor shall not, except with the prior permission of the Reserve Bank, repatriate outside India the sale proceeds of any immovable property referred to in that sub-section.",
    },
    {
      question:
        "Can an NRI/PIO repatriate the proceeds in case the sale proceeds were deposited in the NRO account?",
      answer:
        "Please refer to the answer at Q.22 above. NRI/PIO may repatriate up to USD one million per financial year (April-March) from their NRO account which would also include the sale proceeds of immovable property. There is no lock in period for sale of immovable property and repatriation of sale proceeds outside India.",
    },
    {
      question:
        "If a Rupee loan was taken by the NRI/ PIO from an Authorised Dealer or a Housing Finance Institution for purchase of residential property can the NRI / PIO repatriate the sale proceeds of such property?",
      answer:
        "Yes, Authorised Dealers have been authorised to allow repatriation of sale proceeds of residential accommodation purchased by NRIs/ PIOs out of funds raised by them by way of loans from the authorised dealers/ housing finance institutions to the extent such loan/s repaid by them are out of the foreign inward remittances received through normal banking channel or by debit to their NRE/FCNR accounts. The balance amount, if any, can be credited to their NRO account and the NRI/PIO may repatriate up to USD one million per financial year (April-March) subject to payment of applicable taxes from their NRO account balances which would also include the sale proceeds of the immovable property.",
    },
    {
      question:
        "If the immovable property was acquired by way of gift by the NRI/PIO, can he repatriate abroad the funds from sale of such property?",
      answer:
        "The sale proceeds of immovable property acquired by way of gift should be credited to NRO account only. From the balance in the NRO account, NRI/PIO may remit up to USD one million, per financial year, subject to the satisfaction of Authorised Dealer and payment of applicable taxes.",
    },
    {
      question:
        "If the immovable property was received as inheritance by the NRI/PIO can he repatriate the sale proceeds?",
      answer:
        "Yes, general permission is available to the NRIs/PIO to repatriate the sale proceeds of the immovable property inherited from a person resident in Indiasubject to thefollowing conditions: (i) The amount should not exceed USD one million, per financial year (ii) This is subject to production of documentary evidence in support of acquisition / inheritance of assets and an undertaking by the remitter and certificate by a Chartered Accountant in the formats prescribed by the Central Board of Direct Taxes vide their Circular No.4/2009 dated June 29, 2009 (iii) In cases of deed of settlement made by either of his parents or a close relative (as defined in section 6 of the Companies Act, 1956) and the settlement taking effect on the death of the settler (iv) the original deed of settlement and a tax clearance / No Objection Certificate from the Income-Tax Authority should be produced for the remittance (v) Where the remittance as above is made in more than one installment, the remittance of all such installments shall be made through the same Authorised Dealer (vi) In case of a foreign national, sale proceeds can be repatriated if the property is inherited from a person resident outside India with the prior approval of the Reserve Bank. The foreign national has to approach the Reserve Bank with documentary evidence in support of inheritance of the immovable property and the undertaking and the C.A. Certificate mentioned above. The general permission for repatriation of sale proceeds of immovable property is not available to a citizen of Pakistan, Bangladesh, Sri Lanka, China, Afghanistan and Iran and he has to seek specific approval of the Reserve Bank. As FEMA, 1999 specifically permits transactions only in Indian Rupees with citizens of Nepal and Bhutan. Therefore, the question of repatriation of the sale proceeds in foreign exchange to Nepal and Bhutan would not arise.",
    },
    {
      question:
        "Can Foreign Embassies / Diplomats / Consulates General purchase / sell immovable property in India?",
      answer:
        "In terms of Regulation 5A of the Foreign Exchange Management (Acquisition and Transfer of Immovable Property in India) Regulations 2000, Foreign Embassies/ Diplomats/ Consulates General, may purchase/ sell immovable property (other than agricultural land/ plantation property/ farm house) in India provided – (i) Clearance from the Government of India, Ministry of External Affairs has been obtained for such purchase/sale; and (ii) The consideration for acquisition of immovable property in India is paid out of funds remitted from abroad through the normal banking channels.",
    },
    {
      question:
        "Can NRI / PIO rent out the residential / commercial property purchased out of foreign exchange / rupee funds?",
      answer:
        "Yes, NRI/PIO can rent out the property without the approval of the Reserve Bank. The rent received can be credited to NRO / NRE account or remitted abroad. Powers have been delegated to the Authorised Dealers to allow repatriation of current income like rent, dividend, pension, interest, etc. of NRIs/PIO who do not maintain an NRO account in India based on an appropriate certification by a Chartered Accountant, certifying that the amount proposed to be remitted is eligible for remittance and that applicable taxes have been paid/provided for.",
    },
    {
      question:
        "Can a person who had bought immovable property, when he was a resident, continue to hold such property even after becoming an NRI/PIO? In which account can the sale proceeds of such immovable property be credited?",
      answer:
        "Yes, a person who had bought the residential / commercial property / agricultural land/ plantation property / farm house in India when he was a resident, continue to hold the immovable property without the approval of the Reserve Bank even after becoming an NRI/PIO. The sale proceeds may be credited to NRO account of the NRI /PIO.",
    },
    {
      question:
        "Can the sale proceeds of the immovable property referred to in Q.No. 29 be remitted abroad ?",
      answer:
        "Yes, From the balance in the NRO account, NRI/PIO may remit up to USD one million, per financial year, subject to the satisfaction of Authorised Dealer and payment of applicable taxes.",
    },
    {
      question:
        "Can foreign nationals of non-Indian origin resident in India or outside India who had earlier acquired immovable property under FERA with specific approval of the Reserve Bank continue to hold the same? Can they transfer such property?",
      answer:
        "Yes, they may continue to hold the immovable property under holding license obtained from the Reserve Bank. However, they can transfer the property only with the prior approval of the Reserve Bank.",
    },
    {
      question:
        "Is a resident in India governed by the provisions of the Foreign Exchange Management (Acquisition and transfer of immovable property in India) Regulations, 2000?",
      answer:
        "A person resident in India who is a citizen of Pakistan or Bangladesh or Sri Lanka or Afghanistan or China or Iran or Nepal or Bhutan is governed by the provisions of Foreign Exchange Management (Acquisition and Transfer of Immovable Property in India) Regulations, 2000, as amended from time to time, i.e. she/he would require prior approval of the Reserve Bank for acquisition and transfer of immovable property in India even though she/he is resident in India. Such requests are considered by the Reserve Bank in consultation with the Government in India. The citizens of countries other than those listed above can be PIOs who are covered under the general permission (please refer to Q.No.1). The provisions relating to foreign national of non-Indian origin are covered in detail in Q Nos. 6 and 7. Note: The relevant regulations covering the transactions in immovable property have been notified vide RBI Notification No. FEMA 21/2000-RB dated May 3, 2000 and this basic notification has been subsequently amended by the notifications detailed below: i) Notification No.FEMA 64/2002-RB dated June 29, 2002; ii) Notification No.FEMA 65/2002-RB dated June 29, 2002; iii) Notification No.FEMA 93/2003-RB dated June 9, 2003; iv) Notification No. FEMA 146/2006-RB dated February 10, 2006 read with A.P.(DIR Series) Circular No. 5 dated 16.8.2006; and v) Notification No. FEMA 200/2009-RB dated October 5, 2009 All the above notifications and A.P. (DIR Series) Circulars are available on the RBI website: www.fema.rbi.org.in. The Master Circular on Acquisition and Transfer of Immovable Property in India by NRIs/PIOs/Foreign Nationals of Non-Indian Origin is also available on the website under the link 'www.rbi.org.in ® Sitemap ® Master Circulars'.",
    },
  ];

  // BlogPosting Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.dholeratimes.com/nri-investment-guide-dholera",
    },
    // updated
    headline:
      //
      "Our NRI Investment guide for Dholera Smart City give you a complete step by step path to buy plots in india",
    description:
      "Our NRI Investment Guide for Dholera Smart City gives you a complete step-by-step path to buy plots in India - legally, securely and entirely online. Whether you're in the USA, UK, UAE, or Canada, start your smart investment journey in Dholera Smart City, India's first greenfield smart city backed by massive government infrastructure projects.",
    image: "",
    author: {
      "@type": "Organization",
      name: "Dholera Times",
      url: "https://www.dholeratimes.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "Dholera",
      logo: {
        "@type": "ImageObject",
        url: "",
      },
    },
    datePublished: "2025-05-12",
    dateModified: "2025-05-12",
  };

  // FAQPage Schema with all questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who can purchase immovable property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under general permission available to them, these categories of people can buy real property in India: (i) Non-Resident Indian (NRI). (ii) Person of Indian Origin (PIO). The general permission covers only residential and commercial property purchases in India; agricultural land/plantation property/farmhouses cannot be included under its purview.",
        },
      },
      {
        "@type": "Question",
        name: "Can NRI/PIO acquire agricultural land/plantation property/farm house in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No.",
        },
      },
      {
        "@type": "Question",
        name: "Are any documents required to be filed with the Reserve Bank after the purchase?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, an NRI/PIO who purchased property through general permission does not need to submit any reports or files with the Reserve Bank.",
        },
      },
      {
        "@type": "Question",
        name: "How many residential/commercial properties may NRI/PIO purchase under general permission?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under general permission there are no limitations or restrictions placed upon how many properties an NRI or PIO may purchase under its general permit.",
        },
      },
      {
        "@type": "Question",
        name: "Can an Indian national who does not belong to India become the second owner in immovable property purchased by an NRI/PIO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No.",
        },
      },
      {
        "@type": "Question",
        name: "Can a foreign national of non-Indian origin resident outside India purchase immovable property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, a non-Indian national resident outside India who wishes to acquire immovable property cannot do so unless such acquisition comes as part of an inheritance from someone residing within India; however they can acquire or transfer immovable properties on lease agreements that last not exceeding five years; in these instances there is no requirement for getting permission or reporting back to the Reserve Bank.",
        },
      },
      {
        "@type": "Question",
        name: "Can a foreign national who is a person resident in India purchase immovable property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, foreign nationals residing in India under Section 2(v) of FEMA 1999 may purchase immovable property, however approval and compliance with requirements prescribed by other authorities such as State Governments would also need to be met - the burden to demonstrate residential status will ultimately lie with each individual if necessary; whereas any citizen from Pakistan, Bangladesh, Sri Lanka Afghanistan China Iran Nepal Bhutan would require prior approval of Reserve Bank prior to purchasing property in India.",
        },
      },
      {
        "@type": "Question",
        name: "Can the branch/liaison office of a foreign company purchase immovable property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Foreign companies which have established a Branch Office or other place of business in India in accordance with the Foreign Exchange Management (Establishment in India of Branch or Office or Other Place of Business) Regulations 2000 may acquire any immovable property necessary or incidental to the conduct of such activity in India. Payment should be made using foreign inward remittance through appropriate banking channels and within 90 days from the date of acquisition a Form IPI should be filed with the Reserve Bank. Such property can be mortgaged to an Authorised Dealer as security for borrowings and only repatriated upon closing down of business with prior approval from the Reserve Bank. Acquisition of immovable property by entities from Pakistan, Bangladesh, Sri Lanka, Afghanistan, China Iran Nepal or Bhutan who have established Branch Offices within India would also need prior approval of the Reserve Bank.",
        },
      },
      {
        "@type": "Question",
        name: "Can a NRI/PIO acquire immovable property in India by way of gift? Can a foreign national acquire immovable property in India by way of gift?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "(a) Yes, NRIs and PIOs can freely acquire immovable property by way of gift from either (i) a resident in India; or (ii) an NRI/PIO living abroad. However, these properties must only be commercial or residential properties and cannot include agricultural lands/plantation property/farm house in India that cannot be acquired via gift. (b) A foreign national of non-Indian origin resident outside India cannot acquire any immovable property in India by way of gift.",
        },
      },
      {
        "@type": "Question",
        name: "Can a non-resident inherit immovable property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, anyone living outside India such as an NRI; PIO; and foreign national of non-Indian origin can inherit and hold immovable property located within India from someone who was resident there at one point in time.",
        },
      },
      {
        "@type": "Question",
        name: "From whom can a non-resident person inherit immovable property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An individual residing outside India (NRI, PIO or foreign national of non-Indian origin) can inherit immovable property from occupant (a) resident in India. However, any property inherited must have been acquired according to applicable foreign exchange regulations or FEMA regulations when acquired by its heir.",
        },
      },
      {
        "@type": "Question",
        name: "Can an NRI/PIO/foreign national sell his residential/commercial property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "(a) NRI can sell property in India to i) a person resident in India; or ii) an NRI; or iii) a PIO. (b) PIO can sell property in India to i) a person resident in India; or ii) an NRI; or iii) a PIO – with the prior approval of the Reserve Bank. (c) Foreign national of non-Indian origin including a citizen of Pakistan or Bangladesh or Sri Lanka or Afghanistan or China or Iran or Nepal or Bhutan can sell property in India with prior approval of the Reserve Bank to i) a person resident in India ii) an NRI iii) a PIO",
        },
      },
      {
        "@type": "Question",
        name: "Can a non-resident gift his residential/commercial property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. (a) NRI / PIO may gift residential / commercial property to (i) person resident in India or (ii) an NRI or (iii) PIO. (b) A foreign national of non-Indian origin requires the prior approval of the Reserve Bank for gifting the residential / commercial property.",
        },
      },
      {
        "@type": "Question",
        name: "Can an NRI/PIO/foreign national holding an agricultural land/a plantation property/a farm house in India, gift the same?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "(a) NRI / PIO can gift an agricultural land / a plantation property / a farm house in India only to a person resident in India who is a citizen of India. (b) A foreign national of non-Indian origin would require the prior approval of the Reserve Bank to gift an agricultural land / a plantation property / a farm house in India.",
        },
      },
      {
        "@type": "Question",
        name: "Can residential/commercial property be mortgaged by NRI/PIO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "(i) NRI / PIO can mortgage a residential / commercial property to: (a) an Authorised Dealer / the housing finance institution in India without the approval of Reserve Bank (b) a bank abroad, with the prior approval of the Reserve Bank. (ii) A foreign national of non-Indian origin can mortgage a residential / commercial property only with prior approval of the Reserve Bank. (iii) A foreign company which has established a Branch Office or other place of business in accordance with FERA/FEMA regulations has general permission to mortgage the property with an Authorised Dealer in India.",
        },
      },
      {
        "@type": "Question",
        name: "How can an NRI/PIO make payment for purchase of residential/commercial property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Payment can be made by NRI / PIO out of: (a) funds remitted to India through normal banking channels or (b) funds held in NRE / FCNR (B) / NRO account maintained in India. No payment can be made either by traveller's cheque or by foreign currency notes or by other mode except those specifically mentioned above.",
        },
      },
      {
        "@type": "Question",
        name: "Is repatriation of application money for booking of flat/payment made to the builder by NRI/PIO allowed when the flat or plot is not allotted or the booking/contract is cancelled?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Authorised Dealers can allow NRIs / PIOs to credit refund of application/ earnest money/ purchase consideration made by the house building agencies/ seller on account of non-allotment of flat/ plot/ cancellation of bookings/ deals for purchase of residential, commercial property, together with interest, if any, net of income tax payable thereon, to NRE/FCNR account, provided, the original payment was made out of NRE/FCNR account of the account holder or remittance from outside India through normal banking channels and the Authorised Dealer is satisfied about the genuineness of the transaction.",
        },
      },
      {
        "@type": "Question",
        name: "Can NRI/PIO avail of loan from an authorised dealer for acquiring flat/house in India for his own residential use against the security of funds held in his NRE Fixed Deposit account/FCNR (B) account? How the loan can be repaid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, such loans are permitted subject to the terms and conditions laid down in Schedules 1 and 2 to the Notification No. FEMA 5/2000-RB dated May 3, 2000 viz. Foreign Exchange Management (Deposit) Regulations, 2000, as amended from time to time. Banks cannot grant fresh loans or renew existing loans in excess of Rs. 100 lakhs against NRE and FCNR (B) deposits, either to the depositors or to third parties. The banks should also not undertake artificial slicing of the loan amount to circumvent the ceiling of Rs. 100 lakh. Such loans can be repaid in the following manner: (a) by way of inward remittance through normal banking channel or (b) by debit to the NRE / FCNR (B) / NRO account of the NRI/ PIO or (c) out of rental income from such property (d) by the borrower's close relatives, as defined in section 6 of the Companies Act, 1956, through their account in India by crediting the borrower's loan account.",
        },
      },
      {
        "@type": "Question",
        name: "Can NRI/PIO, avail of housing loan in Rupees from an Authorised Dealer or a Housing Finance Institution in India approved by the National Housing Bank for purchase of residential accommodation or for the purpose of repairs/renovation/improvement of residential accommodation? How can such loan be repaid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, NRI/PIO can avail of housing loan in Rupees from an Authorised Dealer or a Housing Finance Institution subject to certain terms and conditions laid down in Regulation 8 of Notification No. FEMA 4/2000-RB dated May 3, 2000 viz. Foreign Exchange Management (Borrowing and lending in rupees) Regulations, 2000, as amended from time to time. Authorised Dealers/ Housing Finance Institutions can also lend to the NRIs/ PIOs for the purpose of repairs/renovation/ improvement of residential accommodation owned by them in India. Such a loan can be repaid (a) by way of inward remittance through normal banking channel or (b) by debit to the NRE / FCNR (B) / NRO account of the NRI / PIO or (c) out of rental income from such property; or (d) by the borrower's close relatives, as defined in section 6 of the Companies Act, 1956, through their account in India by crediting the borrower's loan account.",
        },
      },
      {
        "@type": "Question",
        name: "Can NRI/PIO avail of housing loan in Rupees from his employer in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, subject to certain terms and conditions given in Regulation 8A of Notification No. FEMA 4/2000-RB dated May 3, 2000 and A.P. (DIR Series) Circular No.27 dated October 10, 2003, i.e., (i) The loan shall be granted only for personal purposes including purchase of housing property in India; (ii) The loan shall be granted in accordance with the lender's Staff Welfare Scheme/Staff Housing Loan Scheme and subject to other terms and conditions applicable to its staff resident in India; (iii) The lender shall ensure that the loan amount is not used for the purposes specified in sub-clauses (i) to (iv) of clause (1) and in clause (2) of Regulation 6 of Notification No.FEMA.4/2000-RB dated May 3, 2000. (iv) The lender shall credit the loan amount to the borrower's NRO account in India or shall ensure credit to such account by specific indication on the payment instrument; (v) The loan agreement shall specify that the repayment of loan shall be by way of remittance from outside India or by debit to NRE/NRO/FCNR Account of the borrower and the lender shall not accept repayment by any other means.",
        },
      },

      {
        "@type": "Question",
        name: "Can an NRI/PIO repatriate the proceeds in case the sale proceeds were deposited in the NRO account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NRI/PIO may repatriate up to USD one million per financial year (April-March) from their NRO account which would also include the sale proceeds of immovable property. There is no lock in period for sale of immovable property and repatriation of sale proceeds outside India.",
        },
      },
      {
        "@type": "Question",
        name: "If a Rupee loan was taken by the NRI/PIO from an Authorised Dealer or a Housing Finance Institution for purchase of residential property can the NRI/PIO repatriate the sale proceeds of such property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Authorised Dealers have been authorised to allow repatriation of sale proceeds of residential accommodation purchased by NRIs/ PIOs out of funds raised by them by way of loans from the authorised dealers/ housing finance institutions to the extent such loan/s repaid by them are out of the foreign inward remittances received through normal banking channel or by debit to their NRE/FCNR accounts. The balance amount, if any, can be credited to their NRO account and the NRI/PIO may repatriate up to USD one million per financial year (April-March) subject to payment of applicable taxes from their NRO account balances which would also include the sale proceeds of the immovable property.",
        },
      },
      {
        "@type": "Question",
        name: "If the immovable property was acquired by way of gift by the NRI/PIO, can he repatriate abroad the funds from sale of such property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The sale proceeds of immovable property acquired by way of gift should be credited to NRO account only. From the balance in the NRO account, NRI/PIO may remit up to USD one million, per financial year, subject to the satisfaction of Authorised Dealer and payment of applicable taxes.",
        },
      },
      {
        "@type": "Question",
        name: "If the immovable property was received as inheritance by the NRI/PIO can he repatriate the sale proceeds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, general permission is available to the NRIs/PIO to repatriate the sale proceeds of the immovable property inherited from a person resident in India subject to the following conditions: (i) The amount should not exceed USD one million, per financial year (ii) This is subject to production of documentary evidence in support of acquisition / inheritance of assets and an undertaking by the remitter and certificate by a Chartered Accountant in the formats prescribed by the Central Board of Direct Taxes vide their Circular No.4/2009 dated June 29, 2009 (iii) In cases of deed of settlement made by either of his parents or a close relative (as defined in section 6 of the Companies Act, 1956) and the settlement taking effect on the death of the settler (iv) the original deed of settlement and a tax clearance / No Objection Certificate from the Income-Tax Authority should be produced for the remittance (v) Where the remittance as above is made in more than one installment, the remittance of all such installments shall be made through the same Authorised Dealer (vi) In case of a foreign national, sale proceeds can be repatriated if the property is inherited from a person resident outside India with the prior approval of the Reserve Bank. The foreign national has to approach the Reserve Bank with documentary evidence in support of inheritance of the immovable property and the undertaking and the C.A. Certificate mentioned above. The general permission for repatriation of sale proceeds of immovable property is not available to a citizen of Pakistan, Bangladesh, Sri Lanka, China, Afghanistan and Iran and he has to seek specific approval of the Reserve Bank. As FEMA, 1999 specifically permits transactions only in Indian Rupees with citizens of Nepal and Bhutan. Therefore, the question of repatriation of the sale proceeds in foreign exchange to Nepal and Bhutan would not arise.",
        },
      },
      {
        "@type": "Question",
        name: "Can Foreign Embassies/Diplomats/Consulates General purchase/sell immovable property in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In terms of Regulation 5A of the Foreign Exchange Management (Acquisition and Transfer of Immovable Property in India) Regulations 2000, Foreign Embassies/ Diplomats/ Consulates General, may purchase/ sell immovable property (other than agricultural land/ plantation property/ farm house) in India provided – (i) Clearance from the Government of India, Ministry of External Affairs has been obtained for such purchase/sale; and (ii) The consideration for acquisition of immovable property in India is paid out of funds remitted from abroad through the normal banking channels.",
        },
      },
      {
        "@type": "Question",
        name: "Can NRI/PIO rent out the residential/commercial property purchased out of foreign exchange/rupee funds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, NRI/PIO can rent out the property without the approval of the Reserve Bank. The rent received can be credited to NRO / NRE account or remitted abroad. Powers have been delegated to the Authorised Dealers to allow repatriation of current income like rent, dividend, pension, interest, etc. of NRIs/PIO who do not maintain an NRO account in India based on an appropriate certification by a Chartered Accountant, certifying that the amount proposed to be remitted is eligible for remittance and that applicable taxes have been paid/provided for.",
        },
      },
      {
        "@type": "Question",
        name: "Can a person who had bought immovable property, when he was a resident, continue to hold such property even after becoming an NRI/PIO? In which account can the sale proceeds of such immovable property be credited?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, a person who had bought the residential / commercial property / agricultural land/ plantation property / farm house in India when he was a resident, continue to hold the immovable property without the approval of the Reserve Bank even after becoming an NRI/PIO. The sale proceeds may be credited to NRO account of the NRI /PIO.",
        },
      },
      {
        "@type": "Question",
        name: "Can the sale proceeds of the immovable property referred to in Q.No. 29 be remitted abroad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, From the balance in the NRO account, NRI/PIO may remit up to USD one million, per financial year, subject to the satisfaction of Authorised Dealer and payment of applicable taxes.",
        },
      },
      {
        "@type": "Question",
        name: "Can foreign nationals of non-Indian origin resident in India or outside India who had earlier acquired immovable property under FERA with specific approval of the Reserve Bank continue to hold the same? Can they transfer such property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, they may continue to hold the immovable property under holding license obtained from the Reserve Bank. However, they can transfer the property only with the prior approval of the Reserve Bank.",
        },
      },
      {
        "@type": "Question",
        name: "Is a resident in India governed by the provisions of the Foreign Exchange Management (Acquisition and transfer of immovable property in India) Regulations, 2000?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A person resident in India who is a citizen of Pakistan or Bangladesh or Sri Lanka or Afghanistan or China or Iran or Nepal or Bhutan is governed by the provisions of Foreign Exchange Management (Acquisition and Transfer of Immovable Property in India) Regulations, 2000, as amended from time to time, i.e. she/he would require prior approval of the Reserve Bank for acquisition and transfer of immovable property in India even though she/he is resident in India. Such requests are considered by the Reserve Bank in consultation with the Government in India. The citizens of countries other than those listed above can be PIOs who are covered under the general permission. The provisions relating to foreign national of non-Indian origin are covered in detail in Q Nos. 6 and 7.",
        },
      },
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dholera Times",
    image: "",
    "@id": "",
    url: "https://www.dholeratimes.com/",
    telephone: "+91 99589 93549",
    priceRange: "10 Lac +",
    address: {
      "@type": "PostalAddress",
      streetAddress: "620,JMD Megapolis, sector-48, Sohna Road",
      addressLocality: "Gurugram",
      postalCode: "1220018",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4195542,
      longitude: 77.0386216,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:30",
    },
    sameAs: [
      "https://www.facebook.com/people/Dholera-Times/61573763438050/",
      "https://x.com/dholeratimes",
      "https://www.instagram.com/dholeratimes/",
      "https://www.youtube.com/@dholeratimes",
      "https://www.linkedin.com/company/dholera-times",
      "https://www.dholeratimes.com/",
    ],
  };

  const articleNRI = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.dholeratimes.com/nri-investment-guide-dholera",
    },
    headline: "Complete Guide to NRI Investment in Dholera Smart City",
    description:
      "NRI investment in Dholera has emerged as one of the most promising real estate opportunities in India. With AUDA-approved residential plots, simplified buying processes, and strong resale potential, Dholera Smart City offers unmatched value for NRIs looking to invest in a futuristic smart city.Our NRI Investment Guide for Dholera Smart City gives you a complete step-by-step path to buy plots in India - legally, securely and entirely online. Whether you are in the USA, UK, UAE, or Canada, start your smart investment journey in Dholera Smart City, India's first greenfield smart city backed by massive government infrastructure projects.",
    image: [
      "https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDholera-Smart-City.a696428d.webp&w=640&q=75",
      "https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProjected-NRI.1b752d49.webp&w=640&q=75",
    ],
    author: {
      "@type": "Organization",
      name: "Dholera times team",
      url: "https://www.dholeratimes.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "Dholera times",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dholeratimes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdt.7009f759.webp&w=128&q=75",
      },
    },
    datePublished: "2025-06-02",
    dateModified: "2025-06-04",
  };

  const breadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dholeratimes.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "NRI Guide",
        item: "https://www.dholeratimes.com/nri-investment-guide-dholera",
      },
    ],
  };

  return (
    <>
      {/* SEO / Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <meta name="robots" content="index, follow" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleNRI) }}
      />
      <title>
        NRI Property Investment in India: Why Dholera Smart City Is Gaining
        Attention in 2026
      </title>
      <meta
        name="description"
        content="Explore NRI property investment in India with insights on Dholera Smart City, Dholera International Airport, semiconductor growth, and land investment potential. Understand legal rules, infrastructure impact, and long-term appreciation before investing."
      />
      <meta
        name="keywords"
        content="NRI property investment in India, best investment for NRI in India, land investment in India, Dholera SIR, Dholera Smart City, Dholera plots, upcoming smart cities in India"
      />
      <link
        rel="canonical"
        href="https://www.dholeratimes.com/nri-investment-guide-dholera"
      />

      {/* ─── HERO ─── */}
      <div className="bg-black text-white">
        <div className="md:relative overflow-hidden">
          <Image
            src={nri}
            alt="Dholera SIR Aerial View"
            className="w-full md:h-full h-auto object-contain md:object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
      </div>

      {/* ─── NAV TABS ─── */}
      <div className="sticky top-0 z-20 bg-white shadow-md py-4 max-sm:hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 overflow-x-auto pb-2 flex-wrap md:flex-nowrap">
            {[
              { id: "Intro", label: "Overview" },
              { id: "Infrastructure", label: "Infrastructure" },
              { id: "LegalClarity", label: "Legal Clarity" },
              { id: "Checklist", label: "Checklist" },
              { id: "ArticleFAQs", label: "FAQs" },
              { id: "RBIGuidelines", label: "RBI Guidelines" },
            ].map(({ id, label }) => (
              <button
                key={id}
                className={buttonStyle(id)}
                onClick={() => handleScroll(id)}
                aria-label={label}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-8 bg-white">
        {/* ── Intro ── */}
        <div id="Intro" className="max-w-6xl mx-auto px-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center leading-snug">
            NRI Property Investment in India: Why Smart Investors Are Quietly
            Watching Dholera
          </h1>
          <div className="w-16 h-1 bg-[#d8b66d] mx-auto mb-6 rounded-full" />
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            If you've been searching for the{" "}
            <strong>best investment for NRI in India</strong>, you've probably
            looked at metro cities, luxury apartments, or commercial properties.
            But a growing number of overseas Indians are now exploring something
            different - planned smart city developments backed by infrastructure
            and industrial growth.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            One name that keeps appearing in serious investment discussions and
            even in recent <strong>Dholera News</strong> updates is{" "}
            <strong>Dholera Smart City</strong>. Let's break this down in a
            clear, practical way - no hype, just structured insight.
          </p>
        </div>

        {/* ── Why NRIs Are Re-Evaluating Investment Strategy ── */}
        <div className="bg-gray-50 py-8 mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
              Why NRIs Are Re-Evaluating Investment Strategy
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  For years, <strong>NRI property investment in India</strong>{" "}
                  focused on metro cities like Mumbai, Pune, Gurgaon, and the
                  Ahmedabad outskirts. While these markets offer stability, high
                  entry prices and slower land appreciation are pushing
                  investors to look elsewhere.
                </p>
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  In 2026, many NRIs are exploring{" "}
                  <strong>land investment in India</strong> and{" "}
                  <strong>upcoming smart cities in India</strong> where growth
                  is still at an early stage. Investors are asking practical
                  questions about NRI investment options in India, long-term
                  property appreciation in India, and whether structured regions
                  like Dholera SIR offer better long-term positioning.
                </p>
                <blockquote className="border-l-4 border-[#d8b66d] pl-4 italic text-[#d8b66d] font-semibold text-base mb-4">
                  "This shift in approach is one reason why Dholera Smart City
                  is increasingly part of serious investment discussions."
                </blockquote>
                <p className="text-base text-gray-700 leading-relaxed">
                  This is where Gujarat especially Dholera - enters the
                  conversation.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={dholeraSmartCity}
                    alt="Dholera Smart City"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── The Smart City That's Built on Policy, Not Just Promises ── */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            The Smart City That is Built on Policy, Not Just Promises
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Unlike organic city growth, Dholera Smart City is part of a
            structured national plan under the{" "}
            <strong>Delhi–Mumbai Industrial Corridor</strong>. This is not a
            random township. It is a designated <strong>Dholera SIR</strong>{" "}
            (Special Investment Region) - a legally notified planning zone with
            industrial, residential, and infrastructure mapping.
          </p>
          <p className="text-base text-gray-700 mb-3">
            When investors review Dholera smart city project details, they
            typically focus on:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Large-scale land pooling model",
              "Industrial zoning",
              "Dedicated activation zones",
              "Government-led trunk infrastructure",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-base text-gray-700"
              >
                <span className="text-[#d8b66d] font-bold">●</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-base text-gray-700 leading-relaxed">
            One of the most discussed zones is the{" "}
            <strong>Dholera activation area</strong>, where infrastructure like
            roads, drainage, and utility corridors are already operational.
          </p>
        </div>

        {/* ── Infrastructure That Changes the Investment Equation ── */}
        <div id="Infrastructure" className="bg-gray-50 py-8 mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Infrastructure That Changes the Investment Equation
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Real estate appreciation follows infrastructure. And Dholera's
              value proposition is directly tied to major projects.
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: "✈",
                  label: "Dholera International Airport",
                  detail:
                    "The upcoming Dholera International Airport (often searched as Dholera airport) is expected to enhance logistics and connectivity for the entire region and surrounding industrial zones.",
                },
                {
                  icon: "🛣",
                  label: "Ahmedabad–Dholera Expressway",
                  detail:
                    "The Ahmedabad Dholera expressway reduces travel time and improves regional access between Ahmedabad and Gujarat Dholera, making the corridor more commercially viable.",
                },
                {
                  icon: "☀",
                  label: "Dholera Solar Park",
                  detail:
                    "The large-scale Dholera Solar Park supports industrial power needs and positions the region as an energy-backed manufacturing zone with sustainable energy supply.",
                },
                {
                  icon: "🏢",
                  label: "ABCD Building",
                  detail:
                    "The ABCD Building in Dholera serves as the administrative hub, indicating formal governance presence inside the SIR - a marker of active development.",
                },
                {
                  icon: "🏭",
                  label: "Semiconductor Manufacturing Push",
                  detail:
                    "The proposed TATA Semiconductor plant in Dholera and discussions around a broader Dholera semiconductor plant have increased investor curiosity. When industrial jobs grow, housing demand follows. That's the long-term thesis.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveInfra(activeInfra === i ? null : i)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-semibold text-gray-800 text-base">
                        {item.label}
                      </span>
                    </span>
                    {activeInfra === i ? (
                      <ChevronUp
                        className="text-[#d8b66d] shrink-0"
                        size={20}
                      />
                    ) : (
                      <ChevronDown
                        className="text-[#d8b66d] shrink-0"
                        size={20}
                      />
                    )}
                  </button>
                  {activeInfra === i && (
                    <div className="px-4 pb-4 text-base text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
                      {item.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Can NRI Buy Land in India? Legal Clarity First. ── */}
        <div id="LegalClarity" className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            Can NRI Buy Land in India? Legal Clarity First.
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            One of the most searched questions is:{" "}
            <strong>Can NRI buy land in India?</strong>
            <br /> Yes, NRIs can purchase non-agricultural land and residential
            property, subject to FEMA and RBI guidelines.
          </p>
          <p className="text-base text-gray-700 mb-3">
            Important considerations include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              "Payment via NRE/NRO accounts",
              "Proper title verification",
              "Understanding zoning within Dholera SIR",
              "NRI property tax in India compliance",
              "Repatriation rules upon sale",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
              >
                <CheckCircle
                  className="text-[#d8b66d] shrink-0 mt-0.5"
                  size={18}
                />
                <span className="text-base text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            This is why structured zones like{" "}
            <strong>Dholera SIR investment</strong> models attract attention,
            they operate within defined planning regulations.
          </p>
        </div>

        {/* ── Is Land Investment in India Better Than Apartments for NRIs? ── */}
        <div className="bg-gray-50 py-8 mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
              Is Land Investment in India Better Than Apartments for NRIs?
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="text-base text-gray-700 mb-3">
                  Many NRIs now prefer <strong>land investment in India</strong>{" "}
                  over ready flats because:
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    "No depreciation like buildings",
                    "Lower maintenance",
                    "Early-stage entry pricing",
                    "Better upside in emerging corridors",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-base text-gray-700"
                    >
                      <span className="text-[#d8b66d] font-bold">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2">
                <p className="text-base text-gray-700 mb-3">
                  When looking at <strong>plots in Dholera</strong>, investors
                  usually evaluate:
                </p>
                <ul className="space-y-2 mb-4 pt-6">
                  {[
                    "Location relative to activation area",
                    "Road connectivity",
                    "Proximity to industrial zones",
                    "Long-term zoning plans",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-base text-gray-700"
                    >
                      <span className="text-[#d8b66d] font-bold">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              The investment logic is based on projected{" "}
              <strong>property appreciation in India</strong> driven by
              infrastructure, not short-term flipping.
            </p>
          </div>
        </div>

        {/* ── How Does Dholera Compare With Other NRI Investment Destinations in India? ── */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            How Does Dholera Compare With Other NRI Investment Destinations in
            India?
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            When evaluating <strong>NRI property investment in India</strong>,
            most investors consider cities like Pune, Ahmedabad outskirts,
            Surat, or Gurgaon. These are mature markets with established demand
            but higher entry prices and slower land appreciation.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Dholera Smart City is a planned greenfield development under Dholera
            SIR. It is infrastructure-led, with projects like{" "}
            <strong>Dholera International Airport</strong>, the{" "}
            <strong>Ahmedabad–Dholera Expressway</strong>, and industrial growth
            initiatives including semiconductor developments.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            For NRIs seeking early-stage growth rather than saturated markets,
            Dholera offers a different risk–reward profile.
          </p>
        </div>

        {/* ── Step-by-Step Checklist Before Buying Plots in Dholera ── */}
        <div id="Checklist" className="bg-[#151f28] py-8 mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📌</span>
              <h2 className="text-xl md:text-3xl font-bold text-white">
                Step-by-Step Checklist Before Buying Plots in Dholera
              </h2>
            </div>
            <p className="text-gray-400 text-base mb-6">
              If you are considering plots in Dholera, follow this structured
              checklist:
            </p>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Confirm the Plot Is Inside Dholera SIR",
                  desc: "Verify survey number and town planning alignment within the Dholera smart city project.",
                },
                {
                  step: "02",
                  title: "Check Proximity to Dholera Activation Area",
                  desc: "Closer access to operational infrastructure may influence long-term value.",
                },
                {
                  step: "03",
                  title: "Review Infrastructure Connectivity",
                  desc: "Evaluate access to Dholera International Airport and the Ahmedabad–Dholera Expressway.",
                },
                {
                  step: "04",
                  title: "Understand Industrial Drivers",
                  desc: "Monitor developments like semiconductor initiatives and support from Dholera Solar Park.",
                },
                {
                  step: "05",
                  title: "Verify Legal Compliance",
                  desc: "Ensure NA status, clear title, FEMA compliance, and understand NRI property tax in India.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#d8b66d] flex items-center justify-center font-bold text-[#151f28] text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-base mb-1">
                      ✔ {item.title}
                    </p>
                    <p className="text-gray-400 text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-base mt-6">
              For NRIs exploring{" "}
              <strong className="text-[#d8b66d]">
                land investment in India
              </strong>
              , structured due diligence is essential before committing to any
              Dholera investment opportunity.
              
            </p>
          </div>
        </div>

        {/* ── What Makes Dholera Different ── */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4"> 
            What Makes Dholera SIR Different From Other Upcoming Smart Cities in
            India?
          </h2>
          <p className="text-base text-gray-700 mb-4">
            Several smart cities exist on paper. But Dholera's differentiation
            lies in:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              "Large contiguous land area",
              "Dedicated industrial zoning",
              "Government-notified SIR status",
              "Infrastructure-first approach",
              "Energy ecosystem via Dholera solar park",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
              >
                <span className="text-[#d8b66d] font-bold text-lg">●</span>
                <span className="text-base text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            When people search for a Dholera smart city project, they are
            typically looking for structured growth, not speculative layouts.
          </p>
        </div>

        {/* ── Risks Every NRI Should Understand ── */}
        <div className="bg-gray-50 py-8 mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
              Risks Every NRI Should Understand
            </h2>
            <p className="text-base text-gray-700 mb-4">
              Balanced analysis is essential.
            </p>
            <div className="space-y-3">
              {[
                "Not all land marketed as 'Dholera' is within Dholera SIR",
                "Agricultural land purchase restrictions apply",
                "Liquidity may take time in early phases",
                "Title due diligence is critical",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white border border-orange-200 rounded-lg px-4 py-3"
                >
                  <AlertTriangle
                    className="text-orange-400 shrink-0 mt-0.5"
                    size={18}
                  />
                  <span className="text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-base text-gray-700 leading-relaxed mt-4">
              Smart investors evaluate location within the Dholera smart city
              project details, not just marketing brochures.
            </p>
          </div>
        </div>

        {/* ── Is Dholera a Dholera Investment Opportunity Worth Considering? ── */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            So, Is Dholera a Dholera Investment Opportunity Worth Considering?
          </h2>
          <p className="text-base text-gray-700 mb-4">
            For NRIs exploring structured{" "}
            <strong>NRI investment options in India</strong>, Dholera
            represents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              "Infrastructure-backed planning",
              "Industrial manufacturing potential",
              "Airport-led connectivity",
              "Semiconductor-led employment ecosystem",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
              >
                <CheckCircle className="text-[#d8b66d] shrink-0" size={18} />
                <span className="text-base text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            It may not be for short-term traders. But for those evaluating{" "}
            <strong>long-term property appreciation in India</strong>, emerging
            smart corridors often present an asymmetric upside compared to
            saturated metro markets.
          </p>
        </div>

        {/* ── Conclusion ── */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            Conclusion: Strategic, Not Emotional Investment
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Dholera is not a guaranteed shortcut to wealth. It is a
            policy-driven smart city experiment supported by infrastructure and
            industrial ambition.
          </p>
          <p className="text-base text-gray-700 mb-3">For NRIs researching:</p>
          <ul className="space-y-2 mb-4">
            {[
              "NRI property investment in India",
              "Upcoming smart cities in India",
              "Land investment in India",
              "Dholera SIR investment",
              "Dholera smart city project details",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-base text-gray-700"
              >
                <span className="text-[#d8b66d] font-bold">●</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-base text-gray-700 leading-relaxed">
            It deserves structured evaluation - with legal checks and long-term
            perspective.
          </p>
        </div>

        {/* ── Article FAQs ── */}
        <div id="ArticleFAQs" className="max-w-6xl mx-auto px-4 mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-8 text-center relative">
            <span className="relative after:content-[\'\'] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Frequently Asked Questions
            </span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can NRI buy land in India, including Dholera?",
                a: "Yes. NRIs can purchase non-agricultural land and residential property under FEMA guidelines. Within Dholera Smart City, investors usually buy NA plots inside the notified Dholera SIR area.",
              },
              {
                q: "Is Dholera Smart City government approved?",
                a: "Yes. Dholera is a notified Special Investment Region (SIR) under Gujarat law and part of the industrial corridor development. Projects like the Dholera International Airport and Ahmedabad–Dholera Expressway support its long-term planning.",
              },
              {
                q: "Why is Dholera considered a strong Dholera investment opportunity?",
                a: "Dholera attracts attention due to planned infrastructure, industrial zoning, renewable energy support from Dholera Solar Park, and semiconductor-related developments such as the proposed TATA Semiconductor plant in Dholera.",
              },
              {
                q: "What is the Dholera activation area?",
                a: "The Dholera activation area is the first phase where roads, drainage, and utilities are operational. Properties near this zone are often evaluated for long-term growth potential.",
              },
              {
                q: "What are NRI property tax rules in India?",
                a: "NRIs must pay property tax like residents. Rental income and capital gains are taxable under Indian law. Understanding NRI property tax in India is important before investing.",
              },
              {
                q: "Is Dholera better than Pune, Surat, Ahmedabad outskirts, or Gurgaon?",
                a: "Established cities like Pune and Gurgaon offer mature markets, while Dholera represents an early-stage smart city model with industrial corridor integration. The choice depends on whether the investor prefers stability or long-term growth potential.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50"
                  onClick={() =>
                    setActiveArticleFaq(activeArticleFaq === i ? null : i)
                  }
                >
                  <h3 className="text-base font-semibold text-[#151f28] pr-4">
                    {i + 1}. {faq.q}
                  </h3>
                  {activeArticleFaq === i ? (
                    <ChevronUp className="text-[#d8b66d] shrink-0" size={20} />
                  ) : (
                    <ChevronDown
                      className="text-[#d8b66d] shrink-0"
                      size={20}
                    />
                  )}
                </button>
                {activeArticleFaq === i && (
                  <div className="px-4 pb-4 bg-white text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        {/* <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center relative">
            <span className="relative after:content-[\'\'] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              Testimonials from NRI Clients
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                text: "I invested from Dubai through video tours. DholeraTimes made it seamless!",
                name: "Harpreet Singh, UAE",
              },
              {
                text: "From London to Dholera in 3 clicks. Thanks Simar & Team!",
                name: "Neeraj Yadav, UK",
              },
              {
                text: "I live in Dubai, and DholeraTimes helped me invest without even visiting India. Everything was smooth!",
                name: "Gurpreet Singh, UAE",
              },
              {
                text: "I invested from London and the whole process was seamless - thanks to Harjas Singh at DholeraTimes!",
                name: "Vikas Agarwal",
              },
            ].map((t, i) => (
              <blockquote
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d8b66d]"
              >
                <p className="text-base italic mb-3 text-gray-700">
                  "{t.text}"
                </p>
                <footer className="font-semibold text-[#151f28] text-sm">
                  - {t.name}
                </footer>
              </blockquote>
            ))}
            <blockquote className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d8b66d] md:col-span-2">
              <p className="text-base italic mb-3 text-gray-700">
                "Thanks to Simar Singh and the team, I bought a plot in Orchid
                Township while living in Canada."
              </p>
              <footer className="font-semibold text-[#151f28] text-sm">
                - Rajeev Gupta, Toronto
              </footer>
            </blockquote>
          </div>
        </div> */}

        {/* ── RBI & Legal Guidelines FAQs ── */}
        <div id="RBIGuidelines" className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center relative">
            <span className="relative after:content-[\'\'] after:absolute after:bottom-[-10px] after:left-1/2 after:w-20 after:h-1 after:bg-[#d8b66d] after:-translate-x-1/2">
              RBI & Legal Guidelines for NRIs
            </span>
          </h2>
          <div className="space-y-4">
            {faqs.slice(0, visibleFAQs).map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-base font-semibold text-[#151f28] pr-4">
                    {faq.question}
                  </span>
                  {activeAccordion === index ? (
                    <ChevronUp className="text-[#d8b66d] shrink-0" size={30} />
                  ) : (
                    <ChevronDown
                      className="text-[#d8b66d] shrink-0"
                      size={30}
                    />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="p-4 pt-0 bg-white text-gray-700 text-base leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            {visibleFAQs < faqs.length && (
              <div className="text-center mt-4">
                <button
                  onClick={handleViewMore}
                  className="px-6 py-2 bg-[#d8b66d] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <AnimatePresence className="p-3">
        {isContactFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <PopupForm
              title="Book A Free Consultation Today"
              headline="Book  your free consultation with our Dholera expert-no obligations, just guidance. Fields marked with * are mandatory."
              buttonName="Get A Call Back"
              trustBadge="500+ NRI Clients Served & AUDA-Approved Projects"
              X
              onClose={closeContactForm}
            />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence className="p-3">
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
            <PopupForm
              title="Book A Free Consultation Today"
              headline="Book  your free consultation with our Dholera expert-no obligations, just guidance. Fields marked with * are mandatory."
              buttonName="Get A Call Back"
              trustBadge="500+ NRI Clients Served & AUDA-Approved Projects"
              X
              onClose={closeForm}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
