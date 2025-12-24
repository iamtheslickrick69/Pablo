"use client"

import { Shovel, Clock, Shield, Award } from "lucide-react"

const stats = [
  { icon: Shovel, value: "500+", label: "Projects Completed" },
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Shield, value: "100%", label: "Licensed & Insured" },
  { icon: Award, value: "5-Star", label: "Customer Rating" },
]

export function TrustBar() {
  return (
    <section className="relative py-16 border-y border-white/10 bg-transparent">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <stat.icon className="size-8 text-red-500 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-3xl md:text-4xl font-sentient text-foreground mb-1">{stat.value}</span>
              <span className="text-sm font-mono text-foreground/50 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
