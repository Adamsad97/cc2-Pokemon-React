import { PokemonStat } from '@/types/pokemon'

interface PokemonStatsProps {
  stats: PokemonStat[] | Record<string, number>
}

function normalizeStats(stats: PokemonStat[] | Record<string, number>): PokemonStat[] {
  if (Array.isArray(stats)) return stats

  return Object.entries(stats).map(([name, value]) => ({ name, value }))
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  const normalizedStats = normalizeStats(stats)

  return (
    <div className="flex flex-col gap-2 w-full">
      {normalizedStats.map((stat) => (
        <div key={stat.name} className="flex items-center gap-4">
          <span className="text-xs text-gray-500 uppercase w-24">{stat.name}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(100, Math.round(stat.value / 255 * 100))}%` }}
            />
          </div>
          <span className="text-sm font-bold w-8 text-right">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}