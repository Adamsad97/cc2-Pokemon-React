import Image from 'next/image'
import Link from 'next/link'
import { PokemonEvolution } from '@/types/pokemon'

interface PokemonEvolutionsProps {
  evolutions: PokemonEvolution[] | null | undefined
}

export default function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  if (!evolutions || !Array.isArray(evolutions) || !evolutions.length) {
    return <p className="text-gray-400 text-sm">Aucune évolution</p>
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {evolutions.map((evolution, index) => {
        const image = evolution.image ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.pokedexId}.png`

        return (
          <div key={evolution.pokedexId} className="flex items-center gap-4">
            {index > 0 && (
              <span className="text-gray-400 text-xl">→</span>
            )}
            <Link
              href={`/pokemon/${evolution.pokedexId}`}
              className="flex flex-col items-center gap-1 hover:opacity-75 transition-opacity"
            >
              <Image
                src={image}
                alt={evolution.name}
                width={64}
                height={64}
                className="object-contain"
              />
              <span className="text-xs capitalize">{evolution.name}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}