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
    <div className="min-h-screen text-white overflow-hidden">
      {/* Header & Hero Section */}
      <section className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-12 md:pb-16 overflow-hidden z-10">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-30 mix-blend-screen rounded-full -rotate-[15deg] w-[400px] md:w-[800px] h-[150px] md:h-[250px] bg-[#2563EB] -right-[100px] md:-right-[200px] top-[10%] animate-drift-1" />
          <div className="absolute blur-[80px] md:blur-[120px] opacity-25 mix-blend-screen rounded-full -rotate-[15deg] w-[500px] md:w-[900px] h-[200px] md:h-[300px] bg-[#4F46E5] -right-[150px] md:-right-[300px] top-[25%] animate-drift-2" />
        </div>

        <main className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="mb-6 md:mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
            Frequently Asked
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
            Questions, answered.
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#94A3B8]">
            Everything you need to know about ParagonAI. Can&apos;t find what
            you&apos;re looking for? Reach out to our support team.
          </p>

          {faqs.length === 0 ? (
            <div className="mt-16 md:mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 text-center text-white/60">
              <p className="text-lg font-semibold text-white">No FAQs yet</p>
              <p className="mt-2 text-sm">
                Add entries in the Payload admin to populate this page.
              </p>
            </div>
          ) : (
            <div className="mt-12 md:mt-20 space-y-12 md:space-y-20">
              {orderedKeys.map((key) => (
                <section key={key} className="w-full">
                  <h2 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.24em] text-[#818CF8] mb-5 md:mb-6">
                    {categoryLabels[key] || key}
                  </h2>

                  <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                    {grouped[key].map((faq) => (
                      <details
                        key={faq.id}
                        className="group [&_summary::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 transition-colors hover:bg-white/[0.02]">
                          <h3 className="text-base md:text-lg font-semibold leading-snug text-white/90 group-hover:text-white transition-colors pr-2">
                            {faq.question}
                          </h3>
                          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 p-1.5 md:p-2 text-white/60 transition-all group-open:rotate-45 group-open:bg-[#818CF8]/10 group-open:text-[#818CF8]">
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
                        <div className="px-5 pb-6 md:px-6 md:pb-8 text-sm md:text-base leading-relaxed text-[#94A3B8] break-words">
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
        <p key={i}>
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