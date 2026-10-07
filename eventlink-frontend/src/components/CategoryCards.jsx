const CATEGORIES = [
  {
    name: 'Catering',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600',
    sub: 'Wedding Catering · Corporate Lunch · Birthday Catering',
  },
  {
    name: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
    sub: 'Wedding Photography · Portrait · Event Coverage',
  },
  {
    name: 'Decoration',
    image: 'https://images.unsplash.com/photo-1478146522157-2a0357a3c64a?w=600',
    sub: 'Wedding Decor · Birthday Setup · Stage Design',
  },
  {
    name: 'Event Planning',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
    sub: 'Full Event Management · Day Coordination · Venue Sourcing',
  },
]

export default function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
      <div className="text-center">
        <h2 className="text-[26px] font-bold text-[#1A1A1A] md:text-[30px]">
          Browse by category
        </h2>
        <p className="mt-2 text-[#717171]">Everything you need for your perfect event</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="group relative block h-[220px] overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src={cat.image}
              alt={`${cat.name} services`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
              }}
              aria-hidden="true"
            />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="text-lg font-bold">{cat.name}</p>
              <p className="text-[13px] opacity-85">{cat.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
