import { useState } from 'react'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'

const BRAND_LIST = ['Apple', 'Xiaomi', 'Samsung', 'Vivo', 'OnePlus', 'OPPO', 'Realme', 'Motorola']

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Check Price',
    text: 'Select your device and current condition. Our pricing engine gives an instant estimate.',
  },
  {
    step: '2',
    title: 'Schedule Pickup',
    text: 'Book a free doorstep pickup at your preferred time slot.',
  },
  {
    step: '3',
    title: 'Get Paid',
    text: 'Receive instant payment right after pickup verification is completed.',
  },
]

const WHY_US = [
  'Best Prices',
  'Instant Payment',
  'Simple & Convenient',
  'Free Doorstep Pickup',
  'Factory Grade Data Wipe',
  'Valid Purchase Invoice',
]

const TOP_PHONES = [
  {
    name: 'Apple iPhone 13 (4 GB/128 GB)',
    price: '29,810',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_13_vector.svg',
  },
  {
    name: 'Apple iPhone 11 (4 GB/64 GB)',
    price: '13,580',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_11_Pro_Max_Midnight_Green.svg',
  },
  {
    name: 'Apple iPhone 12 (4 GB/128 GB)',
    price: '17,740',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_12_Pro_Graphite.svg',
  },
  {
    name: 'Apple iPhone 14 (6 GB/128 GB)',
    price: '32,430',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_14_Pro_vector.svg',
  },
  {
    name: 'Apple iPhone 15 (6 GB/128 GB)',
    price: '37,180',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_15_Pro_Blue_Titanium_PDP_Image_Position-1__en-IN.jpg',
  },
  {
    name: 'Apple iPhone 14 Pro (6 GB/256 GB)',
    price: '56,160',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_14_Pro_vector.svg',
  },
]

const TOP_BRANDS = [
  {
    name: 'Apple',
    logoUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_logo_black.svg',
  },
  {
    name: 'Xiaomi',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_logo.svg',
  },
  {
    name: 'Samsung',
    logoUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Global_Logo_Lettermark.svg',
  },
  {
    name: 'Vivo',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vivo_logo_2019.svg',
  },
  {
    name: 'OnePlus',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/OnePlus_logo.svg',
  },
  {
    name: 'OPPO',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/OPPO_LOGO_2019.svg',
  },
  {
    name: 'Realme',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Realme-realme-_logo_box-RGB-01.svg',
  },
]

const STORIES = [
  'I loved that pickup was from my home and payment was instant. Super convenient.',
  'Local buyers were low-balling. Here I got a fair value in minutes.',
  'Great process, clear checks, fast payout, and professional team.',
]

const FAQS = [
  'How do I know the price of my old phone?',
  'What should I do if my old phone is not turning on?',
  'Can I cancel my sale if I change my mind?',
  'Is doorstep pickup really free?',
]

export default function SellPhonePage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <Navbar />
      <section className="w-full border-b border-blue-100 bg-gradient-to-r from-red-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <p className="text-sm font-semibold text-slate-500">Home / Sell Old Mobile Phone</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Sell Old Mobile Phone for Instant Cash
          </h1>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Maximum Value', 'Safe & Hassle-free', 'Free Doorstep Pickup'].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/60 bg-white/80 p-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold text-slate-800">Search your Mobile Phone to sell</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                placeholder="Search model name..."
                className="h-11 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="primary" className="h-11">
                Check Price
              </Button>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Or choose a brand
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {BRAND_LIST.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 hover:shadow-sm"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">How Cashify Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-blue-600 text-sm font-extrabold text-white">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-red-100 via-white to-blue-100 p-6">
          <h2 className="text-2xl font-extrabold text-slate-900">Hot Deals</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-36 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-bold text-slate-700">hot_deals_{n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">Why Us</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <h3 className="text-base font-extrabold text-slate-900">{item}</h3>
                <p className="mt-1 text-sm text-slate-600">{item} with transparent and trusted experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">Top Selling Brands</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex flex-1 gap-4 overflow-x-auto pb-2">
              {TOP_BRANDS.map((brand) => (
                <article
                  key={brand.name}
                  className="min-w-[138px] rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-r from-slate-50 to-blue-50 px-2">
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      loading="lazy"
                      className="h-8 w-full object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-800">{brand.name}</p>
                </article>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next brands"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-slate-400 md:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-slate-900">Top Selling Mobile Phones</h2>
            <Button as="a" href="#" variant="secondary">
              View All
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_PHONES.map((phone) => (
              <article
                key={phone.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 via-blue-50 to-red-50 p-3">
                  <img
                    src={phone.img}
                    alt={phone.name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{phone.name}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">Get Upto</p>
                <p className="text-2xl font-extrabold text-blue-700">Rs {phone.price}</p>
                <Button variant="danger" className="mt-3">
                  Sell Now
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">Customer Stories</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {STORIES.map((story, idx) => (
              <article
                key={idx}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm text-slate-600">{story}</p>
                <p className="mt-3 text-sm font-bold text-slate-900">Customer #{idx + 1}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">FAQs</h2>
          <div className="mt-5 space-y-3">
            {FAQS.map((q, idx) => (
              <article key={q} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                  onClick={() => setOpenFaq((prev) => (prev === idx ? -1 : idx))}
                >
                  <span className="font-bold text-slate-900">{q}</span>
                  <span className="text-slate-500">{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="border-t px-4 py-3 text-sm text-slate-600">
                    You can complete this process online, schedule pickup, and receive instant payment.
                  </p>
                )}
              </article>
            ))}
          </div>
          <Button variant="secondary" className="mt-4">
            Load More FAQs
          </Button>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 p-6 text-white shadow-lg">
          <h2 className="text-2xl font-extrabold">Download the App</h2>
          <p className="mt-2 text-sm text-slate-200">
            Sell your old phone | Buy refurbished phones | Get your phone repaired
          </p>
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Android
            </Button>
            <Button variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              iOS
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
