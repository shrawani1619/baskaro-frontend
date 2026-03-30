import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone, User, MapPin, Package, LogOut, ChevronRight, ChevronDown,
  CheckCircle, Calendar, Clock, Plus, Trash2, Home,
  ArrowLeft, ArrowRight, RefreshCw, Phone, CreditCard,
  Truck, ShieldCheck, BadgeCheck, AlertCircle, Copy, X
} from 'lucide-react'
import { catalog } from '../mock/catalog.js'
import { estimateSellingPrice } from '../lib/pricing/estimatePrice.js'
import { getUser, logout as performLogout, setUser } from '../lib/auth.js'

// ─── Constants ────────────────────────────────────────────────────────────────
const SCREEN_OPTIONS  = ['Excellent', 'Good', 'Fair', 'Bad / Cracked']
const BODY_OPTIONS    = ['Excellent', 'Good', 'Fair', 'Bad / Scratched']
const BATTERY_OPTIONS = ['90% - 100%', '80% - 89%', '60% - 79%', 'Below 60%']
const ACC_OPTIONS     = ['Original box + all accessories', 'Original charger only', 'No charger / no box', 'No accessories']

const ORDER_STATUSES = [
  { key: 'Request Submitted', Icon: AlertCircle,  color: 'text-slate-500',  bg: 'bg-slate-100',   fill: 'bg-slate-500'   },
  { key: 'Pickup Scheduled',  Icon: Truck,        color: 'text-blue-600',   bg: 'bg-blue-100',    fill: 'bg-blue-600'    },
  { key: 'Device Received',   Icon: ShieldCheck,  color: 'text-orange-600', bg: 'bg-orange-100',  fill: 'bg-orange-500'  },
  { key: 'Payment Completed', Icon: BadgeCheck,   color: 'text-green-600',  bg: 'bg-green-100',   fill: 'bg-green-500'   },
]

function fmt(n) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)
}
function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) }
  catch { return '' }
}

