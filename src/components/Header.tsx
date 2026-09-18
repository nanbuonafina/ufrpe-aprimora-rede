import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './ui/Container'
import { site } from '../data/content'

const NAV_ITEMS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Assessoria', href: '#assessoria' },
  { label: 'Novidades', href: '#novidades' },
  { label: 'Materiais', href: '#materiais' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? 'bg-white/95 shadow-card backdrop-blur' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={`Logotipo do ${site.name}`}
            className="h-10 w-10 rounded-lg object-cover sm:h-12 sm:w-12"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-ink sm:text-lg">
              {site.name}
            </span>
            <span className="text-[11px] text-ink-faint sm:text-xs">
              {site.nucleo}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-base-light hover:text-primary-dark"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#assessoria"
            className="ml-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Solicitar assessoria
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-line bg-white px-5 py-4 md:hidden"
          aria-label="Navegação principal (mobile)"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-base-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#assessoria"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Solicitar assessoria
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
