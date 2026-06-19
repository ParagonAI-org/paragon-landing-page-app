import { getPayload } from './payload'
import { unstable_cache } from 'next/cache'

export const getCachedPosts = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedDate',
      depth: 1,
    })
  },
  ['posts'],
  { tags: ['posts'] }
)

export const getCachedFeaturedPost = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'posts',
      limit: 1,
      depth: 1,
      where: {
        featured: {
          equals: true,
        },
      },
    })
  },
  ['featured-post'],
  { tags: ['posts'] }
)

export const getCachedAnnouncements = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.findGlobal({
      slug: 'announcements',
    })
  },
  ['announcements'],
  { tags: ['announcements'] }
)

export const getCachedNavigation = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.findGlobal({
      slug: 'navigation',
    })
  },
  ['navigation'],
  { tags: ['navigation'] }
)

export const getCachedFooter = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.findGlobal({
      slug: 'footer',
    })
  },
  ['footer'],
  { tags: ['footer'] }
)
