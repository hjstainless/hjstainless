"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Pencil, Trash2, Loader2, Calendar } from "lucide-react"

interface Article {
  id: number
  title_zh: string
  title_en: string
  slug: string
  category: string
  published_at: string
}

interface FormData {
  title_zh: string
  title_en: string
  slug: string
  summary_zh: string
  summary_en: string
  content_zh: string
  content_en: string
  category: string
  published_at: string
}

const emptyForm: FormData = {
  title_zh: "",
  title_en: "",
  slug: "",
  summary_zh: "",
  summary_en: "",
  content_zh: "",
  content_en: "",
  category: "news",
  published_at: new Date().toISOString().split("T")[0],
}

const categoryLabels: Record<string, string> = {
  news: "公司新闻",
  knowledge: "专业知识",
  industry: "行业前沿",
}

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/articles")
      const data = await res.json()
      setArticles(data.articles || [])
    } catch {
      /* empty */
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEdit = (article: Article) => {
    setEditId(article.id)
    setForm({
      title_zh: article.title_zh || "",
      title_en: article.title_en || "",
      slug: article.slug || "",
      summary_zh: "",
      summary_en: "",
      content_zh: "",
      content_en: "",
      category: article.category || "news",
      published_at: article.published_at?.split("T")[0] || "",
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editId ? `/api/admin/articles/${editId}` : "/api/admin/articles"
      const method = editId ? "PUT" : "POST"
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setShowForm(false)
      fetchArticles()
    } catch {
      /* empty */
    }
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这篇文章吗？")) return
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
    fetchArticles()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{"文章管理"}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-section-dark-text text-sm font-medium hover:bg-primary-light transition-colors"
        >
          <Plus className="h-4 w-4" /> {"添加文章"}
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-card border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editId ? "编辑文章" : "添加文章"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">{"标题(中文)"}</label>
                <input
                  value={form.title_zh}
                  onChange={(e) => setForm({ ...form, title_zh: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">{"Title (EN)"}</label>
                <input
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{"Slug"}</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{"分类"}</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="news">{"公司新闻"}</option>
                  <option value="knowledge">{"专业知识"}</option>
                  <option value="industry">{"行业前沿"}</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">{"发布日期"}</label>
                <input
                  type="date"
                  value={form.published_at}
                  onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">{"内容(中文)"}</label>
                <textarea
                  rows={5}
                  value={form.content_zh}
                  onChange={(e) => setForm({ ...form, content_zh: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">{"Content (EN)"}</label>
                <textarea
                  rows={5}
                  value={form.content_en}
                  onChange={(e) => setForm({ ...form, content_en: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {"取消"}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-section-dark-text text-sm font-medium hover:bg-primary-light disabled:opacity-50 transition-colors"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {"保存"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"标题"}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"分类"}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"发布日期"}</th>
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
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    {"暂无文章数据"}
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">{a.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{a.title_zh}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">{a.title_en}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                        {categoryLabels[a.category] || a.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {a.published_at?.split("T")[0]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Edit article"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Delete article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
