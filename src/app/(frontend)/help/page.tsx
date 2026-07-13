import Link from 'next/link'

import { getCachedHelpArticles } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { HelpArticle } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'Help Center',
  description:
    'Guides, documentation, and answers for Paragon AI products including LevelUP and our AI learning tools.',
  path: '/help',
})

const categoryLabels: Record<string, string> = {
  'getting-started': 'Getting Started',
  account: 'Account & Profile',
  billing: 'Billing & Plans',
  technical: 'Technical Support',
  security: 'Security',
  integrations: 'Integrations',
  troubleshooting: 'Troubleshooting',
}

const HelpCenterPage = async () => {
  const result = await getCachedHelpArticles()
  const articles = (result?.docs || []) as unknown as HelpArticle[]

  // Group articles by category for sectioned rendering.
  const grouped = articles.reduce<Record<string, HelpArticle[]>>(
    (acc, article) => {
      const key = article.category || 'other'
      if (!acc[key]) acc[key] = []
      acc[key].push(article)
      return acc
    },
    {},
  )

  return (
    <div className="min-h-screen text-white">
      <main className="relative max-w-[1100px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
          Help Center
        </div>

        <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
          How can we help?
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
          Browse guides and answers for the most common questions across every
          ParagonAI product.
        </p>

        {articles.length === 0 ? (
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/60">
            <p className="text-lg font-semibold text-white">No articles yet</p>
            <p className="mt-2 text-sm">
              Articles added in the Payload admin will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-16 space-y-16">
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category}>
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                    {categoryLabels[category] || category}
                  </h2>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {items.map((article) => (
                    <Link
                      key={article.id}
                      href={`/help/${article.slug}`}
                      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <h3 className="text-lg font-bold leading-snug text-white group-hover:text-white">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/55">
                        {article.summary}
                      </p>
                      <div className="mt-4 text-xs font-semibold text-white/40 group-hover:text-white/70">
                        Read article →
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HelpCenterPage
