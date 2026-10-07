import { Star } from 'lucide-react'

export const CATEGORY_OPTIONS = [
  'Catering',
  'Photography',
  'Decoration',
  'Event Planning',
  'Floristry',
  'DJ & Music',
  'Venues',
]

export const LOCATION_OPTIONS = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara']

export const PRICE_OPTIONS = [
  { level: 1, label: 'Budget (NPR under 10,000)' },
  { level: 2, label: 'Mid-range (NPR 10,000–50,000)' },
  { level: 3, label: 'Premium (NPR 50,000+)' },
]

function Section({ title, children }) {
  return (
    <div className="border-b border-[#E5E5E5] py-5 first:pt-0 last:border-b-0">
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">{title}</p>
      {children}
    </div>
  )
}

export default function FilterPanel({
  categories,
  toggleCategory,
  clearCategories,
  location,
  setLocation,
  priceLevels,
  togglePriceLevel,
  minRating,
  setMinRating,
  verifiedOnly,
  setVerifiedOnly,
  hasActiveFilters,
  onClearAll,
}) {
  return (
    <div>
      <Section title="Category">
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
            <input
              type="checkbox"
              checked={categories.size === 0}
              onChange={clearCategories}
              className="h-4 w-4 rounded border-[#E5E5E5] text-brand focus:ring-brand"
            />
            All categories
          </label>
          {CATEGORY_OPTIONS.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
              <input
                type="checkbox"
                checked={categories.has(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-[#E5E5E5] text-brand focus:ring-brand"
              />
              {cat}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Location">
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
            <input
              type="radio"
              name="location"
              checked={location === 'all'}
              onChange={() => setLocation('all')}
              className="h-4 w-4 border-[#E5E5E5] text-brand focus:ring-brand"
            />
            All locations
          </label>
          {LOCATION_OPTIONS.map((loc) => (
            <label key={loc} className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
              <input
                type="radio"
                name="location"
                checked={location === loc}
                onChange={() => setLocation(loc)}
                className="h-4 w-4 border-[#E5E5E5] text-brand focus:ring-brand"
              />
              {loc}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price range">
        <div className="flex flex-col gap-2.5">
          {PRICE_OPTIONS.map((opt) => (
            <label key={opt.level} className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
              <input
                type="checkbox"
                checked={priceLevels.has(opt.level)}
                onChange={() => togglePriceLevel(opt.level)}
                className="h-4 w-4 rounded border-[#E5E5E5] text-brand focus:ring-brand"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Minimum rating">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setMinRating(minRating === n ? 0 : n)}
              aria-label={`${n} star${n > 1 ? 's' : ''} & up`}
              aria-pressed={minRating >= n}
            >
              <Star
                className={`h-5 w-5 ${
                  n <= minRating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'fill-none text-[#E5E5E5]'
                }`}
              />
            </button>
          ))}
          {minRating > 0 && (
            <span className="ml-1.5 text-xs text-[#717171]">{minRating}+ stars</span>
          )}
        </div>
      </Section>

      <Section title="Verified only">
        <label className="flex cursor-pointer items-center justify-between">
          <span className="text-sm text-[#1A1A1A]">Show verified vendors only</span>
          <button
            type="button"
            role="switch"
            aria-checked={verifiedOnly}
            onClick={() => setVerifiedOnly((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
              verifiedOnly ? 'bg-brand' : 'bg-[#E5E5E5]'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${
                verifiedOnly ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </label>
      </Section>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearAll}
          className="pt-4 text-sm font-medium text-brand hover:text-brand-hover"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
