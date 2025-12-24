"use client"

import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black text-white border-t border-white/10">
      {/* Logo */}
      <div className="container py-12">
        <div className="text-center">
          <Image
            src="/whitelogo.png"
            alt="Bunker Excavation"
            width={180}
            height={68}
            className="mx-auto mb-8 opacity-90"
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="border-t border-white/10">
        <div className="container py-8">
          <p className="text-center font-sentient text-xl md:text-2xl text-white/80 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Your Excavator Neighbor
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <p className="font-mono text-xs text-white/50">
              &copy; {currentYear} Bunker Excavation
            </p>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
              <span className="font-mono text-xs text-white/50">Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
