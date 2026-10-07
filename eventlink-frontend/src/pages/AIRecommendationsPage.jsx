import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import VendorCard from '../components/VendorCard'
import { mockVendors } from '../data/mockVendors'

const EVENT_TYPES = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other']
const LOCATIONS = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Any']
const CATEGORY_PILLS = ['Catering', 'Photography', 'Decoration', 'Event Planning']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const YEARS = [2026, 2027]
const BUDGET_MIN = 10000
const BUDGET_MAX = 500000
const BUDGET_STEP = 10000

const matchScore = (vendor) => Math.min(99, Math.round(vendor.rating * 20))

const whyReasons = (vendor, location) => {
  const reasons = ['Matches your budget']
  reasons.push(location !== 'Any' ? `${location} location` : `${vendor.location} location`)
  if (vendor.rating >= 4.7) reasons.push(`Top rated for ${vendor.category.toLowerCase()}`)
  return reasons.join(' · ')
}

const trendingVendors = mockVendors.slice(4, 8)

function formatNPR(value) {
  return `NPR ${value.toLocaleString('en-IN')}`
}

export default function AIRecommendationsPage() {
  const [preferencesOpen, setPreferencesOpen] = useState(true)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [eventTypes, setEventTypes] = useState(new Set())
  const [budgetMin, setBudgetMin] = useState(50000)
  const [budgetMax, setBudgetMax] = useState(150000)
  const [location, setLocation] = useState('Any')
  const [month, setMonth] = useState(MONTHS[0])
  const [year, setYear] = useState(YEARS[0])
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [expandedWhy, setExpandedWhy] = useState(new Set())
  const [updateTick, setUpdateTick] = useState(0)

  const toggleEventType = (type) =>
    setEventTypes((prev) => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })

  const toggleWhy = (id) =>
    setExpandedWhy((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const recommendations = useMemo(() => {
    const filtered = categoryFilter
      ? mockVendors.filter((v) => v.category === categoryFilter)
      : mockVendors
    return filtered.slice(0, 4)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, updateTick])

  return (
    <DashboardLayout role="customer" title="AI Recommendations">
      <div className="flex flex-col gap-8">
        <section className="rounded-xl border border-[#E5E5E5] bg-white p-5 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Tell us what you're planning</h2>
            {!preferencesOpen && (
              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="text-sm font-medium text-brand hover:text-brand-hover"
              >
                Edit preferences
              </button>
            )}
          </div>

          {preferencesOpen && (
            <div className="mt-5 flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Event type</p>
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleEventType(type)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                        eventTypes.has(type)
                          ? 'border-brand bg-brand text-white'
                          : 'border-[#E5E5E5] bg-white text-[#1A1A1A] hover:border-brand'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-[#1A1A1A]">
                  Budget range: {formatNPR(budgetMin)} – {formatNPR(budgetMax)}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <label className="flex flex-1 items-center gap-3 text-xs text-[#717171]">
                    Min
                    <input
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={BUDGET_STEP}
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(Math.min(Number(e.target.value), budgetMax))}
                      className="flex-1 accent-brand"
                    />
                  </label>
                  <label className="flex flex-1 items-center gap-3 text-xs text-[#717171]">
                    Max
                    <input
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={BUDGET_STEP}
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Math.max(Number(e.target.value), budgetMin))}
                      className="flex-1 accent-brand"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                    Location preference
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                    Event date (approximate)
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUpdateTick((t) => t + 1)
                  setPreferencesOpen(false)
                }}
                className="self-start rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
              >
                Update recommendations
              </button>
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-[#1A1A1A]">🤖 Recommended for you</h2>
          </div>
          <p className="mt-1 text-sm text-[#717171]">
            Personalised based on your preferences · Updated just now
          </p>

          <button
            type="button"
            onClick={() => setHowItWorksOpen((v) => !v)}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-150 ${howItWorksOpen ? 'rotate-180' : ''}`}
            />
            How this works
          </button>
          {howItWorksOpen && (
            <p className="mt-2 rounded-lg bg-brand-light p-4 text-sm text-[#717171]">
              EventLink's AI matches your event type, budget, and location with verified
              vendors. We also ensure smaller businesses get fair visibility alongside popular
              ones.
            </p>
          )}

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {recommendations.map((vendor) => (
              <div key={vendor.id}>
                <div className="relative">
                  <VendorCard vendor={vendor} />
                  <span className="absolute right-3 top-3 rounded-full bg-[#008A05] px-2.5 py-1 text-xs font-semibold text-white">
                    {matchScore(vendor)}% match
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleWhy(vendor.id)}
                  className="mt-2 flex w-full items-center gap-1.5 text-xs font-medium text-[#717171] hover:text-brand"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${
                      expandedWhy.has(vendor.id) ? 'rotate-180' : ''
                    }`}
                  />
                  Why recommended?
                </button>
                {expandedWhy.has(vendor.id) && (
                  <p className="mt-1 rounded-lg bg-brand-light p-3 text-xs text-[#717171]">
                    {whyReasons(vendor, location)}
                  </p>
                )}
              </div>
            ))}
          </div>
          {recommendations.length === 0 && (
            <p className="mt-5 text-sm text-[#717171]">No vendors match this category yet.</p>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A]">Browse by what you need</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORY_PILLS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter((prev) => (prev === cat ? null : cat))}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  categoryFilter === cat
                    ? 'border-brand bg-brand text-white'
                    : 'border-[#E5E5E5] bg-white text-[#1A1A1A] hover:border-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A]">📈 Trending in Kathmandu</h2>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {trendingVendors.map((vendor) => (
              <div key={vendor.id} className="w-[260px] shrink-0">
                <VendorCard vendor={vendor} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
