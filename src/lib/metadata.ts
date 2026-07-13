import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Paragon AI',
  fullName: 'Paragon AI',
  tagline: 'Building AI Products for Africa.',
  description:
    'Paragon AI is an artificial intelligence company building practical AI products for Africa. Our first product, LevelUP, helps secondary school students prepare for national exams using personalized AI tutoring, multilingual learning, and curriculum-aligned content.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://paragon.et',
  locale: 'en_US',
  twitterHandle: '@paragonai',
  location: 'Addis Ababa, Ethiopia',
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'AI',
    'artificial intelligence',
    'Africa',
    'EdTech',
    'education',
    'LevelUP',
    'national exams',
    'personalized tutoring',
    'multilingual learning',
    'curriculum aligned',
    'Ethiopia',
    'Addis Ababa',
  ],
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      // Light mode favicons
      {
        url: '/favicon-light-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-light.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-light.ico',
        rel: 'icon',
        media: '(prefers-color-scheme: light)',
      },
      // Dark mode favicons
      {
        url: '/favicon-dark-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon-dark.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon-dark.ico',
        rel: 'icon',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/apple-touch-icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  manifest: '/site-light.webmanifest',
}

type PageMetadataOptions = {
  title: string
  description?: string
  path?: string
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const pageUrl = path ? `${siteConfig.url}${path}` : siteConfig.url
  const pageTitle = title

  return {
    title: pageTitle,
    description: description || siteConfig.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      url: pageUrl,
      title: pageTitle,
      description: description || siteConfig.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: description || siteConfig.description,
    },
    alternates: {
      canonical: path || '/',
    },
  }
}
