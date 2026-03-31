import React from 'react'

/**
 * @param {{
 *   image: string
 *   name: string
 *   price: string
 *   originalPrice?: string
 *   discount?: number | string
 *   className?: string
 * }} props
 */
export function ProductCard({
  image,
  name,
  price,
  originalPrice,
  discount,
  className = '',
}) {
  const hasDiscount =
    discount != null &&
    discount !== '' &&
    !(typeof discount === 'number' && Number.isNaN(discount)) &&
    !(typeof discount === 'number' && discount <= 0)

  return (
    <div
      className={[
        'relative w-44 shrink-0 snap-center rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:w-48 md:w-52 lg:w-56 xl:w-60',
        className,
      ].join(' ')}
    >
      {hasDiscount ? (
        <div className="absolute left-3 top-3 z-10 rounded-lg bg-rose-600 px-2 py-1 text-[10px] font-extrabold tracking-wide text-white shadow-sm">
          {typeof discount === 'number' ? `${discount}% OFF` : String(discount)}
        </div>
      ) : null}

      <div className="flex items-center justify-center rounded-xl bg-slate-100 p-3">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-20 w-20 object-contain mix-blend-multiply sm:h-24 sm:w-24"
        />
      </div>

      <div className="mt-3">
        <div
          title={name}
          className="line-clamp-2 min-h-[2.5rem] text-[13px] font-extrabold leading-snug text-slate-900"
        >
          {name}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-[14px] font-extrabold text-blue-700">{price}</div>
          {originalPrice ? (
            <div className="text-[12px] font-bold text-slate-400 line-through">
              {originalPrice}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton({ className = '' }) {
  return (
    <div
      className={[
        'w-44 shrink-0 snap-center rounded-xl bg-white p-4 shadow-md sm:w-48 md:w-52 lg:w-56 xl:w-60',
        className,
      ].join(' ')}
    >
      <div className="animate-pulse">
        <div className="h-6 w-20 rounded-lg bg-slate-100" />
        <div className="mt-3 flex items-center justify-center rounded-xl bg-slate-100 p-3">
          <div className="h-20 w-20 rounded-lg bg-slate-200 sm:h-24 sm:w-24" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-4/5 rounded bg-slate-100" />
          <div className="mt-2 flex items-baseline gap-2">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-3 w-14 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

