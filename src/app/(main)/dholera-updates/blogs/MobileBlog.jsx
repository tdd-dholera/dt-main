'use client';
import { useState } from 'react';
import BlogCard from './BlogCard';

const BLOGS_PER_PAGE = 10;

export default function MobileBlogSwiper({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOGS_PER_PAGE));
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const visiblePosts = posts.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {visiblePosts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Mobile blog pagination"
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
