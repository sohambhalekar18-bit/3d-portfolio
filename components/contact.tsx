"use client"

import { useEffect, useRef } from "react"
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react"

const socialLinks = [
  {
    name: "Email",
    href: "mailto:soham.bhalekar@email.com",
    icon: <Mail size={20} />,
    label: "soham.bhalekar@email.com",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sohambhalekar",
    icon: <Linkedin size={20} />,
    label: "linkedin.com/in/sohambhalekar",
  },
  {
    name: "GitHub",
    href: "https://github.com/sohambhalekar",
    icon: <Github size={20} />,
    label: "github.com/sohambhalekar",
  },
]

export default function Contact() {
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
    <section ref={sectionRef} id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <div className="reveal opacity-0 flex items-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-primary" />
          <span className="text-sm tracking-[0.2em] text-primary uppercase">
            Contact
          </span>
        </div>

        {/* Heading */}
        <h2 className="reveal opacity-0 text-3xl md:text-5xl font-semibold text-foreground mb-6 delay-100 text-pretty">
          Let&apos;s work together
        </h2>

        {/* Description */}
        <p className="reveal opacity-0 text-lg text-muted-foreground max-w-2xl mb-12 delay-200">
          I&apos;m currently looking for internship opportunities. If you have a
          project in mind or just want to chat, feel free to reach out.
        </p>

        {/* Contact Links */}
        <div className="reveal opacity-0 space-y-4 delay-300">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between p-6 rounded-xl glass hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  {link.icon}
                </span>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {link.name}
                  </div>
                  <div className="text-foreground group-hover:text-primary transition-colors duration-300">
                    {link.label}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="reveal opacity-0 mt-24 pt-12 border-t border-border text-center delay-400">
          <p className="text-sm text-muted-foreground">
            Designed & Built by{" "}
            <span className="text-foreground">Soham Bhalekar</span>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
