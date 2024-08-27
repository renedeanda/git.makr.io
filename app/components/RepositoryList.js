import RepositoryCard from './RepositoryCard'

export default function RepositoryList({ repositories }) {
  return (
    <div className="w-full max-w-4xl mt-8 space-y-6">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  )
}