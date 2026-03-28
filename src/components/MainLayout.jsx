/**
 * Wraps page content; add header/footer/sidebar here as the app grows.
 */
export function MainLayout({ children }) {
  return (
    <>
      {children}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <img
                src="/logo.png"
                alt="BAS karo"
                className="ml-2 h-10 w-auto max-w-[180px] object-contain object-left"
              />
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Buy and sell refurbished mobiles with confidence.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Services</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-slate-600">
                <a className="block hover:text-red-700" href="/sell-phone">
                  Sell Phone
                </a>
                <a className="block hover:text-red-700" href="/">
                  Buy Refurbished Devices
                </a>
                <a className="block hover:text-red-700" href="#">
                  Pickup Scheduling
                </a>
                <a className="block hover:text-red-700" href="#">
                  Secure Payment
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Company</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-slate-600">
                <a className="block hover:text-red-700" href="#">
                  About Us
                </a>
                <a className="block hover:text-red-700" href="#">
                  Careers
                </a>
                <a className="block hover:text-red-700" href="#">
                  Privacy Policy
                </a>
                <a className="block hover:text-red-700" href="#">
                  Terms of Use
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Help & Support</h3>
              <div className="mt-3 space-y-2 text-sm font-semibold text-slate-600">
                <a className="block hover:text-red-700" href="#">
                  FAQ
                </a>
                <a className="block hover:text-red-700" href="#">
                  Contact Us
                </a>
                <a className="block hover:text-red-700" href="#">
                  Warranty
                </a>
                <a className="block hover:text-red-700" href="#">
                  Refund Policy
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t pt-6 text-center text-xs font-semibold text-slate-500 sm:text-left">
            Copyright &copy; {new Date().getFullYear()} BAS karo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
