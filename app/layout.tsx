import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "./components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Modern developer portfolio with dark theme, animations, and smooth scrolling.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Developer Portfolio",
    description: "Modern developer portfolio with dark theme, animations, and smooth scrolling.",
    url: "https://example.com",
    siteName: "Dev Portfolio",
    images: [{ url: "/icons/icon-512.png", width: 1200, height: 630, alt: "Portfolio preview" }],
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
