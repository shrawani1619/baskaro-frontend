import React, { useState } from 'react'
import { 
  UploadCloud, Trash2 
} from 'lucide-react'

export default function AddNewModelForm({ onCancel, initialBrand, initialCategory, editingModel, onSave }) {
  const [imagePreview, setImagePreview] = useState(editingModel?.image || null);
  const [formData, setFormData] = useState({
    brand: editingModel?.brand || initialBrand || '',
    modelName: editingModel?.name || '',
    category: editingModel?.category || initialCategory || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.brand || !formData.modelName) {
      alert('Please fill in the Brand and Model Name.');
      return;
    }
    
    onSave({
      name: formData.modelName,
      brand: formData.brand,
      category: formData.category,
      image: imagePreview || ''
    });
  };
  
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
          <h3 className="text-lg font-black text-slate-900">Create New Product Listing</h3>
          <p className="text-sm text-slate-500 mt-1">Fill in the specifications to list a new item on the marketplace.</p>
       </div>

       <div className="p-8 grid gap-10 xl:grid-cols-3">
          {/* Left Column - Image Upload */}
          <div className="xl:col-span-1 space-y-4">
             <label className="text-sm font-black uppercase text-slate-800 tracking-wider">Product Primary Image <span className="text-red-500">*</span></label>
             
             <div 
               className="relative border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-colors flex flex-col items-center justify-center h-72 cursor-pointer group overflow-hidden"
               onDragOver={(e) => e.preventDefault()}
               onDrop={(e) => {
                 e.preventDefault();
                 if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                   handleImageChange(e.dataTransfer.files[0]);
                 }
               }}
               onClick={() => document.getElementById('product-image-upload').click()}
             >
               <input 
                 id="product-image-upload" 
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
                         document.getElementById('product-image-upload').value = '';
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
                     <select 
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                     >
                        <option value="">Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="OnePlus">OnePlus</option>
                        {initialBrand && <option value={initialBrand}>{initialBrand}</option>}
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-1.5">Model Name <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        placeholder="e.g. iPhone 15 Pro Max" 
                        value={formData.modelName}
                        onChange={(e) => setFormData({...formData, modelName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all" 
                     />
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
          <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold hover:bg-slate-100 transition">Cancel</button>
          <button 
            type="button" 
            onClick={handleSubmit} 
            className="px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-black shadow-md shadow-blue-200 hover:bg-blue-700 transition"
          >
            {editingModel ? 'Update Product Details' : 'Publish Product Listing'}
          </button>
       </div>
    </div>
  )
}
