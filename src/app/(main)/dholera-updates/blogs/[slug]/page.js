import { PortableText } from "@portabletext/react";
import { getSanityImageUrl } from "@/sanity/lib/image";
import {
  getblogs,
  getNews,
  getBlogBySlug,
  getProjects,
} from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";

import LeadFormSlug from "../../latest-updates/[slug]/LeadForm";
import CommonForm from "@/app/(main)/components/FormSection";
import LeadFormBlock from "@/app/(main)/components/blog/LeadFormBlock";

const URLFormatter = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const formatPostDate = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  return {
    dateTime: date.toISOString().split("T")[0],
    label: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
};

const extractHeadings = (body) => {
  if (!body || !Array.isArray(body)) return [];

  return body
    .filter((block) => {
      // Check if it's a valid heading block
      const isHeading =
        block.style &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.style);

      // Check if it has valid text content
      const hasValidText =
        block.children &&
        Array.isArray(block.children) &&
        block.children.length > 0 &&
        block.children[0]?.text &&
        block.children[0].text.trim().length > 0;

      return isHeading && hasValidText;
    })
    .map((block) => ({
      ...block,
      // Ensure we have clean text
      children: [
        {
          ...block.children[0],
          text: block.children[0].text.trim(),
        },
      ],
    }));
};

