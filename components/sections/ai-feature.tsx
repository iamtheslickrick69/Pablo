"use client"

import { MessageSquare, Clock, Zap, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"

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

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      <span className="size-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
      <span className="size-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
      <span className="size-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
    </div>
  )
}

const demoMessages = [
  { role: "assistant", text: "Hi! I'm Pablo, your excavation assistant. How can I help you today?" },
  { role: "user", text: "How much does foundation excavation cost?" },
  {
    role: "assistant",
    text: "Great question! Foundation excavation typically ranges from $1,500 to $5,000 depending on size and soil conditions. Would you like a free on-site estimate?",
  },
]

export function AIFeature() {
  const [displayedMessages, setDisplayedMessages] = useState<typeof demoMessages>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted || currentMessageIndex >= demoMessages.length) return

    const message = demoMessages[currentMessageIndex]
    setIsTyping(true)

    const typingDelay = message.role === "assistant" ? 1500 : 800

    const timer = setTimeout(() => {
      setIsTyping(false)
      setDisplayedMessages((prev) => [...prev, message])
      setCurrentMessageIndex((prev) => prev + 1)
    }, typingDelay)

    return () => clearTimeout(timer)
  }, [hasStarted, currentMessageIndex])

  return (
    <section ref={sectionRef} className="relative bg-black border-t border-white/10">
      <div className="container py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg">
              <span className="size-1.5 rounded-full bg-red-500" />
              <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest font-medium">
                AI Assistant
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sentient mb-5 text-white font-light">
              Meet <span className="font-normal">Pablo</span>
            </h2>
            <p className="font-mono text-xs text-white/60 mb-10 leading-relaxed">
              Got questions about excavation? Our AI assistant Pablo is available 24/7 to help answer your questions,
              provide estimates, and schedule consultations.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-100 hover:border-red-500/50 hover:bg-white/10 rounded-lg">
                <div className="size-12 border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center shrink-0 rounded-lg">
                  <Clock className="size-6 text-red-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-sentient text-white font-medium mb-1">Available 24/7</h4>
                  <span className="font-mono text-xs text-white/60">Instant responses anytime</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-100 hover:border-red-500/50 hover:bg-white/10 rounded-lg">
                <div className="size-12 border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center shrink-0 rounded-lg">
                  <MessageSquare className="size-6 text-red-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-sentient text-white font-medium mb-1">Quick Answers</h4>
                  <span className="font-mono text-xs text-white/60">Get answers to common questions</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-100 hover:border-red-500/50 hover:bg-white/10 rounded-lg">
                <div className="size-12 border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center shrink-0 rounded-lg">
                  <Zap className="size-6 text-red-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-sentient text-white font-medium mb-1">Easy Scheduling</h4>
                  <span className="font-mono text-xs text-white/60">Book consultations instantly</span>
                </div>
              </div>
            </div>
            <p className="font-mono text-xs text-white/40 mt-8 border-l-2 border-red-500/30 pl-4">
              Click the chat icon in the bottom right corner to start talking with Pablo.
            </p>
          </div>

          <div className="relative">
            {/* Chat Window */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-b border-white/10">
                <div className="size-10 border-2 border-white/80 rounded-lg flex items-center justify-center bg-white/10">
                  <ExcavatorIcon className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-sentient font-medium">Pablo</p>
                  <p className="font-mono text-xs text-white/70">Excavation Assistant</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="size-2 bg-white rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-white/70">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-4 min-h-[300px] bg-zinc-950/50">
                {displayedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 font-mono text-sm rounded-xl ${
                        message.role === "user"
                          ? "bg-red-600 text-white"
                          : "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-zinc-950/50">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-100 backdrop-blur-sm"
                    disabled
                  />
                  <button className="size-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-all duration-100 shadow-lg shadow-red-500/20">
                    <Send className="size-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
