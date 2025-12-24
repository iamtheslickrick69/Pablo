"use client"

import { Pill } from "../pill"
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
    <div className="flex items-center gap-1 px-3 py-2">
      <span className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-gradient-to-br from-slate-100 via-white to-amber-50/30">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Pill variant="light" className="mb-6">
              AI ASSISTANT
            </Pill>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-6 text-slate-900">
              Meet <i className="font-light">Pablo</i>
            </h2>
            <p className="font-mono text-slate-600 mb-8">
              Got questions about excavation? Our AI assistant Pablo is available 24/7 to help answer your questions,
              provide estimates, and schedule consultations.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="size-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="size-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-sentient text-slate-900 font-medium">Available 24/7</h4>
                  <span className="font-mono text-sm text-slate-500">Instant responses anytime</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="size-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <MessageSquare className="size-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-sentient text-slate-900 font-medium">Quick Answers</h4>
                  <span className="font-mono text-sm text-slate-500">Get answers to common questions</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="size-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Zap className="size-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-sentient text-slate-900 font-medium">Easy Scheduling</h4>
                  <span className="font-mono text-sm text-slate-500">Book consultations instantly</span>
                </div>
              </div>
            </div>
            <p className="font-mono text-xs text-slate-400 mt-6">
              Click the chat icon in the bottom right corner to start talking with Pablo.
            </p>
          </div>

          <div className="relative">
            {/* Chat Window */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 bg-slate-900 text-white">
                <div className="size-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <ExcavatorIcon className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-sentient font-medium">Pablo</p>
                  <p className="font-mono text-xs text-white/60">Excavation Assistant</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="size-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-white/60">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 min-h-[300px] bg-slate-50">
                {displayedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl font-mono text-sm ${
                        message.role === "user"
                          ? "bg-slate-900 text-white rounded-br-md"
                          : "bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-slate-100 rounded-xl font-mono text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    disabled
                  />
                  <button className="size-12 bg-amber-500 hover:bg-amber-600 rounded-xl flex items-center justify-center transition-colors duration-300">
                    <Send className="size-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-slate-900/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
