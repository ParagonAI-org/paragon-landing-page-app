import { unstable_cache } from 'next/cache'
import { getPayload } from './payload'

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
  { tags: ['posts'] },
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
  { tags: ['posts'] },
)

export const getCachedAnnouncements = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.findGlobal({
      slug: 'announcements',
    })
  },
  ['announcements'],
  { tags: ['announcements'] },
)

export const getCachedNavigation = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.findGlobal({
      slug: 'navigation',
    })
  },
  ['navigation'],
  { tags: ['navigation'] },
)

export const getCachedFooter = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.findGlobal({
      slug: 'footer',
    })
  },
  ['footer'],
  { tags: ['footer'] },
)

export const getCachedProducts = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'products',
      sort: 'order',
      depth: 1,
    })
  },
  ['products'],
  { tags: ['products'] },
)

export const getCachedFeaturedProducts = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'products',
      sort: 'order',
      depth: 1,
      where: {
        featured: {
          equals: true,
        },
      },
    })
  },
  ['featured-products'],
  { tags: ['products'] },
)

export const getCachedProduct = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'products',
      depth: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return result.docs[0] || null
  },
  ['product-by-slug'],
  { tags: ['products'] },
)

export const getCachedHelpArticles = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'help-articles',
      sort: 'order',
      depth: 0,
    })
  },
  ['help-articles'],
  { tags: ['help'] },
)

export const getCachedHelpArticle = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'help-articles',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return result.docs[0] || null
  },
  ['help-article-by-slug'],
  { tags: ['help'] },
)

export const getCachedFaqs = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'faqs',
      sort: 'order',
      depth: 0,
    })
  },
  ['faqs'],
  { tags: ['faq'] },
)

export const getCachedCareers = unstable_cache(
  async () => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'careers',
      sort: 'order',
      depth: 0,
      where: {
        active: {
          equals: true,
        },
      },
    })
  },
  ['careers'],
  { tags: ['careers'] },
)

export const getCachedCareer = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'careers',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            active: {
              equals: true,
            },
          },
        ],
      },
    })
    return result.docs[0] || null
  },
  ['career-by-slug'],
  { tags: ['careers'] },
)

export const getCachedLegalPage = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'legal-pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    return result.docs[0] || null
  },
  ['legal-page-by-slug'],
  { tags: ['legal'] },
)

export const getCachedBlogPosts = unstable_cache(
  async (limit?: number) => {
    const payload = await getPayload()
    return await payload.find({
      collection: 'posts',
      sort: '-publishedDate',
      depth: 1,
      limit: limit && limit > 0 ? limit : undefined,
    })
  },
  ['blog-posts'],
  { tags: ['posts'] },
)
