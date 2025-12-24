"use client"

import { useEffect, useRef, useState } from "react"

const videos = [
  "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvid.mp4",
  "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahwarner.mp4",
  "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/utahvidmoody.mp4",
]

export function VideoShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentVideoRef = useRef<HTMLVideoElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const currentVideo = currentVideoRef.current
    if (!currentVideo) return

    const handleTimeUpdate = () => {
      if (currentVideo.duration - currentVideo.currentTime <= 1 && !isTransitioning) {
        setIsTransitioning(true)
        if (nextVideoRef.current) {
          nextVideoRef.current.play()
        }
      }
    }

    const handleEnded = () => {
      setCurrentIndex(nextIndex)
      setNextIndex((nextIndex + 1) % videos.length)
      setIsTransitioning(false)
    }

    currentVideo.addEventListener("timeupdate", handleTimeUpdate)
    currentVideo.addEventListener("ended", handleEnded)

    return () => {
      currentVideo.removeEventListener("timeupdate", handleTimeUpdate)
      currentVideo.removeEventListener("ended", handleEnded)
    }
  }, [currentIndex, nextIndex, isTransitioning])

  return (
    <section className="relative py-16 md:py-24 bg-transparent">
      <div className="w-full px-0">
        {/* 3D Floating Card Container */}
        <div className="relative w-full" style={{ perspective: "1000px" }}>
          <div className="absolute inset-0 -m-4 bg-white/5 blur-3xl opacity-50" />

          <div
            className="relative overflow-hidden shadow-2xl shadow-black/50 bg-white/5 backdrop-blur-sm border-y border-white/20"
            style={{
              transform: "rotateX(2deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 border border-white/10 pointer-events-none z-10" />

            {/* Glassmorphism edge highlight */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10"
              style={{ height: "1px" }}
            />

            {/* Video container */}
            <div className="relative h-[50vh] overflow-hidden bg-black">
              {/* Current video */}
              <video
                ref={currentVideoRef}
                key={`current-${currentIndex}`}
                src={videos[currentIndex]}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                autoPlay
                muted
                playsInline
              />

              {/* Next video (for crossfade) */}
              <video
                ref={nextVideoRef}
                key={`next-${nextIndex}`}
                src={videos[nextIndex]}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  isTransitioning ? "opacity-100" : "opacity-0"
                }`}
                muted
                playsInline
                preload="auto"
              />

              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none" />
            </div>

            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <div
            className="absolute -bottom-8 left-0 right-0 h-16 bg-white/5 blur-2xl"
            style={{ transform: "rotateX(80deg)" }}
          />
        </div>
      </div>
    </section>
  )
}
