import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Bell, LogOut, Menu, X } from 'lucide-react'

const NAV_ITEMS = {
  customer: [
    { label: 'Home', icon: '🏠', type: 'route', to: '/' },
    { label: 'Search Vendors', icon: '🔍', type: 'route', to: '/search' },
    { label: 'Saved Vendors', icon: '❤️', type: 'anchor', to: '#saved-vendors' },
    { label: 'My Reviews', icon: '⭐', type: 'anchor', to: '#my-reviews' },
    { label: 'AI Recommendations', icon: '🤖', type: 'route', to: '/recommendations' },
    { label: 'Account Settings', icon: '⚙️', type: 'route', to: '/dashboard/settings' },
  ],
  business: [
    { label: 'Overview', icon: '📊', type: 'route', to: '/dashboard/business' },
    { label: 'My Profile', icon: '👤', type: 'route', to: '/dashboard/business/edit-profile' },
    { label: 'Enquiries', icon: '📬', type: 'anchor', to: '#enquiries' },
    { label: 'Reviews Received', icon: '⭐', type: 'anchor', to: '#reviews-received' },
    { label: 'Analytics', icon: '📈', type: 'anchor', to: '#analytics' },
    { label: 'Account Settings', icon: '⚙️', type: 'route', to: '/dashboard/settings' },
  ],
  admin: [
    { label: 'Pending Approvals', icon: '📋', type: 'route', to: '/dashboard/admin' },
    { label: 'Approved Vendors', icon: '✅', type: 'anchor', to: '#recently-approved' },
    { label: 'Rejected', icon: '🚫', type: 'route', to: '/dashboard/admin' },
    { label: 'All Users', icon: '👥', type: 'route', to: '/dashboard/admin' },
    { label: 'Settings', icon: '⚙️', type: 'route', to: '/dashboard/settings' },
  ],
}

const USERS = {
  customer: { name: 'Aarav Sharma', initials: 'AS', roleLabel: 'Customer' },
  business: { name: 'Annapurna Catering', initials: 'AC', roleLabel: 'Business Owner' },
  admin: { name: 'Admin User', initials: 'AU', roleLabel: 'Administrator' },
}

function NavItem({ item, className }) {
  if (item.type === 'route') {
    return (
      <NavLink
        to={item.to}
        end
        className={({ isActive }) =>
          `${className} ${
            isActive
              ? 'border-brand bg-brand-light text-brand'
              : 'border-transparent text-[#1A1A1A] hover:bg-brand-light'
          }`
        }
      >
        <span aria-hidden="true">{item.icon}</span>
        <span className="hidden md:inline">{item.label}</span>
      </NavLink>
    )
  }
  return (
    <a href={item.to} className={`${className} border-transparent text-[#1A1A1A] hover:bg-brand-light`}>
      <span aria-hidden="true">{item.icon}</span>
      <span className="hidden md:inline">{item.label}</span>
    </a>
  )
}

export default function DashboardLayout({ role, title, children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const items = NAV_ITEMS[role]
  const user = USERS[role]

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[#E5E5E5] bg-white md:flex">
        <div className="flex items-center gap-3 border-b border-[#E5E5E5] p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1A1A1A]">{user.name}</p>
            <p className="text-xs text-[#717171]">{user.roleLabel}</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {items.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              className="flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium transition-colors duration-150"
            />
          ))}
        </nav>

        <div className="border-t border-[#E5E5E5] p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#717171] transition-colors duration-150 hover:bg-brand-light hover:text-[#1A1A1A]"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] bg-white px-4 py-3 md:hidden">
          <p className="text-lg font-bold text-[#1A1A1A]">
            Event<span className="text-brand">Link</span>
          </p>
          <button
            type="button"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            className="text-[#1A1A1A]"
          >
            {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileNavOpen && (
          <nav className="flex flex-col gap-1 border-b border-[#E5E5E5] bg-white p-3 md:hidden">
            {items.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                className="flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-2.5 text-sm font-medium"
              />
            ))}
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#717171]"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Link>
          </nav>
        )}

        <main className="flex-1 overflow-y-auto bg-brand-light p-5 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#1A1A1A] md:text-2xl">{title}</h1>
            <div className="flex items-center gap-4">
              <button type="button" aria-label="Notifications" className="text-[#717171] hover:text-[#1A1A1A]">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {user.initials}
              </div>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
