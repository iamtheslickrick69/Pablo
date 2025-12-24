"use client"

import { Pill } from "../pill"
import Image from "next/image"

const timeline = [
  { year: "2009", event: "Founded Bunker Excavation with one excavator" },
  { year: "2014", event: "Expanded fleet to 10+ pieces of equipment" },
  { year: "2018", event: "Completed 500th residential project" },
  { year: "2023", event: "Awarded Best Excavation Company in Washington County" },
]

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-white">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Founder Image & Quote */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face"
                alt="Paul Bunker - Founder"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="font-mono text-sm text-white/90 italic mb-2">
                  &quot;Every dig tells a story. Whether it&apos;s a family&apos;s dream home foundation or a commercial
                  development that will serve the community, we approach each job with the same level of care and
                  precision.&quot;
                </blockquote>
                <p className="font-sentient text-white text-lg">— Paul Bunker, Founder</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-900/10 rounded-full blur-2xl" />
          </div>

          {/* Right: Content */}
          <div>
            <Pill variant="light" className="mb-6">
              ABOUT US
            </Pill>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-6 text-slate-900">
              Meet <i className="font-light">Paul Bunker</i>
            </h2>

            <div className="space-y-4 font-mono text-slate-600 mb-10">
              <p>
                With over 15 years in the excavation industry, Paul Bunker founded Bunker Excavation with a simple
                mission: deliver exceptional quality and honest service to every customer.
              </p>
              <p>
                Starting with a single excavator and a dedication to hard work, Paul built the company from the ground
                up—literally. Today, Bunker Excavation serves residential and commercial clients throughout
                Washington County, maintaining the same commitment to craftsmanship that defined our first project.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <h3 className="font-sentient text-lg text-slate-900 mb-6">Our Journey</h3>
              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex gap-4 pb-6 last:pb-0 group">
                    {/* Line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[11px] top-6 w-0.5 h-full bg-slate-200 group-hover:bg-amber-400 transition-colors duration-300" />
                    )}

                    {/* Dot */}
                    <div className="relative z-10 shrink-0 size-6 rounded-full bg-slate-200 group-hover:bg-amber-400 border-4 border-white shadow-sm transition-colors duration-300" />

                    {/* Content */}
                    <div className="pt-0.5">
                      <span className="font-sentient text-amber-600 font-medium">{item.year}</span>
                      <p className="font-mono text-sm text-slate-600">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
