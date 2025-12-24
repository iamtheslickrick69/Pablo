"use client"

import { Pill } from "../pill"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Phone, ClipboardList, HardHat, CheckCircle2, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"

interface Step {
  number: string
  title: string
  description: string
  details: string[]
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: "01",
    title: "Consultation",
    description: "Free on-site assessment to understand your project requirements, timeline, and budget.",
    details: [
      "In-person site visit at your convenience",
      "Soil and terrain analysis",
      "Detailed scope discussion",
      "Preliminary cost estimate",
    ],
    icon: Phone,
  },
  {
    number: "02",
    title: "Planning",
    description: "Detailed project plan including equipment needs, permits, and scheduling coordination.",
    details: [
      "Permit acquisition assistance",
      "Equipment and crew allocation",
      "Timeline development",
      "Utility location coordination",
    ],
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Execution",
    description: "Professional excavation work with real-time communication and quality checkpoints.",
    details: [
      "Daily progress updates",
      "Quality control inspections",
      "Safety protocol adherence",
      "Debris management and hauling",
    ],
    icon: HardHat,
  },
  {
    number: "04",
    title: "Completion",
    description: "Final inspection, site cleanup, and walkthrough to ensure complete satisfaction.",
    details: [
      "Final grade verification",
      "Complete site cleanup",
      "Client walkthrough",
      "Documentation and sign-off",
    ],
    icon: CheckCircle2,
  },
]

