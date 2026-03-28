import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Smartphone, ShoppingBag, User, LogIn, Menu, X, Hammer } from 'lucide-react'
import { isLoggedIn, logout } from '../lib/auth'
import { useCart } from '../context/CartContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Track auth status and scroll position
  useEffect(() => {
    setAuthenticated(isLoggedIn())
    
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`Search for: ${searchQuery} - (Implementation pending)`)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: <MapPin size={16} className="hidden lg:block opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-4 group-hover:mr-1" /> },
    { name: 'Sell Device', path: '/sell-phone', icon: <Smartphone size={16} className="hidden lg:block opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-4 group-hover:mr-1" /> },
    { name: 'Buy Pre-Owned', path: '/find-new-phone', icon: <ShoppingBag size={16} className="hidden lg:block opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-4 group-hover:mr-1" /> },
    { name: 'Repairs', path: '/repair-phone', icon: <Hammer size={16} className="hidden lg:block opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-4 group-hover:mr-1" /> },
    { name: 'Find Stores', path: '/nearby-stores', icon: <MapPin size={16} className="hidden lg:block opacity-0 w-0 transition-all group-hover:opacity-100 group-hover:w-4 group-hover:mr-1" /> },
  ]

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 transform ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-transparent py-2' 
          : 'bg-gradient-to-b from-white to-white/95 border-b border-slate-100 py-3 sm:py-4'
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        
        {/* LOGO & LOCATION */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex shrink-0 items-center transform hover:scale-105 transition-transform" aria-label="BAS karo home">
            <img src="/logo.png" alt="BAS karo" className="h-[34px] sm:h-[42px] w-auto object-contain object-left" />
          </Link>
          
          <button className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full hover:shadow-sm">
            <MapPin size={14} className="text-red-500" />
            <span>Select City</span>
          </button>
        </div>

        {/* SEARCH BAR (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mobiles, tablets, accessories..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-full focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block pl-10 pr-4 py-2.5 transition-all outline-none"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            )}
          </form>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                group flex items-center px-3 py-2 text-[13px] lg:text-sm font-bold rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-red-50 text-red-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* CART & AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-3 ml-2 lg:ml-6 pl-2 lg:pl-6 border-l border-slate-200">
          <Link to="/cart" className="relative p-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-lg group">
            <ShoppingBag size={22} className="group-hover:text-red-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          {authenticated ? (
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md shadow-red-500/25 px-5 py-2.5 rounded-full text-sm font-black transition-all hover:-translate-y-0.5"
            >
              <User size={16} />
              My Account
            </Link>
          ) : (
            <Link 
              to="/login"
              className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-black transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <LogIn size={16} className="hidden lg:block text-slate-300" />
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl"
        >
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 outline-none font-medium"
              />
            </form>
            
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors
                    ${isActive ? 'bg-red-50 text-red-700' : 'text-slate-700 hover:bg-slate-50'}
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100">
              {authenticated ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="bg-red-600 text-white text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    <User size={18} /> Dashboard
                  </Link>
                  <button onClick={() => { logout(); setAuthenticated(false); setMobileMenuOpen(false); navigate('/') }} className="bg-slate-100 text-slate-700 text-center py-3 rounded-xl font-bold">
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-3.5 rounded-xl font-black">
                  <LogIn size={18} /> Login / Register
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

