import { useMemo } from 'react'
import { ServicePageLayout } from '../components/ServicePageLayout'
import { useCatalogBrands } from '../hooks/useCatalogBrands'

const BRAND_LIST_FALLBACK = ['Apple', 'Xiaomi', 'Samsung', 'Vivo', 'OnePlus', 'OPPO', 'Realme', 'Motorola']

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
  const { brands: apiBrands, loading: brandsLoading } = useCatalogBrands()
  const brands = useMemo(() => {
    if (brandsLoading) return []
    return apiBrands.length ? apiBrands : BRAND_LIST_FALLBACK
  }, [brandsLoading, apiBrands])

  return (
    <ServicePageLayout
      breadcrumb="Home / Sell Old Mobile Phone"
      title="Sell Old Mobile Phone for Instant Cash"
      heroPills={['Maximum Value', 'Safe & Hassle-free', 'Free Doorstep Pickup']}
      searchLabel="Search your Mobile Phone to sell"
      searchPlaceholder="Search model name..."
      searchButtonText="Check Price"
      brands={brands}
      brandsLoading={brandsLoading}
      howItWorksTitle="How Cashify Works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      showHotDeals={false}
      topBrands={null}
      stories={STORIES}
      faqs={FAQS}
    />
  )
}
