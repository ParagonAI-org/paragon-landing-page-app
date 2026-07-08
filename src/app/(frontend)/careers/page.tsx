import Link from 'next/link'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getCachedCareers } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Career } from '@/payload-types'

export const metadata = createPageMetadata({
  title: 'Careers',
  description:
    'Join Paragon AI and help build practical AI products that improve education and opportunity across Africa.',
  path: '/careers',
})

const departmentLabels: Record<string, string> = {
  engineering: 'Engineering',
  research: 'Research',
  product: 'Product',
  design: 'Design',
  operations: 'Operations',
  'sales-marketing': 'Sales & Marketing',
  people: 'People & Culture',
}

const typeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
}

const CareersPage = async () => {
  const result = await getCachedCareers()
  const jobs = (result?.docs || []) as unknown as Career[]

  const departments = Array.from(
    new Set(jobs.map((j) => j.department).filter(Boolean) as string[]),
  )

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="relative max-w-[1100px] mx-auto px-6 pt-40 pb-24">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur">
          Careers
        </div>

        <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl">
          Build the next era of intelligence with us.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          We&apos;re a small, deeply technical team working on systems that
          matter. If autonomous agents, applied research, and shipping real
          product excite you, you&apos;ll fit right in.
        </p>

        {jobs.length === 0 ? (
          <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/60">
            <p className="text-lg font-semibold text-white">
              No open roles right now
            </p>
            <p className="mt-2 text-sm">
              We&apos;re always interested in hearing from great people. Send
              your story to{' '}
              <a
                href="mailto:careers@paragonai.com"
                className="text-white underline-offset-4 hover:underline"
              >
                careers@paragonai.com
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="mt-16 space-y-16">
            {departments.map((dept) => {
              const deptJobs = jobs.filter((j) => j.department === dept)
              return (
                <section key={dept}>
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10" />
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                      {departmentLabels[dept] || dept}
                    </h2>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
                    {deptJobs.map((job) => (
                      <li key={job.id}>
                        <Link
                          href={`/careers/${job.slug}`}
                          className="group flex flex-col gap-3 p-6 transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {job.title}
                            </h3>
                            <p className="mt-1 text-sm text-white/55 line-clamp-2">
                              {job.summary}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                              {job.location}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                              {typeLabels[job.type] || job.type}
                            </span>
                            {job.salaryRange ? (
                              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                                {job.salaryRange}
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CareersPage
