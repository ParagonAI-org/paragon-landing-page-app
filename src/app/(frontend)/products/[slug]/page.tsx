import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PayloadImage } from '@/components/PayloadImage'
import RichText from '@/components/RichText'
import { getCachedProduct, getCachedProducts } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Media, Product } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const product = (await getCachedProduct(slug)) as Product | null
  if (!product) {
    return createPageMetadata({
      title: 'Product not found',
      path: `/products/${slug}`,
    })
  }

  return createPageMetadata({
    title: product.name,
    description: product.tagline,
    path: `/products/${slug}`,
  })
}

const ProductDetailPage = async ({ params }: Args) => {
  const { slug } = await params
  const product = (await getCachedProduct(slug)) as Product | null

  if (!product) {
    return notFound()
  }

  const logo = product.logo as Media | undefined
  const cover = product.coverImage as Media | undefined

  // Pull a small list of other products for a "more from us" rail.
  const allResult = await getCachedProducts()
  const all = (allResult?.docs || []) as unknown as Product[]
  const others = all.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <main className="relative w-full max-w-[1100px] mx-auto px-5 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        <Link
          href="/products"
          className="inline-flex items-center text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
        >
          <svg
            className="mr-2 h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <title>Back arrow</title>
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          All products
        </Link>

        {/* Header Section */}
        <header className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start gap-6 md:gap-10">
          {logo?.url ? (
            <div className="relative shrink-0 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4">
              <PayloadImage
                media={logo}
                alt={logo.alt || product.name}
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="shrink-0 h-20 w-20 md:h-24 md:w-24 rounded-2xl border border-white/10 bg-white/5" />
          )}

          <div className="flex-1 min-w-0 w-full">
            <div className="mb-3 md:mb-4 flex flex-wrap items-center gap-2 md:gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                {product.category}
              </span>
              {product.status === 'coming-soon' && (
                <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                  Coming soon
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white break-words">
              {product.name}
            </h1>
            <p className="mt-3 md:mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/65">
              {product.tagline}
            </p>

            {product.link ? (
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 md:mt-8 inline-flex items-center justify-center w-full sm:w-auto gap-2 rounded-full bg-white px-6 py-3.5 md:py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
              >
                Visit product
                <svg
                  className="h-3.5 w-3.5 md:h-3 md:w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <title>Open external link</title>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ) : null}
          </div>
        </header>

        {/* Cover Image */}
        {cover?.url ? (
          <div className="relative mt-10 md:mt-12 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5">
            <PayloadImage
              media={cover}
              alt={cover.alt || product.name}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Main Content & Sidebar */}
        <section className="mt-12 md:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] items-start">
          {/* Main Description wrapper with min-w-0 to prevent flex/grid blowout */}
          <div className="min-w-0 w-full overflow-hidden">
            <RichText
              content={product.description}
              className="prose prose-invert prose-base md:prose-lg max-w-none break-words prose-p:text-white/75 prose-p:leading-relaxed prose-headings:text-white prose-blockquote:border-white prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl md:prose-img:rounded-2xl prose-video:max-w-full prose-video:rounded-xl prose-iframe:w-full prose-iframe:aspect-video"
            />
          </div>

          {/* Highlights Sidebar */}
          {product.features && product.features.length > 0 ? (
            <aside className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6 lg:sticky lg:top-28">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                Highlights
              </h2>
              <ul className="mt-4 md:mt-5 space-y-4 md:space-y-5">
                {product.features.map((feature) => (
                  <li
                    key={feature.title}
                    className="border-t border-white/5 pt-4 md:pt-5 first:border-t-0 first:pt-0"
                  >
                    <p className="text-sm md:text-base font-bold text-white">
                      {feature.title}
                    </p>
                    {feature.description ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                        {feature.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </section>

        {/* More Products Section */}
        {others.length > 0 ? (
          <section className="mt-20 md:mt-24 border-t border-white/10 pt-12 md:pt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                More from ParagonAI
              </h2>
              <Link
                href="/products"
                className="text-xs md:text-sm font-semibold text-white/60 hover:text-white whitespace-nowrap transition-colors"
              >
                View all →
              </Link>
            </div>
            
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-base md:text-lg font-bold text-white group-hover:text-[#818CF8] transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/55 line-clamp-2">
                    {p.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default ProductDetailPage