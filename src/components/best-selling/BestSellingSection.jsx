import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard, ProductCardSkeleton } from './ProductCard'

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function useCarouselControls(scrollerRef) {
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setCanPrev(el.scrollLeft > 2)
      setCanNext(el.scrollLeft < max - 2)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [scrollerRef])

  return { canPrev, canNext }
}

/**
 * @param {{
 *  title?: string
 *  products: Array<{
 *    id?: string
 *    image: string
 *    name: string
 *    price: string
 *    originalPrice?: string
 *    discount?: number | string
 *    href?: string
 *    onClick?: () => void
 *  }>
 *  isLoading?: boolean
 *  skeletonCount?: number
 *  className?: string
 }} props
 */
export function BestSellingSection({
  title = 'Best Selling Phones',
  products,
  isLoading = false,
  skeletonCount = 6,
  className = '',
}) {
  const scrollerRef = useRef(null)
  const { canPrev, canNext } = useCarouselControls(scrollerRef)

  const items = useMemo(() => {
    if (isLoading) return []
    return Array.isArray(products) ? products : []
  }, [products, isLoading])

  const scrollByPage = (direction) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = clamp(el.clientWidth * 0.9, 320, 920) * direction
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  const Wrapper = ({ p, children }) => {
    if (p?.href) {
      return (
        <a href={p.href} className="shrink-0" aria-label={p.name}>
          {children}
        </a>
      )
    }
    if (p?.onClick) {
      return (
        <button
          type="button"
          onClick={p.onClick}
          className="shrink-0 text-left"
          aria-label={p.name}
        >
          {children}
        </button>
      )
    }
    return <div className="shrink-0">{children}</div>
  }

  return (
    <section className={['w-full pb-8', className].join(' ')}>
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-gray-800 via-slate-800 to-slate-900 px-4 py-3 sm:px-6">
            <h2 className="text-base font-extrabold tracking-tight text-white sm:text-lg">
              {title}
            </h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label="Previous"
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm transition-all duration-300',
                  canPrev
                    ? 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                    : 'cursor-not-allowed border-white/10 bg-white/5 text-white/40',
                ].join(' ')}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label="Next"
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm transition-all duration-300',
                  canNext
                    ? 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                    : 'cursor-not-allowed border-white/10 bg-white/5 text-white/40',
                ].join(' ')}
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <div className="bg-slate-50 px-3 py-4 sm:px-5">
            <div
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {isLoading
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <ProductCardSkeleton key={`skeleton-${i}`} />
                  ))
                : items.map((p, idx) => (
                    <Wrapper key={p.id ?? `${p.name}-${idx}`} p={p}>
                      <ProductCard
                        image={p.image}
                        name={p.name}
                        price={p.price}
                        originalPrice={p.originalPrice}
                        discount={p.discount}
                      />
                    </Wrapper>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

