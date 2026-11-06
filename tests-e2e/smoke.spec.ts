import { expect, test } from '@playwright/test'

/**
 * Smoke tests for the public site: every page renders, has a heading, and
 * boots without console errors. These lock in the "no broken page" state
 * that the CMS-driven pages can drift into.
 */

test.describe.configure({ mode: 'parallel' })

/** Dev-server tooling noise (HMR socket, Fast Refresh) is not an app error. */
const DEV_NOISE = [
  /webpack-hmr/i,
  /_next\/webpack/i,
  /Fast Refresh/i,
  /React DevTools/i,
  /\[HMR\]/i,
]
const isAppError = (text: string) =>
  !DEV_NOISE.some((pattern) => pattern.test(text))

const ROUTES = [
  { path: '/', heading: /we build ai products/i },
  { path: '/about', heading: /engineering africa/i },
  { path: '/blog', heading: /what we.re building/i },
  {
    path: '/blog/future-of-learning-ai-africa',
    heading: /future of learning/i,
  },
  { path: '/careers', heading: /build systems/i },
  { path: '/contact-us', heading: /let's talk/i },
  { path: '/faq', heading: /questions/i },
  { path: '/help', heading: /how can we help/i },
  { path: '/legal/privacy-policy', heading: /privacy policy/i },
  { path: '/products', heading: /software and ai products/i },
  { path: '/products/levelup', heading: /levelup/i },
]

for (const route of ROUTES) {
  test(`${route.path} renders`, async ({ page }) => {
    test.setTimeout(45_000)
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' && isAppError(message.text()))
        errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))

    const response = await page.goto(route.path, {
      waitUntil: 'domcontentloaded',
    })

    expect(response?.status(), `${route.path} should respond 200`).toBe(200)
    // Normalise the line breaks that <br> puts inside the headings.
    const heading = (await page.locator('h1').innerText()).replace(/\s+/g, ' ')
    expect(heading, `${route.path} heading`).toMatch(route.heading)
    await page.waitForTimeout(1200)
    expect(errors, `${route.path} console errors`).toEqual([])
  })
}

test('homepage boots the WebGL layers without console errors', async ({
  page,
}) => {
  test.setTimeout(60_000)
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' && isAppError(message.text()))
      errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2500)

  // Nebula backdrop + the three.js universe canvas.
  // The Three.js orb is the only WebGL canvas now (the nebula was removed).
  await expect(page.locator('canvas')).toHaveCount(1)
  expect(errors).toEqual([])
})

test('the landing page renders a single screen with its own footer', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1500)

  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#site-footer')).toBeVisible()
  await expect(page.locator('#heroStrip')).toHaveCount(0)
  // The large site footer is skipped on the landing page.
  await expect(page.locator('#contact')).toHaveCount(0)
  // "Start a project" copy was retired.
  await expect(page.locator('body')).not.toContainText(/start a project/i)

  const overflow = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  )
  expect(overflow, 'landing page should fit one screen').toBeLessThanOrEqual(2)

  // Sections between the old marquee and the footer live in src/_archive.
  for (const id of [
    'manifesto',
    'services',
    'work',
    'levelup',
    'process',
    'principles',
    'stories',
    'insights',
    'wc1',
    'wc2',
    'wc3',
    'wc4',
  ]) {
    await expect(
      page.locator(`#${id}`),
      `#${id} should be archived`,
    ).toHaveCount(0)
  }
})

test('every in-page anchor on the landing page resolves', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const missing = await page.evaluate(() => {
    const hrefs = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[href^="/#"], a[href^="#"]',
      ),
    ).map((a) => a.getAttribute('href') ?? '')
    return Array.from(new Set(hrefs)).filter((href) => {
      const hash = href.startsWith('/#') ? href.slice(1) : href
      return hash.length > 1 && !document.querySelector(hash)
    })
  })

  expect(missing, 'anchors without a matching section').toEqual([])
})

test('the one-screen landing page stays error free', async ({ page }) => {
  test.setTimeout(60_000)
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error' && isAppError(message.text()))
      errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2500)

  // The compact footer is part of the first (and only) screen.
  await expect(page.locator('#site-footer')).toBeVisible()
  expect(errors).toEqual([])
})

test('the products index links to the flagship product and uses the compact footer', async ({
  page,
}) => {
  await page.goto('/products', { waitUntil: 'domcontentloaded' })

  await expect(
    page.getByRole('link', { name: /explore levelup/i }).first(),
  ).toHaveAttribute('href', '/products/levelup')
  await expect(page.locator('#site-footer')).toBeVisible()
  await expect(page.locator('#contact')).toHaveCount(0)
})

test('the blog index links to its featured post', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' })

  await expect(page.locator('a[href^="/blog/"]').first()).toBeVisible()
  await expect(page.locator('#site-footer')).toBeVisible()
})

test('client-side navigation reveals the destination page', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page
    .locator('#nav nav')
    .getByRole('link', { name: 'Blog', exact: true })
    .click()
  await page.waitForURL('**/blog')
  await expect(page.locator('main a[href^="/blog/"]').first()).toHaveCSS(
    'opacity',
    '1',
  )
})

test('the FAQ accordions open and close', async ({ page }) => {
  await page.goto('/faq', { waitUntil: 'domcontentloaded' })

  const first = page.locator('details').first()
  await first.locator('summary').click()
  await expect(first).toHaveAttribute('open', '')
  await first.locator('summary').click()
  await expect(first).not.toHaveAttribute('open', '')
})

test('the contact form reports invalid fields', async ({ page }) => {
  await page.goto('/contact-us', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByText(/please tell us your name/i)).toBeVisible()
  await expect(page.getByText(/enter a valid email/i)).toBeVisible()
  await expect(page.getByText(/add a short subject/i)).toBeVisible()
  await expect(page.getByText(/give us a little more detail/i)).toBeVisible()
})

test('unknown routes return the 404 page', async ({ page }) => {
  test.setTimeout(30_000)
  const response = await page.goto('/this-page-does-not-exist', {
    waitUntil: 'domcontentloaded',
  })
  expect(response?.status()).toBe(404)
})
