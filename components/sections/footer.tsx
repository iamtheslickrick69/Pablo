"use client"

import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Bunker Excavation" width={100} height={40} style={{ mixBlendMode: "screen" }} />
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="#services"
              className="font-mono text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="font-mono text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#process"
              className="font-mono text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              Process
            </Link>
            <Link
              href="#contact"
              className="font-mono text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          <p className="font-mono text-xs text-foreground/40">
            &copy; {currentYear} Bunker Excavation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
