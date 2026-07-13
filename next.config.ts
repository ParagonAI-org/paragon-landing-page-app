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
        pathname: '/favicon.ico',
      },
      {
        pathname: '/favicon.svg',
      },
      {
        pathname: '/favicon-96x96.png',
      },
      {
        pathname: '/apple-touch-icon.png',
      },
      {
        pathname: '/web-app-manifest-192x192.png',
      },
      {
        pathname: '/web-app-manifest-512x512.png',
      },
    ],
  },
}

export default withPayload(nextConfig)
