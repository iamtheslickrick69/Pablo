"use client"

import { Pill } from "../pill"
import { Shovel, Home, Building2, Mountain, Droplets, TreePine } from "lucide-react"

const services = [
  {
    icon: Shovel,
    title: "Foundation Excavation",
    description:
      "Precise foundation digging for residential and commercial structures with exact depth and grade specifications.",
  },
  {
    icon: Home,
    title: "Basement Excavation",
    description:
      "Expert basement and cellar excavation with proper drainage planning and structural support preparation.",
  },
  {
    icon: Building2,
    title: "Commercial Site Work",
    description: "Large-scale site preparation for commercial developments, parking lots, and industrial facilities.",
  },
  {
    icon: Mountain,
    title: "Land Grading",
    description:
      "Professional land leveling and grading services to ensure proper drainage and stable building surfaces.",
  },
  {
    icon: Droplets,
    title: "Utility Trenching",
    description: "Accurate trenching for water lines, sewer connections, electrical conduits, and drainage systems.",
  },
  {
    icon: TreePine,
    title: "Land Clearing",
    description:
      "Complete lot clearing including tree removal, stump grinding, and debris hauling for new construction.",
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Pill variant="dark" className="mb-6">
            OUR SERVICES
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-foreground">
            Professional <i className="font-light">Excavation</i> Services
          </h2>
          <p className="font-mono text-foreground/60 max-w-2xl mx-auto">
            From residential foundations to commercial site work, we deliver quality excavation solutions tailored to
            your project needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all duration-300 rounded-sm"
            >
              <service.icon className="size-10 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-sentient mb-2 text-foreground">{service.title}</h3>
              <p className="font-mono text-sm text-foreground/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
