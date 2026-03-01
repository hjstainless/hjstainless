"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface HeaderProps {
  locale: Locale
  dict: {
    nav: Record<string, string>
    common: Record<string, string>
    contact: Record<string, string>
  }
}

const navItems = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "facilities", href: "/facilities" },
  { key: "industries", href: "/industries" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
]

export default function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const otherLocale = locale === "zh" ? "en" : "zh"
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background shadow-lg"
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 lg:px-6 h-16 lg:h-20">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded bg-primary">
            <span className="text-base lg:text-lg font-bold text-section-dark-text">
              {"HJ"}
            </span>
          </div>
          <div>
            <div className="text-sm lg:text-base font-bold text-primary leading-tight">
              {dict.common.companyNameShort}
            </div>
            <div className="text-[10px] lg:text-xs text-muted-foreground leading-tight tracking-wide">
              {locale === "zh"
                ? "HONGJI METAL MATERIALS"
                : "Jiangsu Hongji Metal"}
            </div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const href = `/${locale}${item.href}`
            const isActive =
              item.href === ""
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(href)
            return (
              <Link
                key={item.key}
                href={href}
                className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {dict.nav[item.key]}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side: lang switch + hotline */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={switchLocalePath}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            {locale === "zh" ? "EN" : "CN"}
          </Link>
          <div className="h-5 w-px bg-border" />
          <a
            href={`tel:${dict.contact.phoneValue}`}
            className="flex items-center gap-2 text-sm font-medium text-primary"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="hidden xl:inline">{dict.contact.phoneValue}</span>
          </a>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href={switchLocalePath}
            className="inline-flex items-center px-2 py-1 text-xs font-medium border border-border rounded text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            {locale === "zh" ? "EN" : "CN"}
          </Link>
          <button
            className="p-2 rounded hover:bg-muted transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-border bg-background shadow-lg">
          <div className="px-4 py-2">
            {navItems.map((item) => {
              const href = `/${locale}${item.href}`
              const isActive =
                item.href === ""
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(href)
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`block px-3 py-3 text-sm font-medium border-b border-border/50 last:border-b-0 transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {dict.nav[item.key]}
                </Link>
              )
            })}
          </div>
          {/* Mobile hotline */}
          <div className="px-4 py-3 border-t border-border bg-muted">
            <a
              href={`tel:${dict.contact.phoneValue}`}
              className="flex items-center justify-center gap-2 text-sm font-medium text-primary"
            >
              <Phone className="h-4 w-4" />
              {dict.contact.phoneValue}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
