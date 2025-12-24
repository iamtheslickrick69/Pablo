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

// Helper function to convert markdown hyperlinks to HTML
function renderMessageContent(content: string): string {
  // Convert markdown links [text](#anchor) to clickable HTML links
  return content.replace(
    /\[([^\]]+)\]\((#[^)]+)\)/g,
    '<a href="$2" class="text-blue-300 underline hover:text-blue-200 transition-colors">$1</a>'
  )
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
    if (!input.trim() || isTyping) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Call the API route with conversation history
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to get response")
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ])
    } catch (error) {
      console.error("Chat error:", error)

      // Show friendly error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! I'm having trouble connecting right now. Please try again in a moment, or contact Paul directly at (801) 706-3783 for immediate assistance.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
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
              <p className="font-mono text-[10px] text-white/60 uppercase tracking-wider">
                Excavation Assistant
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="size-8 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white/70 hover:text-white transition-all duration-200 flex items-center justify-center"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="h-[400px] overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <div className="size-8 shrink-0 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center mt-0.5">
                  <ShovelIcon className="size-4 text-white" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 font-mono text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-white/20 backdrop-blur-xl border border-white/30 text-white"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-white/90",
                )}
              >
                {message.role === "assistant" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderMessageContent(message.content),
                    }}
                    className="space-y-2"
                  />
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="size-8 shrink-0 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center">
                <ShovelIcon className="size-4 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-full bg-white/60 animate-bounce [animation-delay:-0.3s]" />
                  <div className="size-2 rounded-full bg-white/60 animate-bounce [animation-delay:-0.15s]" />
                  <div className="size-2 rounded-full bg-white/60 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Frosted Glass */}
        <div className="border-t border-white/10 p-4 bg-white/5 backdrop-blur-xl">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about excavation services..."
              className="flex-1 px-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 focus:border-white/40 focus:bg-white/[0.15] text-white placeholder:text-white/40 font-mono text-sm resize-none outline-none transition-all duration-200 min-h-[44px] max-h-[120px]"
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={cn(
                "size-11 shrink-0 rounded-xl backdrop-blur-xl transition-all duration-200 flex items-center justify-center",
                input.trim() && !isTyping
                  ? "bg-white/20 hover:bg-white/30 border border-white/30 text-white hover:scale-105"
                  : "bg-white/10 border border-white/20 text-white/40 cursor-not-allowed",
              )}
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>

          {/* Disclaimer */}
          <p className="mt-3 font-mono text-[9px] text-white/40 text-center leading-relaxed">
            AI-powered assistant. For detailed quotes, contact Paul directly.
          </p>
        </div>
      </div>
    </>
  )
}
