import Image from 'next/image'
import Link from 'next/link'
import { getCachedProducts } from '@/lib/data'
import type { Media, Product } from '@/payload-types'

const categoryLabels: Record<string, string> = {
  'ai-systems': 'AI Systems',
  robotics: 'Robotics',
  infrastructure: 'Infrastructure',
  research: 'Research',
  'developer-tools': 'Developer Tools',
}

const ProductsSection = async () => {
  const result = await getCachedProducts()
  const products = ((result?.docs || []) as unknown as Product[])
    .filter((p) => p.status !== 'archived')
    .sort((a, b) => {
      // featured products first, then by order
      if (Boolean(a.featured) !== Boolean(b.featured)) {
        return a.featured ? -1 : 1
      }
      return (a.order ?? 0) - (b.order ?? 0)
    })
    .slice(0, 4)

  if (products.length === 0) return null

  return (
    <section
      id="products"
      className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050505] px-6 py-24 sm:py-32"
    >
      {/* Decorative radial gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,62,209,0.10),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Section header */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
              Products
            </div>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl">
              Built for the next decade of intelligence.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              Production-grade AI products and platforms — each engineered to
              move from prototype to deployment.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-2 self-end text-sm font-semibold text-white/60 transition-colors hover:text-white sm:inline-flex"
          >
            View all
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Card grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            View all products
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
  const logo = product.logo as Media | undefined
  const cover = product.coverImage as Media | undefined
  const topFeatures = (product.features || []).slice(0, 3)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04] hover:shadow-[0_30px_80px_-20px_rgba(120,62,209,0.35)] md:grid-cols-[1.15fr_1fr]"
    >
      {/* Left: content */}
      <div className="flex flex-col justify-between p-7 sm:p-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            {logo?.url ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1.5">
                <Image
                  src={logo.url}
                  alt={logo.alt || product.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : null}
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              {categoryLabels[product.category] || product.category}
            </span>
            {product.status === 'coming-soon' && (
              <span className="ml-auto rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                Soon
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-[28px]">
            {product.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/65 sm:text-[15px]">
            {product.tagline}
          </p>

          {topFeatures.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {topFeatures.map((feature, idx) => (
                <li
                  key={`${product.id}-${idx}`}
                  className="flex items-start gap-3 text-sm leading-5 text-white/70"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                  <span>
                    <span className="font-semibold text-white">
                      {feature.title}
                    </span>
                    {feature.description ? (
                      <span className="text-white/55">
                        {' '}
                        — {feature.description}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-all group-hover:gap-3 group-hover:text-white">
          Explore product
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Right: image */}
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt || product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : logo?.url ? (
          <div className="relative h-full w-full bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={logo.url}
                alt={logo.alt || product.name}
                width={140}
                height={140}
                className="h-28 w-28 opacity-50 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center text-white/30">
              <svg
                className="h-16 w-16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductsSection
