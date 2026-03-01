import { getDictionary, type Locale } from "@/lib/i18n"
import PageBanner from "@/components/ui/page-banner"
import ContactForm from "@/components/contact/contact-form"
import { Phone, Mail, MapPin, Printer } from "lucide-react"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const contactItems = [
    { icon: MapPin, label: locale === "zh" ? "\u5730\u5740" : "Address", value: dict.contact.addressValue },
    { icon: Phone, label: locale === "zh" ? "\u7535\u8BDD" : "Phone", value: dict.contact.phoneValue },
    { icon: Printer, label: locale === "zh" ? "\u4F20\u771F" : "Fax", value: dict.contact.faxValue },
    { icon: Mail, label: locale === "zh" ? "\u90AE\u7BB1" : "Email", value: dict.contact.emailValue },
  ]

  return (
    <>
      <PageBanner
        title={dict.contact.pageTitle}
        breadcrumbs={[{ label: dict.contact.breadcrumb }]}
        locale={locale as Locale}
      />

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {dict.contact.infoTitle}
              </h2>
              <div className="h-1 w-16 bg-primary rounded mb-8" />
              <div className="space-y-6">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          {item.label}
                        </div>
                        <div className="text-base text-foreground">{item.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 h-48 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm">
                {dict.contact.mapTitle}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {dict.contact.formTitle}
              </h2>
              <div className="h-1 w-16 bg-primary rounded mb-8" />
              <ContactForm locale={locale as Locale} dict={dict.contact} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
