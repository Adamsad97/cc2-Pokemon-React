'use client'

import { useRef } from 'react'

interface SearchBarProps {
  onSearch: (name: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      onSearch(e.target.value)
    }, 400)
  }

  return (
    <input
      type="text"
      placeholder="Rechercher un pokémon..."
      onChange={handleChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-64"
    />
  )
}