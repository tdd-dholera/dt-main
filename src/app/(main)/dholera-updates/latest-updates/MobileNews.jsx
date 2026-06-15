'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const NEWS_PER_PAGE = 10;

const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};

export default function MobileNews({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / NEWS_PER_PAGE));
  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const visiblePosts = posts.slice(startIndex, startIndex + NEWS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {visiblePosts.map((post, index) => (
          <article
            key={post._id}
            className="bg-[#151f28] border border-[#d3b36b]/20 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#d3b36b]/20 hover:scale-[1.03] hover:border-[#d3b36b]/40"
          >
            <Link href={`/dholera-updates/latest-updates/${post.slug.current}`}>
              <div className=" bg-gray-200 flex items-center justify-center overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(800).height(400).url()}
                    alt={post.title || 'Dholera SIR Blog Post'}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#d3b36b]/20 to-[#151f28]/20 flex items-center justify-center">
                    <div className="text-6xl">📰</div>
                  </div>
                )}
              </div>
              <div className="p-4 text-white hover:text-[#d3b36b] transition-colors duration-300">
                <h3 className="text-lg font-semibold mb-2 cursor-pointer line-clamp-2">
                  {post.title || `Dholera Investment Guide ${index + 2}`}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    {formatDate(post.publishedAt || post._createdAt)}
                  </p>
                  <span className="font-medium hover:underline text-[#d3b36b]">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Mobile latest updates pagination"
        >
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md border border-[#d7b56d] px-4 py-2 text-sm font-semibold text-[#7a642e] transition-colors hover:bg-[#d7b56d] hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => goToPage(pageNumber)}
                aria-current={isCurrentPage ? 'page' : undefined}
                className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                  isCurrentPage
                    ? 'border-[#d7b56d] bg-[#d7b56d] text-white'
                    : 'border-gray-200 text-gray-700 hover:border-[#d7b56d] hover:text-[#7a642e]'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-[#d7b56d] px-4 py-2 text-sm font-semibold text-[#7a642e] transition-colors hover:bg-[#d7b56d] hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
