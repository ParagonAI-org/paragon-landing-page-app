import Link from 'next/link'
import { getCachedFooter } from '@/lib/data'

const Footer = async () => {
  const footer = await getCachedFooter()

  const columns = footer.columns || []
  const socialLinks = footer.socialLinks || []
  const copyright = footer.copyright || `© ${new Date().getFullYear()} ParagonAI PBC. Addis Ababa, Ethiopia.`

  return (
    <footer className="relative z-10 bg-black pt-32 pb-16 px-8 border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
          {columns.map((column, index) => (
            <div key={index}>
              <h6 className="text-[13px] font-bold text-white mb-6 uppercase tracking-wider">
                {column.title}
              </h6>
              <ul className="space-y-4">
                {column.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.link || '#'}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <div className="w-2 h-2 bg-black rotate-45"></div>
            </div>
            <span className="text-xs font-bold text-gray-500 tracking-tighter">
              {copyright}
            </span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-gray-600 uppercase tracking-widest">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link || '#'}
                className="hover:text-white transition-colors"
              >
                {social.platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
