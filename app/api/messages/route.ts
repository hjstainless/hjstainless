import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      )
    }

    await sql`
      INSERT INTO messages (name, company, email, phone, message)
      VALUES (${name}, ${company || null}, ${email}, ${phone || null}, ${message})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save message:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    const messages = await sql`
      SELECT * FROM messages ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `

    const countResult = await sql`SELECT COUNT(*) as total FROM messages`
    const total = countResult[0].total

    return NextResponse.json({ messages, total, page, limit })
  } catch (error) {
    console.error("Failed to fetch messages:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
