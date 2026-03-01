import { getDictionary, type Locale } from "@/lib/i18n"
import HeroCarousel from "@/components/home/hero-carousel"
import ProductPreview from "@/components/home/product-preview"
import AboutPreview from "@/components/home/about-preview"
import IndustriesPreview from "@/components/home/industries-preview"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <HeroCarousel locale={locale as Locale} dict={dict.home} />
      <ProductPreview locale={locale as Locale} dict={dict} />
      <AboutPreview locale={locale as Locale} dict={dict} />
      <IndustriesPreview locale={locale as Locale} dict={dict} />
    </>
  )
}
