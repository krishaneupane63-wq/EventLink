import { Star } from 'lucide-react'

export default function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < Math.round(rating) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'fill-none text-[#E5E5E5]'}
        />
      ))}
    </div>
  )
}
