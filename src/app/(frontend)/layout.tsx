import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, Space_Grotesk } from 'next/font/google'
import Nebula from '@/components/home/Nebula'
import Universe from '@/components/home/Universe'
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
          <style>{`.hline>span{transform:none}.hero-img{clip-path:none}.loader{display:none}`}</style>
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} font-body antialiased bg-paper text-ink min-h-screen flex flex-col`}
      >
        {/*
          Nebula (z-0) and Universe (z-1) sit here as direct children of <body>,
          outside of any stacking-context ancestor, so their position:fixed canvases
          correctly underlay every section and the footer without being trapped inside
          <main>'s stacking context.
        */}
        <Nebula />
        <Universe />

        <SmoothScroll />
        <Cursor />

        <Navbar />

        {/*
          <main> must stay display:block — GSAP ScrollTrigger skips pin-spacer
          padding for elements pinned inside a flex parent.
          z-[2] places <main> above the fixed canvases (z-0 nebula, z-1 universe)
          in the body stacking context. isolate prevents child z-indexes from
          competing with body-level elements like the navbar.
        */}
        <main className="flex-1 relative z-[2] isolate w-full">{children}</main>

        {/*
          Footer sits after <main> in DOM order at z-[2], so it paints on top of
          <main> via DOM order. Like the design (new-design.html #contact), the
          footer itself is transparent: the fixed nebula canvas (dark-flipped as
          the footer enters view) and the Three.js orb — scrubbed into its
          monumental finale state by ScrollFx's #contact timeline — show through
          behind the content, with the radial glow layered on top. That rounded,
          see-through "3D portal" only works because the shell is NOT opaque.
          The .footer-shell CSS keeps an #0a0a0f fallback whenever the live
          WebGL backdrop can't be there (no JS, no WebGL, first paint), and it
          goes transparent the moment the nebula shader confirms it is running
          (html.nebula-live, set by <Nebula/>).
        */}
        <div className="footer-shell relative z-[2]">
          <Footer />
        </div>

        <div className="noise" aria-hidden="true" />
        <LayoutScripts />
        <Analytics />
      </body>
    </html>
  )
}
