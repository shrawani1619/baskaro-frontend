import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  Laptop,
  Watch,
  Tablet,
  Wrench,
  Recycle,
  Search,
  Store,
  PlusCircle,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  MapPin,
  ArrowRight,
  Menu,
  X,
  ShoppingBag,
  Bell
} from 'lucide-react'
import { catalog } from '../mock/catalog.js'
import { gPhoto, gBrandLogo } from '../constants/googleImages'
import { DownloadAppBanner } from '../components/DownloadAppBanner'
import { ProductCard } from '../components/ProductCard'

const TOP_NAV = [
  'All',
  'Sell Phone',
  'Buy Pre-Owned Devices',
  'Find New Phone',
  'BASKARO Store',
  'More',
]

const CATEGORY_DATA = {
  Phone: {
    icon: <Smartphone size={18} />,
    description: 'Sell phones, brands & models'
  },
  More: {
    icon: <PlusCircle size={18} />,
    description: 'Laptops, tablets & more'
  },
  Repair: {
    icon: <Wrench size={18} />,
    description: 'Screen, battery repair'
  },
  Recycle: {
    icon: <Recycle size={18} />,
    description: 'Eco-friendly disposal'
  },
  'Find New Phone': {
    icon: <Search size={18} />,
    description: 'New arrivals & comparison'
  },
  'Cashify Store': {
    icon: <Store size={18} />,
    description: 'Locate nearby store'
  }
}


const SERVICES = [
  { label: 'Sell Phone', path: '/sell-phone' },
  { label: 'Buy Phone', path: '/find-new-phone' },
  { label: 'Repair Phone', path: '/repair-phone' },
  { label: 'Find New Phone', path: '/find-new-phone' },
  { label: 'Nearby Stores', path: '/nearby-stores' },
  { label: 'New Accessories', path: '/buy-accessories' },
  { label: 'Buy Smartwatches', path: '/buy-accessories' },
]

const TOP_BRANDS = [
  { name: 'Apple', logoUrl: gBrandLogo('apple.com') },
  { name: 'Samsung', logoUrl: gBrandLogo('samsung.com') },
  { name: 'Xiaomi', logoUrl: gBrandLogo('mi.com') },
  { name: 'OnePlus', logoUrl: gBrandLogo('oneplus.com') },
  { name: 'Vivo', logoUrl: gBrandLogo('vivo.com') },
  { name: 'OPPO', logoUrl: gBrandLogo('oppo.com') },
  { name: 'Realme', logoUrl: gBrandLogo('realme.com') },
  { name: 'Google Pixel', logoUrl: gBrandLogo('google.com') },
]

const OFFERS = [
  {
    title: 'Get Instant Price Estimation',
    description: 'Select brand, model, and condition. Get an estimated payout in seconds.',
    imageUrl: gPhoto(0),
  },
  {
    title: 'Free Pickup Scheduling',
    description: 'Choose pickup date & time. We coordinate the pickup and verification steps.',
    imageUrl: gPhoto(1),
  },
  {
    title: 'Secure Payment After Verification',
    description: 'Pay via UPI or bank transfer once the device is received and verified.',
    imageUrl: gPhoto(2),
  },
]

/** Cashify-inspired hero carousel (split layout, no heavy gradients) */
const HERO_CAROUSEL_SLIDES = [
  {
    id: 'sell',
    heading: 'Sell your smartphone',
    subtext: 'Best price guaranteed — free pickup at your doorstep',
    cta: 'Sell now',
    ctaTo: '/sell-phone',
    bgClass: 'bg-red-50',
    img: gPhoto(3),
  },
  {
    id: 'buy',
    heading: 'Certified pre-owned phones',
    subtext: 'Warranty included · Save big on Apple, Samsung & more',
    cta: 'Shop deals',
    ctaTo: '/find-new-phone',
    bgClass: 'bg-blue-50',
    img: gPhoto(4),
  },
  {
    id: 'exchange',
    heading: 'Swap & upgrade',
    subtext: 'Trade in your old phone for instant credit on your next buy',
    cta: 'Start exchange',
    ctaTo: '/sell-phone',
    bgClass: 'bg-slate-100',
    img: gPhoto(5),
  },
]

const EXCLUSIVE_STORES = [
  {
    id: 'gurgaon-1',
    city: 'GURGAON',
    name: 'BAS karo Mobile Phone Store Airia Mall Sec 68 Gurugram',
    address: 'Airia Mall, Sector 68, Gurugram, Haryana',
    timings: '11:00 AM - 10:00 PM',
  },
  {
    id: 'delhi-1',
    city: 'DELHI',
    name: 'BAS karo Experience Centre Connaught Place',
    address: 'Block A, Connaught Place, New Delhi',
    timings: '10:30 AM - 9:30 PM',
  },
  {
    id: 'noida-1',
    city: 'NOIDA',
    name: 'BAS karo Store DLF Mall of India',
    address: 'DLF Mall of India, Sector 18, Noida, UP',
    timings: '11:00 AM - 10:00 PM',
  },
  {
    id: 'bangalore-1',
    city: 'BENGALURU',
    name: 'BAS karo Store Phoenix Marketcity',
    address: 'Phoenix Marketcity, Whitefield, Bengaluru',
    timings: '10:00 AM - 10:00 PM',
  },
  {
    id: 'mumbai-1',
    city: 'MUMBAI',
    name: 'BAS karo Store Infiniti Mall',
    address: 'Infiniti Mall, Andheri West, Mumbai',
    timings: '11:00 AM - 10:00 PM',
  },
]

