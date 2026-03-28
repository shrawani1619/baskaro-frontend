import { ServicePageLayout } from '../components/ServicePageLayout'
import { gPhoto, gBrandLogo } from '../constants/googleImages'

const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Vivo', 'Xiaomi', 'OPPO', 'Realme', 'Motorola']

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Set budget',
    text: 'Filter by price, brand, and features that matter — camera, battery, 5G, and more.',
  },
  {
    step: '2',
    title: 'Compare models',
    text: 'Side-by-side specs and refurbished grades so you pick with confidence.',
  },
  {
    step: '3',
    title: 'Buy safely',
    text: 'Warranty-backed devices with quality checks and easy support.',
  },
]

const WHY_US = [
  'Refurbished & new options',
  'Quality graded',
  'Warranty included',
  'EMI available',
  'Easy exchange',
  'Verified sellers',
]

const TOP_BRANDS = [
  { name: 'Apple', logoUrl: gBrandLogo('apple.com') },
  { name: 'Samsung', logoUrl: gBrandLogo('samsung.com') },
  { name: 'OnePlus', logoUrl: gBrandLogo('oneplus.com') },
  { name: 'Vivo', logoUrl: gBrandLogo('vivo.com') },
  { name: 'Xiaomi', logoUrl: gBrandLogo('mi.com') },
  { name: 'OPPO', logoUrl: gBrandLogo('oppo.com') },
]

const PHONES = [
  { name: 'Apple iPhone 14 (128 GB) — Refurbished', price: '42,990', img: gPhoto(0) },
  { name: 'Samsung Galaxy flagship (8/256 GB)', price: '48,499', img: gPhoto(1) },
  { name: 'OnePlus flagship', price: '35,999', img: gPhoto(2) },
  { name: 'Vivo V-series', price: '28,999', img: gPhoto(3) },
  { name: 'Xiaomi flagship', price: '31,499', img: gPhoto(4) },
  { name: 'Apple iPhone 13 (128 GB) — Refurbished', price: '36,499', img: gPhoto(5) },
]

const STORIES = [
  'Got a refurbished iPhone in excellent condition — saved a lot vs retail.',
  'Comparison tool made it easy to choose between two Samsung models.',
  'Warranty claim was smooth when I had a minor issue in the first month.',
]

const FAQS = [
  'What does refurbished grade mean?',
  'Can I exchange my old phone?',
  'Is EMI available?',
  'What warranty do new phones include?',
]

export default function FindNewPhonePage() {
  return (
    <ServicePageLayout
      breadcrumb="Home / Find New Phone"
      title="Find Your Next Phone — New & Refurbished"
      heroPills={['Best deals', 'Warranty backed', 'Easy compare']}
      searchLabel="Search phones by model or brand"
      searchPlaceholder="e.g. iPhone 15, Galaxy S24..."
      searchButtonText="Search"
      brands={BRANDS}
      howItWorksTitle="How buying works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      hotDealsTitle="Phone deals"
      topBrands={TOP_BRANDS}
      productsSection={{
        title: 'Trending phones',
        priceLabel: 'From',
        items: PHONES,
        viewAllHref: '#',
      }}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Find phones | Sell old device | Book repair"
      productButtonLabel="View deal"
    />
  )
}
