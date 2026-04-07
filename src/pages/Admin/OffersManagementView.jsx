import React, { useState } from 'react'
import { 
  Plus, Tag, Calendar, CheckCircle 
} from 'lucide-react'

export default function OffersManagementView() {
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
