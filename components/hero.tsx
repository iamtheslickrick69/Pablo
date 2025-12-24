"use client"

import Image from "next/image"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"
import { MessageSquare, Mail, Calendar, MapPin } from "lucide-react"

export function Hero() {
  const [hovering, setHovering] = useState(false)

  const smsTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")
  const emailTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")

  return (
    <div className="flex flex-col min-h-svh justify-center">
      <GL hovering={hovering} />

      <div className="container relative">
        {/* Mobile: Centered Stack | Desktop: Split Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 px-4">

          {/* LEFT SIDE - Content (60%) */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left space-y-8">
            <div>
              <Pill className="mb-6">PROFESSIONAL EXCAVATION</Pill>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sentient text-balance">
                Precision Excavation <br />
                <i className="font-light">Built to Last</i>
              </h1>
            </div>

            <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance max-w-[540px] lg:max-w-none">
              Expert excavation services for residential and commercial projects. Quality craftsmanship, reliable timelines,
              competitive pricing.
            </p>

            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 rounded-full backdrop-blur-sm">
              <MapPin className="size-4 text-primary" />
              <span className="font-mono text-sm text-foreground/80">St. George & Washington County</span>
            </div>
          </div>

          {/* RIGHT SIDE - Brand & CTAs (40%) */}
          <div className="flex flex-col items-center lg:items-end gap-8 lg:max-w-[40%]">
            {/* Large Logo */}
            <Image
              src="/whitelogo.png"
              alt="Bunker Excavation"
              width={360}
              height={135}
              className="w-[280px] md:w-[360px] rounded-xl"
              priority
            />

            {/* Stacked CTA Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-[280px]">
              <a href={`sms:8017063783?body=${smsTemplate}`} className="w-full">
                <Button
                  className="w-full justify-start"
                  size="lg"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <MessageSquare className="size-5" />
                  Text Us
                </Button>
              </a>

              <a
                href={`mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=${emailTemplate}`}
                className="w-full"
              >
                <Button
                  variant="default"
                  className="w-full justify-start"
                  size="lg"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <Mail className="size-5" />
                  Email Us
                </Button>
              </a>

              <a href="#contact" className="w-full">
                <Button
                  variant="default"
                  className="w-full justify-start"
                  size="lg"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <Calendar className="size-5" />
                  Schedule
                </Button>
              </a>
            </div>

            {/* Phone Number */}
            <a
              href="tel:8017063783"
              className="font-mono text-lg text-foreground hover:text-primary transition-colors duration-200"
            >
              (801) 706-3783
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
