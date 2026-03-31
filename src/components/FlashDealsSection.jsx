import { useRef } from 'react'
import { DealProductCard } from './DealProductCard'
import { useCart } from '../context/CartContext'
import { gPhoto } from '../constants/googleImages'

import s25Front from '../assets/products/s25_titanium.jpg'
import iphone14Front from '../assets/products/iphone14_purple.jpg'

const FLASH_DEALS = [
  {
    id: 'flash-s25-5g',
    title: 'Samsung S25 5G 12GB 256GB M...',
    image: s25Front,
    discountPercent: 12,
    priceLabel: '70,999',
    originalPriceLabel: '80,999',
    cartPrice: '70,999',
  },
  {
    id: 'flash-iphone-15',
    title: 'Apple iPhone 15 128GB Black',
    image: iphone14Front,
    discountPercent: 23,
    priceLabel: '53,999',
    originalPriceLabel: '69,900',
    cartPrice: '53,999',
  },
  {
    id: 'flash-oneplus-13',
    title: 'OnePlus 13 5G 16GB',
    image: gPhoto(2),
    discountPercent: 18,
    priceLabel: '70,980',
    originalPriceLabel: '86,999',
    cartPrice: '70,980',
  },
  {
    id: 'flash-nothing-3',
    title: 'Nothing Phone (3) 12GB',
    image: gPhoto(3),
    discountPercent: 41,
    priceLabel: '49,999',
    originalPriceLabel: '84,999',
    cartPrice: '49,999',
  },
  {
    id: 'flash-oppo-x9',
    title: 'Oppo Find X9 16GB',
    image: gPhoto(4),
    discountPercent: 29,
    priceLabel: '78,499',
    originalPriceLabel: '1,09,999',
    cartPrice: '78,499',
  },
  {
    id: 'flash-z-flip-7-fe',
    title: 'Samsung Galaxy Z Flip 7 FE',
    image: gPhoto(5),
    discountPercent: 28,
    priceLabel: '79,999',
    originalPriceLabel: '1,10,999',
    cartPrice: '79,999',
  },
]

export function FlashDealsSection() {
  const { addToCart } = useCart()
  const scrollerRef = useRef(null)

  return (
    <section
      className="w-full bg-[#fde8dc] py-4 sm:py-5"
      aria-labelledby="flash-deals-heading"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <h2
            id="flash-deals-heading"
            className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg"
          >
            Hurry Up! Get Up to 40% Off
          </h2>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 [scrollbar-width:thin] [-ms-overflow-style:auto] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:hover:bg-slate-400 sm:gap-3"
        >
          {FLASH_DEALS.map((p) => (
            <DealProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              discountPercent={p.discountPercent}
              priceLabel={p.priceLabel}
              originalPriceLabel={p.originalPriceLabel}
              cartPrice={p.cartPrice}
              onAddToCart={(payload) => addToCart(payload)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
