import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface FooterProps {
  locale: Locale
  dict: {
    nav: Record<string, string>
    common: Record<string, string>
    footer: Record<string, string>
    contact: Record<string, string>
  }
}

const quickLinks = [
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "facilities", href: "/facilities" },
  { key: "industries", href: "/industries" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
]

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-primary-dark text-section-dark-text">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-accent">
                <span className="text-lg font-bold text-section-dark-text">
                  {"HJ"}
                </span>
              </div>
              <span className="text-lg font-bold">
                {dict.common.companyNameShort}
              </span>
            </div>
            <p className="text-sm text-section-dark-text/70 leading-relaxed">
              {dict.footer.companyDesc}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-section-dark-text">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-section-dark-text/70 hover:text-section-dark-text transition-colors"
                  >
                    {dict.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-section-dark-text">
              {dict.footer.contactInfo}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-section-dark-text/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {dict.contact.addressValue}
              </li>
              <li className="flex items-center gap-2 text-sm text-section-dark-text/70">
                <Phone className="h-4 w-4 shrink-0" />
                {dict.contact.phoneValue}
              </li>
              <li className="flex items-center gap-2 text-sm text-section-dark-text/70">
                <Mail className="h-4 w-4 shrink-0" />
                {dict.contact.emailValue}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-section-dark-text/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-section-dark-text/50">
          <span>
            {"© "}{new Date().getFullYear()} {dict.footer.copyright}
          </span>
          <span>{dict.footer.icp}</span>
        </div>
      </div>
    </footer>
  )
}
