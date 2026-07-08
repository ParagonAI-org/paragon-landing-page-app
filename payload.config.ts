import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Careers } from './src/payload/collections/Careers'
import { FAQs } from './src/payload/collections/FAQs'
import { HelpArticles } from './src/payload/collections/HelpArticles'
import { LegalPages } from './src/payload/collections/LegalPages'
import { Media } from './src/payload/collections/Media'
import { Pages } from './src/payload/collections/Pages'
import { Posts } from './src/payload/collections/Posts'
import { Products } from './src/payload/collections/Products'
import { Users } from './src/payload/collections/Users'
import { Announcements } from './src/payload/globals/Announcements'
import { Footer } from './src/payload/globals/Footer'
import { Hero } from './src/payload/globals/Hero'
import { Navigation } from './src/payload/globals/Navigation'

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
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Products,
    HelpArticles,
    FAQs,
    Careers,
    LegalPages,
  ],
  globals: [Navigation, Footer, Hero, Announcements],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
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
        endpoint:
          process.env.S3_ENDPOINT ||
          'https://bdumpauwjdfbrgzaeywh.storage.supabase.co/storage/v1/s3',
      },
    }),
  ],
})
