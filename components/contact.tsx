"use client"

import { useEffect, useRef } from "react"
import { Mail, Linkedin, Github, ArrowUpRight, FileText } from "lucide-react"

const socialLinks = [
  {
    name: "Email",
    href: "mailto:sohambhalekar18@email.com",
    icon: <Mail size={20} />,
    label: "sohambhalekar18@email.com",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/soham-bhalekar-145243331",
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
      { threshold: 0.1 }
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
          <span className="text-sm tracking-[0.25em] text-primary uppercase">
            Get in touch
          </span>
        </div>

        {/* Heading */}
        <h2 className="reveal opacity-0 text-3xl md:text-5xl font-semibold text-foreground mb-6 delay-100">
          UI/UX & Web Developer — Open to Internships
        </h2>

        {/* Description */}
        <p className="reveal opacity-0 text-lg text-muted-foreground max-w-2xl mb-10 delay-200">
          I’m a UI/UX and Web App Developer focused on building clean, modern, and
          production-ready web applications. Currently seeking internship
          opportunities and real-world projects.
        </p>

        {/* ACTION BUTTONS */}
        <div className="reveal opacity-0 flex flex-wrap gap-4 mb-14 delay-300">
          {/* Email Button */}
          <a
            href="mailto:sohambhalekar18@email.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300
            hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:-translate-y-1
            active:scale-95"
          >
            Email Me
            <ArrowUpRight size={18} />
          </a>

          {/* View Resume Button (NEW) */}
          <a
            href="https://drive.google.com/file/d/18fl3hEs3KLbC58oCtnGOobJD_WwcrUQ7/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/40 text-primary font-medium transition-all duration-300
            hover:bg-primary hover:text-primary-foreground
            hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:-translate-y-1
            active:scale-95"
          >
            <FileText size={18} />
            View Resume
          </a>
        </div>

        {/* CONTACT LINKS */}
        <div className="reveal opacity-0 space-y-4 delay-400">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between p-6 rounded-xl glass
              transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">{link.name}</div>
                  <div className="text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </div>
                </div>
              </div>

              <ArrowUpRight
                size={20}
                className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="reveal opacity-0 mt-24 pt-12 border-t border-border text-center delay-500">
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
