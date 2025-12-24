"use client"

import { Pill } from "../pill"

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Free on-site assessment to understand your project requirements, timeline, and budget.",
  },
  {
    number: "02",
    title: "Planning",
    description: "Detailed project plan including equipment needs, permits, and scheduling coordination.",
  },
  {
    number: "03",
    title: "Execution",
    description: "Professional excavation work with real-time communication and quality checkpoints.",
  },
  {
    number: "04",
    title: "Completion",
    description: "Final inspection, site cleanup, and walkthrough to ensure complete satisfaction.",
  },
]

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 border-y border-white/10">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Pill variant="dark" className="mb-6">
            OUR PROCESS
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-foreground">
            How We <i className="font-light">Work</i>
          </h2>
          <p className="font-mono text-foreground/60 max-w-2xl mx-auto">
            A streamlined process designed to keep your project on track and stress-free from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="p-6 border border-white/10 bg-white/5 h-full rounded-sm">
                <span className="text-5xl font-sentient text-white/20 group-hover:text-white/40 transition-colors duration-300">
                  {step.number}
                </span>
                <h3 className="text-xl font-sentient mt-4 mb-2 text-foreground">{step.title}</h3>
                <p className="font-mono text-sm text-foreground/60">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
