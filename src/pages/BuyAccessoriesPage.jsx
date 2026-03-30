import { ServicePageLayout } from '../components/ServicePageLayout'
import { PHONE_BRAND_PORTALS } from '../components/TopBrandPortals'
import { gPhoto } from '../constants/googleImages'

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

const PICKS = [
  { name: 'USB-C fast charger 25W', price: '899', img: gPhoto(0) },
  { name: 'Wireless earbuds (TWS)', price: '1,999', img: gPhoto(1) },
  { name: 'Tempered glass screen guard', price: '299', img: gPhoto(2) },
  { name: 'Silicone phone case', price: '449', img: gPhoto(3) },
  { name: 'Power bank 10000 mAh', price: '1,249', img: gPhoto(4) },
  { name: 'Car phone mount', price: '599', img: gPhoto(5) },
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
      hotDealsTitle="Accessory bundles"
      topBrands={PHONE_BRAND_PORTALS}
      productsSection={{
        title: 'Popular picks',
        priceLabel: 'From',
        items: PICKS,
        viewAllHref: '#',
      }}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Shop accessories | Sell old phone | Book repair"
      productButtonLabel="Add to cart"
    />
  )
}
