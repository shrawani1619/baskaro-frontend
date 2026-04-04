import { LandingNavbar } from './LandingNavbar'
import { CategoryRibbon } from './CategoryRibbon'
import { WhatsAppWidget } from './WhatsAppWidget'

/**
 * Wraps page content; add header/footer/sidebar here as the app grows.
 */
export function MainLayout({ children }) {
  return (
    <>
      <LandingNavbar />
      <CategoryRibbon />
      {children}
      <WhatsAppWidget />
      <footer className="border-t border-blue-800/90 bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950 text-blue-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <img
                src="/logo.png"
                alt="BAS karo"
                className="ml-2 h-10 w-auto max-w-[180px] object-contain object-left drop-shadow-sm"
              />
              <p className="mt-2 text-sm font-semibold text-blue-200/90">
                Buy and sell pre-owned mobiles with confidence.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">Services</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-blue-200/95">
                <a className="block transition-colors hover:text-white" href="/sell-phone">
                  Sell Phone
                </a>
                <a className="block transition-colors hover:text-white" href="/find-new-phone">
                  Find New Phone
                </a>
                <a className="block transition-colors hover:text-white" href="/buy-accessories">
                  Buy Accessories
                </a>
                <a className="block transition-colors hover:text-white" href="/repair-phone">
                  Repair Phone
                </a>
                <a className="block transition-colors hover:text-white" href="/nearby-stores">
                  Nearby Stores
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">Company</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-blue-200/95">
                <a className="block transition-colors hover:text-white" href="#">
                  About Us
                </a>
                <a className="block transition-colors hover:text-white" href="#">
                  Careers
                </a>
                <a className="block transition-colors hover:text-white" href="#">
                  Privacy Policy
                </a>
                <a className="block transition-colors hover:text-white" href="#">
                  Terms of Use
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">Help & Support</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-blue-200/95">
                <a className="block transition-colors hover:text-white" href="#">
                  FAQ
                </a>
                <a className="block transition-colors hover:text-white" href="#">
                  Contact Us
                </a>
                <a className="block transition-colors hover:text-white" href="#">
                  Warranty
                </a>
                <a className="block transition-colors hover:text-white" href="#">
                  Refund Policy
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">Portal</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-blue-200/95">
                <a className="block transition-colors hover:text-white" href="/admin/login">
                  Admin Login
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-blue-800/70 pt-6 text-center text-xs font-semibold text-blue-300/80 sm:text-left">
            Copyright &copy; {new Date().getFullYear()} BAS karo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
