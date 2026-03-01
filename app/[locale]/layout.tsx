import { notFound } from "next/navigation"
import { locales, type Locale, getDictionary } from "@/lib/i18n"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale as Locale} dict={dict} />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
    </div>
  )
}
