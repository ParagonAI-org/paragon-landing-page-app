import Link from 'next/link'
import { getCachedFaqs } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Faq } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Find answers to frequently asked questions about Paragon AI, LevelUP, and our AI products for African education.',
  path: '/faq',
})

const categoryLabels: Record<string, string> = {
  general: 'General',
  'account-billing': 'Account & Billing',
  products: 'Products & Features',
  technical: 'Technical',
  security: 'Security & Privacy',
  support: 'Support',
}

const FAQPage = async () => {
  const result = await getCachedFaqs()
  const faqs = (result?.docs || []) as unknown as Faq[]

  // Group by category while preserving order.
  const grouped = faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    const key = faq.category || 'general'
    if (!acc[key]) acc[key] = []
    acc[key].push(faq)
    return acc
  }, {})

  const orderedKeys = Object.keys(grouped).sort((a, b) => {
    const idxA = Object.keys(categoryLabels).indexOf(a)
    const idxB = Object.keys(categoryLabels).indexOf(b)
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB)
  })

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header & Hero Section */}
      <section className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-12 md:pb-16 overflow-hidden z-10">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-30 rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-brand-400 -right-[100px] md:-right-[200px] top-[10%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-brand-600 -right-[150px] md:-right-[300px] top-[25%] animate-drift-2" />
        </div>

        <main className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="mb-6 md:mb-8 inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Frequently Asked
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl disp font-semibold leading-[1.02] tracking-[-.03em] text-ink mb-6">
            Questions,{' '}
            <em className="serif-it font-normal text-brand-600">answered.</em>
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-ink/60">
            Everything you need to know about ParagonAI. Can&apos;t find what
            you&apos;re looking for? Reach out to our support team.
          </p>

          {faqs.length === 0 ? (
            <div className="mt-16 md:mt-20 rounded-2xl border border-ink/10 bg-bone/70 p-8 md:p-12 text-center text-ink/60">
              <p className="text-lg font-semibold text-ink">No FAQs yet</p>
              <p className="mt-2 text-sm">
                Add entries in the Payload admin to populate this page.
              </p>
            </div>
          ) : (
            <div className="mt-12 md:mt-20 space-y-12 md:space-y-20">
              {orderedKeys.map((key) => (
                <section key={key} className="w-full">
                  <h2 className="text-[9px] md:text-[10px] label text-brand-600 mb-5 md:mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-brand-600" />
                    {categoryLabels[key] || key}
                  </h2>

                  <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-bone/60">
                    {grouped[key].map((faq) => (
                      <details
                        key={faq.id}
                        className="group [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 transition-colors hover:bg-paper/60">
                          <h3 className="text-base md:text-lg font-semibold leading-snug text-ink group-hover:text-brand-600 transition-colors pr-2">
                            {faq.question}
                          </h3>
                          <span className="shrink-0 rounded-full border border-ink/15 bg-paper p-1.5 md:p-2 text-ink/60 transition-all group-open:rotate-45 group-open:bg-brand-600 group-open:text-paper">
                            <svg
                              className="h-3 w-3 md:h-3.5 md:w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <title>Expand</title>
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </span>
                        </summary>
                        <div className="px-5 pb-6 md:px-6 md:pb-8 text-sm md:text-base leading-relaxed text-ink/60 break-words">
                          <RichTextLite answer={faq.answer} />
                        </div>
                      </details>
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
            Still need help?
          </h2>
          <p className="text-ink/60 mb-8 max-w-lg mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is happy to help with product, technical, or account questions.
          </p>
          <Link href="/contact-us" className="btn btn-ink" data-cursor>
            Contact Support
            <span className="fill" />
          </Link>
        </div>
      </section>
    </div>
  )
}

// Lightweight renderer for FAQ answers inside a <details>.
const RichTextLite = ({ answer }: { answer: unknown }) => {
  const nodes = extractText(answer)
  if (!nodes.length) return null
  return (
    <div className="space-y-4">
      {nodes.map((node, i) => (
        <p
          /* biome-ignore lint/suspicious/noArrayIndexKey: static extracted
          paragraphs whose order never changes, so the index is the stable key */
          key={i}
        >
          {node}
        </p>
      ))}
    </div>
  )
}

function extractText(input: unknown): string[] {
  if (!input) return []
  const root = input as { root?: { children?: unknown[] } }
  const children = root?.root?.children || []
  const lines: string[] = []

  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: string; children?: unknown[] }
    if (typeof n.text === 'string') return n.text
    if (Array.isArray(n.children)) return n.children.map(walk).join('')
    return ''
  }

  for (const child of children) {
    const line = walk(child).trim()
    if (line) lines.push(line)
  }
  return lines
}

export default FAQPage
