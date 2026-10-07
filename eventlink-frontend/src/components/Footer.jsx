import { ExternalLink } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Company',
    links: ['About Us', 'How It Works', 'Blog', 'Careers'],
  },
  {
    title: 'For Customers',
    links: ['Find Services', 'Browse Categories', 'How to Book', 'Help Center'],
  },
  {
    title: 'For Businesses',
    links: ['List Your Business', 'Business Dashboard', 'Pricing', 'Success Stories'],
  },
  {
    title: 'Services',
    links: ['Catering', 'Photography', 'Decoration', 'Event Planning', 'Floristry', 'Venues'],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'FAQ', 'Privacy Policy', 'Terms of Service'],
  },
]

const SOCIALS = ['Facebook', 'Instagram', 'Twitter']

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10">
          <p className="text-xl font-bold">EventLink</p>
          <p className="mt-1 text-sm text-white/60">Nepal's event services marketplace</p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-white/60">© 2026 EventLink. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
