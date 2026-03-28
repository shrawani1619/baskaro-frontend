/**
 * Images served from Google:
 * - Sample photos: gstatic WebP gallery (Google demo assets)
 * - Brand marks: Google favicon cache (site icons by domain)
 */

const GSTATIC_WEBP = [
  'https://www.gstatic.com/webp/gallery/1.webp',
  'https://www.gstatic.com/webp/gallery/2.webp',
  'https://www.gstatic.com/webp/gallery/3.webp',
  'https://www.gstatic.com/webp/gallery/4.webp',
  'https://www.gstatic.com/webp/gallery/5.webp',
]

/** Rotates through Google's sample WebP photos (0-based index). */
export function gPhoto(i = 0) {
  const n = Number(i) || 0
  return GSTATIC_WEBP[((n % 5) + 5) % 5]
}

/** Site icon from Google's favicon cache (registrable domain, e.g. apple.com). */
export function gBrandLogo(domain) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`
}
