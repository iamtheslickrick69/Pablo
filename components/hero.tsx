"use client"

import Image from "next/image"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"
import { MessageSquare, Mail, Calendar } from "lucide-react"

export function Hero() {
  const [hovering, setHovering] = useState(false)

  const smsTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")
  const emailTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")

  return (
    <div className="flex flex-col min-h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 pt-32 mt-auto text-center relative">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Bunker Excavation"
            width={280}
            height={112}
            className="w-[200px] md:w-[280px]"
            priority
          />
        </div>

        <Pill className="mb-6">PROFESSIONAL EXCAVATION</Pill>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sentient text-balance max-w-4xl mx-auto px-4">
          Precision Excavation <br />
          <i className="font-light">Built to Last</i>
        </h1>

        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[540px] mx-auto px-4">
          Expert excavation services for residential and commercial projects. Quality craftsmanship, reliable timelines,
          competitive pricing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 px-4">
          <a href={`sms:8017063783?body=${smsTemplate}`} className="contents">
            <Button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              <MessageSquare className="size-5" />
              Text Us
            </Button>
          </a>

          <a
            href={`mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=${emailTemplate}`}
            className="contents"
          >
            <Button variant="default" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              <Mail className="size-5" />
              Email Us
            </Button>
          </a>

          <a href="#contact" className="contents">
            <Button variant="default" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              <Calendar className="size-5" />
              Schedule
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
