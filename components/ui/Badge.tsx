import { getTypeColor } from '@/lib/utils'

interface BadgeProps {
  name: string
}

export default function Badge({ name }: BadgeProps) {
  return (
    <span className={`${getTypeColor(name)} px-2 py-1 rounded-full text-xs font-bold text-white capitalize`}>
      {name}
    </span>
  )
}