const TRUST_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Tarun Singh Verma',
    location: 'New Delhi',
    quote:
      'Sold off my phone very easily and got the payment on the spot. Best experience so far.',
    avatar: 'https://ui-avatars.com/api/?name=Tarun+Singh+Verma&background=2563eb&color=fff&size=128',
  },
  {
    id: 't2',
    name: 'Karan Sharma',
    location: 'Delhi NCR',
    quote:
      'Well trained staff. Overall a positive experience in selling my phone at BAS karo.',
    avatar: 'https://ui-avatars.com/api/?name=Karan+Sharma&background=2563eb&color=fff&size=128',
  },
  {
    id: 't3',
    name: 'Abhiyash',
    location: 'New Delhi',
    quote:
      'No complaints, sold my phone very easily here. Definitely worth a try.',
    avatar: 'https://ui-avatars.com/api/?name=Abhiyash&background=2563eb&color=fff&size=128',
  },
  {
    id: 't4',
    name: 'Vinit Kumar',
    location: 'New Delhi',
    quote:
      'Payment was very instant and the whole process was quick. Will recommend it.',
    avatar: 'https://ui-avatars.com/api/?name=Vinit+Kumar&background=2563eb&color=fff&size=128',
  },
]

/** Partner strip — infinite horizontal marquee (placed before “Top Brands We Buy”) */
const MAJOR_BRANDS_STRIP = [
  { id: 'realme', label: 'realme', className: 'text-lg font-semibold lowercase tracking-tight' },
  { id: 'oppo', label: 'oppo', className: 'text-lg font-medium lowercase tracking-wide' },
  {
    id: 'mi',
    label: 'mi',
    className:
      'flex h-9 w-9 items-center justify-center rounded border-2 border-white text-sm font-bold',
  },
  {
    id: 'vijay-sales',
    label: 'vijay sales',
    className: 'font-serif text-lg italic tracking-tight',
  },
  {
    id: 'reliance',
    label: 'Reliance digital',
    className: 'text-base font-semibold tracking-tight',
  },
  {
    id: 'hp',
    label: 'hp',
    className:
      'flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-bold uppercase',
  },
  { id: 'paytm', label: 'paytm', className: 'text-xl font-bold lowercase tracking-tight' },
  { id: 'nokia', label: 'NOKIA', className: 'text-lg font-black uppercase tracking-widest' },
  { id: 'oneplus', label: 'OnePlus', className: 'text-lg font-bold tracking-tight' },
  { id: 'dell', label: 'DELL', className: 'text-lg font-semibold uppercase tracking-widest' },
]

