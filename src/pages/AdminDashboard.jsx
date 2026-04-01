import React, { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Smartphone, DollarSign, ShoppingCart, 
  Truck, CreditCard, Package, Tag, Image as ImageIcon, BarChart, ShieldAlert,
  Search, Bell, Menu, LogOut, ChevronLeft, ChevronRight,
  Filter, Download, MoreVertical, Edit2, Trash2, Ban, Plus, UploadCloud, CheckCircle,
  MapPin, Calendar, Clock, Wallet, Minus
} from 'lucide-react'
import { 
  LineChart, Line, BarChart as ReBarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

// Mock Data for Charts
const dailySalesData = [
  { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 }, { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
]

const monthlyRevenueData = [
  { name: 'Jan', rev: 400000 }, { name: 'Feb', rev: 300000 },
  { name: 'Mar', rev: 250000 }, { name: 'Apr', rev: 278000 },
  { name: 'May', rev: 189000 }, { name: 'Jun', rev: 239000 },
]

const topBrandsData = [
  { name: 'Apple', value: 45 }, { name: 'Samsung', value: 30 },
  { name: 'OnePlus', value: 15 }, { name: 'Other', value: 10 },
]

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
    { id: 'users', label: 'User Management', Icon: Users },
    { id: 'mobile', label: 'Mobile Management', Icon: Smartphone },
    { id: 'pricing', label: 'Condition Pricing', Icon: DollarSign },
    { id: 'orders', label: 'Order Management', Icon: ShoppingCart },
    { id: 'pickups', label: 'Pickup Management', Icon: Truck },
    { id: 'payments', label: 'Payment Management', Icon: CreditCard },
    { id: 'inventory', label: 'Inventory', Icon: Package },
    { id: 'offers', label: 'Offers & Coupons', Icon: Tag },
    { id: 'cms', label: 'Banner & CMS', Icon: ImageIcon },
    { id: 'analytics', label: 'Reports & Analytics', Icon: BarChart },
    { id: 'roles', label: 'Roles & Permissions', Icon: ShieldAlert },
  ]

  useEffect(() => {
    // For demo/development purpose, bypassing strict check if not set
    if (localStorage.getItem('baskaro_admin_auth') === 'false') {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('baskaro_admin_auth')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Outfit'] text-slate-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} max-md:${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full'} md:relative`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          {(!sidebarCollapsed || isMobileMenuOpen) && (
            <Link to="/admin" className="flex items-center gap-2">
              <img src="/logo.png" alt="BASKARO Admin" className="h-8 w-auto object-contain" />
            </Link>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden rounded-lg p-1.5 hover:bg-slate-100 md:block text-slate-500">
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-6 scrollbar-hide">
          {navItems.map(({ id, label, Icon }, index) => {
            const isActive = tab === id;
            if (index === 4 || index === 8) {
              return (
                <React.Fragment key={id}>
                   <div className={`mt-6 mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400 ${sidebarCollapsed && !isMobileMenuOpen ? 'text-center text-[10px]' : ''}`}>
                      {!sidebarCollapsed || isMobileMenuOpen ? (index === 4 ? 'Operations' : 'Marketing & Tools') : '—'}
                   </div>
                   <button
                    onClick={() => { setTab(id); setIsMobileMenuOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                      isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200/50' : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                    title={label}
                  >
                    <Icon size={sidebarCollapsed && !isMobileMenuOpen ? 24 : 20} className={`${isActive ? 'text-white' : 'text-slate-400'} ${sidebarCollapsed && !isMobileMenuOpen ? 'mx-auto' : ''}`} />
                    {(!sidebarCollapsed || isMobileMenuOpen) && <span>{label}</span>}
                  </button>
                </React.Fragment>
              )
            }
            return (
              <button
                key={id}
                onClick={() => { setTab(id); setIsMobileMenuOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                  isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-200/50' : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
                title={label}
              >
                <Icon size={sidebarCollapsed && !isMobileMenuOpen ? 24 : 20} className={`${isActive ? 'text-white' : 'text-slate-400'} ${sidebarCollapsed && !isMobileMenuOpen ? 'mx-auto' : ''}`} />
                {(!sidebarCollapsed || isMobileMenuOpen) && <span>{label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut size={sidebarCollapsed && !isMobileMenuOpen ? 24 : 20} className={sidebarCollapsed && !isMobileMenuOpen ? 'mx-auto' : ''} />
            {(!sidebarCollapsed || isMobileMenuOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white/80 px-4 sm:px-8 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600 rounded-lg p-1.5 hover:bg-slate-100" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-black text-slate-800 hidden sm:block">
              {navItems.find(item => item.id === tab)?.label || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search orders, users, models..." className="h-10 w-72 rounded-full border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
            </div>
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Bell size={22} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 cursor-pointer rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-slate-600">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {tab === 'dashboard' && <DashboardView />}
              {tab === 'users' && <UsersManagementView />}
              {tab === 'mobile' && <MobileManagementView />}
              {tab === 'pricing' && <ConditionPricingView />}
              {tab === 'orders' && <OrdersManagementView />}
              {tab === 'pickups' && <PickupsManagementView />}
              {tab === 'payments' && <PaymentsManagementView />}
              {tab === 'inventory' && <InventoryManagementView />}
              {tab === 'offers' && <OffersManagementView />}
              {tab === 'cms' && <CmsManagementView />}
              {tab === 'analytics' && <AnalyticsManagementView />}
              {tab === 'roles' && <RolesManagementView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

// ============================================================================ //
// 1. DASHBOARD VIEW
// ============================================================================ //
function DashboardView() {
  const kpis = [
    { label: 'Total Users', value: '12,543', icon: Users, color: 'text-blue-600', iconBg: 'bg-blue-100', trend: '+12.5%', trendUp: true },
    { label: 'Total Orders', value: '1,280', icon: ShoppingCart, color: 'text-orange-600', iconBg: 'bg-orange-100', trend: '+8.2%', trendUp: true },
    { label: 'Pending Pickups', value: '45', icon: Truck, color: 'text-red-500', iconBg: 'bg-red-100', trend: '-2.1%', trendUp: false },
    { label: 'Total Revenue', value: '₹4.2M', icon: DollarSign, color: 'text-green-600', iconBg: 'bg-green-100', trend: '+15.3%', trendUp: true },
  ]

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:shadow-lg hover:border-slate-300">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${kpi.iconBg} ${kpi.color}`}>
                <kpi.icon size={24} strokeWidth={2.5} />
              </div>
              <span className={`inline-flex items-center text-xs font-black px-2.5 py-1 rounded-full ${kpi.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {kpi.trendUp ? '↗' : '↘'} {kpi.trend}
              </span>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{kpi.label}</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Daily Sales Chart */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Daily Order Volume</h3>
              <p className="text-sm font-medium text-slate-500">Last 7 days performance</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 transition"><Download size={16}/> Export</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySalesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dx={-10} />
                <Tooltip contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}/>
                <Line type="monotone" dataKey="sales" name="Orders" stroke="#dc2626" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff', stroke: '#dc2626'}} activeDot={{r: 6, fill: '#dc2626', stroke: '#fff', strokeWidth: 3}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Brands Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
          <div className="mb-2">
            <h3 className="text-lg font-black text-slate-900">Top Brands</h3>
            <p className="text-sm font-medium text-slate-500">Market share by listings</p>
          </div>
          <div className="flex-1 flex flex-col justify-center relative min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topBrandsData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none">
                  {topBrandsData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-3xl font-black text-slate-900">850</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
             {topBrandsData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                  <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  <span className="text-sm font-black text-slate-900 ml-auto">{item.value}%</span>
                </div>
             ))}
          </div>
        </div>

        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Monthly Revenue Forecast</h3>
              <p className="text-sm font-medium text-slate-500">In Indian Rupees (₹)</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={monthlyRevenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }} barSize={36}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dx={-10} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} formatter={(val) => `₹${val.toLocaleString()}`}/>
                <Bar dataKey="rev" name="Revenue" fill="#2563eb" radius={[6, 6, 0, 0]}>
                   {monthlyRevenueData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index === monthlyRevenueData.length - 1 ? '#2563eb' : '#93c5fd'} />
                   ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================ //
// 2. USER MANAGEMENT VIEW
// ============================================================================ //
function UsersManagementView() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: 'USR001', name: 'Ravi Kumar', email: 'ravi.k@example.com', phone: '+91 9876543210', orders: 12, status: 'Active', joined: '12 Jan, 2025' },
    { id: 'USR002', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 9123456780', orders: 5, status: 'Active', joined: '15 Feb, 2025' },
    { id: 'USR003', name: 'Amit Singh', email: 'amit.singh@example.com', phone: '+91 9988776655', orders: 0, status: 'Blocked', joined: '20 Mar, 2025' },
    { id: 'USR004', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 9876500000', orders: 2, status: 'Active', joined: '02 Apr, 2025' },
    { id: 'USR005', name: 'Rahul Patel', email: 'rahul.p@example.com', phone: '+91 9999988888', orders: 8, status: 'Active', joined: '10 Apr, 2025' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">User Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage platform users, view history, and handle blocks.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition">
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="border-b border-slate-100 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" 
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex flex-1 sm:flex-none justify-center items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
              <Filter size={16} /> Filter by Status
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">User Details</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Contact Information</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Total Orders</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())).map((user, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-600">
                           {user.name.charAt(0)}
                         </div>
                         <div>
                           <div className="font-black text-slate-900 text-base">{user.name}</div>
                           <div className="text-xs font-bold text-slate-400 mt-0.5.">ID: {user.id} • Joined {user.joined}</div>
                         </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-semibold text-slate-700">{user.email}</div>
                     <div className="text-xs font-medium text-slate-500 mt-1">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="inline-flex items-center justify-center min-w-[32px] h-8 rounded-lg bg-blue-50 text-blue-700 font-black text-sm border border-blue-100">
                       {user.orders}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        {user.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition" title="View Profile">
                        <MoreVertical size={18} />
                      </button>
                      {user.status === 'Active' ? (
                        <button className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition" title="Block User">
                          <Ban size={18} />
                        </button>
                      ) : (
                        <button className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition" title="Unblock User">
                           <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition" title="Delete Account">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination mock */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm text-slate-500 font-medium">
          <span>Showing 1 to 5 of 12,543 entries</span>
          <div className="flex gap-1">
             <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50">Prev</button>
             <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">1</button>
             <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100">2</button>
             <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================ //
// 3. MOBILE MANAGEMENT VIEW
// ============================================================================ //
function MobileManagementView() {
  const [activeSegment, setActiveSegment] = useState('Catalog'); // 'Catalog' | 'AddNew'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Mobile Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage brands, configure pricing, and add new smartphone models.</p>
        </div>
        
        {/* Segment Tabs */}
        <div className="flex p-1 bg-slate-200/60 rounded-xl border border-slate-200/80">
          <button 
             onClick={() => setActiveSegment('Catalog')}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeSegment === 'Catalog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Manage Catalog
          </button>
          <button 
             onClick={() => setActiveSegment('AddNew')}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeSegment === 'AddNew' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span className="flex items-center gap-1"><Plus size={16}/> Add New Device</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSegment === 'AddNew' ? (
           <motion.div key="add-new" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
             <AddNewModelForm onCancel={() => setActiveSegment('Catalog')} />
           </motion.div>
        ) : (
           <motion.div key="catalog" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
             <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-24 text-center">
                 <Smartphone size={48} className="mx-auto text-slate-300 mb-4" />
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Device Catalog Grid</h3>
                 <p className="text-slate-500 mb-6">Device listing view goes here. Switch to "Add New Device" to see the dynamic form.</p>
                 <button onClick={() => setActiveSegment('AddNew')} className="bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:bg-red-700">Add First Device</button>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AddNewModelForm({ onCancel }) {
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
       <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-black text-slate-900">Create New Model Listing</h3>
          <p className="text-sm text-slate-500 mt-1">Fill in the specifications to list a new phone on the marketplace.</p>
       </div>

       <div className="p-8 grid gap-10 xl:grid-cols-3">
          {/* Left Column - Image Upload */}
          <div className="xl:col-span-1 space-y-4">
             <label className="text-sm font-black uppercase text-slate-800 tracking-wider">Device Primary Image <span className="text-red-500">*</span></label>
             
             <div 
               className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-colors flex flex-col items-center justify-center h-72 cursor-pointer group overflow-hidden"
               onDragOver={(e) => e.preventDefault()}
               onDrop={(e) => {
                 e.preventDefault();
                 if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                   handleImageChange(e.dataTransfer.files[0]);
                 }
               }}
               onClick={() => document.getElementById('device-image-upload').click()}
             >
               <input 
                 id="device-image-upload" 
                 type="file" 
                 accept="image/*" 
                 className="hidden" 
                 onChange={(e) => {
                   if (e.target.files && e.target.files[0]) {
                     handleImageChange(e.target.files[0]);
                   }
                 }} 
               />
               
               {imagePreview ? (
                 <>
                   <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
                   <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         setImagePreview(null);
                         document.getElementById('device-image-upload').value = '';
                       }}
                       className="bg-red-600 text-white p-3 px-4 rounded-xl hover:bg-red-700 transition shadow-lg flex items-center gap-2 text-sm font-bold"
                     >
                       <Trash2 size={16} /> Remove Image
                     </button>
                   </div>
                 </>
               ) : (
                 <div className="p-10 flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                       <UploadCloud size={28} />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Click or drag image to upload</p>
                    <p className="text-xs font-semibold text-slate-400 mt-2">PNG, JPG or WEBP (max. 5MB)<br/>Transparent background preferred</p>
                 </div>
               )}
             </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="xl:col-span-2 space-y-8">
             
             {/* Section 1 */}
             <div className="space-y-4">
                <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Basic Details</h4>
                <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Brand <span className="text-red-500">*</span></label>
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer">
                        <option value="">Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Model Name <span className="text-red-500">*</span></label>
                     <input type="text" placeholder="e.g. iPhone 15 Pro Max" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" />
                   </div>
                </div>
             </div>

             {/* Section 2 */}
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">Base Value & Configurations</h4>
                  <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition">+ Add Variant</button>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
                   <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">RAM</label>
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none">
                           <option>8 GB</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">Storage</label>
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none">
                           <option>256 GB</option>
                        </select>
                      </div>
                      <div className="flex-1 relative">
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">Max Base Price (₹)</label>
                        <span className="absolute left-3 top-[32px] text-slate-400 font-bold">₹</span>
                        <input type="number" placeholder="45,000" className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-sm font-black text-slate-800 outline-none focus:border-blue-500" />
                      </div>
                      <button className="h-[46px] w-[46px] flex items-center justify-center shrink-0 border border-red-200 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition">
                         <Trash2 size={18} />
                      </button>
                   </div>
                   {/* Example secondary row */}
                   <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none">
                           <option>8 GB</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none">
                           <option>512 GB</option>
                        </select>
                      </div>
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
                        <input type="number" placeholder="52,000" className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-sm font-black text-slate-800 outline-none focus:border-blue-500" />
                      </div>
                      <button className="h-[46px] w-[46px] flex items-center justify-center shrink-0 border border-red-200 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition">
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
             </div>

             {/* Section 3 */}
             <div className="space-y-4">
                <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Processor</label>
                     <input type="text" placeholder="e.g. A17 Pro Bionic" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Main Camera</label>
                     <input type="text" placeholder="e.g. 48MP + 12MP + 12MP" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Battery Capacity</label>
                     <input type="text" placeholder="e.g. 4422 mAh" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                   </div>
                   <div className="flex items-center gap-4 mt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm font-bold text-slate-700">Has 5G</span>
                      </label>
                   </div>
                </div>
             </div>

          </div>
       </div>

       {/* Footer Actions */}
       <div className="border-t border-slate-200 bg-slate-50 p-6 flex items-center justify-end gap-4">
          <button onClick={onCancel} className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold hover:bg-slate-100 transition">Cancel</button>
          <button className="px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-black shadow-md shadow-blue-200 hover:bg-blue-700 transition">Publish Device Listing</button>
       </div>
    </div>
  )
}

// ============================================================================ //
// 4. CONDITION PRICING VIEW
// ============================================================================ //
function ConditionPricingView() {
  const [deductions, setDeductions] = useState({
    excellent: 0,
    good: 15,
    average: 35,
    broken: 60,
    screenCracked: 40,
    batteryPoor: 20,
    cameraDamaged: 25,
    biometricsFailed: 30,
  });

  // Simulator State
  const [simBasePrice, setSimBasePrice] = useState(50000);
  const [simCondition, setSimCondition] = useState('good');
  const [simDefects, setSimDefects] = useState([]);

  const handleSliderChange = (key, value) => {
    let parsed = parseInt(value, 10);
    if (isNaN(parsed)) parsed = 0;
    setDeductions(prev => ({ ...prev, [key]: Math.min(100, Math.max(0, parsed)) }));
  };

  const handleToggle = (key, currentVal) => {
    handleSliderChange(key, currentVal > 0 ? 0 : 15);
  };

  const saveSettings = () => {
    alert("Pricing engine settings updated successfully!");
  };

  // Real-time calculation logic
  const calculateResaleValue = () => {
    let price = simBasePrice;
    
    // 1. Condition Deduction (always active based on selection)
    const basePenaltyPct = deductions[simCondition] || 0;
    price -= (simBasePrice * (basePenaltyPct / 100));

    // 2. Functional Defect Deductions (only sum up if the defect rule is active > 0)
    let defectPenaltySum = 0;
    simDefects.forEach(defect => {
      const defectPct = deductions[defect] || 0;
      if (defectPct > 0) {
        defectPenaltySum += defectPct;
      }
    });

    price -= (simBasePrice * (defectPenaltySum / 100));
    return Math.max(0, Math.round(price));
  };


  const DeductionRow = ({ label, objKey, colorClass }) => {
    const isActive = deductions[objKey] > 0 || objKey === 'excellent'; // special case, excellent can be 0 but active
    const localActive = objKey === 'excellent' ? true : isActive;

    return (
      <div className={`flex items-center justify-between p-4 sm:p-5 transition-colors hover:bg-slate-50/80 ${localActive ? 'bg-white' : 'bg-slate-50/30'}`}>
         <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-1/2">
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" className="sr-only peer" checked={localActive} onChange={() => handleToggle(objKey, deductions[objKey])} disabled={objKey==='excellent'} />
              <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${objKey==='excellent' ? 'bg-blue-600 cursor-not-allowed opacity-80' : 'bg-slate-200 peer-checked:bg-blue-600'}`}></div>
            </label>
            <span className={`font-bold text-sm sm:text-base ${localActive ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
         </div>
         
         <div className="flex items-center justify-end">
            <div className={`flex items-center h-10 sm:h-11 border rounded-xl overflow-hidden transition-all ${localActive ? 'border-slate-200 bg-white shadow-sm hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20' : 'border-slate-100 bg-slate-50'}`}>
               <button 
                 onClick={() => handleSliderChange(objKey, deductions[objKey] - 1)}
                 disabled={!localActive}
                 className="w-10 sm:w-12 h-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 border-r border-slate-200 text-slate-500 font-black transition disabled:opacity-50 disabled:cursor-not-allowed active:bg-slate-200"
               >-</button>
               <input 
                 type="number"
                 min="0"
                 max="100"
                 value={deductions[objKey]}
                 onChange={(e) => handleSliderChange(objKey, e.target.value)}
                 disabled={!localActive}
                 className={`w-14 sm:w-16 h-full text-center font-black outline-none bg-transparent text-sm sm:text-base disabled:text-slate-400 ${localActive ? colorClass : 'text-slate-400'}`}
               />
               <span className={`pr-3 sm:pr-4 h-full flex items-center bg-transparent text-xs sm:text-sm font-black ${localActive ? colorClass : 'text-slate-400'}`}>%</span>
               <button 
                 onClick={() => handleSliderChange(objKey, deductions[objKey] + 1)}
                 disabled={!localActive}
                 className="w-10 sm:w-12 h-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 border-l border-slate-200 text-slate-500 font-black transition disabled:opacity-50 disabled:cursor-not-allowed active:bg-slate-200"
               >+</button>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Condition Pricing Engine</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Configure automated evaluation matrices across the platform.</p>
        </div>
        <button onClick={saveSettings} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:from-blue-700 hover:to-indigo-700 transition">
          <CheckCircle size={18} strokeWidth={2.5} /> Deploy Engine Update
        </button>
      </div>

      {/* Live Simulator Panel */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-slate-700">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
         
         <div className="flex-1 w-full relative z-10">
            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
               <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
               Live Resale Simulator
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
               <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">Test Base Price (₹)</label>
                  <input 
                     type="number" 
                     value={simBasePrice} 
                     onChange={(e) => setSimBasePrice(Number(e.target.value))}
                     className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white font-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  />
               </div>
               <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">Condition Class</label>
                  <select 
                     value={simCondition} 
                     onChange={(e) => setSimCondition(e.target.value)}
                     className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white font-black focus:border-blue-500 outline-none transition appearance-none cursor-pointer"
                  >
                     <option value="excellent">Excellent (-{deductions.excellent}%)</option>
                     <option value="good">Good (-{deductions.good}%)</option>
                     <option value="average">Average (-{deductions.average}%)</option>
                     <option value="broken">Broken (-{deductions.broken}%)</option>
                  </select>
               </div>
               <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 block">Trigger Defect</label>
                  <select 
                     value="" 
                     onChange={(e) => {
                        if (e.target.value && !simDefects.includes(e.target.value)) {
                           setSimDefects([...simDefects, e.target.value]);
                        }
                     }}
                     className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white font-black focus:border-blue-500 outline-none transition appearance-none cursor-pointer"
                  >
                     <option value="">+ Add Fault...</option>
                     {!simDefects.includes('screenCracked') && <option value="screenCracked">Screen Fault (-{deductions.screenCracked}%)</option>}
                     {!simDefects.includes('batteryPoor') && <option value="batteryPoor">Battery Poor (-{deductions.batteryPoor}%)</option>}
                     {!simDefects.includes('cameraDamaged') && <option value="cameraDamaged">Camera Fault (-{deductions.cameraDamaged}%)</option>}
                     {!simDefects.includes('biometricsFailed') && <option value="biometricsFailed">FaceID Failed (-{deductions.biometricsFailed}%)</option>}
                  </select>
               </div>
            </div>
            {simDefects.length > 0 && (
               <div className="flex flex-wrap gap-2 mt-4">
                  {simDefects.map(d => (
                     <div key={d} className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                        {d === 'screenCracked' ? 'ScreenFault' : d === 'batteryPoor' ? 'BadBattery' : d === 'cameraDamaged' ? 'BadCamera' : 'NoFaceID'} (-{deductions[d]}%)
                        <button onClick={() => setSimDefects(simDefects.filter(x => x !== d))} className="hover:text-white transition-colors ml-1"><Trash2 size={14}/></button>
                     </div>
                  ))}
               </div>
            )}
         </div>

         <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 min-w-[220px] text-center shrink-0 relative z-10 w-full md:w-auto shadow-inner">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Final Resale Value</div>
            <div className="text-3xl font-black text-white tracking-tight">
               ₹{calculateResaleValue().toLocaleString()}
            </div>
            <div className="text-emerald-400 text-xs font-bold mt-2 flex items-center justify-center gap-1">
               <CheckCircle size={12} /> Instantly calculated
            </div>
         </div>
      </div>

      {/* Algorithm Info panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
         <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"><BarChart size={20}/></div>
         <div className="flex-1 w-full">
            <h4 className="text-xs font-black text-slate-900 mb-1.5 uppercase tracking-widest">Active Math Model</h4>
            <div className="bg-slate-50 border border-slate-200 font-mono text-xs font-semibold text-slate-600 p-2.5 rounded-lg overflow-x-auto w-full">
              Final_Price = Base_Model_Price - (Base_Model_Price × Overall_Condition_%) - (Base_Model_Price × Sum(Functional_Defect_%))
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
         <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
               <div className="h-10 w-10 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-200 text-slate-700"><DollarSign size={20}/></div>
               <div>
                  <h3 className="text-lg font-black text-slate-900">Base Grades</h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Physical state multipliers</p>
               </div>
            </div>
            <div className="divide-y divide-slate-100 flex-1">
               <DeductionRow label="Excellent" objKey="excellent" colorClass="text-green-600" />
               <DeductionRow label="Good" objKey="good" colorClass="text-blue-600" />
               <DeductionRow label="Average" objKey="average" colorClass="text-orange-600" />
               <DeductionRow label="Broken" objKey="broken" colorClass="text-red-600" />
            </div>
         </div>

         <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
               <div className="h-10 w-10 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-200 text-slate-700"><Smartphone size={20} /></div>
               <div>
                  <h3 className="text-lg font-black text-slate-900">Functional Tests</h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Stacking deficit penalties</p>
               </div>
            </div>
            <div className="divide-y divide-slate-100 flex-1">
               <DeductionRow label="Screen condition" objKey="screenCracked" colorClass="text-red-500" />
               <DeductionRow label="Battery health" objKey="batteryPoor" colorClass="text-orange-500" />
               <DeductionRow label="Camera working" objKey="cameraDamaged" colorClass="text-purple-500" />
               <DeductionRow label="Face ID / Fingerprint" objKey="biometricsFailed" colorClass="text-indigo-500" />
            </div>
         </div>
      </div>
    </div>
  )
}

// ============================================================================ //
// 5. ORDERS MANAGEMENT VIEW
// ============================================================================ //
function OrdersManagementView() {
  const [orders, setOrders] = useState([
    { id: 'ORD-8X9P', customer: 'Rahul Sharma', phone: 'iPhone 13 Pro', storage: '256GB', price: 42000, date: 'Oct 24, 2023', status: 'Order Placed' },
    { id: 'ORD-2K4M', customer: 'Priya Patel', phone: 'Samsung S22 Ultra', storage: '512GB', price: 51500, date: 'Oct 23, 2023', status: 'Pickup Scheduled' },
    { id: 'ORD-9F1Z', customer: 'Amit Singh', phone: 'OnePlus 11R', storage: '128GB', price: 28000, date: 'Oct 22, 2023', status: 'Device Verification' },
    { id: 'ORD-7L3C', customer: 'Neha Gupta', phone: 'iPhone 12', storage: '64GB', price: 22000, date: 'Oct 20, 2023', status: 'Price Finalized' },
    { id: 'ORD-5W8N', customer: 'Vikram Reddy', phone: 'Google Pixel 7', storage: '128GB', price: 34000, date: 'Oct 18, 2023', status: 'Payment Completed' },
  ]);

  const PIPELINE = [
    'Order Placed',
    'Pickup Scheduled',
    'Device Verification',
    'Price Finalized',
    'Payment Completed'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pickup Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Device Verification': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Price Finalized': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Payment Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-500';
      case 'Pickup Scheduled': return 'bg-purple-500';
      case 'Device Verification': return 'bg-orange-500';
      case 'Price Finalized': return 'bg-indigo-500';
      case 'Payment Completed': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const advanceOrder = (id) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const currIdx = PIPELINE.indexOf(o.status);
        if (currIdx < PIPELINE.length - 1) {
          return { ...o, status: PIPELINE[currIdx + 1] };
        }
      }
      return o;
    }));
  };

  const regressOrder = (id) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const currIdx = PIPELINE.indexOf(o.status);
        if (currIdx > 0) {
          return { ...o, status: PIPELINE[currIdx - 1] };
        }
      }
      return o;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Order Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Track and advance active trade-in orders through the pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition w-full sm:w-64" />
          </div>
          <button className="flex items-center justify-center gap-2 border border-slate-200 bg-white rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest h-14">
                <th className="px-6 font-bold">Order UID & Client</th>
                <th className="px-6 font-bold">Device & Specs</th>
                <th className="px-6 font-bold">Quoted Price</th>
                <th className="px-6 font-bold min-w-[200px]">Pipeline Tracker</th>
                <th className="px-6 font-bold text-right text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">{order.id}</div>
                    <div className="font-semibold text-slate-600 text-xs mt-1">{order.customer}</div>
                    <div className="font-semibold text-slate-400 text-[10px] mt-0.5">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                       <Smartphone size={14} className="text-slate-400" /> {order.phone}
                    </div>
                    <div className="inline-flex mt-1.5 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-wider">
                       {order.storage}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">₹{order.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-3 w-48 align-top">
                    <div className="flex flex-col py-1">
                       {PIPELINE.map((p, idx) => {
                          const currentIdx = PIPELINE.indexOf(order.status);
                          const isComplete = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;
                          const isLast = idx === PIPELINE.length - 1;
                          
                          const stepColors = [
                            'bg-blue-500', 
                            'bg-purple-500', 
                            'bg-orange-500', 
                            'bg-indigo-500', 
                            'bg-emerald-500'
                          ];
                          
                          const dotColor = isComplete ? stepColors[idx] : 'bg-slate-200';
                          const lineColor = idx < currentIdx ? stepColors[idx] : 'bg-slate-100';
                          const textColor = isComplete 
                               ? (isCurrent ? 'text-slate-900 font-black' : 'text-slate-500 font-bold') 
                               : 'text-slate-300 font-semibold';
                          
                          return (
                             <div key={p} className="flex gap-3 relative">
                                {/* Vertical Connecting Line */}
                                {!isLast && (
                                   <div className={`absolute left-[5px] top-[14px] bottom-[-6px] w-[2px] rounded-full transition-colors duration-500 ${lineColor}`}></div>
                                )}
                                
                                {/* Step Node */}
                                <div className={`relative z-10 w-3 h-3 mt-[5px] rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 transition-all duration-500 ${dotColor} ${isCurrent ? 'ring-[1.5px] ring-offset-1 scale-110 ' + stepColors[idx].replace('bg-', 'ring-') : ''}`}></div>
                                
                                {/* Step Label */}
                                <div className={`text-[10px] pb-[10px] uppercase tracking-wider transition-colors duration-300 ${textColor}`}>
                                   {p}
                                </div>
                             </div>
                          )
                       })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap relative">
                    <div className="flex items-center justify-end h-8 min-w-[140px]">
                      {/* Action buttons on hover */}
                      <div className="hidden group-hover:flex items-center justify-end gap-1.5 w-full animate-in fade-in slide-in-from-right-2 duration-200">
                          {order.status !== 'Order Placed' && (
                             <button 
                               onClick={() => regressOrder(order.id)}
                               className="bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 px-3 h-8 rounded-lg text-xs font-black shadow-sm flex items-center justify-center transition-colors"
                               title="Undo Stage"
                             >
                               <ChevronLeft size={16} strokeWidth={2.5}/>
                             </button>
                          )}
                          {order.status !== 'Payment Completed' && (
                             <button 
                               onClick={() => advanceOrder(order.id)}
                               className="bg-slate-900 text-white hover:bg-black px-4 h-8 rounded-lg text-xs font-black shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
                             >
                               Next <ChevronRight size={14} strokeWidth={3}/>
                             </button>
                          )}
                          {order.status === 'Payment Completed' && (
                             <span className="text-emerald-600 font-black text-[10px] uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-3 h-8 rounded-lg shadow-sm flex items-center justify-center pointer-events-none shrink-0">
                               Settled
                             </span>
                          )}
                      </div>

                      {/* Default state when not hovered */}
                      <div className="group-hover:hidden flex items-center justify-end w-full">
                        {order.status === 'Payment Completed' ? (
                          <span className="text-emerald-500 font-black text-xs inline-flex items-center gap-1">
                            <CheckCircle size={14} strokeWidth={3}/> Settled
                          </span>
                        ) : (
                          <span className="text-slate-300 font-medium text-[10px] uppercase tracking-wider">Hover to act</span>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ============================================================================ //
// 6. PICKUPS MANAGEMENT VIEW
// ============================================================================ //
function PickupsManagementView() {
  const [pickups, setPickups] = useState([
    { id: 'PKP-1001', orderId: 'ORD-8X9P', customer: 'Rahul Sharma', address: '42, MG Road, Bangalore, KA - 560001', date: 'Oct 25, 2023', time: '10:00 AM - 12:00 PM', agent: 'Ramesh K.', status: 'Pending' },
    { id: 'PKP-1002', orderId: 'ORD-2K4M', customer: 'Priya Patel', address: '18, Navrangpura, Ahmedabad, GJ - 380009', date: 'Oct 24, 2023', time: '02:00 PM - 04:00 PM', agent: 'Suresh P.', status: 'Completed' },
    { id: 'PKP-1003', orderId: 'ORD-5W8N', customer: 'Vikram Reddy', address: 'B-Block, Rajouri Garden, Delhi - 110027', date: 'Oct 26, 2023', time: '04:00 PM - 06:00 PM', agent: 'Unassigned', status: 'Pending' },
  ]);

  const agents = ['Unassigned', 'Ramesh K.', 'Suresh P.', 'Karan S.', 'Deepak M.'];
  const statuses = ['Pending', 'Completed', 'Cancelled'];

  const [isAddingPickup, setIsAddingPickup] = useState(false);
  const [newPickup, setNewPickup] = useState({ orderId: '', customer: '', address: '', date: '', time: '', agent: 'Unassigned', status: 'Pending' });

  const handleCreatePickup = (e) => {
    e.preventDefault();
    const id = `PKP-${Math.floor(1000 + Math.random() * 9000)}`;
    setPickups([{ id, ...newPickup }, ...pickups]);
    setIsAddingPickup(false);
    setNewPickup({ orderId: '', customer: '', address: '', date: '', time: '', agent: 'Unassigned', status: 'Pending' });
  };

  const updatePickup = (id, field, value) => {
    setPickups(pickups.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200 focus:ring-orange-500/20';
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200 focus:ring-emerald-500/20';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200 focus:ring-red-500/20';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Pickup Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Assign agents and track on-field pickup operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddingPickup(true)} className="flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-2.5 text-sm font-black hover:bg-black shadow-md shadow-slate-200 transition">
            <Plus size={16} strokeWidth={3} /> Manual Pickup
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest h-14">
                <th className="px-6 font-bold">Pickup ID & Client</th>
                <th className="px-6 font-bold w-[30%]">Location</th>
                <th className="px-6 font-bold min-w-[150px]">Schedule</th>
                <th className="px-6 font-bold">Assigned Agent</th>
                <th className="px-6 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pickups.map((pickup) => (
                <tr key={pickup.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-900 text-sm">{pickup.id}</div>
                    <div className="font-semibold text-slate-600 text-xs mt-1">{pickup.customer}</div>
                    <div className="font-black text-slate-400 text-[10px] uppercase tracking-wider mt-0.5">{pickup.orderId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-700 leading-snug flex items-start gap-1.5 line-clamp-2">
                       <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                       {pickup.address}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-1">
                       <Calendar size={14} className="text-slate-400"/> {pickup.date}
                    </div>
                    <div className="font-semibold text-slate-500 text-[11px] flex items-center gap-1.5">
                       <Clock size={14} className="text-slate-400"/> {pickup.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={pickup.agent}
                      onChange={(e) => updatePickup(pickup.id, 'agent', e.target.value)}
                      className={`text-sm font-bold border rounded-lg px-2 py-1.5 outline-none transition-colors appearance-none cursor-pointer text-center sm:text-left ${pickup.agent === 'Unassigned' ? 'bg-orange-50 border-orange-200 text-orange-600 focus:border-orange-500' : 'bg-white border-slate-200 text-slate-700 focus:border-blue-500 hover:border-slate-300'}`}
                    >
                      {agents.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end">
                      <select 
                        value={pickup.status}
                        onChange={(e) => updatePickup(pickup.id, 'status', e.target.value)}
                        className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border outline-none appearance-none cursor-pointer text-center ring-offset-1 focus:ring-2 transition-all shadow-sm ${getStatusColor(pickup.status)}`}
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddingPickup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><Truck size={18} className="text-blue-600"/> Create Manual Pickup</h3>
               <button onClick={() => setIsAddingPickup(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><Plus size={24} className="rotate-45"/></button>
            </div>
            <form onSubmit={handleCreatePickup} className="p-6 space-y-4">
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Linked Order ID</label>
                 <input required type="text" placeholder="e.g. ORD-9X12" value={newPickup.orderId} onChange={e=>setNewPickup({...newPickup, orderId: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Customer Name</label>
                 <input required type="text" placeholder="Customer Name" value={newPickup.customer} onChange={e=>setNewPickup({...newPickup, customer: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Address</label>
                 <textarea required rows="2" placeholder="Complete pickup location" value={newPickup.address} onChange={e=>setNewPickup({...newPickup, address: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium resize-none transition-all"></textarea>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Date</label>
                   <input required type="date" value={newPickup.date} onChange={e=>setNewPickup({...newPickup, date: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 transition-all" />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Time Slot</label>
                   <select required value={newPickup.time} onChange={e=>setNewPickup({...newPickup, time: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 bg-white cursor-pointer transition-all">
                      <option value="">Select slot</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                   </select>
                 </div>
               </div>
               <div className="pt-4 flex justify-end gap-3 mt-2">
                 <button type="button" onClick={() => setIsAddingPickup(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition">Cancel</button>
                 <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-black bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition flex items-center gap-1.5"><CheckCircle size={16}/> Schedule Pickup</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================ //
// 7. PAYMENTS MANAGEMENT VIEW
// ============================================================================ //
function PaymentsManagementView() {
  const [payments, setPayments] = useState([
    { id: 'PAY-8X9P', orderId: 'ORD-8X9P', user: 'Rahul Sharma', amount: 42000, method: 'UPI', status: 'Paid', date: 'Oct 25, 2023, 11:30 AM' },
    { id: 'PAY-2K4M', orderId: 'ORD-2K4M', user: 'Priya Patel', amount: 51500, method: 'Bank Transfer', status: 'Pending', date: 'Oct 24, 2023, 03:15 PM' },
    { id: 'PAY-5W8N', orderId: 'ORD-5W8N', user: 'Vikram Reddy', amount: 34000, method: 'Wallet', status: 'Failed', date: 'Oct 26, 2023, 09:45 AM' },
  ]);

  const methods = ['UPI', 'Bank Transfer', 'Wallet'];
  const statuses = ['Pending', 'Paid', 'Failed'];

  const updatePayment = (id, field, value) => {
    setPayments(payments.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200 focus:ring-orange-500/20';
      case 'Paid': return 'bg-emerald-100 text-emerald-800 border-emerald-200 focus:ring-emerald-500/20';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200 focus:ring-red-500/20';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'UPI': return <Smartphone size={14} className="text-purple-500 shrink-0" />;
      case 'Bank Transfer': return <CreditCard size={14} className="text-blue-500 shrink-0" />;
      case 'Wallet': return <Wallet size={14} className="text-orange-500 shrink-0" />;
      default: return <DollarSign size={14} className="text-slate-500 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Payment Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Review payouts, toggle statuses, and resolve user requested transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search payments..." className="pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition w-full sm:w-64" />
          </div>
          <button className="flex items-center justify-center gap-2 border border-slate-200 bg-white rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest h-14">
                <th className="px-6 font-bold">Transaction UID</th>
                <th className="px-6 font-bold">Target User</th>
                <th className="px-6 font-bold">Payout Value</th>
                <th className="px-6 font-bold">Gateway Method</th>
                <th className="px-6 font-bold text-right">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">{payment.id}</div>
                    <div className="font-black text-slate-400 text-[10px] uppercase tracking-wider mt-1">Order: {payment.orderId}</div>
                    <div className="font-semibold text-slate-400 text-[10px] mt-0.5">{payment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800 text-sm">{payment.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">₹{payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={payment.method}
                      onChange={(e) => updatePayment(payment.id, 'method', e.target.value)}
                      className="text-xs font-bold border border-slate-200 bg-slate-50 rounded-lg pl-8 pr-3 py-2 outline-none transition-colors appearance-none cursor-pointer focus:border-blue-500 hover:border-slate-300 w-36 relative z-10"
                    >
                      {methods.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <div className="absolute -mt-[26px] ml-2.5 z-20 pointer-events-none">
                       {getMethodIcon(payment.method)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end">
                      <select 
                        value={payment.status}
                        onChange={(e) => updatePayment(payment.id, 'status', e.target.value)}
                        className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border outline-none appearance-none cursor-pointer text-center ring-offset-1 focus:ring-2 transition-all shadow-sm ${getStatusColor(payment.status)}`}
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ============================================================================ //
// 8. INVENTORY MANAGEMENT VIEW (Refurbished Phones)
// ============================================================================ //
function InventoryManagementView() {
  const [inventory, setInventory] = useState([
    { id: 'INV-101', model: 'Apple iPhone 13 Pro (128GB)', grade: 'Grade A (Excellent)', price: 55000, stock: 4 },
    { id: 'INV-102', model: 'Samsung Galaxy S22 Ultra (256GB)', grade: 'Grade B (Good)', price: 42000, stock: 2 },
    { id: 'INV-103', model: 'Google Pixel 7 (128GB)', grade: 'Grade A (Excellent)', price: 38000, stock: 0 },
  ]);
  
  const grades = ['Grade A (Excellent)', 'Grade B (Good)', 'Grade C (Average)'];

  const [isAddingStock, setIsAddingStock] = useState(false);
  const [newStock, setNewStock] = useState({ model: '', grade: 'Grade A (Excellent)', price: '', stock: 1 });

  const handleUpdateStock = (id, newStockValue) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, stock: Math.max(0, newStockValue) } : item));
  };

  const handleMarkSold = (id) => {
    setInventory(inventory.map(item => {
      if (item.id === id && item.stock > 0) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    }));
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const id = `INV-${Math.floor(200 + Math.random() * 800)}`;
    setInventory([{ ...newStock, id, price: Number(newStock.price), stock: Number(newStock.stock) }, ...inventory]);
    setIsAddingStock(false);
    setNewStock({ model: '', grade: 'Grade A (Excellent)', price: '', stock: 1 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Inventory (Refurbished Phones)</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage refurbished phone stock levels and prices.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddingStock(true)} className="flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-2.5 text-sm font-black hover:bg-black shadow-md shadow-slate-200 transition">
            <Plus size={16} strokeWidth={3} /> Add Stock
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest h-14">
                <th className="px-6 font-bold">Item ID</th>
                <th className="px-6 font-bold w-[35%]">Phone Model & Grade</th>
                <th className="px-6 font-bold">Sale Price</th>
                <th className="px-6 font-bold text-center">Available Stock</th>
                <th className="px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">{item.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 text-sm">{item.model}</div>
                    <div className="font-black text-slate-400 text-[10px] uppercase tracking-wider mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100">{item.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-slate-900 text-sm">₹{item.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-max mx-auto shadow-sm">
                       <button onClick={() => handleUpdateStock(item.id, item.stock - 1)} className="text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md p-1 transition"><Minus size={14} strokeWidth={3}/></button>
                       <span className={`font-black text-sm w-4 text-center ${item.stock === 0 ? 'text-red-500' : 'text-slate-900'}`}>{item.stock}</span>
                       <button onClick={() => handleUpdateStock(item.id, item.stock + 1)} className="text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md p-1 transition"><Plus size={14} strokeWidth={3}/></button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button 
                      onClick={() => handleMarkSold(item.id)}
                      disabled={item.stock === 0}
                      className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-sm ${item.stock > 0 ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-900' : 'bg-slate-100 text-slate-400 cursor-not-allowed border outline-none'}`}
                    >
                      {item.stock > 0 ? 'Mark Sold' : 'Out of Stock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><Package size={18} className="text-blue-600"/> Add New Device</h3>
               <button onClick={() => setIsAddingStock(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><Plus size={24} className="rotate-45"/></button>
            </div>
            <form onSubmit={handleAddStock} className="p-6 space-y-4">
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Phone Model</label>
                 <input required type="text" placeholder="e.g. Apple iPhone 14 Pro" value={newStock.model} onChange={e=>setNewStock({...newStock, model: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Condition Grade</label>
                 <select required value={newStock.grade} onChange={e=>setNewStock({...newStock, grade: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 bg-white cursor-pointer transition-all">
                    {grades.map(g => <option key={g} value={g}>{g}</option>)}
                 </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Sale Price (₹)</label>
                   <input required type="number" min="0" placeholder="0.00" value={newStock.price} onChange={e=>setNewStock({...newStock, price: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 transition-all" />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Initial Quantity</label>
                   <input required type="number" min="1" value={newStock.stock} onChange={e=>setNewStock({...newStock, stock: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 bg-white transition-all" />
                 </div>
               </div>
               <div className="pt-4 flex justify-end gap-3 mt-2">
                 <button type="button" onClick={() => setIsAddingStock(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition">Cancel</button>
                 <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-black bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition flex items-center gap-1.5"><CheckCircle size={16}/> Save to Inventory</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================ //
// 9. OFFERS & COUPONS VIEW
// ============================================================================ //
function OffersManagementView() {
  const [coupons, setCoupons] = useState([
    { id: 'C-101', code: 'BASKARO10', discount: 10, expiry: '2023-12-31', isActive: true },
    { id: 'C-102', code: 'DIWALI20', discount: 20, expiry: '2023-11-15', isActive: false },
    { id: 'C-103', code: 'WELCOME5', discount: 5, expiry: '2024-01-01', isActive: true },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', expiry: '' });

  const handleToggleStatus = (id) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    const id = `C-${Math.floor(100 + Math.random() * 900)}`;
    setCoupons([{ id, code: newCoupon.code.toUpperCase(), discount: Number(newCoupon.discount), expiry: newCoupon.expiry, isActive: true }, ...coupons]);
    setIsCreating(false);
    setNewCoupon({ code: '', discount: '', expiry: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Offers & Coupons</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage promotional discount codes and monitor their status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsCreating(true)} className="flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-2.5 text-sm font-black hover:bg-black shadow-md shadow-slate-200 transition">
            <Plus size={16} strokeWidth={3} /> Create Coupon
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest h-14">
                <th className="px-6 font-bold">Coupon Code</th>
                <th className="px-6 font-bold">Discount Value</th>
                <th className="px-6 font-bold">Expiry Date</th>
                <th className="px-6 font-bold text-center">Status</th>
                <th className="px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className={`transition-colors ${coupon.isActive ? 'hover:bg-slate-50/50' : 'bg-slate-50/30 opacity-75 grayscale-[30%]'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                       <Tag size={16} className={coupon.isActive ? 'text-blue-500' : 'text-slate-400'}/>
                       <span className={`font-black tracking-wider uppercase px-2 py-0.5 rounded-lg border text-sm ${coupon.isActive ? 'bg-blue-50 text-blue-900 border-blue-200 shadow-sm' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{coupon.code}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`font-black text-sm ${coupon.isActive ? 'text-slate-800' : 'text-slate-500'}`}>{coupon.discount}% OFF</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`font-bold text-sm flex items-center gap-1.5 ${coupon.isActive ? 'text-slate-600' : 'text-slate-400'}`}><Calendar size={14} className="opacity-70"/> {coupon.expiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${coupon.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                       <span className={`w-1.5 h-1.5 rounded-full ${coupon.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                       {coupon.isActive ? 'Active' : 'Disabled'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button 
                      onClick={() => handleToggleStatus(coupon.id)}
                      className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-sm ${coupon.isActive ? 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100' : 'bg-slate-900 text-white hover:bg-black border border-slate-900'}`}
                    >
                      {coupon.isActive ? 'Disable Coupon' : 'Enable Coupon'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><Tag size={18} className="text-blue-600"/> Create Coupon</h3>
               <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><Plus size={24} className="rotate-45"/></button>
            </div>
            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4">
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Coupon Code</label>
                 <input required type="text" placeholder="e.g. SUMMER20" value={newCoupon.code} onChange={e=>setNewCoupon({...newCoupon, code: e.target.value.toUpperCase().replace(/\s/g, '')})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black uppercase tracking-wider text-slate-800 transition-all placeholder:font-medium placeholder:normal-case" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Discount (%)</label>
                 <input required type="number" min="1" max="100" placeholder="10" value={newCoupon.discount} onChange={e=>setNewCoupon({...newCoupon, discount: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black text-slate-800 transition-all placeholder:font-medium" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Expiry Date</label>
                 <input required type="date" value={newCoupon.expiry} onChange={e=>setNewCoupon({...newCoupon, expiry: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700 transition-all" />
               </div>
               <div className="pt-4 flex justify-end gap-3 mt-2">
                 <button type="button" onClick={() => setIsCreating(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition">Cancel</button>
                 <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-black bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition flex items-center gap-1.5"><CheckCircle size={16}/> Activate Now</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================ //
// 10. BANNER & CMS MANAGEMENT VIEW
// ============================================================================ //
function CmsManagementView() {
  const [banners, setBanners] = useState([
    { id: 'BNR-1', title: 'Diwali Mega Sale Top Header', position: 'Homepage', imgUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop', isActive: true },
    { id: 'BNR-2', title: '5G Upgrade Promo', position: 'App Banner', imgUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop', isActive: true },
    { id: 'BNR-3', title: 'Credit Card Flat 10% Off', position: 'Promotional Offers', imgUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop', isActive: false },
  ]);

  const positions = ['Homepage', 'App Banner', 'Promotional Offers'];
  
  const [isUploading, setIsUploading] = useState(false);
  const [newBanner, setNewBanner] = useState({ title: '', position: 'Homepage', imgUrl: 'https://images.unsplash.com/photo-1616077168079-7e09a6a715f4?q=80&w=2070&auto=format&fit=crop' });

  const handleToggleStatus = (id) => {
    setBanners(banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleDelete = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const id = `BNR-${Math.floor(10 + Math.random() * 90)}`;
    setBanners([{ id, ...newBanner, isActive: true }, ...banners]);
    setIsUploading(false);
    setNewBanner({ title: '', position: 'Homepage', imgUrl: 'https://images.unsplash.com/photo-1616077168079-7e09a6a715f4?q=80&w=2070&auto=format&fit=crop' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">CMS & Banners</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage graphical assets spanning the homepage, app, and promotional blocks.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsUploading(true)} className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-2.5 text-sm font-black hover:bg-blue-700 shadow-md shadow-blue-200 transition">
            <UploadCloud size={16} strokeWidth={3} /> Upload New Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {banners.map(banner => (
            <div key={banner.id} className={`bg-white border rounded-3xl overflow-hidden shadow-sm transition-all group ${banner.isActive ? 'border-slate-200 hover:shadow-lg' : 'border-slate-100 opacity-60 grayscale-[30%] hover:grayscale-0'}`}>
               <div className="h-40 w-full overflow-hidden relative bg-slate-100">
                  <img src={banner.imgUrl} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                     <span className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">{banner.position}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                     <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur shadow-sm flex items-center gap-1.5 ${banner.isActive ? 'bg-emerald-500/90 text-white' : 'bg-slate-800/80 text-white'}`}>
                        {banner.isActive ? 'Live' : 'Hidden'}
                     </div>
                  </div>
               </div>
               <div className="p-5">
                  <h3 className="font-black text-slate-900 text-lg mb-1 leading-tight">{banner.title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{banner.id}</p>
                  
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                     <button onClick={() => handleDelete(banner.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Trash2 size={16} strokeWidth={2.5} />
                     </button>
                     <button onClick={() => handleToggleStatus(banner.id)} className={`flex-1 h-10 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm ${banner.isActive ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-black'}`}>
                        {banner.isActive ? 'Hide Banner' : 'Publish Banner'}
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><ImageIcon size={18} className="text-blue-600"/> Upload New Banner</h3>
               <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><Plus size={24} className="rotate-45"/></button>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
               
               {/* Visual Image Uploader Mock */}
               <div className="w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 hover:border-blue-300 transition-colors cursor-pointer group">
                  <UploadCloud size={24} className="mb-2 group-hover:text-blue-500 transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-wider">Drag & Drop Image</span>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">1920x1080px (Max 2MB)</span>
               </div>

               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Banner Title</label>
                 <input required type="text" placeholder="e.g. Mega Summer Promo" value={newBanner.title} onChange={e=>setNewBanner({...newBanner, title: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black text-slate-800 transition-all placeholder:font-medium" />
               </div>

               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Display Target</label>
                 <select required value={newBanner.position} onChange={e=>setNewBanner({...newBanner, position: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black text-slate-700 bg-white cursor-pointer transition-all">
                    {positions.map(p => <option key={p} value={p}>{p}</option>)}
                 </select>
               </div>
               <div className="pt-4 flex justify-end gap-3 mt-2">
                 <button type="button" onClick={() => setIsUploading(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition">Cancel</button>
                 <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-black bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition flex items-center gap-1.5">Upload Asset</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================ //
// 11. REPORTS & ANALYTICS VIEW
// ============================================================================ //
function AnalyticsManagementView() {
  // Mock data for sales
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 450000, units: 120 },
    { name: 'Feb', revenue: 520000, units: 145 },
    { name: 'Mar', revenue: 480000, units: 130 },
    { name: 'Apr', revenue: 610000, units: 180 },
    { name: 'May', revenue: 590000, units: 170 },
    { name: 'Jun', revenue: 750000, units: 210 },
    { name: 'Jul', revenue: 820000, units: 235 },
  ];

  const brandData = [
    { name: 'Apple', value: 400, color: '#3b82f6' },
    { name: 'Samsung', value: 300, color: '#8b5cf6' },
    { name: 'OnePlus', value: 200, color: '#f59e0b' },
    { name: 'Xiaomi', value: 100, color: '#10b981' },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Baskaro Analytics Report", 14, 15);
    
    doc.text("Monthly Revenue", 14, 25);
    autoTable(doc, {
      startY: 30,
      head: [['Month', 'Revenue (INR)', 'Units Sold']],
      body: monthlyRevenueData.map(d => [d.name, `Rs ${d.revenue.toLocaleString()}`, d.units])
    });

    const finalY = doc.lastAutoTable?.finalY || 30;
    doc.text("Brand Share Tracker", 14, finalY + 15);
    autoTable(doc, {
      startY: finalY + 20,
      head: [['Brand Name', 'Market Share (Units)']],
      body: brandData.map(b => [b.name, b.value])
    });
    
    doc.save("Baskaro_Analytics_Report.pdf");
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const revenueSheet = XLSX.utils.json_to_sheet(monthlyRevenueData.map(d => ({ Month: d.name, 'Revenue (INR)': d.revenue, 'Units Sold': d.units })));
    XLSX.utils.book_append_sheet(wb, revenueSheet, "Monthly Revenue");
    
    const brandSheet = XLSX.utils.json_to_sheet(brandData.map(b => ({ 'Brand Name': b.name, 'Units Sold': b.value })));
    XLSX.utils.book_append_sheet(wb, brandSheet, "Brand Share");
    
    XLSX.writeFile(wb, "Baskaro_Analytics_Report.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Reports & Analytics</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Platform performance, monthly sales activity, and brand trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportExcel} className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl px-4 py-2 text-sm font-black hover:bg-emerald-100 transition shadow-sm">
            <Download size={16} strokeWidth={3} /> Export Excel
          </button>
          <button onClick={handleExportPDF} className="flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-2 text-sm font-black hover:bg-red-100 transition shadow-sm">
            <Download size={16} strokeWidth={3} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><DollarSign size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Monthly Revenue</p>
          <h3 className="text-3xl font-black text-slate-900">₹8.2L</h3>
          <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">+12.5% from last month</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4"><ShoppingCart size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Total Sales</p>
          <h3 className="text-3xl font-black text-slate-900">235 Units</h3>
          <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">+4.2% from last month</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4"><Tag size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Most Sold Brand</p>
          <h3 className="text-3xl font-black text-slate-900">Apple</h3>
          <p className="text-slate-500 text-xs font-bold mt-2 flex items-center gap-1">40% of standard volume</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><Smartphone size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Most Sold Model</p>
          <h3 className="text-3xl font-black text-slate-900">iPhone 13</h3>
          <p className="text-slate-500 text-xs font-bold mt-2 flex items-center gap-1">112 units moved this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col">
           <h3 className="text-lg font-black text-slate-900 mb-6 flex-shrink-0">Sales & Revenue Report</h3>
           <div className="flex-1 min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <ReBarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10}/>
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} tickFormatter={(val) => `₹${val/100000}L`}/>
                 <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', fontWeight: 700 }} />
                 <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
                 <Bar dataKey="revenue" name="Revenue (₹)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
               </ReBarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col">
           <h3 className="text-lg font-black text-slate-900 mb-2 flex-shrink-0">Market Share</h3>
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex-shrink-0">Top performing OEM brands</p>
           <div className="flex-1 min-h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                    data={brandData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {brandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 700 }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           
           <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 flex-shrink-0">
              {brandData.map(b => (
                <div key={b.name} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }}></div>
                   <span className="text-xs font-black text-slate-700">{b.name} ({b.value})</span>
                </div>
              ))}
           </div>
        </div>
      </div>

    </div>
  )
}

// ============================================================================ //
// 12. ADMIN ROLES & PERMISSIONS VIEW
// ============================================================================ //
function RolesManagementView() {
  const [admins, setAdmins] = useState([
    { id: 'ADM-01', name: 'Althea Root', email: 'root@baskaro.com', role: 'Super Admin', status: 'Active' },
    { id: 'ADM-02', name: 'Rahul Sharma', email: 'rahul@baskaro.com', role: 'Manager', status: 'Active' },
    { id: 'ADM-03', name: 'Priya Patel', email: 'priya@baskaro.com', role: 'Support', status: 'Inactive' },
  ]);

  const rolesList = ['Super Admin', 'Manager', 'Support'];

  const [permissions, setPermissions] = useState({
    'Super Admin': { manageOrders: true, manageUsers: true, manageDevices: true },
    'Manager': { manageOrders: true, manageUsers: false, manageDevices: true },
    'Support': { manageOrders: true, manageUsers: false, manageDevices: false },
  });

  const togglePermission = (role, perm) => {
    if (role === 'Super Admin') return; 
    setPermissions({
      ...permissions,
      [role]: {
        ...permissions[role],
        [perm]: !permissions[role][perm]
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    if (id === 'ADM-01') return; 
    setAdmins(admins.map(a => a.id === id ? { ...a, role: newRole } : a));
  };

  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Support' });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const id = `ADM-0${Math.floor(4 + Math.random() * 9)}`;
    setAdmins([...admins, { id, ...newAdmin, status: 'Active' }]);
    setIsAddingAdmin(false);
    setNewAdmin({ name: '', email: '', role: 'Support' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Roles & Permissions</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage platform access, active personnel, and security hierarchies.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsAddingAdmin(true)} className="flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-4 py-2 text-sm font-black hover:bg-black transition shadow-sm">
            <Plus size={16} strokeWidth={3} /> Add Personnel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Personnel Matrix */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
             <h3 className="font-black text-slate-900 text-lg flex items-center gap-2"><Users size={18} className="text-blue-500"/> Team Directory</h3>
          </div>
          <div className="overflow-x-auto flex-1 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest h-10 border-b border-slate-100">
                  <th className="px-4">Admin Identity</th>
                  <th className="px-4">Assigned Role</th>
                  <th className="px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-black text-slate-900 text-sm">{admin.name}</div>
                      <div className="font-medium text-slate-500 text-xs mt-0.5">{admin.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                       <select 
                         value={admin.role}
                         onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                         disabled={admin.id === 'ADM-01'}
                         className={`text-xs font-black uppercase tracking-widest outline-none appearance-none px-3 py-1.5 rounded-lg shadow-sm transition-all focus:ring-2 focus:border-blue-500 w-32 cursor-pointer
                            ${admin.id === 'ADM-01' ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'}
                         `}
                       >
                         {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                       </select>
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${admin.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${admin.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                          {admin.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions Configuration */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
             <h3 className="font-black text-slate-900 text-lg flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> Role Configurations</h3>
          </div>
          <div className="p-5 flex-1 space-y-6 overflow-y-auto">
             {rolesList.map(role => (
                <div key={role} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors shadow-sm bg-slate-50/20">
                   <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                      <span className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                        {role === 'Super Admin' && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                        {role === 'Manager' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                        {role === 'Support' && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                        {role} 
                      </span>
                      {role === 'Super Admin' && <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Locked</span>}
                   </div>
                   <div className="p-4 space-y-3">
                      
                      {Object.keys(permissions[role]).map(perm => {
                         const permLabel = perm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                         const isGranted = permissions[role][perm];
                         const isSuperAdmin = role === 'Super Admin';
                         return (
                            <div key={perm} className="flex justify-between items-center">
                               <span className={`text-sm font-bold ${isSuperAdmin ? 'text-slate-500' : 'text-slate-700'}`}>{permLabel}</span>
                               <button 
                                 onClick={() => togglePermission(role, perm)}
                                 disabled={isSuperAdmin}
                                 className={`w-12 h-6 flex items-center rounded-full p-1 border transition-all duration-300 shadow-inner ${isSuperAdmin ? 'bg-slate-200 border-slate-300 cursor-not-allowed opacity-70' : isGranted ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-200 border-slate-300'}`}
                               >
                                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isGranted ? 'translate-x-6' : 'translate-x-0'}`}></div>
                               </button>
                            </div>
                         )
                      })}

                   </div>
                </div>
             ))}
          </div>
        </div>

      </div>

      {isAddingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500"/> Add Admin</h3>
               <button onClick={() => setIsAddingAdmin(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><Plus size={24} className="rotate-45"/></button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-6 space-y-4">
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Name</label>
                 <input required type="text" placeholder="e.g. Jane Doe" value={newAdmin.name} onChange={e=>setNewAdmin({...newAdmin, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black text-slate-800 transition-all placeholder:font-medium" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Work Email</label>
                 <input required type="email" placeholder="jane@baskaro.com" value={newAdmin.email} onChange={e=>setNewAdmin({...newAdmin, email: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black text-slate-800 transition-all placeholder:font-medium" />
               </div>
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Assign Role</label>
                 <select required value={newAdmin.role} onChange={e=>setNewAdmin({...newAdmin, role: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-black text-slate-700 bg-white cursor-pointer transition-all">
                    {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                 </select>
               </div>
               <div className="pt-4 flex justify-end gap-3 mt-2">
                 <button type="button" onClick={() => setIsAddingAdmin(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition">Cancel</button>
                 <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-black bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition flex items-center gap-1.5"><CheckCircle size={16}/> Grant Access</button>
               </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
