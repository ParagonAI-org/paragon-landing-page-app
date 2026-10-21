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
  { path: '/', heading: /we build the technology/i },
  { path: '/about', heading: /engineering africa/i },
  { path: '/blog', heading: /insights/i },
  {
    path: '/blog/future-of-learning-ai-africa',
    heading: /future of learning/i,
  },
  { path: '/careers', heading: /build systems/i },
  { path: '/contact-us', heading: /let's talk/i },
  { path: '/faq', heading: /questions/i },
  { path: '/help', heading: /how can we help/i },
  { path: '/legal/privacy-policy', heading: /privacy policy/i },
  { path: '/products', heading: /socratic tutor/i },
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
  await expect(page.locator('canvas')).toHaveCount(2)
  expect(errors).toEqual([])
})

test('the voices run keeps the page error free while scrolling to the footer', async ({
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

  // Walk the run from the stories world down into the finale.
  for (const fraction of [0.86, 0.9, 0.94, 0.98, 1]) {
    await page.evaluate((f) => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo(0, max * f)
    }, fraction)
    await page.waitForTimeout(700)
  }

  await expect(page.locator('#contact')).toBeVisible()
  expect(errors).toEqual([])
})

test('unknown routes return the 404 page', async ({ page }) => {
  test.setTimeout(30_000)
  const response = await page.goto('/this-page-does-not-exist', {
    waitUntil: 'domcontentloaded',
  })
  expect(response?.status()).toBe(404)
})
