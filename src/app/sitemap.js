// app/sitemap.js
export const dynamic = "force-dynamic";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.dholeratimes.com";

const FETCH_OPTIONS = { cache: "no-store" }; // ← bypass Sanity CDN cache

export default async function sitemap() {

  const [blogs, updates, aboutDholera] = await Promise.all([

    client.fetch(
      `*[_type == "post" && "Blog" in categories[]->title && site == "dholera-times" && (noIndex == null || noIndex == false)]{
        "slug": slug.current, _updatedAt
      }`,
      {},
      FETCH_OPTIONS  // ← add as third arg
    ),

    client.fetch(
      `*[_type == "post" && "Updates" in categories[]->title && site == "dholera-times" && (noIndex == null || noIndex == false)]{
        "slug": slug.current, _updatedAt
      }`,
      {},
      FETCH_OPTIONS
    ),

    client.fetch(
      `*[_type == "post" && "project-Info" in categories[]->title && site == "dholera-times" && (noIndex == null || noIndex == false)]{
        "slug": slug.current, _updatedAt
      }`,
      {},
      FETCH_OPTIONS
    ),
  ]);

  // ✅ Static Pages
  const staticPages = [
    { url: BASE_URL,                              priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/about`,                   priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact/inquiry`,         priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/channel-partner`,         priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/bulk-land`,               priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/gallery/dholera-sir-progress`,                 priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/infopack`,                priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE_URL}/policies`,                priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/dholera-updates/blogs`,   priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE_URL}/dholera-updates/latest-updates`,     priority: 0.7, changeFrequency: "daily" },
    { url: `${BASE_URL}/dholera-sir`,       priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/nri-investment-guide-dholera`,       priority: 0.7, changeFrequency: "monthly" },

    // Dholera Residential Plots — Static Pages
    { url: `${BASE_URL}/dholera-residential-plots`,                   priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/dholera-residential-plots/maple`,             priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/marina-bay`,        priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/orchid`,            priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/paradise-1`,          priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/paradise-2`,        priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/pride`,             priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/westwyn-county`,    priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/westwyn-estate`,    priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/dholera-residential-plots/westwyn-residency`, priority: 0.8, changeFrequency: "monthly" },

  ].map((page) => ({ ...page }));

  // ✅ Dynamic URLs
  const blogUrls = blogs.map((post) => ({
    url: `${BASE_URL}/dholera-updates/blogs/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const updateUrls = updates.map((post) => ({
    url: `${BASE_URL}/dholera-updates/latest-updates/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const aboutDholeraUrls = aboutDholera.map((post) => ({
    url: `${BASE_URL}/dholera-sir/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogUrls,
    ...updateUrls,
    ...aboutDholeraUrls,
  ];
}