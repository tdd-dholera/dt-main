// lib/sanity.redirects.js
import { client } from '@/sanity/lib/client'  // apna sanity client path

export async function getRedirects() {
  return client.fetch(
    `*[_type == "redirect"]{ source, destination, permanent }`,
    {},
    { next: { tags: ['redirect'] } }
  )
}