import { Suspense } from 'react'
import SearchBar from '../components/SearchBar'
import RepositoryList from '../components/RepositoryList'
import { searchRepositories } from '../utils/github'

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || ''
  const { repositories, error } = await searchRepositories(query)

  return (
    <div className="space-y-8 fade-in">
      <h1 className="text-4xl font-bold gradient-text text-center">Search Results</h1>
      <SearchBar initialQuery={query} />
      <Suspense fallback={<div className="text-center">Loading amazing repositories...</div>}>
        {error ? (
          <div className="text-center text-accent">{error}</div>
        ) : (
          <RepositoryList repositories={repositories} />
        )}
      </Suspense>
    </div>
  )
}