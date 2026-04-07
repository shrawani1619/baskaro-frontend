import React, { useState, useEffect } from 'react'
import { 
  Download, DollarSign, ShoppingCart, Tag, Smartphone 
} from 'lucide-react'
import { 
  BarChart as ReBarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import * as api from '../../lib/api/baskaroApi.js'

export default function AnalyticsManagementView() {
  const year = new Date().getFullYear()
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [stats, setStats] = useState(null)
  const [topModelLabel, setTopModelLabel] = useState('—')
  const [analyticsErr, setAnalyticsErr] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [monthly, devices, dash] = await Promise.all([
          api.getReportMonthlyRevenue({ year }),
          api.getReportMostSoldDevices(8),
          api.dashboardStats(),
        ])
        if (cancelled) return
        const m = Array.isArray(monthly) ? monthly : []
        setMonthlyRevenueData(
          m.map((x) => ({
            name: x.month ? String(x.month).slice(5) : '',
            revenue: x.revenue ?? 0,
            units: x.orders ?? 0,
          })),
        )
        const tb = devices?.topBrands ?? []
        const palette = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899', '#14b8a6']
        setBrandData(
          tb.map((b, i) => ({
            name: b.brandName || 'Unknown',
            value: b.count ?? 0,
            color: palette[i % palette.length],
          })),
        )
        const tm = devices?.topModels?.[0]
        setTopModelLabel(tm?.modelName ? `${tm.brand || ''} ${tm.modelName}`.trim() : '—')
        setStats(dash)
        setAnalyticsErr('')
      } catch (e) {
        if (!cancelled) setAnalyticsErr(e.message || 'Failed to load analytics')
      }
    })()
    return () => { cancelled = true }
  }, [])

  const lastRev = monthlyRevenueData.length ? monthlyRevenueData[monthlyRevenueData.length - 1].revenue : 0
  const totalUnitsPeriod = monthlyRevenueData.reduce((s, x) => s + (x.units || 0), 0)

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Baskaro Analytics Report", 14, 15);
    
    doc.text("Monthly Revenue", 14, 25);
    autoTable(doc, {
      startY: 30,
      head: [['Month', 'Revenue (INR)', 'Units Sold']],
      body: monthlyRevenueData.map(d => [d.name, `Rs ${d.revenue.toLocaleString()}`, d.units])
    });

    const finalY = (doc).lastAutoTable?.finalY || 30;
    doc.text("Brand Share Tracker", 14, finalY + 15);
    autoTable(doc, {
      startY: finalY + 20,
      head: [['Brand Name', 'Market Share (Units)']],
      body: brandData.map(b => [b.name, b.value])
    });
    
    doc.save('Baskaro_Analytics_Report.pdf')
  }

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const revenueSheet = XLSX.utils.json_to_sheet(monthlyRevenueData.map(d => ({ Month: d.name, 'Revenue (INR)': d.revenue, 'Units Sold': d.units })));
    XLSX.utils.book_append_sheet(wb, revenueSheet, "Monthly Revenue");
    
    const brandSheet = XLSX.utils.json_to_sheet(brandData.map(b => ({ 'Brand Name': b.name, 'Units Sold': b.value })));
    XLSX.utils.book_append_sheet(wb, brandSheet, "Brand Share");
    
    XLSX.writeFile(wb, 'Baskaro_Analytics_Report.xlsx')
  }

  return (
    <div className="space-y-6">
      {analyticsErr && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          {analyticsErr}
        </div>
      )}
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
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Latest month revenue</p>
          <h3 className="text-3xl font-black text-slate-900">₹{Number(lastRev || 0).toLocaleString('en-IN')}</h3>
          <p className="text-slate-500 text-xs font-bold mt-2">From completed orders (report API)</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4"><ShoppingCart size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Orders (dashboard)</p>
          <h3 className="text-3xl font-black text-slate-900">{stats?.totalOrders ?? '—'}</h3>
          <p className="text-slate-500 text-xs font-bold mt-2">Units in chart period: {totalUnitsPeriod}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4"><Tag size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Top brand (units)</p>
          <h3 className="text-3xl font-black text-slate-900 truncate">{brandData[0]?.name ?? '—'}</h3>
          <p className="text-slate-500 text-xs font-bold mt-2 truncate">{brandData[0] ? `${brandData[0].value} orders` : 'No data'}</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4"><Smartphone size={24} strokeWidth={2.5}/></div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Top model</p>
          <h3 className="text-xl font-black text-slate-900 leading-tight">{topModelLabel}</h3>
          <p className="text-slate-500 text-xs font-bold mt-2">From order aggregates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col">
           <h3 className="text-lg font-black text-slate-900 mb-6 flex-shrink-0">Sales & Revenue Report</h3>
           <div className="flex-1 min-h-[300px]">
             {monthlyRevenueData.length === 0 ? (
               <div className="flex h-[300px] items-center justify-center text-sm font-semibold text-slate-400">No revenue data for {year}</div>
             ) : (
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
             )}
           </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col">
           <h3 className="text-lg font-black text-slate-900 mb-2 flex-shrink-0">Market Share</h3>
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex-shrink-0">Top performing OEM brands</p>
           <div className="flex-1 min-h-[300px] flex items-center justify-center">
             {brandData.length === 0 ? (
               <p className="text-sm font-semibold text-slate-400">No brand sales yet</p>
             ) : (
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
             )}
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
