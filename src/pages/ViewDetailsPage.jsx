import { Link, useParams } from 'react-router-dom'
import { EXCLUSIVE_STORES } from '../constants/exclusiveStores'
import { ExclusiveStoreDetailsCard } from '../components/ExclusiveStoreDetailsCard'
import { Button } from '../components/Button'

export default function ViewDetailsPage() {
  const { storeId } = useParams()
  const store = EXCLUSIVE_STORES.find((s) => s.id === storeId)

  return (
    <section className="min-h-[60vh]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-500">Home / View Details</p>

          <Button as="a" href="/" variant="secondary">
            Back to Stores
          </Button>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
          Store Details
        </h1>

        <div className="mt-6">
          {store ? (
            <ExclusiveStoreDetailsCard store={store} />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-slate-900">Store not found</p>
              <p className="mt-2 text-sm text-slate-600">
                The store you’re looking for doesn’t exist or the link is invalid.
              </p>
              <div className="mt-4">
                <Link to="/" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                  Go back
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

