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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110",
          isOpen && "scale-0 opacity-0",
        )}
        aria-label="Open chat"
      >
        <ExcavatorIcon className="size-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-neutral-900 rounded-lg shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="bg-black px-4 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
              <ExcavatorIcon className="size-5 text-white" />
            </div>
            <div>
              <p className="font-sentient text-white">Pablo</p>
              <p className="text-xs text-white/50 font-mono">Excavation Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-neutral-900">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.isUser ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-lg font-mono text-sm",
                  message.isUser ? "bg-white text-black" : "bg-white/10 border border-white/10 text-white/80",
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/10 p-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="size-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span
                    className="size-2 bg-white/40 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="size-2 bg-white/40 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-white/10 bg-white/5 rounded-lg font-mono text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-3 bg-white text-black rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
