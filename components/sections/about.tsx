"use client"

import { MessageSquare, Mail, Calendar } from "lucide-react"

export function About() {
  return (
    <section id="about" className="relative">
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

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient text-white leading-tight">
                    Meet <i className="font-light">Paul Bunker</i>
                  </h2>

                  {/* Decorative Line */}
                  <div className="mt-8 w-16 h-px bg-white/30" />
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
                <div className="mt-10 flex flex-col gap-3 max-w-sm">
                  <a
                    href="sms:8017063783?body=Hey%20Paul%2C%20I%20would%20like%20some%20help%20with%20your%20excavation%20services."
                    className="group relative overflow-hidden"
                  >
                    <div
                      className="relative flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      <MessageSquare className="size-4 text-white shrink-0" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Text Us</span>
                    </div>
                  </a>

                  <a
                    href="mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=Hey%20Paul%2C%20I%20would%20like%20some%20help%20with%20your%20excavation%20services."
                    className="group relative overflow-hidden"
                  >
                    <div
                      className="relative flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      <Mail className="size-4 text-white shrink-0" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Email Us</span>
                    </div>
                  </a>

                  <a
                    href="#contact"
                    className="group relative overflow-hidden"
                  >
                    <div
                      className="relative flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      <Calendar className="size-4 text-white shrink-0" strokeWidth={2} />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Schedule</span>
                    </div>
                  </a>
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
