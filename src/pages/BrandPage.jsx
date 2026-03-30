import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const BRAND_SERIES = {
  Apple: [
    { name: 'iPhone 16 Series', models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16'] },
    { name: 'iPhone 15 Series', models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15'] },
    { name: 'iPhone 14 Series', models: ['iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14'] },
    { name: 'iPhone 13 Series', models: ['iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13'] },
  ],
  Samsung: [
    { name: 'S24 Series', models: ['Galaxy S24 Ultra', 'Galaxy S24 Plus', 'Galaxy S24'] },
    { name: 'S23 Series', models: ['Galaxy S23 Ultra', 'Galaxy S23 Plus', 'Galaxy S23'] },
    { name: 'Fold/Flip Series', models: ['Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy Z Fold 4'] },
  ]
}

const DEVICE_IMAGES = {
  'iPhone 16 Pro Max': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg',
  'iPhone 16 Pro': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg',
  'iPhone 16 Plus': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg',
  'iPhone 16': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg',
  'iPhone 15 Pro Max': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
  'iPhone 15 Pro': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg',
  'iPhone 14 Pro Max': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max.jpg',
  'iPhone 13 Pro Max': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg',
  'Galaxy S24 Ultra': 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg',
  'default_phone': 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg'
}

const BrandPage = () => {
  const { brandName } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = React.useState('')

  const series = BRAND_SERIES[brandName] || [
    { name: `${brandName} Series`, models: [`${brandName} Model X`, `${brandName} Model Y`, `${brandName} Model Z`] }
  ]

  const filteredSeries = series.map(s => ({
    ...s,
    models: s.models.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(s => s.models.length > 0)

  return (
    <div className="min-h-screen bg-slate-50 font-['Outfit'] pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="relative mb-10 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
             Official {brandName} Marketplace
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
            Sell Your <span className="text-rose-600">{brandName}</span>
          </h1>
          <p className="text-base text-slate-500 max-w-xl font-medium leading-relaxed italic opacity-80">
            Select your model to get an instant valuation. Fast, secure and the best price guaranteed.
          </p>
        </motion.div>

        {filteredSeries.length > 0 ? (
          <div className="space-y-12">
            {filteredSeries.map((s, idx) => (
              <div key={s.name}>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-[0.2em]">{s.name}</h2>
                   <div className="h-px flex-1 bg-slate-100" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {s.models.map((model, midx) => (
                    <motion.div
                      key={model}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: midx * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 hover:shadow-[0_40px_80px_-20px_rgba(244,63,94,0.15)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                    >
                      <div className="w-full aspect-square relative mb-8 group-hover:scale-105 transition-transform duration-500">
                          <div className="absolute inset-0 bg-slate-50/50 rounded-full scale-90 blur-2xl group-hover:bg-rose-50/50 transition-colors" />
                          <img 
                            src={DEVICE_IMAGES[model] || DEVICE_IMAGES['default_phone']} 
                            className="w-full h-full object-contain relative z-10"
                            alt={model}
                          />
                      </div>
                      
                      <h3 className="text-base font-black text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">
                         {model}
                      </h3>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-8">Upto ₹48,000</div>
                      
                      <button 
                        onClick={() => navigate(`/sell/assessment/${brandName}/${model.replace(/ /g, '-')}`)}
                        className="w-full py-4 rounded-2xl bg-slate-900 group-hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 group-hover:shadow-rose-600/30"
                      >
                         Sell Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
             <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mb-6 font-black text-3xl">?</div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">No models found</h3>
             <p className="text-slate-400 font-bold">Try searching with a different model name.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default BrandPage
