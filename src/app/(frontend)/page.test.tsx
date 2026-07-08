import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest' // Import vi for mocking
import Home from '@/app/(frontend)/page'

test('Home page renders correctly', () => {
  render(<Home />)
  // Check for the main heading
  expect(screen.getByRole('main')).toBeDefined()
})
