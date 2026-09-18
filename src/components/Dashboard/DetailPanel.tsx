import { MapPin, Users, Phone, Mail, Building2, BadgeCheck } from 'lucide-react'
import { municipioInfo, tipoServicoInfo, type Osc } from '../../data/oscs'

interface DetailPanelProps {
  osc: Osc | null
  onRequestAssessoria: (osc: Osc) => void
}

export function DetailPanel({ osc, onRequestAssessoria }: DetailPanelProps) {
  if (!osc) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 border-line p-8 text-center md:w-56 md:border-l">
        <MapPin size={28} className="text-ink-faint/60" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-ink-faint">
          Clique em um pin no mapa ou em uma OSC na lista para ver os detalhes.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col border-line md:w-56 md:border-l">
      <div className="border-b border-line p-3.5">
        <h4 className="text-sm font-semibold leading-snug text-ink">{osc.nome}</h4>
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
          <MapPin size={12} aria-hidden="true" />
          {municipioInfo[osc.municipio].label}
        </p>
      </div>

      <div className="flex-1 space-y-3 p-3.5 text-xs">
        <DetailRow icon={Users} label="Público atendido">
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{
              backgroundColor: `${tipoServicoInfo[osc.tipo].color}22`,
              color: tipoServicoInfo[osc.tipo].color,
            }}
          >
            {tipoServicoInfo[osc.tipo].label}
          </span>
        </DetailRow>
        <DetailRow icon={Phone} label="Contato">
          {osc.telefone}
        </DetailRow>
        <DetailRow icon={Mail} label="E-mail">
          {osc.email}
        </DetailRow>
        <DetailRow icon={Building2} label="CNPJ">
          {osc.cnpj}
        </DetailRow>
        <DetailRow icon={BadgeCheck} label="Situação CNAS">
          {osc.situacaoCnas}
        </DetailRow>
      </div>

      <button
        type="button"
        onClick={() => onRequestAssessoria(osc)}
        className="m-3.5 rounded-lg bg-primary py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Solicitar assessoria para esta OSC
      </button>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-2">
      <Icon size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <p className="text-[11px] text-ink-faint">{label}</p>
        <p className="font-medium text-ink">{children}</p>
      </div>
    </div>
  )
}
