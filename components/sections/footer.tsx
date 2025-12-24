"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/whitelogo.png"
              alt="Bunker Excavation"
              width={120}
              height={48}
              className="mb-4"
            />
            <p className="font-mono text-sm text-white/60 mb-6">
              Professional excavation services in St. George and Washington County, Utah. Over 15 years of trusted expertise.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="size-5 text-white" />
              </a>
              <a
                href="#"
                className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="size-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sentient text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#services" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Site Preparation
                </Link>
              </li>
              <li>
                <Link href="#services" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Foundation Excavation
                </Link>
              </li>
              <li>
                <Link href="#services" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Utility Trenching
                </Link>
              </li>
              <li>
                <Link href="#services" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Demolition
                </Link>
              </li>
              <li>
                <Link href="#services" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Drainage Solutions
                </Link>
              </li>
              <li>
                <Link href="#services" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Grading & Backfill
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sentient text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#process" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="#contact" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" className="font-mono text-sm text-white/60 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sentient text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:8017063783" className="flex items-center gap-3 group">
                  <div className="size-10 rounded-lg bg-white/10 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300">
                    <Phone className="size-4 text-white" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/40 uppercase block">Phone</span>
                    <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">(801) 706-3783</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:paulbunker@gmail.com" className="flex items-center gap-3 group">
                  <div className="size-10 rounded-lg bg-white/10 group-hover:bg-amber-500 flex items-center justify-center transition-colors duration-300">
                    <Mail className="size-4 text-white" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/40 uppercase block">Email</span>
                    <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">paulbunker@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <MapPin className="size-4 text-white" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white/40 uppercase block">Location</span>
                    <span className="font-mono text-sm text-white/80">St. George, Utah</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-white/40">
              &copy; {currentYear} Bunker Excavation. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-white/40">Licensed & Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
