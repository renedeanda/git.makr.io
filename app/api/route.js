import { fetchTrendingRepos } from '../components/TrendingRepositories'
import { NextResponse } from 'next/server'

function generateSitemap(repositories) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://git.makr.io</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://git.makr.io/search</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      ${repositories.map((repo) => `
        <url>
          <loc>https://git.makr.io/repo/${repo.owner.login}/${repo.name}</loc>
          <lastmod>${new Date(repo.updated_at).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('')}
    </urlset>
  `
}

export async function GET() {
  try {
    const trendingRepos = await fetchTrendingRepos()
    const sitemap = generateSitemap(trendingRepos)

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse(JSON.stringify({ error: 'Error generating sitemap' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
