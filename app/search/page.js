import { Suspense } from 'react'
import SearchBar from '../components/SearchBar'
import RepositoryList from '../components/RepositoryList'

// Simple in-memory cache
const cache = new Map();

async function searchRepositories(query) {
  const cacheKey = `search:${query}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      // Add your GitHub Personal Access Token here if you have one
      // 'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN'
    }
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  cache.set(cacheKey, data);
  return data;
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  let data;
  let error;

  try {
    data = await searchRepositories(query);
  } catch (e) {
    error = e.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gradient-bg text-white">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Git Repo Explorer</h1>
      <SearchBar initialQuery={query} />
      <Suspense fallback={<div className="mt-8 text-xl">Loading amazing repositories...</div>}>
        {error ? (
          <div className="mt-8 text-xl text-red-500">{error}</div>
        ) : (
          <RepositoryList repositories={data?.items || []} />
        )}
      </Suspense>
    </main>
  )
}