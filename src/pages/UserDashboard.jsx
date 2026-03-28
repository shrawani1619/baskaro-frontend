import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone, User, MapPin, Package, LogOut, ChevronRight,
  CheckCircle, Calendar, Clock, Edit2, Plus, Trash2, Home,
  ArrowLeft, ArrowRight, RefreshCw, Star, Phone
} from 'lucide-react'
import { catalog } from '../mock/catalog.js'
import { estimateSellingPrice } from '../lib/pricing/estimatePrice.js'
import { getUser, clearUser, setUser } from '../lib/auth.js'

// ─── Constants ────────────────────────────────────────────────────────────────
const SCREEN_OPTIONS  = ['Excellent', 'Good', 'Fair', 'Bad / Cracked']
const BODY_OPTIONS    = ['Excellent', 'Good', 'Fair', 'Bad / Scratched']
const BATTERY_OPTIONS = ['90% - 100%', '80% - 89%', '60% - 79%', 'Below 60%']
const ACC_OPTIONS     = ['Original box + all accessories', 'Original charger only', 'No charger / no box', 'No accessories']

function fmt(n) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)
}

// ─── Reusable form primitives ─────────────────────────────────────────────────
function Label({ children }) {
  return <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-400">{children}</label>
}
function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}
function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      {...rest}
    />
  )
}

// ─── ProtectedRoute check ─────────────────────────────────────────────────────
export default function UserDashboard() {
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    if (!user) navigate('/login', { replace: true })
  }, [])

  if (!user) return null

  return <DashboardShell user={user} navigate={navigate} />
}

