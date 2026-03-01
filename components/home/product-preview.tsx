import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import SectionHeading from "@/components/ui/section-heading"

interface ProductPreviewProps {
  locale: Locale
  dict: {
    home: Record<string, string>
    products: Record<string, string>
    common: Record<string, string>
  }
}

const categories = [
  { key: "prefabricated", image: "/images/products/prefabricated.jpg" },
  { key: "buttWeld", image: "/images/products/buttweld.jpg" },
  { key: "flanges", image: "/images/products/flanges.jpg" },
  { key: "fittings", image: "/images/products/fittings.jpg" },
]

export default function ProductPreview({ locale, dict }: ProductPreviewProps) {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title={dict.home.productsTitle}
          subtitle={dict.home.productsSubtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/${locale}/products?category=${cat.key}`}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={dict.products[cat.key]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/30 transition-colors duration-300" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {dict.products[cat.key]}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {dict.products[`${cat.key}Desc`]}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {dict.common.learnMore}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-medium rounded hover:bg-primary hover:text-section-dark-text transition-colors"
          >
            {dict.common.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
