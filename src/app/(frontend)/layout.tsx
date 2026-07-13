import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { defaultMetadata } from '@/lib/metadata'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LayoutScripts from '@/components/LayoutScripts'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <main className="relative flex min-h-screen flex-col scroll-smooth">
            {/* Ambient Canvas */}
            <canvas
              id="ambientCanvas"
              className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-50"
              suppressHydrationWarning
            />

            <Navbar />
            <div className="flex-1 z-10">{children}</div>
            <Footer />

            <LayoutScripts />
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
