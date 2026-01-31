"use client"

import { useEffect, useRef } from "react"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "AI Trip Planner",
    description:
      "An intelligent travel planning application that uses AI to generate personalized itineraries based on user preferences, budget, and travel dates.",
    tech: ["React", "Firebase", "OpenAI API", "Tailwind CSS"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Smart Resume Builder",
    description:
      "A modern resume builder with AI-powered suggestions, multiple templates, and real-time preview. Export to PDF with one click.",
    tech: ["Next.js", "TypeScript", "Prisma", "GPT-4"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "3D Portfolio Website",
    description:
      "This portfolio itself — featuring subtle 3D graphics, smooth animations, and a clean, professional design built with Three.js and GSAP.",
    tech: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    github: "#",
    live: "#",
    featured: true,
  },
]

export default function Projects() {
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
    <section ref={sectionRef} id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="reveal opacity-0 flex items-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.2em] text-primary uppercase">
            Projects
          </span>
        </div>

        {/* Heading */}
        <h2 className="reveal opacity-0 text-3xl md:text-4xl font-semibold text-foreground mb-6 delay-100 text-pretty">
          Selected work
        </h2>

        {/* Subheading */}
        <p className="reveal opacity-0 text-muted-foreground max-w-2xl mb-16 delay-200">
          A collection of projects that showcase my skills in UI/UX design,
          frontend development, and modern web technologies.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`reveal opacity-0 group relative p-8 rounded-2xl glass hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Featured
                </div>
              )}

              {/* Content */}
              <div className={index === 0 ? "lg:max-w-2xl" : ""}>
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs text-muted-foreground bg-secondary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
