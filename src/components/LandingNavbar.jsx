import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  Wrench,
  Recycle,
  Search,
  Store,
  PlusCircle,
  ChevronRight,
  MapPin,
  Menu,
  X,
  Bell,
  LogIn,
} from 'lucide-react'
import { TopBrandPortals, MARKETPLACE_PORTAL_CONTENT } from './TopBrandPortals'

const CATEGORY_DATA = {
  Phone: {
    icon: <Smartphone size={18} />,
    description: 'Sell phones, brands & models',
  },
  More: {
    icon: <PlusCircle size={18} />,
    description: 'Laptops, tablets & more',
  },
  Repair: {
    icon: <Wrench size={18} />,
    description: 'Screen, battery repair',
  },
  Recycle: {
    icon: <Recycle size={18} />,
    description: 'Eco-friendly disposal',
  },
  'Find New Phone': {
    icon: <Search size={18} />,
    description: 'New arrivals & comparison',
  },
  'Cashify Store': {
    icon: <Store size={18} />,
    description: 'Locate nearby store',
  },
}

export function LandingNavbar() {
  const navigate = useNavigate()
  const [location] = useState('Gurgaon')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sellDesktopOpen, setSellDesktopOpen] = useState(false)
  const [preOwnedDropdownOpen, setPreOwnedDropdownOpen] = useState(false)
  const [allDropdownOpen, setAllDropdownOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const [mobileAllOpen, setMobileAllOpen] = useState(false)
  const [mobileSellOpen, setMobileSellOpen] = useState(false)
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const [allSellSubOpen, setAllSellSubOpen] = useState(false)
  const [mobileAllSellSubOpen, setMobileAllSellSubOpen] = useState(false)
  const [allSellCategory, setAllSellCategory] = useState('Phone')

  useEffect(() => {
    if (
      !allDropdownOpen &&
      !moreDropdownOpen &&
      !sellDesktopOpen &&
      !mobileMenuOpen &&
      !mobileAllOpen &&
      !mobileSellOpen &&
      !mobileMoreOpen &&
      !mobileAllSellSubOpen
    )
      return

    const isMobileModalOpen = mobileMenuOpen || mobileAllOpen || mobileSellOpen || mobileMoreOpen || mobileAllSellSubOpen

    let prevBodyOverflow = ''
    let prevHtmlOverflow = ''

    if (isMobileModalOpen) {
      prevBodyOverflow = document.body.style.overflow
      prevHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setAllDropdownOpen(false)
        setMoreDropdownOpen(false)
        setAllSellSubOpen(false)
        setMobileAllSellSubOpen(false)
        setMobileMenuOpen(false)
        setMobileAllOpen(false)
        setMobileSellOpen(false)
        setMobileMoreOpen(false)
        setSellDesktopOpen(false)
        setPreOwnedDropdownOpen(false)
      }
    }

    const onPointerDown = (e) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('[data-topnav-dropdown="true"]')) return
      setAllDropdownOpen(false)
      setMoreDropdownOpen(false)
      setAllSellSubOpen(false)
      setMobileAllSellSubOpen(false)
      setSellDesktopOpen(false)
      setPreOwnedDropdownOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
      if (isMobileModalOpen) {
        document.body.style.overflow = prevBodyOverflow
        document.documentElement.style.overflow = prevHtmlOverflow
      }
    }
  }, [
    allDropdownOpen,
    moreDropdownOpen,
    sellDesktopOpen,
    preOwnedDropdownOpen,
    mobileMenuOpen,
    mobileAllOpen,
    mobileSellOpen,
    mobileMoreOpen,
    mobileAllSellSubOpen,
  ])

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-white/10 bg-white/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/90">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-1 items-center justify-start">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
            aria-label="BASkaro home"
          >
            <img
              src="/logo.png"
              alt="BAS karo"
              className="h-14 w-auto object-contain object-left translate-y-3"
            />
          </Link>
        </div>

        <div className="relative hidden w-full max-w-2xl md:block group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors">
            <Search size={19} strokeWidth={2.5} />
          </div>
          <input
            className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-28 py-3 text-[14px] font-bold outline-none focus:border-rose-500/50 focus:bg-white focus:ring-8 focus:ring-rose-500/5 transition-all placeholder:text-slate-400/80 shadow-sm group-hover:bg-slate-50 transition-all font-inter"
            placeholder="Search for iPhone 16, Samsung S24 & more..."
            type="search"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <button
              type="button"
              className="rounded-xl bg-slate-900 px-4 py-2 text-[11px] font-black text-white uppercase tracking-widest hover:bg-rose-600 transition-all shadow-md active:scale-95 group-focus-within:bg-rose-600"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <button
            type="button"
            className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:block"
          >
            <Bell size={20} />
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-bold text-slate-700 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer group">
              <MapPin size={14} className="text-rose-600 group-hover:scale-110 transition-transform" />
              <span>{location}</span>
            </div>
          </div>

          <Link
            to="/login"
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-black text-white shadow-lg shadow-slate-900/10 hover:bg-rose-600 hover:shadow-rose-600/20 transition-all hover:scale-105 active:scale-95"
          >
            Login
          </Link>

          <button
            type="button"
            className="md:hidden rounded-xl bg-slate-100 p-2 text-slate-900 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="w-full border-t border-slate-100 bg-white hidden md:block">
        <div className="flex w-full items-center justify-center gap-6 px-4 py-2 sm:px-6 lg:px-12">
          <div className="relative" data-topnav-dropdown="true">
            <button
              type="button"
              className={[
                'flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-black tracking-tight transition-all',
                allDropdownOpen
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50',
              ].join(' ')}
              onClick={() => {
                setAllDropdownOpen(!allDropdownOpen)
                setAllSellSubOpen(true)
                setSellDesktopOpen(false)
                setPreOwnedDropdownOpen(false)
                setMoreDropdownOpen(false)
              }}
            >
              <span>ALL CATEGORIES</span>
              <ChevronRight
                size={14}
                className={['transition-transform', allDropdownOpen ? 'rotate-90' : ''].join(' ')}
              />
            </button>

            <AnimatePresence>
              {allDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-0 top-full z-[120] mt-3 w-[680px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
                >
                  <div className="flex h-[460px]">
                    <div className="w-[200px] bg-slate-50/50 border-r border-slate-100 p-6 flex flex-col gap-2">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Marketplace</h4>
                      {Object.entries(CATEGORY_DATA).map(([label]) => {
                        const active = allSellCategory === label
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setAllSellCategory(label)}
                            className={[
                              'flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 text-[13px] font-bold tracking-tight',
                              active
                                ? 'bg-white text-rose-600 shadow-sm ring-1 ring-slate-100'
                                : 'text-slate-600 hover:text-rose-600 hover:bg-white/50',
                            ].join(' ')}
                          >
                            <span>{label}</span>
                            <ChevronRight size={12} className={active ? 'translate-x-0.5' : 'opacity-0'} />
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={allSellCategory}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="h-full"
                        >
                          {MARKETPLACE_PORTAL_CONTENT[allSellCategory] ? (
                            <TopBrandPortals
                              brands={MARKETPLACE_PORTAL_CONTENT[allSellCategory].brands}
                              trendingItems={MARKETPLACE_PORTAL_CONTENT[allSellCategory].trendingItems}
                              onBrandClick={(brand) => {
                                setAllDropdownOpen(false)
                                navigate(`/brand/${encodeURIComponent(brand.name)}`)
                              }}
                              onViewAllClick={() => {
                                setAllDropdownOpen(false)
                                navigate('/marketplace')
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                              <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                                {CATEGORY_DATA[allSellCategory]?.icon}
                              </div>
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Expert {allSellCategory} Services</h4>
                              <p className="text-[13px] font-medium text-slate-400 mt-3 max-w-[240px] leading-relaxed">
                                Our premium {allSellCategory.toLowerCase()} portal is currently being optimized for elite valuations.
                              </p>
                              <button
                                type="button"
                                className="mt-8 rounded-xl bg-slate-900 px-6 py-2.5 text-[11px] font-black text-white uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95"
                              >
                                Notify Me
                              </button>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'Sell Phone', path: '/sell-phone' },
              { label: 'Buy Pre-Owned', path: '/marketplace' },
              { label: 'Find New Phone', path: '/find-new-phone' },
              { label: 'Repairs', path: '/repair-phone' },
              { label: 'Store Locator', path: '/nearby-stores' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all tracking-tight"
              >
                {item.label}
              </Link>
            ))}

            <div className="relative" data-topnav-dropdown="true">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="px-4 py-2 text-[13px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all tracking-tight flex items-center gap-1"
              >
                <span>MORE</span>
                <ChevronRight size={14} className={moreDropdownOpen ? 'rotate-90' : ''} />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full z-[120] mt-3 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
                  >
                    {[
                      { label: 'About Us', path: '/about' },
                      { label: 'Warranty Policy', path: '/warranty-policy' },
                      { label: 'Refer & Earn', path: '/refer-earn' },
                      { label: 'Careers', path: '/careers' },
                      { label: 'Press Releases', path: '/press-releases' },
                    ].map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="block w-full text-left px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] flex flex-col bg-white md:hidden"
          >
            <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.png" alt="BAS karo" className="h-8 w-auto object-contain" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-slate-100 p-2 text-slate-900 hover:text-rose-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 custom-scrollbar">
              <nav className="flex flex-col gap-2">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Sell Phone', path: '/sell-phone' },
                  { label: 'Buy Pre-Owned', path: '/marketplace' },
                  { label: 'Find New Phone', path: '/find-new-phone' },
                  { label: 'Repairs', path: '/repair-phone' },
                  { label: 'Store Locator', path: '/nearby-stores' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Warranty Policy', path: '/warranty-policy' },
                  { label: 'Refer & Earn', path: '/refer-earn' },
                  { label: 'Careers', path: '/careers' },
                  { label: 'Press Releases', path: '/press-releases' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-sm font-black text-slate-900 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={18} className="opacity-50" />
                  </Link>
                ))}
              </nav>

              <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Partner Programs</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Warranty', 'Insurance', 'Referral', 'Corporate'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex flex-col gap-1 text-left p-3 rounded-xl bg-white border border-slate-100 shadow-sm"
                    >
                      <span className="text-[12px] font-black text-slate-900">{item}</span>
                      <span className="text-[10px] font-bold text-slate-400">Learn More</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t bg-slate-50/50 p-6">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-black text-white shadow-xl hover:bg-rose-600 transition-all active:scale-95"
              >
                <LogIn size={18} />
                Login / Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
