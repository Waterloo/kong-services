/**
 * Number formatting utilities
 */

/**
 * Formats a number using compact notation (e.g., 1.2K, 3.4M)
 *
 * @param value - The number to format
 * @param locale -  language tag (defaults to 'en')
 * @param options - Intl.NumberFormat options to override defaults
 * @returns A human-readable string
 */
export function formatCompactNumber(
  value: number | null | undefined,
  locale: string = 'en',
  options?: Intl.NumberFormatOptions,
): string {
  const safe = Number.isFinite(value as number) ? (value as number) : 0
  const fmtOptions: Intl.NumberFormatOptions = options ?? {
    notation: 'compact',
    compactDisplay: 'short',
  }
  return new Intl.NumberFormat(locale, fmtOptions).format(safe)
}
