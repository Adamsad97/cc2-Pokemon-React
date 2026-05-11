import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { PokemonListItem } from '@/types/pokemon'

interface PokemonCardProps {
  pokemon: PokemonListItem
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.pokedexId}`}>
      <div className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
        <span className="text-xs text-gray-400 font-semibold">
          #{String(pokemon.pokedexId).padStart(3, '0')}
        </span>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={96}
          height={96}
          className="object-contain"
          loading="eager"
        />
        <p className="font-bold capitalize">{pokemon.name}</p>
        <div className="flex gap-1 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <Badge key={type.id} name={type.name} />
          ))}
        </div>
      </div>
    </Link>
  )
}