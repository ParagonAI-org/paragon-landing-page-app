import { BIG_STATS, PROCESS } from '@/lib/home-content'

export default function Process() {
  return (
    <>
      <section
        id="process"
        data-nav-dark
        className="coal-sec py-28 md:py-40 px-5 md:px-10 rounded-t-[2.5rem] md:rounded-t-[4rem] relative overflow-hidden section-zoom"
      >
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
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
            <p
              className="text-paper/40 text-sm max-w-xs leading-relaxed md:text-right"
              data-rv
            >
              {PROCESS.sub}
            </p>
          </div>

          <div id="procCards" className="relative">
            {PROCESS.steps.map((step) => (
              <div
                key={step.num}
                className={`stack-card sticky mb-8 md:mb-12 rounded-3xl overflow-hidden border shadow-2xl ${
                  step.highlight
                    ? 'bg-brand-600/95 text-paper'
                    : 'bg-ink/95 text-paper border-paper/10'
                }`}
                data-step={step.num}
              >
                <div className="grid md:grid-cols-2 min-h-[62vh]">
                  <div className="p-9 md:p-14 flex flex-col justify-center">
                    <span
                      className={`disp text-7xl md:text-8xl font-semibold tnum mb-8 ${
                        step.highlight ? 'text-paper/20' : 'text-paper/10'
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className="disp font-semibold text-4xl md:text-6xl mb-5">
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm md:text-base leading-relaxed max-w-md ${
                        step.highlight ? 'text-paper/75' : 'text-paper/50'
                      }`}
                    >
                      {step.copy}
                    </p>
                  </div>
                  <div className="overflow-hidden hidden md:block">
                    {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
                    <img
                      src={step.image}
                      alt=""
                      loading="lazy"
                      className={`w-full h-full object-cover ${step.highlight ? 'opacity-80' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        id="statsSec"
        data-nav-dark
        className="coal-sec pb-24 md:pb-32 px-5 md:px-10 section-zoom"
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-14 border-t border-paper/10 pt-16">
          {BIG_STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left" data-rv>
              <p className="disp font-semibold text-5xl md:text-7xl tnum">
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
