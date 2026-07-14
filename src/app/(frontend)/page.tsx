import RichText from '@/components/RichText';
import { getCachedProducts, getCachedBlogPosts } from '@/lib/data';
import Link from 'next/link';
import { PayloadImage } from '@/components/PayloadImage';
import type { Media } from '@/payload-types';

// Reveal Component
const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <div
      className={`reveal opacity-0 translate-y-[60px] transition-all duration-900 ease-out-expo motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [&.visible]:opacity-100 [&.visible]:translate-y-0 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};

export default async function Home() {
  const products = await getCachedProducts();
  const posts = await getCachedBlogPosts(4);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[650px] md:min-h-[700px] max-h-[950px] h-[90vh] relative flex flex-col justify-between pt-24 md:pt-32 pb-10 md:pb-12 overflow-hidden w-full">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-50 mix-blend-screen rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-[#2563EB] -right-[100px] md:-right-[200px] top-[15%] md:top-[20%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-40 mix-blend-screen rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-[#4F46E5] -right-[150px] md:-right-[300px] top-[35%] md:top-[40%] animate-drift-2" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] md:text-[11px] uppercase tracking-widest text-white font-semibold mb-6 md:mb-8">
                <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full" />
                Building for the Continent
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight mb-6 md:mb-8 text-white">
                Building Africa's<br />
                Next Generation of<br />
                <span className="text-[#818CF8] italic">AI Products</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl text-dim max-w-xl mb-8 md:mb-10 leading-relaxed">
                Practical, human-centered systems that solve real problems across education and beyond. Our first product, <span className="text-white">LevelUP</span>, is re-engineering how students learn.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="https://levelup.et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#4F46E5] hover:text-white transition-all text-center"
                >
                  Explore LevelUP
                </a>
                <Link href="/about" className="w-full sm:w-auto px-8 py-4 border border-white/10 rounded-full font-semibold text-white hover:bg-white/5 transition-all text-center">
                  Our Mission
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Logo Marquee */}
        <div className="relative z-10 w-full mt-auto pt-10 md:pt-12 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-dim font-bold mb-6 md:mb-8 text-center opacity-50">
            Working with...
          </p>
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <div className="flex w-max animate-scroll">
              <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 opacity-40">
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian AIE</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian Ministry of Education</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">UN unipod</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">GOOGLE</span>
              </div>
              <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 opacity-40">
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian AIE</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">Ethiopian Ministry of Education</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">UN unipod</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white whitespace-nowrap">GOOGLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 md:mb-20">
            <Reveal className="lg:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 block">Products</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-ink mb-4 md:mb-6">
                Built for the next decade of intelligence.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={100}>
              <p className="text-base sm:text-lg text-dim leading-relaxed mb-6 md:mb-8">
                Production-grade AI products and platforms — each engineered to move from prototype to deployment without compromise.
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-[#818CF8] transition-colors group">
                View all products
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </Reveal>
          </div>

          {/* Products Cards */}
          {products.docs.map((product, index) => (
            <Reveal key={product.id} delay={index * 100}>
              <div className="relative overflow-hidden transition-transform duration-600 ease-out-expo bg-white/[0.02] border border-white/[0.06] backdrop-blur-[10px] hover:-translate-y-1 hover:border-[#818CF8]/30 before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(79,70,229,0.08)_0%,transparent_50%)] before:pointer-events-none rounded-2xl md:rounded-3xl mb-6 md:mb-8 last:mb-0">
                <div className="grid lg:grid-cols-2 relative z-10">
                  <div className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5 md:mb-6">
                      <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#818CF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </span>
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-dim">AI Systems</span>
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink mb-3 md:mb-4">{product.name}</h3>
                    <div className="text-base sm:text-lg text-dim leading-relaxed mb-6 md:mb-8 max-w-md">
                      {product.description && <RichText content={product.description} />}
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
                      {(product.features || []).map((feature, i) => (
                        <span key={i} className="px-3 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs font-medium text-dim">
                          {feature.title}
                        </span>
                      ))}
                    </div>
                    <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-[#818CF8] transition-colors group w-fit">
                      Explore product
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>

                  <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_60%,rgba(2,4,10,0.5)_100%)] after:pointer-events-none min-h-[320px] sm:min-h-[400px] h-full bg-gradient-to-br from-[#4F46E5]/15 via-[#2563EB]/5 to-[#818CF8]/10 rounded-b-2xl md:rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl flex items-center justify-center p-6">
                    <div className="relative w-56 h-56 sm:w-72 sm:h-72 z-10">
                      <div className="absolute inset-0 bg-surface rounded-2xl md:rounded-3xl shadow-2xl shadow-[#4F46E5]/25 border border-white/10 transform rotate-3 transition-transform duration-700 hover:rotate-0" />
                      <div className="absolute inset-3 md:inset-4 bg-surface-2/80 rounded-xl md:rounded-2xl overflow-hidden border border-white/5">
                        <div className="h-6 md:h-8 bg-surface border-b border-white/10 flex items-center px-3 gap-1.5">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/10" />
                        </div>
                        <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                          <div className="h-2.5 md:h-3 w-3/4 bg-white/5 rounded" />
                          <div className="h-2.5 md:h-3 w-1/2 bg-white/5 rounded" />

                          <div className="mt-3 md:mt-4 p-2.5 md:p-3 bg-[#4F46E5]/10 rounded-lg md:rounded-xl border border-[#4F46E5]/20">
                            <div className="h-1.5 md:h-2 w-full bg-[#818CF8]/30 rounded mb-2" />
                            <div className="h-1.5 md:h-2 w-2/3 bg-[#818CF8]/30 rounded" />
                          </div>
                          <div className="flex gap-2 mt-3 md:mt-4">
                            <div className="flex-1 h-6 md:h-8 bg-white/5 rounded-md md:rounded-lg" />
                            <div className="flex-1 h-6 md:h-8 bg-[#4F46E5]/20 rounded-md md:rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-20 md:py-32 lg:py-40 bg-surface text-cream relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          {/* Featured Insights Row */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-24">
            <Reveal className="lg:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim mb-4 md:mb-6 block">Insights</span>
              <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] tracking-tight mb-8 md:mb-10">
                <span className="italic text-dim/80">"The Future of Learning in Africa is "</span>
                <span className="text-[#818CF8] italic">Artificial Intelligence</span>
                <span className="italic text-dim/80">."</span>
              </blockquote>
              <p className="text-base sm:text-lg text-dim leading-relaxed mb-8 md:mb-10 max-w-md">
                We believe AI can bridge educational gaps at scale. Our research explores how intelligent systems can adapt to diverse learning contexts across the continent.
              </p>
              <Link href="/blog" className="inline-flex items-center gap-3 text-sm font-semibold text-cream hover:text-[#818CF8] transition-colors group">
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#818CF8] group-hover:bg-[#818CF8]/10 transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
                Read the story
              </Link>
            </Reveal>

            {posts.docs[0] && (() => {
              const heroImage = typeof posts.docs[0].heroImage === 'object' ? (posts.docs[0].heroImage as Media) : null
              return (
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={200}>
                <div className="relative overflow-hidden transition-all duration-500 ease-out-expo bg-surface-2 border border-white/5 hover:-translate-y-[6px] hover:border-[#818CF8]/30 rounded-2xl md:rounded-3xl group mt-8 lg:mt-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#4F46E5]/20 via-surface-2 to-surface relative overflow-hidden">
                    {heroImage?.url ? (
                      <PayloadImage
                        media={heroImage}
                        alt={heroImage.alt || posts.docs[0].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 rounded-full bg-[#2563EB]/20 blur-3xl" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-24 h-24 text-[#818CF8]/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a10 10 0 0 1 0 20" />
                            <path d="M2 12h20" />
                            <path d="M4.93 4.93l14.14 14.14" />
                            <path d="M19.07 4.93L4.93 19.07" />
                          </svg>
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-20">
                      <div className="flex items-center gap-3 mb-2 md:mb-3">
                        <span className="px-2 py-1 rounded bg-white/5 text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-dim">
                          {posts.docs[0].category}
                        </span>
                      </div>
                      <p className="font-display text-lg sm:text-xl text-cream/80">{posts.docs[0].title}</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 flex items-center justify-between border-t border-white/5 relative z-20 bg-surface-2">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs font-semibold text-[#818CF8]">P</span>
                      </div>
                      <span className="text-xs sm:text-sm text-dim">Paragon Research Team</span>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-dim">
                      {posts.docs[0].publishedDate ? new Date(posts.docs[0].publishedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })()}
          </div>

          {/* Secondary Articles Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {posts.docs.slice(1).map((post, index) => {
              const heroImage =
                typeof post.heroImage === 'object' && post.heroImage !== null
                  ? (post.heroImage as Media)
                  : null
              return (
                <Reveal key={post.id} delay={index * 100}>
                  <Link href={`/blog/${post.slug}`} className="group cursor-pointer block">
                    <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-surface-2 border border-white/5 mb-4 md:mb-6 transition-all duration-500 group-hover:border-[#818CF8]/30 group-hover:-translate-y-1 relative">
                      {heroImage?.url ? (
                        <PayloadImage
                          media={heroImage}
                          alt={heroImage.alt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-[#2563EB]/10 to-transparent flex items-center justify-center">
                          <svg className="w-8 h-8 text-dim/20 group-hover:text-[#818CF8]/40 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                            <path d="M3.6 9h16.8M3.6 15h16.8" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#818CF8]">{post.category}</span>
                    </div>
                    <h4 className="font-display text-base md:text-lg text-cream/90 group-hover:text-[#818CF8] transition-colors leading-snug">
                      {post.title}
                    </h4>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Latest Releases */}
      <section id="releases" className="py-20 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-16">
            <Reveal>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-3 md:mb-4 block">Updates</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-ink">Latest releases</h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-dim hover:text-[#818CF8] transition-colors group">
                View all updates
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="border-t border-white/8">
            {posts.docs.map((post, index) => (
              <Reveal key={post.id} delay={index * 100}>
                <Link href={`/blog/${post.slug}`} className="relative transition-all duration-400 ease-out-expo hover:bg-white/[0.02] md:hover:pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#4F46E5] before:scale-y-0 before:transition-transform before:duration-400 before:ease-out-expo hover:before:scale-y-100 group py-6 md:py-8 border-b border-white/8 cursor-pointer block">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 flex-1">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <span className="font-mono text-xs md:text-sm text-dim whitespace-nowrap sm:w-24">
                          {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] md:text-[11px] font-medium text-dim whitespace-nowrap">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-display text-ink group-hover:text-[#818CF8] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <div className="opacity-0 -translate-x-[10px] transition-all duration-400 ease-out-expo group-hover:opacity-100 group-hover:translate-x-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ink hidden md:flex">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 lg:py-40 bg-surface text-cream relative z-10 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-[#4F46E5]/20 blur-[80px] md:blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-[#2563EB]/15 blur-[60px] md:blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center relative z-10">
          <Reveal>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-dim mb-4 md:mb-6 block">Get Started</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6 md:mb-8">
              Ready to <span className="italic text-[#818CF8]">level up</span> your learning?
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base sm:text-lg text-dim leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
              Join thousands of students across Africa using LevelUP to prepare for their national university entrance examinations with personalized AI tutoring.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <a href="https://levelup.et" target="_blank" rel="noopener noreferrer" className="bg-[#4F46E5] text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all duration-400 ease-out-expo hover:bg-[#4338CA] hover:-translate-y-[2px] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2">
                Start learning free
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <Link href="/contact" className="px-8 py-4 border border-white/15 text-cream rounded-full text-sm font-semibold hover:bg-white/5 transition-colors text-center">
                Talk to our team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}