import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext()
const STORAGE_KEY = 'baskaro_wishlist'

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    if (!product?.id) return
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
  }

  const isWishlisted = (productId) => wishlist.some((item) => item.id === productId)

  const clearWishlist = () => setWishlist([])

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      clearWishlist,
    }),
    [wishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}
