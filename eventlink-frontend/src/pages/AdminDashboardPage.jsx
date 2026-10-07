import { useState } from 'react'
import { MapPin } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import Toast from '../components/Toast'

const INITIAL_PENDING = [
  {
    id: 101,
    name: 'Sunrise Events Co.',
    category: 'Event Planning',
    location: 'Pokhara',
    submittedDate: 'Sep 20 2026',
    description: 'Full-service event planning team covering weddings, corporate functions, and festivals across Pokhara.',
  },
  {
    id: 102,
    name: 'Deva Photography',
    category: 'Photography',
    location: 'Kathmandu',
    submittedDate: 'Sep 21 2026',
    description: 'Documentary-style wedding and portrait photography with a 5-year portfolio in the Kathmandu Valley.',
  },
  {
    id: 103,
    name: 'Mountain Cuisine',
    category: 'Catering',
    location: 'Bhaktapur',
    submittedDate: 'Sep 22 2026',
    description: 'Traditional Newari and modern fusion catering for weddings and cultural celebrations.',
  },
]

const INITIAL_APPROVED = [
  { id: 201, name: 'Kathmandu Sound Co.', category: 'DJ & Music', approvedDate: 'Sep 18 2026' },
  { id: 202, name: 'Fresh Petals Florist', category: 'Floristry', approvedDate: 'Sep 17 2026' },
  { id: 203, name: 'Prime Venue Hall', category: 'Venue', approvedDate: 'Sep 15 2026' },
  { id: 204, name: 'Capture Moments Studio', category: 'Photography', approvedDate: 'Sep 12 2026' },
  { id: 205, name: 'Spice Route Catering', category: 'Catering', approvedDate: 'Sep 10 2026' },
]

const SUMMARY_STATS = [
  { label: 'Approved this month', value: 18, className: 'border-green-200 bg-green-50 text-green-700' },
  { label: 'Total active vendors', value: 127, className: 'border-blue-200 bg-blue-50 text-blue-700' },
]

export default function AdminDashboardPage() {
  const [pending, setPending] = useState(INITIAL_PENDING)
  const [approved, setApproved] = useState(INITIAL_APPROVED)
  const [fadingIds, setFadingIds] = useState(new Set())
  const [rejectingId, setRejectingId] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [toast, setToast] = useState(null)

  const fadeThenRemove = (id, onRemove) => {
    setFadingIds((prev) => new Set(prev).add(id))
    setTimeout(() => {
      onRemove()
      setFadingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 300)
  }

  const handleApprove = (vendor) => {
    fadeThenRemove(vendor.id, () => {
      setPending((prev) => prev.filter((v) => v.id !== vendor.id))
      setApproved((prev) => [
        { id: vendor.id, name: vendor.name, category: vendor.category, approvedDate: 'Sep 22 2026' },
        ...prev,
      ].slice(0, 5))
    })
    setToast({ message: 'Profile approved!', type: 'success' })
  }

  const openRejectForm = (id) => {
    setRejectingId((current) => (current === id ? null : id))
    setRejectReason('')
  }

  const confirmReject = (id) => {
    fadeThenRemove(id, () => {
      setPending((prev) => prev.filter((v) => v.id !== id))
    })
    setRejectingId(null)
    setToast({ message: 'Profile rejected.', type: 'error' })
  }

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="flex flex-col gap-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-yellow-700">
            <p className="text-2xl font-bold">{pending.length}</p>
            <p className="text-xs font-medium">Pending review</p>
          </div>
          {SUMMARY_STATS.map((stat) => (
            <div key={stat.label} className={`rounded-xl border p-5 ${stat.className}`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A]">📋 Pending approvals</h2>

          {pending.length > 0 ? (
            <div className="mt-4 flex flex-col gap-4">
              {pending.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`rounded-xl border border-[#E5E5E5] bg-white p-5 transition-opacity duration-300 ${
                    fadingIds.has(vendor.id) ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-[#1A1A1A]">{vendor.name}</p>
                        <span className="rounded-full bg-brand-light px-2 py-0.5 text-xs font-semibold text-brand">
                          {vendor.category}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-[#717171]">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {vendor.location}
                      </div>
                      <p className="mt-1 text-xs text-[#717171]">Submitted: {vendor.submittedDate}</p>
                      <p className="mt-3 max-w-2xl text-sm text-[#717171]">{vendor.description}</p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleApprove(vendor)}
                        className="rounded-lg bg-[#008A05] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#00700A]"
                      >
                        ✓ Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => openRejectForm(vendor.id)}
                        className="rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-600 transition-colors duration-150 hover:bg-red-50"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </div>

                  {rejectingId === vendor.id && (
                    <div className="mt-4 rounded-lg border border-[#E5E5E5] bg-brand-light p-4">
                      <label htmlFor={`reject-reason-${vendor.id}`} className="text-sm font-medium text-[#1A1A1A]">
                        Reason for rejection
                      </label>
                      <textarea
                        id={`reject-reason-${vendor.id}`}
                        rows={3}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Explain what needs to change before this profile can be approved..."
                        className="mt-2 w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                      />
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => confirmReject(vendor.id)}
                          disabled={!rejectReason.trim()}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Confirm rejection
                        </button>
                        <button
                          type="button"
                          onClick={() => setRejectingId(null)}
                          className="rounded-lg px-4 py-2 text-sm font-medium text-[#717171] hover:text-[#1A1A1A]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-[#E5E5E5] bg-white p-10 text-center text-sm text-[#717171]">
              No pending profiles — you're all caught up.
            </div>
          )}
        </section>

        <section id="recently-approved">
          <h2 className="text-lg font-bold text-[#1A1A1A]">Recently approved</h2>
          <div className="mt-4 flex flex-col rounded-xl border border-[#E5E5E5] bg-white">
            {approved.slice(0, 5).map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between border-b border-[#E5E5E5] p-4 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium text-[#1A1A1A]">{vendor.name}</p>
                  <p className="text-xs text-[#717171]">{vendor.category}</p>
                </div>
                <p className="text-xs text-[#717171]">{vendor.approvedDate}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </DashboardLayout>
  )
}
