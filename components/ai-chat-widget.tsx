"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hey there! I'm Pablo, your excavation assistant. Got questions about digging, grading, or foundation work? I'm here to help! What can I do for you today?",
  },
]

const quickResponses: Record<string, string> = {
  cost: "Great question! Excavation costs vary based on the project. Foundation excavation typically runs $1,500-$5,000, while larger commercial projects can range higher. For an accurate quote, I'd recommend scheduling a free on-site estimate with Paul. Want me to help you set that up?",
  price:
    "Great question! Excavation costs vary based on the project. Foundation excavation typically runs $1,500-$5,000, while larger commercial projects can range higher. For an accurate quote, I'd recommend scheduling a free on-site estimate with Paul. Want me to help you set that up?",
  estimate:
    "We offer free on-site estimates! Paul will come out, assess your project, and give you a detailed quote with no obligation. You can text us at (801) 706-3783 or use the Schedule button on our site to set up a time.",
  time: "Project timelines depend on scope. A residential foundation might take 1-3 days, while larger commercial work can take a week or more. Weather can also be a factor. We always provide timeline estimates upfront and keep you updated throughout.",
  long: "Project timelines depend on scope. A residential foundation might take 1-3 days, while larger commercial work can take a week or more. Weather can also be a factor. We always provide timeline estimates upfront and keep you updated throughout.",
  service:
    "We offer a full range of excavation services: foundation excavation, basement digging, land grading, utility trenching, land clearing, and commercial site work. Is there a specific service you're interested in?",
  contact:
    "You can reach Paul directly at (801) 706-3783. Text or call anytime! You can also email paulbunker@gmail.com or use the contact buttons on our website.",
  phone: "You can reach Paul directly at (801) 706-3783. Text or call anytime!",
  schedule:
    "Ready to schedule? You can text us at (801) 706-3783, or click the Schedule button on our site to book a consultation. Paul typically responds within a few hours.",
  hello: "Hello! Great to meet you. How can I help with your excavation project today?",
  hi: "Hi there! What excavation questions can I help you with?",
  thanks: "You're welcome! Let me know if you have any other questions. Good luck with your project!",
  thank: "You're welcome! Let me know if you have any other questions. Good luck with your project!",
}

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  for (const [keyword, response] of Object.entries(quickResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  return "That's a great question! For specific project details, I'd recommend chatting directly with Paul. You can text him at (801) 706-3783 or schedule a free consultation through our website. Is there anything else I can help with?"
}

function ShovelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Blade */}
      <path d="M3 21L9 15L11 17L5 23C4.5 23.5 3.5 23.5 3 23C2.5 22.5 2.5 21.5 3 21Z" fill="currentColor" />
      {/* Handle connection */}
      <path d="M9 15L15 9" />
      {/* Handle */}
      <path d="M15 9L21 3" />
      {/* Grip */}
      <circle cx="17" cy="7" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const response = getAIResponse(input)
        setMessages((prev) => [...prev, { role: "assistant", content: response }])
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
      {/* Chat Button - Dark Frosted Glass */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-16 rounded-full backdrop-blur-2xl bg-black/80 border-2 border-white/20 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_16px_rgba(255,255,255,0.1)] hover:bg-black/90 hover:border-white/30 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center hover:scale-110 group",
          isOpen && "scale-0 opacity-0",
        )}
        aria-label="Open chat"
      >
        <ShovelIcon className="size-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
      </button>

      {/* Chat Window - Dark Frosted Glass */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-48px)] backdrop-blur-2xl bg-black/80 rounded-3xl shadow-[0_16px_64px_rgba(0,0,0,0.6),0_0_32px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] border-2 border-white/20 overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Header - Frosted Glass */}
        <div className="relative px-5 py-5 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
              <ShovelIcon className="size-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
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

        {/* Messages - Frosted Glass */}
        <div className="h-96 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-black/40 to-black/60">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] p-4 rounded-2xl font-mono text-sm backdrop-blur-xl transition-all duration-300",
                  message.role === "user"
                    ? "bg-white/90 text-black shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
                    : "bg-white/10 border border-white/20 text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                <div className="flex gap-1.5">
                  <span
                    className="size-2.5 bg-white/60 rounded-full animate-bounce shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                    style={{ animationDelay: "0ms" }}
                  />
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

        {/* Input - Frosted Glass */}
        <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about excavation..."
              className="flex-1 px-5 py-3.5 border-2 border-white/20 backdrop-blur-xl bg-white/10 rounded-2xl font-mono text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/[0.15] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-5 py-3.5 backdrop-blur-xl bg-white/90 hover:bg-white text-black rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_16px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center justify-center"
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
