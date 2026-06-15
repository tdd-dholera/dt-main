import React from "react";
import hero from "@/assets/hero5.webp";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <>
      <meta name="robots" content="index, dofollow"/>
      <link rel="canonical" href="https://www.dholeratimes.com/policies/termsandconditions" />

      <div className="relative w-full h-[40vh]">
        <Image src={hero} alt="hero" layout="fill" objectFit="cover" priority />
      </div>
      <div className="max-w-7xl mx-auto py-16 px-5 leading-relaxed">
        <h1 className="text-5xl font-bold pb-6">Terms & Conditions</h1>

        <ol className="list-decimal ml-6 space-y-4">
          <li>
            By using or accessing the Website, Terms and Conditions, the User
            agrees, acknowledges, and accepts all of the Terms and Conditions
            without reservation or limitation.
          </li>
          <li>
            The website mentioned above is The Company's only official website.
            Users are cautioned and advised not to rely on any information
            contained on other websites that appear to be similar to the
            Company's official website and/or contain the Company's logo / brand
            name or information about the Company or its projects.
          </li>
          <li>
            Customers/Investors are advised to use their own discretion while
            investing in the Company's Projects, and the Investors must read all
            of the information about the company before investing in its
            projects. All efforts have been made to ensure the accuracy of the
            information, but the same should not be interpreted
          </li>
          <li>
            Artistic works on this website, such as walkthroughs, E-Brochures
            and other similar material, are for representational purposes only
            and are not part of any agreement or legal binding.
          </li>
          <li>
            The website and all of the Company's content are provided "as is"
            and "as available" basis. No information provided on this Website
            constitutes a warranty or expands the scope of any warranty that
            cannot be disclaimed under applicable law. Your use of the Website
            and its content is entirely at your own risk. This website is only
            intended to provide guidance. It does not form part of an offer or
            contract. The design and specifications are subject to change
            without prior notice. Computer-generated images are the artist's
            impressions and are representative of the actual designs.
          </li>
          <li>
            Users should verify information before making decisions, including
            inspecting properties and seeking legal, tax, or financial advice
            from qualified professionals.
          </li>
          <li>
            You should take appropriate steps to verify any information
            contained on our sites, such as inspecting the property and any
            other relevant documentation, and seek proper legal, tax, and, if
            appropriate, independent financial advice from a qualified
            professional adviser before taking, or refraining from, any action
            based on the content on our websites. Nothing on our websites should
            be taken as legal or financial advice.
          </li>
          <li>
            We cannot guarantee that our websites will be secure or free of bugs
            or viruses. You are responsible for configuring your information
            technology, computer programs, and platform to access our websites.
            You should use your own antivirus software.
          </li>
          <li>
            Stamp duty on the investor's purchase of the property will be
            charged at 4.90% for females and 5.90% for males of the sale
            consideration until further notice by the Government of Gujarat. The
            government will charge GST in accordance with its regulations.
          </li>
          <li>
            The booking amount is Rs. 50,000 (Subject to change without prior
            notice.).
          </li>
          <li>
            The plot price and charges are subject to change without prior
            notice.
          </li>
          <li>Maintenance charges are one-time and non-refundable.</li>
          <li>Legal fees cover documentation and registration expenses.</li>
          <li>
            The final payment must be completed within the stipulated period.
          </li>
          <li>Full payment is to be completed within 30 days.</li>
          <li>
            Preferred Location Charge (PLC) will be added where necessary.
          </li>
          <li>
            In case of cancellation, refunds can be requested within 30 days.
            Refunds will be processed within 7 working days (subject to change
            without prior notice).
          </li>
          <li>
            The Company is not liable for any uncertainties or delays caused by
            the government or authorities.
          </li>
        </ol>

        <h2 className="text-2xl font-bold pt-6">Contact Us</h2>
        <br/>
        <p>
          For further information, contact us at:{" "}
          <a
            href="mailto:info@dholeratimes.com"
            className="text-blue-600 underline font-bold"
          >
            info@dholeratimes.com
          </a>{" "}
          or call us at{" "}
          <a
            href="tel:+919958993549"
            className="text-blue-600 underline font-bold"
          >
            +91 9958993549
          </a>
          .
        </p>
      </div>
    </>
  );
}
