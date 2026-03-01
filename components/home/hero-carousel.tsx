"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"

interface Slide {
  image: string
  title: string
  subtitle: string
  cta: string
  href: string
}

interface HeroCarouselProps {
  locale: Locale
  dict: Record<string, string>
}

export default function HeroCarousel({ locale, dict }: HeroCarouselProps) {
  const slides: Slide[] = [
    {
      image: "/images/hero-1.jpg",
      title: dict.banner1Title,
      subtitle: dict.banner1Subtitle,
      cta: dict.banner1Cta,
      href: `/${locale}/about`,
    },
    {
      image: "/images/hero-2.jpg",
      title: dict.banner2Title,
      subtitle: dict.banner2Subtitle,
      cta: dict.banner2Cta,
      href: `/${locale}/products`,
    },
    {
      image: "/images/hero-3.jpg",
      title: dict.banner3Title,
      subtitle: dict.banner3Subtitle,
      cta: dict.banner3Cta,
      href: `/${locale}/contact`,
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-primary-dark/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl w-full px-4">
              <div
                className={`max-w-2xl transition-all duration-700 ${
                  index === current
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-section-dark-text leading-tight text-balance mb-4">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-section-dark-text/80 leading-relaxed mb-8 max-w-xl text-pretty">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-section-dark-text font-medium rounded hover:bg-accent-light transition-colors"
                >
                  {slide.cta}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-section-dark-text/20 text-section-dark-text hover:bg-section-dark-text/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-section-dark-text/20 text-section-dark-text hover:bg-section-dark-text/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current
                ? "w-8 bg-accent"
                : "w-2.5 bg-section-dark-text/40 hover:bg-section-dark-text/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
