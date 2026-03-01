import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface PageBannerProps {
  title: string
  breadcrumbs: { label: string; href?: string }[]
  locale: Locale
}

export default function PageBanner({ title, breadcrumbs, locale }: PageBannerProps) {
  return (
    <section className="relative bg-primary-dark pt-28 pb-14 lg:pt-32 lg:pb-16">
      <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-section-dark-text text-balance mb-4">
          {title}
        </h1>
        <nav className="flex items-center gap-1.5 text-sm text-section-dark-text/70">
          <Link
            href={`/${locale}`}
            className="hover:text-section-dark-text transition-colors"
          >
            {locale === "zh" ? "首页" : "Home"}
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-section-dark-text transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-section-dark-text">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}
