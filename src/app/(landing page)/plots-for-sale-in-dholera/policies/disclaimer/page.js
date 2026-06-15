import React from "react";
import hero from "@/assets/hero5.webp";
import Image from "next/image";

export default function PrivacyPopcy() {
  return (
    <>
      <meta name="robots" content="index, dofollow"/>
      <link
          rel="canonical"
          href="https://www.dholeratimes.com/policies/disclaimer"
      />
      <div className="relative w-full h-[40vh]">
        <Image src={hero} alt="hero" layout="fill" objectFit="cover" priority />
      </div>
      <div className="max-w-7xl mx-auto py-16 px-5 leading-relaxed">
        <h1 className="text-5xl font-bold pb-6">Disclaimer</h1>

        <ol className="pst-decimal ml-6 space-y-4">
          <p>
            Note: We are currently updating our website(s), the contents of each
            page, and the project(s) to ensure complete compliance with the Real
            Estate (Regulation and Development) Act, 2016 and the rules and
            regulations notified there under ("RERA"), which went into effect on
            May 1, 2017.{" "}
          </p>
          <p>
            With a total area of over 920 square kilometers, the Dholera region
            is India's first greenfield smart city.It is also one of the largest
            greenfield industrial cities to be built under the Delhi Mumbai
            Industrial Corridor (DMIC), which is being planned and designed to
            turn entirely undeveloped land into a smart city.
          
          </p>
          <p>
            As an investor, you should be aware that the Dholera Greenfield
            region is currently only being used for investment purposes. Because
            of the way the government is planning to develop the Dholera
            Greenfield region, investments made there are sure to generate good
            multiples, making it a smart choice for futuristic investments.
          </p>
          <p>
            The content that is currently on the website including but not
            pmited to images, project renderings, pictures, copy, and other
            items, is referred to as "Website Content" and is purely indicative
            in nature. It is an artistic concept and does not represent actual
            buildings, landscapes, or locations.
          </p>
          <p>
            Investors must independently confirm all the information with the{" "}
            <span className="text-blue-600 font-bold">
              Dholera Times Sales Team{" "}
            </span>{" "}
            only, including the area, services, terms of sale and payment, and
            other pertinent terms.
          </p>
          <p>
            The website provide indicative information about projects. Products,
            features, and other artist impressions are displayed as
            illustrations and are solely for reference. Future changes may cause
            the final price of the purchased land parcel or parcels to differ
            from the actual site. Although every attempt has been made to ensure
            the accuracy of this website, Dholera Times disclaims all pabipty
            for any loss, claim, damage, or errors that may arise directly or
            indirectly, incidentally or consequentially, as a result of using or
            being unable to use this website.
          </p>
        </ol>
        <br />
        <p>
          For further information, write to us at:{" "}
          <a
            href="mailto:info@dholeratimes.com"
            className="text-blue-600 underpne font-bold"
          >
            info@dholeratimes.com
          </a>{" "}
          or call us on{" "}
          <a
            href="tel:+919958993549"
            className="text-blue-600 underpne font-bold"
          >
            +91 9958993549
          </a>
          .
        </p>
      </div>
    </>
  );
}
