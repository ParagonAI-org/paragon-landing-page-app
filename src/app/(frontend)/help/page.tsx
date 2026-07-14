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
    <div className="min-h-screen text-white overflow-hidden">
      {/* Header & Hero Section */}
      <section className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-12 md:pb-16 overflow-hidden z-10">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-30 mix-blend-screen rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-[#2563EB] -right-[100px] md:-right-[200px] top-[10%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 mix-blend-screen rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-[#4F46E5] -right-[150px] md:-right-[300px] top-[25%] animate-drift-2" />
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 md:mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
              Help Center
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              How can we help?
            </h1>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#94A3B8]">
              Browse guides and answers for the most common questions across every
              ParagonAI product.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="mt-16 md:mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 text-center text-white/60">
              <p className="text-lg font-semibold text-white">No articles yet</p>
              <p className="mt-2 text-sm">
                Articles added in the Payload admin will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-12 md:mt-20 space-y-12 md:space-y-20">
              {Object.entries(grouped).map(([category, items]) => (
                <section key={category} className="w-full">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <h2 className="shrink-0 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.24em] text-[#818CF8]">
                      {categoryLabels[category] || category}
                    </h2>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {items.map((article) => (
                      <Link
                        key={article.id}
                        href={`/help/${article.slug}`}
                        className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-[#818CF8]/30 hover:bg-white/[0.05] hover:-translate-y-1"
                      >
                        <h3 className="text-lg md:text-xl font-bold leading-tight text-white group-hover:text-[#818CF8] transition-colors">
                          {article.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base leading-relaxed text-[#94A3B8] line-clamp-3">
                          {article.summary}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-white/40 group-hover:text-white transition-colors">
                          Read article
                          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
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
      <section className="py-16 md:py-24 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">
            Still need assistance?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-lg mx-auto">
            If you can't find the answer you're looking for, our support team is available to help with technical or account issues.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/15 bg-white/5 text-sm font-bold text-white hover:bg-white/10 transition-all">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HelpCenterPage