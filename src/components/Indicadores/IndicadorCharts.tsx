import { Clock } from 'lucide-react'
import {
  NIVEIS,
  formatPct,
  nivelInfo,
  type IndicadorCategorias,
  type IndicadorNiveis,
  type IndicadorPercentual,
  type ItemCategoria,
} from '../../data/indicadores'

/** Barras horizontais de série única: uma cor, valor na ponta, trilho recessivo. */
export function BarList({ items }: { items: ItemCategoria[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm leading-snug text-ink-soft">{item.label}</span>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
              {formatPct(item.valor)}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 rounded-r bg-base-light" aria-hidden="true">
            <div
              className="h-full rounded-r bg-primary"
              style={{ width: `${Math.min(item.valor, 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Um único percentual não vira gráfico de uma barra: vira um stat tile. */
export function StatTile({ indicador }: { indicador: IndicadorPercentual }) {
  return (
    <div className="rounded-xl border border-line bg-surface-soft px-5 py-4">
      <span className="block font-sans text-4xl font-semibold text-ink">
        {formatPct(indicador.valor)}
      </span>
      <span className="mt-1 block text-sm text-ink-soft">{indicador.rotulo}</span>
    </div>
  )
}

/** Barras empilhadas 100% para os níveis de conhecimento (escala ordinal oliva). */
export function StackedLevels({ indicador }: { indicador: IndicadorNiveis }) {
  return (
    <div>
      <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-soft" aria-label="Legenda">
        {NIVEIS.map((nivel) => (
          <li key={nivel} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: nivelInfo[nivel].color }} />
            {nivelInfo[nivel].label}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-line bg-base-light" />
          Não informado
        </li>
      </ul>

      <ul className="space-y-3">
        {indicador.temas.map(({ tema, niveis }) => {
          const resumo = NIVEIS.map((n) => `${nivelInfo[n].label} ${formatPct(niveis[n])}`).join(', ')
          return (
            <li key={tema} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
              <span className="text-sm font-medium text-ink">{tema}</span>
              <div
                className="flex h-6 gap-[2px] overflow-hidden rounded bg-base-light"
                role="img"
                aria-label={`${tema}: ${resumo}`}
              >
                {NIVEIS.map((nivel) => {
                  const valor = niveis[nivel]
                  const info = nivelInfo[nivel]
                  return (
                    <div
                      key={nivel}
                      title={`${tema} · ${info.label}: ${formatPct(valor)}`}
                      className="flex items-center justify-center text-[11px] font-semibold"
                      style={{ width: `${valor}%`, backgroundColor: info.color, color: info.textOnFill }}
                    >
                      {/* Rótulo só entra quando cabe; 12–14% só a partir de sm. */}
                      {valor >= 15 ? formatPct(valor) : valor >= 12 ? <span className="hidden sm:inline">{formatPct(valor)}</span> : null}
                    </div>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ComparativoBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
      <Clock size={11} aria-hidden="true" />
      Comparação T0 → T1 em breve
    </span>
  )
}

export function Calculo({ texto }: { texto: string }) {
  return (
    <details className="group mt-3 text-xs text-ink-faint">
      <summary className="cursor-pointer select-none hover:text-ink-soft">Como é calculado</summary>
      <p className="mt-1 leading-relaxed text-ink-soft">{texto}</p>
    </details>
  )
}

/* ---------- Visão em tabela (equivalente acessível de cada gráfico) ---------- */

const th = 'border-b border-line px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint'
const td = 'border-b border-line/60 px-3 py-2 text-left text-sm text-ink-soft'
const tdNum = `${td} text-right font-semibold tabular-nums text-ink`

export function TablePercentuais({ caption, indicadores }: { caption: string; indicadores: IndicadorPercentual[] }) {
  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className={th}>Indicador</th>
          <th scope="col" className={`${th} text-right`}>T0</th>
          <th scope="col" className={`${th} hidden md:table-cell`}>Cálculo</th>
        </tr>
      </thead>
      <tbody>
        {indicadores.map((ind) => (
          <tr key={ind.id}>
            <th scope="row" className={`${td} font-normal`}>{ind.titulo}</th>
            <td className={tdNum}>{formatPct(ind.valor)}</td>
            <td className={`${td} hidden text-xs md:table-cell`}>{ind.calculo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function TableCategorias({ indicador }: { indicador: IndicadorCategorias }) {
  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">{indicador.titulo}</caption>
      <thead>
        <tr>
          <th scope="col" className={th}>Categoria</th>
          <th scope="col" className={`${th} text-right`}>T0</th>
        </tr>
      </thead>
      <tbody>
        {indicador.itens.map((item) => (
          <tr key={item.label}>
            <th scope="row" className={`${td} font-normal`}>{item.label}</th>
            <td className={tdNum}>{formatPct(item.valor)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function TableNiveis({ indicador }: { indicador: IndicadorNiveis }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse">
        <caption className="sr-only">{indicador.titulo}</caption>
        <thead>
          <tr>
            <th scope="col" className={th}>Tema</th>
            {NIVEIS.map((n) => (
              <th key={n} scope="col" className={`${th} text-right`}>{nivelInfo[n].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {indicador.temas.map(({ tema, niveis }) => (
            <tr key={tema}>
              <th scope="row" className={`${td} font-medium text-ink`}>{tema}</th>
              {NIVEIS.map((n) => (
                <td key={n} className={tdNum}>{formatPct(niveis[n])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
