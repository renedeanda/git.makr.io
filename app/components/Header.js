import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-background border-b border-muted">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          Git Repo Explorer
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}