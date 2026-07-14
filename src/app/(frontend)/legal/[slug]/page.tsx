import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { getCachedLegalPage } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { LegalPage } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

// Helper to generate a URL-safe anchor from a title
function generateAnchor(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  const page = (await getCachedLegalPage(slug)) as LegalPage | null
  if (!page) {
    return createPageMetadata({
      title: 'Not found',
      path: `/legal/${slug}`,
    })
  }

  return createPageMetadata({
    title: page.title,
    description:
      page.summary ||
      `Read the ${page.title} for Paragon AI products and services.`,
    path: `/legal/${slug}`,
  })
}

const LegalPageView = async ({ params }: Args) => {
  const { slug } = await params
  const page = (await getCachedLegalPage(slug)) as LegalPage | null
  if (!page) return notFound()

  // Build the table of contents from the array, or auto-generate from sections
  const tocItems =
    page.tableOfContents && page.tableOfContents.length > 0
      ? page.tableOfContents
      : (page.sections || []).map((section: { title: string; anchor?: string | null }) => ({
          label: section.title,
          anchor: section.anchor || generateAnchor(section.title),
        }))

  const hasSections = page.sections && page.sections.length > 0

  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-bg">
      {/* Page Title Header */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-12 md:pb-16 overflow-hidden z-10 w-full">
        {/* Aurora Background */}
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[80px] md:blur-[120px] opacity-30 mix-blend-screen rounded-full -rotate-[15deg] w-[400px] md:w-[600px] h-[200px] md:h-[250px] bg-[#2563EB] -right-[100px] md:-right-[200px] top-[10%] animate-drift-1" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10">
          <div className="reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            {page.label && (
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 md:mb-6 block">
                {page.label}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display leading-[1.1] tracking-tight mb-4 md:mb-6 text-white">
              {page.title}
            </h1>
            {page.effectiveDate && (
              <p className="text-xs md:text-sm font-mono text-[#94A3B8]">
                Last Updated:{' '}
                {new Date(page.effectiveDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Legal Content Layout */}
      <section className="pb-20 md:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
            
            {/* Left: Sticky Table of Contents (Hidden on mobile/tablet) */}
            {tocItems.length > 0 && (
              <div className="hidden lg:block lg:col-span-4 sticky top-32 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md reveal opacity-0 transition-all duration-700 ease-out-expo delay-100 [&.visible]:opacity-100">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#818CF8] mb-6">
                  Document Index
                </h3>
                <nav className="flex flex-col gap-4">
                  {tocItems.map((item: { label?: string | null; anchor?: string | null }, index: number) => (
                    <a
                      key={item.anchor || index}
                      href={`#${item.anchor}`}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors py-1 border-l border-white/5 pl-4 hover:border-[#818CF8]"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Right: Legal Prose */}
            <div
              className={`min-w-0 w-full overflow-hidden reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out-expo delay-200 [&.visible]:opacity-100 [&.visible]:translate-y-0 ${
                tocItems.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'
              }`}
            >
              {hasSections ? (
                <div className="space-y-12 md:space-y-16">
                  {/* Intro */}
                  {page.intro && (
                    <div className="prose prose-invert prose-base md:prose-lg max-w-none">
                      <RichText
                        content={page.intro}
                        className="prose-p:text-[#94A3B8] prose-p:leading-relaxed prose-strong:text-white"
                      />
                    </div>
                  )}

                  {/* Sections */}
                  <div className="space-y-10 md:space-y-12">
                    {page.sections?.map((section: { title?: string | null; anchor?: string | null; content?: any }, index: number) => {
                      const anchor = section.anchor || generateAnchor(section.title || '')
                      return (
                        <div
                          key={anchor || index}
                          id={anchor}
                          className="scroll-mt-24 md:scroll-mt-32 border-t border-white/10 pt-8 md:pt-10 group"
                        >
                          <h2 className="font-display text-2xl md:text-3xl text-white mb-4 md:mb-6 group-hover:text-[#818CF8] transition-colors">
                            {section.title}
                          </h2>
                          {section.content && (
                            <RichText
                              content={section.content}
                              className="prose prose-invert prose-base md:prose-lg max-w-none prose-p:text-[#94A3B8] prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-li:text-[#94A3B8] prose-strong:text-white prose-a:text-[#818CF8] hover:prose-a:underline"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* Fallback to legacy structure */
                <div className="prose prose-invert prose-base md:prose-lg max-w-none">
                  {page.intro && (
                    <RichText
                      content={page.intro}
                      className="prose-p:text-white/90 prose-p:mb-10"
                    />
                  )}
                  {page.content && (
                    <RichText
                      content={page.content}
                      className="prose-p:text-[#94A3B8] prose-p:leading-relaxed prose-headings:font-display prose-headings:text-white prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 md:prose-h2:mt-16 prose-h2:mb-6 prose-a:text-[#818CF8]"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LegalPageView