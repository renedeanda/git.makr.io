import { Suspense } from 'react'
import RepositoryDetails from '../../../components/RepositoryDetails'
import { getRepositoryDetails } from '../../../utils/github'

export default async function RepoPage({ params }) {
  const { owner, repo } = params
  
  return (
    <div className="fade-in">
      <h1 className="text-4xl font-bold gradient-text text-center mb-8">Repository Details</h1>
      <Suspense fallback={<div className="text-center">Loading repository details...</div>}>
        <RepositoryDetailsWrapper owner={owner} repo={repo} />
      </Suspense>
    </div>
  )
}

async function RepositoryDetailsWrapper({ owner, repo }) {
  const { repository, error } = await getRepositoryDetails(owner, repo)

  if (error) {
    return <div className="text-center text-accent">{error}</div>
  }

  if (!repository) {
    return <div className="text-center">Repository not found</div>
  }

  return <RepositoryDetails repository={repository} />
}