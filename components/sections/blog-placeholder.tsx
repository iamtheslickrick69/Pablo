"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const posts = [
  {
    title: "5 Signs You Need Professional Excavation",
    excerpt: "Learn the key indicators that your project requires expert excavation services for optimal results.",
    date: "Dec 2024",
    category: "Tips",
    readTime: "5 min read",
  },
  {
    title: "Foundation Types: Which is Right for You?",
    excerpt: "A comprehensive guide to different foundation options and their specific excavation requirements.",
    date: "Dec 2024",
    category: "Guide",
    readTime: "8 min read",
  },
  {
    title: "Preparing Your Property for Excavation",
    excerpt: "Essential steps every homeowner should take before the excavation crew arrives at your site.",
    date: "Nov 2024",
    category: "Preparation",
    readTime: "4 min read",
  },
]

const categories = ["All", "Tips", "Guide", "Preparation"]

// Cyberpunk scanline animation component
function ScanlineEffect() {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev >= 100 ? 0 : prev + 0.5))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        background: `linear-gradient(180deg, transparent ${position}%, rgba(239, 68, 68, 0.1) ${position + 1}%, transparent ${position + 2}%)`
      }}
    />
  )
}

export function BlogPlaceholder() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [glitchActive, setGlitchActive] = useState(false)

  const handleCategoryChange = (category: string) => {
    setGlitchActive(true)
    setTimeout(() => {
      setActiveCategory(category)
      setGlitchActive(false)
    }, 150)
  }

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Scanline */}
      <ScanlineEffect />

      <div className="container relative py-20">
        {/* Collapsible Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative w-full border-2 border-red-500 bg-black p-8 transition-all duration-200 hover:border-red-400 overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5), inset 0 0 20px rgba(239, 68, 68, 0.1)'
          }}
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-red-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-red-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-red-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-red-500" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Neon Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-500/50 bg-red-500/10 relative">
                <span className="size-2 rounded-full bg-red-500 animate-pulse" style={{
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)'
                }} />
                <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest font-medium">
                  Insights
                </span>
              </div>

              {/* Title */}
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-sentient text-white font-light mb-1" style={{
                  textShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                }}>
                  Excavation Knowledge
                </h2>
                <p className="font-mono text-xs text-red-500/70">
                  {posts.length} articles available
                </p>
              </div>
            </div>

            {/* Glowing Chevron */}
            <div className="relative">
              <ChevronDown
                className={cn(
                  "size-6 text-red-500 transition-all duration-300",
                  isExpanded && "rotate-180"
                )}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))'
                }}
              />
            </div>
          </div>
        </button>

        {/* Expanded Content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-[2000px] opacity-100 mt-8" : "max-h-0 opacity-0"
          )}
        >
          {/* Cyberpunk Category Tabs */}
          <div className="mb-8 relative">
            <div className="flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "relative px-6 py-3 font-mono text-xs font-bold uppercase tracking-wide transition-all duration-200",
                    "border-2 overflow-hidden group",
                    activeCategory === category
                      ? "border-red-500 bg-red-500/20 text-red-500"
                      : "border-red-500/30 bg-black text-red-500/50 hover:border-red-500/50 hover:text-red-500"
                  )}
                  style={activeCategory === category ? {
                    boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
                  } : {}}
                >
                  {/* Neon Underline */}
                  {activeCategory === category && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" style={{
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)'
                    }} />
                  )}

                  <span className={cn(
                    "relative z-10",
                    glitchActive && activeCategory === category && "animate-pulse"
                  )}>
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="group relative bg-black border-2 border-red-500/50 p-8 transition-all duration-300 hover:border-red-500 overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)',
                  animation: `fadeIn 0.5s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500" />

                {/* Hover glow sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Article Number Badge */}
                <div className="flex items-center justify-between mb-6 relative">
                  <div
                    className="size-12 rounded-full border-2 border-red-500 bg-red-500/10 flex items-center justify-center font-mono text-lg font-bold text-red-500 relative"
                    style={{
                      boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
                    }}
                  >
                    <span className="relative z-10">{index + 1}</span>
                    <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
                  </div>
                  <div className="px-3 py-1 border border-red-500/50 bg-red-500/10">
                    <span className="font-mono text-[10px] text-red-500/80 uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sentient text-xl mb-4 text-white font-medium leading-tight" style={{
                  textShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-mono text-sm text-white/70 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Meta + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-red-500/30 relative">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-red-500/70">{post.date}</span>
                    <span className="size-1 bg-red-500/50 rounded-full" />
                    <span className="font-mono text-xs text-red-500/70">{post.readTime}</span>
                  </div>
                  <button
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-red-500 uppercase tracking-wide group-hover:gap-2 transition-all duration-200"
                    style={{
                      textShadow: '0 0 8px rgba(239, 68, 68, 0.5)'
                    }}
                  >
                    Read
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Cyberpunk View All CTA */}
          <div className="text-center mt-12">
            <button
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:bg-red-700 overflow-hidden border-2 border-red-500"
              style={{
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(239, 68, 68, 0.1)'
              }}
            >
              {/* Animated background sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

              <span className="relative z-10">View All Articles</span>
              <ArrowRight className="size-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
