import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["zh", "en"]
const defaultLocale = "zh"

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || ""
  if (acceptLanguage.includes("zh")) return "zh"
  if (acceptLanguage.includes("en")) return "en"
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip admin routes, api routes, static files
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to default locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!_next|api|admin|images|favicon.ico).*)"],
}
