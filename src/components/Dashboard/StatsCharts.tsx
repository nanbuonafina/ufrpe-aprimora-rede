import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { municipioInfo, tipoServicoInfo, type Osc, type TipoServico } from '../../data/oscs'

export function StatsCharts({ oscs }: { oscs: Osc[] }) {
  const byTipo = Object.entries(tipoServicoInfo).map(([key, info]) => ({
    key,
    label: info.label,
    color: info.color,
    total: oscs.filter((o) => o.grupos.includes(key as TipoServico)).length,
  }))

  const byMunicipio = Object.entries(municipioInfo).map(([key, info]) => ({
    key,
    label: info.label,
    total: oscs.filter((o) => o.municipio === key).length,
  }))

  return (
    <div className="grid gap-6 border-t border-line bg-surface-soft p-5 sm:grid-cols-3">
      <ChartCard
        title="OSCs por público atendido"
        note="Uma OSC pode atender mais de um público."
        className="sm:col-span-1"
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={byTipo} layout="vertical" margin={{ left: 8, right: 16 }}>
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="label"
              width={130}
              tick={{ fontSize: 11, fill: '#5B4636' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(201,100,46,0.08)' }}
              contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#E4D2C0' }}
            />
            <Bar dataKey="total" radius={[0, 6, 6, 0]} barSize={16}>
              {byTipo.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="OSCs por município" className="sm:col-span-2">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byMunicipio} margin={{ top: 20, left: 12, right: 12, bottom: 4 }}>
            <XAxis
              dataKey="label"
              tick={<MunicipioTick />}
              axisLine={{ stroke: '#E4D2C0' }}
              tickLine={false}
              interval={0}
              height={52}
            />
            <YAxis hide allowDecimals={false} />
            <Tooltip
              cursor={{ fill: 'rgba(87,105,53,0.08)' }}
              contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#E4D2C0' }}
            />
            <Bar dataKey="total" name="OSCs" radius={[6, 6, 0, 0]} maxBarSize={56} fill="#C9642E">
              <LabelList dataKey="total" position="top" style={{ fontSize: 12, fontWeight: 600, fill: '#A94722' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

/** Rótulo horizontal do eixo X, quebrado em até duas linhas para nomes longos. */
function MunicipioTick({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const lines = wrapLabel(payload?.value ?? '', 14)
  return (
    <text x={x} y={y + 16} textAnchor="middle" fontSize={12} fontWeight={500} fill="#5B4636">
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 15}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

function wrapLabel(text: string, maxChars: number): string[] {
  const lines: string[] = []
  let current = ''
  for (const word of text.split(' ')) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current && lines.length === 0) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines
}

function ChartCard({
  title,
  note,
  children,
  className = '',
}: {
  title: string
  note?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">{title}</h4>
      {children}
      {note && <p className="mt-1 text-[11px] text-ink-faint">{note}</p>}
    </div>
  )
}
