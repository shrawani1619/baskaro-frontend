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
        const names = Array.isArray(list)
          ? list.map((b) => b?.name).filter(Boolean)
          : []
        setBrands(names)
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