// Desktop Step Content (right side)
function StepContent({
  step,
  index,
  setActiveStep
}: {
  step: Step
  index: number
  setActiveStep: (index: number) => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveStep(index)
          }
        })
      },
      {
        threshold: [0.5],
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current)
      }
    }
  }, [index, setActiveStep])

  return (
    <div
      id={`step-${index}`}
      ref={contentRef}
      className="py-12 first:pt-0 last:pb-0"
    >
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:bg-white/[0.12] transition-all duration-300">
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <div className="relative z-10">
          {/* Icon + Number */}
          <div className="flex items-center gap-4 mb-8">
            <div className="size-16 md:size-20 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
              <step.icon className="size-8 md:size-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
            </div>
            <span className="font-mono text-sm text-white/60 font-bold tracking-wider">
              {step.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-sentient text-white font-light mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {step.title}
          </h3>

          {/* Description */}
          <p className="font-mono text-sm md:text-base text-white/80 leading-relaxed mb-8">
            {step.description}
          </p>

          {/* Details List */}
          <ul className="space-y-3 border-l-2 border-white/30 pl-6">
            {step.details.map((detail, i) => (
              <li
                key={i}
                className="font-mono text-xs md:text-sm text-white/70 leading-relaxed"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Mobile Card Component
function MobileCard({
  step,
  index,
  expandedStep,
  setExpandedStep
}: {
  step: Step
  index: number
  expandedStep: number | null
  setExpandedStep: (idx: number | null) => void
}) {
  return (
    <div
      className={cn(
        "border-2 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl relative",
        expandedStep === index
          ? "bg-white/20 border-white shadow-[0_8px_24px_rgba(255,255,255,0.1)]"
          : "bg-white/10 border-white/20 hover:bg-white/[0.12] hover:border-white/30"
      )}
    >
      {/* Top indicator for expanded */}
      {expandedStep === index && (
        <div className="h-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      )}

      <button
        onClick={() => setExpandedStep(expandedStep === index ? null : index)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div
          className={cn(
            "size-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 shrink-0 backdrop-blur-xl",
            expandedStep === index
              ? "bg-white/30 border-white text-white shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              : "bg-white/10 border-white/30 text-white/80"
          )}
        >
          <step.icon className="size-5" strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] font-bold text-white/60 tracking-wider">
              {step.number}
            </span>
            <h3 className="font-sentient text-base text-white font-medium truncate">
              {step.title}
            </h3>
          </div>
          <p className="font-mono text-[10px] text-white/60 line-clamp-1">
            {step.description}
          </p>
        </div>

        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-300 shrink-0",
            expandedStep === index ? "rotate-180 text-white" : "text-white/50"
          )}
          strokeWidth={2}
        />
      </button>

      {expandedStep === index && (
        <div className="px-5 pb-5 border-t border-white/20">
          <div className="pl-[60px] pt-4 space-y-3">
            <p className="font-mono text-xs text-white/80 leading-relaxed border-l-2 border-white/30 pl-3">
              {step.description}
            </p>
            <ul className="space-y-1.5">
              {step.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 font-mono text-[10px] text-white/70 leading-relaxed"
                >
                  <span className="mt-0.5">—</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export function Process() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  // Smooth scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const contentElement = contentRef.current
      const rect = contentElement.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const contentHeight = contentElement.offsetHeight

      // Calculate how far through the content we've scrolled
      // When top of content hits top of viewport = 0%
      // When bottom of content hits bottom of viewport = 100%
      const scrollStart = rect.top
      const scrollableDistance = contentHeight - viewportHeight
      const scrolled = -scrollStart

      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance))
      setScrollProgress(progress * 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStep = (index: number) => {
    const element = document.getElementById(`step-${index}`)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section ref={sectionRef} id="process" className="relative bg-black py-24 md:py-32">
      <div className="container relative">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center pb-20 transition-opacity duration-200",
            headerInView ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Glass Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <span className="size-1.5 rounded-full bg-white" />
            <span className="font-mono text-[10px] text-white uppercase tracking-widest font-medium">
              Our Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-sentient mb-5 text-white font-light drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
            How We <span className="font-normal">Work</span>
          </h2>

          <p className="font-mono text-xs text-white/70 max-w-xl mx-auto leading-relaxed tracking-wide">
            A streamlined process designed to keep your project on track and stress-free from start to finish.
          </p>
        </div>

        {/* Desktop: Split Layout */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-20 pb-20">
          {/* Left: Sticky Vertical Timeline */}
          <div className="relative">
            <div className="sticky top-32">
              {/* Vertical Line Background */}
              <div className="absolute left-[15px] top-[20px] bottom-[20px] w-px bg-white/10" />

              {/* Smooth Progress Line - Glowing */}
              <div
                className="absolute left-[15px] top-[20px] w-px bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-150 ease-linear"
                style={{
                  height: `calc(${scrollProgress}% - 40px)`
                }}
              />

              {/* Step Indicators */}
              <div className="relative space-y-10">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToStep(index)}
                    className="flex items-center gap-4 text-left w-full group"
                  >
                    {/* Circle Indicator - Glass */}
                    <div
                      className={cn(
                        "size-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 relative z-10 backdrop-blur-xl",
                        activeStep === index
                          ? "bg-white/20 border-white shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                          : "bg-white/5 border-white/20 group-hover:bg-white/10 group-hover:border-white/40"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold transition-colors duration-300",
                          activeStep === index
                            ? "text-white"
                            : "text-white/50 group-hover:text-white/80"
                        )}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <div
                        className={cn(
                          "font-sentient text-sm transition-colors duration-300",
                          activeStep === index
                            ? "text-white font-medium"
                            : "text-white/50 group-hover:text-white/80"
                        )}
                      >
                        {step.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Scrolling Content */}
          <div ref={contentRef} className="relative">
            {steps.map((step, index) => (
              <StepContent
                key={index}
                step={step}
                index={index}
                setActiveStep={setActiveStep}
              />
            ))}

            {/* CTA at bottom */}
            <div className="pt-16">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white font-mono text-sm font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
              >
                <span>Start With Step 1</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden pb-12 space-y-4">
          {steps.map((step, index) => (
            <MobileCard
              key={index}
              step={step}
              index={index}
              expandedStep={expandedStep}
              setExpandedStep={setExpandedStep}
            />
          ))}

          {/* Mobile CTA */}
          <div className="text-center mt-12 pt-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 w-full max-w-xs px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white font-mono text-sm font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
            >
              <span>Start With Step 1</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
