"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  value: number
  label: string
  unit: string
  suffix?: string
}

interface StatsCounterProps {
  stats: Stat[]
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let rafId: number

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [end, duration, start])

  return count
}

function StatItem({ stat, inView }: { stat: Stat; inView: boolean }) {
  const count = useCountUp(stat.value, 2000, inView)
  
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}
        {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
      </div>
      <div className="text-sm text-muted-foreground">{stat.unit}</div>
      <div className="text-base font-medium text-foreground mt-1">{stat.label}</div>
    </div>
  )
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
    >
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} inView={inView} />
      ))}
    </div>
  )
}
