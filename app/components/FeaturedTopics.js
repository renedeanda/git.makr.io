import Link from 'next/link'

const topics = [
  'ai',
  'artificial intelligence',
  'machine-learning',
  'web-development',
  'data-science',
  'mobile-apps',
  'cybersecurity',
  'iot'
]

export default function FeaturedTopics() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Featured Topics</h2>
      <div className="grid grid-cols-2 gap-4">
        {topics.map(topic => (
          <Link 
            key={topic} 
            href={`/search?q=topic:${topic}`}
            className="bg-secondary/10 hover:bg-secondary/20 text-secondary px-4 py-2 rounded-lg text-center transition duration-300"
          >
            {topic.replace('-', ' ')}
          </Link>
        ))}
      </div>
    </section>
  )
}