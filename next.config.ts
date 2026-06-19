import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

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
};

export default withPayload(nextConfig);
