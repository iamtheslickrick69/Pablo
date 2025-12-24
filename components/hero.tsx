"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState, useEffect, useRef } from "react"
import { MessageSquare, Mail, Calendar, MapPin } from "lucide-react"
import { site, getSMSLink, getEmailLink, getPhoneLink } from "@/lib/cms"
import { motion, useScroll, useTransform } from "framer-motion"

// Lazy load WebGL only when needed
const GL = dynamic(() => import("./gl").then((mod) => ({ default: mod.GL })), {
  ssr: false,
  loading: () => null,
})

export function Hero() {
  const [hovering, setHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Parallax effect
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Intersection Observer to detect when hero is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
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

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <div ref={heroRef} className="flex flex-col min-h-svh justify-center relative overflow-hidden">
      {isVisible && <GL hovering={hovering} />}

      <motion.div
        className="container relative"
        style={{ y, opacity }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Mobile: Centered Stack | Desktop: Split Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-6">

          {/* LEFT SIDE - Content (60%) */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left space-y-6 sm:space-y-8">
            <div>
              <motion.div variants={itemVariants}>
                <Pill className="mb-6">PROFESSIONAL EXCAVATION</Pill>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sentient text-balance leading-tight"
                variants={itemVariants}
              >
                {site.company.tagline.split(' ').slice(0, 2).join(' ')} <br />
                <i className="font-light">{site.company.tagline.split(' ').slice(2).join(' ')}</i>
              </motion.h1>
            </div>

            <motion.p
              className="font-mono text-sm sm:text-base text-white text-balance max-w-[540px] mx-auto lg:mx-0 lg:max-w-none leading-relaxed"
              variants={itemVariants}
            >
              {site.company.description}
            </motion.p>

            {/* Location Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 rounded-full backdrop-blur-sm"
              variants={itemVariants}
            >
              <MapPin className="size-4 text-primary" />
              <span className="font-mono text-xs sm:text-sm text-foreground/80">{site.location.serviceArea}</span>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Brand & CTAs (40%) */}
          <motion.div
            className="flex flex-col items-center lg:items-end gap-6 sm:gap-8 w-full lg:max-w-[40%]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.6,
                },
              },
            }}
          >
            {/* Large Logo */}
            <motion.div
              variants={itemVariants}
            >
              <Image
                src="/whitelogo.png"
                alt="Bunker Excavation"
                width={360}
                height={135}
                className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] rounded-2xl shadow-lg"
                priority
              />
            </motion.div>

            {/* Stacked CTA Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[360px] px-4 sm:px-0">
              <motion.a
                href={getSMSLink()}
                className="group relative w-full overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                variants={buttonVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-5 sm:px-6 py-3 sm:py-4 min-h-[44px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                  }}
                >
                  <MessageSquare className="size-4 sm:size-5 text-white shrink-0" strokeWidth={2} />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Text Us</span>
                </div>
              </motion.a>

              <motion.a
                href={getEmailLink()}
                className="group relative w-full overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                variants={buttonVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-5 sm:px-6 py-3 sm:py-4 min-h-[44px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                  }}
                >
                  <Mail className="size-4 sm:size-5 text-white shrink-0" strokeWidth={2} />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Email Us</span>
                </div>
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative w-full overflow-hidden"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                variants={buttonVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-5 sm:px-6 py-3 sm:py-4 min-h-[44px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                  }}
                >
                  <Calendar className="size-4 sm:size-5 text-white shrink-0" strokeWidth={2} />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Schedule</span>
                </div>
              </motion.a>
            </div>

            {/* Phone Number */}
            <motion.a
              href={getPhoneLink()}
              className="inline-flex items-center justify-center min-h-[44px] px-4 font-mono text-base sm:text-lg text-foreground hover:text-primary transition-colors duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {site.contact.phoneFormatted}
            </motion.a>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
