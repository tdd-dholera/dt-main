// src/middleware.js
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ✅ Current site ka naam
const SITE_NAME = process.env.SITE_NAME || "dholeratimes";

let redirectCache = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000;

async function fetchRedirects() {
  const now = Date.now();
  if (redirectCache && now - cacheTime < CACHE_TTL) return redirectCache;

  // ✅ Sirf is site ke redirects fetch karo
  redirectCache = await client.fetch(
    `*[_type == "redirect" && site == $site]{ source, destination, permanent }`,
    { site: SITE_NAME }
  );
  cacheTime = now;
  return redirectCache;
}

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // www force
  if (hostname === "dholeratimes.com") {
    url.host = "www.dholeratimes.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Sanity Redirects — site specific
  const redirects = await fetchRedirects();
  const pathname = request.nextUrl.pathname;
  const match = redirects.find((r) => r.source === pathname);

  if (match) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = match.destination;
    return NextResponse.redirect(redirectUrl, {
      status: match.permanent ? 301 : 302,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|studio).*)"],
};