import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const [products, articles, messages, unreadMessages] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM products`,
      sql`SELECT COUNT(*) as count FROM articles`,
      sql`SELECT COUNT(*) as count FROM messages`,
      sql`SELECT COUNT(*) as count FROM messages WHERE is_read = false`,
    ])

    return NextResponse.json({
      products: parseInt(products[0].count),
      articles: parseInt(articles[0].count),
      messages: parseInt(messages[0].count),
      unreadMessages: parseInt(unreadMessages[0].count),
    })
  } catch (error) {
    console.error("Fetch stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
