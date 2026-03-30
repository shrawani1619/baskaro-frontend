export function ExclusiveStoreDetailsCard({ store }) {
  if (!store) return null

  return (
    <article className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
        {store.city}
      </div>

      <h1 className="mt-4 text-xl font-extrabold leading-snug text-slate-900">
        {store.name}
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-slate-500">{store.address}</p>

      <div className="mt-3 text-sm font-semibold text-slate-600">
        Timings : <span className="font-bold text-slate-700">{store.timings}</span>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
          Services
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-800">
          Sell • Buy • Repair
        </p>
        <p className="mt-1 text-xs font-medium text-slate-500">
          For availability, please contact the store during working hours.
        </p>
      </div>
    </article>
  )
}

