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
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105">
      {/* Image */}
      <Link href={`/dholera-updates/blogs/${post.slug.current}`} className="">
        {/* Changed to aspect-[3/2] to match your image ratio */}
        <div className="relative w-full aspect-[3/2]">
          {post.mainImage ? (
            <Image
              src={getSanityImageUrl(post.mainImage, 1200, 800)}
              alt={post.mainImage?.alt || post.title || "Dholera update"}
              width={1200}
              height={800}
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <div className="w-full px-4 py-2 transition-all font-semibold border-white hover:bg-[#d6b873] bg-[#151f28] hover:text-[#151f28] text-lg md:text-base text-[#d6b873] mt-auto space-y-3">
            {/* Title */}
            <h3 className="text-xl font-semibold line-clamp-2 h-14">
              {post.title}
            </h3>

            {/* Meta info */}
            <div className="text-sm text-gray-400">
              <time>
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
            <div className="underline underline-offset-4 text-lg">
              Read More
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
