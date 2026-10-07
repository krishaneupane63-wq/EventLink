import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import PasswordInput from '../components/PasswordInput'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address'
    if (password.length < 8) next.password = 'Password must be at least 8 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validate()
  }

  const isEmpty = !email || !password

  return (
    <AuthCard
      footer={
        <>
          By signing in, you agree to our{' '}
          <a href="#" className="text-brand hover:text-brand-hover">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-brand hover:text-brand-hover">
            Privacy Policy
          </a>
          .
        </>
      }
    >
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Welcome back</h1>
      <p className="mt-1 text-sm text-[#717171]">Sign in to your EventLink account</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            placeholder="you@example.com"
            className={`w-full rounded-lg border py-3 px-4 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand ${
              errors.email ? 'border-red-500' : 'border-[#E5E5E5]'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validate}
            error={errors.password}
          />
          <Link
            to="/forgot-password"
            className="mt-1.5 block text-right text-[13px] font-medium text-brand hover:text-brand-hover"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isEmpty}
          className="h-12 w-full rounded-lg bg-brand text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sign in
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E5E5E5]" />
        <span className="text-xs text-[#717171]">or</span>
        <span className="h-px flex-1 bg-[#E5E5E5]" />
      </div>

      <p className="text-center text-sm text-[#717171]">
        Don't have an account?{' '}
        <Link to="/register/customer" className="font-semibold text-brand hover:text-brand-hover">
          Sign up
        </Link>
      </p>
    </AuthCard>
  )
}
