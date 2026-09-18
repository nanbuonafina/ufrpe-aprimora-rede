import { Instagram, Mail } from 'lucide-react'
import { Container } from './ui/Container'
import { site, coordenacao } from '../data/content'

export function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-ink py-12 text-white/80">
      <Container className="grid gap-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt={`Logotipo do ${site.name}`} className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="font-display text-sm font-semibold text-white">
                {site.name} · {site.shortNucleo}
              </p>
              <p className="text-xs text-white/60">Universidade Federal Rural de Pernambuco — UFRPE</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/60">
            Núcleo de Apoio às Organizações da Sociedade Civil de Assistência Social, em parceria com o
            Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS) e o
            Governo Federal do Brasil.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Coordenação</p>
          <ul className="mt-3 space-y-3">
            {coordenacao.map((c) => (
              <li key={c.email} className="text-xs leading-snug">
                <p className="font-medium text-white">{c.nome}</p>
                <p className="text-white/60">{c.papel}</p>
                <a href={`mailto:${c.email}`} className="text-primary-light hover:underline">
                  {c.email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Contato</p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={`https://instagram.com/${site.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs transition-colors hover:border-white/40 hover:text-white"
            >
              <Instagram size={14} aria-hidden="true" />
              {site.instagramHandle}
            </a>
            <a
              href="mailto:chiara.franca@ufrpe.br"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs transition-colors hover:border-white/40 hover:text-white"
            >
              <Mail size={14} aria-hidden="true" />
              Fale com a coordenação
            </a>
          </div>
        </div>
      </Container>

      <Container className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} {site.name} — {site.shortNucleo}. Todos os direitos reservados.
      </Container>
    </footer>
  )
}
