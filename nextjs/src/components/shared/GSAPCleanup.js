'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

export default function GSAPCleanup() {
  const pathname = usePathname()
  const prevPath = useRef(pathname)

  useLayoutEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const cleanup = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        ScrollTrigger.getAll().forEach(st => st.kill())
        ScrollTrigger.clearScrollMemory()
      } catch {
      }
    }
    cleanup()
  }, [pathname])

  return null
}
