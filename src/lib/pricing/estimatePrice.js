import { catalog } from '../../mock/catalog.js'

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

const screenDeductionByOption = {
  Excellent: 0,
  Good: 0.08,
  Fair: 0.18,
  'Bad / Cracked': 0.35,
}

const bodyDeductionByOption = {
  Excellent: 0,
  Good: 0.06,
  Fair: 0.14,
  'Bad / Scratched': 0.3,
}

const batteryDeductionByOption = {
  '90% - 100%': 0,
  '80% - 89%': 0.1,
  '60% - 79%': 0.25,
  'Below 60%': 0.45,
}

const accessoriesDeductionByOption = {
  'Original box + all accessories': 0,
  'Original charger only': 0.03,
  'No charger / no box': 0.08,
  'No accessories': 0.12,
}

/**
 * Estimate selling price for a used phone.
 *
 * Notes:
 * - This is a front-end mock pricing engine.
 * - Admin will later configure these rules on backend.
 */
export function estimateSellingPrice({
  brand,
  model,
  ram,
  storage,
  screenCondition,
  bodyCondition,
  batteryHealth,
  accessories,
}) {
  const modelEntry = catalogGetModel({ brand, model })
  if (!modelEntry) return { finalPrice: 0, breakdown: {} }

  const variant = modelEntry.variants.find(
    (v) => v.ram === ram && v.storage === storage,
  )
  const variantDelta = variant?.priceDelta ?? 0

  const screenPct = screenDeductionByOption[screenCondition] ?? 0
  const bodyPct = bodyDeductionByOption[bodyCondition] ?? 0
  const batteryPct = batteryDeductionByOption[batteryHealth] ?? 0
  const accessoriesPct = accessoriesDeductionByOption[accessories] ?? 0

  const totalPct = clamp(screenPct + bodyPct + batteryPct + accessoriesPct, 0, 0.7)

  const base = modelEntry.basePrice + variantDelta
  const final = Math.max(500, Math.round(base * (1 - totalPct)))

  return {
    finalPrice: final,
    breakdown: {
      basePrice: modelEntry.basePrice,
      variantDelta,
      totalDeductionPct: totalPct,
      deductions: {
        screenPct,
        bodyPct,
        batteryPct,
        accessoriesPct,
      },
    },
  }
}

function catalogGetModel({ brand, model }) {
  return catalog?.[brand]?.[model] ?? null
}

