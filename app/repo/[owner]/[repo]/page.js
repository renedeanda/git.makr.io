import RepositoryDetails from '../../../components/RepositoryDetails'

async function getRepositoryDetails(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
  if (!res.ok) throw new Error('Failed to fetch repository details')
  return res.json()
}

export default async function RepoPage({ params }) {
  const { owner, repo } = params
  const data = await getRepositoryDetails(owner, repo)

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gradient-bg text-white">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Repository Details</h1>
      <RepositoryDetails repository={data} />
    </main>
  )
}