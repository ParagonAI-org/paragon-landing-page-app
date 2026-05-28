import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Conditionally join class names together.
 * Uses clsx for handling conditional classes and twMerge for resolving Tailwind CSS conflicts.
 * @param inputs - Class names or conditional class objects.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
