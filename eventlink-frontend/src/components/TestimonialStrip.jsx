const STATS = ['2,000+ events planned', '500+ verified vendors', '4.8 avg rating']

export default function TestimonialStrip() {
  return (
    <section className="bg-[#1A1A1A] py-16 text-white">
      <div className="mx-auto max-w-[700px] px-4 text-center md:px-8">
        <span className="font-serif text-6xl leading-none text-brand" aria-hidden="true">
          "
        </span>

        <p className="mt-4 text-xl italic leading-relaxed md:text-[22px]">
          We found our wedding photographer and caterer through EventLink in one
          afternoon. The whole event was exactly what we dreamed of.
        </p>

        <p className="mt-5 text-sm text-white/70">
          — Priya S., Wedding in Kathmandu · ★★★★★
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {STATS.map((stat) => (
            <span
              key={stat}
              className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
