import React, { useRef, useState } from 'react'
import { Heart, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

const FLASH_DEALS = [
  {
    id: 's25-5g',
    name: 'Samsung S25 5G 12GB 256GB M...',
    price: '₹70,999',
    originalPrice: '₹80,999',
    discount: '12% off',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 'iphone-15',
    name: 'Apple iPhone 15 128GB Black',
    price: '₹53,999',
    originalPrice: '₹69,900',
    discount: '23% off',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 'oneplus-13',
    name: 'OnePlus 13 5G 16GB',
    price: '₹70,980',
    originalPrice: '₹86,999',
    discount: '18% off',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 'nothing-3',
    name: 'Nothing Phone (3) 12GB',
    price: '₹49,999',
    originalPrice: '₹84,999',
    discount: '41% off',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=640&auto=format&fit=crop', // Using a generic elegant phone image
  },
  {
    id: 'oppo-x9',
    name: 'Oppo Find X9 16GB',
    price: '₹78,499',
    originalPrice: '₹1,09,999',
    discount: '29% off',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=640&auto=format&fit=crop',
  },
  {
    id: 'flip-7-fe',
    name: 'Samsung Galaxy Z Flip 7 FE',
    price: '₹79,999',
    originalPrice: '₹1,10,999',
    discount: '28% off',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=640&auto=format&fit=crop',
  },
]

export function FlashDealsSection() {
  const scrollRef = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full bg-[#fef2e8] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Pagination Dots at top */}
        <div className="mb-6 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${i === activeTab ? 'bg-red-600' : 'bg-slate-300'}`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Hurry Up! Get Up to 40% Off
        </h2>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-lg hover:bg-slate-50 lg:flex"
          >
            <ChevronLeft className="h-6 w-6 text-slate-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-lg hover:bg-slate-50 lg:flex"
          >
            <ChevronRight className="h-6 w-6 text-slate-700" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 transition-all duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {FLASH_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="group relative flex w-[170px] shrink-0 flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:shadow-md sm:w-[190px] md:w-[210px]"
              >
                {/* Discount Badge */}
                <span className="absolute left-3 top-3 z-10 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  {deal.discount}
                </span>

                {/* Heart Icon */}
                <button className="absolute right-3 top-3 z-10 rounded-full bg-white p-1.5 text-slate-400 shadow-sm transition hover:text-red-500">
                  <Heart className="h-4 w-4" />
                </button>

                {/* Image */}
                <div className="mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="h-full w-full object-contain transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-[13px] font-bold text-slate-800">
                  {deal.name}
                </h3>
                
                <p className="mb-1 text-[10px] font-medium text-slate-400">
                  *best price starts from
                </p>
                
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-sm font-extrabold text-green-600">{deal.price}</span>
                  <span className="text-[11px] font-medium text-slate-400 line-through">
                    {deal.originalPrice}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-900 py-1.5 text-[10px] font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white">
                  <Plus className="h-3 w-3 stroke-[2.5]" />
                  add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
