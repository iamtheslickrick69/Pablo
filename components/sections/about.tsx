"use client"

import { Pill } from "../pill"

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Pill variant="dark" className="mb-6">
            ABOUT US
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-8 text-foreground">
            Meet <i className="font-light">Paul Bunker</i>
          </h2>

          <div className="space-y-6 font-mono text-foreground/60 text-left md:text-center">
            <p>
              With over 15 years in the excavation industry, Paul Bunker founded Bunker Excavation with a simple
              mission: deliver exceptional quality and honest service to every customer.
            </p>
            <p>
              Starting with a single excavator and a dedication to hard work, Paul built the company from the ground
              up—literally. Today, Bunker Excavation serves residential and commercial clients throughout the region,
              maintaining the same commitment to craftsmanship that defined our first project.
            </p>
            <p>
              &quot;Every dig tells a story. Whether it&apos;s a family&apos;s dream home foundation or a commercial
              development that will serve the community, we approach each job with the same level of care and
              precision.&quot;
            </p>
            <p className="text-white font-sentient text-lg">— Paul Bunker, Founder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
