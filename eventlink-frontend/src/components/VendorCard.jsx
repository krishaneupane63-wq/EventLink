import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart, BadgeCheck } from 'lucide-react'
import StarRating from './StarRating'

export default function VendorCard({ vendor, compact = false }) {
  const [favorited, setFavorited] = useState(false)

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
      <div className={`relative w-full ${compact ? 'h-32' : 'h-48'}`}>
        <img
          src={vendor.image}
          alt={vendor.name}
          className="h-full w-full object-cover"
        />
        {vendor.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${
              vendor.badge === 'Top Rated' ? 'bg-brand' : 'bg-[#1A1A1A]'
            }`}
          >
            {vendor.badge}
          </span>
        )}
        {vendor.verified && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-[#008A05] bg-white/90 px-2 py-0.5 text-xs font-medium text-[#008A05]">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            Verified
          </span>
        )}
      </div>

      <div className={`flex-1 ${compact ? 'p-3' : 'p-4'}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {vendor.category}
        </p>
        <p className="mt-1 truncate text-base font-bold text-[#1A1A1A]">{vendor.name}</p>
        <div className="mt-1 flex items-center gap-1 text-sm text-[#717171]">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {vendor.location}
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          <StarRating rating={vendor.rating} />
          <span className="text-sm font-bold text-[#1A1A1A]">{vendor.rating}</span>
          <span className="text-sm text-[#717171]">({vendor.reviewCount} reviews)</span>
        </div>

        <p className="mt-1 text-sm text-[#717171]">{vendor.priceRange}</p>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-sm text-[#717171]">{vendor.description}</p>
        )}
      </div>

      <div className={`flex items-center justify-between border-t border-[#E5E5E5] pt-3 ${compact ? 'p-3' : 'p-4'}`}>
        <Link
          to={`/vendor/${vendor.id}`}
          className="text-sm font-medium text-brand hover:text-brand-hover"
        >
          View profile
        </Link>
        <button
          type="button"
          onClick={() => setFavorited((v) => !v)}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
          aria-pressed={favorited}
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-150 ${
              favorited ? 'fill-brand text-brand' : 'text-[#717171]'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
