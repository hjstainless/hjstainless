"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Newspaper,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"

const sidebarItems = [
  { href: "/admin", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/products", label: "产品管理", icon: Package },
  { href: "/admin/articles", label: "文章管理", icon: Newspaper },
  { href: "/admin/messages", label: "留言管理", icon: MessageSquare },
  { href: "/admin/settings", label: "网站设置", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login")
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-muted-foreground">{"加载中..."}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 bg-primary-dark text-section-dark-text flex flex-col transition-transform lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-section-dark-text/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-accent">
              <span className="text-sm font-bold text-section-dark-text">HJ</span>
            </div>
            <span className="text-base font-bold">{"泓基后台"}</span>
          </Link>
          <button
            className="lg:hidden p-1 hover:bg-section-dark-text/10 rounded"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-section-dark-text/15 text-section-dark-text"
                    : "text-section-dark-text/70 hover:bg-section-dark-text/10 hover:text-section-dark-text"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-section-dark-text/10">
          <div className="text-xs text-section-dark-text/50 mb-2 px-3">
            {"当前用户: "}{user.username}
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-section-dark-text/70 hover:bg-section-dark-text/10 hover:text-section-dark-text transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            {"退出登录"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-card px-4 py-3 lg:px-6">
          <button
            className="lg:hidden p-1.5 rounded hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/admin" className="hover:text-foreground transition-colors">
              {"后台管理"}
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground font-medium">
                  {sidebarItems.find((i) =>
                    i.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(i.href)
                  )?.label || ""}
                </span>
              </>
            )}
          </nav>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
