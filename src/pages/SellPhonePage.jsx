import { ServicePageLayout } from '../components/ServicePageLayout'
import { PHONE_BRAND_PORTALS } from '../components/TopBrandPortals'
import { gPhoto } from '../constants/googleImages'
// Import premium PNG assets
import s25Front from '../assets/products/s25_titanium.jpg'
import iphone14Front from '../assets/products/iphone14_purple.jpg'
import iphone13Blue from '../assets/products/iphone13_blue.jpg'
import iphone11Purple from '../assets/products/iphone11_purple.jpg'
import iphone12Red from '../assets/products/iphone12_red.jpg'
import iphone14Pro from '../assets/products/iphone14_pro.jpg'

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
    name: 'Apple iPhone 14 (128 GB)',
    price: '32,430',
    img: iphone14Front,
  },
  {
    name: 'Samsung Galaxy S25 Edge (12 GB/256 GB)',
    price: '58,210',
    img: s25Front,
  },
  {
    name: 'Apple iPhone 13 (128 GB)',
    price: '29,810',
    img: iphone13Blue,
  },
  {
    name: 'Apple iPhone 11 (64 GB)',
    price: '13,580',
    img: iphone11Purple,
  },
  {
    name: 'Apple iPhone 12 (128 GB)',
    price: '17,740',
    img: iphone12Red,
  },
  {
    name: 'Apple iPhone 14 Pro (256 GB)',
    price: '56,160',
    img: iphone14Pro,
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
