"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"

interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  className?: string
}

export function Counter({ from = 0, to, duration = 2, suffix = "", className }: CounterProps) {
  const ref = useRef(null)
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [isInView, count, to, duration])

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
