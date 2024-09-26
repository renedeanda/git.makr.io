'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const usePageTracking = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])
}
