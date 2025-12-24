"use client"

import { Hero } from "@/components/hero"
import { ServicesShowcase } from "@/components/sections/services-showcase"
import { About } from "@/components/sections/about"
import { WhyUs } from "@/components/sections/why-us"
import { Process } from "@/components/sections/process"
import { AIFeature } from "@/components/sections/ai-feature"
import { BlogPlaceholder } from "@/components/sections/blog-placeholder"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesShowcase />
      <WhyUs />
      <Process />
      <AIFeature />
      <BlogPlaceholder />
      <Contact />
      <Footer />
      <AIChatWidget />
      <Leva hidden />
    </>
  )
}
