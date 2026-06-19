import Link from 'next/link'
import { getCachedNavigation } from '@/lib/data'

const Navbar = async () => {
  const navigation = await getCachedNavigation()

  const navItems = navigation.items || []

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] flex justify-center p-6">
      <nav className="w-full max-w-[1200px] flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl h-[64px] relative px-8">
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

        {/* Dynamic Menu Items */}
        <div className="hidden lg:flex flex-1 items-center space-x-1 h-full">
          {navItems.map((item, index) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={index}
                  href={item.link || '#'}
                  className="px-3 text-[13px] font-medium text-gray-400 hover:text-white transition-colors flex items-center h-full cursor-pointer"
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <div key={index} className="group h-full flex items-center px-3">
                <button type="button" className="text-[13px] font-medium text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                  {item.label}
                </button>
                <div className="absolute top-[100%] left-0 right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-8 shadow-2xl mx-auto max-w-[1200px]">
                    <ul className="grid grid-cols-4 gap-8">
                      {item.subItems?.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.link || '#'}
                            className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side CTAs */}
        <div className="flex items-center space-x-5 shrink-0 ml-auto">
          <Link
            href="/try"
            className="text-[11px] font-extrabold bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-tight flex items-center gap-2 cursor-pointer"
          >
            try LevelUP
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
