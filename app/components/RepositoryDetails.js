import { StarIcon, CodeIcon, EyeIcon, ClockIcon } from '@heroicons/react/solid'
import { detectAIProject } from '../utils/aiDetector'
import ReadmePreview from './ReadmePreview'

function TruncateText({ text, lines = 3 }) {
  return (
    <div className={`overflow-hidden text-ellipsis line-clamp-${lines}`}>
      {text}
    </div>
  );
}

export default function RepositoryDetails({ repository }) {
  if (!repository) {
    return <div className="text-center">No repository data available</div>
  }

  const { isAIProject, frameworks } = detectAIProject(repository)

  return (
    <div className="bg-background border border-muted rounded-lg p-4 sm:p-8 space-y-4 sm:space-y-6 fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold gradient-text">{repository.full_name}</h2>
      <TruncateText text={repository.description} />
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-sm sm:text-base">
        <div className="flex items-center">
          <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-yellow-400" />
          <span>{repository.stargazers_count?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 21a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm-3.25-1.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zm-3-12.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM2.5 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zM18.25 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM15 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0z" clipRule="evenodd" />
          </svg>
          <span>{repository.forks_count?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center">
          <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-blue-400" />
          <span>{repository.watchers_count?.toLocaleString() || 0}</span>
        </div>
        <div className="flex items-center">
          <CodeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-purple-400" />
          <span>{repository.language || 'N/A'}</span>
        </div>
      </div>

      <div className="flex items-center text-sm">
        <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-muted" />
        <span className="text-muted">Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
      </div>

      {isAIProject && (
        <div className="bg-accent/10 text-accent p-3 sm:p-4 rounded-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Project Detected</h3>
          <ul className="list-disc list-inside">
            {frameworks.slice(0, 3).map((framework) => (
              <li key={framework}><TruncateText text={`${framework} detected`} lines={1} /></li>
            ))}
            {frameworks.length > 3 && <li>...and more</li>}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {repository.topics?.slice(0, 5).map((topic) => (
            <span key={topic} className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs">
              {topic}
            </span>
          ))}
          {repository.topics?.length > 5 && (
            <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs">
              +{repository.topics.length - 5} more
            </span>
          )}
        </div>
      </div>

      <ReadmePreview owner={repository.owner.login} repo={repository.name} />

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary inline-block text-sm sm:text-base"
      >
        View on GitHub
      </a>
    </div>
  )
}