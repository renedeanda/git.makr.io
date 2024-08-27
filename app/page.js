import SearchBar from './components/SearchBar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gradient-bg text-white">
      <h1 className="text-5xl font-bold mb-8 gradient-text">Git Repo Explorer</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Discover amazing Git projects and explore the world of open-source code.
        Our AI-powered explorer helps you find the most interesting repositories!
      </p>
      <SearchBar />
    </main>
  )
}