import Image from "next/image"
import { getDictionary, type Locale } from "@/lib/i18n"
import PageBanner from "@/components/ui/page-banner"
import StatsCounter from "@/components/home/stats-counter"
import { Award, Eye, Target, Heart } from "lucide-react"

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const stats = [
    { value: 30000, label: dict.about.areaLabel, unit: "m\u00B2" },
    { value: 200, label: dict.about.employeesLabel, unit: locale === "zh" ? "\u4EBA" : "people" },
    { value: 10000, label: dict.about.capacityLabel, unit: locale === "zh" ? "\u5428" : "tons" },
    { value: 50, label: dict.about.countriesLabel, unit: locale === "zh" ? "\u4E2A" : "countries", suffix: "+" },
  ]

  const milestones = [
    { year: "2010", desc: dict.about.milestone2010 },
    { year: "2013", desc: dict.about.milestone2013 },
    { year: "2015", desc: dict.about.milestone2015 },
    { year: "2017", desc: dict.about.milestone2017 },
    { year: "2019", desc: dict.about.milestone2019 },
    { year: "2021", desc: dict.about.milestone2021 },
    { year: "2023", desc: dict.about.milestone2023 },
  ]

  const cultureItems = [
    { icon: Eye, title: dict.about.vision, desc: dict.about.visionDesc },
    { icon: Target, title: dict.about.mission, desc: dict.about.missionDesc },
    { icon: Heart, title: dict.about.values, desc: dict.about.valuesDesc },
  ]

  return (
    <>
      <PageBanner
        title={dict.about.pageTitle}
        breadcrumbs={[{ label: dict.about.breadcrumb }]}
        locale={locale as Locale}
      />

      {/* Company Intro */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-72 sm:h-80 lg:h-[420px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/factory-exterior.jpg"
                alt={dict.about.introTitle}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {dict.about.introTitle}
              </h2>
              <div className="h-1 w-16 bg-primary rounded mb-6" />
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>{dict.about.introDesc}</p>
                <p>{dict.about.introDesc2}</p>
                <p>{dict.about.introDesc3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-muted">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            {dict.about.statsTitle}
          </h2>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
            {dict.about.milestoneTitle}
          </h2>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-0.5" />

            <div className="space-y-8 lg:space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 pl-12 lg:pl-0 ${i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                    <div className="inline-block rounded bg-primary px-3 py-1 text-sm font-bold text-section-dark-text mb-2">
                      {m.year}
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 top-1 flex h-3 w-3 -translate-x-1/2 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>

                  {/* Empty spacer for desktop */}
                  <div className="hidden lg:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 lg:py-20 bg-primary-dark">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-section-dark-text text-center mb-12">
            {dict.about.cultureTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-lg bg-section-dark-text/5 border border-section-dark-text/10 p-8 text-center">
                  <Icon className="mx-auto h-12 w-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-section-dark-text mb-3">{item.title}</h3>
                  <p className="text-sm text-section-dark-text/70 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
