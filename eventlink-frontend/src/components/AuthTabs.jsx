import { useNavigate } from 'react-router-dom'

export default function AuthTabs({ active }) {
  const navigate = useNavigate()

  const tabs = [
    { key: 'customer', label: 'Customer', path: '/register/customer' },
    { key: 'business', label: 'Business Owner', path: '/register/business' },
  ]

  return (
    <div className="mb-6 flex border-b border-[#E5E5E5]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => navigate(tab.path)}
          className={`flex-1 border-b-2 pb-3 text-sm font-semibold transition-colors duration-150 ${
            active === tab.key
              ? 'border-brand text-brand'
              : 'border-transparent text-[#717171] hover:text-[#1A1A1A]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
