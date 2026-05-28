const ContentSection = () => (
  <section className="relative z-10 bg-[#030303] border-t border-[rgba(255,255,255,0.08)] pt-32 pb-24 px-8">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 mb-32">
        {/* Primary Story */}
        <div className="group cursor-pointer">
          <div className="aspect-video bg-zinc-900 rounded-xl mb-10 overflow-hidden relative border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
            <div className="absolute inset-0 aurora-texture opacity-20"></div>
          </div>
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            Project Glasswing
          </span>
          <h2 className="text-4xl font-bold mt-4 mb-6 leading-tight group-hover:underline">
            Securing critical software for the AI era
          </h2>
          <p className="text-gray-400 text-lg mb-8 font-light">
            At ParagonAI, we build AI to serve humanity’s long-term well-being.
          </p>
          <span className="inline-block font-bold border-b-2 border-white pb-1 text-sm">
            Read the story
          </span>
        </div>

        {/* News Feed */}
        <div>
          <h3 className="text-2xl font-bold mb-10">Latest releases</h3>
          <div className="space-y-12">
            {[
              {
                title: 'Paragon Opus 4.7',
                desc: 'Introducing a smarter, more capable Opus for coding, agents, and complex vision.',
                date: 'April 16, 2026',
                cat: 'Announcements',
                link: '/blog/blog-slug',
              },
              {
                title: 'Paragon is a space to think',
                desc: 'No ads. No sponsored content. Just helpful conversations.',
                date: 'Feb 4, 2026',
                cat: 'Announcements',
                link: '/blog/blog-slug',
              },
              {
                title: 'Paragon on Mars',
                desc: 'The first AI-assisted drive on another planet. 400m traveled with NASA.',
                date: 'Jan 30, 2026',
                cat: 'Announcements',
                link: '/blog/blog-slug',
              },
            ].map((news, i) => (
              <a
                href={news.link}
                key={i}
                className="block group cursor-pointer border-b border-white/5 pb-8"
              >
                <div className="flex gap-4 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>{news.date}</span>
                  <span>•</span>
                  <span>{news.cat}</span>
                </div>
                <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors mb-2">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {news.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { t: 'Core views on AI safety', c: 'Announcements' },
          { t: 'Responsible Scaling Policy', c: 'Alignment Science' },
          { t: 'Paragon Academy: Build', c: 'Education' },
          { t: 'Economic Index 2026', c: 'Research' },
        ].map((card, i) => (
          <div
            key={i}
            className="p-10 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-white/5 transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {card.c}
            </span>
            <h5 className="text-xl font-bold leading-tight">{card.t}</h5>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ContentSection
