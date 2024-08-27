import Link from 'next/link'
import AIBadge from './AIBadge'
import { detectAIProject } from '../utils/aiDetector'

export default function RepositoryCard({ repository }) {
  const { isAIProject, frameworks } = detectAIProject(repository)

  return (
    <div className="border border-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
      <Link href={`/repo/${repository.owner.login}/${repository.name}`}>
        <h2 className="text-2xl font-semibold mb-2 hover:text-gray-300 transition duration-300">{repository.name}</h2>
      </Link>
      <p className="text-gray-300 mb-4">{repository.description}</p>
      <div className="flex items-center space-x-4 mb-4">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          {repository.stargazers_count}
        </span>
        <span>{repository.language}</span>
        {isAIProject && <AIBadge />}
      </div>
      {frameworks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frameworks.map((framework) => (
            <span key={framework} className="inline-block bg-gray-200 bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-white">
              {framework}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}