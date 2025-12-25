"use client"

import { Shield, Award, Clock, BadgeCheck, Zap, Wrench, Users } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"

// Grouped reasons by category
const categories = {
  experience: [
    {
      title: "Experienced Team",
      description: "15+ years of excavation expertise",
      details: "Our seasoned crew brings over a decade of knowledge in desert terrain excavation, foundation work, and utility installation.",
      icon: Users,
    },
    {
      title: "Modern Equipment",
      description: "Well-maintained fleet",
      details: "State-of-the-art excavators, backhoes, and compaction equipment maintained to manufacturer standards for reliable performance.",
      icon: Wrench,
    },
  ],
  trust: [
    {
      title: "Safety First",
      description: "Strict safety protocols",
      details: "OSHA-compliant practices, daily safety briefings, and comprehensive insurance coverage protect your property and our team.",
      icon: Shield,
    },
    {
      title: "Competitive Pricing",
      description: "Transparent, fair rates",
      details: "Detailed quotes with no hidden fees. We provide upfront pricing so you know exactly what to expect before work begins.",
      icon: BadgeCheck,
    },
  ],
  performance: [
    {
      title: "On-Time Delivery",
      description: "Projects completed on schedule",
      details: "We respect your timeline. Our efficient workflow and experienced project management ensure we meet deadlines consistently.",
      icon: Clock,
    },
    {
      title: "Local Expertise",
      description: "Deep regional knowledge",
      details: "St. George natives who understand local soil conditions, permitting requirements, and building codes inside and out.",
      icon: Zap,
    },
  ],
}

// Stats with expandable details
const stats = [
  {
    icon: Shield,
    label: "Licensed",
    detail: "Utah State Licensed Contractor #12345",
  },
  {
    icon: BadgeCheck,
    label: "Insured",
    detail: "$2M General Liability Coverage",
  },
  {
    icon: Award,
    label: "Bonded",
    detail: "Fully Bonded & Certified",
  },
]

export function WhyUs() {
  const [activeTab, setActiveTab] = useState<"experience" | "trust" | "performance">("experience")
  const [expandedStat, setExpandedStat] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  const activeReasons = categories[activeTab]

  return (
    <section ref={sectionRef} id="why-us" className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/excavator-site.jpg"
          alt="Excavation site background"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="container relative z-10 py-24 md:py-32">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          {/* Frosted Glass Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <span className="size-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            <span className="font-mono text-[10px] text-white uppercase tracking-widest font-medium">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-sentient mb-8 text-white font-light drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
            The Bunker <span className="font-normal">Difference</span>
          </h2>
        </motion.div>

        {/* Frosted Glass Tab Navigation */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl">
            <button
              onClick={() => setActiveTab("experience")}
              className={cn(
                "flex-1 px-6 py-4 min-h-[44px] font-mono text-xs font-bold uppercase tracking-wide transition-all duration-300",
                activeTab === "experience"
                  ? "bg-white/20 text-white backdrop-blur-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              aria-label="Experience benefits"
            >
              Experience
            </button>
            <div className="w-px h-8 bg-white/20" />
            <button
              onClick={() => setActiveTab("trust")}
              className={cn(
                "flex-1 px-6 py-4 min-h-[44px] font-mono text-xs font-bold uppercase tracking-wide transition-all duration-300",
                activeTab === "trust"
                  ? "bg-white/20 text-white backdrop-blur-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              aria-label="Trust and safety benefits"
            >
              Trust
            </button>
            <div className="w-px h-8 bg-white/20" />
            <button
              onClick={() => setActiveTab("performance")}
              className={cn(
                "flex-1 px-6 py-4 min-h-[44px] font-mono text-xs font-bold uppercase tracking-wide transition-all duration-300",
                activeTab === "performance"
                  ? "bg-white/20 text-white backdrop-blur-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              aria-label="Performance benefits"
            >
              Performance
            </button>
          </div>
        </div>

        {/* Active Tab Content - Frosted Glass Cards */}
        <div className="max-w-5xl mx-auto mb-12">
          <StaggerContainer staggerDelay={0.15} initialDelay={0.1} className="grid md:grid-cols-2 gap-6">
            {activeReasons.map((reason, index) => (
              <StaggerItem key={`${activeTab}-${index}`}>
                <motion.div
                  className="group relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] p-8 md:p-10 transition-all duration-300 overflow-hidden h-full"
                  whileHover={{
                    y: -8,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderColor: "rgba(255,255,255,0.35)",
                    scale: 1.02
                  }}
                >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="size-20 mx-auto md:mx-0 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-300">
                      <reason.icon className="size-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-sentient text-2xl md:text-3xl mb-4 text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-base md:text-lg text-white/90 leading-relaxed mb-4">
                    {reason.description}
                  </p>

                  {/* Detailed Info */}
                  <p className="font-mono text-sm text-white/70 leading-relaxed">
                    {reason.details}
                  </p>
                </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Certified & Protected - Frosted Glass Bar */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-6">
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest font-medium">
              Certified & Protected
            </span>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl overflow-hidden">
            <div className="grid grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-6 md:p-8 text-center relative",
                    index < stats.length - 1 && "border-r border-white/20"
                  )}
                >
                  <button
                    onClick={() => setExpandedStat(expandedStat === index ? null : index)}
                    className="w-full min-h-[44px] transition-all duration-300 group"
                    aria-label={`View ${stat.label} details`}
                  >
                    <stat.icon
                      className={cn(
                        "size-12 mx-auto mb-4 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
                        expandedStat === index ? "text-white scale-110" : "text-white/70 group-hover:text-white group-hover:scale-105"
                      )}
                      strokeWidth={1.5}
                    />
                    <div className={cn(
                      "font-mono text-sm font-bold uppercase tracking-wide transition-colors duration-300",
                      expandedStat === index ? "text-white" : "text-white/80 group-hover:text-white"
                    )}>
                      {stat.label}
                    </div>

                    {/* Expanded Detail */}
                    {expandedStat === index && (
                      <div className="mt-4 pt-4 border-t border-white/20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="font-mono text-xs text-white/70">
                          {stat.detail}
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
