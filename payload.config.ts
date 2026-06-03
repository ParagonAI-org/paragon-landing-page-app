import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Pages } from './src/payload/collections/Pages'
import { Posts } from './src/payload/collections/Posts'
import { Navigation } from './src/payload/globals/Navigation'
import { Footer } from './src/payload/globals/Footer'
import { Hero } from './src/payload/globals/Hero'
import { Announcements } from './src/payload/globals/Announcements'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature({}),
      UnorderedListFeature(),
      OrderedListFeature(),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'caption',
                type: 'text',
              },
            ],
          },
        },
      }),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
    ],
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Users, Media, Pages, Posts],
  globals: [Navigation, Footer, Hero, Announcements],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || 'media',
      config: {
        forcePathStyle: true, // Required for Supabase S3
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || 'https://bdumpauwjdfbrgzaeywh.storage.supabase.co/storage/v1/s3',
      },
    }),
  ],
})
