import React, { useState } from 'react'
import { 
  Search, Filter, Smartphone, CreditCard, Wallet, DollarSign 
} from 'lucide-react'

export default function PaymentsManagementView() {
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
                    <div className="relative inline-block w-36">
                       <select 
                         value={payment.method}
                         onChange={(e) => updatePayment(payment.id, 'method', e.target.value)}
                         className="text-xs font-bold border border-slate-200 bg-slate-50 rounded-lg pl-8 pr-3 py-2 outline-none transition-colors appearance-none cursor-pointer focus:border-blue-500 hover:border-slate-300 w-full relative z-10"
                       >
                         {methods.map(m => <option key={m} value={m}>{m}</option>)}
                       </select>
                       <div className="absolute top-1/2 -translate-y-1/2 left-2.5 z-20 pointer-events-none">
                          {getMethodIcon(payment.method)}
                       </div>
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
