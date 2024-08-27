'use client'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ReadmePreview({ owner, repo }) {
  const [readme, setReadme] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReadme() {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
        if (!res.ok) throw new Error('Failed to fetch README')
        const data = await res.json()
        const decodedContent = atob(data.content)
        setReadme(decodedContent)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReadme()
  }, [owner, repo])

  if (loading) return <div className="text-center">Loading README...</div>
  if (error) return <div className="text-center text-accent">{error}</div>

  return (
    <div className="bg-background border border-muted rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">README Preview</h3>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{readme}</ReactMarkdown>
      </div>
    </div>
  )
}