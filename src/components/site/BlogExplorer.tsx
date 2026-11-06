'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const categoryLabels: Record<string, string> = {
  insights: 'Ideas',
  'product-updates': 'Product',
  engineering: 'Engineering',
  research: 'Deep dives',
  company: 'Studio',
  'student-success': 'Students',
  safety: 'Safety',
  announcements: 'News',
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
 * Client-side blog grid: category tabs + title search + load-more paging.
 * Receives posts from the server page as props.
 */
const BlogExplorer = ({ posts }: { posts: ExplorerPost[] }) => {
  const [category, setCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

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

  const pickCategory = (next: string | null) => {
    setCategory(next)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div>
      {/* Filter row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10 md:mb-14">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={() => pickCategory(null)}
            aria-pressed={category === null}
            className={`pb-1 text-xs font-semibold border-b-2 transition-colors ${
              category === null
                ? 'border-brand-600 text-ink'
                : 'border-transparent text-ink/40 hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => pickCategory(key)}
              aria-pressed={category === key}
              className={`pb-1 text-xs font-semibold border-b-2 transition-colors ${
                category === key
                  ? 'border-brand-600 text-ink'
                  : 'border-transparent text-ink/40 hover:text-ink'
              }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 pointer-events-none"
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
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full border-b border-ink/15 bg-transparent py-2 pl-7 pr-2 text-sm text-ink placeholder-ink/35 focus:outline-none focus:border-brand-600 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-16">
          {visible.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block"
              data-post-card
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-ink/[0.03] mb-5">
                {post.hero ? (
                  <Image
                    src={post.hero.url}
                    alt={post.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-brand-400/15 blur-[50px]" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="label text-[10px] text-brand-600">
                  {categoryLabels[post.category] || post.category}
                </span>
                <span className="text-[10px] text-ink/35">
                  {post.publishedDate
                    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : null}
                </span>
              </div>
              <h3 className="disp font-semibold text-lg md:text-xl text-ink group-hover:text-brand-600 transition-colors leading-snug mt-2">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mb-16 border-t border-ink/10 py-10 text-sm text-ink/50">
          <p className="font-semibold text-ink">No articles found.</p>
          <p className="mt-1">Try a different search or category.</p>
        </div>
      )}

      {hasMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-ghost"
            aria-label="Load more articles"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load more
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
      ) : null}
    </div>
  )
}

export default BlogExplorer
