import Image from 'next/image'
import Link from 'next/link'
import { PokemonEvolution } from '@/types/pokemon'

interface PokemonEvolutionsProps {
  evolutions: PokemonEvolution[]
}

export default function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  if (!evolutions.length) {
    return <p className="text-gray-400 text-sm">Aucune évolution</p>
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {evolutions.map((evolution, index) => (
        <>
          {index > 0 && (
            <span key={`arrow-${evolution.pokedexId}`} className="text-gray-400 text-xl">→</span>
          )}
          <Link
            key={evolution.pokedexId}
            href={`/pokemon/${evolution.pokedexId}`}
            className="flex flex-col items-center gap-1 hover:opacity-75 transition-opacity"
          >
            <Image
              src={evolution.image}
              alt={evolution.name}
              width={64}
              height={64}
              className="object-contain"
            />
            <span className="text-xs capitalize">{evolution.name}</span>
          </Link>
        </>
      ))}
    </div>
  )
}