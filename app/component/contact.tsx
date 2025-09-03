"use client"

import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const form = new FormData(e.currentTarget)
    const payload = {
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to send message")

      setStatus("success")
      e.currentTarget.reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Something went wrong")
      }
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16" style={{ scrollMarginTop: "4.5rem" }}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold md:text-3xl">Contact</h2>
        <p className="text-foreground/70">Let’s collaborate on your next project</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.form
          onSubmit={onSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          aria-describedby={error ? "contact-error" : undefined}
        >
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              placeholder=" "
              type="email"
              required
              className="mt-2 w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
              aria-invalid={status === "error" ? "true" : "false"}
            />
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder=" "
              rows={5}
              required
              className="mt-2 w-full rounded-md border bg-transparent px-3 py-3 outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
            />
          </div>

          <Button type="submit" disabled={status === "loading"} className="group">
            {status === "loading" ? "Sending…" : "Send Message"}
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Button>

          {status === "success" && (
            <p className="text-sm text-secondary" role="status">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p id="contact-error" className="text-sm text-primary" role="alert">
              {error}
            </p>
          )}
        </motion.form>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  href="mailto:you@example.com"
                >
                  <Mail className="h-4 w-4 text-secondary" />
                  you@example.com
                </Link>
              </li>
              <li>
                <Link
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  href="https://github.com/yourname"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4 text-secondary" />
                  github.com/yourname
                </Link>
              </li>
              <li>
                <Link
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  href="https://www.linkedin.com/in/yourname"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="h-4 w-4 text-secondary" />
                  linkedin.com/in/yourname
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Availability</h3>
            <p className="text-sm text-foreground/80">Currently open to freelance projects and full-time roles.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { Contact }
