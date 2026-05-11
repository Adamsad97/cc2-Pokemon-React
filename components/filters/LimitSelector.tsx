'use client'

interface LimitSelectorProps {
  limit: number
  onLimitChange: (limit: number) => void
}

export default function LimitSelector({ limit, onLimitChange }: LimitSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value))
  }

  return (
    <select
      value={limit}
      onChange={handleChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
    >
      <option value={20}>20 par page</option>
      <option value={50}>50 par page</option>
      <option value={100}>100 par page</option>
    </select>
  )
}