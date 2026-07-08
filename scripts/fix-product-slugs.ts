import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const main = async () => {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  const all = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 0,
  })

  let changed = 0
  for (const p of all.docs) {
    const fixed = p.slug.replace(/^\/+/, '')
    if (fixed !== p.slug) {
      console.log(`Fixing product id=${p.id} "${p.name}":`)
      console.log(`  slug: "${p.slug}" -> "${fixed}"`)
      await payload.update({
        collection: 'products',
        id: p.id,
        data: { slug: fixed },
        depth: 0,
        overrideAccess: true,
      })
      console.log(`  ✓ updated`)
      changed++
    } else {
      console.log(`OK product id=${p.id} "${p.name}" slug="${p.slug}"`)
    }
  }

  console.log(`\nDone. ${changed} product(s) fixed.`)
  await (payload as { db?: { destroy?: () => Promise<void> } }).db?.destroy?.()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
