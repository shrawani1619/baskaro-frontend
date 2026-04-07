import React, { useState } from 'react'
import { 
  Plus, Minus, Package, CheckCircle 
} from 'lucide-react'

export default function InventoryManagementView() {
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
          <h2 className="text-2xl font-black text-slate-900">Inventory</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage stock levels and prices.</p>
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
