"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Pill } from "../pill"
import { Shovel, Home, Building2, Mountain, Droplets, TreePine, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "foundation",
    icon: Shovel,
    title: "Foundation Excavation",
    shortTitle: "Foundation",
    description:
      "Precise foundation digging for residential and commercial structures with exact depth and grade specifications.",
    features: [
      "Exact depth measurements within 1/4 inch tolerance",
      "GPS-guided excavation for perfect placement",
      "Soil compaction testing and certification",
      "Foundation pier and footer preparation",
    ],
    stats: { completed: "500+", avgDepth: "8-12ft" },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvid.mp4",
  },
  {
    id: "basement",
    icon: Home,
    title: "Basement Excavation",
    shortTitle: "Basement",
    description:
      "Expert basement and cellar excavation with proper drainage planning and structural support preparation.",
    features: [
      "Waterproofing and drainage system installation",
      "Structural wall preparation and reinforcement",
      "Access planning for equipment and materials",
      "Walkout basement grading and finishing",
    ],
    stats: { completed: "300+", avgDepth: "10-14ft" },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahwarner.mp4",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Site Work",
    shortTitle: "Commercial",
    description: "Large-scale site preparation for commercial developments, parking lots, and industrial facilities.",
    features: [
      "Multi-phase project coordination",
      "Parking lot subgrade preparation",
      "Loading dock and ramp excavation",
      "Underground utility corridor planning",
    ],
    stats: { completed: "150+", avgSize: "5-50 acres" },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvidmoody.mp4",
  },
  {
    id: "grading",
    icon: Mountain,
    title: "Land Grading",
    shortTitle: "Grading",
    description:
      "Professional land leveling and grading services to ensure proper drainage and stable building surfaces.",
    features: [
      "Laser-guided precision grading",
      "Erosion control and slope stabilization",
      "Drainage swale and retention pond creation",
      "Building pad preparation and compaction",
    ],
    stats: { completed: "600+", accuracy: "±0.5 inch" },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvid.mp4",
  },
  {
    id: "utility",
    icon: Droplets,
    title: "Utility Trenching",
    shortTitle: "Utility",
    description: "Accurate trenching for water lines, sewer connections, electrical conduits, and drainage systems.",
    features: [
      "Underground utility locating and marking",
      "Trench shoring and safety systems",
      "Bedding and backfill to specifications",
      "Fiber optic and cable conduit installation",
    ],
    stats: { completed: "800+", avgDepth: "3-8ft" },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahwarner.mp4",
  },
  {
    id: "clearing",
    icon: TreePine,
    title: "Land Clearing",
    shortTitle: "Clearing",
    description:
      "Complete lot clearing including tree removal, stump grinding, and debris hauling for new construction.",
    features: [
      "Selective clearing to preserve desired trees",
      "Stump grinding 12-18 inches below grade",
      "Brush chipping and mulch creation",
      "Topsoil salvage and stockpiling",
    ],
    stats: { completed: "400+", avgSize: "1-10 acres" },
    video: "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvidmoody.mp4",
  },
]

export function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const currentVideoRef = useRef<HTMLVideoElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const activeService = services[activeIndex]

  // Handle service tab change with smooth video crossfade
  const handleServiceChange = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning) return

    setIsTransitioning(true)
    setIsVideoLoaded(false)

    // Preload next video
    if (nextVideoRef.current) {
      nextVideoRef.current.src = services[index].video
      nextVideoRef.current.load()
      nextVideoRef.current.play().catch(() => {})
    }

    setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 600)
  }, [activeIndex, isTransitioning])

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        const newIndex = activeIndex === 0 ? services.length - 1 : activeIndex - 1
        handleServiceChange(newIndex)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        const newIndex = activeIndex === services.length - 1 ? 0 : activeIndex + 1
        handleServiceChange(newIndex)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, handleServiceChange])

  // Video loaded handler
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section id="services" className="relative min-h-screen py-20 md:py-24">
      {/* Background with enhanced glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Pill variant="dark" className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            OUR SERVICES
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sentient mb-4 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Professional <i className="font-light">Excavation</i> Services
          </h2>
          <p className="font-mono text-sm md:text-base text-foreground/60 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            From residential foundations to commercial site work, we deliver quality excavation solutions tailored to
            your project needs.
          </p>
        </div>

        {/* Horizontal Tabs */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          role="tablist"
          aria-label="Service categories"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isActive = index === activeIndex

            return (
              <button
                key={service.id}
                onClick={() => handleServiceChange(index)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`service-panel-${service.id}`}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "group relative px-5 py-3 rounded-full font-mono text-sm font-medium transition-all duration-300 ease-out",
                  "backdrop-blur-xl border overflow-hidden",
                  "hover:scale-105 active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isActive
                    ? "bg-white/15 border-primary shadow-[0_0_20px_rgba(220,38,38,0.4),0_0_40px_rgba(220,38,38,0.2)] text-white scale-105"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                )}
              >
                {/* Ripple effect background */}
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent",
                      "translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"
                    )}
                  />
                </span>

                {/* Content */}
                <span className="relative flex items-center gap-2">
                  <Icon className={cn(
                    "size-4 transition-transform duration-300",
                    isActive && "scale-110"
                  )} />
                  <span className="max-sm:hidden">{service.shortTitle}</span>
                  <span className="sm:hidden">{service.shortTitle.slice(0, 4)}</span>
                </span>

                {/* Active indicator glow */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* Video Showcase with Content Overlay */}
        <div
          id={`service-panel-${activeService.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeService.id}`}
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400"
          style={{ perspective: "1000px" }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl opacity-30 -z-10" />

          {/* Video Container */}
          <div className="relative h-[70vh] bg-black overflow-hidden">
            {/* Loading skeleton */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
            )}

            {/* Current video */}
            <video
              ref={currentVideoRef}
              key={`current-${activeService.id}`}
              src={activeService.video}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                isTransitioning ? "opacity-0" : "opacity-100"
              )}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoaded}
            />

            {/* Next video (for crossfade) */}
            <video
              ref={nextVideoRef}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                isTransitioning ? "opacity-100" : "opacity-0"
              )}
              muted
              loop
              playsInline
              preload="auto"
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

            {/* Top gradient for depth */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            {/* Content Overlay - Bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="max-w-4xl">
                {/* Glassmorphic content card */}
                <div
                  className={cn(
                    "backdrop-blur-2xl bg-gradient-to-br from-black/80 via-black/70 to-black/60",
                    "border border-white/10 rounded-2xl p-6 md:p-8",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                    "transition-all duration-600",
                    isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                  )}
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 backdrop-blur-sm">
                      <activeService.icon className="size-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-sentient text-white mb-2">
                        {activeService.title}
                      </h3>
                      <p className="font-mono text-sm md:text-base text-white/70">
                        {activeService.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {Object.entries(activeService.stats).map(([key, value]) => (
                      <div
                        key={key}
                        className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <span className="font-mono text-xs text-white/50 uppercase tracking-wider mr-2">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-mono text-sm font-semibold text-white">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeService.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 group"
                      >
                        <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-xs md:text-sm text-white/80 group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* Bottom reflection/shadow */}
          <div
            className="absolute -bottom-8 left-0 right-0 h-16 bg-primary/5 blur-2xl"
            style={{ transform: "rotateX(80deg)" }}
          />
        </div>

        {/* Keyboard navigation hint */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-white/40">
            Use <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">←</kbd> and{" "}
            <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">→</kbd> to navigate
          </p>
        </div>
      </div>
    </section>
  )
}
