"use client"

import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { MessageSquare, Phone } from "lucide-react"
import { Button } from "./ui/button"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isLightSection, setIsLightSection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Check if we're past the services section (light sections start)
      const servicesSection = document.getElementById("services")
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect()
        // When the bottom of services section passes the top of viewport + some offset
        setIsLightSection(rect.bottom < 200)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ]

  const smsTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")

  return (
    <div
      className={cn(
        "fixed z-50 top-0 left-0 w-full transition-all duration-500 ease-out",
        scrolled ? "py-3" : "py-5 md:py-6",
      )}
    >
      <div className="container flex justify-center">
        <header
          className={cn(
            "flex items-center justify-between transition-all duration-500 rounded-xl px-4 md:px-6 relative w-full max-w-4xl",
            scrolled && !isLightSection &&
              "bg-black/80 backdrop-blur-xl py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_15px_rgba(220,38,38,0.12),0_8px_24px_rgba(0,0,0,0.4)]",
            scrolled && isLightSection &&
              "bg-white/95 backdrop-blur-xl py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/50",
            !scrolled && !isLightSection &&
              "bg-black/40 backdrop-blur-md py-4 border border-white/10",
            !scrolled && isLightSection &&
              "bg-white/80 backdrop-blur-md py-4 border border-slate-200/50",
          )}
        >
          {/* Logo - Full Size */}
          <Link href="/" className="flex items-center group">
            <Image
              src={isLightSection ? "/logo.png" : "/whitelogo.png"}
              alt="Bunker Excavation"
              width={280}
              height={105}
              className={cn(
                "transition-all duration-500 group-hover:scale-105 rounded-xl",
                !isLightSection && "shadow-lg shadow-white/10",
                isLightSection && "shadow-lg shadow-black/10",
                scrolled ? "h-11" : "h-14",
              )}
              style={{ width: "auto", height: scrolled ? "44px" : "56px" }}
              priority
            />
          </Link>

          {/* Center Navigation */}
          <nav className="flex max-lg:hidden items-center justify-center gap-x-6">
            {navItems.map((item) => (
              <Link
                className={cn(
                  "uppercase inline-block font-mono text-sm tracking-wider duration-200 transition-all ease-out relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  isLightSection
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-white/60 hover:text-white hover:brightness-110"
                )}
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 max-lg:hidden">
            <a href={`sms:8017063783?body=${smsTemplate}`}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 h-9 px-4 transition-all backdrop-blur-sm",
                  isLightSection
                    ? "bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700"
                    : "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white"
                )}
              >
                <MessageSquare className="size-4" />
                <span className="max-xl:hidden text-xs font-medium">TEXT</span>
              </Button>
            </a>

            <a href="tel:8017063783">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 h-9 px-4 transition-all",
                  isLightSection
                    ? "bg-primary hover:bg-primary/90 border border-primary text-white shadow-lg shadow-primary/25"
                    : "bg-primary/20 hover:bg-primary/30 border border-primary/40 hover:border-primary/60 backdrop-blur-sm text-white animate-pulse hover:animate-none shadow-lg shadow-primary/20"
                )}
              >
                <Phone className="size-4" />
                <span className="max-xl:hidden text-xs font-medium">CALL</span>
              </Button>
            </a>
          </div>

          <MobileMenu isLight={isLightSection} />
        </header>
      </div>
    </div>
  )
}
