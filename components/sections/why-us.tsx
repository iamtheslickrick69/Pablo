"use client"

import { Pill } from "../pill"
import { CheckCircle, Shield, Award, Clock, BadgeCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const reasons = [
  {
    title: "Experienced Team",
    description:
      "Over 15 years of excavation expertise with a skilled crew that understands the complexities of every job.",
    icon: Award,
  },
  {
    title: "Modern Equipment",
    description: "Well-maintained fleet of excavators, loaders, and specialized equipment for projects of any scale.",
    icon: Shield,
  },
  {
    title: "On-Time Delivery",
    description: "We respect your timeline. Our efficient processes ensure projects are completed on schedule.",
    icon: Clock,
  },
  {
    title: "Competitive Pricing",
    description: "Transparent quotes with no hidden fees. Quality excavation services at fair market rates.",
    icon: BadgeCheck,
  },
  {
    title: "Safety First",
    description: "Strict adherence to safety protocols protecting our team, your property, and the environment.",
    icon: Shield,
  },
  {
    title: "Local Expertise",
    description: "Deep knowledge of local soil conditions, regulations, and permitting requirements.",
    icon: Award,
  },
]

const trustBadges = [
  { label: "Licensed", icon: BadgeCheck },
  { label: "Insured", icon: Shield },
  { label: "Bonded", icon: Award },
]

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const increment = target / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Pill variant="light" className="mb-6">
              WHY CHOOSE US
            </Pill>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-6 text-slate-900">
              The Bunker <i className="font-light">Difference</i>
            </h2>
            <p className="font-mono text-slate-600 mb-8">
              When you choose Bunker Excavation, you&apos;re partnering with a team that treats every project like
              it&apos;s their own. We combine old-school craftsmanship with modern efficiency.
            </p>

            {/* Animated Counter */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl md:text-6xl font-sentient text-slate-900">
                <AnimatedCounter target={500} suffix="+" />
              </span>
              <span className="font-mono text-slate-500 uppercase text-sm">
                Satisfied
                <br />
                Customers
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full"
                >
                  <badge.icon className="size-4 text-emerald-600" />
                  <span className="font-mono text-sm text-emerald-700 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group flex gap-3 p-5 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg"
              >
                <div className="shrink-0">
                  <div className="size-10 rounded-lg bg-slate-100 group-hover:bg-slate-900 flex items-center justify-center transition-colors duration-300">
                    <CheckCircle className="size-5 text-slate-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-sentient text-lg mb-1 text-slate-900">{reason.title}</h3>
                  <p className="font-mono text-xs text-slate-500 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
