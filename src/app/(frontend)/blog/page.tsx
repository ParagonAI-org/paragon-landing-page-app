import Link from 'next/link'
import { PayloadImage } from '@/components/PayloadImage'
import { getCachedBlogPosts, getCachedFeaturedPost } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Post } from '@/payload-types'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'Insights & Research — Paragon AI',
    description:
      'Essays, engineering deep-dives, and research papers on building the next generation of artificial intelligence for the continent.',
    path: '/blog',
  })
}

const categoryLabels: Record<string, string> = {
  insights: 'Insights',
  'product-updates': 'Product Updates',
  engineering: 'Engineering',
  research: 'Research',
  company: 'Company',
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
    <>
      {/* Hero / Featured Post */}
      <section className="relative pt-40 pb-20 overflow-visible z-10 w-full">
        {/* Soft brand glow */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-25 rounded-full -rotate-[15deg] w-[800px] h-[250px] bg-brand-400/40 -right-[200px] top-[20%] animate-drift-1" />
          <div className="absolute blur-[120px] opacity-20 rounded-full -rotate-[15deg] w-[900px] h-[300px] bg-brand-600/30 -right-[300px] top-[40%] animate-drift-2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Header */}
          <div
            className="mb-16 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0"
            suppressHydrationWarning
          >
            <p className="label text-brand-600 flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-brand-600 block" />
              Insights &amp; Research
            </p>
            <h1 className="text-5xl md:text-7xl disp font-semibold leading-[1] tracking-tight mb-6 text-ink">
              Insights &amp;{' '}
              <em className="serif-it font-normal text-brand-600">Research</em>
            </h1>
            <p className="text-lg md:text-xl text-ink/60 max-w-2xl leading-relaxed">
              Essays, engineering deep-dives, and research papers on building
              the next generation of artificial intelligence for the continent.
            </p>
          </div>

          {allPosts.length > 0 && featured ? (
            <FeaturedPost post={featured} />
          ) : null}
        </div>
      </section>

      {/* Articles Grid */}
      {rest.length > 0 ? (
        <section className="py-20 relative z-10 border-t border-ink/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Filter Row (placeholder for now) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-ink text-paper text-xs font-bold transition-all"
                >
                  All
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-ink/15 text-ink/60 text-xs font-semibold hover:border-ink/40 hover:text-ink transition-all"
                >
                  Research
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-ink/15 text-ink/60 text-xs font-semibold hover:border-ink/40 hover:text-ink transition-all"
                >
                  Engineering
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-ink/15 text-ink/60 text-xs font-semibold hover:border-ink/40 hover:text-ink transition-all"
                >
                  Product
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-ink/15 text-ink/60 text-xs font-semibold hover:border-ink/40 hover:text-ink transition-all"
                >
                  Company
                </button>
              </div>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search insights..."
                  className="bg-bone/70 border border-ink/10 rounded-full py-2 pl-10 pr-4 text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-brand-400/60 focus:ring-1 focus:ring-brand-400/50 transition-all w-full md:w-64"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {rest.map((post, index) => {
                const hero = post.heroImage as Media | undefined
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0"
                    style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-bone border border-ink/10 mb-6 transition-all duration-500 group-hover:border-brand-400/50 group-hover:-translate-y-1 relative">
                      {hero?.url ? (
                        <PayloadImage
                          media={hero}
                          alt={hero.alt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-400/15 to-transparent flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                          <svg
                            className="w-8 h-8 text-ink/15 group-hover:text-brand-600/40 transition-colors"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                            <path d="M3.6 9h16.8M3.6 15h16.8" />
                            <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-brand-600">
                        {categoryLabels[post.category] || post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-ink/20" />
                      <span className="font-mono text-[10px] text-ink/50">
                        {post.publishedDate
                          ? new Date(post.publishedDate).toLocaleDateString()
                          : null}
                      </span>
                    </div>
                    <h4 className="disp font-semibold text-xl text-ink group-hover:text-brand-600 transition-colors leading-snug mb-3">
                      {post.title}
                    </h4>
                  </Link>
                )
              })}
            </div>

            {/* Load More (placeholder) */}
            <div className="flex justify-center reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <button
                type="button"
                className="btn btn-ghost"
                aria-label="Load more articles"
              >
                Load more articles
                <span className="fill" />
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      ) : allPosts.length === 0 ? (
        <section className="py-20 relative z-10 border-t border-ink/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mt-20 rounded-2xl md:rounded-3xl border border-ink/10 bg-bone/70 p-12 text-center text-ink/60">
              <p className="text-lg font-semibold text-ink">No posts yet</p>
              <p className="mt-2 text-sm">
                Create posts in the Payload admin to publish here.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Newsletter CTA */}
      <section
        data-nav-dark
        className="py-32 bg-ink text-paper rounded-t-[2.5rem] md:rounded-t-[4rem] relative z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-600/25 blur-[130px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <p className="label text-brand-400 flex items-center justify-center gap-3 mb-6 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <span className="w-8 h-px bg-brand-400 block" />
            Subscribe
          </p>
          <h2 className="disp font-semibold text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-6 text-paper reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Get our latest articles{' '}
            <em className="serif-it font-normal text-brand-400">delivered.</em>
          </h2>
          <p className="text-paper/55 leading-relaxed mb-10 max-w-xl mx-auto reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Join engineers, researchers, and educators receiving our monthly
            updates on AI development in Africa. No spam, just signal.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-300 [&.visible]:opacity-100 [&.visible]:translate-y-0"
            suppressHydrationWarning
          >
            <input
              type="email"
              placeholder="Email address"
              required
              className="flex-1 bg-paper/5 border border-paper/15 rounded-full px-5 py-3 text-sm text-paper placeholder-paper/40 focus:outline-none focus:border-brand-400/60 focus:ring-1 focus:ring-brand-400/50 transition-all"
            />
            <button type="submit" className="btn btn-lime !py-3">
              Subscribe
              <span className="fill" />
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

const FeaturedPost = ({ post }: { post: Post }) => {
  const hero = post.heroImage as Media | undefined
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative overflow-hidden bg-bone/70 border border-ink/10 hover:border-brand-400/50 hover:-translate-y-1 transition-all duration-500 rounded-2xl md:rounded-3xl reveal opacity-0 translate-y-[40px] transition-all duration-900 delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0"
    >
      <div className="grid lg:grid-cols-12 gap-0 lg:gap-8 min-h-[450px]">
        {/* Featured Image Area */}
        <div className="lg:col-span-7 relative overflow-hidden bg-gradient-to-br from-brand-400/10 via-bone to-bone border-b lg:border-b-0 lg:border-r border-ink/10 order-2 lg:order-1 min-h-[300px] lg:min-h-full">
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            {hero?.url ? (
              <PayloadImage
                media={hero}
                alt={hero.alt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-64 h-64 rounded-full bg-brand-400/25 blur-[80px]" />
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            {/* Abstract Graphic if no image */}
            {!hero?.url && (
              <svg
                className="w-32 h-32 text-brand-600/20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20" />
                <path d="M2 12h20" />
                <path d="M4.93 4.93l14.14 14.14" />
                <path d="M19.07 4.93L4.93 19.07" />
              </svg>
            )}
          </div>
        </div>

        {/* Featured Text Area */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-ink text-paper text-[10px] font-mono uppercase tracking-wider">
              Featured
            </span>
            <span className="px-2.5 py-1 rounded-full border border-ink/10 text-[10px] font-mono uppercase tracking-wider text-ink/60">
              {categoryLabels[post.category] || post.category}
            </span>
          </div>
          <h2 className="disp font-semibold text-3xl lg:text-4xl text-ink mb-4 group-hover:text-brand-600 transition-colors leading-[1.15]">
            {post.title}
          </h2>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-600/10 border border-brand-600/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-brand-600">P</span>
              </div>
              <div>
                <p className="text-sm text-ink font-medium leading-none">
                  {post.author?.name || 'Paragon Research Team'}
                </p>
                <p className="text-[11px] font-mono text-ink/50 mt-1">
                  {post.publishedDate
                    ? new Date(post.publishedDate).toLocaleDateString()
                    : null}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink group-hover:border-brand-400/50 group-hover:bg-brand-400/10 group-hover:text-brand-600 transition-all">
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogIndexPage
