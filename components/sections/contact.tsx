"use client"

import { Pill } from "../pill"
import { Button } from "../ui/button"
import { Phone, Mail, MapPin, MessageSquare, Calendar, ChevronDown, Send } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How much does excavation cost?",
    answer:
      "Excavation costs vary based on project size, soil conditions, and complexity. Residential projects typically range from $1,500 to $10,000. We provide free on-site estimates for accurate pricing.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most residential excavation projects take 1-3 days. Larger commercial projects may take 1-2 weeks. We'll provide a detailed timeline during your consultation.",
  },
  {
    question: "Do you handle permits?",
    answer:
      "Yes! We assist with all necessary permits and ensure your project complies with local regulations in St. George and Washington County.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve St. George and the entire Washington County area, including Santa Clara, Ivins, Washington, Hurricane, and surrounding communities.",
  },
]

export function Contact() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const smsTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")
  const emailTemplate = encodeURIComponent("Hey Paul, I would like some help with your excavation services.")

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Pill variant="light" className="mb-6">
            GET IN TOUCH
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-slate-900">
            Ready to <i className="font-light">Start?</i>
          </h2>
          <p className="font-mono text-slate-600 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate. We&apos;re ready to dig into your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
            <h3 className="font-sentient text-2xl text-slate-900 mb-6">Send us a message</h3>
            <form className="space-y-5">
              <div>
                <label className="block font-mono text-sm text-slate-600 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-sm text-slate-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block font-mono text-sm text-slate-600 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(801) 555-0123"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-sm text-slate-600 mb-2">Project Details</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your excavation project..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-mono text-sm rounded-xl transition-colors duration-300"
              >
                <Send className="size-4" />
                Send Message
              </button>
            </form>

            {/* Quick Contact */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="font-mono text-sm text-slate-500 text-center mb-4">Or reach us directly</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`sms:8017063783?body=${smsTemplate}`}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    <MessageSquare className="size-4" />
                    Text Us
                  </Button>
                </a>
                <a href="tel:8017063783">
                  <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                    <Phone className="size-4" />
                    Call Us
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Info + FAQ */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:8017063783"
                className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="size-12 rounded-xl bg-amber-100 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300">
                  <Phone className="size-5 text-amber-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="font-mono text-xs text-slate-500 uppercase">Call Us</span>
                  <p className="font-sentient text-slate-900">(801) 706-3783</p>
                </div>
              </a>

              <a
                href={`mailto:paulbunker@gmail.com?subject=Excavation%20Services%20Inquiry&body=${emailTemplate}`}
                className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="size-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-500 flex items-center justify-center transition-colors duration-300">
                  <Mail className="size-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <span className="font-mono text-xs text-slate-500 uppercase">Email Us</span>
                  <p className="font-sentient text-sm text-slate-900">paulbunker@gmail.com</p>
                </div>
              </a>

              <div className="sm:col-span-2 flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-xl">
                <div className="size-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MapPin className="size-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-mono text-xs text-slate-500 uppercase">Service Area</span>
                  <p className="font-sentient text-slate-900">St. George & Washington County, Utah</p>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div>
              <h3 className="font-sentient text-xl text-slate-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={cn(
                      "border rounded-xl overflow-hidden transition-all duration-300",
                      expandedFaq === index
                        ? "border-amber-400 bg-amber-50/50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-sentient text-slate-900">{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          "size-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4",
                          expandedFaq === index && "rotate-180"
                        )}
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                        <p className="font-mono text-sm text-slate-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
