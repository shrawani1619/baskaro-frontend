import { useMemo } from 'react'
import { ServicePageLayout } from '../components/ServicePageLayout'
import { useCatalogBrands } from '../hooks/useCatalogBrands'

const BRANDS_FALLBACK = ['Apple', 'Samsung', 'OnePlus', 'Vivo', 'Xiaomi', 'OPPO', 'Realme', 'Motorola']

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Set budget',
    text: 'Filter by price, brand, and features that matter — camera, battery, 5G, and more.',
  },
  {
    step: '2',
    title: 'Compare models',
    text: 'Side-by-side specs and pre-owned grades so you pick with confidence.',
  },
  {
    step: '3',
    title: 'Buy safely',
    text: 'Warranty-backed devices with quality checks and easy support.',
  },
]

const WHY_US = [
  'Pre-Owned & new options',
  'Quality graded',
  'Warranty included',
  'EMI available',
  'Easy exchange',
  'Verified sellers',
]

const STORIES = [
  'Got a pre-owned iPhone in excellent condition — saved a lot vs retail.',
  'Comparison tool made it easy to choose between two Samsung models.',
  'Warranty claim was smooth when I had a minor issue in the first month.',
]

const FAQS = [
  'What does pre-owned grade mean?',
  'Can I exchange my old phone?',
  'Is EMI available?',
  'What warranty do new phones include?',
]

export default function FindNewPhonePage() {
  const { brands: apiBrands, loading: brandsLoading } = useCatalogBrands()
  const brands = useMemo(() => {
    if (brandsLoading) return []
    return apiBrands.length ? apiBrands : BRANDS_FALLBACK
  }, [brandsLoading, apiBrands])

  return (
    <ServicePageLayout
      breadcrumb="Home / Find New Phone"
      title="Find Your Next Phone — New & Pre-Owned"
      heroPills={['Best deals', 'Warranty backed', 'Easy compare']}
      searchLabel="Search phones by model or brand"
      searchPlaceholder="e.g. iPhone 15, Galaxy S24..."
      searchButtonText="Search"
      brands={brands}
      brandsLoading={brandsLoading}
      howItWorksTitle="How buying works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      showHotDeals={false}
      hotDealsTitle="Phone deals"
      topBrands={null}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Find phones | Sell old device | Book repair"
    />
  )
}
