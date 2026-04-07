import { useEffect, useState } from 'react'
import { getCatalogBrands } from '../lib/api/baskaroApi'

/**
 * Active catalog brands from `GET /api/catalog/brands` (name, slug, sortOrder, …).
 */
export function useCatalogBrands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getCatalogBrands()
      .then((list) => {
        if (cancelled) return
        const mapped = Array.isArray(list)
          ? list.map((b) => ({
              name: b.name || '',
              logo: b.imageUrl || ''
            })).filter(b => b.name)
          : []
        setBrands(mapped)
      })
      .catch((e) => {
        if (!cancelled) setError(e)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { brands, loading, error }
}
