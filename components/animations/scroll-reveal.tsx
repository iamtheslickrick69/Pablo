"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef(null)
  // Use smaller negative margin for better mobile triggering
  // -100px was preventing animations on smaller viewports
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  const shouldReduceMotion = useReducedMotion()
  const [forceVisible, setForceVisible] = useState(false)

  // Fallback: force visibility after 2 seconds if animations haven't triggered
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isInView) {
        setForceVisible(true)
      }
    }, 2000)
    return () => clearTimeout(timeout)
  }, [isInView])

  const shouldShow = isInView || forceVisible

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  // If user prefers reduced motion or force visible, just fade in without movement
  const initial = shouldReduceMotion || forceVisible
    ? { opacity: 0 }
    : { opacity: 0, ...directionOffset[direction] }

  const animate = shouldReduceMotion || forceVisible
    ? shouldShow ? { opacity: 1 } : {}
    : shouldShow ? { opacity: 1, x: 0, y: 0 } : {}

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: shouldReduceMotion || forceVisible ? 0.3 : duration,
        delay: shouldReduceMotion || forceVisible ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
