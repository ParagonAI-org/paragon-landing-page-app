/**
 * Admin user management for the Payload admin.
 *
 *   npm run admin:status              → list admin accounts
 *   npm run admin:create -- <email>   → create (or promote) an admin account
 *   npm run admin:reset-password -- <email> <new-password>
 *
 * Uses Payload's local API, so it talks straight to the database.
 */

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: path.resolve(process.cwd(), '.env.local') })

const dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const { getPayload } = await import('payload')
  const { default: payloadConfig } = await import(
    pathToFileURL(path.resolve(dirname, '../payload.config.ts')).href
  )
  const payload = await getPayload({ config: payloadConfig })

  const [command, email, password] = process.argv.slice(2)

  const list = async () => {
    const users = await payload.find({
      collection: 'users',
      limit: 100,
      depth: 0,
    })
    if (!users.docs.length) {
      console.log('No users found.')
      return
    }
    for (const user of users.docs) {
      const u = user as unknown as { id: number; email: string }
      console.log(`#${u.id}  ${u.email}`)
    }
  }

  switch (command) {
    case 'status': {
      await list()
      break
    }
    case 'create': {
      if (!email || !password) {
        console.error('Usage: npm run admin:create -- <email> <password>')
        process.exitCode = 1
        break
      }
      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: email } },
        limit: 1,
        depth: 0,
      })
      if (existing.docs.length) {
        await payload.update({
          collection: 'users',
          id: existing.docs[0].id,
          data: { password },
        })
        console.log(`Updated existing account ${email}.`)
      } else {
        await payload.create({
          collection: 'users',
          data: { email, password },
        })
        console.log(`Created admin account ${email}.`)
      }
      break
    }
    case 'reset-password': {
      if (!email || !password) {
        console.error(
          'Usage: npm run admin:reset-password -- <email> <new-password>',
        )
        process.exitCode = 1
        break
      }
      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: email } },
        limit: 1,
        depth: 0,
      })
      if (!existing.docs.length) {
        console.error(`No account found for ${email}.`)
        process.exitCode = 1
        break
      }
      await payload.update({
        collection: 'users',
        id: existing.docs[0].id,
        data: { password },
      })
      console.log(`Password reset for ${email}.`)
      break
    }
    default: {
      console.log(
        'Usage: npm run admin:status | admin:create -- <email> <password> | admin:reset-password -- <email> <password>',
      )
      process.exitCode = 1
    }
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
