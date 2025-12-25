"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle visual viewport for keyboard detection (iOS Safari + Android)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleViewportChange = () => {
      if (window.visualViewport) {
        const vv = window.visualViewport
        const windowHeight = window.innerHeight
        const viewportH = vv.height
        const keyboardH = Math.max(0, windowHeight - viewportH)

        setKeyboardHeight(keyboardH)
        setViewportHeight(viewportH)

        // Scroll to keep input visible when keyboard opens
        if (keyboardH > 0 && isOpen && inputRef.current) {
          setTimeout(() => {
            inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
          }, 100)
        }
      }
    }

    // Set initial viewport height
    setViewportHeight(window.visualViewport?.height || window.innerHeight)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
      window.visualViewport.addEventListener('scroll', handleViewportChange)
    }

    // Fallback for older browsers
    window.addEventListener('resize', handleViewportChange)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange)
        window.visualViewport.removeEventListener('scroll', handleViewportChange)
      }
      window.removeEventListener('resize', handleViewportChange)
    }
  }, [isOpen])

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isMobile, isOpen])

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

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

  // Handle input focus for mobile
  const handleInputFocus = () => {
    if (isMobile) {
      // Small delay to let keyboard appear
      setTimeout(() => {
        scrollToBottom()
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 300)
    }
  }

  // Close chat handler
  const handleClose = () => {
    // Blur input first to dismiss keyboard
    inputRef.current?.blur()
    setTimeout(() => setIsOpen(false), 50)
  }

  // Calculate dynamic height for mobile
  const getChatHeight = () => {
    if (!isMobile) return 'auto'
    const safeAreaBottom = 20
    const maxHeight = viewportHeight > 0 ? viewportHeight - safeAreaBottom : window.innerHeight - safeAreaBottom
    return `${Math.min(maxHeight, 600)}px`
  }

  // Calculate messages container height
  const getMessagesHeight = () => {
    if (!isMobile) return '400px'
    // Account for header (~80px), input area (~120px), and safe areas
    const availableHeight = viewportHeight > 0 ? viewportHeight : window.innerHeight
    const otherElements = 200 // header + input + padding
    return `${Math.max(150, availableHeight - otherElements - keyboardHeight)}px`
  }

  return (
    <>
      {/* Chat Button - Dark Frosted Glass */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 size-16 rounded-full backdrop-blur-2xl bg-black/80 border-2 border-white/20 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_16px_rgba(255,255,255,0.1)] hover:bg-black/90 hover:border-white/30 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.2)] flex items-center justify-center group touch-manipulation"
            aria-label="Open chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShovelIcon className="size-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Dark Frosted Glass with Mobile Optimization */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop overlay */}
            {isMobile && (
              <motion.div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
            )}

            <motion.div
              ref={chatContainerRef}
              className={cn(
                "fixed z-50 backdrop-blur-2xl bg-black/95 shadow-[0_16px_64px_rgba(0,0,0,0.6),0_0_32px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] border-2 border-white/20 overflow-hidden flex flex-col",
                // Mobile: full width with safe areas, Desktop: positioned bottom-right
                isMobile
                  ? "inset-x-0 bottom-0 rounded-t-3xl rounded-b-none border-b-0 max-h-[100dvh]"
                  : "bottom-6 right-6 w-[420px] max-w-[calc(100vw-48px)] rounded-3xl"
              )}
              style={{
                height: isMobile ? getChatHeight() : 'auto',
                paddingBottom: isMobile ? `env(safe-area-inset-bottom, 0px)` : 0,
              }}
              initial={{ scale: isMobile ? 1 : 0.8, opacity: 0, y: isMobile ? '100%' : 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: isMobile ? 1 : 0.8, opacity: 0, y: isMobile ? '100%' : 20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Mobile drag handle */}
              {isMobile && (
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-10 h-1 rounded-full bg-white/30" />
                </div>
              )}

              {/* Header - Frosted Glass */}
              <div className="relative px-4 sm:px-5 py-4 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                  <div className="size-10 sm:size-12 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                    <ShovelIcon className="size-5 sm:size-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                  </div>
                  <div>
                    <p className="font-sentient text-white font-medium text-sm sm:text-base">Pablo</p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-white/60 uppercase tracking-wider">
                      Excavation Assistant
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="size-9 sm:size-8 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 hover:border-white/30 text-white/70 hover:text-white transition-all duration-200 flex items-center justify-center touch-manipulation"
                  aria-label="Close chat"
                >
                  <X className="size-5 sm:size-4" />
                </button>
              </div>

              {/* Messages Container - Scrollable */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 overscroll-contain"
                style={{
                  height: isMobile ? getMessagesHeight() : '400px',
                  minHeight: '150px',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="size-7 sm:size-8 shrink-0 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center mt-0.5">
                        <ShovelIcon className="size-3.5 sm:size-4 text-white" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-[13px] sm:text-sm leading-relaxed",
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
                          className="space-y-2 [&_a]:text-blue-300 [&_a]:underline"
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="size-7 sm:size-8 shrink-0 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center">
                      <ShovelIcon className="size-3.5 sm:size-4 text-white" />
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

              {/* Input Area - Frosted Glass with keyboard awareness */}
              <div
                className="border-t border-white/10 p-3 sm:p-4 bg-white/5 backdrop-blur-xl shrink-0"
                style={{
                  paddingBottom: isMobile ? `max(12px, env(safe-area-inset-bottom, 12px))` : undefined,
                }}
              >
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleInputFocus}
                    placeholder="Ask about excavation services..."
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 focus:border-white/40 focus:bg-white/[0.15] text-white placeholder:text-white/40 font-mono text-[15px] sm:text-sm resize-none outline-none transition-all duration-200 min-h-[44px] max-h-[100px] touch-manipulation"
                    rows={1}
                    disabled={isTyping}
                    autoComplete="off"
                    autoCorrect="on"
                    autoCapitalize="sentences"
                    enterKeyHint="send"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={cn(
                      "size-11 shrink-0 rounded-xl backdrop-blur-xl transition-all duration-200 flex items-center justify-center touch-manipulation active:scale-95",
                      input.trim() && !isTyping
                        ? "bg-white/20 hover:bg-white/30 active:bg-white/40 border border-white/30 text-white"
                        : "bg-white/10 border border-white/20 text-white/40 cursor-not-allowed",
                    )}
                    aria-label="Send message"
                  >
                    <Send className="size-4" />
                  </button>
                </div>

                {/* Disclaimer - hidden when keyboard is open on mobile */}
                <p className={cn(
                  "mt-2 sm:mt-3 font-mono text-[9px] text-white/40 text-center leading-relaxed transition-opacity duration-200",
                  keyboardHeight > 100 && "opacity-0 h-0 mt-0 overflow-hidden"
                )}>
                  AI-powered assistant. For detailed quotes, contact Paul directly.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
