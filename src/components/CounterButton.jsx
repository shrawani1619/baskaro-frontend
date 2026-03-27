import { useCounter } from '../hooks/useCounter'

export function CounterButton() {
  const { count, increment } = useCounter(0)

  return (
    <button
      type="button"
      className="mb-6 inline-flex rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={increment}
    >
      Count is {count}
    </button>
  )
}
