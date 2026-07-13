import Link from 'next/link'
import { getCachedCareers } from '@/lib/data'
import { createPageMetadata } from '@/lib/metadata'
import type { Career } from '@/payload-types'

export async function generateMetadata() {
  return createPageMetadata({
    title: 'Careers — Paragon AI',
    description:
      'Join Paragon AI and help build practical AI products that improve education and opportunity across Africa.',
    path: '/careers',
  })
}

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

  // Group jobs by department
  const jobsByDept: Record<string, Career[]> = {}
  jobs.forEach(job => {
    const dept = job.department || 'Other'
    if (!jobsByDept[dept]) jobsByDept[dept] = []
    jobsByDept[dept].push(job)
  })

  return (
    <>
      {/* Careers Hero */}
      <section className="relative pt-48 pb-24 overflow-hidden z-10 w-full">
        {/* Subtle Aurora Background */}
        <div className="absolute top-0 right-0 w-[70%] h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute blur-[120px] opacity-30 mix-blend-screen rounded-full -rotate-[15deg] w-[600px] h-[250px] bg-[#2563EB] -right-[100px] top-[10%] animate-drift-1"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-4xl reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0" suppressHydrationWarning>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-[#818CF8] font-bold mb-8">
              <span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full"></span>
              Open Roles
            </div>

            <h1 className="text-6xl md:text-8xl font-medium leading-[0.95] tracking-tight text-white mb-8">
              Build systems <br />
              <span className="text-[#818CF8] italic font-normal">that matter.</span>
            </h1>

            <p className="text-xl text-[#94A3B8] max-w-2xl leading-relaxed font-light mb-12">
              We are an elite team of engineers, researchers, and designers in Addis Ababa building the next decade of artificial intelligence for the African continent.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#openings" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#818CF8] hover:text-white transition-all text-center">
                View Openings
              </a>
              <a href="#culture" className="w-full sm:w-auto px-8 py-4 border border-white/10 rounded-full font-semibold text-white hover:bg-white/5 transition-all text-center">
                Our Culture
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section id="culture" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16 reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 block">How We Work</span>
            <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-white">Our engineering principles.</h2>
          </div>

          <div className="grid md:grid-cols-3 border border-white/8 divide-y md:divide-y-0 md:divide-x divide-white/8 rounded-2xl overflow-hidden reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo delay-100 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            {/* Principle 1 */}
            <div className="p-10 hover:bg-white/[0.02] transition-colors">
              <div className="text-[#818CF8] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white mb-4">Radical Ownership</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">We don't do silos. You build it, you ship it, you own it. We trust our engineers to make high-impact decisions from day one.</p>
            </div>

            {/* Principle 2 */}
            <div className="p-10 hover:bg-white/[0.02] transition-colors">
              <div className="text-[#818CF8] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white mb-4">Local Context, Global Scale</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">We build world-class AI infrastructure that fundamentally understands the constraints and nuances of our specific markets.</p>
            </div>

            {/* Principle 3 */}
            <div className="p-10 hover:bg-white/[0.02] transition-colors">
              <div className="text-[#818CF8] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white mb-4">Velocity is a Feature</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">We ship fast, learn faster, and iterate. Perfection is the enemy of progress when the goal is to revolutionize education.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      {jobs.length > 0 ? (
        <section id="openings" className="py-24 relative z-10 bg-[#0B0F1A] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#818CF8] mb-4 block">Job Board</span>
                <h2 className="font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-white">Join the team.</h2>
              </div>
            </div>

            {Object.entries(jobsByDept).map(([dept, deptJobs], index) => (
              <div key={dept} className="mb-16 reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0" style={{ transitionDelay: `${index * 100}ms` }}>
                <h3 className="font-mono text-sm tracking-widest text-[#94A3B8] uppercase border-b border-white/8 pb-4 mb-4">
                  {departmentLabels[dept] || dept}
                </h3>
                <div className="border-t border-white/8">
                  {deptJobs.map(job => (
                    <Link
                      key={job.id}
                      href={`/careers/${job.slug}`}
                      className="block relative transition-all duration-400 ease-out-expo hover:bg-white/[0.02] hover:pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#4F46E5] before:scale-y-0 before:transition-transform before:duration-400 before:ease-out-expo hover:before:scale-y-100 group py-8 border-b border-white/8 cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
                          <h4 className="text-xl lg:text-2xl font-display text-white group-hover:text-[#818CF8] transition-colors w-full md:w-1/2">
                            {job.title}
                          </h4>
                          <div className="flex gap-3 mt-2 md:mt-0">
                            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-[#94A3B8]">
                              {job.location || 'Addis Ababa'}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#4F46E5]/10 text-[#818CF8] border border-[#4F46E5]/20 text-[11px] font-mono">
                              {typeLabels[job.type] || job.type || 'Full-time'}
                            </span>
                          </div>
                        </div>
                        <div className="opacity-0 -translate-x-[10px] transition-all duration-400 ease-out-expo group-hover:opacity-100 group-hover:translate-x-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hidden md:flex">
                          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section id="openings" className="py-24 relative z-10 bg-[#0B0F1A] border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="font-display text-4xl text-white mb-6">No open roles right now</h2>
            <p className="text-lg text-[#94A3B8] mb-8">
              We're always interested in hearing from great people. Send your story and we'll keep you in mind.
            </p>
          </div>
        </section>
      )}

      {/* General Application CTA */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <h2 className="font-display text-3xl lg:text-4xl leading-[1.05] tracking-tight mb-6 reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Don't see your role?
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-xl mx-auto delay-100 reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            We're always looking for exceptional talent. If you believe you belong here, send us your resume and tell us how you can contribute.
          </p>
          <div className="delay-200 reveal opacity-0 translate-y-[20px] transition-all duration-900 ease-out-expo [&.visible]:opacity-100 [&.visible]:translate-y-0">
            <a href="mailto:careers@paragonai.com" className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-[#818CF8] hover:text-white transition-all duration-300">
              Submit General Application
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default CareersPage
