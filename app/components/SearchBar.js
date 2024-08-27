
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

  const handleExploreAI = () => {
    router.push(`/search?q=${encodeURIComponent('topic:artificial-intelligence OR topic:machine-learning')}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex items-center border-b border-b-2 border-white py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-white"
          type="text"
          placeholder="Search Git repositories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-white hover:bg-gray-200 border-white hover:border-gray-200 text-sm border-4 text-gray-800 py-1 px-2 rounded transition duration-300"
          type="submit"
        >
          Search
        </button>
      </div>
      <button
        className="mt-2 text-white hover:text-gray-200 transition duration-300"
        type="button"
        onClick={handleExploreAI}
      >
        Explore AI Projects
      </button>
    </form>
  )
}