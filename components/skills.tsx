"use client"

import { useEffect, useRef } from "react"

const skills = [
  {
    name: "HTML",
    description: "Semantic markup & accessibility",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
  },
  {
    name: "CSS",
    description: "Modern layouts & animations",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    description: "ES6+ & DOM manipulation",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    description: "UI/UX design & prototyping",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    description: "Backend & authentication",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    description: "3D graphics & WebGL",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.47.428zm6.032 1.738l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.927-4.47.427zm-4.932 1.202l4.239-.406-3.388 3.266zm6.032 1.738l4.239-.406-3.388 3.266zm.518-.12l1.217 4.927-4.47.428zm-6.032-1.738l-1.262 5.03-2.924-4.618zm6.032 1.738l-1.262 5.03-2.924-4.618zm5.54 1.654l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.927-4.47.427zm-11.073-.706l4.239-.406-3.388 3.266zm6.033 1.738l4.238-.406-3.388 3.266zm5.54 1.654l4.238-.406-3.388 3.266zm.517-.12l1.217 4.927-4.47.428zM9.2 10.47l-1.263 5.03-2.924-4.618zm6.033 1.738l-1.263 5.03-2.924-4.618zm5.54 1.654l-1.263 5.03-2.924-4.618zM3.59 11.257l4.24-.406-3.39 3.266zm6.033 1.738l4.239-.406-3.388 3.266zm5.54 1.654l4.239-.406-3.388 3.266zm-11.073-.706l-1.263 5.03-2.924-4.618zm5.54 1.654l-1.262 5.03-2.924-4.618zm5.541 1.738l-1.263 5.03-2.924-4.618zM3.59 16.06l4.24-.406-3.39 3.265zm5.541 1.738l4.239-.406-3.388 3.266zM3.59 20.864l4.24-.407-3.39 3.266z" />
      </svg>
    ),
  },
]

export default function Skills() {
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
    <section ref={sectionRef} id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="reveal opacity-0 flex items-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.2em] text-primary uppercase">
            Skills
          </span>
        </div>

        {/* Heading */}
        <h2 className="reveal opacity-0 text-3xl md:text-4xl font-semibold text-foreground mb-16 delay-100 text-pretty">
          Technologies I work with
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`reveal opacity-0 group p-6 rounded-xl glass hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              {/* Icon */}
              <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                {skill.icon}
              </div>

              {/* Name */}
              <h3 className="text-lg font-medium text-foreground mb-2">
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
