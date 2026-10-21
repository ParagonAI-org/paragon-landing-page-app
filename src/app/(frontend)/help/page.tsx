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
    <div className="min-h-screen overflow-hidden">
      {/* Header & Hero Section */}
      <section className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-12 md:pb-16 overflow-hidden z-10">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-30 rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-brand-400 -right-[100px] md:-right-[200px] top-[10%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-brand-600 -right-[150px] md:-right-[300px] top-[25%] animate-drift-2" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 md:mb-8 inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60">
              Help Center
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl disp font-semibold leading-[1.02] tracking-[-.03em] text-ink mb-6">
              How can we{' '}
              <em className="serif-it font-normal text-brand-600">help?</em>
            </h1>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-ink/60">
              Browse guides and answers for the most common questions across
              every ParagonAI product.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="mt-16 md:mt-20 rounded-2xl border border-ink/10 bg-bone/70 p-8 md:p-12 text-center text-ink/60">
              <p className="text-lg font-semibold text-ink">No articles yet</p>
              <p className="mt-2 text-sm">
                Articles added in the Payload admin will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-12 md:mt-20 space-y-12 md:space-y-20">
              {Object.entries(grouped).map(([category, items]) => (
                <section key={category} className="w-full">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <h2 className="shrink-0 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.24em] text-brand-600">
                      {categoryLabels[category] || category}
                    </h2>
                    <span className="h-px flex-1 bg-gradient-to-r from-ink/10 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {items.map((article) => (
                      <Link
                        key={article.id}
                        href={`/help/${article.slug}`}
                        className="group relative flex flex-col rounded-2xl border border-ink/10 bg-bone/70 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-brand-400/50 hover:bg-bone hover:-translate-y-1"
                      >
                        <h3 className="disp font-semibold text-lg md:text-xl leading-tight text-ink group-hover:text-brand-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base leading-relaxed text-ink/60 line-clamp-3">
                          {article.summary}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-ink/40 group-hover:text-brand-600 transition-colors">
                          Read article
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <title>Arrow right</title>
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </section>

      {/* Footer Support CTA */}
      <section className="py-16 md:py-24 relative z-10 border-t border-ink/10">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center">
          <h2 className="text-2xl md:text-3xl disp font-semibold text-ink mb-4">
            Still need assistance?
          </h2>
          <p className="text-ink/60 mb-8 max-w-lg mx-auto">
            If you can't find the answer you're looking for, our support team is
            available to help with technical or account issues.
          </p>
          <Link href="/contact-us" className="btn btn-ghost">
            Contact Support <span className="fill" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HelpCenterPage
