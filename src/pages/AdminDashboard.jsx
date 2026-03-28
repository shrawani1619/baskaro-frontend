import React, { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, ShoppingCart, Smartphone, Users, Settings, Tag,
  BarChart3, TrendingUp, Package, Truck, CheckCircle, Clock,
  Edit2, Trash2, Plus, ArrowLeft, ArrowRight, AlertCircle, MoreVertical, Search, Bell, Menu, LogOut, DollarSign, ListOrdered, ShieldCheck
} from 'lucide-react'
import { catalog as initialCatalog } from '../mock/catalog.js'

// Simple helper to format currency
function fmt(n) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n || 0)
}

function fmtDate(iso) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
  catch { return iso }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Top-level navigation
  const navItems = [
    { id: 'overview', label: 'Dashboard', Icon: LayoutDashboard },
    { id: 'orders', label: 'Orders Management', Icon: ShoppingCart },
    { id: 'catalog', label: 'Device Catalog', Icon: Smartphone },
    { id: 'customers', label: 'Customers', Icon: Users },
    { id: 'promotions', label: 'Coupons & Referrals', Icon: Tag },
    { id: 'settings', label: 'Settings', Icon: Settings },
  ]

  useEffect(() => {
    if (localStorage.getItem('baskaro_admin_auth') !== 'true') {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('baskaro_admin_auth')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Outfit']">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-slate-900 text-white md:flex xl:w-72 shrink-0">
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 font-bold shadow-lg shadow-red-500/20">A</div>
            <span className="text-xl font-black tracking-tight text-white">BAS<span className="text-red-500">admin</span></span>
          </Link>
        </div>

        <div className="px-5 py-6">
          <div className="mb-2 px-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Main Menu</div>
          <nav className="space-y-1">
            {navItems.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className={[
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all',
                  tab === id ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                ].join(' ')}
              >
                <Icon size={18} className={tab === id ? 'text-white' : 'text-slate-500'} /> {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-800 p-5">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
            <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold">SA</div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-white">Super Admin</p>
              <p className="truncate text-[10px] text-slate-400">admin@baskaro.com</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      {/* ── Main Canvas ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-black text-slate-900 hidden sm:block">Admin Workspace</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden w-64 items-center sm:flex">
              <Search size={16} className="absolute left-3 text-slate-400" />
              <input type="text" placeholder="Search orders, models..."
                className="h-9 w-full rounded-lg border-2 border-slate-100 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none transition focus:border-red-500 focus:bg-white"
              />
            </div>
            <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 transition-colors">
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {tab === 'overview' && <OverviewTab />}
              {tab === 'orders' && <OrdersTab />}
              {tab === 'catalog' && <CatalogTab />}
              {tab === 'customers' && <CustomersTab />}
              {tab === 'promotions' && <PromotionsTab />}
              {tab === 'settings' && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 shadow-2xl md:hidden flex flex-col pt-16 flex-1 px-5"
            >
              <nav className="space-y-2 mt-4">
                {navItems.map(({ id, label, Icon }) => (
                  <button key={id} onClick={() => { setTab(id); setIsMobileMenuOpen(false) }}
                    className={['flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all', tab === id ? 'bg-red-600 text-white' : 'text-slate-400'].join(' ')}
                  >
                    <Icon size={18} /> {label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1: OVERVIEW DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function OverviewTab() {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('baskaro_orders') || '[]'))

  const stats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'Request Submitted' || o.status === 'Pickup Scheduled').length
    const completed = orders.filter(o => o.status === 'Payment Completed').length
    const revenue = orders.filter(o => o.status === 'Payment Completed').reduce((sum, o) => sum + (o.estimate || 0), 0)
    return { total, pending, completed, revenue }
  }, [orders])

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Dashboard Overview</h2>
        <button className="flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 hover:border-slate-300">
          <BarChart3 size={16} /> Export Report
        </button>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Requests', value: stats.total, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%' },
          { label: 'Pending Pickups', value: stats.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100', trend: '-2%' },
          { label: 'Completed Purchases', value: stats.completed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', trend: '+24%' },
          { label: 'Payouts Processed', value: `₹ ${fmt(stats.revenue)}`, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: '+18%' }
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
                <s.icon size={22} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.trend.startsWith('+') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>{s.trend}</span>
            </div>
            <p className="text-sm font-semibold text-slate-500">{s.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight leading-none mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders Table inside Overview */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4 flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-900">Recent Action Required</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Order ID</th>
                  <th className="px-5 py-3">Device & User</th>
                  <th className="px-5 py-3">Offer Price</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No recent orders found.</td></tr>
                ) : (
                  recentOrders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-bold text-slate-700">{o.id}</td>
                      <td className="px-5 py-4">
                        <div className="font-black text-slate-900">{o.brand} {o.model}</div>
                        <div className="text-xs text-slate-500">{o.ram}/{o.storage}</div>
                      </td>
                      <td className="px-5 py-4 font-black">₹{fmt(o.estimate)}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Widget */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10"><BarChart3 size={160} /></div>
          <div className="relative z-10">
             <h3 className="text-base font-bold text-slate-300">Quick Actions</h3>
             <div className="mt-4 space-y-2">
                <button className="flex w-full items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition">Create Coupon <ArrowRight size={14} /></button>
                <button className="flex w-full items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition">Add New Brand <ArrowRight size={14} /></button>
                <button className="flex w-full items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/20 transition">Send Push Notification <ArrowRight size={14} /></button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2: ORDERS MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('baskaro_orders') || '[]'))
  const [selectedOrder, setSelectedOrder] = useState(null) // For modal detail view
  const [filter, setFilter] = useState('All')

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(o => {
      if (o.id !== id) return o
      const hist = [...(o.statusHistory || []), { status: newStatus, at: new Date().toISOString() }]
      return { ...o, status: newStatus, statusHistory: hist }
    })
    setOrders(updated)
    localStorage.setItem('baskaro_orders', JSON.stringify(updated))
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(updated.find(x => x.id === id))
    }
  }

  const deleteOrder = (id) => {
    if (!window.confirm(`Are you sure you want to completely delete order ${id}?`)) return
    const updated = orders.filter(o => o.id !== id)
    setOrders(updated)
    localStorage.setItem('baskaro_orders', JSON.stringify(updated))
  }

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return orders
    return orders.filter(o => o.status === filter)
  }, [orders, filter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Orders Management</h2>
        
        {/* Filters */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['All', 'Request Submitted', 'Pickup Scheduled', 'Payment Completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={['px-4 py-1.5 text-xs font-bold rounded-lg transition-all', filter === f ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'].join(' ')}
            >
              {f === 'Request Submitted' ? 'Submitted' : f === 'Pickup Scheduled' ? 'Active' : f.replace('Completed', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Order ID & Date</th>
                <th className="px-5 py-4">Customer & Device</th>
                <th className="px-5 py-4">Pickup Info</th>
                <th className="px-5 py-4">Offer Price</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr><td colSpan="6" className="py-12 text-center text-slate-500 font-medium">No orders found matching this filter.</td></tr>
              ) : (
                filteredOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="font-bold text-blue-600">{o.id}</div>
                      <div className="text-xs text-slate-400 mt-1">{fmtDate(o.createdAt)}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-black text-slate-900">{o.brand} {o.model}</div>
                      <div className="text-xs text-slate-500 mt-1">{o.address?.label ? `Address: ${o.address.city}` : 'No Address'}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-700">{o.pickupDate}</div>
                      <div className="text-xs text-slate-500">{o.pickupTime}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-black text-green-600 border border-green-200 bg-green-50 inline-block px-2 py-0.5 rounded">₹{fmt(o.estimate)}</div>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                    <td className="px-5 py-4 text-right space-x-2">
                       <button onClick={() => setSelectedOrder(o)} className="inline-flex items-center justify-center rounded-lg bg-slate-100 h-8 w-8 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition" title="Manage Order"><Edit2 size={14} /></button>
                       <button onClick={() => deleteOrder(o.id)} className="inline-flex items-center justify-center rounded-lg bg-slate-100 h-8 w-8 text-slate-600 hover:bg-red-100 hover:text-red-600 transition" title="Delete Order"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Detailed Order View */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-50 shadow-2xl overflow-y-auto flex flex-col pt-4 pb-10"
            >
              <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
                <h3 className="text-lg font-black text-slate-900">Manage Order {selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition text-slate-600"><AlertCircle size={16} className="rotate-45" /></button>
              </div>

              <div className="px-6 py-5 space-y-6">
                 {/* Status Manager */}
                 <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Update Order Status</h4>
                    <div className="space-y-2">
                      {['Request Submitted', 'Pickup Scheduled', 'Device Received', 'Payment Completed'].map(s => {
                         const isActive = selectedOrder.status === s
                         return (
                           <button key={s} onClick={() => updateStatus(selectedOrder.id, s)}
                             className={['w-full flex items-center justify-between px-4 py-3 border-2 rounded-xl text-sm font-bold transition', 
                               isActive ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 hover:border-slate-300 text-slate-700 bg-white'].join(' ')}
                           >
                              {s} {isActive && <CheckCircle size={16} />}
                           </button>
                         )
                      })}
                    </div>
                 </div>

                 {/* Information Grids */}
                 <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Device & Pricing</h4>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                       <div><p className="text-slate-500 font-semibold text-xs">Brand / Model</p><p className="font-black text-slate-900">{selectedOrder.brand} {selectedOrder.model}</p></div>
                       <div><p className="text-slate-500 font-semibold text-xs">Configuration</p><p className="font-black text-slate-900">{selectedOrder.ram} / {selectedOrder.storage}</p></div>
                       <div><p className="text-slate-500 font-semibold text-xs">Base Evaluated Price</p><p className="font-bold text-slate-700">₹{fmt(selectedOrder.basePrice)}</p></div>
                       <div><p className="text-slate-500 font-semibold text-xs">Final Offer</p><p className="font-black text-green-600 text-lg leading-none">₹{fmt(selectedOrder.estimate)}</p></div>
                    </div>

                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-t border-slate-100 pt-4">User Conditions Claimed</h4>
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                       <div><p className="text-slate-500 font-semibold text-xs">Screen</p><p className="font-bold text-slate-800">{selectedOrder.screen}</p></div>
                       <div><p className="text-slate-500 font-semibold text-xs">Body</p><p className="font-bold text-slate-800">{selectedOrder.body}</p></div>
                       <div><p className="text-slate-500 font-semibold text-xs">Battery</p><p className="font-bold text-slate-800">{selectedOrder.battery}</p></div>
                       <div><p className="text-slate-500 font-semibold text-xs">Accessories</p><p className="font-bold text-slate-800">{selectedOrder.accessories}</p></div>
                    </div>

                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-t border-slate-100 pt-4">Pickup Logistics</h4>
                    <div className="text-sm">
                       <p className="font-bold text-slate-800 mb-1">{selectedOrder.pickupDate} · {selectedOrder.pickupTime}</p>
                       {selectedOrder.address ? (
                         <div className="bg-slate-50 p-2 rounded-md border border-slate-100 font-semibold text-sm text-slate-600">
                           {selectedOrder.address.label}: {selectedOrder.address.line1}, {selectedOrder.address.city} - {selectedOrder.address.pincode}
                         </div>
                       ) : <p className="text-slate-400 italic">No address provided</p>}
                    </div>
                    
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-t border-slate-100 pt-4">Agent Assignment</h4>
                    <div className="flex gap-2">
                       <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold px-2 py-2 outline-none">
                         <option>Assign Agent...</option>
                         <option>Agent Ravi Kumar (Delhi)</option>
                         <option>Agent Sonia S. (Delhi)</option>
                       </select>
                       <button className="bg-slate-800 text-white rounded-lg px-4 text-sm font-bold hover:bg-slate-700">Assign</button>
                    </div>
                 </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    'Request Submitted': 'bg-slate-100 text-slate-600 border-slate-200',
    'Pickup Scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
    'Device Received': 'bg-orange-50 text-orange-700 border-orange-200',
    'Payment Completed': 'bg-green-50 text-green-700 border-green-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${map[status] || map['Request Submitted']}`}>
      {status}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3: CATALOG MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
function CatalogTab() {
  const [catalogState, setCatalogState] = useState(initialCatalog)
  const [selectedBrand, setSelectedBrand] = useState(Object.keys(initialCatalog)[0])

  // Allows Admin to modify base prices for a model's variants
  const handlePriceChange = (modelName, variantIdx, newPrice) => {
    const brandData = { ...catalogState[selectedBrand] }
    const modelData = { ...brandData[modelName] }
    const variants = [...modelData.variants]
    variants[variantIdx] = { ...variants[variantIdx], basePrice: Number(newPrice) || 0 }
    
    setCatalogState({
      ...catalogState,
      [selectedBrand]: { ...brandData, [modelName]: { ...modelData, variants } }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Device Catalog Manager</h2>
        <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white shadow-md hover:bg-red-700 transition">
          <Plus size={16} /> Add Brand/Model
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-start">
         <div className="lg:col-span-1 border border-slate-200 bg-white rounded-2xl shadow-sm p-3">
             <h3 className="text-xs font-black uppercase text-slate-400 mb-3 px-2">Brands</h3>
             <div className="space-y-1">
               {Object.keys(catalogState).map(b => (
                 <button key={b} onClick={() => setSelectedBrand(b)}
                   className={['w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors', selectedBrand === b ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'].join(' ')}
                 >
                   {b} <span className="float-right text-xs bg-white border border-slate-200 px-1.5 rounded">{Object.keys(catalogState[b]||{}).length}</span>
                 </button>
               ))}
             </div>
         </div>

         <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 flex justify-between items-center">
                 <h3 className="text-lg font-black text-slate-900">{selectedBrand} Models Pricing</h3>
                 <span className="text-xs font-semibold text-slate-500 italic">Auto-saves on edit</span>
               </div>
               <div className="p-5 space-y-6">
                 {Object.entries(catalogState[selectedBrand] || {}).map(([modelName, modelData]) => (
                    <div key={modelName} className="border border-slate-200 rounded-xl overflow-hidden">
                       <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center">
                         <span className="font-bold text-slate-800">{modelName}</span>
                         <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">{modelData.variants?.length} variants</span>
                       </div>
                       <div className="p-4 grid gap-4 bg-white sm:grid-cols-2 lg:grid-cols-3">
                         {modelData.variants?.map((v, i) => (
                           <div key={i} className="border-2 border-slate-100 rounded-lg p-3 bg-slate-50/50">
                             <div className="text-xs font-black text-slate-500 mb-2">{v.ram} / {v.storage}</div>
                             <div className="relative">
                                <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
                                <input type="number" value={v.basePrice} onChange={(e) => handlePriceChange(modelName, i, e.target.value)}
                                  className="w-full bg-white border-2 border-slate-200 rounded-md py-2 pl-7 pr-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 transition-colors"
                                />
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                 ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4: CUSTOMERS MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────
function CustomersTab() {
  // Use unique emails/phones from mock orders as dummy customers
  const orders = JSON.parse(localStorage.getItem('baskaro_orders') || '[]')
  
  const defaultCustomers = [
    { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', phone: '9876543210', orders: 3, joined: '2023-11-12' },
    { id: 'CUST-002', name: 'Alia Bhatt', email: 'alia@example.com', phone: '9123456780', orders: 1, joined: '2024-01-05' },
    { id: 'CUST-003', name: 'Rahul Sharma', email: 'rahuls@example.in', phone: '9876512345', orders: 0, joined: '2024-02-18' },
  ]

  const extracted = orders.map((o, i) => ({
    id: `CUST-O${i}`, name: 'Order Guest', phone: o.address?.phone || 'N/A', orders: 1, joined: 'Recent'
  }))
  
  const customers = [...defaultCustomers]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900">Registered Customers</h2>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
           <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
             <tr>
               <th className="px-5 py-4">Customer ID & Name</th>
               <th className="px-5 py-4">Contact</th>
               <th className="px-5 py-4">Joined Date</th>
               <th className="px-5 py-4">Completed Orders</th>
               <th className="px-5 py-4 text-right">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {customers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50">
                   <td className="px-5 py-4">
                     <div className="font-bold text-slate-900">{c.name}</div>
                     <div className="text-xs text-slate-400 font-mono mt-0.5">{c.id}</div>
                   </td>
                   <td className="px-5 py-4">
                     <div className="font-semibold text-slate-700">{c.email}</div>
                     <div className="text-xs text-slate-500 mt-0.5">{c.phone}</div>
                   </td>
                   <td className="px-5 py-4 font-semibold text-slate-600">{c.joined}</td>
                   <td className="px-5 py-4">
                     <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold text-xs">{c.orders} Orders</span>
                   </td>
                   <td className="px-5 py-4 text-right">
                     <button className="text-sm font-bold text-blue-600 hover:text-blue-800">View Profile</button>
                   </td>
                </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5: PROMOTIONS & NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
function PromotionsTab() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-black text-slate-900">Marketing & Promotions</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-slate-200 bg-white rounded-2xl shadow-sm p-6 space-y-4">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Tag size={20} /></div>
             <h3 className="text-lg font-black text-slate-900">Active Coupons</h3>
           </div>
           
           <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex justify-between items-center">
             <div>
               <div className="text-base font-black text-slate-900 tracking-wider">EXTRA500</div>
               <div className="text-xs font-semibold text-slate-500 mt-1">₹500 bonus on all iPhones</div>
             </div>
             <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded">Active</span>
           </div>
           <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex justify-between items-center">
             <div>
               <div className="text-base font-black text-slate-900 tracking-wider">WELCOME10</div>
               <div className="text-xs font-semibold text-slate-500 mt-1">10% bump on first sell request</div>
             </div>
             <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase px-2 py-1 rounded">Expired</span>
           </div>

           <button className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3 rounded-xl transition">Create New Coupon</button>
        </div>

        <div className="border border-slate-200 bg-white rounded-2xl shadow-sm p-6 space-y-4">
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Bell size={20} /></div>
             <h3 className="text-lg font-black text-slate-900">Email & SMS Blasts</h3>
           </div>
           <p className="text-sm font-semibold text-slate-500 mb-4">Send a promotional blast to all registered users or a specific segment.</p>
           
           <div className="space-y-3">
             <input type="text" placeholder="Campaign Title" className="w-full border-2 border-slate-200 bg-slate-50 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:border-blue-500" />
             <textarea placeholder="Message body..." rows={4} className="w-full border-2 border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
             <div className="flex gap-3">
               <button className="flex-1 bg-slate-900 text-white font-bold text-sm py-3 rounded-xl hover:bg-slate-800 transition">Send SMS</button>
               <button className="flex-1 bg-red-600 text-white font-bold text-sm py-3 rounded-xl hover:bg-red-700 transition">Send Email</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6: SETTINGS
// ─────────────────────────────────────────────────────────────────────────────
function SettingsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-black text-slate-900">System Settings</h2>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-8">
        
        <section>
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-100 pb-2">Pricing Engine Values</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
               <label className="text-sm font-bold text-slate-700">Platform Margin Deduction (%)</label>
               <input type="number" defaultValue={5} className="w-24 text-center border-2 border-slate-200 rounded-lg py-1.5 font-bold outline-none focus:border-red-500" />
            </div>
            <div className="flex items-center justify-between gap-4">
               <label className="text-sm font-bold text-slate-700">Screen Damage Penalty (%)</label>
               <input type="number" defaultValue={40} className="w-24 text-center border-2 border-slate-200 rounded-lg py-1.5 font-bold outline-none focus:border-red-500" />
            </div>
            <div className="flex items-center justify-between gap-4">
               <label className="text-sm font-bold text-slate-700">Body Damage Penalty (%)</label>
               <input type="number" defaultValue={25} className="w-24 text-center border-2 border-slate-200 rounded-lg py-1.5 font-bold outline-none focus:border-red-500" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-100 pb-2">Admin Preferences</h3>
          <div className="space-y-3">
             <label className="flex items-center gap-3 cursor-pointer">
               <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
               <span className="text-sm font-bold text-slate-700">Email notifications on new sell request</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer">
               <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
               <span className="text-sm font-bold text-slate-700">Weekly automated summary reports</span>
             </label>
          </div>
        </section>

        <div className="pt-4">
           <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-red-700 transition">Save All Settings</button>
        </div>
      </div>
    </div>
  )
}
