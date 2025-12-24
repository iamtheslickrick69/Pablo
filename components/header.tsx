"use client"

import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Phone } from "lucide-react"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed z-50 top-0 left-0 w-full transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/whitelogo.png"
              alt="Bunker Excavation"
              width={280}
              height={105}
              className="transition-all duration-300 group-hover:scale-105 rounded-xl"
              style={{ width: "auto", height: scrolled ? "40px" : "48px" }}
              priority
            />
          </Link>

          {/* Center Navigation */}
          <nav className="flex max-lg:hidden items-center justify-center gap-x-8">
            {navItems.map((item) => (
              <Link
                className="uppercase font-mono text-xs tracking-widest text-white/70 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center max-lg:hidden">
            <a
              href="tel:8017063783"
              className="group flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-red-500/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(239,68,68,0.2)]"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)' }}
            >
              <Phone className="size-4 text-white" strokeWidth={2} />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Call Now
              </span>
            </a>
          </div>

          <MobileMenu isLight={false} />
        </div>
      </div>
    </header>
  )
}
