"use client"

import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { ServicesShowcase } from "@/components/sections/services-showcase"
import { WhyUs } from "@/components/sections/why-us"
import { About } from "@/components/sections/about"
import { Process } from "@/components/sections/process"
import { AIFeature } from "@/components/sections/ai-feature"
import { BlogPlaceholder } from "@/components/sections/blog-placeholder"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { ChatWidget } from "@/components/chat-widget"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesShowcase />
      <WhyUs />
      <About />
      <Process />
      <AIFeature />
      <BlogPlaceholder />
      <Contact />
      <Footer />
      <ChatWidget />
      <Leva hidden />
    </>
  )
}
