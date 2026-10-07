import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import PasswordInput from '../components/PasswordInput'
import Toast from '../components/Toast'

const SECTIONS = ['Profile Settings', 'Password', 'Notifications', 'Privacy & Data']

const inputClass =
  'w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand'

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-3">
      <span className="text-sm text-[#1A1A1A]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
          checked ? 'bg-brand' : 'bg-[#E5E5E5]'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}

export default function AccountSettingsPage({ role = 'customer' }) {
  const [activeSection, setActiveSection] = useState(SECTIONS[0])
  const [toast, setToast] = useState(null)

  const [profile, setProfile] = useState({
    displayName: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '',
  })

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  const [notifications, setNotifications] = useState({
    enquiries: true,
    recommendations: true,
    reviewReplies: false,
    weeklyDigest: false,
  })

  const [consent, setConsent] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const notify = (message) => setToast({ message, type: 'success' })

  const handleSaveProfile = (e) => {
    e.preventDefault()
    notify('Profile changes saved!')
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    if (passwords.next !== passwords.confirm || passwords.next.length < 8) return
    setPasswords({ current: '', next: '', confirm: '' })
    notify('Password updated!')
  }

  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))

  const confirmDelete = () => {
    setDeleteModalOpen(false)
    setToast({ message: 'Account deletion requested.', type: 'info' })
  }

  return (
    <DashboardLayout role={role} title="Account Settings">
      <div className="flex flex-col gap-5 md:flex-row md:gap-8">
        <nav className="flex gap-2 overflow-x-auto md:w-56 md:shrink-0 md:flex-col md:overflow-visible">
          {SECTIONS.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={`shrink-0 rounded-lg border-l-[3px] px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                activeSection === section
                  ? 'border-brand bg-white text-brand'
                  : 'border-transparent text-[#717171] hover:bg-white'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1 rounded-xl border border-[#E5E5E5] bg-white p-5 md:p-6">
          {activeSection === 'Profile Settings' && (
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Profile Settings</h2>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                  Display name
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Email</label>
                <div className="flex items-center gap-3">
                  <input type="email" value={profile.email} readOnly className={`${inputClass} bg-brand-light`} />
                  <button type="button" className="shrink-0 text-sm font-medium text-brand hover:text-brand-hover">
                    Change email
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+977-98XXXXXXXX"
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                className="mt-1 self-start rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
              >
                Save changes
              </button>
            </form>
          )}

          {activeSection === 'Password' && (
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Password</h2>
              <PasswordInput
                id="current-password"
                label="Current password"
                value={passwords.current}
                onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
              />
              <PasswordInput
                id="new-password"
                label="New password"
                value={passwords.next}
                onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                showStrength
              />
              <PasswordInput
                id="confirm-new-password"
                label="Confirm new password"
                value={passwords.confirm}
                onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                error={
                  passwords.confirm && passwords.confirm !== passwords.next
                    ? 'Passwords do not match'
                    : undefined
                }
              />
              <button
                type="submit"
                className="mt-1 self-start rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover"
              >
                Update password
              </button>
            </form>
          )}

          {activeSection === 'Notifications' && (
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">Notifications</h2>
              <div className="mt-2 flex flex-col divide-y divide-[#E5E5E5]">
                <ToggleSwitch
                  label="Email me when someone enquires about my business"
                  checked={notifications.enquiries}
                  onChange={() => toggleNotification('enquiries')}
                />
                <ToggleSwitch
                  label="Email me when a new recommendation is available"
                  checked={notifications.recommendations}
                  onChange={() => toggleNotification('recommendations')}
                />
                <ToggleSwitch
                  label="Email me when my review gets a reply"
                  checked={notifications.reviewReplies}
                  onChange={() => toggleNotification('reviewReplies')}
                />
                <ToggleSwitch
                  label="Weekly digest of new vendors in my area"
                  checked={notifications.weeklyDigest}
                  onChange={() => toggleNotification('weeklyDigest')}
                />
              </div>
            </div>
          )}

          {activeSection === 'Privacy & Data' && (
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">Privacy & Data</h2>
              <label className="mt-4 flex items-start gap-2.5 text-sm text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#E5E5E5] text-brand focus:ring-brand"
                />
                Allow EventLink to use my interaction data to improve recommendations
              </label>

              <div className="mt-6 flex flex-col gap-3 border-t border-[#E5E5E5] pt-5">
                <button type="button" className="self-start text-sm font-medium text-brand hover:text-brand-hover">
                  Download my data
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(true)}
                  className="self-start text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Delete my account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setDeleteModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#1A1A1A]">Delete your account?</h3>
            <p className="mt-2 text-sm text-[#717171]">
              This will permanently remove your profile and data from EventLink. This action
              cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#1A1A1A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </DashboardLayout>
  )
}
