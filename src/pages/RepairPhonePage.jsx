import { useMemo } from 'react'
import { ServicePageLayout } from '../components/ServicePageLayout'
import { useCatalogBrands } from '../hooks/useCatalogBrands'

const BRANDS_FALLBACK = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'OPPO', 'Realme', 'Motorola']

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
  const { brands: apiBrands, loading: brandsLoading } = useCatalogBrands()
  const brands = useMemo(() => {
    if (brandsLoading) return []
    return apiBrands.length ? apiBrands : BRANDS_FALLBACK
  }, [brandsLoading, apiBrands])

  return (
    <ServicePageLayout
      breadcrumb="Home / Repair Phone"
      title="Phone Repair — Screen, Battery & More"
      heroPills={['Expert techs', 'Clear pricing', 'Repair warranty']}
      searchLabel="Find repair for your phone"
      searchPlaceholder="Search model or issue..."
      searchButtonText="Get quote"
      brands={brands}
      brandsLoading={brandsLoading}
      howItWorksTitle="How repair works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      showHotDeals={false}
      hotDealsTitle="Repair offers"
      topBrands={null}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Book repair | Sell old phone | Shop accessories"
      productButtonLabel="Book now"
    />
  )
}
