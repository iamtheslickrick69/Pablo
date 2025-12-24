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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
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
        "fixed z-50 top-0 left-0 w-full transition-all duration-400 ease-out",
        scrolled ? "py-3" : "py-5 md:py-6",
      )}
    >
      <div className="container flex justify-center">
        <header
          className={cn(
            "flex items-center justify-between transition-all duration-400 rounded-xl px-4 md:px-6 relative w-full max-w-4xl",
            scrolled
              ? "bg-black/80 backdrop-blur-xl py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_15px_rgba(220,38,38,0.12),0_8px_24px_rgba(0,0,0,0.4)]"
              : "bg-black/40 backdrop-blur-md py-4 border border-white/10",
          )}
        >
          {/* Logo - Full Size */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/whitelogo.png"
              alt="Bunker Excavation"
              width={280}
              height={105}
              className={cn(
                "transition-all duration-400 group-hover:scale-105 rounded-xl shadow-lg shadow-white/10",
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
                className="uppercase inline-block font-mono text-sm tracking-wider duration-200 transition-all ease-out text-white/60 hover:text-white hover:brightness-110 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
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
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 backdrop-blur-sm text-white gap-2 h-9 px-4 transition-all"
              >
                <MessageSquare className="size-4" />
                <span className="max-xl:hidden text-xs font-medium">TEXT</span>
              </Button>
            </a>

            <a href="tel:8017063783">
              <Button
                variant="ghost"
                size="sm"
                className="bg-primary/20 hover:bg-primary/30 border border-primary/40 hover:border-primary/60 backdrop-blur-sm text-white gap-2 animate-pulse hover:animate-none h-9 px-4 transition-all shadow-lg shadow-primary/20"
              >
                <Phone className="size-4" />
                <span className="max-xl:hidden text-xs font-medium">CALL</span>
              </Button>
            </a>
          </div>

          <MobileMenu />
        </header>
      </div>
    </div>
  )
}
