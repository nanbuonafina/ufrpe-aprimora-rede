import { Building2 } from 'lucide-react'
import { Container } from './ui/Container'
import { partners } from '../data/content'

export function PartnersBar() {
  return (
    <div className="border-b border-line bg-white py-4">
      <Container className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
          Realização e parceria:
        </span>
        {partners.map((partner) => (
          <span
            key={partner}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-medium text-ink-soft"
          >
            {partner === 'UFRPE' && <Building2 size={12} aria-hidden="true" />}
            {partner}
          </span>
        ))}
      </Container>
    </div>
  )
}
