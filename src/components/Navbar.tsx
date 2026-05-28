import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[110] flex justify-center p-6">
      {/* 
          Main Nav Container 
          - Added 'relative' here so dropdowns can span the full width of this bar
      */}
      <nav className="w-full max-w-[1200px] flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl h-[60px] relative px-6">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-2 shrink-0 cursor-pointer mr-8"
        >
          <div className="grid grid-cols-2 gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
            ))}
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            ParagonAI
          </span>
        </Link>

        {/* 
            Menu Items (Aligned to Left) 
            - 'flex-1' and 'justify-start' keeps them next to the logo
        */}
        <div className="hidden lg:flex flex-1 items-center space-x-1 h-full">
          {/* Research Dropdown */}
          <div className="group h-full flex items-center px-3">
            <button type="button" className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors cursor-pointer">
              Research
            </button>
            {/* Dropdown Container: spans full width of navbar (left-0 right-0) */}
            <div className="absolute top-[100%] left-0 right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-8 shadow-2xl grid grid-cols-3 gap-10 mx-auto max-w-[1200px]">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Explore Research
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Research Index',
                      'Research Overview',
                      'Research Residency',
                      'Safety',
                    ].map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
                      >
                        <Link href="#">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Latest Advancements
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'GPT-5.5',
                      'GPT-5.4',
                      'GPT-5.3 Instant',
                      'GPT-5.3-Codex',
                      'GPT-5.2',
                    ].map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer font-medium transition-colors"
                      >
                        <Link href="#">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Our mission is to ensure that artificial general
                    intelligence benefits all of humanity.
                  </p>
                  <Link
                    href="/safety"
                    className="text-[11px] font-bold text-white border-b border-white/30 hover:border-white pb-0.5 cursor-pointer transition-all"
                  >
                    Explore safety research
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Products Dropdown */}
          <div className="group h-full flex items-center px-3">
            <button className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors cursor-pointer">
              Products
            </button>
            <div className="absolute top-[100%] left-0 right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-8 shadow-2xl grid grid-cols-4 gap-8 mx-auto max-w-[1200px]">
                {['ChatGPT', 'Plus', 'Team', 'Enterprise'].map((cat) => (
                  <Link
                    href="#"
                    key={cat}
                    className="cursor-pointer group/item"
                  >
                    <h4 className="text-[10px] font-bold text-gray-500 group-hover/item:text-white uppercase tracking-widest mb-3 transition-colors">
                      {cat}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Advanced AI solutions for {cat.toLowerCase()} needs.
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Developers Dropdown */}
          <div className="group h-full flex items-center px-3">
            <button className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors cursor-pointer">
              Developers
            </button>
            <div className="absolute top-[100%] left-0 right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-8 shadow-2xl grid grid-cols-2 gap-10 mx-auto max-w-[1200px]">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Explore Developers
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Codex',
                      'API Platform',
                      'Agents',
                      'Open Models',
                      'Apps SDK',
                    ].map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
                      >
                        <Link href="#">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    {[
                      'Docs',
                      'Cookbook',
                      'Developer Showcase',
                      'Community',
                    ].map((item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
                      >
                        <Link href="#">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="group h-full flex items-center px-3">
            <button className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors cursor-pointer">
              Company
            </button>
            <div className="absolute top-[100%] left-0 right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-8 shadow-2xl mx-auto max-w-[1200px]">
                <ul className="grid grid-cols-5 gap-4">
                  {['About Us', 'Careers', 'Blog', 'News', 'Contact'].map(
                    (item) => (
                      <li
                        key={item}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors font-medium"
                      >
                        <Link href={item === 'About Us' ? '/about' : '#'}>
                          {item}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/foundation"
            className="px-3 text-[13px] font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1 group h-full cursor-pointer"
          >
            Foundation
            <svg
              className="w-3 h-3 opacity-40 group-hover:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </Link>
        </div>

        {/* Right Side CTAs */}
        <div className="flex items-center space-x-5 shrink-0 ml-auto">
          <Link
            href="/login"
            className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Log in
          </Link>
          <Link
            href="/try"
            className="text-[11px] font-extrabold bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-tight flex items-center gap-2 cursor-pointer"
          >
            Try ChatGPT
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
