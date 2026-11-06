import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Space_Grotesk } from 'next/font/google'
import UniverseGate from '@/components/home/UniverseGate'
import LayoutScripts from '@/components/LayoutScripts'
import Cursor from '@/components/site/Cursor'
import Footer from '@/components/site/Footer'
import Navbar from '@/components/site/Navbar'
import SmoothScroll from '@/components/site/SmoothScroll'
import { defaultMetadata } from '@/lib/metadata'

import '@/styles/globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['italic'],
  axes: ['opsz'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F3EF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    // The shipped artwork is named after its colour, not the browser theme:
    // `favicon-dark.*` is the ink mark (for light chrome), `favicon-light.*`
    // is the white mark (for dark chrome).
    icon: [
      {
        url: '/favicon-dark-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-dark.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-light-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon-light.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    shortcut: [
      { url: '/favicon-dark.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-light.ico', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      {
        url: '/apple-touch-icon-dark.png',
        sizes: '180x180',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/apple-touch-icon-light.png',
        sizes: '180x180',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="manifest"
          href="/site-light.webmanifest"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="manifest"
          href="/site-dark.webmanifest"
          media="(prefers-color-scheme: dark)"
        />
        <noscript>
          {/* If JS is off, never leave choreography-hidden content invisible */}
          <style>{`.hline>span{transform:none}.reveal{opacity:1!important;transform:none!important}#hero [data-hero-rise],#nav{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} font-body antialiased bg-white text-ink min-h-screen flex flex-col`}
      >
        {/*
          The Three.js orb is the only fixed canvas left. It sits here as a
          direct child of <body>, outside any stacking-context ancestor, so its
          position:fixed canvas correctly underlays the hero without being
          trapped inside <main>'s stacking context.
        */}
        <UniverseGate />

        <SmoothScroll />
        <Cursor />

        <Navbar />

        {/*
          <main> must stay display:block — GSAP ScrollTrigger skips pin-spacer
          padding for elements pinned inside a flex parent.
          z-[2] places <main> above the fixed universe canvas (z-1) in the body
          stacking context. isolate prevents child z-indexes from competing
          with body-level elements like the navbar.
        */}
        <main className="flex-1 relative z-[2] isolate w-full">{children}</main>

        {/*
          The landing page renders its compact footer inside <Hero/> and
          <Footer/> returns null there; every other route gets the same compact
          footer after <main>.
        */}
        <Footer />

        <LayoutScripts />
        <Analytics />
      </body>
    </html>
  )
}
