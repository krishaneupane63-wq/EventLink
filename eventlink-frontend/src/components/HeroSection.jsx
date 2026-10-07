import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Star } from 'lucide-react'

const POPULAR_TAGS = ['Weddings', 'Birthday Parties', 'Corporate Events', 'Photoshoots']

const COLUMN_1_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    alt: 'Wedding catering table set with food',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
    alt: 'Elegant event decoration with lights',
  },
]

const COLUMN_2_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400',
    alt: 'Photographer capturing an event',
  },
  {
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    alt: 'Birthday party celebration',
  },
]

function MarqueeColumn({ images, direction, className = '' }) {
  const doubled = [...images, ...images]
  return (
    <div className={`h-[400px] overflow-hidden md:h-[560px] ${className}`}>
      <div
        className={`flex flex-col gap-3 ${
          direction === 'down' ? 'animate-scroll-down' : 'animate-scroll-up'
        } motion-reduce:animate-none`}
      >
        {doubled.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className="h-[190px] w-full shrink-0 rounded-xl object-cover md:h-64"
          />
        ))}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('location', location)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <section className="bg-brand-light">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 md:min-h-[560px] md:flex-row md:items-center md:px-8 md:py-0">
        <div className="md:w-[55%]">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
            <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
            4.8 · Trusted by 2,000+ event planners
          </div>

          <h1 className="text-[36px] font-extrabold leading-[1.15] text-[#1A1A1A] md:text-[48px]">
            Find and book the best event services in Nepal
          </h1>

          <p className="mt-4 max-w-[480px] text-lg text-[#717171]">
            Discover verified caterers, photographers, decorators and more — all in one
            place.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.10)] md:flex-row md:items-center"
          >
            <label className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="What service?"
                className="w-full rounded-lg border border-[#E5E5E5] py-3 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none focus:border-brand md:border-0"
              />
            </label>
            <span className="hidden h-8 w-px bg-[#E5E5E5] md:block" aria-hidden="true" />
            <label className="relative flex-1">
              <MapPin
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g. Kathmandu)"
                className="w-full rounded-lg border border-[#E5E5E5] py-3 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none focus:border-brand md:border-0"
              />
            </label>
            <button
              type="submit"
              className="w-full shrink-0 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover md:w-auto"
            >
              Find Services
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#717171]">
            <span>Popular:</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                className="rounded-full border border-[#E5E5E5] bg-white px-3 py-1 text-xs font-medium text-[#1A1A1A] transition-colors duration-150 hover:border-brand hover:text-brand"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-[45%]">
          <div className="grid grid-cols-2 gap-3">
            <MarqueeColumn images={COLUMN_1_IMAGES} direction="up" />
            <MarqueeColumn images={COLUMN_2_IMAGES} direction="down" className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  )
}
