import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { municipioInfo, tipoServicoInfo, type Osc } from '../../data/oscs'

export function StatsCharts({ oscs }: { oscs: Osc[] }) {
  const byTipo = Object.entries(tipoServicoInfo).map(([key, info]) => ({
    key,
    label: info.label,
    color: info.color,
    total: oscs.filter((o) => o.tipo === key).length,
  }))

  const byMunicipio = Object.entries(municipioInfo).map(([key, info]) => ({
    key,
    label: info.label,
    total: oscs.filter((o) => o.municipio === key).length,
  }))

  return (
    <div className="grid gap-6 border-t border-line bg-surface-soft p-5 sm:grid-cols-3">
      <ChartCard title="OSCs por tipo de serviço atendido" className="sm:col-span-1">
        <ResponsiveContainer width="100%" height={200}>
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
          <BarChart data={byMunicipio} margin={{ top: 8, left: 24, right: 12, bottom: 4 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: '#5B4636' }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-40}
              textAnchor="end"
              height={90}
            />
            <YAxis hide allowDecimals={false} />
            <Tooltip
              cursor={{ fill: 'rgba(87,105,53,0.08)' }}
              contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#E4D2C0' }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={24} fill="#C9642E" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function ChartCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">{title}</h4>
      {children}
    </div>
  )
}
