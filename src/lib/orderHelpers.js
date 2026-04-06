/** Maps backend Order.status to user-dashboard UI labels. */
export function apiOrderStatusToLabel(status) {
  const m = {
    PLACED: 'Request Submitted',
    PICKUP_SCHEDULED: 'Pickup Scheduled',
    VERIFIED: 'Device Received',
    PRICE_FINALIZED: 'Price Finalized',
    COMPLETED: 'Payment Completed',
    CANCELLED: 'Cancelled',
  }
  return m[status] || status || 'Request Submitted'
}

/** Maps admin pipeline display to API status (for advancing). */
export const ADMIN_PIPELINE = [
  'PLACED',
  'PICKUP_SCHEDULED',
  'VERIFIED',
  'PRICE_FINALIZED',
  'COMPLETED',
]

export function adminLabelToApiStatus(label) {
  const m = {
    'Order Placed': 'PLACED',
    'Pickup Scheduled': 'PICKUP_SCHEDULED',
    'Device Verification': 'VERIFIED',
    'Price Finalized': 'PRICE_FINALIZED',
    'Payment Completed': 'COMPLETED',
  }
  return m[label] || 'PLACED'
}

export function apiStatusToAdminLabel(status) {
  const m = {
    PLACED: 'Order Placed',
    PICKUP_SCHEDULED: 'Pickup Scheduled',
    VERIFIED: 'Device Verification',
    PRICE_FINALIZED: 'Price Finalized',
    COMPLETED: 'Payment Completed',
    CANCELLED: 'Cancelled',
  }
  return m[status] || status
}

export function mapConditionGrade(screen, body) {
  const bad = (s) => /bad/i.test(String(s || ''))
  if (bad(screen) || bad(body)) return 'BROKEN'
  if (screen === 'Fair' || body === 'Fair') return 'AVERAGE'
  if (screen === 'Excellent' && body === 'Excellent') return 'EXCELLENT'
  return 'GOOD'
}

export function pickupSlotToApi(slot) {
  if (!slot) return '10:00-12:00'
  if (slot.includes('9:00') || slot.includes('9:00 AM')) return '09:00-12:00'
  if (slot.includes('12:00 PM') && slot.includes('3:00')) return '12:00-15:00'
  if (slot.includes('3:00 PM') || slot.includes('6:00 PM')) return '15:00-18:00'
  return '10:00-12:00'
}
