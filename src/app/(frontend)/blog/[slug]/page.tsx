import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PayloadImage } from '@/components/PayloadImage'
import RichText from '@/components/RichText'
import { createPageMetadata } from '@/lib/metadata'
import { getPayload } from '@/lib/payload'
import type { Media } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const categoryLabels: Record<string, string> = {
  insights: 'Insights',
  'product-updates': 'Product Updates',
  engineering: 'Engineering',
  research: 'Research',
  company: 'Company News',
  'student-success': 'Student Success',
  safety: 'Safety',
  announcements: 'Announcements',
}

function extractSummary(content: unknown): string | undefined {
  if (!content || typeof content !== 'object') return undefined
  const root = content as { root?: { children?: unknown[] } }
  const children = root.root?.children || []
  const lines: string[] = []

  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') return n.text
    if (Array.isArray(n.children)) return n.children.map(walk).join('')
    return ''
  }

  for (const child of children) {
    const line = walk(child).trim()
    if (line) lines.push(line)
    if (lines.length >= 2) break
  }

  const summary = lines.join(' ')
  return summary
    ? `${summary.slice(0, 155)}${summary.length > 155 ? '…' : ''}`
    : undefined
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload()
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = posts.docs[0]
  if (!post) return {}

  return createPageMetadata({
    title: post.title,
    description: extractSummary(post.content),
    path: `/blog/${slug}`,
  })
}

