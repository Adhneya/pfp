"use client"
import { useEffect, useRef } from "react"

export function Particles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return

    let animationId: number
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let w = (canvas.width = canvas.offsetWidth * DPR)
    let h = (canvas.height = canvas.offsetHeight * DPR)

    const count = Math.floor((w * h) / 20000) // density-based
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: 1.2 + Math.random() * 1.2,
    }))

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      // subtle gradient backdrop
      const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h))
      grad.addColorStop(0, "rgba(230,57,70,0.06)") // brand red
      grad.addColorStop(1, "rgba(255,107,107,0.02)") // accent coral
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // draw dots
      ctx.fillStyle = "rgba(248,250,252,0.5)" // foreground at 50%
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > w) d.vx *= -1
        if (d.y < 0 || d.y > h) d.vy *= -1
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth * DPR
      h = canvas.height = canvas.offsetHeight * DPR
    }

    window.addEventListener("resize", handleResize)
    draw()
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
