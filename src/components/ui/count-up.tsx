'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  end: string
  duration?: number
  className?: string
}

export function CountUp({ end, duration = 2000, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const numericMatch = end.match(/[\d.]+/)
    if (!numericMatch) {
      setDisplay(end)
      return
    }

    const target = parseFloat(numericMatch[0])
    const suffix = end.replace(numericMatch[0], '')
    const start = 0
    const startTime = performance.now()

    const update = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (target - start) * eased

      const formatted = Number.isInteger(target)
        ? Math.floor(current).toLocaleString('fr-FR')
        : current.toFixed(1)

      setDisplay(formatted + suffix)

      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [isInView, end, duration])

  return <span ref={ref} className={className}>{display}</span>
}
