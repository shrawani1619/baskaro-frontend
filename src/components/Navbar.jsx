import { Link, NavLink } from 'react-router-dom'

const navItemClass =
  'text-sm font-semibold text-slate-800 transition hover:text-red-600'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="ml-1 flex shrink-0 items-center gap-2" aria-label="BAS karo home">
          <img
            src="/logo.png"
            alt="BAS karo"
            className="h-9 w-auto max-w-[160px] object-contain object-left"
          />
        </Link>

        <div className="relative hidden w-full max-w-xl flex-1 md:block">
          <input
            type="search"
            placeholder="Search for mobiles, accessories & more"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <NavLink to="/" className={navItemClass}>
            Home
          </NavLink>
          <NavLink to="/sell-phone" className={navItemClass}>
            Sell Phone
          </NavLink>
          <NavLink to="/home" className={navItemClass}>
            Buy Refurbished
          </NavLink>
          <button
            type="button"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  )
}