// Trending Blog Item Component
const TrendingBlogItem = ({ post }) => {
  return (
    <Link href={`/dholera-updates/blogs/${post.slug.current}`}>
      <div className="flex gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
        {post.mainImage && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={getSanityImageUrl(post.mainImage, 1200, 800)}
              alt={post.title || "Dholera Times"}
              width={1200}
              height={800}
              unoptimized
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
            {post.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug, "dholera-times");

  return {
    title: post?.metaTitle,
    description: post?.metaDescription,
    keywords: post?.keywords,
    alternates: {
      canonical: `https://www.dholeratimes.com/dholera-updates/blogs/${slug}`,
    },
    robots: "index, follow",
    authors: [{ name: "Dholera Times" }],
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const site = "dholera-times";

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  try {
    const [post, trendingBlogs, relatedBlogs, getPro] = await Promise.all([
      getBlogBySlug(slug, site),
      getblogs(4), // Get top 4 trending news
      getNews(slug, 3), // Get 3 related blogs based on categories or tags
      getProjects(slug),
    ]);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Blog post not found</h1>
            <Link
              href="/dholera-updates/blogs"
              className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
            >
              ← Back to blogs
            </Link>
          </div>
        </div>
      );
    }

    const components = {
      types: {
        image: ({ value }) => {
          if (!value?.asset) return null;

          const imageUrl =
            value.asset.url || getSanityImageUrl(value, 1200, 800);

          const imageNode = (
            <img
              src={imageUrl}
              alt={value.alt || ""}
              className="w-full h-auto aspect-[3/2] rounded-lg my-6"
              width={1200}
              height={800}
              loading="lazy"
            />
          );

          return (
            <figure className="my-6">
              {value.url ? (
                <a
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {imageNode}
                </a>
              ) : (
                imageNode
              )}
              {value.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          );
        },

        leadFormBlock: ({ value }) => {
          return <LeadFormBlock {...value} />;
        },

        table: ({ value }) => {
          if (!value?.rows || !Array.isArray(value.rows)) {
            console.log("No table data or invalid structure:", value);
            return null;
          }

          // Check if this is a Sanity table structure
          const rows = value.rows || [];

          return (
            <div className="overflow-x-auto my-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full">
                <tbody>
                  {rows.map((row, i) => {
                    // Handle both possible Sanity table structures
                    const cells = row.cells || row;

                    if (!cells || !Array.isArray(cells)) {
                      return null;
                    }

                    return (
                      <tr
                        key={i}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          i === 0
                            ? "bg-gradient-to-r from-[#d3b66b]/10 to-[#b69b5e]/10 font-semibold"
                            : i % 2 === 0
                              ? "bg-gray-50/50"
                              : "bg-white"
                        }`}
                      >
                        {cells.map((cell, j) => {
                          // Handle cell content - could be string or rich text
                          const cellContent =
                            typeof cell === "string"
                              ? cell
                              : cell?.text || cell?.value || "";

                          return (
                            <td
                              key={j}
                              className="px-6 py-4 text-gray-700 border-b border-gray-100 last:border-r-0"
                            >
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        },

        htmlTableBlock: ({ value }) => {
          if (!value?.html) return null;

          return (
            <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <div
                className="[&_table]:w-full [&_table]:border-collapse [&_table]:bg-white 
      [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-700 
      [&_th]:bg-gray-50 [&_th]:border-b [&_th]:border-gray-200
      [&_td]:px-6 [&_td]:py-4 [&_td]:text-gray-600 [&_td]:border-b [&_td]:border-gray-200
      [&_tr:last-child_td]:border-b-0
      [&_tr:hover]:bg-gray-50/50
      [&_th:first-child]:rounded-tl-lg [&_th:last-child]:rounded-tr-lg
      [&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg"
                dangerouslySetInnerHTML={{ __html: value.html }}
              />
            </div>
          );
        },

        code: ({ value }) => (
          <div className="my-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-1 shadow-2xl">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed">
                {value.code}
              </code>
            </pre>
          </div>
        ),
      },

      marks: {
        link: ({ children, value }) => {
          // Helper function to extract plain text from children
          const extractText = (node) => {
            if (typeof node === "string") return node;
            if (Array.isArray(node)) {
              return node.map(extractText).join("");
            }
            if (node?.props?.children) {
              return extractText(node.props.children);
            }
            return "";
          };

          const linkText = extractText(children);
          const titleText = value.title || linkText; // Use provided title or fallback to link text

          return (
            <Link
              href={value.href}
              title={titleText}
              rel="noopener noreferrer"
              className="text-[#d3b36b] hover:text-[#b69b5e] underline decoration-[#b69b5e]/30 hover:decoration-[#b69b5e] decoration-2 underline-offset-4 transition-all duration-300 hover:bg-[#b69b5e]/5 px-1 py-0.5 rounded"
            >
              {children}
            </Link>
          );
        },
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900 px-1 py-0.5 rounded">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-[#151f28] bg-gray-50 px-1 py-0.5 rounded">
            {children}
          </em>
        ),
        code: ({ children }) => (
          <code className="font-mono bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 rounded-md text-sm text-[#151f28] border border-gray-300">
            {children}
          </code>
        ),
        button: ({ children, value }) => {
          const getButtonClasses = () => {
            switch (value.style) {
              case "secondary":
                return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-[#151f28] shadow-lg hover:shadow-xl";
              case "outline":
                return "bg-transparent border-2 border-[#d3b66b] text-[#d3b66b] hover:bg-[#d3b66b] hover:text-white shadow-md hover:shadow-lg";
              default:
                return "bg-gradient-to-r from-[#d3b66b] to-[#b69b5e] hover:from-[#b69b5e] hover:to-[#d3b66b] shadow-lg hover:shadow-xl";
            }
          };

          return (
            <Link
              href={value.href}
              className={`inline-block px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 ${getButtonClasses()}`}
            >
              {value.text || children}
            </Link>
          );
        },
      },

      block: {
        h1: ({ children }) => {
          // Better text extraction
          const getText = () => {
            if (typeof children === "string") return children;
            if (Array.isArray(children)) {
              return children
                .map((child) =>
                  typeof child === "string" ? child : child?.props?.text || "",
                )
                .join("");
            }
            return "";
          };
          const text = getText();
          const id = URLFormatter(text);

          return (
            <h1
              id={id}
              className="text-2xl md:text-5xl font-black mt-8 mb-6 text-gray-800 relative border-l-4 border-[#b69b5e] pl-6 bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-4 [&+ul]:mt-4 [&+ol]:mt-4"
            >
              <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#d3b66b] to-[#9e8750] rounded-full"></span>
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const getText = () => {
            if (typeof children === "string") return children;
            if (Array.isArray(children)) {
              return children
                .map((child) =>
                  typeof child === "string" ? child : child?.props?.text || "",
                )
                .join("");
            }
            return "";
          };
          const text = getText();
          const id = URLFormatter(text);

          return (
            <h2
              id={id}
              className="text-2xl md:text-3xl font-bold mt-8 mb-6 text-gray-800 relative border-l-4 border-[#b69b5e] pl-6 bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-3 [&+ul]:mt-4 [&+ol]:mt-4"
            >
              <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#d3b66b] to-[#b69b5e] rounded-full"></span>
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const getText = () => {
            if (typeof children === "string") return children;
            if (Array.isArray(children)) {
              return children
                .map((child) =>
                  typeof child === "string" ? child : child?.props?.text || "",
                )
                .join("");
            }
            return "";
          };
          const text = getText();
          const id = URLFormatter(text);

          return (
            <h3
              id={id}
              className="text-xl md:text-2xl font-bold mt-8 mb-5 text-gray-800 relative border-l-4 border-[#b69b5e] pl-6 bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-2 [&+ul]:mt-4 [&+ol]:mt-4"
            >
              <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#d3b66b] to-[#b69b5e] rounded-full"></span>
              {children}
            </h3>
          );
        },
        h4: ({ children }) => {
          const getText = () => {
            if (typeof children === "string") return children;
            if (Array.isArray(children)) {
              return children
                .map((child) =>
                  typeof child === "string" ? child : child?.props?.text || "",
                )
                .join("");
            }
            return "";
          };
          const text = getText();
          const id = URLFormatter(text);

          return (
            <h4
              id={id}
              className="text-lg md:text-2xl font-semibold mt-10 mb-4 text-gray-800 relative border-l-4 border-[#b69b5e] pl-6 bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-2 [&+ul]:mt-3 [&+ol]:mt-3"
            >
              <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#d3b66b] to-[#b69b5e] rounded-full"></span>
              {children}
            </h4>
          );
        },
        h5: ({ children }) => {
          const getText = () => {
            if (typeof children === "string") return children;
            if (Array.isArray(children)) {
              return children
                .map((child) =>
                  typeof child === "string" ? child : child?.props?.text || "",
                )
                .join("");
            }
            return "";
          };
          const text = getText();
          const id = URLFormatter(text);

          return (
            <h5
              id={id}
              className="text-lg md:text-xl font-semibold mt-8 mb-3 text-gray-800 relative border-l-4 border-[#b69b5e] pl-6 bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-2 [&+ul]:mt-3 [&+ol]:mt-3"
            >
              <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#d3b66b] to-[#b69b5e] rounded-full"></span>
              {children}
            </h5>
          );
        },
        h6: ({ children }) => {
          const getText = () => {
            if (typeof children === "string") return children;
            if (Array.isArray(children)) {
              return children
                .map((child) =>
                  typeof child === "string" ? child : child?.props?.text || "",
                )
                .join("");
            }
            return "";
          };
          const text = getText();
          const id = URLFormatter(text);

          return (
            <h6
              id={id}
              className="text-lg font-semibold mt-6 mb-2 text-gray-800 relative border-l-4 border-[#b69b5e] pl-6 bg-gradient-to-r from-[#b69b5e]/5 to-transparent py-1 [&+ul]:mt-2 [&+ol]:mt-2"
            >
              <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#d3b66b] to-[#b69b5e] rounded-full"></span>
              {children}
            </h6>
          );
        },

        normal: ({ children }) => (
          <p className="mb-4 leading-loose text-left md:text-justify text-lg font-light">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="relative my-12 p-8 bg-gradient-to-br from-[#d3b66b]/5 to-[#b69b5e]/10 rounded-2xl shadow-lg border border-[#d3b66b]/20">
            <div className="absolute top-4 left-6 text-6xl text-[#d3b66b]/30 font-serif">
              "
            </div>
            <div className="pl-8 italic text-xl leading-relaxed font-medium">
              {children}
            </div>
          </blockquote>
        ),
        centerAlign: ({ children }) => (
          <p className="mb-8 leading-loose text-lg text-center bg-gray-50 py-6 rounded-xl">
            {children}
          </p>
        ),
      },

      list: {
        bullet: ({ children }) => (
          <ul className="space-y-4 mb-10 pl-0">{children}</ul>
        ),
        number: ({ children }) => (
          <ol
            className="space-y-4 mb-10 pl-0 list-none"
            style={{ counterReset: "item" }}
          >
            {children}
          </ol>
        ),
      },

      listItem: {
        bullet: ({ children }) => (
          <li className="text-lg leading-relaxed flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#d3b66b] to-[#b69b5e] mt-2 flex-shrink-0"></div>
            <div className="flex-1 [&>ul]:mt-4 [&>ul]:mb-0 [&>ol]:mt-4 [&>ol]:mb-0 [&>ul>li]:shadow-none [&>ul>li]:border-0 [&>ul>li]:p-2 [&>ol>li]:shadow-none [&>ol>li]:border-0 [&>ol>li]:p-2">
              {children}
            </div>
          </li>
        ),
        number: ({ children }) => (
          <li
            className="text-lg leading-relaxed  flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative before:content-[counter(item)] before:absolute before:left-4 before:top-4 before:w-8 before:h-8 before:bg-gradient-to-r before:from-[#d3b66b] before:to-[#b69b5e] before:rounded-full before:flex before:items-center before:justify-center before:text-white before:text-sm before:font-bold"
            style={{ counterIncrement: "item" }}
          >
            <div className="ml-10 flex-1 [&>ul]:mt-4 [&>ul]:mb-0 [&>ol]:mt-4 [&>ol]:mb-0 [&>ul>li]:shadow-none [&>ul>li]:border-0 [&>ul>li]:p-2 [&>ol>li]:shadow-none [&>ol>li]:border-0 [&>ol>li]:p-2">
              {children}
            </div>
          </li>
        ),
      },
    };

    const TableOfContent = ({ headings }) => {
      // Filter for valid headings with text content
      const validHeadings =
        headings?.filter((heading) => {
          const text = heading.children?.[0]?.text;
          return text && text.trim().length > 0;
        }) || [];

      // Filter for only h1 and h2 headings
      const h1h2Headings = validHeadings.filter((heading) => {
        return heading.style === "h1" || heading.style === "h2";
      });

      // Hide TOC if no h1 or h2 headings exist
      if (h1h2Headings.length === 0) return null;

      return (
        <div className="my-8 p-6 bg-gradient-to-br from-[#C69C21]/5 to-[#FDB913]/10 rounded-2xl shadow-lg border border-[#C69C21]/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Table of Contents
          </h2>
          <ul className="space-y-3">
            {validHeadings.map((heading, index) => {
              const text = heading.children[0].text.trim();
              const level = parseInt(heading.style.replace("h", ""));
              const indent = (level - 2) * 16;

              return (
                <li
                  key={index}
                  style={{ marginLeft: `${Math.max(0, indent)}px` }}
                  className="relative"
                >
                  <a
                    href={`#${URLFormatter(text)}`}
                    className="text-[#C69C21] hover:text-[#FDB913] hover:underline transition-colors duration-200 flex items-start gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#C69C21] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm leading-relaxed">{text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    const createdDate = formatPostDate(post.createdAt);
    const publishedDate = formatPostDate(post.publishedAt);

    return (
      <div className="bg-white min-h-screen">
        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article */}
            <article className="lg:w-2/3">
              {/* Header with breadcrumbs */}
              <div className="mb-4">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <Link
                          href="/dholera-updates/blogs"
                          className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2"
                        >
                          Blogs
                        </Link>
                      </div>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">
                          {post.title}
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Categories */}
              <div className="mb-8">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category._id || category.title}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        Blogs
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                {(createdDate || publishedDate || post.readingTime) && (
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
                    {createdDate && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="mr-1">Created:</span>
                        <time
                          className="text-gray-500"
                          dateTime={createdDate.dateTime}
                        >
                          {createdDate.label}
                        </time>
                      </div>
                    )}

                    {publishedDate && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="mr-1">Published:</span>
                        <time
                          className="text-gray-500"
                          dateTime={publishedDate.dateTime}
                        >
                          {publishedDate.label}
                        </time>
                      </div>
                    )}

                    {post.readingTime && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>{post.readingTime} min read</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {post.mainImage && (
                <div className="mb-10 overflow-hidden rounded-xl shadow-lg aspect-[3/2]">
                  <Image
                    src={getSanityImageUrl(post.mainImage, 1200, 800)}
                    alt={post.mainImage?.alt || post.title || "Dholera update"} 
                    width={1200}
                    height={800}
                    unoptimized
                    className="w-full h-auto aspect-[3/2]"
                    priority
                  />
                </div>
              )}
              <TableOfContent headings={extractHeadings(post.body)} />
              {/* Content */}
              <div className="bg-white rounded-xl shadow-2xl text-black leading-5 shadow-t-2xl p-8 border border-gray-200">
                <div className="text-xl max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Related Topics:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/dholera-updates/blogs/tag/${tag}`}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky space-y-4 top-24">
                <div className=" pt-4 max-w-xl mx-auto">
                  <LeadFormSlug
                    title="Buy Residential Plot near Dholera SIR Starting From ₹8 Lakh"
                    buttonName="Know More"
                  />
                </div>
                {/* Trending posts */}
                <div className="bg-[#151f28] rounded-xl shadow-2xl shadow-gray-500 p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Latest Blogs
                  </h3>
                  <div className="">
                    {trendingBlogs && trendingBlogs.length > 0 ? (
                      trendingBlogs
                        .filter((post) => post.slug.current !== slug) // Filter out the current blog
                        .slice(0, 5)
                        .map((post) => (
                          <div key={post._id} className="mb-3">
                            <TrendingBlogItem post={post} />
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-400">
                        No trending articles found.
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-6">
                    <Link href="/dholera-updates/blogs">
                      <span className="text-center rounded-xl text-white font-semibold bg-[#d7b56d] hover:bg-[#c6a45d] p-3 transition-colors">
                        Explore More
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Related blog posts - Properly fetched from API */}
        <section className="bg-gray-50 py-12 mt-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                You might also like
              </h2>
              <Link
                href="/dholera-updates/latest-updates"
                className="rounded-xl text-white font-semibold bg-[#d7b56d] hover:bg-[#c6a45d] p-1"
              >
                View all
              </Link>
            </div>

            <div className=" gap-6">
              {relatedBlogs && relatedBlogs.length > 0 ? (
                <>
                  {/* Mobile Slider with Improved Design */}
                  <div className="md:hidden -mx-4 px-4">
                    <div className="relative">
                      <div
                        className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {relatedBlogs.map((blog, index) => (
                          <Link
                            key={blog._id}
                            href={`/dholera-updates/latest-updates/${blog.slug.current}`}
                            className="group snap-start flex-shrink-0 first:ml-0"
                            style={{ width: "calc(100vw - 3rem)" }}
                          >
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-500 border border-gray-100 relative">
                              {/* Image Section */}
                              <div className="relative h-48 overflow-hidden">
                                {blog.mainImage ? (
                                  <>
                                    <Image
                                      src={getSanityImageUrl(
                                        blog.mainImage,
                                        1200,
                                        800,
                                      )}
                                      width={1200}
                                      height={800}
                                      unoptimized
                                      alt={blog.title}
                                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                  </>
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[#d3b66b] via-[#b69b5e] to-[#9e8750] flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-10">
                                      <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
                                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16" />
                                    </div>
                                    <span className="text-white/80 text-sm font-medium relative z-10">
                                      No image
                                    </span>
                                  </div>
                                )}

                                {/* Category Badge */}
                                {blog.category && (
                                  <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-white/95 backdrop-blur-sm text-[#b69b5e] px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                      {blog.category}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Content Section */}
                              <div className="p-5">
                                <h3 className="text-lg font-bold mb-2.5 text-gray-900 group-hover:text-[#b69b5e] line-clamp-2 transition-colors duration-300 leading-snug">
                                  {blog.title}
                                </h3>

                                {blog.description && (
                                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {blog.description}
                                  </p>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                  {blog.publishedAt && (
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                      <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                      <span className="text-xs font-medium">
                                        {new Date(
                                          blog.publishedAt,
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 text-[#b69b5e] font-semibold text-sm group-hover:gap-2.5 transition-all duration-300">
                                    <span>Explore More</span>
                                    <svg
                                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              {/* Hover Accent Line */}
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d3b66b] via-[#b69b5e] to-[#9e8750] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Scroll Indicator Dots */}
                      <div className="flex justify-center gap-2 mt-2">
                        {relatedBlogs.map((_, index) => (
                          <div
                            key={index}
                            className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Grid Layout with Enhanced Design */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/dholera-updates/latest-updates/${blog.slug.current}`}
                        className="group"
                      >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full w-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col relative">
                          {/* Image Section */}
                          <div className="relative h-56 overflow-hidden">
                            {blog.mainImage ? (
                              <>
                                <Image
                                  src={getSanityImageUrl(
                                    blog.mainImage,
                                    1200,
                                    800,
                                  )}
                                  width={1200}
                                  height={800}
                                  unoptimized
                                  alt={blog.title}
                                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              </>
                            ) : (
                              <div className="h-full bg-gradient-to-br from-[#d3b66b] via-[#b69b5e] to-[#9e8750] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10">
                                  <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
                                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
                                </div>
                                <span className="text-white/80 text-base font-medium relative z-10">
                                  No image available
                                </span>
                              </div>
                            )}

                            {/* Category Badge */}
                            {blog.category && (
                              <div className="absolute top-4 left-4 z-10">
                                <span className="bg-white/95 backdrop-blur-sm text-[#b69b5e] px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                                  {blog.category}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#b69b5e] line-clamp-2 transition-colors duration-300 leading-tight">
                              {blog.title}
                            </h3>

                            {blog.description && (
                              <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
                                {blog.description}
                              </p>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                              {blog.publishedAt && (
                                <div className="flex items-center gap-2 text-gray-400">
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span className="text-sm font-medium">
                                    {new Date(
                                      blog.publishedAt,
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-[#b69b5e] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                <span>Read More</span>
                                <svg
                                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Hover Accent Line */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d3b66b] via-[#b69b5e] to-[#9e8750] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                // Enhanced Loading Skeleton
                <>
                  {/* Mobile Skeleton */}
                  <div className="md:hidden -mx-4 px-4">
                    <div className="flex gap-4 overflow-x-auto pb-6">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                            style={{ width: "calc(100vw - 3rem)" }}
                          >
                            <div
                              className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]"
                              style={{ animation: "shimmer 2s infinite" }}
                            />
                            <div className="p-5">
                              <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded-lg w-full mb-2 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-4 animate-pulse" />
                              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div className="h-4 bg-gray-200 rounded-lg w-20 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded-lg w-24 animate-pulse" />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Desktop Skeleton */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                        >
                          <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                          <div className="p-6">
                            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded-lg w-full mb-2 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-2 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-5 animate-pulse" />
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                              <div className="h-4 bg-gray-200 rounded-lg w-24 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded-lg w-28 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <div className="pt-4">
          <CommonForm title="Still Have Questions? Contact Us Now" />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", slug, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading blog post</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/dholera-updates/blogs"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}
