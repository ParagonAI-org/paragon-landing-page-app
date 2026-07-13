'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = "relative tracking-[0.02em] after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#818CF8] after:transition-[width] after:duration-400 after:ease-out-expo hover:after:w-full hover:text-white transition-colors";

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-[1000] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white/[0.03] backdrop-blur-[12px] backdrop-saturate-[1.4] border border-white/[0.08] rounded-[14px] shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] px-6 py-4 ${isScrolled ? 'top-3 w-[85%] max-w-[1000px] py-2 bg-surface/85 border-white/[0.12] shadow-[0_10px_40px_rgba(0,0,0,0.7)]' : ''}`}
      >
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/assets/logo-white.png"
              alt="Paragon AI"
              width={120}
              height={28}
              className="h-7 w-auto"
              priority
            />
            <span className="text-lg font-semibold tracking-tight text-white">ParagonAI</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm text-dim font-medium">
            <Link href="/products" className={navLinkClass}>Products</Link>
            <Link href="/blog" className={navLinkClass}>Blog</Link>
            <Link href="/about" className={navLinkClass}>Company</Link>
            <Link href="/careers" className={navLinkClass}>Careers</Link>
            <Link href="/contact-us" className={navLinkClass}>Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://levelup.et"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-white text-gray-900 hover:bg-gray-100 transition-all"
            >
              Try LevelUP
            </a>
            <button
              className="lg:hidden p-2 text-ink"
              id="mobileMenuBtn"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`fixed inset-0 z-[99] transition-transform duration-500 ease-out-expo bg-bg ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-12">
          <button
            id="mobileMenuClose"
            className="absolute top-6 right-6 p-2 text-ink"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <nav className="flex flex-col gap-6">
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link font-display text-4xl text-ink hover:text-[#818CF8] transition-colors">Products</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link font-display text-4xl text-ink hover:text-[#818CF8] transition-colors">Blog</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link font-display text-4xl text-ink hover:text-[#818CF8] transition-colors">Company</Link>
            <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link font-display text-4xl text-ink hover:text-[#818CF8] transition-colors">Careers</Link>
            <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="mobile-nav-link font-display text-4xl text-ink hover:text-[#818CF8] transition-colors">Contact</Link>
          </nav>
          <div className="mt-auto">
            <a href="https://levelup.et" target="_blank" rel="noopener noreferrer" className="bg-[#818CF8] text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-400 ease-out-expo hover:bg-[#7C3AED] hover:-translate-y-[2px] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] inline-flex px-8 py-4 rounded-full text-base font-semibold">
              Try LevelUP
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
