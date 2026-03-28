import { ServicePageLayout } from '../components/ServicePageLayout'
import { gPhoto } from '../constants/googleImages'

const CITIES = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad']

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Enter location',
    text: 'Type your pincode or city to see BAS karo partner stores and service centres near you.',
  },
  {
    step: '2',
    title: 'Choose a store',
    text: 'View timings, services offered — sell, buy, repair — and directions.',
  },
  {
    step: '3',
    title: 'Visit or book',
    text: 'Walk in or reserve a slot for valuation or pickup.',
  },
]

const WHY_US = [
  'Verified partner stores',
  'Same trusted pricing',
  'Sell & repair on-site',
  'Trained staff',
  'Instant quotes',
  'Secure handover',
]

const STORES = [
  { name: 'BAS karo — Andheri West', price: '2.1 km', img: gPhoto(0) },
  { name: 'BAS karo — Koramangala', price: '4.5 km', img: gPhoto(1) },
  { name: 'BAS karo — Connaught Place', price: '1.8 km', img: gPhoto(2) },
  { name: 'BAS karo — Hitech City', price: '3.2 km', img: gPhoto(3) },
  { name: 'BAS karo — Baner', price: '5.0 km', img: gPhoto(4) },
  { name: 'BAS karo — Salt Lake', price: '2.7 km', img: gPhoto(5) },
]

const STORIES = [
  'Walked into the store and got my phone valued in ten minutes.',
  'Staff helped me transfer data before I sold — very patient.',
  'Found a repair centre closer than I expected on the map.',
]

const FAQS = [
  'Do all stores offer doorstep pickup?',
  'Can I sell at a store and get instant cash?',
  'What documents should I carry?',
  'How do I know a store is an official partner?',
]

export default function NearbyStoresPage() {
  return (
    <ServicePageLayout
      breadcrumb="Home / Nearby Stores"
      title="Nearby Stores — Sell, Buy & Repair"
      heroPills={['Local partners', 'Instant quote', 'Easy directions']}
      searchLabel="Find a store near you"
      searchPlaceholder="Enter pincode or area..."
      searchButtonText="Find stores"
      brands={CITIES}
      brandPickerSubtitle="Or pick a city"
      howItWorksTitle="How store visit works"
      howItWorks={HOW_IT_WORKS}
      whyUs={WHY_US}
      hotDealsTitle="Store spotlight"
      topBrands={null}
      productsSection={{
        title: 'Stores near you',
        priceLabel: 'Distance',
        omitCurrency: true,
        items: STORES,
        viewAllHref: '#',
      }}
      stories={STORIES}
      faqs={FAQS}
      downloadBannerSubtitle="Locate stores | Sell online | Track orders in app"
      productButtonLabel="Directions"
    />
  )
}
