import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'bdumpauwjdfbrgzaeywh.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bdumpauwjdfbrgzaeywh.storage.supabase.co',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
      {
        pathname: '/assets/**',
      },
      {
        pathname: '/favicon-light.ico',
      },
      {
        pathname: '/favicon-light.svg',
      },
      {
        pathname: '/favicon-light-96x96.png',
      },
      {
        pathname: '/favicon-dark.ico',
      },
      {
        pathname: '/favicon-dark.svg',
      },
      {
        pathname: '/favicon-dark-96x96.png',
      },
      {
        pathname: '/apple-touch-icon-light.png',
      },
      {
        pathname: '/apple-touch-icon-dark.png',
      },
      {
        pathname: '/web-app-manifest-light-192x192.png',
      },
      {
        pathname: '/web-app-manifest-light-512x512.png',
      },
      {
        pathname: '/web-app-manifest-dark-192x192.png',
      },
      {
        pathname: '/web-app-manifest-dark-512x512.png',
      },
    ],
  },
}

export default withPayload(nextConfig)
