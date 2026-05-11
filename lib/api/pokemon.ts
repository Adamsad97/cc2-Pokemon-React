import { Pokemon, PokemonListItem } from '@/types/pokemon'
import { API_URL } from './config'

export async function getPokemons(
  page: number,
  limit: number,
  name: string,
  types: number[]
): Promise<PokemonListItem[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (name) params.set('name', name)

  if (types.length === 1) {
    params.set('typeId', String(types[0]))
  } else if (types.length > 1) {
    types.forEach((id) => params.append('types', String(id)))
  }

  const response = await fetch(`${API_URL}/pokemons?${params}`)

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des pokémons')
  }

  const data = await response.json()
  return Array.isArray(data) ? data : (data.data ?? [])
}

export async function getPokemonById(pokedexId: number): Promise<Pokemon> {
  const response = await fetch(`${API_URL}/pokemons/${pokedexId}`)

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du pokémon ${pokedexId}`)
  }

  return response.json()
}