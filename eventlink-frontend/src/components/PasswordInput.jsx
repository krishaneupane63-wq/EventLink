import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function passwordStrength(password) {
  if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: '33%' }
  if (password.length < 10) return { label: 'Fair', color: 'bg-yellow-500', width: '66%' }
  return { label: 'Strong', color: 'bg-green-600', width: '100%' }
}

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder = '••••••••',
  showStrength = false,
}) {
  const [visible, setVisible] = useState(false)
  const strength = showStrength && value ? passwordStrength(value) : null

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full rounded-lg border py-3 pl-4 pr-11 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand ${
            error ? 'border-red-500' : 'border-[#E5E5E5]'
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#1A1A1A]"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
            <div
              className={`h-full rounded-full transition-all duration-200 ${strength.color}`}
              style={{ width: strength.width }}
            />
          </div>
          <p className="mt-1 text-xs text-[#717171]">{strength.label} password</p>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
