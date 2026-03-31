import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, Plus } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

/**
 * Vertical deal card: discount badge, wishlist, image, title, prices, add to cart.
 *
 * @param {{
 *   id: string
 *   title: string
 *   image: string
 *   discountPercent: number
 *   priceLabel: string
 *   originalPriceLabel: string
 *   cartPrice: string
 *   onAddToCart?: (payload: { id: string; name: string; price: string; img: string }) => void
 *   className?: string
 * }} props
 */
export function DealProductCard({
  id,
  title,
  image,
  discountPercent,
  priceLabel,
  originalPriceLabel,
  cartPrice,
  onAddToCart,
  className = '',
}) {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(id)
  const [heartPop, setHeartPop] = useState(false)
  const [sparkNonce, setSparkNonce] = useState(0)
  const [sparkVisible, setSparkVisible] = useState(false)
  const [isAddingWishlist, setIsAddingWishlist] = useState(false)
  const popTimerRef = useRef(null)
  const sparkTimerRef = useRef(null)
  const sparkHideTimerRef = useRef(null)

  const SPARK_RAYS = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i * 30),
    [],
  )
  const SPARK_DOTS = useMemo(
    () => Array.from({ length: 8 }, (_, i) => i * 45 + 22.5),
    [],
  )

  useEffect(() => {
    return () => {
      if (popTimerRef.current) window.clearTimeout(popTimerRef.current)
      if (sparkTimerRef.current) window.clearTimeout(sparkTimerRef.current)
      if (sparkHideTimerRef.current) window.clearTimeout(sparkHideTimerRef.current)
    }
  }, [])

  const scheduleHeartPop = () => {
    setHeartPop(true)
    if (popTimerRef.current) window.clearTimeout(popTimerRef.current)
    popTimerRef.current = window.setTimeout(() => {
      setHeartPop(false)
      popTimerRef.current = null
    }, 520)
  }

  const toggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(id)
      setHeartPop(false)
      setIsAddingWishlist(false)
      if (sparkTimerRef.current) {
        window.clearTimeout(sparkTimerRef.current)
        sparkTimerRef.current = null
      }
      if (sparkHideTimerRef.current) {
        window.clearTimeout(sparkHideTimerRef.current)
        sparkHideTimerRef.current = null
      }
      if (popTimerRef.current) {
        window.clearTimeout(popTimerRef.current)
        popTimerRef.current = null
      }
      setSparkVisible(false)
      return
    }

    if (isAddingWishlist) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      addToWishlist({
        id,
        name: title,
        price: cartPrice,
        img: image,
      })
      scheduleHeartPop()
      return
    }

    setIsAddingWishlist(true)
    setSparkNonce((n) => n + 1)
    setSparkVisible(true)
    if (sparkHideTimerRef.current) window.clearTimeout(sparkHideTimerRef.current)
    sparkHideTimerRef.current = window.setTimeout(() => {
      setSparkVisible(false)
      sparkHideTimerRef.current = null
    }, 620)

    if (sparkTimerRef.current) window.clearTimeout(sparkTimerRef.current)
    sparkTimerRef.current = window.setTimeout(() => {
      addToWishlist({
        id,
        name: title,
        price: cartPrice,
        img: image,
      })
      scheduleHeartPop()
      setIsAddingWishlist(false)
      sparkTimerRef.current = null
    }, 300)
  }

  return (
    <article
      className={[
        'flex w-[min(100%,214px)] shrink-0 flex-col rounded-lg border border-slate-100/90 bg-white p-2.5 shadow-sm',
        className,
      ].join(' ')}
    >
      <div className="relative mb-1.5 aspect-[16/10] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-md bg-slate-50">
          <span className="absolute left-2 top-2 z-10 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {discountPercent}% off
          </span>
          <div className="flex h-full w-full items-center justify-center p-2">
            <img
              src={image}
              alt={title}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="absolute right-2 top-2 z-20 h-8 w-8">
          {sparkVisible ? (
            <span
              key={sparkNonce}
              className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
              aria-hidden
            >
              <span className="relative h-0 w-0">
                <span className="wishlist-spark-core" />
                {SPARK_RAYS.map((angle) => (
                  <span
                    key={`ray-${angle}`}
                    className="wishlist-spark-ray"
                    style={{ '--spark-angle': `${angle}deg` }}
                  />
                ))}
                {SPARK_DOTS.map((angle) => (
                  <span
                    key={`dot-${angle}`}
                    className="wishlist-spark-dot"
                    style={{ '--spark-angle': `${angle}deg` }}
                  />
                ))}
              </span>
            </span>
          ) : null}

          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            aria-busy={isAddingWishlist}
            onClick={toggleWishlist}
            className="relative z-10 flex h-full w-full items-center justify-center overflow-visible rounded-full bg-white/90 shadow-sm ring-1 ring-slate-200/80 backdrop-blur-sm transition-[box-shadow,background-color] duration-200 hover:bg-white hover:shadow-md hover:ring-red-200/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1 active:bg-red-50/90"
          >
            <span
              className={[
                'inline-flex will-change-transform',
                heartPop ? 'animate-wishlist-heart-pop' : 'transition-transform duration-200 ease-out hover:scale-110 active:scale-90',
              ].join(' ')}
              aria-hidden
            >
              <Heart
                className={[
                  'h-4 w-4 transition-colors duration-300',
                  wishlisted
                    ? 'fill-red-500 text-red-500'
                    : 'fill-transparent text-red-500',
                ].join(' ')}
                strokeWidth={wishlisted ? 0 : 2}
                aria-hidden
              />
            </span>
          </button>
        </div>
      </div>

      <h3
        title={title}
        className="line-clamp-2 min-h-[2rem] text-[12px] font-bold leading-snug text-slate-900"
      >
        {title}
      </h3>

      <p className="mt-0.5 text-[9px] font-medium text-slate-400">
        *best price starts from
      </p>

      <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1 gap-y-0">
        <span className="text-[14px] font-bold tabular-nums text-teal-600">
          ₹{priceLabel}
        </span>
        <span className="text-[11px] font-medium text-slate-400 line-through tabular-nums">
          ₹{originalPriceLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={() =>
          onAddToCart?.({
            id,
            name: title,
            price: cartPrice,
            img: image,
          })
        }
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-full border border-slate-900 py-1.5 text-[10px] font-semibold lowercase text-slate-900 transition hover:bg-slate-900 hover:text-white"
      >
        <Plus className="h-3 w-3" strokeWidth={2.5} aria-hidden />
        add to cart
      </button>
    </article>
  )
}
