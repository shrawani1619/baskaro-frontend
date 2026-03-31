import React from 'react'

/**
 * @param {{ discount?: number | string }} props
 */
export function DiscountBadge({ discount }) {
  if (discount == null || discount === '') return null

  const label =
    typeof discount === 'number'
      ? `${discount}% OFF`
      : String(discount).includes('%')
        ? String(discount)
        : `${discount} OFF`

  return (
    <span className="absolute left-2 top-2 rounded-full bg-red-500/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
      {label}
    </span>
  )
}

