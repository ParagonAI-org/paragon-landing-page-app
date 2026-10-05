import { SERVICES } from '@/lib/home-content'

export type ServiceItem = {
  index: string
  title: string
  copy: string
  image: string
  href?: string
}

export default function Services({
  services = SERVICES,
}: {
  services?: readonly ServiceItem[]
}) {
  return (
    <>
      <section
        id="services"
        data-nav-dark
        className="dark-sec pb-32 md:pb-44 px-5 md:px-10 relative section-zoom"
      >
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2
              className="disp font-semibold text-[clamp(2.6rem,7vw,6.5rem)] leading-[.95]"
              data-rv
            >
              What
              <br />
              we <em className="serif-it font-normal text-lime">do.</em>
            </h2>
            <p
              className="text-paper/40 text-sm max-w-xs leading-relaxed md:text-right"
              data-rv
            >
              From model to marketplace — end to end, so nothing gets lost
              between teams.
            </p>
          </div>

          <div id="svcList">
            {services.map((svc) => (
              <a
                key={svc.index}
                href={svc.href ?? '/#contact'}
                className="svc block"
                data-img={svc.image}
                data-cursor-text="Explore"
              >
                <div className="fill" />
                <div className="row max-w-[1500px] mx-auto">
                  <span className="idx label text-paper/30">{svc.index}</span>
                  <div>
                    <h3 className="disp font-semibold text-2xl md:text-5xl tracking-tight">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-paper/40 mt-1.5 max-w-lg">
                      {svc.copy}
                    </p>
                  </div>
                  <span className="arr w-11 h-11 md:w-14 md:h-14 rounded-full border border-paper/20 flex items-center justify-center shrink-0">
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
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating hover preview for service rows */}
      <div id="svcPreview" className="svc-preview" aria-hidden="true">
        {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
        <img src="" alt="" />
      </div>
    </>
  )
}
