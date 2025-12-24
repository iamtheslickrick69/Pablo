"use client"

import { Pill } from "../pill"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"

const posts = [
  {
    title: "5 Signs You Need Professional Excavation",
    excerpt: "Learn the key indicators that your project requires expert excavation services for optimal results.",
    date: "Dec 2024",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&h=400&fit=crop",
    readTime: "5 min read",
  },
  {
    title: "Foundation Types: Which is Right for You?",
    excerpt: "A comprehensive guide to different foundation options and their specific excavation requirements.",
    date: "Dec 2024",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    readTime: "8 min read",
  },
  {
    title: "Preparing Your Property for Excavation",
    excerpt: "Essential steps every homeowner should take before the excavation crew arrives at your site.",
    date: "Nov 2024",
    category: "Preparation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    readTime: "4 min read",
  },
]

const categories = ["All", "Tips", "Guide", "Preparation", "Safety"]

export function BlogPlaceholder() {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <Pill variant="light" className="mb-6">
            INSIGHTS
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 text-slate-900">
            Excavation <i className="font-light">Knowledge</i>
          </h2>
          <p className="font-mono text-slate-600 max-w-2xl mx-auto">
            Expert tips and insights to help you make informed decisions about your excavation projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                index === 0
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full font-mono text-xs text-slate-700 font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                    <Calendar className="size-3" />
                    {post.date}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-sentient mb-2 text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-mono text-sm text-slate-500 mb-4 line-clamp-2">{post.excerpt}</p>

                <button className="inline-flex items-center gap-2 font-mono text-sm text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
                  Read Article
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono text-sm rounded-xl transition-colors duration-300">
            View All Articles
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
