import { PokemonType } from '@/types/pokemon'
import { API_URL } from './config'

export async function getTypes(): Promise<PokemonType[]> {
  const response = await fetch(`${API_URL}/types`)

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des types')
  }

  return response.json()
}