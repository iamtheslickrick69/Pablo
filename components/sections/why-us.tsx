"use client"

import { Pill } from "../pill"
import { CheckCircle } from "lucide-react"

const reasons = [
  {
    title: "Experienced Team",
    description:
      "Over 15 years of excavation expertise with a skilled crew that understands the complexities of every job.",
  },
  {
    title: "Modern Equipment",
    description: "Well-maintained fleet of excavators, loaders, and specialized equipment for projects of any scale.",
  },
  {
    title: "On-Time Delivery",
    description: "We respect your timeline. Our efficient processes ensure projects are completed on schedule.",
  },
  {
    title: "Competitive Pricing",
    description: "Transparent quotes with no hidden fees. Quality excavation services at fair market rates.",
  },
  {
    title: "Safety First",
    description: "Strict adherence to safety protocols protecting our team, your property, and the environment.",
  },
  {
    title: "Local Expertise",
    description: "Deep knowledge of local soil conditions, regulations, and permitting requirements.",
  },
]

export function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 border-y border-white/10">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Pill variant="dark" className="mb-6">
              WHY CHOOSE US
            </Pill>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-6 text-foreground">
              The Bunker <i className="font-light">Difference</i>
            </h2>
            <p className="font-mono text-foreground/60 mb-8">
              When you choose Bunker Excavation, you&apos;re partnering with a team that treats every project like
              it&apos;s their own. We combine old-school craftsmanship with modern efficiency.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-5xl md:text-6xl font-sentient text-white">500+</span>
              <span className="font-mono text-foreground/50 uppercase text-sm">
                Satisfied
                <br />
                Customers
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex gap-3 p-4 border border-white/10 bg-white/5 rounded-sm">
                <CheckCircle className="size-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sentient text-lg mb-1 text-foreground">{reason.title}</h3>
                  <p className="font-mono text-xs text-foreground/50">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
