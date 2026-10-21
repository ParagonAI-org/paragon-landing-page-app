import { PRINCIPLES } from '@/lib/home-content'

export type PrincipleItem = {
  num: string
  title: string
  copy: string
  tag?: string
}

const DEFAULT_TAGS: Record<string, string> = {
  '01': 'CO-CREATION',
  '02': 'LOW-RESILIENT INFRA',
  '03': 'RIGOROUS FINISH',
  '04': 'GLOBAL BENCHMARK',
}

export default function Principles({
  sub = PRINCIPLES.sub,
  items = PRINCIPLES.items,
}: {
  sub?: string
  items?: readonly PrincipleItem[]
}) {
  return (
    <section
      id="principles"
      data-nav-dark
      className="coal-sec pb-28 md:pb-36 px-5 md:px-10 bg-transparent"
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="label text-lime mb-3 block">
              06 — HOW WE THINK
            </span>
            <h2
              className="disp font-semibold text-[clamp(2.3rem,5.5vw,5rem)] leading-[.95]"
              data-rv
            >
              How we
              <br />
              <em className="serif-it font-normal text-lime">
                {PRINCIPLES.emphasis}
              </em>
            </h2>
          </div>
          <p
            className="text-paper/40 text-sm max-w-xs leading-relaxed md:text-right"
            data-rv
          >
            {sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" id="prinGrid">
          {items.map((item) => (
            <div
              key={item.num}
              className="bento-card p-8 bg-white/[0.03] border border-paper/10 hover:bg-paper hover:text-ink transition-all flex flex-col justify-between min-h-[300px]"
              data-rv
            >
              <span className="disp font-semibold text-4xl text-paper/20 tnum block">
                {item.num}
              </span>
              <div>
                <h3 className="disp font-semibold text-2xl mb-3">
                  {item.title}
                </h3>
                <p className="text-sm opacity-60 leading-relaxed">
                  {item.copy}
                </p>
              </div>
              <span className="label text-[10px]! opacity-40">
                {item.tag ?? DEFAULT_TAGS[item.num] ?? 'PRINCIPLE'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
