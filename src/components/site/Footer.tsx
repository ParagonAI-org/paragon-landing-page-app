'use client'

import { usePathname } from 'next/navigation'
import CompactFooter from './CompactFooter'

/**
 * The landing page carries its footer inside <Hero/> so the page stays exactly
 * one screen; every other route renders the shared compact footer here.
 *
 * The previous large footer (dark CTA + link columns + giant wordmark) lives in
 * src/_archive/site/Footer.big.tsx.
 */
export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <CompactFooter />
}
