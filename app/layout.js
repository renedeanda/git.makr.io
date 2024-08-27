import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics, GoogleAnalytics } from './utils/analytics'
import { ThemeProvider } from './components/ThemeProvider'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Git Repo Explorer - Discover Amazing Projects',
  description: 'Explore Git repositories with AI project detection. Find trending repos, discover AI projects, and dive into open-source code.',
  keywords: 'Git, repository, explorer, AI, machine learning, open-source, code search',
  openGraph: {
    title: 'Git Repo Explorer',
    description: 'Discover amazing Git projects with AI detection',
    url: 'https://git-repo-explorer.vercel.app',
    siteName: 'Git Repo Explorer',
    images: [
      {
        url: 'https://git-repo-explorer.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Repo Explorer',
    description: 'Discover amazing Git projects with AI detection',
    images: ['https://git-repo-explorer.vercel.app/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}