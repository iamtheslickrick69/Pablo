"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: shouldReduceMotion ? 0 : initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function StaggerItem({ children, className, direction = "up" }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  }

  const hiddenVariant = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...directionOffset[direction] }

  const visibleVariant = shouldReduceMotion
    ? {
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      }

  return (
    <motion.div
      variants={{
        hidden: hiddenVariant,
        visible: visibleVariant,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
