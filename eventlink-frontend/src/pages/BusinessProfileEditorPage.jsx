import { useRef, useState } from 'react'
import { Check, Camera, X, Info } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const CATEGORY_OPTIONS = [
  'Catering',
  'Photography',
  'Decoration',
  'Event Planning',
  'Floristry',
  'Venue',
  'DJ & Music',
  'Other',
]

const TEAM_SIZE_OPTIONS = ['1–5', '5–15', '15–30', '30+']

const STEPS = ['Basic Info', 'Services', 'Portfolio', 'Review & Submit']
const MAX_SERVICES = 8
const MAX_PHOTOS = 6
const DESCRIPTION_MAX = 500

const emptyService = () => ({ name: '', price: '', description: '' })

function StepIndicator({ current }) {
  return (
    <div className="flex items-center">
      {STEPS.map((label, i) => {
        const stepNum = i + 1
        const completed = current > stepNum
        const active = current === stepNum
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  completed
                    ? 'bg-[#008A05] text-white'
                    : active
                      ? 'bg-brand text-white'
                      : 'bg-[#E5E5E5] text-[#717171]'
                }`}
              >
                {completed ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  active ? 'text-brand' : completed ? 'text-[#008A05]' : 'text-[#717171]'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <div className={`mx-2 h-0.5 flex-1 ${completed ? 'bg-[#008A05]' : 'bg-[#E5E5E5]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-[#E5E5E5] py-2.5 px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-brand'

export default function BusinessProfileEditorPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [basicInfo, setBasicInfo] = useState({
    businessName: '',
    category: '',
    description: '',
    location: '',
    phone: '',
    email: '',
    website: '',
    established: '',
    teamSize: TEAM_SIZE_OPTIONS[0],
  })
  const updateBasic = (field) => (e) =>
    setBasicInfo((prev) => ({ ...prev, [field]: e.target.value }))

  const [services, setServices] = useState([emptyService(), emptyService()])
  const updateService = (index, field) => (e) =>
    setServices((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: e.target.value } : s))
    )
  const addService = () =>
    setServices((prev) => (prev.length < MAX_SERVICES ? [...prev, emptyService()] : prev))
  const removeService = (index) =>
    setServices((prev) => prev.filter((_, i) => i !== index))

  const [photos, setPhotos] = useState(Array(MAX_PHOTOS).fill(null))
  const fileInputRefs = useRef([])
  const setPhotoFile = (index, file) => {
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    setPhotos((prev) => prev.map((p, i) => (i === index ? previewUrl : p)))
  }
  const removePhoto = (index) => {
    setPhotos((prev) => prev.map((p, i) => (i === index ? null : p)))
  }

  const requiredFields = [
    { key: 'businessName', label: 'Business name', value: basicInfo.businessName },
    { key: 'category', label: 'Category', value: basicInfo.category },
    { key: 'location', label: 'Location', value: basicInfo.location },
    { key: 'phone', label: 'Phone number', value: basicInfo.phone },
    { key: 'email', label: 'Business email', value: basicInfo.email },
  ]
  const missingFields = requiredFields.filter((f) => !f.value.trim())

  const step1Valid = basicInfo.businessName.trim() && basicInfo.category
  const canGoNext = step === 1 ? step1Valid : true

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length))
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = () => {
    if (missingFields.length === 0) setSubmitted(true)
  }

  return (
    <DashboardLayout role="business" title="Edit Business Profile">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-[#E5E5E5] bg-white p-5 md:p-8">
          <StepIndicator current={step} />

          {submitted ? (
            <div className="mt-8 flex flex-col items-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#008A05]/10">
                <Check className="h-7 w-7 text-[#008A05]" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1A1A1A]">Submitted for review</h2>
              <p className="mt-1 max-w-sm text-sm text-[#717171]">
                We'll review your updated profile and notify you within 24–48 hours.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="mt-8 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                      Business name
                    </label>
                    <input
                      type="text"
                      value={basicInfo.businessName}
                      onChange={updateBasic('businessName')}
                      placeholder="Sharma Catering Services"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                      Category
                    </label>
                    <select
                      value={basicInfo.category}
                      onChange={updateBasic('category')}
                      className={inputClass}
                    >
                      <option value="">Select a category</option>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-sm font-medium text-[#1A1A1A]">Description</label>
                      <span className="text-xs text-[#717171]">
                        {basicInfo.description.length}/{DESCRIPTION_MAX}
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={DESCRIPTION_MAX}
                      value={basicInfo.description}
                      onChange={updateBasic('description')}
                      placeholder="Tell customers about your services..."
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                        Location
                      </label>
                      <input
                        type="text"
                        value={basicInfo.location}
                        onChange={updateBasic('location')}
                        placeholder="Kathmandu, Nepal"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={basicInfo.phone}
                        onChange={updateBasic('phone')}
                        placeholder="+977-98XXXXXXXX"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                        Business email
                      </label>
                      <input
                        type="email"
                        value={basicInfo.email}
                        onChange={updateBasic('email')}
                        placeholder="contact@yourbusiness.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                        Website (optional)
                      </label>
                      <input
                        type="text"
                        value={basicInfo.website}
                        onChange={updateBasic('website')}
                        placeholder="yourbusiness.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                        Year established
                      </label>
                      <input
                        type="number"
                        value={basicInfo.established}
                        onChange={updateBasic('established')}
                        placeholder="2015"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                        Team size
                      </label>
                      <select
                        value={basicInfo.teamSize}
                        onChange={updateBasic('teamSize')}
                        className={inputClass}
                      >
                        {TEAM_SIZE_OPTIONS.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-8">
                  <h2 className="text-lg font-bold text-[#1A1A1A]">Add the services you offer</h2>
                  <p className="mt-1 text-sm text-[#717171]">You can add up to {MAX_SERVICES} services</p>

                  <div className="mt-5 flex flex-col gap-3">
                    {services.map((service, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-2 rounded-lg border border-[#E5E5E5] p-3 sm:flex-row sm:items-center"
                      >
                        <input
                          type="text"
                          value={service.name}
                          onChange={updateService(i, 'name')}
                          placeholder="Service name"
                          className={`${inputClass} sm:flex-1`}
                        />
                        <input
                          type="text"
                          value={service.price}
                          onChange={updateService(i, 'price')}
                          placeholder="From NPR 800/plate"
                          className={`${inputClass} sm:w-48`}
                        />
                        <input
                          type="text"
                          value={service.description}
                          onChange={updateService(i, 'description')}
                          placeholder="Short description"
                          className={`${inputClass} sm:flex-1`}
                        />
                        <button
                          type="button"
                          onClick={() => removeService(i)}
                          aria-label="Remove service"
                          className="self-end text-[#717171] hover:text-red-600 sm:self-auto"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {services.length < MAX_SERVICES && (
                    <button
                      type="button"
                      onClick={addService}
                      className="mt-4 w-full rounded-lg border-2 border-dashed border-brand py-3 text-sm font-semibold text-brand hover:bg-brand-light"
                    >
                      + Add another service
                    </button>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="mt-8">
                  <h2 className="text-lg font-bold text-[#1A1A1A]">Upload your best work photos</h2>
                  <p className="mt-1 text-sm text-[#717171]">
                    Add up to {MAX_PHOTOS} photos. First photo will be your cover image.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {photos.map((photo, i) => (
                      <div
                        key={i}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault()
                          setPhotoFile(i, e.dataTransfer.files?.[0])
                        }}
                        className="relative aspect-square overflow-hidden rounded-xl"
                      >
                        {photo ? (
                          <>
                            <img src={photo} alt={`Portfolio upload ${i + 1}`} className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removePhoto(i)}
                              aria-label="Remove photo"
                              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[i]?.click()}
                            className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#E5E5E5] text-[#717171] hover:border-brand hover:text-brand"
                          >
                            <Camera className="h-6 w-6" />
                            <span className="text-xs font-medium">Add photo</span>
                          </button>
                        )}
                        <input
                          ref={(el) => (fileInputRefs.current[i] = el)}
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPhotoFile(i, e.target.files?.[0])}
                          className="hidden"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-[#717171]">
                    Supported formats: JPG, PNG. Max 5MB each.
                  </p>
                </div>
              )}

              {step === 4 && (
                <div className="mt-8">
                  <h2 className="text-lg font-bold text-[#1A1A1A]">Review your profile</h2>

                  <div className="mt-4 rounded-xl border border-[#E5E5E5] p-5">
                    <p className="text-xl font-bold text-[#1A1A1A]">
                      {basicInfo.businessName || (
                        <span className="text-red-500">Missing: Business name</span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-brand">
                      {basicInfo.category || <span className="text-red-500">Missing: Category</span>}
                    </p>
                    <p className="mt-3 text-sm text-[#717171]">
                      {basicInfo.description || 'No description added yet.'}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-1.5 text-sm text-[#1A1A1A] sm:grid-cols-2">
                      <p>
                        📍{' '}
                        {basicInfo.location || <span className="text-red-500">Missing: Location</span>}
                      </p>
                      <p>
                        📞 {basicInfo.phone || <span className="text-red-500">Missing: Phone number</span>}
                      </p>
                      <p>
                        ✉️{' '}
                        {basicInfo.email || (
                          <span className="text-red-500">Missing: Business email</span>
                        )}
                      </p>
                      {basicInfo.website && <p>🌐 {basicInfo.website}</p>}
                      {basicInfo.established && <p>📅 Est. {basicInfo.established}</p>}
                      <p>👥 {basicInfo.teamSize} staff</p>
                    </div>

                    {services.some((s) => s.name) && (
                      <div className="mt-5 border-t border-[#E5E5E5] pt-4">
                        <p className="text-sm font-semibold text-[#1A1A1A]">Services</p>
                        <ul className="mt-2 flex flex-col gap-1 text-sm text-[#717171]">
                          {services
                            .filter((s) => s.name)
                            .map((s, i) => (
                              <li key={i}>
                                <span className="font-medium text-[#1A1A1A]">{s.name}</span>
                                {s.price && ` — ${s.price}`}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {photos.some(Boolean) && (
                      <div className="mt-5 border-t border-[#E5E5E5] pt-4">
                        <p className="text-sm font-semibold text-[#1A1A1A]">Portfolio</p>
                        <div className="mt-2 flex gap-2">
                          {photos.filter(Boolean).map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt={`Portfolio preview ${i + 1}`}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 rounded-r-lg border-l-[3px] border-brand bg-[#FFF3EF] p-4 text-sm text-[#1A1A1A]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <p>
                      After submitting, your profile will be reviewed by our team. You'll receive a
                      notification within 24–48 hours.
                    </p>
                  </div>

                  {missingFields.length > 0 && (
                    <p className="mt-3 text-sm text-red-500">
                      Please complete: {missingFields.map((f) => f.label).join(', ')}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={missingFields.length > 0}
                    className="mt-4 w-full rounded-lg bg-brand py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit for review
                  </button>
                </div>
              )}

              {step < 4 && (
                <div className="mt-8 flex justify-between border-t border-[#E5E5E5] pt-5">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 1}
                    className="rounded-lg border border-[#E5E5E5] px-5 py-2.5 text-sm font-medium text-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext}
                    className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
