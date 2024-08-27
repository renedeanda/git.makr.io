import SearchBar from './components/SearchBar'
import TrendingRepositories from './components/TrendingRepositories'
import FeaturedTopics from './components/FeaturedTopics'

export default function Home() {
  return (
    <div className="space-y-12 fade-in">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">Git Repo Explorer</h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Discover amazing Git projects and explore the world of open-source code.
          Our explorer helps you find the most interesting repositories!
        </p>
        <a
          href="https://renedeanda.com?utm_source=git.makr.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm gradient-text hover:opacity-80 transition-opacity duration-200"
        >
          Created with 🧡 + 🤖 by René DeAnda
        </a>
      </section>
      <SearchBar />
      <div className="grid md:grid-cols-2 gap-8">
        <TrendingRepositories />
        <FeaturedTopics />
      </div>
    </div>
  )
}