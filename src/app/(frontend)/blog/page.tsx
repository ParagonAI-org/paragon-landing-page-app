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
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-50 mix-blend-screen rounded-full -rotate-[15deg] w-[800px] h-[250px] bg-[#2563EB] -right-[200px] top-[20%] animate-drift-1" />
          <div className="absolute blur-[120px] opacity-40 mix-blend-screen rounded-full -rotate-[15deg] w-[900px] h-[300px] bg-[#4F46E5] -right-[300px] top-[40%] animate-drift-2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Header */}
          <div className="mb-16 reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0" suppressHydrationWarning>
            <h1 className="text-5xl md:text-7xl font-display leading-[1] tracking-tight mb-6 text-white">
              Insights & <span className="text-[#818CF8] italic">Research</span>
            </h1>
            <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl leading-relaxed">
              Essays, engineering deep-dives, and research papers on building the next generation of artificial intelligence for the continent.
            </p>
          </div>

          {allPosts.length > 0 && featured ? (
            <FeaturedPost post={featured} />
          ) : null}
        </div>
      </section>

      {/* Articles Grid */}
      {rest.length > 0 ? (
        <section className="py-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Filter Row (placeholder for now) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold transition-all">All</button>
                <button className="px-4 py-2 rounded-full border border-white/10 text-[#94A3B8] text-xs font-semibold hover:border-white/30 hover:text-white transition-all">Research</button>
                <button className="px-4 py-2 rounded-full border border-white/10 text-[#94A3B8] text-xs font-semibold hover:border-white/30 hover:text-white transition-all">Engineering</button>
                <button className="px-4 py-2 rounded-full border border-white/10 text-[#94A3B8] text-xs font-semibold hover:border-white/30 hover:text-white transition-all">Product</button>
                <button className="px-4 py-2 rounded-full border border-white/10 text-[#94A3B8] text-xs font-semibold hover:border-white/30 hover:text-white transition-all">Company</button>
              </div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input type="text" placeholder="Search insights..." className="bg-[#161B29] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/50 transition-all w-full md:w-64" />
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
                    className={`group block reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0`}
                    style={{ transitionDelay: `${(index % 3) * 100}ms` }}
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden bg-[#161B29] border border-white/5 mb-6 transition-all duration-500 group-hover:border-[#818CF8]/30 group-hover:-translate-y-1 relative">
                      {hero?.url ? (
                        <PayloadImage
                          media={hero}
                          alt={hero.alt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                          <svg className="w-8 h-8 text-[#94A3B8]/20 group-hover:text-[#818CF8]/40 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                            <path d="M3.6 9h16.8M3.6 15h16.8" />
                            <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#818CF8]">
                        {categoryLabels[post.category] || post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#94A3B8]/30" />
                      <span className="font-mono text-[10px] text-[#94A3B8]">
                        {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : null}
                      </span>
                    </div>
                    <h4 className="font-display text-xl text-white/90 group-hover:text-[#818CF8] transition-colors leading-snug mb-3">
                      {post.title}
                    </h4>
                  </Link>
                )
              })}
            </div>

            {/* Load More (placeholder) */}
            <div className="flex justify-center reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <button className="px-6 py-3 border border-white/10 rounded-full text-sm font-semibold text-white hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2">
                Load more articles
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      ) : allPosts.length === 0 ? (
        <section className="py-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/60">
              <p className="text-lg font-semibold text-white">No posts yet</p>
              <p className="mt-2 text-sm">
                Create posts in the Payload admin to publish here.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Newsletter CTA */}
      <section className="py-32 bg-[#02040a] border-t border-white/5 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4F46E5]/10 blur-[100px]"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-6 block reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">Subscribe</span>
          <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-6 text-white reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Get our latest research delivered.
          </h2>
          <p className="text-[#94A3B8] leading-relaxed mb-10 max-w-xl mx-auto reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Join engineers, researchers, and educators receiving our monthly updates on AI development in Africa. No spam, just signal.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo delay-300 [&.visible]:opacity-100 [&.visible]:translate-y-0" suppressHydrationWarning>
            <input type="email" placeholder="Email address" required className="flex-1 bg-[#161B29] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#818CF8]/50 focus:ring-1 focus:ring-[#818CF8]/50 transition-all" />
            <button type="submit" className="bg-white text-black px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#818CF8] hover:text-white transition-colors">
              Subscribe
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
    <Link href={`/blog/${post.slug}`} className="group block relative overflow-hidden transition-all duration-700 ease-out-expo bg-[#161B29] border border-white/5 hover:border-[#818CF8]/30 rounded-[2rem] reveal opacity-0 translate-y-[40px] transition-all duration-900 ease-out-expo delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
      <div className="grid lg:grid-cols-12 gap-0 lg:gap-8 min-h-[450px]">
        {/* Featured Image Area */}
        <div className="lg:col-span-7 relative overflow-hidden bg-gradient-to-br from-[#4F46E5]/10 via-[#161B29] to-[#0B0F1A] border-b lg:border-b-0 lg:border-r border-white/5 order-2 lg:order-1 min-h-[300px] lg:min-h-full">
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
              <div className="w-64 h-64 rounded-full bg-[#2563EB]/20 blur-[80px]"></div>
            )}
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            {/* Abstract Graphic if no image */}
            {!hero?.url && (
              <svg className="w-32 h-32 text-[#818CF8]/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
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
            <span className="px-2.5 py-1 rounded-md bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[10px] font-mono uppercase tracking-wider text-[#818CF8]">Featured</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
              {categoryLabels[post.category] || post.category}
            </span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-4 group-hover:text-[#818CF8] transition-colors leading-[1.15]">
            {post.title}
          </h2>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-[#818CF8]">P</span>
              </div>
              <div>
                <p className="text-sm text-white font-medium leading-none">
                  {post.author?.name || 'Paragon Research Team'}
                </p>
                <p className="text-[11px] font-mono text-[#94A3B8] mt-1">
                  {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : null}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:border-[#818CF8]/40 group-hover:bg-[#818CF8]/10 group-hover:text-[#818CF8] transition-all">
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
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
