import Image from "next/image"
import Link from "next/link"
import { getDictionary, type Locale } from "@/lib/i18n"
import PageBanner from "@/components/ui/page-banner"
import SectionHeading from "@/components/ui/section-heading"

const categoryData = [
  {
    key: "prefabricated",
    image: "/images/products/prefabricated.jpg",
    products: [
      { id: "pre-1", nameZh: "\u7BA1\u9053\u9884\u5236\u5F2F\u5934", nameEn: "Prefabricated Pipe Elbows", spec: "DN50-DN1200" },
      { id: "pre-2", nameZh: "\u4E09\u901A\u9884\u5236\u4EF6", nameEn: "Prefabricated Tees", spec: "DN50-DN800" },
      { id: "pre-3", nameZh: "\u7BA1\u9053\u7EC4\u4EF6\u9884\u5236", nameEn: "Pipe Assembly Prefab", spec: "\u5B9A\u5236" },
    ],
  },
  {
    key: "buttWeld",
    image: "/images/products/buttweld.jpg",
    products: [
      { id: "bw-1", nameZh: "\u5BF9\u7118\u5F2F\u5934", nameEn: "Butt Weld Elbows", spec: "1/2\"-48\"" },
      { id: "bw-2", nameZh: "\u5BF9\u7118\u4E09\u901A", nameEn: "Butt Weld Tees", spec: "1/2\"-48\"" },
      { id: "bw-3", nameZh: "\u5F02\u5F84\u7BA1", nameEn: "Reducers", spec: "1/2\"-48\"" },
      { id: "bw-4", nameZh: "\u7BA1\u5E3D", nameEn: "Pipe Caps", spec: "1/2\"-48\"" },
    ],
  },
  {
    key: "flanges",
    image: "/images/products/flanges.jpg",
    products: [
      { id: "fl-1", nameZh: "\u5BF9\u7118\u6CD5\u5170", nameEn: "Weld Neck Flanges", spec: "1/2\"-60\"" },
      { id: "fl-2", nameZh: "\u5E73\u7118\u6CD5\u5170", nameEn: "Slip-On Flanges", spec: "1/2\"-60\"" },
      { id: "fl-3", nameZh: "\u76F2\u677F\u6CD5\u5170", nameEn: "Blind Flanges", spec: "1/2\"-60\"" },
    ],
  },
  {
    key: "fittings",
    image: "/images/products/fittings.jpg",
    products: [
      { id: "ft-1", nameZh: "\u627F\u63D2\u7118\u7BA1\u4EF6", nameEn: "Socket Weld Fittings", spec: "1/8\"-4\"" },
      { id: "ft-2", nameZh: "\u879D\u7EB9\u7BA1\u4EF6", nameEn: "Threaded Fittings", spec: "1/8\"-4\"" },
      { id: "ft-3", nameZh: "\u7BA1\u53F0", nameEn: "Couplings", spec: "1/8\"-4\"" },
    ],
  },
]

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale } = await params
  const { category: activeCategory } = await searchParams
  const dict = await getDictionary(locale as Locale)

  const filteredCategories = activeCategory
    ? categoryData.filter((c) => c.key === activeCategory)
    : categoryData

  return (
    <>
      <PageBanner
        title={dict.products.pageTitle}
        breadcrumbs={[{ label: dict.products.breadcrumb }]}
        locale={locale as Locale}
      />

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
              href={`/${locale}/products`}
              className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-primary text-section-dark-text"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {dict.products.allCategories}
            </Link>
            {categoryData.map((cat) => (
              <Link
                key={cat.key}
                href={`/${locale}/products?category=${cat.key}`}
                className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-primary text-section-dark-text"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {dict.products[cat.key]}
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          {filteredCategories.map((cat) => (
            <div key={cat.key} className="mb-14 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {dict.products[cat.key]}
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Category card */}
                <div className="relative h-64 lg:h-auto lg:row-span-2 rounded-lg overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={dict.products[cat.key]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-dark/50 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold text-section-dark-text mb-2">
                      {dict.products[cat.key]}
                    </h3>
                    <p className="text-sm text-section-dark-text/70 leading-relaxed">
                      {dict.products[`${cat.key}Desc`]}
                    </p>
                  </div>
                </div>

                {/* Product items */}
                {cat.products.map((product) => (
                  <div
                    key={product.id}
                    className="group rounded-lg border border-border bg-card p-5 hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="relative h-40 mb-4 bg-muted rounded overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={locale === "zh" ? product.nameZh : product.nameEn}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {locale === "zh" ? product.nameZh : product.nameEn}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {dict.products.detailSpecs}: {product.spec}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
