import { getDictionary, type Locale } from "@/lib/i18n"
import PageBanner from "@/components/ui/page-banner"
import SectionHeading from "@/components/ui/section-heading"
import { Droplets, Zap, Ship, Atom, Flame, Pill, CheckCircle } from "lucide-react"

const industries = [
  {
    key: "petrochemical",
    icon: Droplets,
    features: { zh: ["\u8010\u8150\u8680\u5408\u91D1\u7BA1\u4EF6", "\u9AD8\u6E29\u9AD8\u538B\u6CD5\u5170", "\u5316\u5DE5\u88C5\u7F6E\u9884\u5236\u4EF6"], en: ["Corrosion-resistant alloy fittings", "High-temp high-pressure flanges", "Chemical plant prefabs"] },
  },
  {
    key: "power",
    icon: Zap,
    features: { zh: ["\u9505\u7089\u7BA1\u9053\u914D\u4EF6", "\u6C7D\u6C34\u7BA1\u7EBF\u7BA1\u4EF6", "\u7535\u7AD9\u9884\u5236\u7BA1\u6BB5"], en: ["Boiler pipe fittings", "Steam/water line fittings", "Power plant prefab pipe sections"] },
  },
  {
    key: "marine",
    icon: Ship,
    features: { zh: ["\u8239\u7528\u7BA1\u9053\u7CFB\u7EDF", "\u6D77\u6D0B\u5E73\u53F0\u7BA1\u4EF6", "\u8010\u6D77\u6C34\u8150\u8680\u6750\u6599"], en: ["Marine piping systems", "Offshore platform fittings", "Seawater corrosion-resistant materials"] },
  },
  {
    key: "nuclear",
    icon: Atom,
    features: { zh: ["\u6838\u7EA7\u7BA1\u9053\u914D\u4EF6", "\u4E25\u683C\u8D28\u91CF\u63A7\u5236", "\u6838\u7535\u8BBE\u5907\u5236\u9020\u8D44\u8D28"], en: ["Nuclear-grade pipe fittings", "Strict quality control", "Nuclear equipment certification"] },
  },
  {
    key: "gasLng",
    icon: Flame,
    features: { zh: ["\u4F4E\u6E29\u7BA1\u9053\u914D\u4EF6", "LNG\u63A5\u6536\u7AD9\u7BA1\u4EF6", "\u5929\u7136\u6C14\u8F93\u9001\u7BA1\u7EBF"], en: ["Low-temperature pipe fittings", "LNG terminal fittings", "Natural gas pipeline"] },
  },
  {
    key: "pharmaFood",
    icon: Pill,
    features: { zh: ["\u536B\u751F\u7EA7\u7BA1\u4EF6", "\u62B9\u5149\u8868\u9762\u5904\u7406", "\u7B26\u5408GMP\u6807\u51C6"], en: ["Sanitary-grade fittings", "Mirror-polished finish", "GMP compliant"] },
  },
]

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <PageBanner
        title={dict.industries.pageTitle}
        breadcrumbs={[{ label: dict.industries.breadcrumb }]}
        locale={locale as Locale}
      />

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={dict.industries.pageTitle}
            subtitle={dict.industries.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => {
              const Icon = ind.icon
              const features = ind.features[locale as Locale] || ind.features.zh
              return (
                <div
                  key={ind.key}
                  className="group rounded-lg border border-border bg-card p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {(dict.industries as Record<string, string>)[ind.key]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {(dict.industries as Record<string, string>)[`${ind.key}Desc`]}
                  </p>
                  <ul className="space-y-2">
                    {features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
