import { Link } from 'react-router-dom'
import { TrendingUp, MessageSquare, Heart, Star, CheckCircle2, Circle } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import StarRating from '../components/StarRating'
import { vendorDetail } from '../data/mockVendorDetail'

const businessStats = {
  profileViews: 248,
  enquiriesReceived: 17,
  savedByCustomers: 43,
  avgRating: 4.8,
  verificationStatus: 'approved', // or 'pending' or 'rejected'
}

const enquiries = [
  { id: 1, customer: 'Priya S.', event: 'Wedding · 200 guests', date: 'Oct 15 2026', status: 'New' },
  { id: 2, customer: 'Rohan A.', event: 'Corporate Dinner · 50 guests', date: 'Nov 3 2026', status: 'Responded' },
  { id: 3, customer: 'Sujata T.', event: 'Birthday Party · 40 guests', date: 'Dec 20 2026', status: 'New' },
]

const profileChecklist = [
  { label: 'Business name added', done: true },
  { label: 'Category selected', done: true },
  { label: 'Description written', done: true },
  { label: 'Portfolio images uploaded (0/5)', done: false },
  { label: 'Phone number verified', done: false },
]

const PROFILE_COMPLETE_PERCENT = 60

const VERIFICATION_BANNERS = {
  approved: {
    className: 'border-[#008A05]/30 bg-[#008A05]/10 text-[#008A05]',
    text: '✓ Your profile is live and visible to customers',
  },
  pending: {
    className: 'border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#92620A]',
    text: "⏳ Your profile is under review. We'll notify you within 24–48 hours.",
  },
  rejected: {
    className: 'border-red-300 bg-red-50 text-red-700',
    text: '✗ Your profile was not approved. Reason: incomplete portfolio. Edit and resubmit.',
  },
}

const STAT_CARDS = [
  { label: 'Profile Views', value: businessStats.profileViews, Icon: TrendingUp, color: 'text-[#008A05]' },
  { label: 'Enquiries', value: businessStats.enquiriesReceived, Icon: MessageSquare, color: 'text-[#1A1A1A]' },
  { label: 'Saved by customers', value: businessStats.savedByCustomers, Icon: Heart, color: 'text-brand' },
  { label: 'Avg Rating', value: `${businessStats.avgRating} ★`, Icon: Star, color: 'text-[#F59E0B]' },
]

function StatusBadge({ status }) {
  const styles =
    status === 'New'
      ? 'border-orange-200 bg-orange-50 text-orange-600'
      : 'border-green-200 bg-green-50 text-green-700'
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>{status}</span>
  )
}

export default function BusinessDashboardPage() {
  const banner = VERIFICATION_BANNERS[businessStats.verificationStatus]
  const recentReviews = vendorDetail.reviews.slice(0, 3)

  return (
    <DashboardLayout role="business" title="Business Dashboard">
      <div className="flex flex-col gap-8">
        <div className={`rounded-xl border p-4 text-sm font-medium ${banner.className}`}>
          {banner.text}
        </div>

        <section id="analytics" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STAT_CARDS.map(({ label, value, Icon, color }) => (
            <div key={label} className="rounded-xl border border-[#E5E5E5] bg-white p-5">
              <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              <p className="mt-3 text-2xl font-bold text-[#1A1A1A]">{value}</p>
              <p className="text-xs text-[#717171]">{label}</p>
            </div>
          ))}
        </section>

        <section id="enquiries">
          <h2 className="text-lg font-bold text-[#1A1A1A]">📬 Recent enquiries</h2>

          <div className="mt-4 hidden overflow-hidden rounded-xl border border-[#E5E5E5] bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#E5E5E5] bg-brand-light text-xs uppercase text-[#717171]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="border-b border-[#E5E5E5] last:border-b-0">
                    <td className="px-4 py-3 font-medium text-[#1A1A1A]">{enq.customer}</td>
                    <td className="px-4 py-3 text-[#717171]">{enq.event}</td>
                    <td className="px-4 py-3 text-[#717171]">{enq.date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={enq.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-lg border border-[#E5E5E5] px-3 py-1.5 text-xs font-medium text-[#1A1A1A] hover:border-brand hover:text-brand">
                        Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:hidden">
            {enquiries.map((enq) => (
              <div key={enq.id} className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{enq.customer}</p>
                    <p className="text-sm text-[#717171]">{enq.event}</p>
                  </div>
                  <StatusBadge status={enq.status} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-[#717171]">{enq.date}</p>
                  <button className="rounded-lg border border-[#E5E5E5] px-3 py-1.5 text-xs font-medium text-[#1A1A1A]">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews-received">
          <h2 className="text-lg font-bold text-[#1A1A1A]">⭐ Reviews received</h2>
          <div className="mt-4 flex flex-col rounded-xl border border-[#E5E5E5] bg-white">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex gap-4 border-b border-[#E5E5E5] p-4 last:border-b-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {review.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#1A1A1A]">{review.customerName}</p>
                  <p className="text-xs text-[#717171]">
                    {review.event} · {review.date}
                  </p>
                  <div className="mt-1.5">
                    <StarRating rating={review.rating} size={14} />
                  </div>
                  <p className="mt-2 text-sm text-[#717171]">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/vendor/1"
            className="mt-3 inline-block text-sm font-medium text-brand hover:text-brand-hover"
          >
            View all reviews →
          </Link>
        </section>

        <section id="profile-completeness">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Profile completeness</h2>
          <div className="mt-4 rounded-xl border border-[#E5E5E5] bg-white p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#1A1A1A]">{PROFILE_COMPLETE_PERCENT}% complete</span>
              <span className="text-[#717171]">Add more details to attract more customers</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${PROFILE_COMPLETE_PERCENT}%` }}
              />
            </div>

            <ul className="mt-4 flex flex-col gap-2">
              {profileChecklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-sm">
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#008A05]" aria-hidden="true" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-[#E5E5E5]" aria-hidden="true" />
                  )}
                  <span className={item.done ? 'text-[#1A1A1A]' : 'text-[#717171]'}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
