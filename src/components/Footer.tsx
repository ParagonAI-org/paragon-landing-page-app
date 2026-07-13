import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const footerLinkClass = "relative inline-block after:content-[''] after:absolute after:-bottom-[1px] after:left-0 after:w-0 after:h-[1px] after:bg-[#818CF8] after:transition-[width] after:duration-300 after:ease-out-expo hover:after:w-full text-sm text-dim hover:text-cream transition-colors";

  return (
    <footer className="py-20 lg:py-24 bg-bg text-cream relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <Image
                src="/assets/logo-white.png"
                alt="Paragon AI"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold tracking-tight text-white">ParagonAI</span>
            </Link>
            <p className="text-dim leading-relaxed max-w-xs mb-8">
              Building the future of AI education in Africa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-dim hover:text-cream hover:border-[#818CF8]/40 hover:bg-[#818CF8]/10 transition-all" aria-label="X (Twitter)">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-dim hover:text-cream hover:border-[#818CF8]/40 hover:bg-[#818CF8]/10 transition-all" aria-label="TikTok">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.3 0 .59.05.86.13v-3.5a6.36 6.36 0 0 0-.86-.06A6.34 6.34 0 0 0 2.65 15.6a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.02a8.17 8.17 0 0 0 4.78 1.53v-3.5c-.55 0-1.09-.09-1.6-.26z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-dim hover:text-cream hover:border-[#818CF8]/40 hover:bg-[#818CF8]/10 transition-all" aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-dim mb-6">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/products/levelup" className={footerLinkClass}>LevelUP</Link></li>
              <li><a href="https://levelup.et" target="_blank" rel="noopener noreferrer" className={footerLinkClass}>levelup.et ↗</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-dim mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className={footerLinkClass}>About</Link></li>
              <li><Link href="/blog" className={footerLinkClass}>Blog</Link></li>
              <li><Link href="/careers" className={footerLinkClass}>Careers</Link></li>
              <li><Link href="/contact" className={footerLinkClass}>Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-dim mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/help" className={footerLinkClass}>Help</Link></li>
              <li><Link href="/faq" className={footerLinkClass}>FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-dim mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/legal/privacy-policy" className={footerLinkClass}>Privacy Policy</Link></li>
              <li><Link href="/legal/terms-of-service" className={footerLinkClass}>Terms of Service</Link></li>
              <li><Link href="/legal/copyright" className={footerLinkClass}>Copyright & IP</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
