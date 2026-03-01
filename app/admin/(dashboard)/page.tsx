"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, Newspaper, MessageSquare, AlertCircle } from "lucide-react"

interface Stats {
  products: number
  articles: number
  messages: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => setError("Failed to load stats"))
  }, [])

  const cards = stats
    ? [
        {
          label: "产品数量",
          value: stats.products,
          icon: Package,
          href: "/admin/products",
          color: "bg-primary/10 text-primary",
        },
        {
          label: "文章数量",
          value: stats.articles,
          icon: Newspaper,
          href: "/admin/articles",
          color: "bg-green-100 text-green-700",
        },
        {
          label: "总留言",
          value: stats.messages,
          icon: MessageSquare,
          href: "/admin/messages",
          color: "bg-amber-100 text-amber-700",
        },
        {
          label: "未读留言",
          value: stats.unreadMessages,
          icon: AlertCircle,
          href: "/admin/messages",
          color: "bg-red-100 text-red-700",
        },
      ]
    : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">{"仪表盘"}</h1>

      {error && (
        <div className="mb-4 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!stats && !error && (
        <div className="text-muted-foreground">{"加载中..."}</div>
      )}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.label}
                href={card.href}
                className="rounded-lg border border-border bg-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {card.value}
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {"快捷操作"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded border border-border p-4 hover:bg-muted transition-colors"
          >
            <Package className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{"管理产品"}</span>
          </Link>
          <Link
            href="/admin/articles"
            className="flex items-center gap-3 rounded border border-border p-4 hover:bg-muted transition-colors"
          >
            <Newspaper className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{"管理文章"}</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 rounded border border-border p-4 hover:bg-muted transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{"查看留言"}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
