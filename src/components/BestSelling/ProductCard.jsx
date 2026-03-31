import React from 'react'
import { DiscountBadge } from './DiscountBadge'
import { PriceDisplay } from './PriceDisplay'

/**
 * @param {{
 *   image: string
 *   name: string
 *   price: string
 *   originalPrice?: string
 *   discount?: number | string
 * }} props
 */
export function ProductCard({
  image,
  name,
  price,
  originalPrice,
  discount,
}) {
  return (
    <article className="group relative w-[140px] shrink-0 snap-start cursor-pointer rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md sm:w-[190px] sm:p-5 md:w-[220px]">
      <div className="relative overflow-hidden rounded-xl bg-gray-50/50 p-2 sm:p-4">
        <DiscountBadge discount={discount} />
        <div className="flex h-28 items-center justify-center sm:h-36">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24"
          />
        </div>
      </div>

      <div className="pt-2 sm:pt-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-xs font-semibold text-gray-800 sm:text-sm">{name}</h3>
        <PriceDisplay price={price} originalPrice={originalPrice} />
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="w-[140px] shrink-0 snap-start rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:w-[190px] sm:p-5 md:w-[220px]">
      <div className="animate-pulse">
        <div className="h-28 rounded-xl bg-gray-50/50 sm:h-36" />
        <div className="pt-2 sm:pt-3 space-y-2">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-4/5 rounded bg-slate-100" />
          <div className="flex items-baseline gap-2 pt-1">
            <div className="h-4 w-12 rounded bg-slate-200" />
            <div className="h-3 w-10 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

