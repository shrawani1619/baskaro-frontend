import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import * as api from '../lib/api/baskaroApi.js'

function normalizeItems(res) {
  if (!res) return []
  if (Array.isArray(res)) return res
  if (Array.isArray(res.items)) return res.items
  return []
}

export default function MarketplacePage() {
  const [params] = useSearchParams()
  const categoryId = params.get('categoryId') || ''

  const [brands, setBrands] = React.useState([])
  const [modelsByBrandId, setModelsByBrandId] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [err, setErr] = React.useState('')
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setErr('')
      try {
        const brandRes = await api.getMobileBrands({ ribbonCategoryId: categoryId, limit: 200 })
        const bItems = normalizeItems(brandRes).map((b) => ({
          id: b._id ?? b.id,
          name: b.name ?? '',
          logo: b.imageUrl ?? '',
        })).filter((b) => b.id && b.name)

        if (cancelled) return
        setBrands(bItems)

        const pairs = await Promise.all(
          bItems.map(async (b) => {
            try {
              const modelRes = await api.getMobileModels({ brandId: b.id, limit: 500 })
              const mItems = normalizeItems(modelRes)
                .map((m) => ({
                  id: m._id ?? m.id,
                  name: m.name ?? '',
                  image: m.image ?? m.imageUrl ?? '',
                }))
                .filter((m) => m.id && m.name)
              return [b.id, mItems]
            } catch {
              return [b.id, []]
            }
          }),
        )

        if (cancelled) return
        setModelsByBrandId(Object.fromEntries(pairs))
      } catch (e) {
        if (!cancelled) setErr(e?.message || 'Failed to load marketplace catalog')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [categoryId])

  const q = query.trim().toLowerCase()
  const filteredBrands = React.useMemo(() => {
    if (!q) return brands
    return brands.filter((b) => {
      if (b.name.toLowerCase().includes(q)) return true
      const ms = modelsByBrandId[b.id] || []
      return ms.some((m) => m.name.toLowerCase().includes(q))
    })
  }, [brands, modelsByBrandId, q])

  return (
    <div className="min-h-screen bg-slate-50 font-['Outfit'] pb-16">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-5">
            Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Browse all <span className="text-blue-600">brands</span> & models
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium max-w-2xl">
            Select any brand to see its full model list. Use search to quickly find a model across all brands.
          </p>
        </div>

        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search brand or model..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/15 focus:border-blue-600 transition-all"
          />
        </div>

        {err && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {err}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-slate-100 bg-white p-8">
            <div className="h-4 w-56 animate-pulse rounded bg-slate-200" />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-slate-50" />
            <p className="text-slate-500 font-bold">No matching brands/models.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-100 bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-widest">
                  Brands ({filteredBrands.length})
                </h2>
              </div>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredBrands.map((b) => (
                  <a
                    key={b.id}
                    href={`#brand-${encodeURIComponent(b.id)}`}
                    className="group rounded-2xl border border-slate-100 bg-white p-4 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                        {b.logo ? (
                          <img src={b.logo} alt={b.name} className="h-9 w-9 object-contain mix-blend-multiply" />
                        ) : (
                          <div className="text-xs font-black text-slate-300">{b.name.slice(0, 2).toUpperCase()}</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                          {b.name}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {(modelsByBrandId[b.id]?.length ?? 0)} models
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              {filteredBrands.map((b) => {
                const allModels = modelsByBrandId[b.id] || []
                const models = !q
                  ? allModels
                  : allModels.filter((m) => m.name.toLowerCase().includes(q))
                return (
                  <div
                    key={b.id}
                    id={`brand-${encodeURIComponent(b.id)}`}
                    className="rounded-3xl border border-slate-100 bg-white overflow-hidden"
                  >
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/40 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                          {b.logo ? (
                            <img src={b.logo} alt={b.name} className="h-8 w-8 object-contain mix-blend-multiply" />
                          ) : (
                            <div className="text-xs font-black text-slate-300">{b.name.slice(0, 2).toUpperCase()}</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-black text-slate-900 truncate">{b.name}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {models.length} model{models.length === 1 ? '' : 's'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {models.length === 0 ? (
                      <div className="p-8 text-sm font-semibold text-slate-500">
                        No models found.
                      </div>
                    ) : (
                      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {models.map((m) => (
                          <div
                            key={m.id}
                            className="group rounded-2xl border border-slate-100 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition"
                          >
                            <div className="h-20 w-full rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                              {m.image ? (
                                <img src={m.image} alt={m.name} className="h-full w-full object-contain p-2" />
                              ) : (
                                <div className="h-10 w-10 rounded-xl bg-slate-200" />
                              )}
                            </div>
                            <div className="mt-3 text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                              {m.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

