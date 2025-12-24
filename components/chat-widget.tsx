"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const responses: Record<string, string> = {
  price:
    "Great question! Pricing varies based on project scope. Foundation excavation typically ranges from $1,500-$5,000, while larger commercial projects can vary more. Would you like a free on-site estimate? Call us at (801) 706-3783!",
  cost: "Great question! Pricing varies based on project scope. Foundation excavation typically ranges from $1,500-$5,000, while larger commercial projects can vary more. Would you like a free on-site estimate? Call us at (801) 706-3783!",
  estimate:
    "We offer free on-site estimates! Our team will assess your property, discuss your needs, and provide a detailed quote. Text or call Paul at (801) 706-3783 to schedule.",
  quote:
    "We offer free on-site estimates! Our team will assess your property, discuss your needs, and provide a detailed quote. Text or call Paul at (801) 706-3783 to schedule.",
  foundation:
    "Foundation excavation is one of our specialties! We handle residential and commercial foundations with precision grading and proper drainage preparation. What size project are you planning?",
  basement:
    "Basement excavation requires careful planning for drainage and structural support. We've completed hundreds of basement digs across Utah. Want to discuss your project?",
  time: "Project timelines depend on scope and soil conditions. Most residential excavations take 1-3 days, while commercial projects may take longer. We'll give you an accurate timeline during your free consultation.",
  long: "Project timelines depend on scope and soil conditions. Most residential excavations take 1-3 days, while commercial projects may take longer. We'll give you an accurate timeline during your free consultation.",
  schedule:
    "Ready to get started? You can schedule a consultation by calling (801) 706-3783, or click the Calendar button on our website to book online!",
  appointment:
    "Ready to get started? You can schedule a consultation by calling (801) 706-3783, or click the Calendar button on our website to book online!",
  service:
    "We offer foundation excavation, basement digging, commercial site work, land grading, utility trenching, and land clearing. What type of project do you have in mind?",
  services:
    "We offer foundation excavation, basement digging, commercial site work, land grading, utility trenching, and land clearing. What type of project do you have in mind?",
  area: "We proudly serve the entire Utah region! From Salt Lake City to surrounding counties, we're ready to help with your excavation needs.",
  utah: "We proudly serve the entire Utah region! From Salt Lake City to surrounding counties, we're ready to help with your excavation needs.",
  location:
    "We proudly serve the entire Utah region! From Salt Lake City to surrounding counties, we're ready to help with your excavation needs.",
  hello:
    "Hey there! I'm Pablo, Bunker Excavation's AI assistant. I can help answer questions about our services, pricing, and scheduling. What would you like to know?",
  hi: "Hey there! I'm Pablo, Bunker Excavation's AI assistant. I can help answer questions about our services, pricing, and scheduling. What would you like to know?",
  hey: "Hey there! I'm Pablo, Bunker Excavation's AI assistant. I can help answer questions about our services, pricing, and scheduling. What would you like to know?",
  help: "I'm here to help! I can answer questions about our excavation services, provide pricing estimates, or help you schedule a consultation. What do you need?",
  thanks:
    "You're welcome! If you have any other questions, feel free to ask. You can also reach Paul directly at (801) 706-3783.",
  thank:
    "You're welcome! If you have any other questions, feel free to ask. You can also reach Paul directly at (801) 706-3783.",
  paul: "Paul Bunker is the founder of Bunker Excavation with over 15 years of experience. He personally oversees every project to ensure quality. Want to speak with him directly? Call (801) 706-3783!",
}

const defaultResponse =
  "Thanks for your message! For detailed questions, I'd recommend speaking with Paul directly at (801) 706-3783. He can provide specific answers about your project. Is there anything else I can help with?"

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }
  return defaultResponse
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! I'm Pablo, your excavation assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: getResponse(input),
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button - Liquid Glass */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-16 rounded-full backdrop-blur-2xl bg-white/10 border-2 border-white/20 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_16px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:border-white/30 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center hover:scale-110 group",
          isOpen && "scale-0 opacity-0",
        )}
        aria-label="Open chat"
      >
        <ExcavatorIcon className="size-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
      </button>

      {/* Chat Window - Liquid Glass */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-48px)] backdrop-blur-2xl bg-black/80 rounded-3xl shadow-[0_16px_64px_rgba(0,0,0,0.6),0_0_32px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] border-2 border-white/20 overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Header - Liquid Glass */}
        <div className="relative px-5 py-5 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
              <ExcavatorIcon className="size-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>
            <div>
              <p className="font-sentient text-white font-medium">Pablo</p>
              <div className="flex items-center gap-2">
                <span className="size-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                <p className="text-xs text-white/60 font-mono">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="size-10 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white transition-all duration-300 flex items-center justify-center"
            aria-label="Close chat"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Messages - Liquid Glass */}
        <div className="h-96 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-black/40 to-black/60">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.isUser ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] p-4 rounded-2xl font-mono text-sm backdrop-blur-xl transition-all duration-300",
                  message.isUser
                    ? "bg-white/90 text-black shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
                    : "bg-white/10 border border-white/20 text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                <div className="flex gap-1.5">
                  <span className="size-2.5 bg-white/60 rounded-full animate-bounce shadow-[0_0_4px_rgba(255,255,255,0.3)]" style={{ animationDelay: "0ms" }} />
                  <span
                    className="size-2.5 bg-white/60 rounded-full animate-bounce shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="size-2.5 bg-white/60 rounded-full animate-bounce shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Liquid Glass */}
        <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-5 py-3.5 border-2 border-white/20 backdrop-blur-xl bg-white/10 rounded-2xl font-mono text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/[0.15] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-5 py-3.5 backdrop-blur-xl bg-white/90 hover:bg-white text-black rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.3)] hover:scale-105"
              aria-label="Send message"
            >
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
