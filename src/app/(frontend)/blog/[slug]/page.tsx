import { getPayload } from '@/lib/payload'
import Navbar from '@/components/Navbar'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Media } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
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

  if (!posts.docs[0]) return {}

  const post = posts.docs[0]
  return {
    title: `${post.title} | ParagonAI Blog`,
  }
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
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Header Hero Image */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        {heroImage?.url && (
          <img
            src={heroImage.url}
            alt={heroImage.alt || post.title}
            className="w-full h-full object-cover scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent"></div>
      </div>

      {/* Main Content */}
      <article className="relative max-w-[800px] mx-auto px-6 -mt-32 z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest text-gray-300">
            {post.category}
          </span>
          {post.publishedDate && (
            <span className="text-sm text-gray-500 font-medium tracking-tight">
              {new Date(post.publishedDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-white/10">
          {authorAvatar?.url && (
            <img
              src={authorAvatar.url}
              alt={authorAvatar.alt || post.author?.name}
              className="w-12 h-12 rounded-full border border-white/20"
            />
          )}
          <div>
            <p className="text-sm font-bold text-white">{post.author?.name}</p>
            {post.author?.title && (
              <p className="text-xs text-gray-500 font-medium">
                {post.author.title}
              </p>
            )}
          </div>
        </div>

        {/* Body Text */}
        <RichText 
          content={post.content} 
          className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-blockquote:border-white"
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-16 pb-16 border-b border-white/10">
          {post.tags?.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              #{item.tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
                Continue Reading
              </h2>
              <p className="text-gray-500 text-sm">
                Explore more insights from our research team.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-bold border-b border-white/20 hover:border-white transition-all pb-1 cursor-pointer">
              View all posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, idx) => {
              const relHero = post.heroImage as Media
              return (
                <Link href={`/blog/${post.slug}`} key={idx} className="group cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 border border-white/10">
                    {relHero?.url && (
                      <img
                        src={relHero.url}
                        alt={relHero.alt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                    {post.category}
                  </p>
                  <h3 className="text-lg font-bold leading-snug group-hover:text-gray-400 transition-colors">
                    {post.title}
                  </h3>
                  {post.publishedDate && (
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <footer className="border-t border-white/5 py-12 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} ParagonAI Research. All rights reserved.
      </footer>
    </div>
  )
}

export default BlogPost
