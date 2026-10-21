'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export const categoryLabels: Record<string, string> = {
  insights: 'Insights',
  'product-updates': 'Product Updates',
  engineering: 'Engineering',
  research: 'Research',
  company: 'Company',
  'student-success': 'Student Success',
  safety: 'Safety',
  announcements: 'Announcements',
}

/** Slim post projection passed from the server page across the client boundary. */
export type ExplorerPost = {
  id: number
  title: string
  slug: string
  category: string
  publishedDate?: string | null
  hero: { url: string; alt: string } | null
}

const PAGE_SIZE = 6

/**
 * Client-side blog grid: category chips + title search + load-more paging.
 * Receives posts from the server page as props.
 */
const BlogExplorer = ({ posts }: { posts: ExplorerPost[] }) => {
  const [category, setCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const rootRef = useRef<HTMLDivElement>(null)

  // Categories present in the actual posts, ordered like categoryLabels.
  const categories = Object.keys(categoryLabels).filter((key) =>
    posts.some((post) => post.category === key),
  )

  const filtered = posts.filter((post) => {
    const matchesCategory = !category || post.category === category
    const matchesQuery =
      !query.trim() ||
      post.title.toLowerCase().includes(query.trim().toLowerCase())
    return matchesCategory && matchesQuery
  })

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  // Reveal-on-scroll for cards mounted after the layout-wide observer ran
  // (load-more, filter changes). Scoped to this explorer — no GSAP involved.
  // A MutationObserver picks up newly mounted .reveal nodes so this effect
  // needs no filter-state dependencies.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01 },
    )
    const observeIfHidden = (el: Element) => {
      if (
        el.classList.contains('reveal') &&
        !el.classList.contains('visible')
      ) {
        io.observe(el)
      }
    }
    root.querySelectorAll('.reveal').forEach(observeIfHidden)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeIfHidden(node)
            node.querySelectorAll('.reveal').forEach(observeIfHidden)
          }
        })
      })
    })
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef}>
      {/* Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCategory(null)
              setVisibleCount(PAGE_SIZE)
            }}
            aria-pressed={category === null}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              category === null
                ? 'bg-ink text-paper'
                : 'border border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setCategory(key)
                setVisibleCount(PAGE_SIZE)
              }}
              aria-pressed={category === key}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                category === key
                  ? 'bg-ink text-paper'
                  : 'border border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink'
              }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setVisibleCount(PAGE_SIZE)
            }}
            placeholder="Search insights..."
            aria-label="Search insights"
            className="bg-bone/70 border border-ink/10 rounded-full py-2 pl-10 pr-4 text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-brand-400/60 focus:ring-1 focus:ring-brand-400/50 transition-all w-full md:w-64"
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {visible.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0"
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-bone border border-ink/10 mb-6 transition-all duration-500 group-hover:border-brand-400/50 group-hover:-translate-y-1 relative">
                {post.hero ? (
                  <Image
                    src={post.hero.url}
                    alt={post.hero.alt}
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
                      aria-hidden="true"
                    >
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                      <path d="M3.6 9h16.8M3.6 15h16.8" />
                      <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="label text-[10px] text-brand-600">
                  {categoryLabels[post.category] || post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-ink/20" />
                <span className="label text-[10px] text-ink/50">
                  {post.publishedDate
                    ? new Date(post.publishedDate).toLocaleDateString()
                    : null}
                </span>
              </div>
              <h4 className="disp font-semibold text-xl text-ink group-hover:text-brand-600 transition-colors leading-snug mb-3">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mb-20 rounded-2xl border border-ink/10 bg-bone/70 p-12 text-center text-ink/60">
          <p className="text-lg font-semibold text-ink">No articles found</p>
          <p className="mt-2 text-sm">
            Try a different search or category filter.
          </p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center reveal opacity-0 translate-y-[40px] transition-all duration-900 [&.visible]:opacity-100 [&.visible]:translate-y-0">
          <button
            type="button"
            className="btn btn-ghost"
            aria-label="Load more articles"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load more articles
            <span className="fill" />
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogExplorer
