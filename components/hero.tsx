"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState, useEffect, useRef } from "react"
import { MessageSquare, Mail, Calendar, MapPin } from "lucide-react"
import { site, getSMSLink, getEmailLink, getPhoneLink } from "@/lib/cms"

// Lazy load WebGL only when needed
const GL = dynamic(() => import("./gl").then((mod) => ({ default: mod.GL })), {
  ssr: false,
  loading: () => null,
})

export function Hero() {
  const [hovering, setHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to detect when hero is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          // Once visible, we keep it loaded (don't unload)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={heroRef} className="flex flex-col min-h-svh justify-center">
      {isVisible && <GL hovering={hovering} />}

      <div className="container relative">
        {/* Mobile: Centered Stack | Desktop: Split Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 px-4">

          {/* LEFT SIDE - Content (60%) */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left space-y-8">
            <div>
              <Pill className="mb-6">PROFESSIONAL EXCAVATION</Pill>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sentient text-balance">
                {site.company.tagline.split(' ').slice(0, 2).join(' ')} <br />
                <i className="font-light">{site.company.tagline.split(' ').slice(2).join(' ')}</i>
              </h1>
            </div>

            <p className="font-mono text-sm sm:text-base text-white text-balance max-w-[540px] lg:max-w-none">
              {site.company.description}
            </p>

            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 rounded-full backdrop-blur-sm">
              <MapPin className="size-4 text-primary" />
              <span className="font-mono text-sm text-foreground/80">{site.location.serviceArea}</span>
            </div>
          </div>

          {/* RIGHT SIDE - Brand & CTAs (40%) */}
          <div className="flex flex-col items-center lg:items-end gap-8 lg:max-w-[40%]">
            {/* Large Logo */}
            <Image
              src="/whitelogo.png"
              alt="Bunker Excavation"
              width={360}
              height={135}
              className="w-[280px] md:w-[360px] rounded-2xl shadow-lg"
              priority
            />

            {/* Stacked CTA Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-[360px]">
              <a
                href={getSMSLink()}
                className="group relative w-full overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <div className="relative flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                  }}
                >
                  <MessageSquare className="size-5 text-white shrink-0" strokeWidth={2} />
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Text Us</span>
                </div>
              </a>

              <a
                href={getEmailLink()}
                className="group relative w-full overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <div className="relative flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                  }}
                >
                  <Mail className="size-5 text-white shrink-0" strokeWidth={2} />
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Email Us</span>
                </div>
              </a>

              <a
                href="#contact"
                className="group relative w-full overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <div className="relative flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
                  }}
                >
                  <Calendar className="size-5 text-white shrink-0" strokeWidth={2} />
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">Schedule</span>
                </div>
              </a>
            </div>

            {/* Phone Number */}
            <a
              href={getPhoneLink()}
              className="font-mono text-lg text-foreground hover:text-primary transition-colors duration-200"
            >
              {site.contact.phoneFormatted}
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
