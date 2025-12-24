import type React from "react"
import { cn } from "@/lib/utils"
import { px } from "./utils"

interface PillProps {
  children: React.ReactNode
  className?: string
  variant?: "dark" | "light"
}

export const Pill = ({ children, className, variant = "dark" }: PillProps) => {
  const polyRoundness = 6
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  const isDark = variant === "dark"

  return (
    <div
      style={
        {
          "--poly-roundness": px(polyRoundness),
        } as React.CSSProperties
      }
      className={cn(
        "transform-gpu font-medium backdrop-blur-xs font-mono text-sm inline-flex items-center justify-center px-3 h-8 [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_var(--poly-roundness),100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,var(--poly-roundness)_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]",
        isDark
          ? "bg-[#262626]/50 text-foreground/50 border border-border"
          : "bg-amber-50 text-amber-700 border border-amber-200",
        className,
      )}
    >
      <span
        style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties}
        className={cn(
          "absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2",
          isDark ? "bg-border" : "bg-amber-200",
        )}
      />
      <span
        style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties}
        className={cn(
          "absolute w-[var(--h)] top-[var(--hh)] right-[var(--hh)] h-[2px] rotate-45 translate-x-1/2",
          isDark ? "bg-border" : "bg-amber-200",
        )}
      />
      <span
        style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties}
        className={cn(
          "absolute w-[var(--h)] bottom-[var(--hh)] left-[var(--hh)] h-[2px] rotate-45 -translate-x-1/2",
          isDark ? "bg-border" : "bg-amber-200",
        )}
      />
      <span
        style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties}
        className={cn(
          "absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] -rotate-45 translate-x-1/2",
          isDark ? "bg-border" : "bg-amber-200",
        )}
      />

      <span
        className={cn(
          "inline-block size-2.5 rounded-full mr-2 shadow-glow",
          isDark ? "bg-primary shadow-primary/50" : "bg-amber-500 shadow-amber-500/50",
        )}
      />

      {children}
    </div>
  )
}
