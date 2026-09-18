import { useMemo, useState } from 'react'
import { BookOpen, Download, FileText, NotebookText } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { materiaisEducativos, type MaterialCategoria } from '../data/content'

type CategoriaFiltro = MaterialCategoria | 'todas'

const CATEGORIAS: MaterialCategoria[] = [
  'Gestão Financeira',
  'Captação de Recursos',
  'Prestação de Contas',
  'Jurídico',
  'Governança',
]

const FORMATO_ICON = {
  PDF: FileText,
  'E-book': BookOpen,
  Cartilha: NotebookText,
} as const

export function MaterialsSection() {
  const [categoria, setCategoria] = useState<CategoriaFiltro>('todas')

  const materiaisFiltrados = useMemo(
    () => (categoria === 'todas' ? materiaisEducativos : materiaisEducativos.filter((m) => m.categoria === categoria)),
    [categoria],
  )

  return (
    <section id="materiais" className="scroll-mt-20 bg-base-light py-20">
      <Container>
        <SectionHeading
          eyebrow="Para as OSCs"
          title="Materiais educativos"
          description="Guias, cartilhas e manuais técnicos para apoiar a gestão, a captação de recursos e a regularização das organizações da sociedade civil."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoria('todas')}
            aria-pressed={categoria === 'todas'}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              categoria === 'todas'
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-white text-ink-soft hover:border-primary hover:text-primary-dark'
            }`}
          >
            Todos os materiais
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              aria-pressed={categoria === cat}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                categoria === cat
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-white text-ink-soft hover:border-primary hover:text-primary-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {materiaisFiltrados.map((material) => {
            const Icon = FORMATO_ICON[material.formato]
            return (
              <div
                key={material.titulo}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-dark">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center rounded-full bg-olive/10 px-2.5 py-1 text-[11px] font-semibold text-olive">
                    {material.categoria}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{material.titulo}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{material.descricao}</p>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-xs text-ink-faint">
                    {material.formato} · {material.paginas} págs.
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    <Download size={13} aria-hidden="true" />
                    Baixar
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Materiais ilustrativos do acervo do NOSCas — em breve disponíveis para download nesta seção.
        </p>
      </Container>
    </section>
  )
}
