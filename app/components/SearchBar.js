'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search Git repositories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input flex-grow"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  )
}