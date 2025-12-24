import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AIChatWidget } from "@/components/ai-chat-widget"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bunker Excavation | Professional Excavation Services",
  description:
    "Expert excavation services for residential and commercial projects. Bunker Excavation delivers precision, reliability, and quality craftsmanship.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Header />
        {children}
        <AIChatWidget />
      </body>
    </html>
  )
}
