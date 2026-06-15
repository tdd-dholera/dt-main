import Image from "next/image";
import Link from "next/link";
import { getSanityImageUrl } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  // Handle author object properly
  const authorName =
    typeof post.author === "object"
      ? post.author.name || "Unknown"
      : post.author;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-2xl transition-transform duration-300 md:hover:scale-[1.02]">
      {/* Image */}
      <Link
        href={`/dholera-sir/${post.slug.current}`}
        className="flex h-full flex-col"
      >
        {/* Changed to aspect-[3/2] to match your image ratio */}
        <div className="relative aspect-[3/2] w-full">
          {post.mainImage ? (
            <Image
              src={getSanityImageUrl(post.mainImage, 1200, 800)}
              alt={post.mainImage?.alt || post.title || "Dholera SIR"}
              width={1200}
              height={800}
              unoptimized
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-grow flex-col">
          <div className="mt-auto flex h-full w-full flex-col space-y-3 bg-[#151f28] px-4 py-3 font-semibold text-[#d6b873] transition-all hover:bg-[#d6b873] hover:text-[#151f28]">
            {/* Title */}
            <h3 className="min-h-[3.5rem] text-[clamp(1.125rem,2vw,1.25rem)] font-semibold leading-[1.4] line-clamp-2">
              {post.title}
            </h3>

            {/* Meta info */}
            <div className="text-sm leading-[1.6] text-gray-400">
              <time
                dateTime={new Date(post.publishedAt).toISOString()}
                className="text-gray-500"
              >
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <div>
                Posted By{" "}
                <span className="font-medium text-white">{authorName}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="text-base underline underline-offset-4">
              Explore More
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
