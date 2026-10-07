import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import VendorCard from '../components/VendorCard'
import StarRating from '../components/StarRating'
import { mockVendors } from '../data/mockVendors'

const savedVendors = [mockVendors[0], mockVendors[1], mockVendors[3]]

const myReviews = [
  { vendorName: 'Annapurna Catering', rating: 5, date: 'Aug 2026', comment: 'Amazing food!' },
  { vendorName: 'Himalayan Lens', rating: 5, date: 'Jul 2026', comment: 'Perfect photos.' },
]

const recommendations = mockVendors.slice(0, 4)

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout role="customer" title="Customer Dashboard">
      <div className="flex flex-col gap-8">
        <div className="rounded-xl border-l-[3px] border-brand bg-white p-5">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Welcome back, Aarav 👋</h2>
          <p className="mt-1 text-sm text-[#717171]">
            You have {savedVendors.length} saved vendors and 1 upcoming event search.
          </p>
        </div>

        <section id="recommendations">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-[#1A1A1A]">🤖 Recommended for you</h2>
            <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-semibold text-brand">
              AI Powered
            </span>
          </div>
          <p className="mt-1 text-sm text-[#717171]">
            Based on your search history and preferences
          </p>

          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {recommendations.map((vendor) => (
              <div key={vendor.id} className="w-[260px] shrink-0">
                <VendorCard vendor={vendor} />
              </div>
            ))}
          </div>

          <Link
            to="/recommendations"
            className="mt-3 inline-block text-sm font-medium text-brand hover:text-brand-hover"
          >
            View all recommendations →
          </Link>
        </section>

        <section id="saved-vendors">
          <h2 className="text-lg font-bold text-[#1A1A1A]">❤️ Saved vendors</h2>
          {savedVendors.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} compact />
              ))}
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center rounded-xl border border-[#E5E5E5] bg-white px-6 py-14 text-center">
              <Search className="h-8 w-8 text-[#717171]" aria-hidden="true" />
              <p className="mt-3 text-sm text-[#717171]">
                You haven't saved any vendors yet.{' '}
                <Link to="/search" className="font-medium text-brand hover:text-brand-hover">
                  Start browsing →
                </Link>
              </p>
            </div>
          )}
        </section>

        <section id="my-reviews">
          <h2 className="text-lg font-bold text-[#1A1A1A]">⭐ My reviews</h2>
          <div className="mt-4 flex flex-col gap-3">
            {myReviews.map((review) => (
              <div
                key={review.vendorName}
                className="rounded-xl border border-[#E5E5E5] bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{review.vendorName}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-[#717171]">{review.date}</span>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-brand hover:text-brand-hover">
                    Edit review
                  </button>
                </div>
                <p className="mt-2 text-sm text-[#717171]">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
