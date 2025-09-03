import { NextResponse } from "next/server"

type ContactBody = {
  email?: string
  message?: string
}

export async function POST(req: Request) {
  try {
    // Parse JSON body safely
    let data: ContactBody
    try {
      data = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    const { email, message } = data ?? {}
    if (!email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, source: "portfolio" }),
      })
    } else {
      console.log("[v0] Contact message:", { email, message })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[v0] Contact API error:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
