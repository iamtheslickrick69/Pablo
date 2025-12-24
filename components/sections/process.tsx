"use client"

import { Pill } from "../pill"
import { useState } from "react"
import { ChevronDown, Phone, ClipboardList, HardHat, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Free on-site assessment to understand your project requirements, timeline, and budget.",
    details: [
      "In-person site visit at your convenience",
      "Soil and terrain analysis",
      "Detailed scope discussion",
      "Preliminary cost estimate",
    ],
    icon: Phone,
  },
  {
    number: "02",
    title: "Planning",
    description: "Detailed project plan including equipment needs, permits, and scheduling coordination.",
    details: [
      "Permit acquisition assistance",
      "Equipment and crew allocation",
      "Timeline development",
      "Utility location coordination",
    ],
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Execution",
    description: "Professional excavation work with real-time communication and quality checkpoints.",
    details: [
      "Daily progress updates",
      "Quality control inspections",
      "Safety protocol adherence",
      "Debris management and hauling",
    ],
    icon: HardHat,
  },
  {
    number: "04",
    title: "Completion",
    description: "Final inspection, site cleanup, and walkthrough to ensure complete satisfaction.",
    details: [
      "Final grade verification",
      "Complete site cleanup",
      "Client walkthrough",
      "Documentation and sign-off",
    ],
    icon: CheckCircle2,
  },
]

export function Process() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <section id="process" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Pill variant="light" className="mb-6">
            OUR PROCESS
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-slate-900">
            How We <i className="font-light">Work</i>
          </h2>
          <p className="font-mono text-slate-600 max-w-2xl mx-auto">
            A streamlined process designed to keep your project on track and stress-free from start to finish.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Progress Line */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-slate-200 rounded-full">
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Circle */}
                <div className="relative z-10 mx-auto w-fit mb-6">
                  <div className="size-[120px] rounded-full bg-white border-4 border-slate-200 group-hover:border-amber-400 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                    <step.icon className="size-10 text-slate-400 group-hover:text-amber-500 transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 size-8 rounded-full bg-slate-900 text-white font-mono text-sm flex items-center justify-center font-medium">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-sentient mb-2 text-slate-900">{step.title}</h3>
                  <p className="font-mono text-sm text-slate-500 mb-4">{step.description}</p>

                  {/* Details */}
                  <ul className="space-y-2 text-left">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 font-mono text-xs text-slate-500">
                        <CheckCircle2 className="size-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Accordion Style */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "border rounded-xl overflow-hidden transition-all duration-300",
                expandedStep === index
                  ? "border-amber-400 shadow-lg bg-white"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300"
              )}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div
                  className={cn(
                    "size-12 rounded-full flex items-center justify-center transition-colors duration-300",
                    expandedStep === index ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-600"
                  )}
                >
                  <step.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-amber-600 font-medium">{step.number}</span>
                    <h3 className="font-sentient text-lg text-slate-900">{step.title}</h3>
                  </div>
                  <p className="font-mono text-sm text-slate-500 line-clamp-1">{step.description}</p>
                </div>
                <ChevronDown
                  className={cn(
                    "size-5 text-slate-400 transition-transform duration-300",
                    expandedStep === index && "rotate-180"
                  )}
                />
              </button>

              {expandedStep === index && (
                <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-2 duration-300">
                  <div className="pl-16">
                    <p className="font-mono text-sm text-slate-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 font-mono text-sm text-slate-500">
                          <CheckCircle2 className="size-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
