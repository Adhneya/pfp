"use client"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Particles } from "./particles"

const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Open Source Contributor"]

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative isolate overflow-hidden"
      style={{ scrollMarginTop: "4.5rem" }}
    >
      <Particles className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-20 text-center md:py-28">
        <motion.h1
          className="text-balance text-4xl font-semibold md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Hi, I&apos;m{" "}
          <span className="text-primary underline decoration-secondary/40 underline-offset-4">Your Name</span>
        </motion.h1>

        <motion.p
          className="text-pretty max-w-2xl text-base text-foreground/80 md:text-lg"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          I craft performant web apps with modern tooling, clean UI, and delightful interactions.
        </motion.p>

        {/* Typing role animation */}
        <div aria-live="polite" className="h-6 text-sm text-muted md:h-7 md:text-base">
          {!reduced ? <Typewriter texts={roles} /> : <span>{roles[0]}</span>}
        </div>

        <div className="flex items-center gap-3">
          <a href="#portfolio">
            <Button className="group">
              View Work
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 bg-transparent">
              Contact Me
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

function Typewriter({ texts }: { texts: string[] }) {
  // cycles through texts with a typewriter effect using framer-motion
  const cycleDuration = 2200
  return (
    <motion.span
      key="typewriter"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ times: [0, 0.1, 0.9, 1], duration: cycleDuration / 1000, repeat: Number.POSITIVE_INFINITY }}
      className="inline-block"
    >
      <CyclingText texts={texts} duration={cycleDuration} />
    </motion.span>
  )
}

import { useEffect, useState } from "react"
function CyclingText({ texts, duration }: { texts: string[]; duration: number }) {
  const [idx, setIdx] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    const text = texts[idx]
    let t = 0
    const type = setInterval(() => {
      setChars((c) => Math.min(c + 1, text.length))
      t += 50
      if (t >= text.length * 50) {
        clearInterval(type)
      }
    }, 50)
    const change = setTimeout(() => {
      setIdx((i) => (i + 1) % texts.length)
      setChars(0)
    }, duration)
    return () => {
      clearInterval(type)
      clearTimeout(change)
    }
  }, [idx, texts, duration])

  return <span className="font-medium text-secondary">{texts[idx].slice(0, chars)}</span>
}
