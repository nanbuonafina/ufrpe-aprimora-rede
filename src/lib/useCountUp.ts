import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` once the returned ref enters the
 * viewport. Respects prefers-reduced-motion by jumping straight to target.
 */
export function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = () => {
      if (started.current) return
      started.current = true

      if (prefersReducedMotion) {
        setValue(target)
        return
      }

      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) animate()
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, durationMs])

  return { value, ref }
}
