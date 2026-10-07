import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react'
import AuthCard from '../components/AuthCard'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <AuthCard maxWidth="max-w-sm">
      <Link
        to="/login"
        className="mb-6 -mt-2 flex items-center gap-1.5 text-sm font-medium text-[#717171] hover:text-[#1A1A1A]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to sign in
      </Link>

      {!submitted ? (
        <>
          <div className="flex justify-center">
            <Lock className="h-12 w-12 text-brand" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-center text-2xl font-bold text-[#1A1A1A]">
            Reset your password
          </h1>
          <p className="mt-1 text-center text-sm text-[#717171]">
            Enter your email and we'll send you reset instructions.
          </p>

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
                placeholder="you@example.com"
                className={`w-full rounded-lg border py-3 px-4 text-sm text-[#1A1A1A] outline-none transition-colors duration-150 focus:border-brand ${
                  error ? 'border-red-500' : 'border-[#E5E5E5]'
                }`}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-brand text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
            >
              Send reset link
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-12 w-12 text-[#008A05]" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1A1A1A]">Check your inbox</h1>
          <p className="mt-2 text-sm text-[#717171]">
            We sent a reset link to <span className="font-medium text-[#1A1A1A]">{email}</span>.
            Check your spam folder if you don't see it.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-hover"
          >
            Back to sign in
          </Link>
        </div>
      )}
    </AuthCard>
  )
}
