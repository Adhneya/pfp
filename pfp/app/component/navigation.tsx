"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="#home" className="font-semibold text-lg text-foreground">
          {"<"}YourName{"/>"}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <button
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded hover:bg-foreground/10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <nav className="mx-auto flex max-w-5xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="py-2 text-foreground/90" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="py-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
