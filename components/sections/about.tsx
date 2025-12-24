"use client"

import { MessageSquare, Mail, Calendar } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <section ref={sectionRef} id="about" className="relative">
      {/* Sophisticated Black & White About Section */}
      <div className="relative bg-black py-24 md:py-32">
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column: Heading & Badge */}
              <div className="relative">
                {/* Vertical Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/20 to-transparent hidden lg:block" />

                <div className="lg:pl-8">
                  {/* Clean White Pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 mb-8">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="font-mono text-xs tracking-wider text-white/70 uppercase">About Us</span>
                  </div>

                  <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl font-sentient text-white leading-tight"
                    style={{ y, opacity }}
                  >
                    Meet <i className="font-light">Paul Bunker</i>
                  </motion.h2>

                  {/* Decorative Line */}
                  <motion.div
                    className="mt-8 w-16 h-px bg-white/30"
                    style={{ opacity }}
                  />
                </div>
              </div>

              {/* Right Column: Content & CTA */}
              <div className="flex flex-col justify-between">
                <div className="space-y-6 font-mono text-white/70 leading-relaxed text-base">
                  <p>
                    St. George&apos;s desert terrain—caliche, volcanic rock, and extreme heat—demands specialized excavation expertise.
                    Paul Bunker has spent years mastering these conditions, delivering precise work on time, every time.
                  </p>
                  <p>
                    Serving residential and commercial clients throughout Washington County with honest service, expert execution,
                    and a deep understanding of what it takes to excavate in the desert.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col gap-3 w-full sm:max-w-sm">
                  <motion.a
                    href="sms:8017063783?body=Hey%20Paul%2C%20I%20would%20like%20some%20help%20with%20your%20excavation%20services."
                    className="group relative overflow-hidden w-full"
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center sm:justify-start gap-3 px-5 py-3 min-h-[44px] bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderColor: "rgba(239,68,68,0.5)",
                        boxShadow: "0 8px 32px rgba(239,68,68,0.2)"
                      }}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      <MessageSquare className="size-4 text-white shrink-0" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Text Us</span>
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=Hey%20Paul%2C%20I%20would%20like%20some%20help%20with%20your%20excavation%20services."
                    className="group relative overflow-hidden w-full"
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center sm:justify-start gap-3 px-5 py-3 min-h-[44px] bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderColor: "rgba(239,68,68,0.5)",
                        boxShadow: "0 8px 32px rgba(239,68,68,0.2)"
                      }}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      <Mail className="size-4 text-white shrink-0" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Email Us</span>
                    </motion.div>
                  </motion.a>

                  <motion.a
                    href="#contact"
                    className="group relative overflow-hidden w-full"
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center sm:justify-start gap-3 px-5 py-3 min-h-[44px] bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderColor: "rgba(239,68,68,0.5)",
                        boxShadow: "0 8px 32px rgba(239,68,68,0.2)"
                      }}
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      <Calendar className="size-4 text-white shrink-0" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Schedule</span>
                    </motion.div>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  )
}
