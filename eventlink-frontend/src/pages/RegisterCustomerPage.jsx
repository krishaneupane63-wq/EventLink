import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import AuthTabs from '../components/AuthTabs'
import PasswordInput from '../components/PasswordInput'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegisterCustomerPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  })
  const [errors, setErrors] = useState({})

  const update = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match'
    if (!form.agreed) next.agreed = 'You must agree to the Terms and Privacy Policy'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validate()
  }

  const isEmpty =
    !form.fullName || !form.email || !form.password || !form.confirmPassword || !form.agreed

  return (
    <AuthCard>
      <AuthTabs active="customer" />

      <h1 className="text-2xl font-bold text-[#1A1A1A]">Create your account</h1>
      <p className="mt-1 text-sm text-[#717171]">
        Find and book the best event services in Nepal
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={update('fullName')}
            onBlur={validate}
            placeholder="Aarav Sharma"
            className={`w-full rounded-lg border py-3 px-4 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand ${
              errors.fullName ? 'border-red-500' : 'border-[#E5E5E5]'
            }`}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={update('email')}
            onBlur={validate}
            placeholder="aarav@example.com"
            className={`w-full rounded-lg border py-3 px-4 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand ${
              errors.email ? 'border-red-500' : 'border-[#E5E5E5]'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <PasswordInput
          id="password"
          label="Password"
          value={form.password}
          onChange={update('password')}
          onBlur={validate}
          error={errors.password}
          showStrength
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          onBlur={validate}
          error={errors.confirmPassword}
        />

        <div>
          <label className="flex items-start gap-2.5 text-sm text-[#1A1A1A]">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={update('agreed')}
              onBlur={validate}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E5E5E5] text-brand focus:ring-brand"
            />
            I agree to EventLink's Terms of Service and Privacy Policy
          </label>
          {errors.agreed && <p className="mt-1 text-sm text-red-500">{errors.agreed}</p>}
        </div>

        <button
          type="submit"
          disabled={isEmpty}
          className="h-12 w-full rounded-lg bg-brand text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create account
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E5E5E5]" />
        <span className="text-xs text-[#717171]">or</span>
        <span className="h-px flex-1 bg-[#E5E5E5]" />
      </div>

      <p className="text-center text-sm text-[#717171]">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand hover:text-brand-hover">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
