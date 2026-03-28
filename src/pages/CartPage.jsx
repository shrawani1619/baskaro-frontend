import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const navigate = useNavigate()

  const fmt = (n) => new Intl.NumberFormat('en-IN').format(n)

  if (cartCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-['Outfit']">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
          <ShoppingBag size={40} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your cart is empty</h1>
        <p className="text-slate-500 font-medium mt-2 max-w-xs">Looks like you haven't added any pre-owned devices yet.</p>
        <Link to="/find-new-phone" className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/25 flex items-center gap-2">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 font-['Outfit']">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
           <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
             <ArrowLeft size={20} className="text-slate-600" />
           </button>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart <span className="text-slate-400 font-medium ml-2">({cartCount})</span></h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 relative"
                >
                  <div className="w-full sm:w-28 h-28 bg-slate-100 rounded-2xl flex items-center justify-center p-2">
                    <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight truncate">{item.name}</h3>
                        <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Condition: Grade A (Like New)</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner border border-slate-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-colors disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-black text-slate-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-black text-slate-900 tracking-tight">Rs {fmt(Number(item.price.replace(/,/g, '')) * item.quantity)}</p>
                        <p className="text-[11px] font-bold text-slate-400">Rs {item.price} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 sticky top-24">
              <h3 className="text-xl font-black text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 text-sm font-bold">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>Rs {fmt(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pre-Owned Tax (GST)</span>
                  <span>Rs {fmt(Math.round(cartTotal * 0.12))}</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between text-xl font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-red-600 underline decoration-red-200 underline-offset-4 decoration-4">Rs {fmt(Math.round(cartTotal * 1.12))}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button 
                  onClick={() => alert('Checkout implementation pending!')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-95"
                >
                  Confirm Purchase <CreditCard size={20} />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest text-center px-4">
                  <ShieldCheck size={14} className="text-green-500" />
                  Quality Verified & Secured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
