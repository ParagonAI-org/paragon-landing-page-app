import Link from 'next/link'
import { PayloadImage } from '@/components/PayloadImage'
import BlogExplorer, {
  categoryLabels,
  type ExplorerPost,
} from '@/components/site/BlogExplorer'
import NewsletterForm from '@/components/site/NewsletterForm'
import PageHeader from '@/components/site/PageHeader'
import { getCachedBlogPosts, getCachedFeaturedPost } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Post } from '@/payload-types'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'Studio journal',
    description:
      'Updates from the Paragon AI studio — what we are building, learning and shipping.',
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
    getCachedBlogPosts().catch(() => null),
    getCachedFeaturedPost().catch(() => null),
  ])

  const allPosts = (allResult?.docs || []) as unknown as Post[]
  const featuredDocs = (featuredResult?.docs || []) as unknown as Post[]
  const featured = featuredDocs[0] || allPosts[0] || null
  const rest = featured
    ? allPosts.filter((p) => p.id !== featured.id)
    : allPosts

  return (
    <>
      <PageHeader
        eyebrow="Studio journal"
        title={
          <>
            What we&apos;re building
            <br />
            <span className="serif-it font-normal text-brand-600">
              &amp; learning.
            </span>
          </>
        }
        lede="Updates from the studio — what we're shipping, what's working, and what we're figuring out along the way."
      />

      <main className="max-w-[1300px] mx-auto px-5 md:px-10 pb-16 md:pb-24">
        {featured ? <FeaturedPost post={featured} /> : null}

        {rest.length > 0 ? (
          <section className="border-t border-ink/10 pt-10 md:pt-14">
            <BlogExplorer posts={rest.map(toExplorerPost)} />
          </section>
        ) : featured ? (
          <section className="border-t border-ink/10 pt-10 text-sm text-ink/50">
            <p className="font-semibold text-ink">More notes are on the way.</p>
            <p className="mt-1">
              Subscribe below and we&apos;ll send the next one.
            </p>
          </section>
        ) : (
          <section className="border-t border-ink/10 pt-10 text-sm text-ink/50">
            <p className="font-semibold text-ink">No articles yet.</p>
            <p className="mt-1">Check back soon.</p>
          </section>
        )}

        <section className="mt-16 md:mt-24 border-t border-ink/10 pt-10 md:pt-14">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="label text-brand-600">Subscribe</p>
              <h2 className="disp font-semibold text-3xl md:text-5xl leading-[.95] tracking-[-.03em] mt-4">
                Get the next note.
              </h2>
              <p className="mt-4 max-w-lg text-sm md:text-base text-ink/55 leading-relaxed">
                Occasional updates on what we are building, learning and
                shipping. No noise.
              </p>
            </div>
            <div className="lg:col-span-5">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const FeaturedPost = ({ post }: { post: Post }) => {
  const hero = post.heroImage as Media | undefined
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-ink/10 pt-10 md:pt-14 reveal opacity-0 translate-y-[24px] transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0"
    >
      <div className="lg:col-span-7 relative aspect-video overflow-hidden rounded-xl bg-ink/[0.03]">
        {hero?.url ? (
          <PayloadImage
            media={hero}
            alt={hero.alt || post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-brand-400/15 blur-[70px]" />
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label text-brand-600">Featured</span>
          <span className="label text-ink/40">
            {categoryLabels[post.category] || post.category}
          </span>
        </div>
        <h2 className="disp font-semibold text-3xl lg:text-4xl leading-[1.08] mt-5 group-hover:text-brand-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-ink/45 mt-5">
          {post.author?.name || 'Paragon AI'} ·{' '}
          {post.publishedDate
            ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })
            : 'Recent'}
        </p>
      </div>
    </Link>
  )
}

export default BlogIndexPage
