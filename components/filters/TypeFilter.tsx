'use client'

import { PokemonType } from '@/types/pokemon'
import { getTypeColor } from '@/lib/utils'

interface TypeFilterProps {
  types: PokemonType[]
  selectedTypes: number[]
  onTypeToggle: (id: number) => void
}

export default function TypeFilter({ types, selectedTypes, onTypeToggle }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeToggle(type.id)}
          className={`${getTypeColor(type.name)} px-3 py-1 rounded-full text-xs font-bold text-white capitalize opacity-50 hover:opacity-100 transition-opacity ${
            selectedTypes.includes(type.id) ? 'opacity-100 ring-2 ring-white' : ''
          }`}
        >
          {type.name}
        </button>
      ))}
    </div>
  )
}