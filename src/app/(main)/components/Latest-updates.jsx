import { getblogs, getNews } from '@/sanity/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { getSanityImageUrl } from '@/sanity/lib/image';

function RelatedBlogCard({ item, type }) {
  const slug =
    type === 'blog'
      ? `/dholera-updates/blogs/${item.slug?.current || '#'}`
      : `/dholera-updates/latest-updates/${item.slug?.current || '#'}`;

  return (
    <div className='flex-shrink-0 w-56 md:w-72 mx-3 snap-center cursor-pointer'>
      <div className='bg-[#151f28] rounded-xl shadow-2xl overflow-hidden border border-[#d6b873]/30 transition-all duration-300 hover:scale-105'>
        <div className='relative w-full h-36 md:h-48 aspect-[3/2]'>
          {item.mainImage ? (
            <Image
              src={getSanityImageUrl(item.mainImage, 1200, 800)}
              alt={item.mainImage?.alt || item.title || 'Dholera update'}
              fill
              sizes='(max-width: 768px) 75vw, 288px'
              loading='lazy'
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full bg-gray-700 flex items-center justify-center'>
              <span className='text-gray-400'>No image</span>
            </div>
          )}
        </div>

        <div className='p-4'>
          <Link href={slug} className='block'>
            <h3 className='text-base font-semibold text-[#d6b873] line-clamp-2 mb-2 hover:text-white transition-colors duration-300'>
              {item.title}
            </h3>
            <div className='text-xs text-gray-400 mb-3'>
              <time className='block mb-1'>
                {new Date(item.publishedAt || item._createdAt).toLocaleDateString(
                  'en-US',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  },
                )}
              </time>
              <span className='font-medium text-white'>Dholera Times</span>
            </div>

            <span className='text-[#d6b873] hover:text-white text-sm font-medium inline-flex items-center group underline underline-offset-4'>
              Explore More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function LatestUpdates() {
  const [blogsData, updatesData] = await Promise.all([getblogs(), getNews()]);

  const content = [
  ...(blogsData || []).map((item) => ({ ...item, _type: 'blog' })),
  ...(updatesData || []).map((item) => ({ ...item, _type: 'news' })),
]
  .sort(
    (a, b) =>
      new Date(b.publishedAt || b._createdAt) -
      new Date(a.publishedAt || a._createdAt),
  )
  .slice(0, 4);

  return (
    <section className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-2xl md:text-4xl text-center font-bold text-[#151f28] mb-4'>
          Stay Updated with Dholera’s Latest Developments
        </h2>

        <div className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6'>
          {content.map((item) => (
            <RelatedBlogCard
              key={item._id || item.slug?.current || item.title}
              item={item}
              type={item._type}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
