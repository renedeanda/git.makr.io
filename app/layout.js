import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/ThemeProvider'
import Header from './components/Header'
import Script from 'next/script'
import { usePageTracking } from './hooks/usePageTracking'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Git Repo Explorer - Discover Amazing Projects',
  description: 'Explore Git repositories with AI project detection. Find trending repos, discover AI projects, and dive into open-source code.',
  keywords: 'Git, github, repository, explorer, AI, machine learning, open-source, code search',
  openGraph: {
    title: 'Git Repo Explorer',
    description: 'Discover amazing Git projects with AI detection',
    url: 'https://git.makr.io',
    siteName: 'Git Repo Explorer',
    images: [
      {
        url: 'https://git.makr.io/og-image.png',
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
    images: ['https://git.makr.io/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  usePageTracking()

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}