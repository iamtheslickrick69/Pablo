"use client"

import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"

export function Contact() {
  const smsTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")
  const emailTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <span className="size-1.5 rounded-full bg-white" />
            <span className="font-mono text-[10px] text-white uppercase tracking-widest font-medium">
              Get In Touch
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-sentient mb-5 text-white font-light drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
            Ready to <span className="font-normal">Start?</span>
          </h2>

          <p className="font-mono text-sm text-white/70 max-w-xl mx-auto leading-relaxed mb-3">
            Contact us today for a free consultation and estimate.
          </p>

          {/* Chatbot CTA */}
          <p className="font-mono text-sm text-white/60 max-w-xl mx-auto flex items-center justify-center gap-2">
            <MessageSquare className="size-4" />
            Have questions? Chat with Pablo (bottom right)
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Phone */}
          <a
            href="tel:8017063783"
            className="group relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl p-8 text-center hover:bg-white/[0.15] transition-all duration-300"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative z-10">
              <div className="size-16 mx-auto mb-6 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                <Phone className="size-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
              </div>
              <span className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-2">Call Us</span>
              <p className="font-sentient text-xl text-white">(801) 706-3783</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=${emailTemplate}`}
            className="group relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl p-8 text-center hover:bg-white/[0.15] transition-all duration-300"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative z-10">
              <div className="size-16 mx-auto mb-6 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                <Mail className="size-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
              </div>
              <span className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-2">Email Us</span>
              <p className="font-sentient text-base text-white">paulbunker@gmail.com</p>
            </div>
          </a>

          {/* Text */}
          <a
            href={`sms:8017063783?body=${smsTemplate}`}
            className="group relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl p-8 text-center hover:bg-white/[0.15] transition-all duration-300"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative z-10">
              <div className="size-16 mx-auto mb-6 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                <MessageSquare className="size-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
              </div>
              <span className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-2">Text Us</span>
              <p className="font-sentient text-xl text-white">(801) 706-3783</p>
            </div>
          </a>
        </div>

        {/* Service Area Badge */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
            <MapPin className="size-5 text-white/70" strokeWidth={1.5} />
            <div className="text-left">
              <span className="block font-mono text-[10px] text-white/50 uppercase tracking-wider mb-1">Service Area</span>
              <p className="font-sentient text-white/90">St. George & Washington County, Utah</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