const BlogPost = async ({ params }: Args) => {
  const { slug } = await params
  const payload = await getPayload()
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!posts.docs[0]) {
    return notFound()
  }

  const post = posts.docs[0]
  const heroImage = post.heroImage as Media
  const authorAvatar = post.author?.avatar as Media

  // Share intent URLs (mirror metadata.ts site URL resolution; ask specifies
  // the paragon.ai fallback).
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paragon.ai'
  const postUrl = `${siteUrl}/blog/${slug}`
  const shareX = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    postUrl,
  )}&text=${encodeURIComponent(post.title)}`
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    postUrl,
  )}`

  // Fetch related posts (simplified: just 3 latest excluding current)
  const relatedPostsResult = await payload.find({
    collection: 'posts',
    limit: 3,
    where: {
      slug: {
        not_equals: slug,
      },
    },
  })
  const relatedPosts = relatedPostsResult.docs

  return (
    <>
      {/* Article Header */}
      <article className="relative pt-32 md:pt-40 pb-16 md:pb-20 z-10 w-full overflow-hidden">
        {/* Soft brand glow */}
        <div className="absolute top-0 left-0 w-full h-[400px] md:h-[600px] z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 rounded-full w-[400px] md:w-[600px] h-[200px] md:h-[300px] bg-brand-400/40 left-1/2 -translate-x-1/2 -top-[50px] md:-top-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-ink/60 hover:text-brand-600 transition-colors mb-8 md:mb-12 group reveal opacity-0 translate-y-[20px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M13 8H3M7 12L3 8L7 4" />
            </svg>
            Back to Insights
          </Link>

          {/* Meta & Title */}
          <div className="reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="label text-[10px] px-2.5 py-1 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-600">
                {categoryLabels[post.category] || post.category}
              </span>
              {post.publishedDate && (
                <span className="label text-[10px] text-ink/55">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl disp font-semibold leading-[1.1] tracking-tight mb-6 md:mb-8 text-ink break-words">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-12 pt-6 md:pt-8 border-t border-ink/10">
              <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-brand-600/10 flex items-center justify-center border border-brand-600/20 overflow-hidden">
                {authorAvatar?.url ? (
                  <PayloadImage
                    media={authorAvatar}
                    alt={authorAvatar.alt || post.author?.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs md:text-sm font-bold text-brand-600">
                    {post.author?.name?.charAt(0) || 'PR'}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm md:text-base text-ink font-medium leading-none truncate">
                  {post.author?.name || 'Paragon Research Team'}
                </p>
                {post.author?.title && (
                  <p className="text-xs md:text-sm text-ink/55 mt-1 md:mt-1.5 truncate">
                    {post.author.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Abstract Image */}
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 mb-12 md:mb-20 reveal opacity-0 translate-y-[60px] transition-all duration-900 delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0">
          <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl bg-gradient-to-br from-brand-400/10 via-bone to-bone border border-ink/10 relative overflow-hidden flex items-center justify-center">
            {heroImage?.url ? (
              <PayloadImage
                media={heroImage}
                alt={heroImage.alt || post.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                className="object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-brand-400/20 blur-[80px] md:blur-[100px]" />
                </div>
                {/* Abstract Graphic */}
                <svg
                  className="w-32 h-32 md:w-48 md:h-48 text-brand-600/20 relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 1 0 20" />
                  <path d="M2 12h20" />
                  <path d="M4.93 4.93l14.14 14.14" />
                  <path d="M19.07 4.93L4.93 19.07" />
                </svg>
                {/* Subtle Grid Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full text-ink/5 z-0"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 relative">
          <div className="xl:grid xl:grid-cols-[60px_1fr] xl:gap-12">
            {/* Floating Social Share (Desktop) */}
            <div className="hidden xl:block">
              <div className="sticky top-32 flex flex-col gap-4 h-fit reveal opacity-0 transition-all duration-900 delay-300 [&.visible]:opacity-100">
                <span className="label text-[10px] text-ink/55 text-center mb-2">
                  Share
                </span>
                <a
                  href={shareX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/55 hover:text-brand-600 hover:border-brand-400/50 hover:bg-brand-400/10 transition-all"
                  aria-label="Share on X"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="sr-only">Share on X</span>
                </a>
                <a
                  href={shareLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/55 hover:text-brand-600 hover:border-brand-400/50 hover:bg-brand-400/10 transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="sr-only">Share on LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Body Text Wrapper with Overflow Hidden to Prevent Horizontal Scrolling */}
            <div className="max-w-3xl min-w-0 w-full overflow-hidden break-words">
              <RichText
                content={post.content}
                className="prose prose-base md:prose-lg max-w-none text-ink/70 reveal opacity-0 translate-y-[20px] transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0
                  prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink
                  prose-h1:text-3xl md:prose-h1:text-4xl prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-4 md:prose-h2:mb-6 prose-h3:text-xl md:prose-h3:text-2xl prose-h4:text-lg md:prose-h4:text-xl
                  prose-p:text-ink/70 prose-p:leading-relaxed prose-p:my-5 md:prose-p:my-6
                  prose-p:first-of-type:text-lg md:prose-p:first-of-type:text-xl prose-p:first-of-type:text-ink/80 prose-p:first-of-type:mb-8 md:prose-p:first-of-type:mb-10
                  prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline break-words
                  prose-strong:text-ink prose-strong:font-semibold
                  prose-em:text-ink
                  prose-blockquote:border-l-2 prose-blockquote:border-brand-600 prose-blockquote:bg-gradient-to-r prose-blockquote:from-brand-400/10 prose-blockquote:to-transparent prose-blockquote:py-4 md:prose-blockquote:py-6 prose-blockquote:px-5 md:prose-blockquote:px-6 prose-blockquote:pr-5 md:prose-blockquote:pr-6 prose-blockquote:rounded-r-xl md:prose-blockquote:rounded-r-2xl prose-blockquote:my-8 md:prose-blockquote:my-12 prose-blockquote:not-italic
                  prose-blockquote p:text-xl md:prose-blockquote p:text-2xl prose-blockquote p:text-ink prose-blockquote p:leading-tight prose-blockquote p:mb-3 md:prose-blockquote p:mb-4
                  prose-blockquote footer:text-[10px] md:prose-blockquote footer:text-xs prose-blockquote footer:font-mono prose-blockquote footer:uppercase prose-blockquote footer:tracking-wider prose-blockquote footer:text-brand-600
                  prose-code:text-brand-600 prose-code:bg-ink/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:break-words prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-bone prose-pre:border prose-pre:border-ink/10 prose-pre:rounded-xl md:prose-pre:rounded-2xl prose-pre:my-8 md:prose-pre:my-10 prose-pre:overflow-x-auto
                  prose-ul:my-5 md:prose-ul:my-6 prose-ol:my-5 md:prose-ol:my-6 prose-li:my-1.5 md:prose-li:my-2 prose-li:marker:text-brand-600/60
                  prose-hr:border-ink/10 prose-hr:my-10 md:prose-hr:my-12
                  prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl md:prose-img:rounded-2xl prose-img:border prose-img:border-ink/10 prose-img:my-8 md:prose-img:my-10
                  prose-video:max-w-full prose-iframe:w-full prose-iframe:aspect-video
                  prose-figure:my-8 md:prose-figure:my-10
                  prose-figcaption:text-center prose-figcaption:text-xs md:prose-figcaption:text-sm prose-figcaption:text-ink/55 prose-figcaption:mt-3"
              />

              {/* Tags & Mobile Share */}
              <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 reveal opacity-0 translate-y-[20px] transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label text-[10px] text-ink/55 mr-2 shrink-0">
                    Tags:
                  </span>
                  {post.tags?.map((item) => (
                    <span
                      key={item.tag}
                      className="px-2.5 md:px-3 py-1 rounded-full bg-bone/70 border border-ink/10 text-[11px] md:text-xs text-ink/60 whitespace-nowrap"
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 xl:hidden">
                  <span className="label text-[10px] text-ink/55">Share:</span>
                  <a
                    href={shareX}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink/55 hover:text-brand-600 transition-colors"
                    aria-label="Share on X"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="sr-only">Share on X</span>
                  </a>
                  <a
                    href={shareLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink/55 hover:text-brand-600 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="sr-only">Share on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Research Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-bone/40 border-t border-ink/10 relative z-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <h3 className="disp font-semibold text-xl md:text-2xl text-ink mb-8 md:mb-10 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              Read next
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map((relatedPost, index) => {
                const relHero = relatedPost.heroImage as Media
                const delay = index * 100
                return (
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    key={relatedPost.id}
                    className="group block reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0"
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-bone border border-ink/10 mb-4 md:mb-6 transition-all duration-500 group-hover:border-brand-400/50 group-hover:-translate-y-1 relative">
                      {relHero?.url ? (
                        <PayloadImage
                          media={relHero}
                          alt={relHero.alt || relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-400/10 to-transparent flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                          <svg
                            className="w-8 h-8 text-ink/15 group-hover:text-brand-600/40 transition-colors"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                          >
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                            <path d="M3.6 9h16.8M3.6 15h16.8" />
                            <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="label text-[10px] text-brand-600">
                        {categoryLabels[relatedPost.category] ||
                          relatedPost.category}
                      </span>
                    </div>
                    <h4 className="disp font-semibold text-base md:text-lg text-ink group-hover:text-brand-600 transition-colors leading-snug mb-2 line-clamp-3">
                      {relatedPost.title}
                    </h4>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default BlogPost
