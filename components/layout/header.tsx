"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, Globe, ChevronDown } from "lucide-react"
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const otherLocale = locale === "zh" ? "en" : "zh"
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-dark text-section-dark-text">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-1.5 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {dict.contact.phoneValue}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {dict.contact.emailValue}
            </span>
          </div>
          <Link
            href={switchLocalePath}
            className="flex items-center gap-1.5 hover:text-primary-light transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            {locale === "zh" ? "English" : "中文"}
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
              <span className="text-lg font-bold text-section-dark-text">
                {"HJ"}
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold text-primary leading-tight">
                {dict.common.companyNameShort}
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                {locale === "zh"
                  ? "Hongji Metal Materials"
                  : "Jiangsu Hongji Metal"}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
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
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {dict.nav[item.key]}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded hover:bg-muted transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-3 space-y-1">
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
                    className={`block px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {dict.nav[item.key]}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
