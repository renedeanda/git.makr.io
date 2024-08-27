import AIBadge from './AIBadge'
import { detectAIProject } from '../utils/aiDetector'

export default function RepositoryDetails({ repository }) {
  const { isAIProject, frameworks } = detectAIProject(repository)

  return (
    <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-4 gradient-text">{repository.full_name}</h2>
      <p className="text-gray-300 mb-6">{repository.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          Stars: {repository.stargazers_count}
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 50 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          Forks: {repository.forks_count}
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
          </svg>
          Watchers: {repository.watchers_count}
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          Language: {repository.language}
        </div>
      </div>
      {isAIProject && (
        <div className="mb-6">
          <AIBadge />
          <h3 className="text-xl font-semibold mt-4 mb-2 gradient-text">AI Insights</h3>
          <ul className="list-disc list-inside">
            {frameworks.map((framework) => (
              <li key={framework}>{framework} detected</li>
            ))}
          </ul>
        </div>
      )}
      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
      >
        View on Git
      </a>
    </div>
  )
}