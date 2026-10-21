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
        className="dark-sec pb-32 md:pb-44 px-5 md:px-10 relative bg-transparent"
      >
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="label text-lime mb-3 block">
                02 — WHAT WE DO
              </span>
              <h2
                className="disp font-semibold text-[clamp(2.6rem,7vw,6.5rem)] leading-[.95]"
                data-rv
              >
                What
                <br />
                we <em className="serif-it font-normal text-lime">do.</em>
              </h2>
            </div>
            <p
              className="text-paper/40 text-sm max-w-xs leading-relaxed md:text-right"
              data-rv
            >
              From model to marketplace — end to end, so nothing gets lost
              between teams.
            </p>
          </div>

          <div id="svcList">
            {services.map((svc, i) => (
              <a
                key={svc.index}
                href={svc.href ?? '/#contact'}
                className="svc-row flex items-center justify-between gap-6"
                data-img={svc.image}
                data-svc-index={i}
                data-cursor-text="Explore"
              >
                <div className="flex items-start md:items-center gap-6 md:gap-12">
                  <span className="label text-paper/30 font-mono text-xs">
                    {svc.index}
                  </span>
                  <div>
                    <h3 className="disp font-semibold text-2xl md:text-5xl tracking-tight text-paper">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-paper/40 mt-1 max-w-xl">
                      {svc.copy}
                    </p>
                  </div>
                </div>
                <span className="arr w-12 h-12 rounded-full border border-paper/20 flex items-center justify-center shrink-0">
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
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating hover preview for service rows (styled by #svcPreview in globals).
          The image itself is set at runtime by ScrollFx (the hovered service's
          image), so it starts without a src to avoid an empty-src request. */}
      <div id="svcPreview" aria-hidden="true">
        {/* biome-ignore lint/performance/noImgElement: art-directed design image */}
        <img alt="" />
      </div>
    </>
  )
}
