import type { ServerFunctionClient } from 'payload'
import '@payloadcms/next/css'
import type React from 'react'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  const { handleServerFunctions } = await import('@payloadcms/next/layouts')
  const config = await import('@payload-config')
  const { importMap } = await import('./importMap.js')
  return handleServerFunctions({
    ...args,
    config: config.default,
    importMap,
  })
}

const Layout = async ({ children }: Args) => {
  const { RootLayout } = await import('@payloadcms/next/layouts')
  const config = await import('@payload-config')
  const { importMap } = await import('./importMap.js')

  return (
    <RootLayout
      config={config.default}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}

export default Layout
