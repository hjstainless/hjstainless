import Link from "next/link"
import { ArrowRight, Droplets, Zap, Ship, Atom, Flame, Pill } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import SectionHeading from "@/components/ui/section-heading"

interface IndustriesPreviewProps {
  locale: Locale
  dict: {
    home: Record<string, string>
    industries: Record<string, string>
    common: Record<string, string>
  }
}

const industries = [
  { key: "petrochemical", icon: Droplets },
  { key: "power", icon: Zap },
  { key: "marine", icon: Ship },
  { key: "nuclear", icon: Atom },
  { key: "gasLng", icon: Flame },
  { key: "pharmaFood", icon: Pill },
]

export default function IndustriesPreview({ locale, dict }: IndustriesPreviewProps) {
  return (
    <section className="py-16 lg:py-20 bg-primary-dark">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title={dict.home.industriesTitle}
          subtitle={dict.home.industriesSubtitle}
          light
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <div
                key={ind.key}
                className="group relative overflow-hidden rounded-lg bg-section-dark-text/5 border border-section-dark-text/10 p-6 hover:bg-section-dark-text/10 transition-all duration-300"
              >
                <Icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-section-dark-text mb-2">
                  {dict.industries[ind.key]}
                </h3>
                <p className="text-sm text-section-dark-text/60 leading-relaxed line-clamp-3">
                  {dict.industries[`${ind.key}Desc`]}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/industries`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-section-dark-text/30 text-section-dark-text font-medium rounded hover:bg-section-dark-text/10 transition-colors"
          >
            {dict.common.learnMore}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
