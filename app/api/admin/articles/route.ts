import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    const articles = await sql`
      SELECT * FROM articles ORDER BY published_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    const countResult = await sql`SELECT COUNT(*) as total FROM articles`

    return NextResponse.json({ articles, total: countResult[0].total, page, limit })
  } catch (error) {
    console.error("Fetch articles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await request.json()
    const { title_zh, title_en, slug, summary_zh, summary_en, content_zh, content_en, category, published_at } = body

    const result = await sql`
      INSERT INTO articles (title_zh, title_en, slug, summary_zh, summary_en, content_zh, content_en, category, published_at)
      VALUES (${title_zh}, ${title_en}, ${slug}, ${summary_zh || null}, ${summary_en || null}, ${content_zh || null}, ${content_en || null}, ${category || 'news'}, ${published_at || new Date().toISOString()})
      RETURNING *
    `

    return NextResponse.json({ article: result[0] })
  } catch (error) {
    console.error("Create article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
