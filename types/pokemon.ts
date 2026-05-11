export interface PokemonType {
  id: number
  name: string
  image?: string
}

export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonEvolution {
  pokedexId: number
  name: string
  image?: string
}

export interface PokemonListItem {
  pokedexId: number
  name: string
  image: string
  types: PokemonType[]
}

export interface Pokemon extends PokemonListItem {
  stats: PokemonStat[] | Record<string, number>
  evolutions: PokemonEvolution[] | null | undefined
}