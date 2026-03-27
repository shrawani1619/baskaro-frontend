import { useCounter } from '../../../hooks/useCounter'
import './CounterButton.css'

export function CounterButton() {
  const { count, increment } = useCounter(0)

  return (
    <button type="button" className="counter" onClick={increment}>
      Count is {count}
    </button>
  )
}
