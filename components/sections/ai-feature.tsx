"use client"

import { Pill } from "../pill"
import { MessageSquare, Clock, Zap } from "lucide-react"

function ExcavatorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19h4" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="14" cy="19" r="2" />
      <path d="M12 19h-2" />
      <path d="M16 19h4v-4H10v4" />
      <path d="M10 15V9l-4-4" />
      <path d="M6 5l6 1" />
      <path d="M12 6l4 4v5" />
      <path d="M5 5l-2 2" />
    </svg>
  )
}

export function AIFeature() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Pill variant="dark" className="mb-6">
              AI ASSISTANT
            </Pill>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-6 text-foreground">
              Meet <i className="font-light">Pablo</i>
            </h2>
            <p className="font-mono text-foreground/60 mb-8">
              Got questions about excavation? Our AI assistant Pablo is available 24/7 to help answer your questions,
              provide estimates, and schedule consultations.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-white" />
                <span className="font-mono text-sm text-foreground/60">Available 24/7 for instant responses</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="size-5 text-white" />
                <span className="font-mono text-sm text-foreground/60">Get quick answers to common questions</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="size-5 text-white" />
                <span className="font-mono text-sm text-foreground/60">Schedule consultations instantly</span>
              </div>
            </div>
            <p className="font-mono text-xs text-foreground/40 mt-6">
              Click the chat icon in the bottom right corner to start talking with Pablo.
            </p>
          </div>

          <div className="relative">
            <div className="border border-white/10 bg-white/5 p-6 rounded-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ExcavatorIcon className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-sentient text-foreground">Pablo</p>
                  <p className="font-mono text-xs text-foreground/50">Excavation Assistant</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 p-3 rounded-lg max-w-[80%]">
                  <p className="font-mono text-sm text-foreground/80">
                    Hi! I&apos;m Pablo, your excavation assistant. How can I help you today?
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg max-w-[80%] ml-auto">
                  <p className="font-mono text-sm text-foreground/80">How much does foundation excavation cost?</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg max-w-[80%]">
                  <p className="font-mono text-sm text-foreground/80">
                    Great question! Foundation excavation typically ranges from $1,500 to $5,000 depending on size and
                    soil conditions. Would you like a free on-site estimate?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
