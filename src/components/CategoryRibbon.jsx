import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'smartphones',
    label: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop',
    path: '/sell-phone',
  },
  {
    id: 'smartwatches',
    label: 'Smart Watches',
    image: 'https://images.unsplash.com/photo-1508685096489-7cf683ba3f2b?q=80&w=200&auto=format&fit=crop',
    path: '/buy-accessories',
  },
  {
    id: 'smart-tvs',
    label: 'Smart TVs',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
  {
    id: 'air-conditioner',
    label: 'Air Conditioner',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
  {
    id: 'laptops',
    label: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
  {
    id: 'personal-care',
    label: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5912018a?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=200&auto=format&fit=crop',
    path: '/buy-accessories',
  },
  {
    id: 'tablets',
    label: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
  {
    id: 'gift-cards',
    label: 'Gift cards',
    image: 'https://images.unsplash.com/photo-1549463591-147604d0c24c?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
  {
    id: 'smart-gadgets',
    label: 'Smart gadgets',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=200&auto=format&fit=crop',
    path: '/marketplace',
  },
]

export function CategoryRibbon() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="relative w-full border-b border-slate-100 bg-[#f1f3f6] py-3.5 sm:py-5">
      <div className="w-full px-4 sm:px-8 lg:px-20">
        <div className="group relative">
          {/* Scroll Buttons */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-800 opacity-0 shadow-lg ring-1 ring-slate-200 transition-all hover:scale-105 group-hover:opacity-100 sm:h-10 sm:w-10 lg:-left-10"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-800 opacity-0 shadow-lg ring-1 ring-slate-200 transition-all hover:scale-105 group-hover:opacity-100 sm:h-10 sm:w-10 lg:-right-10"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          {/* Categories Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-10 md:justify-center lg:gap-14"
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                <div className="relative">
                  {/* Circular Wrapper */}
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-white shadow-sm transition-all duration-300 group-hover:shadow-md sm:h-18 sm:w-18 lg:h-20 lg:w-20">
                    {/* The image itself */}
                    <div className="h-full w-full p-2">
                       <div className="h-full w-full rounded-full overflow-hidden bg-white">
                        <img
                          src={cat.image}
                          alt=""
                          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                       </div>
                    </div>
                  </div>
                  
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 -z-10 rounded-full bg-blue-600/0 blur-lg transition-all duration-500 group-hover:bg-blue-600/5" />
                </div>
                
                {/* Category Label */}
                <span className="whitespace-nowrap text-center text-[10.5px] font-black tracking-tight text-slate-500 transition-colors duration-300 group-hover:text-slate-900 sm:text-[12px] lg:text-[13px]">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
