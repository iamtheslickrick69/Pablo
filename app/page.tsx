"use client"

import { Hero } from "@/components/hero"
import { ServicesShowcase } from "@/components/sections/services-showcase"
import { About } from "@/components/sections/about"
import { WhyUs } from "@/components/sections/why-us"
import { Process } from "@/components/sections/process"
import { AIFeature } from "@/components/sections/ai-feature"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <ServicesShowcase />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <WhyUs />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Process />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <AIFeature />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Contact />
      </ScrollReveal>

      <Footer />
      <Leva hidden />
    </>
  )
}
