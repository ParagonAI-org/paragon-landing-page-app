import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { defaultMetadata } from '@/lib/metadata'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LayoutScripts from '@/components/LayoutScripts'

import '@/styles/globals.css'

// 1. Optimize fonts with display: 'swap' to prevent render-blocking text
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

// 2. Extract theme colors to the official Viewport export
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#02040A' }, // Matching your dark footer/bg
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// 3. Define responsive favicons using the native Metadata API
export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: [
      { url: '/favicon-light-96x96.png', sizes: '96x96', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark-96x96.png', sizes: '96x96', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: [
      { url: '/favicon-light.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/apple-touch-icon-light.png', sizes: '180x180', media: '(prefers-color-scheme: light)' },
      { url: '/apple-touch-icon-dark.png', sizes: '180x180', media: '(prefers-color-scheme: dark)' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Moved scroll-smooth to <html> so anchor links (e.g. href="#mission") scroll beautifully
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* 
          Since standard manifests don't natively support media queries yet, 
          we keep these specific manifest links in the raw head.
        */}
        <link rel="manifest" href="/site-light.webmanifest" media="(prefers-color-scheme: light)" />
        <link rel="manifest" href="/site-dark.webmanifest" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-bg text-cream min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="paragon-theme"
        >
          {/* Ambient Canvas (Kept outside main flow to prevent layout shifts) */}
          <canvas
            id="ambientCanvas"
            className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-50"
            suppressHydrationWarning
          />

          <Navbar />
          
          {/* Flex-1 ensures children grow to push the Footer to the bottom on short pages */}
          <main className="flex-1 relative z-10 w-full flex flex-col">
            {children}
          </main>
          
          <Footer />
          <LayoutScripts />
        </ThemeProvider>
        
        <Analytics />
      </body>
    </html>
  )
}