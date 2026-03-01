interface SectionHeadingProps {
  title: string
  subtitle?: string
  light?: boolean
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-10 lg:mb-14 ${className}`}>
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-balance ${
          light ? "text-section-dark-text" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mx-auto mt-3 h-1 w-16 rounded ${
          light ? "bg-accent" : "bg-primary"
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl mx-auto text-base leading-relaxed ${
            light ? "text-section-dark-text/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
