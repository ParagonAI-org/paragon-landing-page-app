import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const [command = 'status', email, password] = process.argv.slice(2)

const printUsage = () => {
  console.log('Usage:')
  console.log('  yarn tsx scripts/payload-admin.ts status')
  console.log('  yarn tsx scripts/payload-admin.ts create <email> <password>')
  console.log(
    '  yarn tsx scripts/payload-admin.ts reset-password <email> <password>',
  )
}

const requireCredentials = () => {
  if (!email || !password) {
    printUsage()
    throw new Error('Email and password are required for this command.')
  }
}

const main = async () => {
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  try {
    if (command === 'status') {
      const result = await payload.find({
        collection: 'users',
        depth: 0,
        limit: 50,
        overrideAccess: true,
      })

      console.log(
        JSON.stringify(
          {
            totalUsers: result.totalDocs,
            emails: result.docs.map((user) => user.email),
          },
          null,
          2,
        ),
      )
    } else if (command === 'create') {
      requireCredentials()

      const existing = await payload.find({
        collection: 'users',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (existing.totalDocs > 0) {
        throw new Error(`A user with email "${email}" already exists.`)
      }

      const created = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
        },
        depth: 0,
        overrideAccess: true,
      })

      console.log(
        JSON.stringify(
          {
            action: 'created',
            id: created.id,
            email: created.email,
          },
          null,
          2,
        ),
      )
    } else if (command === 'reset-password') {
      requireCredentials()

      const existing = await payload.find({
        collection: 'users',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        where: {
          email: {
            equals: email,
          },
        },
      })

      const user = existing.docs[0]

      if (!user) {
        throw new Error(`No user found for email "${email}".`)
      }

      const updated = await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          password,
        },
        depth: 0,
        overrideAccess: true,
      })

      console.log(
        JSON.stringify(
          {
            action: 'password-reset',
            id: updated.id,
            email: updated.email,
          },
          null,
          2,
        ),
      )
    } else {
      printUsage()
      throw new Error(`Unknown command: ${command}`)
    }
  } finally {
    await (
      payload as { db?: { destroy?: () => Promise<void> } }
    ).db?.destroy?.()
  }
}

try {
  await main()
  process.exit(0)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
