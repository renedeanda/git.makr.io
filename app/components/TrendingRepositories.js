'use client'
import { useState, useEffect } from 'react'
import RepositoryCard from './RepositoryCard'
import { RefreshIcon } from '@heroicons/react/solid'

export async function fetchTrendingRepos() {
  // Get date for 7 days ago
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const dateString = date.toISOString().split('T')[0];

  // Fetch repositories created in the last 7 days, sorted by stars
  const res = await fetch(`https://api.github.com/search/repositories?q=created:>${dateString}&sort=stars&order=desc`)
  if (!res.ok) throw new Error('Failed to fetch trending repositories')
  const data = await res.json()
  
  // Randomize the order of the top 50 repositories and take the first 5
  const shuffled = data.items.slice(0, 50).sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 10)
}

export default function TrendingRepositories() {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTrendingRepos = async () => {
    setLoading(true)
    try {
      const repos = await fetchTrendingRepos()
      setRepositories(repos)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTrendingRepos()
  }, [])

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trending This Week</h2>
        <button 
          onClick={loadTrendingRepos} 
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