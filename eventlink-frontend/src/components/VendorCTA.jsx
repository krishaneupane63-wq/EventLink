import { Check } from 'lucide-react'

const BENEFITS = [
  'Free to list your business',
  'Get discovered by thousands of event planners',
  'Manage enquiries from your dashboard',
]

export default function VendorCTA() {
  return (
    <section className="border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col md:min-h-[420px] md:flex-row-reverse md:items-stretch">
        <div className="flex flex-col justify-center px-4 py-14 md:w-[55%] md:px-[60px] md:py-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            For Businesses
          </p>
          <h2 className="mt-3 text-[28px] font-bold text-[#1A1A1A] md:text-[32px]">
            Grow your event business with EventLink
          </h2>
          <p className="mt-4 text-base text-[#717171]">
            Join hundreds of event professionals already getting enquiries through
            EventLink. Create your free profile and start connecting with customers
            planning events across Nepal.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5 text-sm text-[#1A1A1A]">
                <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button className="rounded-lg bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover">
              Create a free profile
            </button>
            <a
              href="#"
              className="text-sm font-semibold text-brand transition-colors duration-150 hover:text-brand-hover"
            >
              Learn how it works →
            </a>
          </div>
        </div>

        <div className="md:w-[45%]">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700"
            alt="Event business professional at work"
            className="h-64 w-full object-cover md:h-full md:rounded-r-2xl"
          />
        </div>
      </div>
    </section>
  )
}
