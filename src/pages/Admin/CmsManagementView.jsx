import React, { useState } from 'react'
import { 
  UploadCloud, Trash2, Image as ImageIcon, Plus 
} from 'lucide-react'

export default function CmsManagementView() {
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
