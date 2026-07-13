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
      <article className="relative pt-40 pb-20 z-10">
        {/* Aurora Background */}
        <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-30 mix-blend-screen rounded-full w-[600px] h-[300px] bg-primary left-1/2 -translate-x-1/2 -top-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Back Link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-dim hover:text-accent transition-colors mb-12 group reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 12L3 8L7 4"/>
            </svg>
            Back to Insights
          </Link>

          {/* Meta & Title */}
          <div className="reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-wider text-accent">
                {categoryLabels[post.category] || post.category}
              </span>
              {post.publishedDate && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-dim">
                  {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] tracking-tight mb-8 text-ink">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-12 pt-8 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-accent/20">
                {authorAvatar?.url ? (
                  <PayloadImage
                    media={authorAvatar}
                    alt={authorAvatar.alt || post.author?.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <span className="text-sm font-bold text-accent">
                    {post.author?.name?.charAt(0) || 'PR'}
                  </span>
                )}
              </div>
              <div>
                <p className="text-base text-cream font-medium leading-none">
                  {post.author?.name || 'Paragon Research Team'}
                </p>
                {post.author?.title && (
                  <p className="text-sm text-dim mt-1">
                    {post.author.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Abstract Image */}
        <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-20 reveal opacity-0 translate-y-[60px] transition-all duration-900 ease-out-expo delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0">
          <div className="w-full aspect-[21/9] rounded-[2rem] bg-gradient-to-br from-primary/15 via-surface-2 to-surface border border-white/5 relative overflow-hidden flex items-center justify-center">
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
                  <div className="w-96 h-96 rounded-full bg-accent-secondary/20 blur-[100px]"></div>
                </div>
                {/* Abstract Graphic */}
                <svg className="w-48 h-48 text-accent/20 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.3">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a10 10 0 0 1 0 20"/>
                  <path d="M2 12h20"/>
                  <path d="M4.93 4.93l14.14 14.14"/>
                  <path d="M19.07 4.93L4.93 19.07"/>
                </svg>
                {/* Subtle Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full text-white/[0.03] z-0" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
          <div className="xl:grid xl:grid-cols-[60px_1fr] xl:gap-12">
            {/* Floating Social Share (Desktop) */}
            <div className="hidden xl:block">
              <div className="sticky top-32 flex flex-col gap-4 h-fit reveal opacity-0 transition-all duration-900 ease-out-expo delay-300 [&.visible]:opacity-100">
                <span className="font-mono text-[9px] uppercase tracking-wider text-dim text-center mb-2">Share</span>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-dim hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all" aria-label="Share on X">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-dim hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all" aria-label="Share on LinkedIn">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Body Text */}
            <div className="max-w-3xl">
              <RichText
                content={post.content}
                className="prose prose-invert prose-lg max-w-none text-dim reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0
                  prose-headings:font-display prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-2xl prose-h4:text-xl
                  prose-p:text-dim prose-p:leading-relaxed prose-p:my-6
                  prose-p:first-of-type:text-xl prose-p:first-of-type:text-cream/90 prose-p:first-of-type:mb-10
                  prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-cream prose-strong:font-semibold
                  prose-em:text-cream
                  prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-gradient-to-r prose-blockquote:from-primary/10 prose-blockquote:to-transparent prose-blockquote:py-6 prose-blockquote:px-6 prose-blockquote:pr-6 prose-blockquote:rounded-r-2xl prose-blockquote:my-12 prose-blockquote:not-italic
                  prose-blockquote p:text-2xl prose-blockquote p:text-cream prose-blockquote p:leading-tight prose-blockquote p:mb-4
                  prose-blockquote footer:text-xs prose-blockquote footer:font-mono prose-blockquote footer:uppercase prose-blockquote footer:tracking-wider prose-blockquote footer:text-accent
                  prose-code:text-accent prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-surface-2 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:my-10
                  prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-li:marker:text-accent/60
                  prose-hr:border-white/10 prose-hr:my-12
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:my-10
                  prose-figure:my-10
                  prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-dim prose-figcaption:mt-3"
              />

              {/* Tags & Mobile Share */}
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-dim mr-2">Tags:</span>
                  {post.tags?.map((item) => (
                    <span
                      key={item.tag}
                      className="px-3 py-1 rounded-full bg-surface-2 border border-white/5 text-xs text-dim"
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 xl:hidden">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-dim">Share:</span>
                  <a href="#" className="text-dim hover:text-accent transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-dim hover:text-accent transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Research Section */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-surface border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <h3 className="font-display text-2xl text-ink mb-10 reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
              Read next
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => {
                const relHero = relatedPost.heroImage as Media
                const delay = index * 100
                return (
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    key={relatedPost.id}
                    className="group block reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0"
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-surface-2 border border-white/5 mb-6 transition-all duration-500 group-hover:border-accent/30 group-hover:-translate-y-1 relative">
                      {relHero?.url ? (
                        <PayloadImage
                          media={relHero}
                          alt={relHero.alt || relatedPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent-secondary/10 to-transparent flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                          <svg className="w-8 h-8 text-dim/20 group-hover:text-accent/40 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>
                            <path d="M3.6 9h16.8M3.6 15h16.8"/>
                            <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent">
                        {categoryLabels[relatedPost.category] || relatedPost.category}
                      </span>
                    </div>
                    <h4 className="font-display text-lg text-cream/90 group-hover:text-accent transition-colors leading-snug mb-2">
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
