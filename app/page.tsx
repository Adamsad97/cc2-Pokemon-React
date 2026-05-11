import PokemonGrid from '@/components/pokemon/PokemonGrid'
import { getTypes } from '@/lib/api/types'

export default async function HomePage() {
  const types = await getTypes()

  return (
    <main>
      <h1 className="text-3xl font-bold text-center p-6">Pokédex</h1>
      <PokemonGrid types={types} />
    </main>
  )
}