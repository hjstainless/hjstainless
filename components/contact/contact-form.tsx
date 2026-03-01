"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface ContactFormProps {
  locale: Locale
  dict: Record<string, string>
}

export default function ContactForm({ locale, dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", company: "", email: "", phone: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {dict.formName} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            placeholder={dict.formName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {dict.formCompany}
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full rounded border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            placeholder={dict.formCompany}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {dict.formEmail} <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            placeholder={dict.formEmail}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {dict.formPhone}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            placeholder={dict.formPhone}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {dict.formMessage} <span className="text-accent">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
          placeholder={dict.formMessage}
        />
      </div>

      {status === "success" && (
        <div className="rounded bg-green-50 border border-green-200 p-3 text-sm text-green-700">
          {dict.formSuccess}
        </div>
      )}
      {status === "error" && (
        <div className="rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {dict.formError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-section-dark-text font-medium rounded hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {dict.formSubmit}
      </button>
    </form>
  )
}
