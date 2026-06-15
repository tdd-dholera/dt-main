// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          "/costsheet/",
        ],
      },
    ],
    sitemap: "https://www.dholeratimes.com/sitemap.xml",
  };
}