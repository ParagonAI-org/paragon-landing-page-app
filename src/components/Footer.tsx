'use client';

import Link from 'next/link';
import Image from 'next/image'; // Fixed: Added missing import
import { FaXTwitter, FaGithub, FaLinkedin, FaTiktok } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

const Footer = () => {
  const linkStyle = "text-sm text-[#94A3B8] hover:text-[#818CF8] transition-colors py-1";

  return (
    <footer className="py-16 md:py-24 border-t border-white/5 bg-[#02040A] relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12 lg:gap-8 mb-16 md:mb-20">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <Image 
                src="/assets/logo-white.png" 
                alt="Paragon AI Logo" 
                width={140} 
                height={32} 
                className="h-7 md:h-8 w-auto" 
              />
              <span className="text-lg font-bold text-white tracking-tight">ParagonAI</span>
            </Link>
            <p className="text-[#94A3B8] text-base max-w-xs mb-8 leading-relaxed">
              Engineering Africa's next chapter in intelligence and human-centered AI products.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FaXTwitter, label: "X", href: "#" },
                { Icon: FaLinkedin, label: "LinkedIn", href: "#" },
                { Icon: FaGithub, label: "GitHub", href: "#" },
                { Icon: FaTiktok, label: "TikTok", href: "#" }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#818CF8]/50 hover:bg-[#818CF8]/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818CF8] mb-6">Products</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/products/levelup" className={linkStyle}>LevelUP</Link>
              <a href="https://levelup.et" target="_blank" rel="noopener noreferrer" className={linkStyle}>Web App ↗</a>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818CF8] mb-6">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className={linkStyle}>About Us</Link>
              <Link href="/blog" className={linkStyle}>Research</Link>
              <Link href="/careers" className={linkStyle}>Careers</Link>
              <Link href="/contact" className={linkStyle}>Contact</Link>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818CF8] mb-6">Resources</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/help" className={linkStyle}>Help Center</Link>
              <Link href="/faq" className={linkStyle}>FAQ</Link>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818CF8] mb-6">Legal</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/legal/privacy-policy" className={linkStyle}>Privacy</Link>
              <Link href="/legal/terms-of-service" className={linkStyle}>Terms</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-mono text-[#94A3B8] text-center">
            © {new Date().getFullYear()} Paragon AI. Built for the Continent.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#94A3B8]">
            <LuMapPin size={14} className="text-[#818CF8]" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;