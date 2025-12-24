"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Send, HardHat } from "lucide-react"

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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-14 rounded-full bg-primary text-background flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300",
          isOpen && "scale-0 opacity-0",
        )}
        aria-label="Open chat"
      >
        <HardHat className="size-7" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-background border border-border/50 shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
              <HardHat className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-sentient font-medium">Pablo</p>
              <p className="font-mono text-xs text-foreground/50">Excavation Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="size-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "max-w-[85%] p-3 rounded-lg",
                message.role === "assistant" ? "bg-border/20 mr-auto" : "bg-primary/10 ml-auto",
              )}
            >
              <p className="font-mono text-sm text-foreground/80">{message.content}</p>
            </div>
          ))}
          {isTyping && (
            <div className="max-w-[85%] p-3 rounded-lg bg-border/20 mr-auto">
              <div className="flex gap-1">
                <span
                  className="size-2 rounded-full bg-foreground/40 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="size-2 rounded-full bg-foreground/40 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="size-2 rounded-full bg-foreground/40 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about excavation..."
              className="flex-1 bg-border/20 border border-border/30 rounded-lg px-4 py-2 font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="size-10 bg-primary text-background rounded-lg flex items-center justify-center hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
