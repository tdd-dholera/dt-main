/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,

  images: {
    domains: ["cdn.sanity.io"], // Allow Sanity images
  },
  async redirects() {
    return [
      {
        source: "/projects/:slug*",
        destination: "/dholera-residential-plots/:slug*",
        permanent: true,
      },
      {
        source: "/DholeraSIR/mega-industries",
        destination: "/dholera-sir/mega-industries",
        permanent: true,
      },
      {
        source: "/DholeraSIR/Mega-Industries-Presence",
        destination: "/dholera-sir/mega-industries",
        permanent: true,
      },

      {
        source: "/posts/paradise-2",
        destination: "/projects/paradise-2",
        permanent: true,
      },
      {
        source: "/DholeraSIR/About",
        destination: "/dholera-sir/about-dholera-sir",
        permanent: true,
      },
      {
        source: "/pages/Blogs",
        destination: "/dholera-updates/blogs",
        permanent: true,
      },
      {
        source: "/posts/maple",
        destination: "/projects/maple",
        permanent: true,
      },
      {
        source: "/posts/marina-bay",
        destination: "/projects/marina-bay",
        permanent: true,
      },
      {
        source: "/posts/orchid-township",
        destination: "/projects/orchid-township",
        permanent: true,
      },
      {
        source: "/pages/projects",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/posts/paradise-1",
        destination: "/projects/paradise-1",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact/inquiry",
        permanent: true,
      },
      {
        source: "/Blogs",
        destination: "/Dholera-Updates/blogs",
        permanent: true,
      },
      {
        source: "/posts/westwyn-county",
        destination: "/projects/westwyn-county",
        permanent: true,
      },
      {
        source: "/Dholera-Updates/blogs/dholera-plot-price",
        destination: "/dholera-updates/blogs/dholera-plot-price",
        permanent: true,
      },
      {
        source: "/dholera-updates/blogs/why-invest-in-dholera",
        destination: "/dholera-updates/blogs/why-invest-in-dholera-smart-city",
        permanent: true,
      },
      {
        source:
          "/Dholera-Updates/blogs/important-tips-for-buying-plots-in-dholera-smart-city",
        destination:
          "/dholera-updates/blogs/important-tips-for-buying-plots-in-dholera-smart-city",
        permanent: true,
      },
      {
        source: "/Dholera-SIR/mega-industries",
        destination: "/dholera-sir/mega-industries-in-dholera",
        permanent: true,
      },
      {
        source: "/Dholera-SIR/abcd-building",
        destination: "/dholera-sir/the-abcd-building-in-dholera",
        permanent: true,
      },
      {
        source: "/Dholera-Updates",
        destination: "/dholera-updates/blogs",
        permanent: true,
      },
      {
        source: "/career",
        destination: "/contact/career",
        permanent: true,
      },
      {
        source: "/DholeraSIR",
        destination: "/dholera-sir/dholera-sir",
        permanent: true,
      },
      {
        source: "/DholeraSIR/Dholera-International-Airport",
        destination: "/dholera-sir/dholera-international-airport",
        permanent: true,
      },
      {
        source: "/dholera-sir/dholera-sir",
        destination: "/dholera-sir/about-dholera-sir",
        permanent: true,
      },
      {
        source: "/dholera-sir/dholera-expressway",
        destination: "/dholera-sir/ahmedabad-dholera-expressway",
        permanent: true,
      },
      {
        source: "/dholera-sir/dholera-SIR-current-Status",
        destination: "/dholera-sir/mega-industries-in-dholera",
        permanent: true,
      },
      {
        source: "/posts/paradise-dt",
        destination: "/projects/paradise-2",
        permanent: true,
      },
      {
        source: "/Blogs",
        destination: "/dholera-updates/blogs",
        permanent: true,
      },
      {
        source: "/Dholera",
        destination: "/dholera-sir",
        permanent: true,
      },
      {
        source: "/gallery/siteprogress",
        destination: "/gallery/site-progress",
        permanent: true,
      },
      {
        source: "/pages/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/pages/dholeraSIR",
        destination: "/dholera-sir/dholera-sir",
        permanent: true,
      },
      {
        source: "/pages/about",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/pages/contact",
        destination: "/contact/inquiry",
        permanent: true,
      },
      {
        source: "/DholeraSIR/Dholera-Expressway-Six-Lane",
        destination: "/dholera-sir/ahmedabad-dholera-expressway",
        permanent: true,
      },
      {
        source: "/DholeraSIR/Dholera-International-Airport",
        destination: "/dholera-sir/international-airport-dholera",
        permanent: true,
      },
      {
        source:
          "/dholera-updates/latest-news/gujarat-government-seeks-rs-40-783-crore-grant-from-centre-for-semiconductor-industry",
        destination:
          "/dholera-updates/latest-updates/gujarat-government-seeks-rs-40-783-crore-grant-from-centre-for-semiconductor-industry",
        permanent: true,
      },
      {
        source:
          "/dholera-updates/latest-news/semiconductor-leader-tokyo-electron-in-dholera",
        destination:
          "/dholera-updates/latest-updates/semiconductor-leader-tokyo-electron-in-dholera",
        permanent: true,
      },
      {
        source:
          "/dholera-updates/latest-news/nextgen-8800cr-investment-in-dholera-semiconductor-fab",
        destination:
          "/dholera-updates/latest-updates/nextgen-8800cr-investment-in-dholera-semiconductor-fab",
        permanent: true,
      },
      {
        source: "/dholera-updates/latest-news",
        destination: "/dholera-updates/latest-updates",
        permanent: true,
      },
      {
        source:
          "/dholera-updates/latest-news/dholera-international-airport-latest-news-2025",
        destination:
          "/dholera-updates/latest-updates/dholera-international-airport-latest-news-2025",
        permanent: true,
      },
      {
        source:
          "/dholera-updates/latest-updates/india-s-first-semiconductor-fab-construction-begins-in-dholera-gujarat",
        destination:
          "/dholera-updates/blogs/india-s-first-semiconductor-fab-construction-begins-in-dholera-gujarat",
        permanent: true,
      },
      {
        source: "/dholera-sir/rohm-tata-semiconductor-partnership-in-dholera",
        destination:
          "/dholera-updates/latest-updates/rohm-tata-semiconductor-partnership-in-dholera",
        permanent: true,
      },
      {
        source: "/dholera-sir/dholera-railway-connectivity-update-jan-2026",
        destination:
          "/dholera-updates/latest-updates/dholera-railway-connectivity-update-jan-2026",
        permanent: true,
      },
      {
        source:
          "/dholera-sir/indigenous-100-seater-aircraft-project-dholera-sir",
        destination:
          "/dholera-updates/latest-updates/indigenous-100-seater-aircraft-project-dholera-sir",
        permanent: true,
      },
      {
        source: "/dholera-residential-plots/abcd-building",
        destination: "/dholera-sir/the-abcd-building-in-dholera",
        permanent: true,
      },
      {
        source: "/dholera-residential-plots/dholera-connectivity",
        destination:
          "/dholera-sir/connectivity-makes-dholera-the-next-big-investment-hub",
        permanent: true,
      },

      {
        source:
          "/Dholera-SIR/delhi-mumbai-industrial-corridor-set-to-transform-india-with-usd-100-billion-investment",
        destination:
          "/dholera-updates/latest-updates/delhi-mumbai-industrial-corridor-set-to-transform-india-with-usd-100-billion-investment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
