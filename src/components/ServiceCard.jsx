import React from 'react'
import { useNavigate } from 'react-router-dom'

export function ServiceCard({ label, path, thumbUrl }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(path)}
      className="group flex flex-col items-center justify-start rounded-2xl p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02]"
    >
      <div className="relative flex h-40 w-full max-w-[190px] items-center justify-center rounded-3xl bg-[#eaf3f2] ring-2 ring-transparent transition-all duration-200 group-hover:bg-[#dff0ee] group-hover:ring-red-200 group-hover:shadow-md">
        <img
          src={thumbUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-36 w-36 object-contain"
        />

        {/* Hover arrow badge */}
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 scale-75">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <span className="mt-4 text-center text-sm font-bold text-slate-800 transition-colors duration-150 group-hover:text-red-700">
        {label}
      </span>
    </button>
  )
}

