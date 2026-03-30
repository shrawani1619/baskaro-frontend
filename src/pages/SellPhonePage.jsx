import { ServicePageLayout } from '../components/ServicePageLayout'
import { PHONE_BRAND_PORTALS } from '../components/TopBrandPortals'
import { gPhoto } from '../constants/googleImages'

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
    img: gPhoto(0),
  },
  {
    name: 'Apple iPhone 11 (4 GB/64 GB)',
    price: '13,580',
    img: gPhoto(1),
  },
  {
    name: 'Apple iPhone 12 (4 GB/128 GB)',
    price: '17,740',
    img: gPhoto(2),
  },
  {
    name: 'Apple iPhone 14 (6 GB/128 GB)',
    price: '32,430',
    img: gPhoto(3),
  },
  {
    name: 'Apple iPhone 15 (6 GB/128 GB)',
    price: '37,180',
    img: gPhoto(4),
  },
  {
    name: 'Apple iPhone 14 Pro (6 GB/256 GB)',
    price: '56,160',
    img: gPhoto(5),
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
  return (
    <ServicePageLayout
      breadcrumb="Home / Sell Old Mobile Phone"
      title="Sell Old Mobile Phone for Instant Cash"
      heroPills={['Maximum Value', 'Safe & Hassle-free', 'Free Doorstep Pickup']}
      searchLabel="Search your Mobile Phone to sell"
      searchPlaceholder="Search model name..."
      searchButtonText="Check Price"
      brands={BRAND_LIST}
      howItWorksTitle="How Cashify Works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      topBrands={PHONE_BRAND_PORTALS}
      productsSection={{
        title: 'Top Selling Mobile Phones',
        items: TOP_PHONES,
        viewAllHref: '#',
      }}
      stories={STORIES}
      faqs={FAQS}
    />
  )
}
