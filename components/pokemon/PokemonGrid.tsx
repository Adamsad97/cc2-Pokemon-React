'use client'

import { useState, useEffect, useRef } from 'react'
import PokemonCard from '@/components/pokemon/PokemonCard'
import SearchBar from '@/components/filters/SearchBar'
import TypeFilter from '@/components/filters/TypeFilter'
import LimitSelector from '@/components/filters/LimitSelector'
import Spinner from '@/components/ui/Spinner'
import { PokemonListItem, PokemonType } from '@/types/pokemon'
import { getPokemons } from '@/lib/api/pokemon'

interface PokemonGridProps {
  types: PokemonType[]
}

export default function PokemonGrid({ types }: PokemonGridProps) {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  const [name, setName] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)
  const initialFetchDone = useRef(false)

  const fetchPokemons = async (
    currentPage: number,
    currentLimit: number,
    currentName: string,
    currentTypes: number[],
    reset: boolean = false
  ) => {
    if (loadingRef.current) return

    loadingRef.current = true
    setLoading(true)

    try {
      const data = await getPokemons(currentPage, currentLimit, currentName, currentTypes)

      if (!data.length) {
        setDone(true)
      } else {
        setPokemons((prev) => {
          const newList = reset ? data : [...prev, ...data]
          const unique = Array.from(
            new Map(newList.map((p) => [p.pokedexId, p])).values()
          )
          return unique
        })
        setPage(currentPage + 1)
      }
    } catch (error) {
      console.error(error)
    }

    loadingRef.current = false
    setLoading(false)
  }

  useEffect(() => {
    if (initialFetchDone.current) return
    initialFetchDone.current = true
    fetchPokemons(1, 50, '', [])
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !done && initialFetchDone.current) {
          fetchPokemons(page, limit, name, selectedTypes)
        }
      })
    }, { threshold: 0.1 })

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [page, limit, name, selectedTypes, done])

  const handleSearch = (value: string) => {
    setName(value)
    setPage(1)
    setDone(false)
    fetchPokemons(1, limit, value, selectedTypes, true)
  }

  const handleTypeToggle = (id: number) => {
    const newTypes = selectedTypes.includes(id)
      ? selectedTypes.filter((t) => t !== id)
      : [...selectedTypes, id]

    setSelectedTypes(newTypes)
    setPage(1)
    setDone(false)
    fetchPokemons(1, limit, name, newTypes, true)
  }

  const handleLimitChange = (value: number) => {
    setLimit(value)
    setPage(1)
    setDone(false)
    fetchPokemons(1, value, name, selectedTypes, true)
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4 items-center">
        <SearchBar onSearch={handleSearch} />
        <LimitSelector limit={limit} onLimitChange={handleLimitChange} />
      </div>

      <TypeFilter
        types={types}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.pokedexId} pokemon={pokemon} />
        ))}
      </div>

      {loading && <Spinner />}

      <div ref={sentinelRef} className="h-10" />
    </>
  )
}