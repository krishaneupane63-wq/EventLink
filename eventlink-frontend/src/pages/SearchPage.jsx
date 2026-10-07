import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, SearchX } from 'lucide-react'
import FilterPanel, { CATEGORY_OPTIONS, LOCATION_OPTIONS } from '../components/FilterPanel'
import VendorCard from '../components/VendorCard'
import { mockVendors } from '../data/mockVendors'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [categories, setCategories] = useState(() => {
    const cat = searchParams.get('category')
    return cat && CATEGORY_OPTIONS.includes(cat) ? new Set([cat]) : new Set()
  })
  const [location, setLocation] = useState(() => {
    const loc = searchParams.get('location')
    return loc && LOCATION_OPTIONS.includes(loc) ? loc : 'all'
  })
  const [priceLevels, setPriceLevels] = useState(new Set())
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const next = {}
    if (query) next.q = query
    if (location !== 'all') next.location = location
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, location])

  const toggleCategory = (cat) => {
    setCategories((prev) => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }
  const clearCategories = () => setCategories(new Set())

  const togglePriceLevel = (level) => {
    setPriceLevels((prev) => {
      const next = new Set(prev)
      next.has(level) ? next.delete(level) : next.add(level)
      return next
    })
  }

  const hasActiveFilters =
    categories.size > 0 || location !== 'all' || priceLevels.size > 0 || minRating > 0 || verifiedOnly

  const clearAllFilters = () => {
    setCategories(new Set())
    setLocation('all')
    setPriceLevels(new Set())
    setMinRating(0)
    setVerifiedOnly(false)
  }

  const filteredVendors = useMemo(() => {
    const q = query.trim().toLowerCase()

    let results = mockVendors.filter((vendor) => {
      if (categories.size > 0 && !categories.has(vendor.category)) return false
      if (location !== 'all' && vendor.location !== location) return false
      if (priceLevels.size > 0 && !priceLevels.has(vendor.priceLevel)) return false
      if (minRating > 0 && vendor.rating < minRating) return false
      if (verifiedOnly && !vendor.verified) return false
      if (
        q &&
        !(
          vendor.name.toLowerCase().includes(q) ||
          vendor.category.toLowerCase().includes(q) ||
          vendor.tags.some((tag) => tag.toLowerCase().includes(q))
        )
      )
        return false
      return true
    })

    if (sortBy === 'rating') {
      results = [...results].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'price-asc') {
      results = [...results].sort((a, b) => a.priceLevel - b.priceLevel)
    } else if (sortBy === 'price-desc') {
      results = [...results].sort((a, b) => b.priceLevel - a.priceLevel)
    }

    return results
  }, [query, categories, location, priceLevels, minRating, verifiedOnly, sortBy])

  const resultsLabel = useMemo(() => {
    const parts = []
    if (categories.size === 1) parts.push([...categories][0])
    if (location !== 'all') parts.push(`in ${location}`)
    const suffix = parts.length > 0 ? ` for '${parts.join(' ')}'` : ''
    return `Showing ${filteredVendors.length} result${filteredVendors.length === 1 ? '' : 's'}${suffix}`
  }, [filteredVendors.length, categories, location])

  const filterPanelProps = {
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
    onClearAll: clearAllFilters,
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-8">
      <aside className="hidden w-[260px] shrink-0 md:block">
        <div className="sticky top-[80px] rounded-xl border border-[#E5E5E5] bg-white p-5">
          <FilterPanel {...filterPanelProps} />
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white p-2">
          <label className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for catering, photography..."
              className="w-full rounded-lg py-2.5 pl-10 pr-3 text-sm text-[#1A1A1A] outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#E5E5E5] px-3 py-2.5 text-sm font-medium text-[#1A1A1A] md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
          </button>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#1A1A1A]">{resultsLabel}</p>
          <label className="flex items-center gap-2 text-sm text-[#717171]">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-[#E5E5E5] py-1.5 px-2 text-sm text-[#1A1A1A] outline-none focus:border-brand"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-[#E5E5E5] bg-white px-6 py-20 text-center">
            <SearchX className="h-10 w-10 text-[#717171]" aria-hidden="true" />
            <p className="mt-4 text-lg font-bold text-[#1A1A1A]">No vendors found</p>
            <p className="mt-1 text-sm text-[#717171]">
              Try adjusting your filters or searching a different location.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      >
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 transition-transform duration-300 ${
            drawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg font-bold text-[#1A1A1A]">Filters</p>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="text-[#717171]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <FilterPanel {...filterPanelProps} />

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="mt-6 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  )
}
