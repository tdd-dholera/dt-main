import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getEventBySlug } from "@/sanity/lib/api";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/dtlogobg.png"
import EventForm from "./Eventform";

export default async function EventPage({ params }) {
  const { slug } = await params;
  const eventData = await getEventBySlug(slug);

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-6">
            <img
              alt={value.alt || " "}
              src={urlFor(value).width(800).url()}
              className="w-full rounded-xl shadow-lg"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            href={value.href}
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
          >
            {children}
          </a>
        );
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-12 mb-4 sm:mb-6 text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4 text-gray-800">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="mb-4 sm:mb-6 text-gray-700 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-4 sm:my-6 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section */}
      <section className="relative h-[25vh] sm:h-[30vh] w-full flex justify-center items-center text-center ">
        
        <div className="relative text-xl sm:text-2xl md:text-4xl text-black font-bold px-4">
          <p>EVENT SIGN IN {eventData.location}</p>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:w-[90vw] md:w-[85vw] lg:w-[80vw] py-8 sm:py-12">
        <div className="grid sm:grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Registration form - full width on mobile, 4/12 columns on desktop */}
          <div className="md:col-span-4 md:order-1 order-2 mt-6 md:mt-0">
            <div className="sticky top-4">
              <EventForm />
            </div>
          </div>
          {/* Event details - full width on mobile, 8/12 columns on desktop */}
          <div className="md:col-span-8 md:order-2 order-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  Event Details
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Date, time, location */}
                  <div className="flex items-center text-gray-700">
                    <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#151f28] mr-3 flex-shrink-0" />
                    <p className="text-sm sm:text-base">
                      {new Date(eventData.dateOfEvent).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#151f28] mr-3 flex-shrink-0" />
                    <p className="text-sm sm:text-base">{eventData.timeOfEvent}</p>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#151f28] mr-3 flex-shrink-0" />
                    <p className="text-sm sm:text-base">{eventData.location}</p>
                  </div>

                  {/* Description, why attend, who should attend - Using PortableText */}
                  <div className="pt-4 sm:pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3">
                      Description
                    </h3>
                    <div className="text-sm sm:text-base">
                      <PortableText value={eventData.description} components={components} />
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 my-3 sm:my-4">
                      Why should you attend this Dholera property Event?
                    </h3>
                    <div className="text-sm sm:text-base">
                      <PortableText value={eventData.whyAttend} components={components} />
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 my-3 sm:my-4">
                      Who needs to attend this Dholera property Event?
                    </h3>
                    <div className="text-sm sm:text-base">
                      <PortableText value={eventData.whoShouldAttend} components={components} />
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="pt-4 sm:pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3">
                      Organisers
                    </h3>
                    <div className="flex items-center">
                      <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[#151f28] rounded-full flex items-center justify-center overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                        <Image
                          src={logo}
                          alt="organiser img"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{eventData.organizer}</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Name of Point Of Contact
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}