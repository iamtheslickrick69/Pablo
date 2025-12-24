"use client"

import { Pill } from "../pill"
import { Button } from "../ui/button"
import { Phone, Mail, MapPin, MessageSquare, Calendar } from "lucide-react"

export function Contact() {
  const smsTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")
  const emailTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Pill variant="dark" className="mb-6">
            GET IN TOUCH
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-foreground">
            Ready to <i className="font-light">Start?</i>
          </h2>
          <p className="font-mono text-foreground/60 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate. We&apos;re ready to dig into your next project.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <a
              href="tel:8017063783"
              className="flex flex-col items-center p-6 border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group rounded-sm"
            >
              <Phone className="size-8 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-mono text-sm text-foreground/50 uppercase mb-1">Call Us</span>
              <span className="font-sentient text-foreground">(801) 706-3783</span>
            </a>

            <a
              href={`mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=${emailTemplate}`}
              className="flex flex-col items-center p-6 border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group rounded-sm"
            >
              <Mail className="size-8 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-mono text-sm text-foreground/50 uppercase mb-1">Email Us</span>
              <span className="font-sentient text-sm text-foreground">paulbunker@gmail.com</span>
            </a>

            <div className="flex flex-col items-center p-6 border border-white/10 bg-white/5 rounded-sm">
              <MapPin className="size-8 text-white mb-3" />
              <span className="font-mono text-sm text-foreground/50 uppercase mb-1">Service Area</span>
              <span className="font-sentient text-foreground text-center">St. George & Washington County</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`sms:8017063783?body=${smsTemplate}`} className="contents">
              <Button>
                <MessageSquare className="size-5" />
                Text Us Now
              </Button>
            </a>

            <a
              href={`mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=${emailTemplate}`}
              className="contents"
            >
              <Button>
                <Mail className="size-5" />
                Email Us
              </Button>
            </a>

            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="contents">
              <Button>
                <Calendar className="size-5" />
                Schedule Call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
