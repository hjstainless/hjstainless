import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const categories = await sql`
      SELECT * FROM product_categories ORDER BY sort_order ASC
    `
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Fetch categories error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
