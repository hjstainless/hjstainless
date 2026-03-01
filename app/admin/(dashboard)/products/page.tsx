"use client"

import { useEffect, useState, useCallback } from "react"
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react"

interface Product {
  id: number
  name_zh: string
  name_en: string
  slug: string
  category_id: number
  category_name_zh: string
  material: string
  is_featured: boolean
  sort_order: number
}

interface Category {
  id: number
  name_zh: string
  name_en: string
}

interface FormData {
  category_id: string
  name_zh: string
  name_en: string
  slug: string
  description_zh: string
  description_en: string
  specs_zh: string
  specs_en: string
  material: string
  pressure_rating: string
  is_featured: boolean
  sort_order: string
}

const emptyForm: FormData = {
  category_id: "",
  name_zh: "",
  name_en: "",
  slug: "",
  description_zh: "",
  description_en: "",
  specs_zh: "",
  specs_en: "",
  material: "",
  pressure_rating: "",
  is_featured: false,
  sort_order: "0",
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/products")
      const data = await res.json()
      setProducts(data.products || [])
    } catch {
      /* empty */
    }
    setLoading(false)
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const data = await res.json()
      setCategories(data.categories || [])
    } catch {
      /* empty */
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [fetchProducts, fetchCategories])

  const openCreate = () => {
    setEditId(null)
    setForm({ ...emptyForm, category_id: categories[0]?.id?.toString() || "" })
    setShowForm(true)
  }

  const openEdit = (product: Product) => {
    setEditId(product.id)
    setForm({
      category_id: product.category_id?.toString() || "",
      name_zh: product.name_zh || "",
      name_en: product.name_en || "",
      slug: product.slug || "",
      description_zh: "",
      description_en: "",
      specs_zh: "",
      specs_en: "",
      material: product.material || "",
      pressure_rating: "",
      is_featured: product.is_featured,
      sort_order: product.sort_order?.toString() || "0",
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editId ? `/api/admin/products/${editId}` : "/api/admin/products"
      const method = editId ? "PUT" : "POST"
      const body = {
        ...form,
        category_id: parseInt(form.category_id),
        sort_order: parseInt(form.sort_order) || 0,
      }
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      setShowForm(false)
      fetchProducts()
    } catch {
      /* empty */
    }
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个产品吗？")) return
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
    fetchProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{"产品管理"}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-section-dark-text text-sm font-medium hover:bg-primary-light transition-colors"
        >
          <Plus className="h-4 w-4" /> {"添加产品"}
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-card border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editId ? "编辑产品" : "添加产品"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{"分类"}</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name_zh}</option>
                  ))}
                </select>
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
                <label className="block text-sm font-medium text-foreground mb-1">{"名称(中文)"}</label>
                <input
                  value={form.name_zh}
                  onChange={(e) => setForm({ ...form, name_zh: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{"Name (EN)"}</label>
                <input
                  value={form.name_en}
                  onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{"材质"}</label>
                <input
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{"排序"}</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="rounded border-border"
                />
                {"推荐产品"}
              </label>
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
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"名称"}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"分类"}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"材质"}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"推荐"}</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">{"操作"}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {"加载中..."}
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {"暂无产品数据"}
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{p.name_zh}</div>
                      <div className="text-xs text-muted-foreground">{p.name_en}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category_name_zh}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.material || "-"}</td>
                    <td className="px-4 py-3">
                      {p.is_featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Delete product"
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
