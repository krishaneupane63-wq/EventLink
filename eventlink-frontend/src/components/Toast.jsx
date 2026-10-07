import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const STYLES = {
  success: { bg: 'bg-[#008A05]', Icon: CheckCircle },
  error: { bg: 'bg-red-600', Icon: XCircle },
  info: { bg: 'bg-brand', Icon: Info },
}

export default function Toast({ message, type = 'info', onDismiss }) {
  const [visible, setVisible] = useState(true)
  const { bg, Icon } = STYLES[type]

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 2700)
    const dismissTimer = setTimeout(() => onDismiss?.(), 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(dismissTimer)
    }
  }, [onDismiss])

  return (
    <div
      role="status"
      className={`fixed right-5 top-5 z-[60] flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-opacity duration-300 ${bg} ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </div>
  )
}
