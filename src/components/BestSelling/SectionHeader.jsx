import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * @param {{
 *   title?: string
 *   onPrev: () => void
 *   onNext: () => void
 *   canPrev: boolean
 *   canNext: boolean
 *   viewAllHref?: string
 *   viewAllLabel?: string
 * }} props
 */
export function SectionHeader({
  title = 'Best Selling Phones',
  onPrev,
  onNext,
  canPrev,
  canNext,
  viewAllHref,
  viewAllLabel = 'View All',
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        {viewAllHref ? (
          <a
            href={viewAllHref}
            className="hidden text-sm font-semibold text-blue-600 hover:underline sm:inline"
          >
            {viewAllLabel}
          </a>
        ) : null}

        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous products"
          className={[
            'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 active:scale-95',
            canPrev
              ? 'bg-gray-100 text-slate-700 shadow-sm hover:bg-gray-200 hover:shadow-md active:bg-gray-300'
              : 'cursor-not-allowed bg-gray-100 text-slate-300',
          ].join(' ')}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next products"
          className={[
            'flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 active:scale-95',
            canNext
              ? 'bg-gray-100 text-slate-700 shadow-sm hover:bg-gray-200 hover:shadow-md active:bg-gray-300'
              : 'cursor-not-allowed bg-gray-100 text-slate-300',
          ].join(' ')}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

