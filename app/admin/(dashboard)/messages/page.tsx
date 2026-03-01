"use client"

import { useEffect, useState, useCallback } from "react"
import { Mail, MailOpen, Trash2, Eye } from "lucide-react"

interface Message {
  id: number
  name: string
  company: string | null
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/messages")
      const data = await res.json()
      setMessages(data.messages || [])
    } catch {
      /* empty */
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const markRead = async (id: number) => {
    await fetch(`/api/admin/messages/${id}/read`, { method: "POST" })
    fetchMessages()
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这条留言吗？")) return
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" })
    fetchMessages()
    if (selected?.id === id) setSelected(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">{"留言管理"}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message list */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"状态"}</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"姓名"}</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"邮箱"}</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"时间"}</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">{"操作"}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      {"加载中..."}
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      {"暂无留言"}
                    </td>
                  </tr>
                ) : (
                  messages.map((m) => (
                    <tr
                      key={m.id}
                      className={`border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${
                        selected?.id === m.id ? "bg-primary/5" : ""
                      } ${!m.is_read ? "font-medium" : ""}`}
                      onClick={() => {
                        setSelected(m)
                        if (!m.is_read) markRead(m.id)
                      }}
                    >
                      <td className="px-4 py-3">
                        {m.is_read ? (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Mail className="h-4 w-4 text-primary" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-foreground">{m.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {m.created_at?.split("T")[0]}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(m.id)
                          }}
                          className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Delete message"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <div className="rounded-lg border border-border bg-card p-5">
          {selected ? (
            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">
                {"留言详情"}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">{"姓名: "}</span>
                  <span className="text-foreground">{selected.name}</span>
                </div>
                {selected.company && (
                  <div>
                    <span className="text-muted-foreground">{"公司: "}</span>
                    <span className="text-foreground">{selected.company}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">{"邮箱: "}</span>
                  <span className="text-foreground">{selected.email}</span>
                </div>
                {selected.phone && (
                  <div>
                    <span className="text-muted-foreground">{"电话: "}</span>
                    <span className="text-foreground">{selected.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">{"时间: "}</span>
                  <span className="text-foreground">{selected.created_at?.replace("T", " ").split(".")[0]}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="text-muted-foreground mb-1">{"留言内容:"}</div>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Eye className="h-8 w-8 mb-2 opacity-50" />
              <span className="text-sm">{"点击留言查看详情"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
