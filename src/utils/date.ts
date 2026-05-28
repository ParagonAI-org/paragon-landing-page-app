/**
 * Formats a date object or string into a more readable format.
 * @param date - The date to format (Date object, string, or number).
 * @param options - Intl.DateTimeFormat options for customization.
 * @returns A formatted date string (e.g., "April 14, 2025").
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string {
  try {
    const dateObj =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date
    // Check if the date is valid
    if (Number.isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }
    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid Date'
  }
}

/**
 * Formats a date object or string into a relative time format (e.g., "2 hours ago").
 * Requires Intl.RelativeTimeFormat support (modern browsers).
 * @param date - The date to format (Date object, string, or number).
 * @param now - The reference date (defaults to current time).
 * @returns A relative time string.
 */
export function formatRelativeTime(
  date: Date | string | number,
  now: Date = new Date(),
): string {
  try {
    const dateObj =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date
    if (Number.isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const elapsed = dateObj.getTime() - now.getTime()

    const seconds = Math.round(elapsed / 1000)
    const minutes = Math.round(elapsed / (1000 * 60))
    const hours = Math.round(elapsed / (1000 * 60 * 60))
    const days = Math.round(elapsed / (1000 * 60 * 60 * 24))
    const weeks = Math.round(elapsed / (1000 * 60 * 60 * 24 * 7))
    const months = Math.round(elapsed / (1000 * 60 * 60 * 24 * 30)) // Approximation
    const years = Math.round(elapsed / (1000 * 60 * 60 * 24 * 365)) // Approximation

    if (seconds > -60) {
      return rtf.format(seconds, 'second')
    } else if (minutes > -60) {
      return rtf.format(minutes, 'minute')
    } else if (hours > -24) {
      return rtf.format(hours, 'hour')
    } else if (days > -7) {
      return rtf.format(days, 'day')
    } else if (weeks > -4) {
      return rtf.format(weeks, 'week')
    } else if (months > -12) {
      return rtf.format(months, 'month')
    } else {
      return rtf.format(years, 'year')
    }
  } catch (error) {
    console.error('Error formatting relative time:', error)
    // Fallback for environments without Intl.RelativeTimeFormat or other errors
    return formatDate(date)
  }
}
