import { Link } from 'react-router-dom'

export default function AuthCard({ maxWidth = 'max-w-md', children, footer }) {
  return (
    <div className="flex min-h-[calc(100vh-68px)] flex-col items-center justify-center bg-brand-light px-4 py-12">
      <div
        className={`w-full ${maxWidth} rounded-2xl border border-[#E5E5E5] bg-white p-10 shadow-none transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]`}
      >
        <Link to="/" className="mb-6 block text-[22px] font-bold text-[#1A1A1A]">
          Event<span className="text-brand">Link</span>
        </Link>
        {children}
      </div>
      {footer && <p className="mt-6 max-w-md text-center text-xs text-[#717171]">{footer}</p>}
    </div>
  )
}
