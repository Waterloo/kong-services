/**
 * Date and time formatting utilities using Intl standard
 */

/**
 * Formats a date as a relative time string (e.g., "2 days ago", "yesterday")
 *
 * @param date - The date to format
 * @param locale - The locale to use for formatting (defaults to 'en')
 * @returns A human-readable relative time string
 *
 * @example
 * formatRelativeTime(new Date('2024-01-01')) // "8 months ago"
 * formatRelativeTime(new Date()) // "today"
 */
export function formatRelativeTime(date: Date | string, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  // Handle edge case: future dates
  if (diffMs < 0) {
    return 'in the future'
  }

  // Use Intl.RelativeTimeFormat for proper localization
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffDays === 0) {
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return 'just now'
      }
      return rtf.format(-diffMinutes, 'minute')
    }
    return rtf.format(-diffHours, 'hour')
  }

  if (diffDays < 7) {
    return rtf.format(-diffDays, 'day')
  }

  if (diffDays < 30) {
    return rtf.format(-diffWeeks, 'week')
  }

  if (diffDays < 365) {
    return rtf.format(-diffMonths, 'month')
  }

  return rtf.format(-diffYears, 'year')
}

/**
 * Formats a date using Intl.DateTimeFormat with configurable options
 *
 * @param date - The date to format
 * @param locale - The locale to use for formatting (defaults to 'en')
 * @param options - Intl.DateTimeFormat options
 * @returns A formatted date string
 *
 * @example
 * formatDate(new Date('2024-01-15')) // "Jan 15, 2024"
 * formatDate(new Date('2024-01-15'), 'en', { dateStyle: 'full' }) // "Monday, January 15, 2024"
 */
export function formatDate(
  date: Date | string,
  locale: string = 'en',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Formats a date and time using Intl.DateTimeFormat
 *
 * @param date - The date to format
 * @param locale - The locale to use for formatting (defaults to 'en')
 * @param options - Intl.DateTimeFormat options
 * @returns A formatted date-time string
 *
 * @example
 * formatDateTime(new Date('2024-01-15T14:30:00')) // "Jan 15, 2024, 2:30 PM"
 */
export function formatDateTime(
  date: Date | string,
  locale: string = 'en',
  options: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  },
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Formats a time using Intl.DateTimeFormat
 *
 * @param date - The date to format
 * @param locale - The locale to use for formatting (defaults to 'en')
 * @param options - Intl.DateTimeFormat options
 * @returns A formatted time string
 *
 * @example
 * formatTime(new Date('2024-01-15T14:30:00')) // "2:30 PM"
 */
export function formatTime(
  date: Date | string,
  locale: string = 'en',
  options: Intl.DateTimeFormatOptions = { timeStyle: 'short' },
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Checks if a date is today
 *
 * @param date - The date to check
 * @returns True if the date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Checks if a date is yesterday
 *
 * @param date - The date to check
 * @returns True if the date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  )
}
