'use client'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end?: number
  to?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  format?: (n: number) => string
}

export default function CountUp({
  end,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  format,
}: CountUpProps) {
  const target = end ?? to ?? 0
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{format ? format(count) : count}{suffix}
    </span>
  )
}
