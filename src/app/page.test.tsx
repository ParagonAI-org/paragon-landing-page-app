import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest' // Import vi for mocking
import Home from '@/app/page'

test('Home page renders correctly', () => {
  render(<Home />)
  // Check for the main heading
  expect(screen.getByRole('heading', { level: 1, name: 'Hello World' }))
})
