import Link from 'next/link'

const Footer = () => {
  const links = {
    Products: [
      'Paragon',
      'Paragon Code',
      'Enterprise',
      'Cowork',
      'Security',
      'Slack App',
      'Microsoft 365',
    ],
    Models: [
      'Mythos Preview',
      'Opus',
      'Sonnet',
      'Haiku',
      'Max plan',
      'Team plan',
      'Pricing',
    ],
    Solutions: [
      'AI agents',
      'Code modernization',
      'Customer support',
      'Government',
      'Healthcare',
      'Legal',
      'Small business',
    ],
    Resources: [
      'Blog',
      'Partner network',
      'Community',
      'Connectors',
      'Courses',
      'Inside Paragon',
      'Startups program',
    ],
    Company: [
      'About Us',
      'Careers',
      'Economic Futures',
      'Research',
      'News',
      'Constitution',
      'Transparency',
      'Status',
    ],
    Legal: [
      'Privacy policy',
      'Terms of service',
      'Usage policy',
      'Disclosure policy',
      'Privacy choices',
    ],
  }

  return (
    <footer className="relative z-10 bg-black pt-32 pb-16 px-8 border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h6 className="text-[13px] font-bold text-white mb-6 uppercase tracking-wider">
                {title}
              </h6>
              <ul className="space-y-4">
                {items.map((item) => {
                  let href = '#'
                  if (item === 'About Us') href = '/about'
                  if (item === 'Blog') href = '/blog'

                  return (
                    <li key={item}>
                      <Link
                        href={href}
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                })}
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
              © 2026 ParagonAI PBC. Addis Ababa, Ethiopia.
            </span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-gray-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">
              X (Twitter)
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
