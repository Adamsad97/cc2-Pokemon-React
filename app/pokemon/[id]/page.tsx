import Image from 'next/image'
import BackButton from '@/components/ui/BackButton'
import Badge from '@/components/ui/Badge'
import PokemonStats from '@/components/pokemon/PokemonStats'
import PokemonEvolutions from '@/components/pokemon/PokemonEvolutions'
import { getPokemonById } from '@/lib/api/pokemon'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params
  const pokemon = await getPokemonById(Number(id))

  console.log('POKEMON DATA:', JSON.stringify(pokemon, null, 2))

  return (
    <main className="max-w-2xl mx-auto p-6">
      <BackButton />
      <div className="flex flex-col items-center gap-4 mt-6">
        <span className="text-gray-400 font-semibold">
          #{String(pokemon.pokedexId).padStart(3, '0')}
        </span>
        <Image src={pokemon.image} alt={pokemon.name} width={200} height={200} className="object-contain" />
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <Badge key={type.id} name={type.name} />
          ))}
        </div>
        <div className="w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Statistiques</h2>
          <PokemonStats stats={pokemon.stats} />
        </div>
        <div className="w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Évolutions</h2>
          <PokemonEvolutions evolutions={pokemon.evolutions} />
        </div>
      </div>
    </main>
  )
}