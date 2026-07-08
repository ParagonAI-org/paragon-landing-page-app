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
        pathname: '/assets/images/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
