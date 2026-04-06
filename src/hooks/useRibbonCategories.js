import { useCallback, useEffect, useState } from 'react'
import { getRibbonCategories } from '../lib/api/baskaroApi.js'

/**
 * Normalizes various API shapes to a plain array (unwrap + legacy wrappers).
 */
export function extractRibbonList(payload) {
  if (payload == null) return []
  if (Array.isArray(payload)) return payload
  if (typeof payload === 'object') {
    if (Array.isArray(payload.data)) return payload.data
    if (Array.isArray(payload.items)) return payload.items
  }
  return []
}

/**
 * Loads homepage ribbon categories from `GET /api/ribbon-categories` (active only, sorted).
 */
export function useRibbonCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fromApi, setFromApi] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const raw = await getRibbonCategories()
      const list = extractRibbonList(raw)
      setCategories(list)
      setFromApi(Array.isArray(list) && list.length > 0)
      if (list.length === 0) setError(null)
    } catch (e) {
      setCategories([])
      setFromApi(false)
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { categories, loading, error, fromApi, refetch: load }
}
