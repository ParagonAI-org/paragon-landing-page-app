import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RichText from '@/components/RichText'
import { getCachedCareer } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Career } from '@/payload-types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const job = (await getCachedCareer(slug)) as Career | null
  if (!job) return { title: 'Role not found | ParagonAI' }
  return createPageMetadata({
    title: `${job.title} | ParagonAI Careers`,
    description: job.summary,
  })
}

const CareerDetailPage = async ({ params }: Args) => {
  const { slug } = await params
  const job = (await getCachedCareer(slug)) as Career | null
  if (!job) return notFound()

  return (
    <div className="min-h-screen">
      <main className="relative max-w-[900px] mx-auto px-6 pt-32 pb-24">
        <Link
          href="/careers"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-ink"
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
          All roles
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label text-ink/45">{job.department}</span>
            <span className="label text-ink/45">{job.location}</span>
            <span className="label text-ink/45">{job.type}</span>
          </div>

          <h1 className="disp mt-6 font-semibold text-4xl sm:text-5xl tracking-tight text-ink">
            {job.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
            {job.summary}
          </p>

          {job.applyLink ? (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ink mt-8"
            >
              Apply now
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <title>Open external link</title>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              <span className="fill" />
            </a>
          ) : (
            <a
              href={`mailto:careers@paragonai.com?subject=${encodeURIComponent(
                `Application: ${job.title}`,
              )}`}
              className="btn btn-ghost mt-8"
            >
              Apply by email <span className="fill" />
            </a>
          )}
        </header>

        <section className="mt-16 border-t border-ink/10 pt-12">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/45">
            About the role
          </h2>
          <div className="mt-6">
            <RichText
              content={job.description}
              className="prose prose-lg max-w-none prose-p:text-ink/75 prose-p:leading-relaxed prose-headings:text-ink prose-a:text-brand-600 prose-blockquote:border-brand-400"
            />
          </div>
        </section>

        {job.requirements ? (
          <section className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/45">
              What we&apos;re looking for
            </h2>
            <div className="mt-6">
              <RichText
                content={job.requirements}
                className="prose prose-lg max-w-none prose-p:text-ink/75 prose-p:leading-relaxed prose-headings:text-ink prose-a:text-brand-600 prose-blockquote:border-brand-400"
              />
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default CareerDetailPage
