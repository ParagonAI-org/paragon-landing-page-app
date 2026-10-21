/**
 * The Paragon AI brand mark — the interlocking "Paragon" glyph shipped as
 * the live site's logo artwork (`/assets/logo-mark-*.png`, cut from the
 * favicon set).
 *
 * Two colourways:
 *   ink   → light worlds (the nav swaps it via the `.on-dark` class)
 *   white → dark worlds
 *
 * The mark is decorative: every usage sits next to the "Paragon AI"
 * wordmark, so it is hidden from assistive tech.
 */
export default function BrandMark({
  className = '',
  tone = 'auto',
}: {
  className?: string
  /** 'auto' follows the world's theme, 'white'/'ink' pin one colourway. */
  tone?: 'auto' | 'white' | 'ink'
}) {
  const toneClass =
    tone === 'white'
      ? 'brand-mark--white'
      : tone === 'ink'
        ? 'brand-mark--ink'
        : ''
  return (
    <span
      aria-hidden="true"
      className={`brand-mark ${toneClass} ${className}`.trim()}
    />
  )
}
