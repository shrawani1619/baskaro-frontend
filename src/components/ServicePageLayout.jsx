import { useState } from 'react'
import { Button } from './Button'
import { DownloadAppBanner } from './DownloadAppBanner'
import { TopSellingBrands } from './TopBrandPortals'

/**
 * Shared marketing/service page shell — same structure as the original Sell Phone page.
 */
export function ServicePageLayout({
  breadcrumb,
  title,
  heroPills,
  searchLabel,
  searchPlaceholder,
  searchButtonText,
  brands = [],
  /** When true, show placeholder pills until `brands` are ready */
  brandsLoading = false,
  brandPickerSubtitle = 'Or choose a brand',
  howItWorksTitle = 'How it works',
  howItWorks,
  whyUs,
  showHotDeals = true,
  hotDealsTitle = 'Hot Deals',
  topBrands,
  topBrandsTitle = 'Top Selling Brands',
  productsSection,
  stories,
  faqs,
  downloadBannerSubtitle,
  productButtonLabel = 'Sell Now',
  onProductClick,
}) {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <section className="w-full border-b border-blue-100 bg-gradient-to-r from-red-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <p className="text-sm font-semibold text-slate-500">{breadcrumb}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{title}</h1>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {heroPills.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/60 bg-white/80 p-2 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur sm:rounded-xl sm:p-3 sm:text-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-3 shadow-sm sm:p-4">
            <p className="mb-3 text-xs font-bold text-slate-800 sm:text-sm">{searchLabel}</p>
            <div className="flex flex-row gap-2 sm:gap-3">
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="h-9 flex-1 rounded-lg border border-slate-300 px-3 text-xs outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500 sm:h-11 sm:text-sm"
              />
              <Button variant="primary" className="h-9 px-3 text-xs sm:h-11 sm:px-6 sm:text-sm">
                {searchButtonText}
              </Button>
            </div>
            {(brands.length > 0 || brandsLoading) && (
              <>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                  {brandPickerSubtitle}
                </p>
                <div className="mt-6 flex overflow-x-auto pb-4 gap-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden items-start">
                  {brandsLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={`brand-skel-${i}`}
                          className="h-7 min-w-[4.5rem] animate-pulse rounded-full bg-slate-200 sm:h-9 sm:min-w-[5.5rem]"
                          aria-hidden
                        />
                      ))
                    : brands.map((brand) => {
                        const name = typeof brand === 'string' ? brand : brand.name
                        const logo = typeof brand === 'object' ? brand.logo : null
                        return (
                          <button
                            key={name}
                            type="button"
                            className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
                          >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm transition group-hover:shadow-md">
                               {logo ? (
                                 <img src={logo} alt={name} className="h-10 w-10 object-contain mix-blend-multiply" />
                               ) : (
                                 <div className="h-10 w-10 flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                                   {name.slice(0, 2)}
                                 </div>
                               )}
                            </div>
                            <span className="text-[11px] font-bold text-slate-600 transition-colors group-hover:text-blue-700">
                               {name}
                            </span>
                          </button>
                        )
                      })}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{howItWorksTitle}</h2>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
            {howItWorks.map((item) => (
              <article
                key={item.step}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:rounded-2xl sm:p-5"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-blue-600 text-[10px] font-extrabold text-white sm:h-8 sm:w-8 sm:text-sm">
                  {item.step}
                </span>
                <h3 className="mt-2 text-xs font-extrabold text-slate-900 sm:mt-3 sm:text-lg">{item.title}</h3>
                <p className="mt-1 text-[10px] text-slate-600 sm:mt-2 sm:text-sm">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showHotDeals && (
        <section className="w-full px-4 pb-8 sm:pb-12">
          <div className="mx-auto max-w-7xl rounded-2xl bg-white p-4 sm:p-6">
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{hotDealsTitle}</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-24 rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:h-36 sm:rounded-2xl sm:p-4"
                >
                  <p className="text-[10px] font-bold text-slate-700 sm:text-sm">hot_deals_{n}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-4 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Why Us</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-4">
            {whyUs.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:rounded-2xl sm:p-4"
              >
                <h3 className="text-xs font-extrabold text-slate-900 sm:text-base">{item}</h3>
                <p className="mt-1 text-[10px] text-slate-600 sm:text-sm">{item} with transparent and trusted experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {topBrands && topBrands.length > 0 && (
        <section className="w-full px-4 pb-8 sm:pb-12">
          <div className="mx-auto max-w-7xl">
            <TopSellingBrands brands={topBrands} title={topBrandsTitle} />
          </div>
        </section>
      )}

      {productsSection && productsSection.items?.length > 0 && (
        <section className="w-full px-4 pb-8 sm:pb-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{productsSection.title}</h2>
              {productsSection.viewAllHref && (
                <Button as="a" href={productsSection.viewAllHref} variant="secondary" className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
                  View All
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3">
              {productsSection.items.map((phone) => (
                <article
                  key={phone.name}
                  className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-4"
                >
                  <div className="flex h-24 items-center justify-center rounded-lg bg-white p-2 sm:h-36 sm:rounded-xl sm:p-3">
                    <img
                      src={phone.img}
                      alt={phone.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="mt-2 line-clamp-1 text-xs font-bold text-slate-900 sm:mt-3 sm:text-base">{phone.name}</h3>
                  <p className="mt-1 text-[10px] font-semibold text-slate-600 sm:mt-2 sm:text-sm">{productsSection.priceLabel ?? 'Get Upto'}</p>
                  <p className="text-lg font-extrabold text-blue-700 sm:text-2xl">
                    {productsSection.omitCurrency ? phone.price : `Rs ${phone.price}`}
                  </p>
                  <Button 
                    variant="danger" 
                    className="mt-2 h-8 w-full text-[10px] transition-transform active:scale-95 sm:mt-3 sm:h-10 sm:text-sm"
                    onClick={() => onProductClick?.(phone)}
                  >
                    {productButtonLabel}
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Customer Stories</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-4">
            {stories.map((story, idx) => (
              <article
                key={idx}
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-md sm:rounded-2xl sm:p-4"
              >
                <p className="line-clamp-3 text-[10px] text-slate-600 sm:text-sm">{story}</p>
                <p className="mt-2 text-[10px] font-bold text-slate-900 sm:mt-3 sm:text-sm">Customer #{idx + 1}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">FAQs</h2>
          <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
            {faqs.map((q, idx) => (
              <article key={q} className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-2 text-left transition hover:bg-slate-50 sm:px-4 sm:py-3"
                  onClick={() => setOpenFaq((prev) => (prev === idx ? -1 : idx))}
                >
                  <span className="text-xs font-bold text-slate-900 sm:text-sm md:text-base">{q}</span>
                  <span className="text-slate-500">{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="border-t px-3 py-2 text-[10px] text-slate-600 sm:px-4 sm:py-3 sm:text-sm">
                    You can complete this process online, schedule pickup, and receive instant payment.
                  </p>
                )}
              </article>
            ))}
          </div>
          <Button variant="secondary" className="mt-4 h-9 px-4 text-xs sm:h-11 sm:px-6 sm:text-sm">
            Load More FAQs
          </Button>
        </div>
      </section>

      <DownloadAppBanner subtitle={downloadBannerSubtitle} />
    </div>
  )
}
