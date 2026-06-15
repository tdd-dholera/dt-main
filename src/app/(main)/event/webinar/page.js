import React from "react";
import Image from "next/image";
import { getWebinar } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

// Format date for display
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Check if date is in the past
function isPastEvent(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  
  // Reset time portion for accurate date comparison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  
  return eventDate < today;
}

export default async function PropertyPromotion() {
  // Use the existing getEvents function
  const events = await getWebinar();

  // Filter events to only show webinar type events, or use all events if no filter is needed
  const webinars = events.filter(event => 
    event.categories && 
    event.categories.some(cat => cat.title === "Webinar")
  );
  
  // Use filtered webinars or all events if no webinars exist
  const displayEvents = webinars.length > 0 ? webinars : events;
  
  // Separate past and upcoming events
  const pastEvents = displayEvents.filter(event => isPastEvent(event.dateOfEvent));
  const upcomingEvents = displayEvents.filter(event => !isPastEvent(event.dateOfEvent));
  
  // Limit to the first 8 upcoming events for display
  const upcomingEventsToShow = upcomingEvents.slice(0, 8);

  return (
    <>
      <meta name="robots" content="noindex, follow"/>
      <div className="pt-10 pb-10">
        <h1 className="font-bold text-5xl text-center pt-10 pb-10">Webinars</h1>

        {/* Upcoming Webinars */}
        {upcomingEventsToShow.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 mb-16">
            <h2 className="text-3xl font-semibold mb-6">Upcoming Webinars</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEventsToShow.map((webinar) => (
                <div 
                  key={webinar._id}
                  className="border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex flex-col">
                    <div className="relative h-52 w-full">
                      {webinar.mainImage ? (
                        <Image
                          src={urlFor(webinar.mainImage).width(800).height(600).url()}
                          alt={webinar.eventName || "Webinar Image"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}

                      {webinar.categories && webinar.categories.length > 0 && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded">
                          Upcoming
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {webinar.eventName || "Property Investment Webinar"}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-2">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {formatDate(webinar.dateOfEvent || new Date())}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-4">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {webinar.timeOfEvent || "08.00 IST"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        {webinar.organizer && (
                          <span className="text-sm text-gray-600">
                            Organized by: {webinar.organizer}
                          </span>
                        )}

                        <Link
                          href={
                            webinar.slug?.current
                              ? `/register/${webinar.slug.current}`
                              : "#"
                          }
                          className="block"
                        >
                          <button className="bg-orange-500 text-black py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 flex items-center">
                            <span>Register Now</span>
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Webinars */}
        {pastEvents.length > 0 && (
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">Past Webinars</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pastEvents.map((webinar) => (
                <div 
                  key={webinar._id}
                  className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="flex flex-col">
                    <div className="relative h-32 w-full">
                      {webinar.mainImage ? (
                        <Image
                          src={urlFor(webinar.mainImage).width(400).height(300).url()}
                          alt={webinar.eventName || "Webinar Image"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}

                      {webinar.categories && webinar.categories.length > 0 && (
                        <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded">
                          Past
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                        {webinar.eventName || "Property Investment Webinar"}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-1">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          {formatDate(webinar.dateOfEvent || new Date())}
                        </span>
                      </div>

                      <Link
                        href={
                          webinar.slug?.current
                            ? `/webinar/${webinar.slug.current}`
                            : "#"
                        }
                        className="mt-2 block w-full"
                      >
                        <button className="w-full bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center">
                          <span>View Recording</span>
                          <ArrowRightIcon className="ml-1 h-3 w-3" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No webinars message */}
        {displayEvents.length === 0 && (
          <div className="max-w-3xl mx-auto p-6 text-center border border-gray-300 rounded-lg">
            <p className="text-lg">
              No upcoming webinars at the moment. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}