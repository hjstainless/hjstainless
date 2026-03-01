import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import StatsCounter from "@/components/home/stats-counter"

interface AboutPreviewProps {
  locale: Locale
  dict: {
    home: Record<string, string>
    common: Record<string, string>
  }
}

export default function AboutPreview({ locale, dict }: AboutPreviewProps) {
  const stats = [
    {
      value: 30000,
      label: dict.home.statsArea,
      unit: dict.home.statsAreaUnit,
      suffix: "+",
    },
    {
      value: 100,
      label: dict.home.statsEquipment,
      unit: dict.home.statsEquipmentUnit,
      suffix: "+",
    },
    {
      value: 10000,
      label: dict.home.statsCapacity,
      unit: dict.home.statsCapacityUnit,
      suffix: "+",
    },
    {
      value: 500,
      label: dict.home.statsClients,
      unit: dict.home.statsClientsUnit,
      suffix: "+",
    },
  ]

  return (
    <section className="py-16 lg:py-20 bg-muted">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
          {/* Image */}
          <div className="relative h-72 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/factory-exterior.jpg"
              alt={dict.home.aboutTitle}
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance mb-4">
              {dict.home.aboutTitle}
            </h2>
            <div className="h-1 w-16 bg-primary rounded mb-6" />
            <p className="text-base text-muted-foreground leading-relaxed mb-6 text-pretty">
              {dict.home.aboutDesc}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-section-dark-text font-medium rounded hover:bg-primary-light transition-colors"
            >
              {dict.common.learnMore}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <StatsCounter stats={stats} />
      </div>
    </section>
  )
}