// ─── Reusable form primitives ─────────────────────────────────────────────────
function Label({ children }) {
  return <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-400">{children}</label>
}
function DSelect({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}
function DInput({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      {...rest}
    />
  )
}

// ─── Protected shell ──────────────────────────────────────────────────────────
export default function UserDashboard() {
  const navigate = useNavigate()
  const user = getUser()
  useEffect(() => { if (!user) navigate('/login', { replace: true }) }, [])
  if (!user) return null
  return <DashboardShell user={user} navigate={navigate} />
}

// ─── Shell ────────────────────────────────────────────────────────────────────
function DashboardShell({ user, navigate }) {
  const [tab, setTab] = useState('sell')

  function logout() { performLogout(); navigate('/') }

  const tabs = [
    { id: 'sell',    Icon: Smartphone, label: 'Sell Phone' },
    { id: 'orders',  Icon: Package,    label: 'My Orders'  },
    { id: 'profile', Icon: User,       label: 'Profile'    },
    { id: 'address', Icon: MapPin,     label: 'Addresses'  },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Outfit']">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white shadow-sm shrink-0">
        <div className="flex h-16 items-center border-b border-slate-100 px-6">
          <Link to="/">
            <img src="/logo.png" alt="BAS karo" className="h-8 w-auto object-contain"
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block' }} />
            <span style={{display:'none'}} className="text-xl font-black text-slate-900">BAS<span className="text-red-600">karo</span></span>
          </Link>
        </div>
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
        <nav className="mt-6 flex-1 px-3 space-y-1">
          {tabs.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={['flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all',
                tab === id ? 'bg-red-600 text-white shadow-md shadow-red-200' : 'text-slate-600 hover:bg-slate-100'].join(' ')}
            >
              <Icon size={17} />{label}
              {tab === id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {tab === 'sell'    && <SellTab onViewOrders={() => setTab('orders')} />}
              {tab === 'orders'  && <OrdersTab />}
              {tab === 'profile' && <ProfileTab user={user} />}
              {tab === 'address' && <AddressTab />}
            </motion.div>
          </AnimatePresence>
        </main>

        <nav className="flex border-t border-slate-200 bg-white md:hidden">
          {tabs.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={['flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-bold transition-colors',
                tab === id ? 'text-red-600' : 'text-slate-400'].join(' ')}
            >
              <Icon size={20} />{label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SELL PHONE TAB
// ─────────────────────────────────────────────────────────────────────────────
function SellTab({ onViewOrders }) {
  const [step, setStep] = useState(1)
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
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [selectedAddr, setSelectedAddr] = useState(null)
  const [payMethod, setPayMethod] = useState('UPI')
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  const addresses = useMemo(() => JSON.parse(localStorage.getItem('baskaro_addresses') || '[]'), [step])
  const models = useMemo(() => {
    const all = Object.keys(catalog[brand] ?? {})
    return modelQuery.trim() ? all.filter(m => m.toLowerCase().includes(modelQuery.toLowerCase())) : all
  }, [brand, modelQuery])
  const variants = useMemo(() => catalog[brand]?.[model]?.variants ?? [], [brand, model])
  const ramOptions = useMemo(() => [...new Set(variants.map(v => v.ram))], [variants])
  const storageOptions = useMemo(() => [...new Set(variants.filter(v => v.ram === ram).map(v => v.storage))], [variants, ram])
  const estimate = useMemo(() => {
    if (!brand || !model || !ram || !storage) return null
    return estimateSellingPrice({ brand, model, ram, storage, screenCondition: screen, bodyCondition: body, batteryHealth: battery, accessories })
  }, [brand, model, ram, storage, screen, body, battery, accessories])

  const timeSlots = ['9:00 AM – 12:00 PM', '12:00 PM – 3:00 PM', '3:00 PM – 6:00 PM']
  const stepLabels = ['', 'Select Brand', 'Select Model', 'Select Variant', 'Rate Condition', 'Price Estimate', 'Schedule Pickup', 'Confirmed']

  function selectBrand(b) { setBrand(b); setModel(''); setModelQuery(''); setRam(''); setStorage(''); setStep(2) }
  function selectModel(m) {
    setModel(m)
    const first = catalog[brand]?.[m]?.variants?.[0]
    setRam(first?.ram || ''); setStorage(first?.storage || ''); setStep(3)
  }
  function reset() {
    setBrand(''); setModel(''); setRam(''); setStorage(''); setModelQuery('')
    setScreen('Good'); setBody('Good'); setBattery('80% - 89%'); setAccessories('Original charger only')
    setPickupDate(''); setPickupTime(''); setSelectedAddr(null); setConfirmedOrder(null); setStep(1)
  }
  function submitOrder() {
    const order = {
      id: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      brand, model, ram, storage,
      estimate: estimate?.finalPrice,
      basePrice: estimate?.breakdown?.basePrice,
      deductionPct: estimate?.breakdown?.totalDeductionPct,
      screen, body, battery, accessories,
      pickupDate, pickupTime,
      address: selectedAddr,
      payMethod,
      status: 'Request Submitted',
      statusHistory: [{ status: 'Request Submitted', at: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      paymentDetails: null,
    }
    const existing = JSON.parse(localStorage.getItem('baskaro_orders') || '[]')
    localStorage.setItem('baskaro_orders', JSON.stringify([order, ...existing]))
    setConfirmedOrder(order)
    setStep(7)
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        {step > 1 && step < 7 && (
          <button onClick={() => setStep(s => Math.max(1, s - 1))}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all"
          ><ArrowLeft size={16} /></button>
        )}
        <div>
          <h1 className="text-2xl font-black text-slate-900">Sell your Phone</h1>
          <p className="text-sm font-semibold text-slate-400">Step {Math.min(step, 6)} of 6 — {stepLabels[step]}</p>
        </div>
      </div>

      {step < 7 && (
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-500"
            style={{ width: `${Math.round(((step - 1) / 6) * 100)}%` }} />
        </div>
      )}

      {/* Step 1: Brand */}
      {step === 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {brands.map(b => (
            <button key={b} onClick={() => selectBrand(b)}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-4 transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-lg hover:shadow-red-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-2xl font-black text-slate-700 group-hover:bg-red-50 group-hover:text-red-600 transition-all">{b[0]}</div>
              <span className="text-sm font-black text-slate-800 group-hover:text-red-700">{b}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Model */}
      {step === 2 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4"><Label>Search model</Label><DInput value={modelQuery} onChange={setModelQuery} placeholder={`Search ${brand} models…`} autoFocus /></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {models.map(m => (
              <button key={m} onClick={() => selectModel(m)}
                className="rounded-xl border-2 border-slate-100 bg-slate-50 p-3 text-center text-sm font-bold text-slate-800 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700"
              >{m}</button>
            ))}
            {models.length === 0 && <p className="col-span-3 py-8 text-center text-sm text-slate-400">No models found</p>}
          </div>
        </div>
      )}

      {/* Step 3: Variant */}
      {step === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-4 text-sm font-bold text-slate-500">{brand} {model}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>RAM</Label><DSelect value={ram} onChange={v => { setRam(v); setStorage(variants.find(x => x.ram === v)?.storage || '') }} options={ramOptions} placeholder="Select RAM" /></div>
            <div><Label>Storage</Label><DSelect value={storage} onChange={setStorage} options={storageOptions} placeholder="Select Storage" /></div>
          </div>
          <button disabled={!ram || !storage} onClick={() => setStep(4)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >Continue <ArrowRight size={15} /></button>
        </div>
      )}

      {/* Step 4: Condition */}
      {step === 4 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-5 text-sm font-bold text-slate-500">{brand} {model} · {ram} / {storage}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label>Screen Condition</Label><DSelect value={screen} onChange={setScreen} options={SCREEN_OPTIONS} /></div>
            <div><Label>Body Condition</Label><DSelect value={body} onChange={setBody} options={BODY_OPTIONS} /></div>
            <div><Label>Battery Health</Label><DSelect value={battery} onChange={setBattery} options={BATTERY_OPTIONS} /></div>
            <div><Label>Accessories</Label><DSelect value={accessories} onChange={setAccessories} options={ACC_OPTIONS} /></div>
          </div>
          <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-700">
            💡 Be honest — our agent verifies condition at pickup. Better condition = higher payout.
          </div>
          <button onClick={() => setStep(5)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
            Get Price Estimate <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Step 5: Estimate */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-xl shadow-blue-200">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/5" />
            <div className="relative">
              <p className="text-sm font-semibold text-blue-200">Estimated Offer Price</p>
              <p className="mt-2 text-5xl font-black tracking-tight">₹{estimate ? fmt(estimate.finalPrice) : '—'}</p>
              <p className="mt-1 text-xs text-blue-300">Base ₹{estimate ? fmt(estimate.breakdown.basePrice) : 0} · {estimate ? Math.round(estimate.breakdown.totalDeductionPct * 100) : 0}% deducted</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                <CheckCircle size={12} /> Instant payout after device check
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-black text-slate-900">Condition Breakdown</h3>
            <div className="space-y-2 text-sm">
              {[['Screen', screen], ['Body', body], ['Battery', battery], ['Accessories', accessories]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
                  <span className="font-semibold text-slate-500">{l}</span>
                  <span className="font-bold text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(4)} className="rounded-xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Change Condition</button>
            <button onClick={() => setStep(6)} className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-black text-white shadow-md shadow-red-200 hover:bg-red-700 transition-all">
              Schedule Pickup <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Pickup & Payment */}
      {step === 6 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
            <span className="text-sm font-semibold text-green-700">{brand} {model} · {ram}/{storage}</span>
            <span className="text-lg font-black text-green-700">₹{estimate ? fmt(estimate.finalPrice) : 0}</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
            <div>
              <Label>Pickup Date</Label>
              <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div>
              <Label>Pickup Time Slot</Label>
              <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setPickupTime(t)}
                    className={['flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-bold transition-all',
                      pickupTime === t ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'].join(' ')}
                  ><Clock size={13} /> {t}</button>
                ))}
              </div>
            </div>
            <div>
              <Label>Pickup Address</Label>
              {addresses.length === 0 ? (
                // Inline quick-add when no address is saved
                <InlineAddressForm onSaved={a => setSelectedAddr(a)} />
              ) : (
                <div className="mt-1 space-y-2">
                  {addresses.map((a, i) => (
                    <button key={i} onClick={() => setSelectedAddr(a)}
                      className={['w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all',
                        selectedAddr === a ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'].join(' ')}
                    >
                      <div className="font-black text-slate-900">{a.label}</div>
                      <div className="mt-0.5 font-semibold text-slate-500">{a.line1}, {a.city} – {a.pincode}</div>
                    </button>
                  ))}
                  {/* Allow adding another address inline too */}
                  {!selectedAddr && (
                    <p className="text-xs font-semibold text-slate-400 px-1">👆 Select an address above to continue.</p>
                  )}
                </div>
              )}
            </div>
            <div>
              <Label>Payment Method (after verification)</Label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {['UPI', 'Bank Transfer'].map(m => (
                  <button key={m} onClick={() => setPayMethod(m)}
                    className={['rounded-xl border-2 py-2.5 text-sm font-bold transition-all',
                      payMethod === m ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-600 hover:border-red-300'].join(' ')}
                  >{m}</button>
                ))}
              </div>
              <p className="mt-2 text-[11px] font-semibold text-slate-400">Payment is released only after device condition is verified at pickup.</p>
            </div>
          </div>
          <button disabled={!pickupDate || !pickupTime} onClick={submitOrder}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-black text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
          ><CheckCircle size={16} /> Confirm Sell Request</button>
        </div>
      )}

      {/* Step 7: Confirmation */}
      {step === 7 && confirmedOrder && (
        <OrderConfirmation order={confirmedOrder} onSellAnother={reset} onViewOrders={onViewOrders} />
      )}
    </div>
  )
}


// ─── Inline Address Form (used in step 6 when no address saved) ───────────────
function InlineAddressForm({ onSaved }) {
  const [line1, setLine1] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [label, setLabel] = useState('Home')
  const [saved, setSaved] = useState(false)

  function save() {
    if (!line1 || !city || !pincode) return
    const addr = { label, line1, city, state: '', pincode }
    // persist to addresses list too
    const existing = JSON.parse(localStorage.getItem('baskaro_addresses') || '[]')
    localStorage.setItem('baskaro_addresses', JSON.stringify([...existing, addr]))
    setSaved(true)
    onSaved(addr)
  }

  if (saved) {
    return (
      <div className="mt-1 flex items-center gap-2 rounded-xl border-2 border-green-400 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
        <CheckCircle size={15} /> Address saved — ready to confirm!
      </div>
    )
  }

  return (
    <div className="mt-1 rounded-xl border-2 border-blue-200 bg-blue-50 p-4 space-y-3">
      <p className="text-xs font-black uppercase tracking-wider text-blue-700">Add Pickup Address</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>Label</Label>
          <select value={label} onChange={e => setLabel(e.target.value)}
            className="h-11 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
          >
            {['Home', 'Work', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label>Street / House No.</Label>
          <input value={line1} onChange={e => setLine1(e.target.value)} placeholder="123, Main Street"
            className="h-11 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300 focus:border-blue-500"
          />
        </div>
        <div>
          <Label>City</Label>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="Delhi"
            className="h-11 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300 focus:border-blue-500"
          />
        </div>
        <div>
          <Label>Pincode</Label>
          <input value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="110001" inputMode="numeric" maxLength={6}
            className="h-11 w-full rounded-xl border-2 border-blue-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300 focus:border-blue-500"
          />
        </div>
      </div>
      <button onClick={save} disabled={!line1 || !city || !pincode}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-black text-white shadow-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <CheckCircle size={14} /> Save &amp; Use This Address
      </button>
    </div>
  )
}

// ─── Order Confirmation screen ────────────────────────────────────────────────

function OrderConfirmation({ order, onSellAnother, onViewOrders }) {
  const [copied, setCopied] = useState(false)
  function copyId() {
    navigator.clipboard?.writeText(order.id)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <motion.div initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
      {/* Success banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl shadow-green-200">
        <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full bg-white/10" />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20"
        ><CheckCircle size={32} className="text-white" /></motion.div>
        <h2 className="text-2xl font-black">Request Confirmed! 🎉</h2>
        <p className="mt-1 text-sm text-green-100">Your sell request has been received. We'll contact you before pickup.</p>
      </div>

      {/* Order ID card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Order ID</p>
            <p className="mt-1 text-xl font-black text-blue-600">{order.id}</p>
          </div>
          <button onClick={copyId}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all"
          ><Copy size={13} />{copied ? 'Copied!' : 'Copy'}</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div><p className="font-semibold text-slate-400">Device</p><p className="font-black text-slate-900">{order.brand} {order.model}</p></div>
          <div><p className="font-semibold text-slate-400">Variant</p><p className="font-black text-slate-900">{order.ram} / {order.storage}</p></div>
          <div><p className="font-semibold text-slate-400">Pickup Date</p><p className="font-black text-slate-900">{order.pickupDate}</p></div>
          <div><p className="font-semibold text-slate-400">Time Slot</p><p className="font-black text-slate-900">{order.pickupTime}</p></div>
          <div><p className="font-semibold text-slate-400">Payment</p><p className="font-black text-slate-900">{order.payMethod}</p></div>
          <div><p className="font-semibold text-slate-400">Offer Price</p><p className="text-lg font-black text-green-600">₹{fmt(order.estimate)}</p></div>
        </div>
      </div>

      {/* Status pipeline preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-4 text-sm font-black text-slate-900">Track your order progress</p>
        <StatusTimeline currentStatus="Request Submitted" history={order.statusHistory} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onSellAnother} className="rounded-xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Sell Another</button>
        <button onClick={onViewOrders} className="rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md hover:bg-blue-700">View My Orders</button>
      </div>
    </motion.div>
  )
}

// ─── Status Timeline ──────────────────────────────────────────────────────────
function StatusTimeline({ currentStatus, history = [] }) {
  const currentIdx = ORDER_STATUSES.findIndex(s => s.key === currentStatus)
  return (
    <div className="relative">
      {ORDER_STATUSES.map((s, i) => {
        const done = i <= currentIdx
        const active = i === currentIdx
        const histEntry = history?.find(h => h.status === s.key)
        return (
          <div key={s.key} className="flex gap-4">
            {/* Line + dot column */}
            <div className="flex flex-col items-center">
              <div className={['flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all',
                done ? (active ? `${s.bg} ring-2 ring-offset-2 ring-${s.fill?.replace('bg-', '')}` : s.bg) : 'bg-slate-100'].join(' ')}
              >
                <s.Icon size={15} className={done ? s.color : 'text-slate-300'} />
              </div>
              {i < ORDER_STATUSES.length - 1 && (
                <div className={['w-0.5 flex-1 my-1 rounded-full transition-all', i < currentIdx ? s.fill : 'bg-slate-200'].join(' ')} style={{ minHeight: '24px' }} />
              )}
            </div>
            {/* Text */}
            <div className="pb-5 pt-1">
              <p className={['text-sm font-black transition-colors', done ? 'text-slate-900' : 'text-slate-400'].join(' ')}>{s.key}</p>
              {histEntry && <p className="text-[11px] font-semibold text-slate-400">{fmtDate(histEntry.at)}</p>}
              {active && <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-black text-blue-700">Current</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MY ORDERS TAB
// ─────────────────────────────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('baskaro_orders') || '[]'))
  const [expandedId, setExpandedId] = useState(null)
  const [payingId, setPayingId] = useState(null)

  function refreshOrders() {
    setOrders(JSON.parse(localStorage.getItem('baskaro_orders') || '[]'))
  }

  function updateOrderStatus(id, newStatus, paymentDetails) {
    const updated = orders.map(o => {
      if (o.id !== id) return o
      const history = [...(o.statusHistory || []), { status: newStatus, at: new Date().toISOString() }]
      return { ...o, status: newStatus, statusHistory: history, ...(paymentDetails ? { paymentDetails } : {}) }
    })
    setOrders(updated)
    localStorage.setItem('baskaro_orders', JSON.stringify(updated))
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-4xl">📦</div>
        <h2 className="text-xl font-black text-slate-800">No orders yet</h2>
        <p className="mt-1 text-sm font-semibold text-slate-400">Sell your first phone to track orders here.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">My Sell Orders</h1>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="space-y-4">
        {orders.map(o => (
          <OrderCard
            key={o.id} order={o}
            expanded={expandedId === o.id}
            onToggle={() => setExpandedId(expandedId === o.id ? null : o.id)}
            onUpdateStatus={updateOrderStatus}
            payingId={payingId}
            setPayingId={setPayingId}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Single Order Card ────────────────────────────────────────────────────────
function OrderCard({ order, expanded, onToggle, onUpdateStatus, payingId, setPayingId }) {
  const statusCfg = ORDER_STATUSES.find(s => s.key === order.status) || ORDER_STATUSES[0]
  const currentIdx = ORDER_STATUSES.findIndex(s => s.key === order.status)
  const isPaying = payingId === order.id
  const [upiId, setUpiId] = useState('')
  const [bankAcc, setBankAcc] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [payLoading, setPayLoading] = useState(false)
  const [payDone, setPayDone] = useState(false)

  function initiatePayment(e) {
    e.preventDefault()
    if (order.payMethod === 'UPI' && !upiId) return
    if (order.payMethod === 'Bank Transfer' && (!bankAcc || !ifsc)) return
    setPayLoading(true)
    setTimeout(() => {
      setPayLoading(false); setPayDone(true)
      const details = order.payMethod === 'UPI' ? { upiId } : { accountNo: bankAcc, ifsc }
      onUpdateStatus(order.id, 'Payment Completed', details)
      setTimeout(() => { setPayingId(null); setPayDone(false) }, 1500)
    }, 1800)
  }

  // Demo: simulate status advance
  function advanceStatus() {
    const nextIdx = Math.min(currentIdx + 1, ORDER_STATUSES.length - 1)
    if (nextIdx === currentIdx) return
    onUpdateStatus(order.id, ORDER_STATUSES[nextIdx].key, null)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <button onClick={onToggle} className="w-full p-5 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base font-black text-slate-900">{order.brand} {order.model}</p>
              <span className="text-xs font-semibold text-slate-400">{order.ram}/{order.storage}</span>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-slate-400">Order {order.id} · {fmtDate(order.createdAt)}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${statusCfg.bg} ${statusCfg.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusCfg.fill}`} />
              {order.status}
            </span>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-700"
            style={{ width: `${((currentIdx) / (ORDER_STATUSES.length - 1)) * 100}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] font-bold uppercase tracking-wider text-slate-300">
          {ORDER_STATUSES.map(s => <span key={s.key}>{s.key.split(' ')[0]}</span>)}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-5">
              {/* Full status timeline */}
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-400">Order Status Timeline</p>
                <StatusTimeline currentStatus={order.status} history={order.statusHistory} />
              </div>

              {/* Order details */}
              <div className="rounded-xl bg-slate-50 p-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs font-semibold text-slate-400">Pickup Date</p><p className="font-black text-slate-900 flex items-center gap-1"><Calendar size={12}/> {order.pickupDate}</p></div>
                <div><p className="text-xs font-semibold text-slate-400">Time Slot</p><p className="font-black text-slate-900 flex items-center gap-1"><Clock size={12}/> {order.pickupTime}</p></div>
                <div><p className="text-xs font-semibold text-slate-400">Payment Method</p><p className="font-black text-slate-900">{order.payMethod}</p></div>
                <div><p className="text-xs font-semibold text-slate-400">Estimated Payout</p><p className="text-base font-black text-green-600">₹{fmt(order.estimate || 0)}</p></div>
                {order.address && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400">Pickup Address</p>
                    <p className="font-bold text-slate-800">{order.address.label}: {order.address.line1}, {order.address.city} – {order.address.pincode}</p>
                  </div>
                )}
              </div>

              {/* Condition summary */}
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">Device Condition</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[['Screen', order.screen], ['Body', order.body], ['Battery', order.battery], ['Accessories', order.accessories]].map(([l, v]) => (
                    <div key={l} className="rounded-lg border border-slate-100 px-3 py-2">
                      <span className="font-semibold text-slate-400">{l}: </span>
                      <span className="font-black text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Payment Section (shows when Device Received) ── */}
              {order.status === 'Device Received' && !order.paymentDetails && (
                <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CreditCard size={16} className="text-orange-600" />
                    <p className="text-sm font-black text-orange-800">Device verified! Initiate your payout</p>
                  </div>
                  <p className="mb-4 text-xs font-semibold text-orange-700">Our agent has received and verified yer device. Enter your {order.payMethod} details to receive ₹{fmt(order.estimate)}.</p>

                  {!isPaying ? (
                    <button onClick={() => setPayingId(order.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-black text-white shadow-md shadow-orange-200 hover:bg-orange-600 transition-all"
                    ><CreditCard size={15} /> Enter Payment Details</button>
                  ) : (
                    <form onSubmit={initiatePayment} className="space-y-3">
                      {payDone ? (
                        <div className="flex items-center justify-center gap-2 py-3 text-green-700 font-black"><CheckCircle size={18}/> Payment initiated!</div>
                      ) : (
                        <>
                          {order.payMethod === 'UPI' ? (
                            <div>
                              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-orange-700">UPI ID</label>
                              <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi"
                                className="h-11 w-full rounded-xl border-2 border-orange-200 bg-white px-3 text-sm font-semibold outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                              />
                            </div>
                          ) : (
                            <>
                              <div>
                                <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-orange-700">Account Number</label>
                                <input value={bankAcc} onChange={e => setBankAcc(e.target.value)} placeholder="Enter account number"
                                  className="h-11 w-full rounded-xl border-2 border-orange-200 bg-white px-3 text-sm font-semibold outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                                />
                              </div>
                              <div>
                                <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-orange-700">IFSC Code</label>
                                <input value={ifsc} onChange={e => setIfsc(e.target.value.toUpperCase())} placeholder="SBIN0001234"
                                  className="h-11 w-full rounded-xl border-2 border-orange-200 bg-white px-3 text-sm font-semibold outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                                />
                              </div>
                            </>
                          )}
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setPayingId(null)} className="flex-1 rounded-xl border-2 border-slate-200 py-2 text-sm font-bold text-slate-600 hover:bg-white">Cancel</button>
                            <button type="submit" disabled={payLoading}
                              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-2 text-sm font-black text-white hover:bg-orange-600 disabled:opacity-60"
                            >
                              {payLoading ? <RefreshCw size={14} className="animate-spin" /> : <><CheckCircle size={14}/> Confirm</>}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </div>
              )}

              {/* Payment complete receipt */}
              {order.status === 'Payment Completed' && order.paymentDetails && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-2 mb-2"><BadgeCheck size={16} className="text-green-600"/><p className="text-sm font-black text-green-800">Payment Completed!</p></div>
                  <div className="text-xs font-semibold text-green-700 space-y-1">
                    {order.paymentDetails.upiId && <p>UPI: {order.paymentDetails.upiId}</p>}
                    {order.paymentDetails.accountNo && <><p>Account: ••••{order.paymentDetails.accountNo.slice(-4)}</p><p>IFSC: {order.paymentDetails.ifsc}</p></>}
                    <p className="text-base font-black text-green-700 pt-1">₹{fmt(order.estimate)} transferred ✓</p>
                  </div>
                </div>
              )}

              {/* Demo: advance status button (hidden in production) */}
              {order.status !== 'Payment Completed' && (
                <button onClick={advanceStatus}
                  className="w-full rounded-xl border-2 border-dashed border-slate-200 py-2 text-xs font-bold text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all"
                >
                  🔧 Demo: Advance to next status
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE TAB
// ─────────────────────────────────────────────────────────────────────────────
function ProfileTab({ user }) {
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone || '')
  const [saved, setSaved] = useState(false)
  function save(e) {
    e.preventDefault(); setUser({ ...user, name, email, phone })
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }
  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-2xl font-black text-slate-900">My Profile</h1>
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
        <div><Label>Full Name</Label><DInput value={name} onChange={setName} placeholder="Enter your name" /></div>
        <div><Label>Email Address</Label><DInput value={email} onChange={setEmail} placeholder="you@email.com" type="email" /></div>
        <div>
          <Label>Mobile Number</Label>
          <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-3 focus-within:border-blue-500 transition">
            <span className="text-sm font-black text-slate-400">+91</span>
            <div className="h-5 w-px bg-slate-200" />
            <input type="tel" inputMode="numeric" maxLength={10}
              value={phone.replace('+91', '').trim()} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="9876543210"
              className="h-11 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
          {saved ? <><CheckCircle size={15} /> Saved!</> : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ADDRESSES TAB
// ─────────────────────────────────────────────────────────────────────────────
function AddressTab() {
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('baskaro_addresses') || '[]'))
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ label: 'Home', line1: '', city: '', state: '', pincode: '' })
  function save() {
    if (!form.line1 || !form.city || !form.pincode) return
    const next = [...addresses, form]
    setAddresses(next); localStorage.setItem('baskaro_addresses', JSON.stringify(next))
    setAdding(false); setForm({ label: 'Home', line1: '', city: '', state: '', pincode: '' })
  }
  function remove(idx) {
    const next = addresses.filter((_, i) => i !== idx)
    setAddresses(next); localStorage.setItem('baskaro_addresses', JSON.stringify(next))
  }
  return (
    <div className="max-w-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900">Pickup Addresses</h1>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">
          <Plus size={15} /> Add New
        </button>
      </div>
      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 space-y-3"
          >
            <h3 className="text-sm font-black text-blue-800">New Address</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Label</Label><DSelect value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} options={['Home', 'Work', 'Other']} /></div>
              <div className="sm:col-span-2"><Label>Street / House No.</Label><DInput value={form.line1} onChange={v => setForm(f => ({ ...f, line1: v }))} placeholder="123, Main Street" /></div>
              <div><Label>City</Label><DInput value={form.city} onChange={v => setForm(f => ({ ...f, city: v }))} placeholder="Delhi" /></div>
              <div><Label>State</Label><DInput value={form.state} onChange={v => setForm(f => ({ ...f, state: v }))} placeholder="Delhi" /></div>
              <div><Label>Pincode</Label><DInput value={form.pincode} onChange={v => setForm(f => ({ ...f, pincode: v.replace(/\D/, '').slice(0, 6) }))} placeholder="110001" inputMode="numeric" maxLength={6} /></div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setAdding(false)} className="flex-1 rounded-xl border-2 border-slate-200 py-2 text-sm font-bold text-slate-600 hover:bg-white">Cancel</button>
              <button onClick={save} className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-black text-white shadow-md hover:bg-blue-700">Save Address</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Home size={18} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900">{a.label}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{a.line1}, {a.city} {a.state && `(${a.state})`} – {a.pincode}</p>
              </div>
              <button onClick={() => remove(i)} className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
