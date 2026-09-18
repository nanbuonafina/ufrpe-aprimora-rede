export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} animate-fade-up`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          light ? 'text-accent' : 'text-primary'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-2 text-2xl font-semibold sm:text-3xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base leading-relaxed ${light ? 'text-white/85' : 'text-ink-soft'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
