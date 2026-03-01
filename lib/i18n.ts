export const locales = ["zh", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "zh"

const dictionaries = {
  zh: () => import("@/lib/dictionaries/zh.json").then((m) => m.default),
  en: () => import("@/lib/dictionaries/en.json").then((m) => m.default),
}

export async function getDictionary(locale: Locale) {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]()
  }
  return dictionaries[locale]()
}
