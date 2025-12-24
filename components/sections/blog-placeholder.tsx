"use client"

import { Pill } from "../pill"
import { ArrowRight } from "lucide-react"

const posts = [
  {
    title: "5 Signs You Need Professional Excavation",
    excerpt: "Learn the key indicators that your project requires expert excavation services.",
    date: "Coming Soon",
  },
  {
    title: "Foundation Types: Which is Right for You?",
    excerpt: "A comprehensive guide to different foundation options and their excavation requirements.",
    date: "Coming Soon",
  },
  {
    title: "Preparing Your Property for Excavation",
    excerpt: "Essential steps to take before the excavation crew arrives at your site.",
    date: "Coming Soon",
  },
]

export function BlogPlaceholder() {
  return (
    <section className="relative py-24 md:py-32 border-y border-white/10">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Pill variant="dark" className="mb-6">
            INSIGHTS
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-foreground">
            Excavation <i className="font-light">Knowledge</i>
          </h2>
          <p className="font-mono text-foreground/60 max-w-2xl mx-auto">
            Expert tips and insights to help you make informed decisions about your excavation projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="group p-6 border border-white/10 bg-white/5 hover:border-white/30 transition-all duration-300 rounded-sm"
            >
              <span className="font-mono text-xs text-white/50 uppercase">{post.date}</span>
              <h3 className="text-xl font-sentient mt-3 mb-2 text-foreground">{post.title}</h3>
              <p className="font-mono text-sm text-foreground/60 mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 font-mono text-sm text-foreground/40 group-hover:text-white transition-colors duration-300">
                Read More <ArrowRight className="size-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
