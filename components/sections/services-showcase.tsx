"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Shovel, Home, Building2, Mountain, Droplets, TreePine, ChevronDown, ArrowLeft, ArrowRight, CheckCircle2, Ruler, MapPin } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"

const services = [
  {
    id: "foundation",
    icon: Shovel,
    title: "Foundation Excavation",
    shortTitle: "Foundation",
    description: "Precise foundation digging with exact depth and grade specifications.",
    features: ["Laser-guided accuracy", "Soil compaction testing", "Drainage integration"],
    stats: { completed: "500+", depth: "8-12ft" },
    statIcons: { completed: CheckCircle2, depth: Ruler },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvid.mp4",
  },
  {
    id: "basement",
    icon: Home,
    title: "Basement Excavation",
    shortTitle: "Basement",
    description: "Expert basement excavation with drainage planning and structural support.",
    features: ["Waterproofing prep", "Rock hammer capability", "Egress window planning"],
    stats: { completed: "300+", depth: "10-14ft" },
    statIcons: { completed: CheckCircle2, depth: Ruler },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahwarner.mp4",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Site Work",
    shortTitle: "Commercial",
    description: "Large-scale site preparation for commercial developments and facilities.",
    features: ["Multi-phase coordination", "Heavy equipment fleet", "Permit assistance"],
    stats: { completed: "150+", scale: "5-50 acres" },
    statIcons: { completed: CheckCircle2, scale: MapPin },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvidmoody.mp4",
  },
  {
    id: "grading",
    icon: Mountain,
    title: "Land Grading",
    shortTitle: "Grading",
    description: "Professional land leveling for proper drainage and stable surfaces.",
    features: ["GPS-guided grading", "Erosion control", "Final grade certification"],
    stats: { completed: "600+", accuracy: "±0.5in" },
    statIcons: { completed: CheckCircle2, accuracy: Ruler },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvid.mp4",
  },
  {
    id: "utility",
    icon: Droplets,
    title: "Utility Trenching",
    shortTitle: "Utility",
    description: "Accurate trenching for water, sewer, electrical, and drainage systems.",
    features: ["Blue Stakes coordination", "Bedding & backfill", "Multiple utility runs"],
    stats: { completed: "800+", depth: "3-8ft" },
    statIcons: { completed: CheckCircle2, depth: Ruler },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahwarner.mp4",
  },
  {
    id: "clearing",
    icon: TreePine,
    title: "Land Clearing",
    shortTitle: "Clearing",
    description: "Complete lot clearing with tree removal, stump grinding, and debris hauling.",
    features: ["Stump grinding", "Debris removal", "Topsoil preservation"],
    stats: { completed: "400+", scale: "1-10 acres" },
    statIcons: { completed: CheckCircle2, scale: MapPin },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvidmoody.mp4",
  },
]

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const currentVideoRef = useRef<HTMLVideoElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const activeService = services[activeIndex]
  const ActiveIcon = activeService.icon

  // Intersection Observer to lazy load videos only when section is visible
  // Use smaller threshold and margin for better mobile triggering
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fallback timeout - if video doesn't load within 3 seconds, hide loading state anyway
  useEffect(() => {
    if (isSectionVisible && !isVideoLoaded) {
      const timeout = setTimeout(() => {
        setIsVideoLoaded(true)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [isSectionVisible, isVideoLoaded])

  const handleServiceChange = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning) return

    setIsTransitioning(true)
    setIsVideoLoaded(false)

    if (nextVideoRef.current) {
      nextVideoRef.current.src = services[index].video
      nextVideoRef.current.load()
      nextVideoRef.current.play().catch(() => {})
    }

    setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 500)
  }, [activeIndex, isTransitioning])

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? services.length - 1 : activeIndex - 1
    handleServiceChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = activeIndex === services.length - 1 ? 0 : activeIndex + 1
    handleServiceChange(newIndex)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        handlePrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex])

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section ref={sectionRef} id="services" className="relative min-h-[85vh] w-full overflow-hidden">
      {/* Full-Screen Video Background */}
      <div className="absolute inset-0">
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse" />
        )}

        {isSectionVisible && (
          <>
            <video
              ref={currentVideoRef}
              key={`current-${activeService.id}`}
              src={activeService.video}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                isTransitioning ? "opacity-0" : "opacity-100"
              )}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              onError={() => {
                setVideoError(true)
                setIsVideoLoaded(true)
              }}
              // Additional mobile compatibility attributes
              webkit-playsinline="true"
              x5-playsinline="true"
            />

            <video
              ref={nextVideoRef}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                isTransitioning ? "opacity-100" : "opacity-0"
              )}
              muted
              loop
              playsInline
              preload="auto"
              webkit-playsinline="true"
              x5-playsinline="true"
            />
          </>
        )}

        {/* Lighter overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/35 to-black/40 pointer-events-none" />
      </div>

      {/* Top Frosted Glass Frame */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 via-black/30 to-transparent backdrop-blur-sm border-b border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header - Clean & Simple */}
        <div className="pt-24 md:pt-32 px-6">
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
            {/* Clean Icon Badge */}
            <div className="relative">
              <div
                className={cn(
                  "relative size-12 md:size-16 rounded-full backdrop-blur-xl bg-white/10 border-2 border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300",
                  isTransitioning && "scale-95 opacity-50"
                )}
              >
                <ActiveIcon
                  className={cn(
                    "size-6 md:size-8 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300",
                    isTransitioning && "scale-75"
                  )}
                />
              </div>
            </div>

            {/* Title - Clean */}
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sentient text-white drop-shadow-2xl mb-1">
                Our <i className="font-light">Services</i>
              </h2>
              <p className="font-mono text-xs md:text-sm text-white/70 tracking-wide">
                Built to last, designed to exceed expectations
              </p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Content - Floating with Shadow */}
        <div className="px-6 md:px-6 pb-8 md:pb-10">
          <div className="max-w-5xl mx-auto">
            {/* Shadow base - creates lift effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-black/40 blur-2xl rounded-3xl" style={{ transform: 'translateY(8px)' }} />

              {/* Unified Glass Container */}
              <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]">

                {/* Top inner glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Tab Bar - Contained */}
                <div className="border-b border-white/10 px-2 py-2 flex items-center gap-1 overflow-x-auto scrollbar-hide bg-white/5">
                  <StaggerContainer staggerDelay={0.05} initialDelay={0.2}>
                    {services.map((service, index) => {
                      const Icon = service.icon
                      const isActive = index === activeIndex

                      return (
                        <StaggerItem key={service.id}>
                          <motion.button
                            onClick={() => handleServiceChange(index)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-3 md:py-2.5 rounded-xl font-mono text-xs md:text-sm whitespace-nowrap transition-all duration-300 relative min-h-[44px]",
                              isActive
                                ? "bg-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                : "text-white/50 hover:text-white hover:bg-white/10"
                            )}
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={service.title}
                          >
                            <Icon className="size-4" />
                            <span className="hidden sm:inline relative">{service.shortTitle}</span>
                          </motion.button>
                        </StaggerItem>
                      )
                    })}
                  </StaggerContainer>

                  {/* Counter - Integrated */}
                  <div className="ml-auto pl-4 pr-2 flex items-center gap-2">
                    <span className="font-mono text-xs text-white/40">
                      {String(activeIndex + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content Area - Clean Layout */}
                <div
                  className={cn(
                    "p-6 md:p-6 transition-all duration-500",
                    isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-5">

                    {/* Left: Icon + Title + Description */}
                    <div className="flex-1 flex gap-4">
                      <div className="shrink-0 p-3 rounded-xl bg-white/10 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                        <activeService.icon className="size-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-sentient text-white mb-3">
                          {activeService.title}
                        </h3>
                        <p className="font-mono text-sm text-white/70 leading-relaxed max-w-lg mb-5">
                          {activeService.description}
                        </p>

                        {/* Features List */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 max-w-lg">
                          <StaggerContainer
                            staggerDelay={0.08}
                            initialDelay={0}
                            className="flex flex-wrap gap-2 sm:gap-2.5"
                          >
                            {activeService.features.map((feature, idx) => (
                              <StaggerItem key={idx}>
                                <motion.div
                                  className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-1.5 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm"
                                  whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <CheckCircle2 className="size-4 sm:size-3.5 text-green-400" strokeWidth={2} />
                                  <span className="font-mono text-sm sm:text-xs text-white/90">{feature}</span>
                                </motion.div>
                              </StaggerItem>
                            ))}
                          </StaggerContainer>
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats - Vertical Stack with Icons */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto md:min-w-[140px]">
                      <StaggerContainer
                        staggerDelay={0.1}
                        initialDelay={0.15}
                        className="flex flex-col sm:flex-row md:flex-col gap-2"
                      >
                        {Object.entries(activeService.stats).map(([key, value], idx) => {
                          const StatIcon = activeService.statIcons[key as keyof typeof activeService.statIcons]
                          if (!StatIcon) return null
                          return (
                            <StaggerItem key={key}>
                              <motion.div
                                className="flex items-center gap-3 px-4 py-3 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300"
                                whileHover={{
                                  scale: 1.03,
                                  y: -3,
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                  borderColor: "rgba(255,255,255,0.25)"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <StatIcon className="size-4 text-white/40 shrink-0" />
                                <div className="text-left">
                                  <div className="font-mono text-lg font-semibold text-white tabular-nums">{value}</div>
                                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                                    {key}
                                  </div>
                                </div>
                              </motion.div>
                            </StaggerItem>
                          )
                        })}
                      </StaggerContainer>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 flex justify-center">
                    <motion.a
                      href="#contact"
                      className="group relative overflow-hidden w-full sm:w-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="relative flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-xl border border-white/30 transition-all duration-300 shadow-lg"
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.3)",
                          borderColor: "rgba(239,68,68,0.5)",
                          boxShadow: "0 8px 32px rgba(239,68,68,0.2)"
                        }}
                        style={{
                          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                        }}
                      >
                        <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Get Free Estimate</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                          <ArrowRight className="size-4 text-white" />
                        </motion.div>
                      </motion.div>
                    </motion.a>
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between bg-white/5">
                  <motion.button
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg text-white/50 transition-all font-mono text-xs"
                    whileHover={{
                      color: "rgba(255,255,255,1)",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      x: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous service"
                  >
                    <motion.div
                      whileHover={{ x: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowLeft className="size-4" />
                    </motion.div>
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>

                  {/* Progress Dots */}
                  <div className="flex items-center gap-1.5">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleServiceChange(index)}
                        className={cn(
                          "transition-all duration-300 rounded-full p-2 -m-2",
                          index === activeIndex
                            ? "w-6 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                            : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50 hover:scale-125"
                        )}
                        aria-label={`Go to ${services[index].shortTitle}`}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg text-white/50 transition-all font-mono text-xs"
                    whileHover={{
                      color: "rgba(255,255,255,1)",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      x: 2
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next service"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <motion.div
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="size-4" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Bottom inner glow */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="flex justify-center mt-6">
              <div className="flex flex-col items-center animate-bounce">
                <ChevronDown className="size-5 text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curved Shadow - Creates depth transition */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.6) 0%, transparent 70%)',
        }}
      />

    </section>
  )
}
