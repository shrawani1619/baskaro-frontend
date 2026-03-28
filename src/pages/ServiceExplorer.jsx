import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Smartphone, Laptop, Watch, Tablet, Wrench, Recycle, Search, Store } from 'lucide-react'

const SUB_CATEGORIES = {
  'Sell Phone': [
    { id: 'apple', title: 'Apple', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_logo_black.svg', count: '40+ Models' },
    { id: 'samsung', title: 'Samsung', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Global_Logo_Lettermark.svg', count: '60+ Models' },
    { id: 'xiaomi', title: 'Xiaomi', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_logo.svg', count: '50+ Models' },
    { id: 'oneplus', title: 'OnePlus', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/OnePlus_logo.png', count: '20+ Models' },
    { id: 'vivo', title: 'Vivo', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vivo_logo_2019.svg', count: '30+ Models' },
    { id: 'oppo', title: 'OPPO', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/OPPO_Logo.svg', count: '30+ Models' },
  ],
  'Buy Phone': [
    { id: 'refurbished-iphones', title: 'Refurbished iPhones', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_iPhone.png', count: 'In Stock' },
    { id: 'refurbished-galaxy', title: 'Refurbished Galaxy', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png', count: 'In Stock' },
    { id: 'budget-phones', title: 'Budget Series', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg', count: 'Starting ₹5999' },
  ],
  'Repair Phone': [
    { id: 'screen', title: 'Screen Repair', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smart%20Phone.jpeg', count: 'Starting ₹999' },
    { id: 'battery', title: 'Battery Replacement', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hand%20holding%20Smartphone.jpg', count: 'Original Parts' },
    { id: 'camera', title: 'Camera Repair', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg', count: 'Expert Service' },
  ]
}

const ServiceExplorer = () => {
  const { serviceType } = useParams()
  const navigate = useNavigate()
  const decodedType = decodeURIComponent(serviceType || '')
  
  const cards = SUB_CATEGORIES[decodedType] || [
    { id: 'default-1', title: 'Coming Soon', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Smartphone.png', count: 'Stay Tuned' },
    { id: 'default-2', title: 'More Options', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mobile%20Phone.jpg', count: 'Stay Tuned' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-['Outfit']">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 className="ml-6 text-lg font-black text-slate-900 uppercase tracking-tight">
            {decodedType}
          </h1>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-block rounded-full bg-red-50 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 mb-4">
            Select Category
          </div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Choose your <span className="text-red-700">Sub-Service</span>
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-500">
            Tell us more about what you are looking for in {decodedType}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {cards.map((card, idx) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 transition-all hover:border-red-100 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.15)]"
              onClick={() => {
                if (decodedType === 'Sell Phone') {
                  navigate(`/brand/${card.title}`)
                }
              }}
            >
              <div className="mb-6 flex aspect-square w-full items-center justify-center rounded-3xl bg-slate-50 transition-colors group-hover:bg-red-50/50">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="h-2/3 w-2/3 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <h3 className="text-base font-black text-slate-900 group-hover:text-red-700 transition-colors">
                {card.title}
              </h3>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
                {card.count}
              </p>
              
              <div className="mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white opacity-0 transition-all group-hover:opacity-100">
                <ArrowLeft className="rotate-180" size={14} />
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ServiceExplorer
