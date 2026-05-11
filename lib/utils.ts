export const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-400',
  grass: 'bg-green-400',
  water: 'bg-blue-400',
  electric: 'bg-yellow-300',
  psychic: 'bg-pink-400',
  ice: 'bg-cyan-300',
  dragon: 'bg-purple-600',
  dark: 'bg-stone-600',
  fairy: 'bg-pink-300',
  normal: 'bg-stone-400',
  fighting: 'bg-red-600',
  flying: 'bg-indigo-300',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-600',
  rock: 'bg-yellow-700',
  bug: 'bg-lime-500',
  ghost: 'bg-purple-700',
  steel: 'bg-slate-400',
}

export function getTypeColor(name: string): string {
  return TYPE_COLORS[name.toLowerCase()] ?? 'bg-gray-400'
}