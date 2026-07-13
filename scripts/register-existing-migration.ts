import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const main = async () => {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  console.log('Registering existing migration 20260707_120000...')
  const db = (payload.db as any).drizzle;
  
  const result = await db.execute(sql`
    SELECT 1 FROM "payload_migrations" WHERE "name" = '20260707_120000'
  `);

  if (!result || result.rows.length === 0) {
    await db.execute(sql`
      INSERT INTO "payload_migrations" ("name", "batch")
      VALUES ('20260707_120000', 1)
    `);
    console.log('✓ Migration registered successfully!')
  } else {
    console.log('✓ Migration was already registered!')
  }

  await (payload as { db?: { destroy?: () => Promise<void> } }).db?.destroy?.()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
