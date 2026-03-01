import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const { title_zh, title_en, slug, summary_zh, summary_en, content_zh, content_en, category, published_at } = body

    const result = await sql`
      UPDATE articles SET
        title_zh = ${title_zh},
        title_en = ${title_en},
        slug = ${slug},
        summary_zh = ${summary_zh || null},
        summary_en = ${summary_en || null},
        content_zh = ${content_zh || null},
        content_en = ${content_en || null},
        category = ${category || 'news'},
        published_at = ${published_at},
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    return NextResponse.json({ article: result[0] })
  } catch (error) {
    console.error("Update article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    await sql`DELETE FROM articles WHERE id = ${parseInt(id)}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
