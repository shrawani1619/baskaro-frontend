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
    <article className="group relative w-[70%] shrink-0 snap-start cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-md sm:w-[45%] lg:w-[220px]">
      <div className="relative overflow-hidden rounded-xl bg-gray-50 p-4">
        <DiscountBadge discount={discount} />
        <div className="flex h-36 items-center justify-center">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="pt-3">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800">{name}</h3>
        <PriceDisplay price={price} originalPrice={originalPrice} />
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="w-[70%] shrink-0 snap-start rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:w-[45%] lg:w-[220px]">
      <div className="animate-pulse">
        <div className="h-36 rounded-xl bg-gray-50" />
        <div className="pt-3 space-y-2">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-4/5 rounded bg-slate-100" />
          <div className="flex items-baseline gap-2 pt-1">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-3 w-14 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

