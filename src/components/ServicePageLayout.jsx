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

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {heroPills.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/60 bg-white/80 p-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-bold text-slate-800">{searchLabel}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="h-11 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="primary" className="h-11">
                {searchButtonText}
              </Button>
            </div>
            {brands.length > 0 && (
              <>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {brandPickerSubtitle}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 hover:shadow-sm"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">{howItWorksTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howItWorks.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-blue-600 text-sm font-extrabold text-white">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showHotDeals && (
        <section className="w-full px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-red-100 via-white to-blue-100 p-6">
            <h2 className="text-2xl font-extrabold text-slate-900">{hotDealsTitle}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-36 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-slate-700">hot_deals_{n}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">Why Us</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <h3 className="text-base font-extrabold text-slate-900">{item}</h3>
                <p className="mt-1 text-sm text-slate-600">{item} with transparent and trusted experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {topBrands && topBrands.length > 0 && (
        <section className="w-full px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <TopSellingBrands brands={topBrands} title={topBrandsTitle} />
          </div>
        </section>
      )}

      {productsSection && productsSection.items?.length > 0 && (
        <section className="w-full px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-extrabold text-slate-900">{productsSection.title}</h2>
              {productsSection.viewAllHref && (
                <Button as="a" href={productsSection.viewAllHref} variant="secondary">
                  View All
                </Button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {productsSection.items.map((phone) => (
                <article
                  key={phone.name}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 via-blue-50 to-red-50 p-3">
                    <img
                      src={phone.img}
                      alt={phone.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{phone.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{productsSection.priceLabel ?? 'Get Upto'}</p>
                  <p className="text-2xl font-extrabold text-blue-700">
                    {productsSection.omitCurrency ? phone.price : `Rs ${phone.price}`}
                  </p>
                  <Button 
                    variant="danger" 
                    className="mt-3 active:scale-95 transition-transform"
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

      <section className="w-full bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">Customer Stories</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {stories.map((story, idx) => (
              <article
                key={idx}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm text-slate-600">{story}</p>
                <p className="mt-3 text-sm font-bold text-slate-900">Customer #{idx + 1}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-extrabold text-slate-900">FAQs</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((q, idx) => (
              <article key={q} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                  onClick={() => setOpenFaq((prev) => (prev === idx ? -1 : idx))}
                >
                  <span className="font-bold text-slate-900">{q}</span>
                  <span className="text-slate-500">{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <p className="border-t px-4 py-3 text-sm text-slate-600">
                    You can complete this process online, schedule pickup, and receive instant payment.
                  </p>
                )}
              </article>
            ))}
          </div>
          <Button variant="secondary" className="mt-4">
            Load More FAQs
          </Button>
        </div>
      </section>

      <DownloadAppBanner subtitle={downloadBannerSubtitle} />
    </div>
  )
}