function MajorBrandsMarquee({ className = '', fullBleed = false }) {
  const shell = fullBleed
    ? 'overflow-hidden border-y border-white/15 bg-blue-700 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
    : 'overflow-hidden rounded-xl border border-slate-200/80 bg-blue-700 py-3.5 shadow-sm'
  return (
    <div
      className={[shell, className].join(' ')}
      role="region"
      aria-label="Major partner brands"
    >
      <div className="major-brands-marquee-track">
        {MAJOR_BRANDS_STRIP.map((b) => (
          <div key={b.id} className="flex shrink-0 items-center px-8 sm:px-12">
            <span className={`whitespace-nowrap text-white ${b.className}`}>
              {b.label}
            </span>
          </div>
        ))}
        {MAJOR_BRANDS_STRIP.map((b) => (
          <div
            key={`${b.id}-dup`}
            className="flex shrink-0 items-center px-8 sm:px-12"
            aria-hidden="true"
          >
            <span className={`whitespace-nowrap text-white ${b.className}`}>
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Mobile-selling-only navbar dropdown content
const SELL_MEGA_BRANDS = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'OnePlus',
  'Vivo',
  'Oppo',
]
const SELL_TOP_PHONES = [
  'iPhone 13',
  'iPhone 12',
  'Samsung S21',
  'OnePlus 9',
  'Redmi Note Series',
]

const PRE_OWNED_CATEGORIES = [
  'Pre-Owned Phones',
  'Pre-Owned Laptops',
  'Pre-Owned Smart Watches',
  'Pre-Owned Tablets',
  'Pre-Owned Gaming Consoles',
  'Pre-Owned Cameras',
  'Speakers',
  'Amazon Devices',
]

const PRE_OWNED_TOP_BRANDS = [
  'Apple',
  'Xiaomi',
  'Samsung',
  'Oneplus',
  'Google',
  'Oppo',
  'Vivo',
  'All Brands',
]

const MORE_CATEGORIES = [
  { title: 'Sell Phone', img: gPhoto(0) },
  { title: 'Sell Tablet', img: gPhoto(1) },
  { title: 'Sell Smartwatch', img: gPhoto(2) },
  { title: 'Sell Earbuds', img: gPhoto(3) },
  { title: 'Repair Phone', img: gPhoto(4) },
  { title: 'Buy Pre-Owned Phones', img: gPhoto(5) },
  { title: 'Find New Phone', img: gPhoto(0) },
]

function IconBox({ idx }) {
  const boxBg = [
    'bg-red-50 border-red-100 text-red-700',
    'bg-blue-50 border-blue-100 text-blue-700',
    'bg-white border-slate-200 text-slate-700',
    'bg-red-50 border-red-100 text-red-700',
    'bg-blue-50 border-blue-100 text-blue-700',
    'bg-slate-50 border-slate-200 text-slate-800',
    'bg-red-50 border-red-100 text-red-700',
    'bg-blue-50 border-blue-100 text-blue-700',
  ]

  const icon = (() => {
    // simple inline icons; no external assets required
    const PhoneIcon = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M10 6h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
    const TagIcon = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.59 13.41 11 3H3v8l9.59 9.59a2 2 0 0 0 2.82 0l.18-.18a2 2 0 0 0 0-2.82Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M7 7h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    )
    const WrenchIcon = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )

    const RecyclingIcon = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 19 3 12l4-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M21 5h-8l3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M21 19l-4 2-3-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )

    const StoreIcon = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9l2-5h14l2 5v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )

    const WatchIcon = (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 2h8l-1 4H9L8 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M7 6h10v4a5 5 0 0 1-10 0V6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 11v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )

    const icons = [
      PhoneIcon,
      TagIcon,
      PhoneIcon,
      TagIcon,
      WrenchIcon,
      RecyclingIcon,
      PhoneIcon,
      StoreIcon,
      TagIcon,
      WatchIcon,
    ]
    return icons[idx % icons.length]
  })()

  return (
    <div
      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${boxBg[idx % boxBg.length]}`}
      aria-hidden="true"
    >
      {icon}
    </div>
  )
}

const SERVICE_THUMBS = {
  'Sell Phone': gPhoto(0),
  'Buy Gadgets': gPhoto(1),
  'Buy Phone': gPhoto(2),
  'Buy Laptops': gPhoto(3),
  'Buy Accessories': gPhoto(4),
  'Repair Phone': gPhoto(5),
  'Repair Laptop': gPhoto(0),
  Recycle: gPhoto(1),
  'Find New Phone': gPhoto(2),
  'Nearby Stores': gPhoto(3),
  'New Accessories': gPhoto(4),
  'Buy Smartwatches': gPhoto(5),
}

function ServiceThumb({ label }) {
  const url = SERVICE_THUMBS[label] ?? SERVICE_THUMBS['Sell Phone']
  return (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="mx-auto h-20 w-20 object-contain"
    />
  )
}

const PRE_OWNED_DEVICES_CAROUSEL = [
  {
    image: gPhoto(0),
    title: 'Samsung Galaxy S25 Edge - Pre-Owned',
    price: '₹57,599',
    originalPrice: '₹75,900',
    discount: 57,
    rating: 4.8,
    tag: ['Flash Sale', 'Month End Sale'],
    brand: 'BASKARO',
  },
  {
    image: gPhoto(1),
    title: 'OnePlus Nord CE 5G - Pre-Owned',
    price: '₹11,699',
    rating: 4.0,
    tag: ['Flash Sale'],
    brand: 'BASKARO',
  },
  {
    image: gPhoto(2),
    title: 'Samsung Galaxy S20 FE 5G - Pre-Owned',
    price: '₹14,699',
    originalPrice: '₹18,500',
    discount: 21,
    rating: 4.4,
    tag: ['Month End Sale', 'Flash Sale'],
    brand: 'BASKARO',
  },
  {
    image: gPhoto(3),
    title: 'Xiaomi Redmi Note 10 Pro - Pre-Owned',
    price: '₹8,525',
    originalPrice: '₹9,800',
    discount: 13,
    rating: 4.2,
    tag: ['Month End Sale'],
    brand: 'BASKARO',
  },
  {
    image: gPhoto(4),
    title: 'Apple iPhone 14 - Pre-Owned',
    price: '₹29,999',
    originalPrice: '₹42,900',
    discount: 30,
    rating: 4.8,
    tag: ['Flash Sale'],
    brand: 'BASKARO',
  },
  {
    image: gPhoto(5),
    title: 'Realme Phone - Pre-Owned',
    price: '₹12,999',
    originalPrice: '₹14,999',
    discount: 13,
    rating: 4.3,
    tag: ['Flash Sale', 'Month End Sale'],
    brand: 'BASKARO',
  },
]

function CarouselSection({ title, viewAllText, products }) {
  const scrollerRef = useRef(null)

  const scrollCarousel = (direction) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = Math.min(el.clientWidth * 0.85, 520) * direction
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="w-full px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
          <a
            href="#"
            className="text-sm font-extrabold text-slate-600 hover:text-red-700"
          >
            {viewAllText}
          </a>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            aria-label="Scroll products left"
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-700 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            aria-label="Scroll products right"
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white hover:text-red-700 sm:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-12"
          >
            {products.map((p) => (
              <ProductCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PromoImageCard({ title, imageUrl }) {
  return (
    <div className="w-[255px] shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
      <div className="relative aspect-[4/3] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="text-[13px] font-extrabold leading-snug text-white line-clamp-2">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

function PromoSliderRow({ title, cards, viewAllText = 'See all' }) {
  const scrollerRef = useRef(null)

  const onScrollRight = () => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: 880, behavior: 'smooth' })
  }

  return (
    <section className="w-full px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
          <a
            href="#"
            className="text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            {viewAllText}
          </a>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 pr-16 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
          >
            {cards.map((c) => (
              <PromoImageCard key={c.title} title={c.title} imageUrl={c.imageUrl} />
            ))}
          </div>

          <button
            type="button"
            onClick={onScrollRight}
            aria-label={`Scroll ${title} right`}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2 text-blue-700 shadow-sm hover:bg-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    id: 'faq-1',
    q: 'How is my device value calculated?',
    a: 'We check the device condition, functional tests, and market demand to give you an accurate estimate before confirmation.',
  },
  {
    id: 'faq-2',
    q: 'Do you provide warranty on pre-owned devices?',
    a: 'Yes. Pre-Owned devices come with warranty to ensure a safe purchase and peace of mind.',
  },
  {
    id: 'faq-3',
    q: 'What condition grades do you accept?',
    a: 'We accept multiple grades (like Excellent, Good, Fair, etc.). Your grade affects the final payout/price.',
  },
  {
    id: 'faq-4',
    q: 'How do you handle damaged or faulty devices?',
    a: 'If a device fails verification tests, we will show the issue and adjust the estimate accordingly based on the findings.',
  },
  {
    id: 'faq-5',
    q: 'When do I receive payment after selling?',
    a: 'Payment is completed after the device is picked up and verified. Timing depends on the selected payment method.',
  },
  {
    id: 'faq-6',
    q: 'Can I schedule pickup at a convenient time?',
    a: 'Yes. Choose a pickup date/time during the scheduling step and we will coordinate the rest of the process.',
  },
]

function FaqsSection() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="w-full px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            FAQs
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Quick answers about buying and selling pre-owned devices.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item) => {
            const isOpen = item.id === openId
            const buttonId = `${item.id}-btn`
            const panelId = `${item.id}-panel`
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-extrabold text-slate-900 sm:text-base">
                    {item.q}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <path
                          d="M6 12h12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      ) : (
                        <>
                          <path
                            d="M12 6v12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6 12h12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </>
                      )}
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={[
                    'grid transition-all',
                    isOpen
                      ? 'max-h-40 opacity-100 pb-4'
                      : 'max-h-0 opacity-0 pb-0',
                  ].join(' ')}
                >
                  <div className="px-5 text-sm font-semibold text-slate-600 sm:text-base">
                    <div className="border-t border-slate-100 pt-3">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const TRENDING_ARTICLES = [
  {
    id: 'a1',
    category: 'Guide',
    title: 'All Details About Apple Macbook Ultra Launching in 2026!',
    excerpt:
      'Being a MacBook fan, it gets pretty exciting when you get to know about the upcoming launch in 2026.',
    readTime: '6 min read',
    date: '13th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Laptop_picture.jpg',
  },
  {
    id: 'a2',
    category: 'Comparison',
    title:
      'iQOO Z11x vs OPPO K13: Confusion Solved, See Who is Better Under 20k',
    excerpt:
      'The budget range is getting heated up just as the weather is getting ahead. In this summer, both phones are competing fiercely.',
    readTime: '5 min read',
    date: '13th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg',
  },
  {
    id: 'a3',
    category: 'Guide',
    title: 'Oppo Find N6 Launch Date, Specs, Price, And More',
    excerpt:
      'If you are someone who loves staying ahead with the latest smartphone technology, this article is for you.',
    readTime: '4 min read',
    date: '13th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png',
  },
  {
    id: 'a4',
    category: 'Comparison',
    title: 'Xiaomi 17 Ultra Vs Samsung Galaxy S26 Ultra: Which Is Better',
    excerpt:
      'Both phones aim to deliver premium camera and performance experiences, but their focus areas differ.',
    readTime: '7 min read',
    date: '13th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_iPhone.png',
  },
  {
    id: 'a5',
    category: 'Tips',
    title: 'Apple iPhone 17e vs Google Pixel 10a: Full Specs & Features Compared',
    excerpt:
      'A practical comparison on camera, battery, performance, and value so you can pick the better daily driver.',
    readTime: '6 min read',
    date: '12th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hand%20holding%20Smartphone.jpg',
  },
  {
    id: 'a6',
    category: 'Tips',
    title: 'How to Verify Used Phone Condition Before Buying',
    excerpt:
      'Use this quick checklist to spot hidden issues and avoid overpaying when purchasing a pre-owned smartphone.',
    readTime: '3 min read',
    date: '11th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smart%20Phone.jpeg',
  },
]

const RECENT_NEWS = [
  {
    id: 'n1',
    title: 'New Samsung Foldable Specs Hint At Tablet-Like 7.6 Inch Screen...',
    excerpt:
      'Samsung is reportedly working on a new foldable smartphone with a wider design and improved hinge mechanics.',
    date: '15th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png',
  },
  {
    id: 'n2',
    title: 'Official BGMI 4.3 Update Launch Schedule Announced For India',
    excerpt:
      'The official BGMI 4.3 update is set to arrive soon, and Krafton has finally shared a tentative rollout window.',
    date: '15th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg',
  },
  {
    id: 'n3',
    title: 'Free Fire OB53 Advance Server Download Guide: Server To Go Live...',
    excerpt:
      'Garena Free Fire fans can now get ready for an exciting early look at the next big update with OB53 testing.',
    date: '15th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hand%20holding%20Smartphone.jpg',
  },
  {
    id: 'n4',
    title: 'Instagram End-To-End Encryption To Be Removed From Chats Starting...',
    excerpt:
      'Instagram is set to roll back a major privacy feature that it introduced not long ago, sparking mixed reactions.',
    date: '15th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smart%20Phone.jpeg',
  },
  {
    id: 'n5',
    title: 'One UI 8 Beta Features Leaked Ahead of Official Launch',
    excerpt:
      'Early screenshots suggest fresh lock-screen tools, smoother animations, and camera quality improvements.',
    date: '14th Mar 2026',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_iPhone.png',
  },
]

function badgeClass(category) {
  if (category === 'Guide') return 'bg-white/90 text-slate-900'
  if (category === 'Tips') return 'bg-blue-50 text-blue-700'
  return 'bg-red-50 text-red-700'
}

function FeaturedArticleCard({ article }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-sm ${badgeClass(article.category)}`}
        >
          {article.category}
        </span>
        <h3 className="mt-3 line-clamp-2 text-xl font-extrabold leading-tight text-white sm:text-2xl">
          {article.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-white/85">
          <span>{article.readTime}</span>
          <span aria-hidden="true">•</span>
          <span>{article.date}</span>
        </div>
      </div>
    </article>
  )
}

