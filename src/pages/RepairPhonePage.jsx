import { ServicePageLayout } from '../components/ServicePageLayout'
import { gPhoto, gBrandLogo } from '../constants/googleImages'

const BRANDS = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'OPPO', 'Realme', 'Motorola']

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Describe issue',
    text: 'Tell us the problem — display, battery, charging port, or software — and your model.',
  },
  {
    step: '2',
    title: 'Get quote',
    text: 'Receive a transparent repair estimate with genuine or compatible parts options.',
  },
  {
    step: '3',
    title: 'Fix & return',
    text: 'Drop off or schedule pickup; we repair, test, and hand your phone back with warranty.',
  },
]

const WHY_US = [
  'Trained technicians',
  'Genuine parts option',
  'Warranty on repair',
  'Pickup available',
  'Same-day on select jobs',
  'Data-safe handling',
]

const TOP_BRANDS = [
  { name: 'Apple', logoUrl: gBrandLogo('apple.com') },
  { name: 'Samsung', logoUrl: gBrandLogo('samsung.com') },
  { name: 'OnePlus', logoUrl: gBrandLogo('oneplus.com') },
  { name: 'Xiaomi', logoUrl: gBrandLogo('mi.com') },
  { name: 'Vivo', logoUrl: gBrandLogo('vivo.com') },
]

const REPAIR_ITEMS = [
  { name: 'Screen replacement', price: '2,499', img: gPhoto(0) },
  { name: 'Battery replacement', price: '1,899', img: gPhoto(1) },
  { name: 'Charging port repair', price: '999', img: gPhoto(2) },
  { name: 'Camera module fix', price: '1,499', img: gPhoto(3) },
  { name: 'Water damage assessment', price: '499', img: gPhoto(4) },
  { name: 'Software & diagnostics', price: '399', img: gPhoto(5) },
]

const STORIES = [
  'Screen was fixed same day — looks brand new and touch works perfectly.',
  'Battery swap gave my old phone another year. Fair price.',
  'They explained the issue clearly before starting work. No surprises.',
]

const FAQS = [
  'How long does a typical repair take?',
  'Do you use original parts?',
  'Is my data safe during repair?',
  'What warranty do you offer on repairs?',
]

export default function RepairPhonePage() {
  return (
    <ServicePageLayout
      breadcrumb="Home / Repair Phone"
      title="Phone Repair — Screen, Battery & More"
      heroPills={['Expert techs', 'Clear pricing', 'Repair warranty']}
      searchLabel="Find repair for your phone"
      searchPlaceholder="Search model or issue..."
      searchButtonText="Get quote"
      brands={BRANDS}
      howItWorksTitle="How repair works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      hotDealsTitle="Repair offers"
      topBrands={TOP_BRANDS}
      productsSection={{
        title: 'Common services',
        priceLabel: 'Starts at',
        items: REPAIR_ITEMS,
        viewAllHref: '#',
      }}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Book repair | Sell old phone | Shop accessories"
      productButtonLabel="Book now"
    />
  )
}
