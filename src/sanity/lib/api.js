import { client } from "./client";

const site = "dholera-times"
// Fetch all blog posts
/* Projects */
export async function getPosts() {
  const query = `*[_type == "post" && "Project" in categories[]->title && author-> name == "Dholera Times" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title, _id}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' }); // Disables caching
  return posts;
}

export async function getProjects() {
  const query = `*[_type == "post" && "Project" in categories[]->title && !("Sold Out" in categories[]->title) && author->name == "Dholera Times"]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    description,
    author->{name, image},
    categories[]->{title, _id},
    "category": categories[0]->title // Get the first category for easy access
  }`;
  
  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  return posts;
}
/* Blogs */
export async function getblogs() {
  const query = `*[_type == "post" && "Blog" in categories[]->title && author-> name == "Dholera Times" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title, _id}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' }); // Disables caching
  return posts;
}

/* News */
export async function getNews() {
  const query = `*[_type == "post" && "News" in categories[]->title && author-> name == "Dholera Times" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title, _id}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' }); // Disables caching
  return posts;
}

/* Updates */
export async function getUpdates() {
  const query = `*[_type == "post" && "Updates" in categories[]->title && author-> name == "Dholera Times" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title, _id}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' }); // Disables caching
  return posts;
}

export async function getPostBySlug(slug, category = null) {
  const categoryFilter = category
    ? `&& "${category}" in categories[]->title`
    : "";

  const query = `*[
    _type == "post" &&
    slug.current == $slug &&
    site == $site
    ${categoryFilter}
  ][0]{
    _id, title, metaTitle, metaDescription, 
    canonicalUrl, noIndex, keywords,   
    "ogImage": ogImage.asset->url,    
    slug,
    mainImage { asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, alt },
    createdAt, publishedAt, _updatedAt,
    body[]{ ..., _type=="image"=>{..., asset->{ _id, _ref, url }}, markDefs[]{..., _type=="link"=>{"href":@.href}} },
    author->{ name, image }, categories[]->{ title, _id }, readingTime
  }`;
  return await client.fetch(query, { slug, site });
} 


/* Inventory & Brochure */
export async function Inventory() {
  const query = `*[_type == "post" && author->name == "Dholera Times" && "Project" in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "categories": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown"),
    "isSoldOut": "Sold Out" in categories[]->title
  }`;

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    const json = await response.json();
    const posts = json.result || [];

    // Filter to return only posts that have a PDF URL
    const filteredPosts = posts.filter(post => post.pdfUrl);
    return filteredPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}


export async function Brochure() {
  const query = `*[_type == "post" && author->name == "Dholera Times" && "Brochure" in categories[]->title] | order(publishedAt desc) [0..9] {
      _id,
      title,
      publishedAt,
      mainImage,
      "pdfUrl": coalesce(pdfFile.asset->url, null),
      "category": coalesce(categories[]->title, []),
      "author": coalesce(author->name, "Unknown")
  }`;

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, { cache: "no-store" }); // ✅ Cache disabled
    const json = await response.json();
    const posts = json.result || [];

    // Filter out posts with no pdfUrl
    const filteredPosts = posts.filter((post) => post.pdfUrl);
    return filteredPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/* EVENTS & WEBINAR */
export async function getEvents() {
  const query = `*[_type == "event" && author->name == "Dholera Times" && "Upcoming Events" in categories[]->title] | order(publishedAt desc) {
    _id,
    eventName,
    slug,
    mainImage,
    publishedAt,
    description,
    dateOfEvent,
    timeOfEvent,
    location,
    mapsLink,
    "eventMaterials": eventMaterials.asset->url,
    categories[]->{title, _id}
  }`;

  try {
    const events = await client.fetch(query, { slug }, { cache: 'no-store' });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getWebinar() {
  const query = `*[_type == "event" && author->name == "Dholera Times" && "Webinar" in categories[]->title] | order(publishedAt desc) {
    _id,
    eventName,
    slug,
    mainImage,
    publishedAt,
    description,
    dateOfEvent,
    timeOfEvent,
    location,
    mapsLink,
    "eventMaterials": eventMaterials.asset->url,
    categories[]->{title, _id}
  }`;

  try {
    const events = await client.fetch(query, { slug }, { cache: 'no-store' });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    _id,
    eventName,
    slug,
    mainImage,
    publishedAt,
    description,
    dateOfEvent,
    timeOfEvent,
    location,
    mapsLink,
    "eventMaterials": eventMaterials.asset->url,
    categories[]->{title, _id}
  }`;
  const post = await client.fetch(query, { slug }, { cache: 'no-store' });
  return post;
}

export async function getProjectInfo() {
  const query = `*[_type == "post" && "project-Info" in categories[]->title && author-> name == "Dholera Times" ]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title, _id}
  }`;
  const posts = await client.fetch(query, {}, { cache: 'no-store' }); // Disables caching
  return posts;
}

export const getBlogBySlug = (slug) => getPostBySlug(slug, "Blog");
export const getNewsBySlug = (slug) => getPostBySlug(slug, "News");
export const getAboutBySlug = (slug) => getPostBySlug(slug, "project-Info");

export async function getAllProjects() {
  const query = `*[_type == "post" && "Project" in categories[]->title && author->name == "Dholera Times"]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    description,
    author->{name, image},
    categories[]->{title, _id},
    "category": categories[0]->title,
    "isSoldOut": "Sold Out" in categories[]->title
  }`;
  
  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  
  // Sort by category, with Sold Out category at the end
  const sortedPosts = posts.sort((a, b) => {
    // First, separate sold out projects to the end
    if (a.isSoldOut && !b.isSoldOut) return 1;
    if (!a.isSoldOut && b.isSoldOut) return -1;
    
    // If both have same sold out status, sort by category name
    if (a.isSoldOut === b.isSoldOut) {
      const categoryA = a.category || '';
      const categoryB = b.category || '';
      
      // Sort categories alphabetically
      if (categoryA < categoryB) return -1;
      if (categoryA > categoryB) return 1;
      
      // If same category, sort by publishedAt (newest first)
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
    
    return 0;
  });
  
  return sortedPosts;
}

export async function getProjectsForSidebar(currentProjectSlug = null) {
  const query = `*[_type == "post" && "Project" in categories[]->title && author->name == "Dholera Times"]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    description,
    author->{name, image},
    categories[]->{title, _id},
    "category": categories[0]->title,
    "isSoldOut": "Sold Out" in categories[]->title
  }`;
  
  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  
  // Find current project to determine its status
  const currentProject = currentProjectSlug 
    ? posts.find(p => p.slug?.current === currentProjectSlug)
    : null;
  
  let filteredPosts;
  
  if (currentProject?.isSoldOut) {
    // If current project is sold out, show only active projects
    filteredPosts = posts.filter(p => !p.isSoldOut);
  } else {
    // If current project is active, show all projects but prioritize active ones
    filteredPosts = posts.sort((a, b) => {
      // Active projects first
      if (!a.isSoldOut && b.isSoldOut) return -1;
      if (a.isSoldOut && !b.isSoldOut) return 1;
      
      // If both have same status, sort by publishedAt (newest first)
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
  }
  
  return filteredPosts;
}
