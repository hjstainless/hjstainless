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
    const { category_id, name_zh, name_en, slug, description_zh, description_en, specs_zh, specs_en, material, pressure_rating, is_featured, sort_order } = body

    const result = await sql`
      UPDATE products SET
        category_id = ${category_id},
        name_zh = ${name_zh},
        name_en = ${name_en},
        slug = ${slug},
        description_zh = ${description_zh || null},
        description_en = ${description_en || null},
        specs_zh = ${specs_zh || null},
        specs_en = ${specs_en || null},
        material = ${material || null},
        pressure_rating = ${pressure_rating || null},
        is_featured = ${is_featured || false},
        sort_order = ${sort_order || 0},
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    return NextResponse.json({ product: result[0] })
  } catch (error) {
    console.error("Update product error:", error)
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
    await sql`DELETE FROM products WHERE id = ${parseInt(id)}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
