import Link from 'next/link'
import { PayloadImage } from '@/components/PayloadImage'
import BlogExplorer, {
  categoryLabels,
  type ExplorerPost,
} from '@/components/site/BlogExplorer'
import NewsletterForm from '@/components/site/NewsletterForm'
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

const toExplorerPost = (post: Post): ExplorerPost => {
  const hero = post.heroImage as Media | undefined
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    publishedDate: post.publishedDate,
    hero: hero?.url ? { url: hero.url, alt: hero.alt || post.title } : null,
  }
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
            <BlogExplorer posts={rest.map(toExplorerPost)} />
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
          <NewsletterForm />
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
      className="group block relative overflow-hidden bg-bone/70 border border-ink/10 hover:border-brand-400/50 hover:-translate-y-1 transition-all duration-500 rounded-2xl md:rounded-3xl reveal opacity-0 translate-y-[40px] delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0"
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
                aria-hidden="true"
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
            <span className="label text-[10px] px-2.5 py-1 rounded-full bg-ink text-paper">
              Featured
            </span>
            <span className="label text-[10px] px-2.5 py-1 rounded-full border border-ink/10 text-ink/60">
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
                <p className="label text-[10px] text-ink/50 mt-1.5">
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
                aria-hidden="true"
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
