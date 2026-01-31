"use client"

import { useEffect, useRef } from "react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up")
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <div className="reveal opacity-0 flex items-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.2em] text-primary uppercase">
            About
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="reveal opacity-0 text-3xl md:text-4xl font-semibold text-foreground mb-8 leading-tight delay-100 text-pretty">
          Crafting interfaces that blend thoughtful design with robust engineering.
        </h2>

        {/* Description */}
        <div className="reveal opacity-0 space-y-6 text-muted-foreground leading-relaxed delay-200">
          <p className="text-lg">
            I&apos;m a Computer Engineering student passionate about creating digital experiences 
            that not only look great but are meticulously built for performance and usability.
          </p>
          <p>
            My work lies at the intersection of design and development — I believe understanding 
            the technical foundations leads to more thoughtful designs. From concept to code, 
            I focus on every detail to ensure seamless user experiences.
          </p>
          <p>
            Currently exploring modern web technologies, 3D graphics, and AI-powered applications. 
            Always eager to learn, build, and collaborate on projects that make an impact.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal opacity-0 grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border delay-300">
          {[
            { value: "3+", label: "Projects Completed" },
            { value: "UI/UX", label: "Design Focus" },
            { value: "React", label: "Primary Stack" },
            { value: "2025", label: "Graduating" },
          ].map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-semibold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
