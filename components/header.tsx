"use client"

import Link from "next/link"
import Image from "next/image"
import { MobileMenu } from "./mobile-menu"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

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

  return (
    <div
      className={cn(
        "fixed z-50 top-0 left-0 w-full transition-all duration-300 ease-out",
        scrolled ? "py-3" : "py-6 md:py-8",
      )}
    >
      <div className="container">
        <header
          className={cn(
            "flex items-center justify-between transition-all duration-300 rounded-full px-4 md:px-6",
            scrolled ? "bg-black/60 backdrop-blur-xl border border-white/10 py-2" : "bg-transparent py-0",
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/whitelogo.png"
              alt="Bunker Excavation"
              width={scrolled ? 120 : 140}
              height={scrolled ? 40 : 48}
              className="transition-all duration-300"
            />
          </Link>
          <nav className="flex max-lg:hidden items-center justify-center gap-x-8">
            {navItems.map((item) => (
              <Link
                className="uppercase inline-block font-mono text-sm duration-150 transition-colors ease-out text-white/60 hover:text-white"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <Link
            className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-sm text-white hover:text-white/80"
            href="tel:8017063783"
          >
            (801) 706-3783
          </Link>
          <MobileMenu />
        </header>
      </div>
    </div>
  )
}
