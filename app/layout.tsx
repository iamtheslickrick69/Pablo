import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { StructuredData } from "@/components/structured-data"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bunker Excavation | Professional Excavation Services",
  description:
    "Expert excavation services for residential and commercial projects. Bunker Excavation delivers precision, reliability, and quality craftsmanship.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bunkerexcavation.com',
    siteName: 'Bunker Excavation',
    title: 'Bunker Excavation | St. George, Utah',
    description: 'Professional excavation services for residential and commercial projects in St. George and Washington County.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 800,
        alt: 'Bunker Excavation - Professional Excavation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bunker Excavation | St. George, Utah',
    description: 'Professional excavation services for residential and commercial projects.',
    images: ['/logo.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Bunker Excavation',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
        <StructuredData />
        <Header />
        {children}
        <AIChatWidget />
      </body>
    </html>
  )
}
