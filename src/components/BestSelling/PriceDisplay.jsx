import React from 'react'

/**
 * @param {{ price: string, originalPrice?: string }} props
 */
export function PriceDisplay({ price, originalPrice }) {
  return (
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-base font-semibold text-blue-600">{price}</span>
      {originalPrice ? (
        <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
      ) : null}
    </div>
  )
}

