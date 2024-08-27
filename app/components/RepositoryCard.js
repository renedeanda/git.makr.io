import Link from 'next/link'
import { StarIcon, CodeIcon } from '@heroicons/react/solid'
import { detectAIProject } from '../utils/aiDetector'

export default function RepositoryCard({ repository }) {
  const { isAIProject, frameworks } = detectAIProject(repository)

  return (
    <div className="border border-muted rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-background fade-in">
      <Link href={`/repo/${repository.owner.login}/${repository.name}`} className="block">
        <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition duration-200">{repository.name}</h2>
      </Link>
      <p className="text-muted mb-4">{repository.description}</p>
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <span className="flex items-center">
          <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
          {repository.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center">
          <CodeIcon className="w-4 h-4 mr-1 text-blue-400" />
          {repository.language}
        </span>
        {isAIProject && (
          <span className="bg-accent text-white px-2 py-1 rounded-full text-xs">
            AI Project
          </span>
        )}
      </div>
      {frameworks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frameworks.map((framework) => (
            <span key={framework} className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs">
              {framework}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}