"use client"
import { motion } from "framer-motion"
import type React from "react"

import { GitBranch, PenTool, Server, Globe, Camera, Briefcase } from "lucide-react"

type Skill = {
  title: string
  icon: React.ElementType
  level: number // 0-100
}

const skills: Skill[] = [
  { title: "Git Version Control", icon: GitBranch, level: 90 },
  { title: "App Design", icon: PenTool, level: 80 },
  { title: "Back-end Development", icon: Server, level: 85 },
  { title: "Web Development", icon: Globe, level: 92 },
  { title: "Photography", icon: Camera, level: 70 },
  { title: "Freelancing", icon: Briefcase, level: 88 },
]

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-16" style={{ scrollMarginTop: "4.5rem" }}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold md:text-3xl">Skills</h2>
        <p className="text-foreground/70">Core capabilities and proficiency</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-secondary/60"
          >
            <div className="flex items-center gap-3">
              <s.icon className="h-5 w-5 text-secondary transition-transform group-hover:-translate-y-0.5" />
              <h3 className="font-medium">{s.title}</h3>
            </div>
            <div className="mt-4 h-2 w-full rounded bg-foreground/10">
              <motion.div
                className="h-2 rounded bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 text-right text-xs text-foreground/60">{s.level}%</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
