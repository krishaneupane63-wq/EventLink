import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'

const CATEGORIES = [
  'Catering',
  'Photography',
  'Decoration',
  'Event Planning',
  'Floristry',
  'Venues',
  'DJ & Music',
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link to="/" className="shrink-0 text-[22px] font-bold text-[#1A1A1A]">
          Event<span className="text-brand">Link</span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <label className="relative w-[380px]">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search for catering, photography..."
              className="w-full rounded-full border border-[#E5E5E5] bg-white py-2.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand"
            />
          </label>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg border border-[#1A1A1A] bg-transparent px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition-colors duration-150 hover:bg-[#1A1A1A] hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/register/business"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
          >
            List your business
          </Link>
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-[#1A1A1A] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="hidden border-t border-[#E5E5E5] md:block">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-8 py-2.5 text-sm text-[#717171]">
          {CATEGORIES.map((cat, i) => (
            <span key={cat} className="flex items-center gap-4">
              <a href="#" className="transition-colors duration-150 hover:text-brand">
                {cat}
              </a>
              {i < CATEGORIES.length - 1 && (
                <span className="h-3 w-px bg-[#E5E5E5]" aria-hidden="true" />
              )}
            </span>
          ))}
        </nav>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#E5E5E5] px-4 py-4 md:hidden">
          <label className="relative mb-4 block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search for catering, photography..."
              className="w-full rounded-full border border-[#E5E5E5] bg-white py-2.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none focus:border-brand"
            />
          </label>
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full rounded-lg border border-[#1A1A1A] bg-transparent px-4 py-2.5 text-center text-sm font-semibold text-[#1A1A1A]"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/register/business"
              className="w-full rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              List your business
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