// ─── Shell ────────────────────────────────────────────────────────────────────
function DashboardShell({ user, navigate }) {
  const [tab, setTab] = useState('sell')

  function logout() {
    clearUser()
    navigate('/')
  }

  const tabs = [
    { id: 'sell',     Icon: Smartphone, label: 'Sell Phone'  },
    { id: 'orders',   Icon: Package,    label: 'My Orders'   },
    { id: 'profile',  Icon: User,       label: 'Profile'     },
    { id: 'address',  Icon: MapPin,     label: 'Addresses'   },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Outfit']">

      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white shadow-sm shrink-0">
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
          <Link to="/">
            <img src="/logo.png" alt="BAS karo" className="h-8 w-auto object-contain"
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block' }} />
            <span style={{display:'none'}} className="text-xl font-black text-slate-900">
              BAS<span className="text-red-600">karo</span>
            </span>
          </Link>
        </div>

        {/* User pill */}
        <div className="mx-4 mt-5 rounded-2xl bg-blue-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
              {(user.name || user.phone || 'U')[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-black text-slate-900">{user.name || 'User'}</div>
              <div className="truncate text-[11px] font-semibold text-slate-500">{user.phone || user.email || ''}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex-1 px-3 space-y-1">
          {tabs.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={[
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all',
                tab === id
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              ].join(' ')}
            >
              <Icon size={17} />
              {label}
              {tab === id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <button onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Mobile top bar */}
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
            <ArrowLeft size={15} /> Home
          </Link>
          <span className="text-base font-black text-slate-900">
            BAS<span className="text-red-600">karo</span>
          </span>
          <button onClick={logout} className="rounded-full p-1.5 text-slate-400 hover:text-red-600">
            <LogOut size={17} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'sell'    && <SellTab user={user} />}
              {tab === 'orders'  && <OrdersTab />}
              {tab === 'profile' && <ProfileTab user={user} />}
              {tab === 'address' && <AddressTab user={user} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile bottom tab bar */}
        <nav className="flex border-t border-slate-200 bg-white md:hidden">
          {tabs.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={[
                'flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-bold transition-colors',
                tab === id ? 'text-red-600' : 'text-slate-400',
              ].join(' ')}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: SELL PHONE
// ─────────────────────────────────────────────────────────────────────────────
function SellTab({ user }) {
  const [step, setStep] = useState(1) // 1 brand → 2 model → 3 variant → 4 condition → 5 estimate → 6 pickup → 7 confirm

  // Sell state
  const brands = useMemo(() => Object.keys(catalog), [])
  const [brand, setBrand] = useState('')
  const [modelQuery, setModelQuery] = useState('')
  const [model, setModel] = useState('')
  const [ram, setRam] = useState('')
  const [storage, setStorage] = useState('')
  const [screen, setScreen] = useState('Good')
  const [body, setBody] = useState('Good')
  const [battery, setBattery] = useState('80% - 89%')
  const [accessories, setAccessories] = useState('Original charger only')

  // Pickup state
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [selectedAddr, setSelectedAddr] = useState(null)
  const [payMethod, setPayMethod] = useState('UPI')

  const addresses = useMemo(() => JSON.parse(localStorage.getItem('baskaro_addresses') || '[]'), [step])

  const models = useMemo(() => {
    const all = Object.keys(catalog[brand] ?? {})
    if (!modelQuery.trim()) return all
    return all.filter(m => m.toLowerCase().includes(modelQuery.toLowerCase()))
  }, [brand, modelQuery])

  const variants = useMemo(() => catalog[brand]?.[model]?.variants ?? [], [brand, model])
  const ramOptions = useMemo(() => [...new Set(variants.map(v => v.ram))], [variants])
  const storageOptions = useMemo(() => {
    return [...new Set(variants.filter(v => v.ram === ram).map(v => v.storage))]
  }, [variants, ram])

  const estimate = useMemo(() => {
    if (!brand || !model || !ram || !storage) return null
    return estimateSellingPrice({ brand, model, ram, storage, screenCondition: screen, bodyCondition: body, batteryHealth: battery, accessories })
  }, [brand, model, ram, storage, screen, body, battery, accessories])

  const timeSlots = ['9:00 AM – 12:00 PM', '12:00 PM – 3:00 PM', '3:00 PM – 6:00 PM']

  function selectBrand(b) { setBrand(b); setModel(''); setModelQuery(''); setRam(''); setStorage(''); setStep(2) }
  function selectModel(m) {
    setModel(m)
    const first = catalog[brand]?.[m]?.variants?.[0]
    setRam(first?.ram || '')
    setStorage(first?.storage || '')
    setStep(3)
  }
  function reset() { setBrand(''); setModel(''); setRam(''); setStorage(''); setModelQuery(''); setScreen('Good'); setBody('Good'); setBattery('80% - 89%'); setAccessories('Original charger only'); setPickupDate(''); setPickupTime(''); setSelectedAddr(null); setStep(1) }

  function submitOrder() {
    const order = {
      id: 'ORD-' + Math.random().toString(16).slice(2,8).toUpperCase(),
      brand, model, ram, storage, estimate: estimate?.finalPrice,
      pickupDate, pickupTime, address: selectedAddr,
      payMethod, status: 'Pickup Scheduled', createdAt: new Date().toISOString()
    }
    const existing = JSON.parse(localStorage.getItem('baskaro_orders') || '[]')
    localStorage.setItem('baskaro_orders', JSON.stringify([order, ...existing]))
    setStep(7)
  }

  const stepLabel = ['', 'Select Brand', 'Select Model', 'Select Variant', 'Rate Condition', 'Price Estimate', 'Schedule Pickup', 'Confirmed'][step]

  return (
    <div className="max-w-3xl">
      {/* Header row */}
      <div className="mb-6 flex items-center gap-4">
        {step > 1 && step < 7 && (
          <button onClick={() => setStep(s => Math.max(1, s-1))}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-black text-slate-900">Sell your Phone</h1>
          <p className="text-sm font-semibold text-slate-400">Step {step} of 6 — {stepLabel}</p>
        </div>
      </div>

      {/* Progress bar */}
      {step < 7 && (
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-500"
            style={{ width: `${Math.round(((step-1)/6)*100)}%` }} />
        </div>
      )}

      {/* ── Step 1: Brand ── */}
      {step === 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {brands.map(b => (
            <button key={b} onClick={() => selectBrand(b)}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-4 transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-lg hover:shadow-red-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-2xl font-black text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 transition-all">
                {b[0]}
              </div>
              <span className="text-sm font-black text-slate-800 group-hover:text-red-700">{b}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Step 2: Model ── */}
      {step === 2 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <Label>Search model</Label>
            <Input value={modelQuery} onChange={setModelQuery} placeholder={`Search ${brand} models…`} autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {models.map(m => (
              <button key={m} onClick={() => selectModel(m)}
                className="rounded-xl border-2 border-slate-100 bg-slate-50 p-3 text-center text-sm font-bold text-slate-800 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700"
              >
                {m}
              </button>
            ))}
            {models.length === 0 && (
              <p className="col-span-3 py-8 text-center text-sm font-semibold text-slate-400">No models found</p>
            )}
          </div>
        </div>
      )}

      {/* ── Step 3: Variant ── */}
      {step === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-sm font-bold text-slate-500">
            {brand} {model}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>RAM</Label>
              <Select value={ram} onChange={v => { setRam(v); setStorage(variants.find(x=>x.ram===v)?.storage||'') }}
                options={ramOptions} placeholder="Select RAM" />
            </div>
            <div><Label>Storage</Label>
              <Select value={storage} onChange={setStorage} options={storageOptions} placeholder="Select Storage" />
            </div>
          </div>
          <button disabled={!ram || !storage} onClick={() => setStep(4)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* ── Step 4: Condition ── */}
      {step === 4 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-5 text-sm font-bold text-slate-500">{brand} {model} · {ram} / {storage}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Screen Condition</Label>
              <Select value={screen} onChange={setScreen} options={SCREEN_OPTIONS} />
            </div>
            <div><Label>Body Condition</Label>
              <Select value={body} onChange={setBody} options={BODY_OPTIONS} />
            </div>
            <div><Label>Battery Health</Label>
              <Select value={battery} onChange={setBattery} options={BATTERY_OPTIONS} />
            </div>
            <div><Label>Accessories</Label>
              <Select value={accessories} onChange={setAccessories} options={ACC_OPTIONS} />
            </div>
          </div>

          {/* Condition guide */}
          <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-700">
            💡 Be honest — our agent will verify the condition at pickup. Better condition = higher payout.
          </div>

          <button onClick={() => setStep(5)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            Get Price Estimate <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* ── Step 5: Estimate ── */}
      {step === 5 && (
        <div className="space-y-4">
          {/* Big price card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-xl shadow-blue-200">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/5" />
            <div className="relative">
              <p className="text-sm font-semibold text-blue-200">Estimated Offer Price</p>
              <p className="mt-2 text-5xl font-black tracking-tight">
                ₹{estimate ? fmt(estimate.finalPrice) : '—'}
              </p>
              <p className="mt-1 text-xs text-blue-300">
                Base ₹{estimate ? fmt(estimate.breakdown.basePrice) : 0} · {estimate ? Math.round(estimate.breakdown.totalDeductionPct * 100) : 0}% deducted
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                <CheckCircle size={12} /> Instant payout after device check
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-black text-slate-900">Condition Breakdown</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Screen', value: screen },
                { label: 'Body', value: body },
                { label: 'Battery', value: battery },
                { label: 'Accessories', value: accessories },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
                  <span className="font-semibold text-slate-500">{r.label}</span>
                  <span className="font-bold text-slate-800">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(4)}
              className="rounded-xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              Change Condition
            </button>
            <button onClick={() => setStep(6)}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-black text-white shadow-md shadow-red-200 hover:bg-red-700 transition-all"
            >
              Schedule Pickup <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 6: Pickup ── */}
      {step === 6 && (
        <div className="space-y-4">
          {/* Summary aside */}
          <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
            <span className="text-sm font-semibold text-green-700">{brand} {model} · {ram}/{storage}</span>
            <span className="text-lg font-black text-green-700">₹{estimate ? fmt(estimate.finalPrice) : 0}</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            {/* Date */}
            <div>
              <Label>Pickup Date</Label>
              <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Time slot pills */}
            <div>
              <Label>Pickup Time Slot</Label>
              <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setPickupTime(t)}
                    className={[
                      'flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-bold transition-all',
                      pickupTime === t
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50',
                    ].join(' ')}
                  >
                    <Clock size={13} /> {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup address */}
            <div>
              <Label>Pickup Address</Label>
              {addresses.length === 0 ? (
                <div className="mt-1 rounded-xl border-2 border-dashed border-slate-200 p-4 text-center text-sm font-semibold text-slate-400">
                  No addresses saved. <a href="#" onClick={e => { e.preventDefault() }} className="text-blue-600 hover:underline">Go to Addresses tab to add one.</a>
                </div>
              ) : (
                <div className="mt-1 space-y-2">
                  {addresses.map((a, i) => (
                    <button key={i} onClick={() => setSelectedAddr(a)}
                      className={[
                        'w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all',
                        selectedAddr === a
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300',
                      ].join(' ')}
                    >
                      <div className="font-black text-slate-900">{a.label}</div>
                      <div className="mt-0.5 font-semibold text-slate-500">{a.line1}, {a.city} – {a.pincode}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment */}
            <div>
              <Label>Payment Method</Label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {['UPI', 'Bank Transfer'].map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    className={[
                      'rounded-xl border-2 py-2.5 text-sm font-bold transition-all',
                      payMethod === m ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-red-300',
                    ].join(' ')}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={!pickupDate || !pickupTime || !selectedAddr}
            onClick={submitOrder}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-black text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle size={16} /> Confirm Sell Request
          </button>
        </div>
      )}

      {/* ── Step 7: Confirmed ── */}
      {step === 7 && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-4 ring-green-100">
            <CheckCircle size={44} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Request Confirmed!</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Your pickup is scheduled for <strong>{pickupDate}</strong> · <strong>{pickupTime}</strong>
          </p>
          <p className="mt-1 text-sm text-slate-400">Our agent will contact you before pickup.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={reset}
              className="rounded-xl border-2 border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Sell Another
            </button>
            <button onClick={reset}
              className="rounded-xl bg-blue-600 py-2.5 text-sm font-black text-white shadow-md hover:bg-blue-700"
            >
              View Orders
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: MY ORDERS
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  'Pickup Scheduled':  { color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  'Device Received':   { color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  'Payment Completed': { color: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
}

function OrdersTab() {
  const orders = JSON.parse(localStorage.getItem('baskaro_orders') || '[]')

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-4xl">📦</div>
        <h2 className="text-xl font-black text-slate-800">No orders yet</h2>
        <p className="mt-1 text-sm font-semibold text-slate-400">Sell your first phone to see your orders here.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-black text-slate-900">My Sell Orders</h1>
      <div className="space-y-4">
        {orders.map(o => {
          const cfg = STATUS_CONFIG[o.status] || STATUS_CONFIG['Pickup Scheduled']
          return (
            <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-black text-slate-900">{o.brand} {o.model}</p>
                  <p className="text-xs font-semibold text-slate-400">{o.ram} / {o.storage} · Order {o.id}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${cfg.color}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  {o.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12}/> {o.pickupDate}</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {o.pickupTime}</span>
                <span className="flex items-center gap-1">💳 {o.payMethod}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                <span className="text-xs font-semibold text-slate-400">Estimated Payout</span>
                <span className="text-lg font-black text-green-600">₹{fmt(o.estimate || 0)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function ProfileTab({ user }) {
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [saved, setSaved] = useState(false)

  function save(e) {
    e.preventDefault()
    setUser({ ...user, name, email, phone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-black text-slate-900">My Profile</h1>

      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white">
          {(name || phone || 'U')[0].toUpperCase()}
        </div>
        <div>
          <p className="text-base font-black text-slate-900">{name || 'Your Name'}</p>
          <p className="text-sm font-semibold text-slate-400">{phone || email || 'No contact info'}</p>
        </div>
      </div>

      <form onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div><Label>Full Name</Label><Input value={name} onChange={setName} placeholder="Enter your name" /></div>
        <div><Label>Email Address</Label><Input value={email} onChange={setEmail} placeholder="you@email.com" type="email" /></div>
        <div>
          <Label>Mobile Number</Label>
          <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-3 focus-within:border-blue-500 transition">
            <span className="text-sm font-black text-slate-400">+91</span>
            <div className="h-5 w-px bg-slate-200" />
            <input
              type="tel" inputMode="numeric" maxLength={10}
              value={phone.replace('+91','').trim()} onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
              placeholder="9876543210"
              className="h-11 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>

        <button type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          {saved ? <><CheckCircle size={15}/> Saved!</> : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: ADDRESSES
// ─────────────────────────────────────────────────────────────────────────────
function AddressTab() {
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('baskaro_addresses') || '[]'))
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ label: 'Home', line1: '', city: '', state: '', pincode: '' })

  function save() {
    if (!form.line1 || !form.city || !form.pincode) return
    const next = [...addresses, form]
    setAddresses(next)
    localStorage.setItem('baskaro_addresses', JSON.stringify(next))
    setAdding(false)
    setForm({ label: 'Home', line1: '', city: '', state: '', pincode: '' })
  }
  function remove(idx) {
    const next = addresses.filter((_, i) => i !== idx)
    setAddresses(next)
    localStorage.setItem('baskaro_addresses', JSON.stringify(next))
  }

  return (
    <div className="max-w-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Pickup Addresses</h1>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          <Plus size={15} /> Add New
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 space-y-3"
          >
            <h3 className="text-sm font-black text-blue-800">New Address</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Label</Label>
                <Select value={form.label} onChange={v => setForm(f=>({...f,label:v}))} options={['Home','Work','Other']} />
              </div>
              <div className="sm:col-span-2">
                <Label>Street / House No.</Label>
                <Input value={form.line1} onChange={v => setForm(f=>({...f,line1:v}))} placeholder="123, Main Street" />
              </div>
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={v => setForm(f=>({...f,city:v}))} placeholder="Delhi" />
              </div>
              <div>
                <Label>State</Label>
                <Input value={form.state} onChange={v => setForm(f=>({...f,state:v}))} placeholder="Delhi" />
              </div>
              <div>
                <Label>Pincode</Label>
                <Input value={form.pincode} onChange={v => setForm(f=>({...f,pincode:v.replace(/\D/,'').slice(0,6)}))} placeholder="110001" inputMode="numeric" maxLength={6} />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setAdding(false)} className="flex-1 rounded-xl border-2 border-slate-200 py-2 text-sm font-bold text-slate-600 hover:bg-white">Cancel</button>
              <button onClick={save} className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-black text-white shadow-md hover:bg-blue-700">Save Address</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {addresses.length === 0 && !adding ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-14 text-center">
          <MapPin size={36} className="mb-3 text-slate-300" />
          <p className="text-sm font-black text-slate-500">No addresses saved</p>
          <p className="text-xs font-semibold text-slate-400">Add an address so we can pick up your device</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((a, i) => (
            <div key={i} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Home size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">{a.label}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{a.line1}, {a.city} {a.state && `(${a.state})`} – {a.pincode}</p>
              </div>
              <button onClick={() => remove(i)} className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
