// src/middleware.js
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const SITE_NAME = process.env.SITE_NAME || "dholera-times";
const SITE_URL = process.env.SITE_URL || "https://www.dholeratimes.com";

let redirectCache = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000;

async function fetchRedirects() {
  const now = Date.now();

  if (redirectCache && now - cacheTime < CACHE_TTL) {
    return redirectCache;
  }

  redirectCache = await client.fetch(
    `*[_type == "redirect" && site == $site]{ source, destination, permanent }`,
    { site: SITE_NAME },
  );

  cacheTime = now;
  return redirectCache;
}

function buildRedirectUrl(destination) {
  if (!destination) return null;

  let cleanDestination = destination.trim();

  // Remove localhost if it was accidentally saved in Sanity
  cleanDestination = cleanDestination.replace(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i,
    "",
  );

  // Internal redirect, example: /blogs/my-post
  if (cleanDestination.startsWith("/")) {
    return new URL(cleanDestination, SITE_URL);
  }

  // External redirect, example: https://example.com/page
  if (cleanDestination.startsWith("https://")) {
    return cleanDestination;
  }

  // Fallback: treat destination without slash as internal path
  return new URL(`/${cleanDestination}`, SITE_URL);
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const redirects = await fetchRedirects();
  const match = redirects.find((r) => r.source === pathname);

  if (match) {
    const redirectUrl = buildRedirectUrl(match.destination);

    if (redirectUrl) {
      const response = NextResponse.redirect(redirectUrl, {
        status: match.permanent ? 301 : 302,
      });

      response.headers.set("x-dt-redirect-source", "sanity-middleware-v2");
      response.headers.set("x-dt-site-url", SITE_URL);
      response.headers.set("x-dt-destination", match.destination || "");
      response.headers.set("x-dt-final-url", String(redirectUrl));

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|studio).*)"],
};
