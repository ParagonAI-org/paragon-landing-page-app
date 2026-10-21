import { BIG_STATS, PROCESS } from '@/lib/home-content'

export type ProcessStep = {
  num: string
  title: string
  copy: string
  image?: string
  highlight?: boolean
  phaseEyebrow?: string
  tagBadge?: string
}
export type BigStat = { value: number; suffix?: string; label: string }

const STEP_EYEBROWS: Record<string, { eyebrow: string; tag: string }> = {
  '01': {
    eyebrow: 'PHASE 01 // IMMERSION',
    tag: 'USER JOURNEYS & FIELD AUDITS',
  },
  '02': {
    eyebrow: 'PHASE 02 // VALIDATION',
    tag: 'HIGH-FIDELITY TESTING',
  },
  '03': {
    eyebrow: 'PHASE 03 // EXECUTION',
    tag: 'CI/CD & ZERO OUTSOURCING',
  },
  '04': {
    eyebrow: 'PHASE 04 // EXPANSION',
    tag: 'SLA & RUNTIME SUPPORT',
  },
}

export default function Process({
  sub = PROCESS.sub,
  steps = PROCESS.steps,
  bigStats = BIG_STATS,
}: {
  sub?: string
  steps?: readonly ProcessStep[]
  bigStats?: readonly BigStat[]
}) {
  return (
    <>
      <section
        id="process"
        data-nav-dark
        className="coal-sec py-28 md:py-40 px-5 md:px-10 relative bg-transparent"
      >
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24 text-center md:text-left">
            <div>
              <span className="label text-lime mb-3 block">
                05 — HOW WE WORK
              </span>
              <h2
                className="disp font-semibold text-[clamp(2.6rem,7vw,6.5rem)] leading-[.95]"
                data-rv
              >
                How we
                <br />
                <em className="serif-it font-normal text-lime">
                  {PROCESS.emphasis}
                </em>
              </h2>
            </div>
            <p
              className="text-paper/40 text-sm max-w-xs leading-relaxed md:text-right mx-auto md:mx-0"
              data-rv
            >
              {sub}
            </p>
          </div>

          {/* Centered, larger landscape master cards stacked */}
          <div id="procCards" className="relative max-w-[1500px] mx-auto">
            {steps.map((step, i) => {
              const meta = STEP_EYEBROWS[step.num] ?? {
                eyebrow: `PHASE ${step.num} // PROCESS`,
                tag: 'FIELD TESTED',
              }
              const isHighlight = step.highlight

              return (
                <div
                  key={step.num}
                  className={`stack-card sticky mb-10 bento-card overflow-hidden ${
                    isHighlight
                      ? 'bg-brand-600/95 border border-brand-400/30'
                      : 'bg-ink/95 border border-paper/15'
                  } min-h-[70vh] md:min-h-[80vh] flex items-stretch p-7 md:p-14`}
                  style={{ top: `${100 + i * 28}px` }}
                  data-step={i + 1}
                >
                  <div className="flex-1 flex flex-col min-w-0 pr-6 md:pr-16">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-base sm:text-lg md:text-xl text-lime font-mono font-bold tracking-[0.2em] uppercase">
                        {step.phaseEyebrow ?? meta.eyebrow}
                      </span>
                      <span
                        className={`disp text-6xl md:text-8xl font-semibold ${
                          isHighlight ? 'text-paper/20' : 'text-paper/15'
                        } tnum`}
                      >
                        {step.num}
                      </span>
                    </div>

                    <h3 className="disp font-semibold text-3xl md:text-6xl leading-[.98] text-paper">
                      {step.title}
                    </h3>

                    <p
                      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug md:leading-[1.25] max-w-2xl lg:max-w-3xl my-auto py-6 md:py-8 font-normal ${
                        isHighlight ? 'text-paper/95' : 'text-paper/85'
                      }`}
                    >
                      {step.copy}
                    </p>

                    <span
                      className={`label mt-auto text-sm! ${
                        isHighlight ? 'text-paper/40' : 'text-paper/35'
                      }`}
                    >
                      PHASE {step.num}
                    </span>
                  </div>

                  <div
                    className={`w-2/5 md:w-[42%] shrink-0 rounded-[1.6rem] overflow-hidden relative self-stretch ${
                      isHighlight
                        ? 'bg-ink border border-paper/15'
                        : 'bg-coal border border-paper/10'
                    }`}
                  >
                    {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      className={`w-full h-full object-cover ${
                        isHighlight ? 'opacity-85' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 label text-xs! sm:text-sm! text-paper/90 bg-ink/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-paper/10">
                      {step.tagBadge ?? meta.tag}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats with bento-card glass containers */}
      <section
        id="statsSec"
        data-nav-dark
        className="coal-sec pb-24 md:pb-32 px-5 md:px-10 bg-transparent"
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 pt-16 border-t border-paper/10">
          {bigStats.map((stat) => (
            <div
              key={stat.label}
              className="bento-card p-8 bg-white/[0.04] border border-paper/10 backdrop-blur-md"
              data-rv
            >
              <p className="disp font-semibold text-5xl md:text-7xl tnum text-paper">
                <span data-count={stat.value}>0</span>
                <span className="text-lime">{stat.suffix}</span>
              </p>
              <p className="label text-paper/35 mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
