import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Info } from 'lucide-react'
import AuthCard from '../components/AuthCard'
import AuthTabs from '../components/AuthTabs'
import PasswordInput from '../components/PasswordInput'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CATEGORIES = [
  'Catering',
  'Photography',
  'Decoration',
  'Event Planning',
  'Floristry',
  'Venue',
  'DJ & Music',
  'Other',
]

const inputClass = (hasError) =>
  `w-full rounded-lg border py-3 px-4 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand ${
    hasError ? 'border-red-500' : 'border-[#E5E5E5]'
  }`

export default function RegisterBusinessPage() {
  const [form, setForm] = useState({
    businessName: '',
    category: '',
    contactName: '',
    phone: '',
    email: '',
    location: '',
    description: '',
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
    if (!form.businessName.trim()) next.businessName = 'Business name is required'
    if (!form.category) next.category = 'Select a category'
    if (!form.contactName.trim()) next.contactName = 'Contact person name is required'
    if (!form.phone.trim()) next.phone = 'Phone number is required'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.location.trim()) next.location = 'Location is required'
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
    !form.businessName ||
    !form.category ||
    !form.contactName ||
    !form.phone ||
    !form.email ||
    !form.location ||
    !form.password ||
    !form.confirmPassword ||
    !form.agreed

  return (
    <AuthCard maxWidth="max-w-lg">
      <AuthTabs active="business" />

      <h1 className="text-2xl font-bold text-[#1A1A1A]">List your business on EventLink</h1>
      <p className="mt-1 text-sm text-[#717171]">
        Reach thousands of event planners looking for your services
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Business name
          </label>
          <input
            id="businessName"
            type="text"
            value={form.businessName}
            onChange={update('businessName')}
            onBlur={validate}
            placeholder="Sharma Catering Services"
            className={inputClass(errors.businessName)}
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={update('category')}
            onBlur={validate}
            className={inputClass(errors.category)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
              Contact person name
            </label>
            <input
              id="contactName"
              type="text"
              value={form.contactName}
              onChange={update('contactName')}
              onBlur={validate}
              placeholder="Raj Sharma"
              className={inputClass(errors.contactName)}
            />
            {errors.contactName && (
              <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              onBlur={validate}
              placeholder="+977-98XXXXXXXX"
              className={inputClass(errors.phone)}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="bizEmail" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Business email
          </label>
          <input
            id="bizEmail"
            type="email"
            value={form.email}
            onChange={update('email')}
            onBlur={validate}
            placeholder="contact@yourbusiness.com"
            className={inputClass(errors.email)}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={form.location}
            onChange={update('location')}
            onBlur={validate}
            placeholder="Kathmandu, Nepal"
            className={inputClass(errors.location)}
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Brief description
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={update('description')}
            placeholder="Tell customers about your services..."
            className={inputClass(false)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        </div>

        <div className="flex items-start gap-2.5 rounded-r-lg border-l-[3px] border-brand bg-[#FFF3EF] p-4 text-sm text-[#1A1A1A]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <p>
            Your profile will be reviewed before it goes live. We'll notify you within
            24–48 hours.
          </p>
        </div>

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
          Submit for review
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#717171]">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand hover:text-brand-hover">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
