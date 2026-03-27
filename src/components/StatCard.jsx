export function StatCard({ label, value, trend, className = '' }) {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
      {trend ? <p className="mt-1 text-xs font-semibold text-blue-600">{trend}</p> : null}
    </article>
  )
}
