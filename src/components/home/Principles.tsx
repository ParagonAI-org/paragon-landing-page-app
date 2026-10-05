import { PRINCIPLES } from '@/lib/home-content'

export type PrincipleItem = { num: string; title: string; copy: string }

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
      className="coal-sec pb-28 md:pb-36 px-5 md:px-10 section-zoom"
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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
          <p
            className="text-paper/40 text-sm max-w-xs leading-relaxed md:text-right"
            data-rv
          >
            {sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" id="prinGrid">
          {items.map((item) => (
            <div key={item.num} className="pcard" data-rv>
              <div className="flex items-start justify-between mb-10">
                <span className="pnum disp font-semibold text-4xl text-paper/15 tnum">
                  {item.num}
                </span>
                <span className="parrow w-10 h-10 rounded-full border border-paper/25 flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
              <h3 className="disp font-semibold text-xl mb-3">{item.title}</h3>
              <p className="ptext text-sm text-paper/45 leading-relaxed">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
