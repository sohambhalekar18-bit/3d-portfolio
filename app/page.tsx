"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import LoadingScreen from "@/components/loading-screen"

// Dynamically import Three.js scene to avoid SSR issues
const Scene3D = dynamic(() => import("@/components/scene-3d"), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
