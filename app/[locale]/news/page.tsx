import Link from "next/link"
import { getDictionary, type Locale } from "@/lib/i18n"
import PageBanner from "@/components/ui/page-banner"
import { Calendar, ArrowRight } from "lucide-react"

const articles = [
  {
    id: "1",
    titleZh: "\u6CD3\u57FA\u91D1\u5C5E\u53C2\u52A0\u4E2D\u56FD\u56FD\u9645\u77F3\u6CB9\u77F3\u5316\u6280\u672F\u88C5\u5907\u5C55\u89C8\u4F1A",
    titleEn: "Hongji Metal Participates in China International Petrochemical Technology Exhibition",
    summaryZh: "\u6CD3\u57FA\u91D1\u5C5E\u643A\u65B0\u4EA7\u54C1\u4EAE\u76F8cippe2024\u5C55\u4F1A\uff0C\u5C55\u793A\u516C\u53F8\u6700\u65B0\u7684\u9884\u5236\u4EF6\u548C\u5BF9\u7118\u7BA1\u4EF6\u4EA7\u54C1\uff0C\u53D7\u5230\u56FD\u5185\u5916\u5BA2\u6237\u5E7F\u6CDB\u5173\u6CE8\u3002",
    summaryEn: "Hongji Metal showcased new products at cippe2024, presenting the latest prefabricated parts and butt weld fittings, attracting wide attention from domestic and international clients.",
    date: "2024-03-15",
    category: "news",
  },
  {
    id: "2",
    titleZh: "\u4E0D\u9508\u94A2\u7BA1\u4EF6\u7684\u5E38\u7528\u6750\u8D28\u53CA\u5176\u9002\u7528\u573A\u666F",
    titleEn: "Common Materials for Stainless Steel Pipe Fittings and Their Applications",
    summaryZh: "\u4ECB\u7ECD304\u3001316L\u3001321\u3001310S\u7B49\u5E38\u7528\u4E0D\u9508\u94A2\u6750\u8D28\u7684\u5316\u5B66\u6210\u5206\u3001\u529B\u5B66\u6027\u80FD\u53CA\u5178\u578B\u5E94\u7528\u573A\u666F\u3002",
    summaryEn: "Introduction to the chemical composition, mechanical properties and typical applications of commonly used stainless steel materials such as 304, 316L, 321, and 310S.",
    date: "2024-02-28",
    category: "knowledge",
  },
  {
    id: "3",
    titleZh: "\u516C\u53F8\u987A\u5229\u901A\u8FC7ISO9001:2015\u8D28\u91CF\u7BA1\u7406\u4F53\u7CFB\u5BA1\u6838",
    titleEn: "Company Successfully Passes ISO9001:2015 Quality Management System Audit",
    summaryZh: "\u6CD3\u57FA\u91D1\u5C5E\u987A\u5229\u901A\u8FC7\u5E74\u5EA6ISO9001:2015\u8D28\u91CF\u7BA1\u7406\u4F53\u7CFB\u76D1\u7763\u5BA1\u6838\uff0C\u4F53\u73B0\u4E86\u516C\u53F8\u5BF9\u4EA7\u54C1\u8D28\u91CF\u7684\u4E00\u8D2F\u8FFD\u6C42\u3002",
    summaryEn: "Hongji Metal successfully passed the annual ISO9001:2015 quality management system surveillance audit, demonstrating the company's consistent pursuit of product quality.",
    date: "2024-01-20",
    category: "news",
  },
  {
    id: "4",
    titleZh: "\u5BF9\u7118\u6CD5\u5170\u4E0E\u5E73\u7118\u6CD5\u5170\u7684\u533A\u522B\u53CA\u9009\u7528\u6307\u5357",
    titleEn: "Differences Between Weld Neck and Slip-On Flanges: A Selection Guide",
    summaryZh: "\u8BE6\u7EC6\u5BF9\u6BD4\u5BF9\u7118\u6CD5\u5170\u548C\u5E73\u7118\u6CD5\u5170\u7684\u7ED3\u6784\u7279\u70B9\u3001\u9002\u7528\u538B\u529B\u3001\u5B89\u88C5\u8981\u6C42\u7B49\uff0C\u5E2E\u52A9\u60A8\u9009\u62E9\u5408\u9002\u7684\u6CD5\u5170\u7C7B\u578B\u3002",
    summaryEn: "Detailed comparison of structural features, applicable pressures, and installation requirements of weld neck vs slip-on flanges to help you choose the right type.",
    date: "2024-01-10",
    category: "knowledge",
  },
  {
    id: "5",
    titleZh: "2024\u5E74\u4E0D\u9508\u94A2\u7BA1\u4EF6\u884C\u4E1A\u53D1\u5C55\u8D8B\u52BF\u5206\u6790",
    titleEn: "2024 Stainless Steel Pipe Fittings Industry Development Trend Analysis",
    summaryZh: "\u5206\u6790\u5F53\u524D\u4E0D\u9508\u94A2\u7BA1\u4EF6\u884C\u4E1A\u7684\u5E02\u573A\u73B0\u72B6\u3001\u6280\u672F\u521B\u65B0\u65B9\u5411\u53CA\u672A\u6765\u53D1\u5C55\u8D8B\u52BF\u3002",
    summaryEn: "Analysis of the current market status, technological innovation directions, and future development trends of the stainless steel pipe fittings industry.",
    date: "2023-12-20",
    category: "industry",
  },
]

const categoryTabs = [
  { key: "all", labelKey: "all" },
  { key: "news", labelKey: "categoryNews" },
  { key: "knowledge", labelKey: "categoryKnowledge" },
  { key: "industry", labelKey: "categoryIndustry" },
]

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale } = await params
  const { category: activeTab } = await searchParams
  const dict = await getDictionary(locale as Locale)
  const currentTab = activeTab || "all"

  const filtered = currentTab === "all"
    ? articles
    : articles.filter((a) => a.category === currentTab)

  return (
    <>
      <PageBanner
        title={dict.news.pageTitle}
        breadcrumbs={[{ label: dict.news.breadcrumb }]}
        locale={locale as Locale}
      />

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categoryTabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.key === "all" ? `/${locale}/news` : `/${locale}/news?category=${tab.key}`}
                className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
                  currentTab === tab.key
                    ? "bg-primary text-section-dark-text"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {tab.key === "all" ? (locale === "zh" ? "\u5168\u90E8" : "All") : dict.news[tab.labelKey]}
              </Link>
            ))}
          </div>

          {/* Articles */}
          <div className="space-y-6">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="group rounded-lg border border-border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                        {article.category === "news" ? dict.news.categoryNews
                          : article.category === "knowledge" ? dict.news.categoryKnowledge
                          : dict.news.categoryIndustry}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {locale === "zh" ? article.titleZh : article.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {locale === "zh" ? article.summaryZh : article.summaryEn}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary shrink-0 self-end sm:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {dict.common.readMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              {dict.common.noData}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
