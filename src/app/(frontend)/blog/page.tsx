import Link from 'next/link'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { PayloadImage } from '@/components/PayloadImage'
import { getCachedBlogPosts, getCachedFeaturedPost } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Post } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Notes, research, and engineering writing from the Paragon AI team.',
  path: '/blog',
})

const categoryLabels: Record<string, string> = {
  insights: 'Insights',
  'product-updates': 'Product Updates',
  engineering: 'Engineering & Tech',
  research: 'Research',
  company: 'Company News',
  'student-success': 'Student Success',
  safety: 'Safety',
  announcements: 'Announcements',
}

const BlogIndexPage = async () => {
  const [allResult, featuredResult] = await Promise.all([
    getCachedBlogPosts(),
    getCachedFeaturedPost(),
  ])

  const allPosts = (allResult?.docs || []) as unknown as Post[]
  const featuredDocs = (featuredResult?.docs || []) as unknown as Post[]
  const featured = featuredDocs[0] || allPosts[0] || null
  const rest = featured
    ? allPosts.filter((p) => p.id !== featured.id)
    : allPosts

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="relative max-w-[1200px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
          Blog
        </div>

        <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
          Field notes from the frontier.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          Research updates, engineering write-ups, and announcements from the
          ParagonAI team.
        </p>

        {allPosts.length === 0 ? (
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/60">
            <p className="text-lg font-semibold text-white">No posts yet</p>
            <p className="mt-2 text-sm">
              Create posts in the Payload admin to publish here.
            </p>
          </div>
        ) : (
          <>
            {featured ? <FeaturedPost post={featured} /> : null}

            {rest.length > 0 ? (
              <section className="mt-20 border-t border-white/10 pt-12">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                  Latest
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => {
                    const hero = post.heroImage as Media | undefined
                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.05]"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          {hero?.url ? (
                            <PayloadImage
                              media={hero}
                              alt={hero.alt || post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                              {categoryLabels[post.category] || post.category}
                            </span>
                            {post.publishedDate ? (
                              <span className="text-[10px] font-medium text-white/35">
                                {new Date(
                                  post.publishedDate,
                                ).toLocaleDateString()}
                              </span>
                            ) : null}
                          </div>

                          <h3 className="mt-3 text-lg font-bold leading-snug text-white">
                            {post.title}
                          </h3>

                          {post.author?.name ? (
                            <p className="mt-4 text-xs font-semibold text-white/50">
                              {post.author.name}
                              {post.author.title
                                ? ` · ${post.author.title}`
                                : ''}
                            </p>
                          ) : null}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

const FeaturedPost = ({ post }: { post: Post }) => {
  const hero = post.heroImage as Media | undefined
  return (
    <section className="mt-16">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
        Featured
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="group mt-4 grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20 lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
          {hero?.url ? (
            <PayloadImage
              media={hero}
              alt={hero.alt || post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
          )}
        </div>

        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              {categoryLabels[post.category] || post.category}
            </span>
            {post.publishedDate ? (
              <span className="text-xs font-medium text-white/40">
                {new Date(post.publishedDate).toLocaleDateString()}
              </span>
            ) : null}
          </div>

          <h2 className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl">
            {post.title}
          </h2>

          {post.author?.name ? (
            <p className="mt-6 text-sm font-semibold text-white/60">
              By {post.author.name}
              {post.author.title ? `, ${post.author.title}` : ''}
            </p>
          ) : null}

          <div className="mt-8 inline-flex items-center text-sm font-bold text-white transition-colors group-hover:text-white/80">
            Read article
            <svg
              className="ml-2 h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <title>Arrow right</title>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </section>
  )
}

export default BlogIndexPage
