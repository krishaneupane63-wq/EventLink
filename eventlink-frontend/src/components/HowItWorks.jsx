import { Star, Send } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    title: 'Browse & compare',
    description:
      'Search by category and location. Compare prices, ratings, and portfolios.',
    mock: (
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
        <div className="h-24 w-full rounded-md bg-[#FFE4D6]" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-[#1A1A1A]">Kathmandu Catering Co.</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-[#717171]">
          <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
          4.9 · Rs 800–1,500 / plate
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: 'Contact & confirm',
    description: 'Reach out directly to vendors. Discuss your requirements and get a quote.',
    mock: (
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
        <div className="h-8 w-full rounded-md border border-[#E5E5E5] bg-brand-light" />
        <div className="mt-2 h-16 w-full rounded-md border border-[#E5E5E5] bg-brand-light" />
        <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-brand py-2 text-xs font-semibold text-white">
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Send enquiry
        </button>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Enjoy your event',
    description: 'Leave a review after your event. Help others find great vendors too.',
    mock: (
      <div className="rounded-lg border border-[#E5E5E5] bg-white p-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
          ))}
        </div>
        <p className="mt-2 text-xs text-[#717171]">
          "Everything was perfect from start to finish!"
        </p>
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-brand-light py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-[#1A1A1A] md:text-[30px]">
            How EventLink works
          </h2>
          <p className="mt-2 text-[#717171]">
            Book trusted event professionals in three simple steps
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[18px] font-bold text-white">
                {step.number}
              </div>
              <p className="mt-4 text-xl font-bold text-[#1A1A1A]">{step.title}</p>
              <p className="mt-2 text-[15px] text-[#717171]">{step.description}</p>
              <div className="mt-5">{step.mock}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
