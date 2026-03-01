import Image from "next/image"
import { getDictionary, type Locale } from "@/lib/i18n"
import PageBanner from "@/components/ui/page-banner"
import { CheckCircle } from "lucide-react"

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const sections = [
    {
      title: dict.facilities.equipmentTitle,
      desc: dict.facilities.equipmentDesc,
      image: "/images/equipment.jpg",
    },
    {
      title: dict.facilities.testingTitle,
      desc: dict.facilities.testingDesc,
      image: "/images/testing.jpg",
    },
    {
      title: dict.facilities.warehouseTitle,
      desc: dict.facilities.warehouseDesc,
      image: "/images/warehouse.jpg",
    },
  ]

  return (
    <>
      <PageBanner
        title={dict.facilities.pageTitle}
        breadcrumbs={[{ label: dict.facilities.breadcrumb }]}
        locale={locale as Locale}
      />

      {/* Equipment / Testing / Warehouse sections */}
      {sections.map((section, i) => (
        <section
          key={section.title}
          className={`py-16 lg:py-20 ${i % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative h-72 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="h-1 w-16 bg-primary rounded mb-6" />
                <p className="text-base text-muted-foreground leading-relaxed">
                  {section.desc}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Production Process */}
      <section className="py-16 lg:py-20 bg-primary-dark">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-section-dark-text text-center mb-4">
            {dict.facilities.processTitle}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-accent mb-12" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {dict.facilities.processSteps.map((step: string, i: number) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-section-dark-text font-bold text-lg mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span className="text-sm text-section-dark-text/80 font-medium">
                  {step}
                </span>
                {i < dict.facilities.processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 -right-2 w-4 h-0.5 bg-section-dark-text/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
