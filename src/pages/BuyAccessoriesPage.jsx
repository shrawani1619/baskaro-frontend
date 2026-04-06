import { ServicePageLayout } from '../components/ServicePageLayout'

const BRANDS = ['Apple', 'Samsung', 'Anker', 'Boat', 'JBL', 'OnePlus', 'Realme', 'Noise']

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Browse & compare',
    text: 'Search cases, chargers, audio, and wearables from trusted brands in one place.',
  },
  {
    step: '2',
    title: 'Add to cart',
    text: 'Check compatibility with your device and confirm warranty where applicable.',
  },
  {
    step: '3',
    title: 'Fast delivery',
    text: 'Doorstep delivery with easy returns on eligible items.',
  },
]

const WHY_US = [
  'Genuine products',
  'Compatibility checks',
  'Easy returns',
  'Best offers',
  'Warranty support',
  'Secure checkout',
]

const STORIES = [
  'Found the exact case for my phone and it arrived in two days.',
  'Charger was genuine and cheaper than the mall — happy repeat buyer.',
  'Return was painless when the fit was wrong. Support was quick.',
]

const FAQS = [
  'How do I check accessory compatibility?',
  'Do accessories come with warranty?',
  'What is the return window?',
  'Do you deliver across India?',
]

export default function BuyAccessoriesPage() {
  return (
    <ServicePageLayout
      breadcrumb="Home / Buy Accessories"
      title="Buy Mobile Accessories — Cases, Audio & More"
      heroPills={['Genuine stock', 'Fast delivery', 'Easy returns']}
      searchLabel="Search accessories for your device"
      searchPlaceholder="Search case, charger, earbuds..."
      searchButtonText="Browse"
      brands={BRANDS}
      howItWorksTitle="How shopping works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      showHotDeals={false}
      hotDealsTitle="Accessory bundles"
      topBrands={null}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Shop accessories | Sell old phone | Book repair"
      productButtonLabel="Add to cart"
    />
  )
}
