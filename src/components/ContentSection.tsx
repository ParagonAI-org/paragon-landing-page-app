import Image from 'next/image'
import Link from 'next/link'
import {
  getCachedAnnouncements,
  getCachedFeaturedPost,
  getCachedPosts,
} from '@/lib/data'

const ContentSection = async () => {
  // Fetch latest posts with image data populated
  const postsResult = await getCachedPosts()

  // Fetch featured post with image data populated
  const featuredPostResult = await getCachedFeaturedPost()
  const featuredPost = featuredPostResult.docs[0] || postsResult.docs[0]

  // Fetch announcements
  const announcementsResult = await getCachedAnnouncements()
  const announcements = announcementsResult.items || []

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

  return (
    <section className="relative z-10 bg-[#030303] border-t border-[rgba(255,255,255,0.08)] pt-32 pb-24 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 mb-32">
          {/* Primary Story */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-zinc-900 rounded-xl mb-10 overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
                {featuredPost.heroImage &&
                  typeof featuredPost.heroImage === 'object' &&
                  'url' in featuredPost.heroImage && (
                    <Image
                      src={featuredPost.heroImage.url || ''}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
              </div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                {featuredPost.category}
              </span>
              <h2 className="text-4xl font-bold mt-4 mb-6 leading-tight group-hover:underline">
                {featuredPost.title}
              </h2>
              <span className="inline-block font-bold border-b-2 border-white pb-1 text-sm">
                Read the story
              </span>
            </Link>
          )}

          {/* News Feed */}
          <div>
            <h3 className="text-2xl font-bold mb-10">Latest releases</h3>
            <div className="space-y-12">
              {postsResult.docs.length > 0 ? (
                postsResult.docs.map((post, i) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={i}
                    className="block group cursor-pointer border-b border-white/5 pb-8"
                  >
                    <div className="flex gap-4 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {post.publishedDate && (
                        <span>
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </span>
                      )}
                      <span>•</span>
                      <span>{categoryLabels[post.category] || post.category}</span>
                    </div>
                    <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors mb-2">
                      {post.title}
                    </h4>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No posts yet. Add some in the CMS!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {announcements.map((item, i) => (
            <div
              key={i}
              className="p-10 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-white/5 transition-all cursor-pointer flex flex-col justify-between aspect-square"
            >
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {item.category}
              </span>
              <h5 className="text-xl font-bold leading-tight">{item.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContentSection
