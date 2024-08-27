'use client'
import { useState, useEffect } from 'react'
import RepositoryCard from './RepositoryCard'
import { RefreshIcon } from '@heroicons/react/solid'

export default function TrendingRepositories() {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTrendingRepos = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc')
      if (!res.ok) throw new Error('Failed to fetch trending repositories')
      const data = await res.json()
      setRepositories(data.items.slice(0, 5))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingRepos()
  }, [])

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trending Repositories</h2>
        <button 
          onClick={fetchTrendingRepos} 
          className="btn btn-secondary flex items-center"
          disabled={loading}
        >
          <RefreshIcon className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading trending repositories...</div>
      ) : error ? (
        <div className="text-center text-accent">{error}</div>
      ) : (
        <div className="space-y-4">
          {repositories.map(repo => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      )}
    </section>
  )
}