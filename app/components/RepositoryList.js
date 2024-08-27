import RepositoryCard from './RepositoryCard'

export default function RepositoryList({ repositories }) {
  if (repositories.length === 0) {
    return <div className="text-center text-muted">No repositories found.</div>
  }

  return (
    <div className="space-y-6">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  )
}