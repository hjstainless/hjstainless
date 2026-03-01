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

    const products = await sql`
      SELECT p.*, pc.name_zh as category_name_zh, pc.name_en as category_name_en
      FROM products p
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      ORDER BY p.sort_order ASC, p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const countResult = await sql`SELECT COUNT(*) as total FROM products`

    return NextResponse.json({ products, total: countResult[0].total, page, limit })
  } catch (error) {
    console.error("Fetch products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await request.json()
    const { category_id, name_zh, name_en, slug, description_zh, description_en, specs_zh, specs_en, material, pressure_rating, is_featured, sort_order } = body

    const result = await sql`
      INSERT INTO products (category_id, name_zh, name_en, slug, description_zh, description_en, specs_zh, specs_en, material, pressure_rating, is_featured, sort_order)
      VALUES (${category_id}, ${name_zh}, ${name_en}, ${slug}, ${description_zh || null}, ${description_en || null}, ${specs_zh || null}, ${specs_en || null}, ${material || null}, ${pressure_rating || null}, ${is_featured || false}, ${sort_order || 0})
      RETURNING *
    `

    return NextResponse.json({ product: result[0] })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