function SideArticleCard({ article }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex min-h-[170px]">
        <div className="relative w-2/5 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="w-3/5 p-4">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-[10px] font-extrabold ${badgeClass(article.category)}`}
          >
            {article.category}
          </span>
          <h3 className="mt-2 line-clamp-2 text-sm font-extrabold leading-snug text-slate-900">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs font-semibold text-slate-600">
            {article.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
            <span>{article.readTime}</span>
            <span aria-hidden="true">•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function BottomArticleCard({ article }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-slate-900 sm:text-base">
          {article.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>{article.readTime}</span>
          <span aria-hidden="true">•</span>
          <span>{article.date}</span>
        </div>
      </div>
    </article>
  )
}

function TrendingArticlesSection() {
  const featured = TRENDING_ARTICLES[0]
  const stacked = TRENDING_ARTICLES.slice(1, 3)
  const bottom = TRENDING_ARTICLES.slice(3, 6)

  return (
    <section className="w-full px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Trending Articles
            </h2>
            <div className="mt-1 text-xs font-semibold text-slate-400">
              Fresh insights for smarter buying and selling
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-10">
          <div className="lg:col-span-7">
            <FeaturedArticleCard article={featured} />
          </div>

          <div className="space-y-5 lg:col-span-3">
            {stacked.map((article) => (
              <SideArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bottom.map((article) => (
            <BottomArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RecentNewsSection() {
  const scrollerRef = useRef(null)

  const onScrollRight = () => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: 900, behavior: 'smooth' })
  }

  return (
    <section className="w-full px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Recent News
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            See all
          </a>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 pr-16 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
          >
            {RECENT_NEWS.map((item) => (
              <article
                key={item.id}
                className="group w-[280px] shrink-0 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm font-extrabold leading-snug text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs font-semibold text-slate-500">
                  {item.excerpt}
                </p>
                <div className="mt-2 text-xs font-bold text-slate-400">
                  {item.date}
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={onScrollRight}
            aria-label="Scroll recent news right"
            className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 p-2 text-slate-700 shadow-sm hover:bg-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

function DownloadAppSection() {
  return <DownloadAppBanner />
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('Gurgaon')
  const locationOptions = useMemo(() => ['Gurgaon', 'Delhi', 'Noida'], [])
  const [moreOpen, setMoreOpen] = useState(false)
  const [navDropdownOpen, setNavDropdownOpen] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSellOpen, setMobileSellOpen] = useState(false)
  const [sellDesktopOpen, setSellDesktopOpen] = useState(false)
  const [preOwnedDropdownOpen, setPreOwnedDropdownOpen] = useState(false)
  const [allDropdownOpen, setAllDropdownOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const [mobileAllOpen, setMobileAllOpen] = useState(false)
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const [allSellSubOpen, setAllSellSubOpen] = useState(false)
  const [mobileAllSellSubOpen, setMobileAllSellSubOpen] = useState(false)

  const topBrands = Object.keys(catalog)
  const topSellingPhones = useMemo(() => {
    const items = []
    for (const [brand, models] of Object.entries(catalog)) {
      for (const [model, meta] of Object.entries(models)) {
        items.push({ brand, model, price: meta?.basePrice ?? 0 })
      }
    }
    items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    return items.slice(0, 6)
  }, [])

  const [heroSlide, setHeroSlide] = useState(0)
  const heroSlideCount = HERO_CAROUSEL_SLIDES.length
  const [storePincode, setStorePincode] = useState('')
  const [trustSlide, setTrustSlide] = useState(0)
  const trustCount = TRUST_TESTIMONIALS.length
  const [allSellCategory, setAllSellCategory] = useState('Phone')

  useEffect(() => {
    if (trustCount <= 1) return
    const id = window.setInterval(() => {
      setTrustSlide((i) => (i + 1) % trustCount)
    }, 5000)
    return () => window.clearInterval(id)
  }, [trustCount])

  useEffect(() => {
    if (heroSlideCount <= 1) return
    const id = window.setInterval(() => {
      setHeroSlide((i) => (i + 1) % heroSlideCount)
    }, 3000)
    return () => window.clearInterval(id)
  }, [heroSlideCount])

  useEffect(() => {
    if (!moreOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [moreOpen])

  useEffect(() => {
    if (!navDropdownOpen) return

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setNavDropdownOpen(null)
    }
    const onPointerDown = (e) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('[data-nav-dropdown-wrap="true"]')) return
      setNavDropdownOpen(null)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [navDropdownOpen])

  useEffect(() => {
    if (
      !allDropdownOpen &&
      !moreDropdownOpen &&
      !sellDesktopOpen &&
      !mobileMenuOpen &&
      !mobileAllOpen &&
      !mobileSellOpen &&
      !mobileMoreOpen &&
      !mobileAllSellSubOpen
    )
      return

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setAllDropdownOpen(false)
        setMoreDropdownOpen(false)
        setAllSellSubOpen(false)
        setMobileAllSellSubOpen(false)
        setMobileMenuOpen(false)
        setMobileAllOpen(false)
        setMobileSellOpen(false)
        setMobileMoreOpen(false)
        setSellDesktopOpen(false)
        setPreOwnedDropdownOpen(false)
      }
    }

    const onPointerDown = (e) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('[data-topnav-dropdown="true"]')) return
      setAllDropdownOpen(false)
      setMoreDropdownOpen(false)
      setAllSellSubOpen(false)
      setMobileAllSellSubOpen(false)
      setSellDesktopOpen(false)
      setPreOwnedDropdownOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [
    allDropdownOpen,
    moreDropdownOpen,
    sellDesktopOpen,
    preOwnedDropdownOpen,
    mobileMenuOpen,
    mobileAllOpen,
    mobileSellOpen,
    mobileMoreOpen,
    mobileAllSellSubOpen,
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Modern premium navbar (Cyber Red Aesthetic) */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/10 bg-white/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
        <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
          {/* Logo container (flex-1 to balance) */}
          <div className="flex flex-1 items-center justify-start">
            <Link to="/" className="flex shrink-0 items-center gap-2 group transition-transform hover:scale-105 active:scale-95" aria-label="BASkaro home">
              <img
                src="/logo.png"
                alt="BAS karo"
                className="h-14 w-auto object-contain object-left translate-y-3"
              />
            </Link>
          </div>

          {/* Search (desktop - perfectly centered) */}
          <div className="relative hidden w-full max-w-2xl md:block group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors">
              <Search size={19} strokeWidth={2.5} />
            </div>
            <input
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-28 py-3 text-[14px] font-bold outline-none focus:border-rose-500/50 focus:bg-white focus:ring-8 focus:ring-rose-500/5 transition-all placeholder:text-slate-400/80 shadow-sm group-hover:bg-slate-50 transition-all font-inter"
              placeholder="Search for iPhone 16, Samsung S24 & more..."
              type="search"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
               <button className="rounded-xl bg-slate-900 px-4 py-2 text-[11px] font-black text-white uppercase tracking-widest hover:bg-rose-600 transition-all shadow-md active:scale-95 group-focus-within:bg-rose-600">
                  Search
               </button>
            </div>
          </div>

          {/* Right actions (flex-1 to balance) */}
          <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
            <button className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:block">
              <Bell size={20} />
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-bold text-slate-700 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer group">
                <MapPin size={14} className="text-rose-600 group-hover:scale-110 transition-transform" />
                <span>{location}</span>
              </div>
            </div>

            <Link
              to="/login"
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-black text-white shadow-lg shadow-slate-900/10 hover:bg-rose-600 hover:shadow-rose-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Login
            </Link>

            <button
              type="button"
              className="md:hidden rounded-xl bg-slate-100 p-2 text-slate-900 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Global Sub-navigation row */}
        <nav className="w-full border-t border-slate-100 bg-white/50 backdrop-blur-sm hidden md:block">
          <div className="flex w-full items-center justify-center gap-6 px-4 py-2 sm:px-6 lg:px-12">

            {/* All Dropdown */}
            <div className="relative" data-topnav-dropdown="true">
              <button
                type="button"
                className={[
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-black tracking-tight transition-all",
                  allDropdownOpen ? "bg-rose-600 text-white shadow-md shadow-rose-600/20" : "text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                ].join(' ')}
                onClick={() => {
                  setAllDropdownOpen(!allDropdownOpen)
                  setAllSellSubOpen(true)
                  setSellDesktopOpen(false)
                  setPreOwnedDropdownOpen(false)
                  setMoreDropdownOpen(false)
                }}
              >
                <span>ALL CATEGORIES</span>
                <ChevronRight size={14} className={["transition-transform", allDropdownOpen ? "rotate-90" : ""].join(' ')} />
              </button>

              <AnimatePresence>
                {allDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 top-full z-[120] mt-3 w-[680px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
                  >
                    <div className="flex h-[460px]">
                      {/* Left Sidebar */}
                      <div className="w-[200px] bg-slate-50/50 border-r border-slate-100 p-6 flex flex-col gap-2">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Marketplace</h4>
                        {Object.entries(CATEGORY_DATA).map(([label, data]) => {
                          const active = allSellCategory === label
                          return (
                            <button
                              key={label}
                              onClick={() => setAllSellCategory(label)}
                              className={[
                                'flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-bold tracking-tight',
                                active ? 'bg-white text-rose-600 shadow-sm ring-1 ring-slate-100' : 'text-slate-600 hover:text-rose-600 hover:bg-white/50'
                              ].join(' ')}
                            >
                              <span>{label}</span>
                              <ChevronRight size={12} className={active ? 'translate-x-0.5' : 'opacity-0'} />
                            </button>
                          )
                        })}
                      </div>

                      {/* Right Panel Content */}
                      <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={allSellCategory}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="h-full"
                          >
                            {allSellCategory === 'Phone' ? (
                              <div className="space-y-10">
                                <div>
                                  <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">Top Brand Portals</h4>
                                    <button className="text-xs font-bold text-rose-600 hover:underline">View All Brands</button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {TOP_BRANDS.slice(0, 8).map((brand) => (
                                      <button
                                        key={brand.name}
                                        onClick={() => {
                                          setAllDropdownOpen(false)
                                          navigate(`/brand/${brand.name}`)
                                        }}
                                        className="flex items-center gap-3 text-left group"
                                      >
                                        <div className="h-8 w-8 rounded-lg bg-slate-50 p-1.5 group-hover:bg-rose-50 transition-colors">
                                          <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain mix-blend-multiply" />
                                        </div>
                                        <span className="text-[14px] font-bold text-slate-600 group-hover:text-rose-600 transition-colors tracking-tight">
                                          {brand.name}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-8 border-t border-slate-50">
                                  <h4 className="text-base font-black text-slate-900 mb-6 uppercase tracking-tight">Trending Now</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    {[
                                      'iPhone 16 Pro Max', 'Galaxy S24 Ultra', 'OnePlus 12', 'Pixel 9 Pro'
                                    ].map(phone => (
                                      <button key={phone} className="flex items-center gap-2 text-left text-[14px] font-bold text-slate-500 hover:text-rose-600 transition-colors">
                                        <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                        {phone}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                                  {CATEGORY_DATA[allSellCategory]?.icon}
                                </div>
                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Expert {allSellCategory} Services</h4>
                                <p className="text-[13px] font-medium text-slate-400 mt-3 max-w-[240px] leading-relaxed">Our premium {allSellCategory.toLowerCase()} portal is currently being optimized for elite valuations.</p>
                                <button className="mt-8 rounded-xl bg-slate-900 px-6 py-2.5 text-[11px] font-black text-white uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95">Notify Me</button>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sub Nav Items */}
            <div className="flex items-center gap-1">
              {[
                { label: 'Home', path: '/' },
                { label: 'Sell Phone', path: '/sell-phone' },
                { label: 'Buy Pre-Owned', path: '/marketplace' },
                { label: 'Find New Phone', path: '/find-new-phone' },
                { label: 'Repairs', path: '/repair-phone' },
                { label: 'Store Locator', path: '/nearby-stores' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all tracking-tight"
                >
                  {item.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" data-topnav-dropdown="true">
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all tracking-tight flex items-center gap-1"
                >
                  <span>MORE</span>
                  <ChevronRight size={14} className={moreDropdownOpen ? 'rotate-90' : ''} />
                </button>

                <AnimatePresence>
                  {moreDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full z-[120] mt-3 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
                    >
                      {[
                        { label: 'About Us', path: '/about' },
                        { label: 'Warranty Policy', path: '#' },
                        { label: 'Refer & Earn', path: '#' },
                        { label: 'Careers', path: '#' },
                        { label: 'Press Releases', path: '#' }
                      ].map(sub => (
                        <Link key={sub.label} to={sub.path} className="block w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[200] flex flex-col bg-white md:hidden"
            >
              <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="BAS karo"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-slate-100 p-2 text-slate-900 hover:text-rose-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 custom-scrollbar">
                <nav className="flex flex-col gap-2">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Sell Phone', path: '/sell-phone' },
                    { label: 'Buy Pre-Owned', path: '/marketplace' },
                    { label: 'Find New Phone', path: '/find-new-phone' },
                    { label: 'Repairs', path: '/repair-phone' },
                    { label: 'Store Locator', path: '/nearby-stores' },
                    { label: 'About Us', path: '/about' },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-sm font-black text-slate-900 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={18} className="opacity-50" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Partner Programs</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {['Warranty', 'Insurance', 'Referral', 'Corporate'].map(item => (
                      <button key={item} className="flex flex-col gap-1 text-left p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                        <span className="text-[12px] font-black text-slate-900">{item}</span>
                        <span className="text-[10px] font-bold text-slate-400">Learn More</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t bg-slate-50/50 p-6">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-black text-white shadow-xl hover:bg-rose-600 transition-all active:scale-95"
                >
                  <LogIn size={18} />
                  Login / Register
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* Hero carousel — full width (inset matches Our Services) */}
      <section className="w-full pt-6 pb-2">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured offers"
          >
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div
                className="flex flex-nowrap transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{
                  width: `${heroSlideCount * 100}%`,
                  transform: `translateX(-${(heroSlide * 100) / heroSlideCount}%)`,
                }}
              >
                {HERO_CAROUSEL_SLIDES.map((slide) => (
                  <div
                    key={slide.id}
                    className={`box-border shrink-0 ${slide.bgClass}`}
                    style={{ width: `${100 / heroSlideCount}%` }}
                  >
                    <div className="flex flex-col items-stretch gap-8 px-6 py-10 sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between md:gap-10 md:px-12 md:py-14 lg:px-16">
                      <div className="max-w-xl md:min-w-0 md:flex-1">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                          {slide.heading}
                        </h2>
                        <p className="mt-3 text-base text-slate-600 sm:text-lg">
                          {slide.subtext}
                        </p>
                        <Link
                          to={slide.ctaTo}
                          className="mt-6 inline-flex rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        >
                          {slide.cta}
                        </Link>
                      </div>
                      <div className="flex flex-1 justify-center md:max-w-md lg:max-w-lg">
                        <img
                          src={slide.img}
                          alt=""
                          className="h-44 w-auto max-w-full object-contain sm:h-52 md:h-56 lg:h-64"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:left-3"
              aria-label="Previous slide"
              onClick={() =>
                setHeroSlide(
                  (i) => (i - 1 + heroSlideCount) % heroSlideCount,
                )
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:right-3"
              aria-label="Next slide"
              onClick={() =>
                setHeroSlide((i) => (i + 1) % heroSlideCount)
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className="mt-4 flex justify-center gap-2"
              role="tablist"
              aria-label="Carousel pagination"
            >
              {HERO_CAROUSEL_SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === heroSlide}
                  aria-label={`Slide ${i + 1}: ${slide.heading}`}
                  className={[
                    'h-2 rounded-full transition-all duration-300',
                    i === heroSlide
                      ? 'w-8 bg-red-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400',
                  ].join(' ')}
                  onClick={() => setHeroSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services — full-width band */}
      <section className="w-full border-y border-slate-100 bg-slate-50 pt-10 pb-10">
        <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Our Services</h2>
            <span className="text-xs font-semibold text-slate-400">Tap to open →</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {SERVICES.map((service) => (
              <button
                key={service.label}
                type="button"
                onClick={() => navigate(service.path)}
                className="group flex flex-col items-center justify-start rounded-xl p-1 text-left transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="relative flex h-24 w-full max-w-[118px] items-center justify-center rounded-2xl bg-[#eaf3f2] ring-2 ring-transparent transition-all duration-200 group-hover:bg-[#dff0ee] group-hover:ring-red-200 group-hover:shadow-md">
                  <ServiceThumb label={service.label} />
                  {/* Hover arrow badge */}
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 scale-75">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <span className="mt-2 text-center text-xs font-bold text-slate-800 transition-colors duration-150 group-hover:text-red-700">
                  {service.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Your Old Device Now */}
      <section id="sell-your-device" className="w-full scroll-mt-20 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 text-xl font-extrabold text-slate-900">
                Sell Your Old Device Now
              </h2>
              <p className="text-sm font-semibold text-slate-600">
                Pick what you want to sell. We'll calculate an estimate.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {[
                {
                  title: 'Sell Phone',
                  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png',
                  path: '/sell-phone',
                },
                {
                  title: 'Get estimate',
                  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hand%20holding%20Smartphone.jpg',
                  path: '/sell-phone',
                },
                {
                  title: 'Buy Accessories',
                  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cellphones%20being%20disassembled%20and%20sorted%20for%20recycling.jpg',
                  path: '/buy-accessories',
                },
                {
                  title: 'Repair Phone',
                  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smart%20Phone.jpeg',
                  path: '/repair-phone',
                },
                {
                  title: 'Find New Phone',
                  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png',
                  path: '/find-new-phone',
                },
                {
                  title: 'Nearby Stores',
                  img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg',
                  path: '/nearby-stores',
                },
                {
                  title: 'More',
                  img: '',
                  dots: true,
                },
              ].map((card, idx) => (
                <button
                  key={`${card.title}-${idx}`}
                  type="button"
                  className="group flex min-h-[140px] flex-col items-center justify-start rounded-2xl border border-slate-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => {
                    if (card.dots) setMoreOpen(true)
                    else if (card.path) navigate(card.path)
                  }}
                >
                  {card.dots ? (
                    <span className="mt-4 flex items-center gap-1 text-xl text-slate-500">
                      <span>•</span>
                      <span>•</span>
                      <span>•</span>
                    </span>
                  ) : (
                    <img
                      src={card.img}
                      alt={card.title}
                      className="h-20 w-20 object-contain"
                      loading="lazy"
                    />
                  )}
                  <span className="mt-4 text-center text-sm font-bold leading-tight text-slate-700">
                    {card.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right-side "More" drawer */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close sidebar"
            onClick={() => setMoreOpen(false)}
          />

          <aside className="relative h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="text-base font-extrabold text-slate-900">
                Sell Your Old Device Now
              </div>
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close"
                onClick={() => setMoreOpen(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m6 6 12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="h-full overflow-y-auto px-4 py-5">
              <div className="grid grid-cols-3 gap-4">
                {MORE_CATEGORIES.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    className="group"
                  >
                    <div className="flex h-20 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
                      <img
                        src={c.img}
                        alt=""
                        aria-hidden="true"
                        className="h-10 w-10 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 text-center text-xs font-bold text-slate-700 group-hover:text-red-700">
                      {c.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Buy Pre-Owned Devices */}
      <CarouselSection
        title="Buy Pre-Owned Devices"
        viewAllText="View All"
        products={PRE_OWNED_DEVICES_CAROUSEL}
      />

      {/* Our Exclusive Stores */}
      <section className="w-full px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-extrabold text-slate-900">
              Our Exclusive Stores
            </h2>
            <a
              href="#"
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              View all stores
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-5 w-5 shrink-0 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 21c-4.418 0-8-3.5-8-8a8 8 0 0 1 16 0c0 4.5-3.582 8-8 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="11"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              200+ Experience Centres
            </span>
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-5 w-5 shrink-0 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              4.5+ Star Ratings
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 sm:p-6">
            <div className="flex items-stretch gap-2 sm:max-w-md">
              <label htmlFor="store-pincode" className="sr-only">
                Enter pincode
              </label>
              <input
                id="store-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter Pincode"
                value={storePincode}
                onChange={(e) =>
                  setStorePincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                aria-label="Search by pincode"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin]">
              {EXCLUSIVE_STORES.map((store) => (
                <article
                  key={store.id}
                  className="min-w-[260px] max-w-[280px] shrink-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="inline-block rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                    {store.city}
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-slate-900">
                    {store.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {store.address}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Timings : {store.timings}
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View Details
                    <span className="ml-0.5" aria-hidden="true">
                      →
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & social proof — full-width band + edge-to-edge partner strip */}
      <section className="w-full bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto w-full max-w-[1920px] px-4 py-12 sm:px-6 md:px-8 md:py-16 lg:px-10 xl:px-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <h2 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Trusted by 176.02 Lac + Happy Users and Major Brands since 2015
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:shrink-0">
              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-950 px-5 py-4 sm:min-w-[168px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <span className="text-lg font-semibold text-blue-600">
                    ₹
                  </span>
                </div>
                <div className="mt-3 text-2xl font-bold tabular-nums text-blue-600">
                  13201.65Cr.
                </div>
                <div className="mt-1 text-xs font-medium text-white/60">
                  Cash Given
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-950 px-5 py-4 sm:min-w-[168px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 6h4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-2xl font-bold tabular-nums text-blue-600">
                  195.58Lac
                </div>
                <div className="mt-1 text-xs font-medium text-white/60">
                  Gadgets Encashed
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-4">
            {TRUST_TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                className="flex flex-col rounded-xl bg-white p-5 text-slate-900 shadow-sm"
              >
                <span className="text-4xl font-serif leading-none text-blue-600">
                  &ldquo;
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed">{t.quote}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img
                    src={t.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">{t.location}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative mt-10 lg:hidden">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex flex-nowrap transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{
                  width: `${trustCount * 100}%`,
                  transform: `translateX(-${(trustSlide * 100) / trustCount}%)`,
                }}
              >
                {TRUST_TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="box-border shrink-0 px-1"
                    style={{ width: `${100 / trustCount}%` }}
                  >
                    <article className="flex h-full min-h-[220px] flex-col rounded-xl bg-white p-5 text-slate-900 shadow-sm">
                      <span className="text-4xl font-serif leading-none text-blue-600">
                        &ldquo;
                      </span>
                      <p className="mt-2 flex-1 text-sm leading-relaxed">
                        {t.quote}
                      </p>
                      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                        <img
                          src={t.avatar}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {t.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {t.location}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md hover:bg-slate-50"
              aria-label="Next testimonial"
              onClick={() =>
                setTrustSlide((i) => (i + 1) % trustCount)
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="mt-4 flex justify-center gap-2">
              {TRUST_TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={[
                    'h-2 rounded-full transition-all',
                    i === trustSlide
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-white/30 hover:bg-white/50',
                  ].join(' ')}
                  onClick={() => setTrustSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Edge-to-edge partner strip (full viewport width) */}
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-t border-white/10">
          <MajorBrandsMarquee fullBleed className="w-full" />
        </div>
      </section>

      {/* Image promo sliders */}
      <PromoSliderRow
        title="Better For Pocket. Buy Pre-Owned"
        viewAllText="See all"
        cards={[
          {
            title: 'Apple iPhone 13 Mini Pre-Owned Deal...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_iPhone.png',
          },
          {
            title: 'Get Pre-Owned Bose Portable Smart Speaker with...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg',
          },
          {
            title: 'Best Deal On Pre-Owned Xiaomi Redmi Note 11...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png',
          },
          {
            title: 'Get Pre-Owned Samsung Galaxy S20 FE under...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Hand%20holding%20Smartphone.jpg',
          },
        ]}
      />

      <PromoSliderRow
        title="Be Smart. Sell Smart"
        viewAllText="See all"
        cards={[
          {
            title: '512GB Phones: The Sweet Spot For Res...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Hand%20holding%20Smartphone.jpg',
          },
          {
            title: 'Why iPhones Hold 15% More Resale Valu...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_iPhone.png',
          },
          {
            title: "Verify Your Phone’s Clean Status Before...",
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg',
          },
          {
            title: '3 Steps to Ensure Your Digital...',
            imageUrl:
              'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png',
          },
        ]}
      />

      <FaqsSection />

      <TrendingArticlesSection />
      <RecentNewsSection />
      <DownloadAppSection />
    </div>
  )
}

