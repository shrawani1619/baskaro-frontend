import React, { useState, useEffect } from 'react'
import { 
  Smartphone, ChevronLeft, ChevronRight, CheckCircle 
} from 'lucide-react'
import * as api from '../../lib/api/baskaroApi.js'

export const ADMIN_PIPELINE = [
  'ORDER_PLACED',
  'PICKUP_SCHEDULED',
  'DRVC_VRF',
  'PRC_FNL',
  'PAY_CMP',
];

export function apiStatusToAdminLabel(s) {
  if (s === 'ORDER_PLACED') return 'Order Placed';
  if (s === 'PICKUP_SCHEDULED') return 'Pickup Scheduled';
  if (s === 'DRVC_VRF') return 'Device Verification';
  if (s === 'PRC_FNL') return 'Price Finalized';
  if (s === 'PAY_CMP') return 'Payment Completed';
  if (s === 'CANCELLED') return 'Cancelled';
  return s;
}

export default function OrdersManagementView() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [busyId, setBusyId] = useState(null)

  const PIPELINE = [
    'Order Placed',
    'Pickup Scheduled',
    'Device Verification',
    'Price Finalized',
    'Payment Completed',
  ]

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.getOrderManagementList({ page: 1, limit: 50 })
      const items = res.items || []
      setOrders(
        items.map((o) => ({
          id: o._id,
          customer: (typeof o.userId === 'object' && o.userId?.name) || o.userId?.phone || '—',
          phone: `${o.brand || ''} ${o.modelName || ''}`.trim() || '—',
          storage: o.storage || '—',
          price: o.finalPrice ?? 0,
          date: o.createdAt
            ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            : '—',
          status: apiStatusToAdminLabel(o.status),
          apiStatus: o.status,
        })),
      )
      setErr('')
    } catch (e) {
      setErr(e.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const advanceOrder = async (row) => {
    const i = ADMIN_PIPELINE.indexOf(row.apiStatus)
    if (i < 0 || i >= ADMIN_PIPELINE.length - 1) return
    const next = ADMIN_PIPELINE[i + 1]
    setBusyId(row.id)
    try {
      await api.patchOrderManagementStatus(row.id, { status: next, notes: '' })
      await load()
    } catch (e) {
      setErr(e.message || 'Update failed')
    } finally {
      setBusyId(null)
    }
  }

  const regressOrder = async (row) => {
    const i = ADMIN_PIPELINE.indexOf(row.apiStatus)
    if (i <= 0) return
    const prev = ADMIN_PIPELINE[i - 1]
    setBusyId(row.id)
    try {
      await api.patchOrderManagementStatus(row.id, { status: prev, notes: '' })
      await load()
    } catch (e) {
      setErr(e.message || 'Update failed')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Order Management</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Live data from <code className="text-xs">GET /api/order-management</code>. Next/Prev call PATCH status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => load()} className="flex items-center justify-center gap-2 border border-slate-200 bg-white rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition">
            Refresh
          </button>
        </div>
      </div>

      {err && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{err}</div>}
      {loading && <div className="text-sm font-semibold text-slate-500">Loading orders…</div>}

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
                          const currentIdx = Math.max(0, PIPELINE.indexOf(order.status));
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
                          {order.status !== 'Order Placed' && order.apiStatus !== 'CANCELLED' && (
                             <button 
                               type="button"
                               disabled={busyId === order.id}
                               onClick={() => regressOrder(order)}
                               className="bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 px-3 h-8 rounded-lg text-xs font-black shadow-sm flex items-center justify-center transition-colors"
                               title="Undo Stage"
                             >
                               <ChevronLeft size={16} strokeWidth={2.5}/>
                             </button>
                          )}
                          {order.status !== 'Payment Completed' && order.apiStatus !== 'CANCELLED' && (
                             <button 
                               type="button"
                               disabled={busyId === order.id}
                               onClick={() => advanceOrder(order)}
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
