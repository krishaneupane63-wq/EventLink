import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, MapPin, Phone, Mail, Star, X } from 'lucide-react'
import { vendorDetail } from '../data/mockVendorDetail'
import { mockVendors } from '../data/mockVendors'
import VendorCard from '../components/VendorCard'
import StarRating from '../components/StarRating'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EVENT_TYPES = ['Wedding', 'Birthday', 'Corporate', 'Other']

function ratingBreakdown(reviews) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((r) => {
    counts[r.rating] = (counts[r.rating] || 0) + 1
  })
  const total = reviews.length || 1
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: Math.round((counts[star] / total) * 100),
  }))
}

export default function VendorProfilePage() {
  const vendor = vendorDetail
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const breakdown = useMemo(() => ratingBreakdown(vendor.reviews), [vendor.reviews])

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    date: '',
    eventType: 'Wedding',
    guests: '',
    message: '',
  })
  const [enquiryErrors, setEnquiryErrors] = useState({})
  const [enquirySent, setEnquirySent] = useState(false)

  const updateEnquiry = (field) => (e) =>
    setEnquiry((prev) => ({ ...prev, [field]: e.target.value }))

  const handleEnquirySubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!enquiry.name.trim()) errors.name = 'Name is required'
    if (!EMAIL_RE.test(enquiry.email)) errors.email = 'Enter a valid email address'
    if (!enquiry.message.trim()) errors.message = 'Please add a short message'
    setEnquiryErrors(errors)
    if (Object.keys(errors).length === 0) setEnquirySent(true)
  }

  const similarVendors = mockVendors.filter((v) => vendor.similarVendors.includes(v.id))

  return (
    <div className="pb-16">
      <section
        className="relative flex h-[300px] items-end bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${vendor.portfolio[0]})`,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-8">
          <span className="inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            {vendor.category}
          </span>
          <h1 className="mt-3 text-[28px] font-bold text-white md:text-[40px]">{vendor.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {vendor.location}
            {vendor.verified && (
              <span className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-0.5 text-xs font-medium">
                <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                Verified
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="min-w-0 flex-1 md:w-[65%]">
            <div className="grid grid-cols-2 gap-4 border-b border-[#E5E5E5] pb-6 text-center sm:grid-cols-4">
              <div>
                <p className="text-xl font-bold text-[#1A1A1A]">⭐ {vendor.rating}</p>
                <p className="text-xs text-[#717171]">Rating</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#1A1A1A]">💬 {vendor.reviewCount}</p>
                <p className="text-xs text-[#717171]">Reviews</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#1A1A1A]">📅 {vendor.established}</p>
                <p className="text-xs text-[#717171]">Established</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#1A1A1A]">👥 {vendor.teamSize}</p>
                <p className="text-xs text-[#717171]">Team size</p>
              </div>
            </div>

            <section className="border-b border-[#E5E5E5] py-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">About {vendor.name}</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#717171]">
                {vendor.description}
              </p>
            </section>

            <section className="border-b border-[#E5E5E5] py-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Services & Pricing</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {vendor.services.map((service) => (
                  <div
                    key={service.name}
                    className="rounded-xl border border-[#E5E5E5] bg-white p-4"
                  >
                    <p className="font-bold text-[#1A1A1A]">{service.name}</p>
                    <p className="mt-1 text-sm font-medium text-brand">{service.price}</p>
                    <p className="mt-1 text-sm text-[#717171]">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-[#E5E5E5] py-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Portfolio</h2>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                {vendor.portfolio.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxSrc(src)}
                    className={`overflow-hidden rounded-lg ${i === 0 ? 'col-span-2' : ''}`}
                  >
                    <img
                      src={src}
                      alt={`${vendor.name} portfolio photo ${i + 1}`}
                      className={`w-full object-cover transition-transform duration-200 hover:scale-105 ${
                        i === 0 ? 'h-64' : 'h-32'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </section>

            <section className="border-b border-[#E5E5E5] py-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Specialises in</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {vendor.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#E5E5E5] bg-brand-light px-3 py-1 text-sm text-[#1A1A1A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="border-b border-[#E5E5E5] py-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Customer reviews</h2>

              <div className="mt-4 flex flex-col gap-1.5">
                {breakdown.map(({ star, percent }) => (
                  <div key={star} className="flex items-center gap-2 text-sm text-[#717171]">
                    <span className="w-8 shrink-0">{star}★</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
                      <div
                        className="h-full rounded-full bg-[#F59E0B]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right">{percent}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col">
                {vendor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-4 border-b border-[#E5E5E5] py-5 last:border-b-0"
                  >
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
            </section>

            <section className="border-b border-[#E5E5E5] py-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Share your experience</h2>
              <div className="mt-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setReviewRating(n)}
                    aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        n <= reviewRating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'fill-none text-[#E5E5E5]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell others about your experience..."
                className="mt-4 w-full rounded-lg border border-[#E5E5E5] p-4 text-sm text-[#1A1A1A] outline-none focus:border-brand"
              />
              <button
                type="button"
                className="mt-3 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
              >
                Post review
              </button>
              <p className="mt-3 text-xs text-[#717171]">
                Only verified customers can post reviews.{' '}
                <Link to="/login" className="font-medium text-brand hover:text-brand-hover">
                  Sign in to leave a review.
                </Link>
              </p>
            </section>

            {similarVendors.length > 0 && (
              <section className="pt-8">
                <h2 className="text-xl font-bold text-[#1A1A1A]">You might also like</h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {similarVendors.map((v) => (
                    <VendorCard key={v.id} vendor={v} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="md:w-[35%]">
            <div className="sticky top-24 rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
              <p className="text-lg font-bold text-brand">{vendor.priceRange}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <StarRating rating={vendor.rating} />
                <span className="text-sm font-bold text-[#1A1A1A]">{vendor.rating}</span>
                <span className="text-sm text-[#717171]">({vendor.reviewCount} reviews)</span>
              </div>

              {enquirySent ? (
                <div className="mt-5 rounded-lg bg-brand-light p-4 text-sm text-[#1A1A1A]">
                  <p className="font-semibold">Enquiry sent!</p>
                  <p className="mt-1 text-[#717171]">
                    {vendor.name} usually responds within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} noValidate className="mt-5 flex flex-col gap-3">
                  <div>
                    <input
                      type="text"
                      value={enquiry.name}
                      onChange={updateEnquiry('name')}
                      placeholder="Your name"
                      className={`w-full rounded-lg border py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand ${
                        enquiryErrors.name ? 'border-red-500' : 'border-[#E5E5E5]'
                      }`}
                    />
                    {enquiryErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{enquiryErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      value={enquiry.email}
                      onChange={updateEnquiry('email')}
                      placeholder="Your email"
                      className={`w-full rounded-lg border py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand ${
                        enquiryErrors.email ? 'border-red-500' : 'border-[#E5E5E5]'
                      }`}
                    />
                    {enquiryErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{enquiryErrors.email}</p>
                    )}
                  </div>

                  <input
                    type="date"
                    value={enquiry.date}
                    onChange={updateEnquiry('date')}
                    className="w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                  />

                  <select
                    value={enquiry.eventType}
                    onChange={updateEnquiry('eventType')}
                    className="w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={enquiry.guests}
                    onChange={updateEnquiry('guests')}
                    placeholder="Estimated guests"
                    className="w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand"
                  />

                  <div>
                    <textarea
                      rows={3}
                      value={enquiry.message}
                      onChange={updateEnquiry('message')}
                      placeholder="Tell us about your event requirements..."
                      className={`w-full rounded-lg border py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand ${
                        enquiryErrors.message ? 'border-red-500' : 'border-[#E5E5E5]'
                      }`}
                    />
                    {enquiryErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{enquiryErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
                  >
                    Send enquiry
                  </button>
                </form>
              )}

              <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#717171]">
                <p>✓ Usually responds within 24 hours</p>
                <p>✓ Free to enquire — no obligation</p>
              </div>

              <div className="mt-5 flex flex-col gap-2.5 border-t border-[#E5E5E5] pt-5 text-sm text-[#1A1A1A]">
                <a href={`tel:${vendor.phone}`} className="flex items-center gap-2 hover:text-brand">
                  <Phone className="h-4 w-4 text-[#717171]" aria-hidden="true" />
                  {vendor.phone}
                </a>
                <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 hover:text-brand">
                  <Mail className="h-4 w-4 text-[#717171]" aria-hidden="true" />
                  {vendor.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
            className="absolute right-6 top-6 text-white hover:text-white/70"
          >
            <X className="h-7 w-7" />
          </button>
          <img
            src={lightboxSrc}
            alt="Portfolio full size"
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
