import { Star } from 'lucide-react'

const TAG_STYLES = [
  'bg-amber-50 text-amber-800 ring-amber-100',
  'bg-sky-50 text-sky-800 ring-sky-100',
  'bg-rose-50 text-rose-800 ring-rose-100',
  'bg-violet-50 text-violet-800 ring-violet-100',
]

function normalizeTags(tag) {
  if (tag == null) return []
  return Array.isArray(tag) ? tag.filter(Boolean) : [tag]
}

/** Top-left pill: only for numeric / percent-style discounts */
function discountBadgeText(discount) {
  if (discount == null || discount === '') return null
  if (typeof discount === 'number' && discount > 0) return `-${discount}%`
  const s = String(discount).trim()
  if (/^-?\d+(\.\d+)?%$/.test(s)) return s.startsWith('-') ? s : `-${s}`
  return null
}

/** Red text next to prices */
function discountPriceLabel(discount) {
  if (discount == null || discount === '') return null
  if (typeof discount === 'number' && discount > 0) return `${discount}%`
  const s = String(discount).trim()
  if (/^-?\d+(\.\d+)?%$/.test(s)) return s.replace(/^-/, '')
  return null
}

/**
 * @param {{
 *   image: string
 *   title: string
 *   price: string
 *   originalPrice?: string
 *   discount?: number | string
 *   rating?: number | string
 *   tag?: string | string[]
 *   brand?: string
 *   ctaLabel?: string
 *   onCtaClick?: () => void
 *   className?: string
 * }} props
 */
export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  rating,
  tag,
  brand = 'BASKARO',
  ctaLabel = 'View Details',
  onCtaClick,
  className = '',
}) {
  const tags = normalizeTags(tag)
  const badgeDiscount = discountBadgeText(discount)
  const priceDiscountPct = discountPriceLabel(discount)
  const showOriginal =
    originalPrice &&
    originalPrice !== price &&
    String(originalPrice).trim() !== String(price).trim()

  return (
    <article
      className={`group flex w-[260px] shrink-0 flex-col rounded-2xl border border-slate-100/90 bg-white p-4 shadow-md transition-all duration-300 hover:z-10 hover:scale-[1.02] hover:shadow-xl ${className}`}
    >
      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/80 p-4 ring-1 ring-inset ring-slate-100/80">
        {badgeDiscount ? (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
            {badgeDiscount}
          </span>
        ) : null}
        <span className="absolute right-2 top-2 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 shadow-sm ring-1 ring-slate-200/80">
          {brand}
        </span>
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>

      <h3
        title={title}
        className="line-clamp-2 min-h-[2.75rem] text-[15px] font-semibold leading-snug tracking-tight text-slate-900"
      >
        {title}
      </h3>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-lg font-bold text-slate-900">{price}</span>
        {showOriginal ? (
          <span className="text-sm font-medium text-slate-400 line-through">
            {originalPrice}
          </span>
        ) : null}
        {priceDiscountPct && showOriginal ? (
          <span className="text-sm font-semibold text-red-600">{priceDiscountPct}</span>
        ) : null}
      </div>

      {tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${TAG_STYLES[i % TAG_STYLES.length]}`}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {rating != null && rating !== '' ? (
        <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-slate-500">
          <Star
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            strokeWidth={0}
            aria-hidden
          />
          <span className="tabular-nums text-slate-600">{rating}</span>
        </div>
      ) : null}

      <div className="mt-auto pt-3">
        <button
          type="button"
          onClick={onCtaClick}
          className="flex w-full items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50/80 py-2.5 text-xs font-semibold text-slate-600 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-700 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  )
}
