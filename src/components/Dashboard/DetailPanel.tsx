import { MapPin, Users, Phone, Mail, Building2, BadgeCheck, HandHeart, UserCheck, Home } from 'lucide-react'
import { corDaOsc, municipioInfo, type Osc } from '../../data/oscs'

interface DetailPanelProps {
  osc: Osc | null
  onRequestAssessoria: (osc: Osc) => void
}

export function DetailPanel({ osc, onRequestAssessoria }: DetailPanelProps) {
  if (!osc) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 border-line p-8 text-center md:w-60 md:border-l">
        <MapPin size={28} className="text-ink-faint/60" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-ink-faint">
          Clique em um pin no mapa ou em uma OSC na lista para ver os detalhes.
        </p>
      </div>
    )
  }

  const color = corDaOsc(osc)
  const naoInformado = <span className="font-normal text-ink-faint">Não informado</span>

  return (
    <div className="flex w-full flex-col border-line md:w-60 md:border-l">
      <div className="border-b border-line p-3.5">
        <h4 className="text-sm font-semibold leading-snug text-ink">{osc.nome}</h4>
        {osc.sigla && <p className="mt-0.5 text-[11px] text-ink-soft">{osc.sigla}</p>}
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
          <MapPin size={12} aria-hidden="true" />
          {municipioInfo[osc.municipio].label}
        </p>
      </div>

      <div className="thin-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5 text-xs">
        <DetailRow icon={Users} label="Público atendido">
          {osc.publicos.length === 0 ? (
            naoInformado
          ) : (
            <span className="mt-0.5 flex flex-wrap gap-1">
              {osc.publicos.map((p) => (
                <span
                  key={p}
                  className="inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  {p}
                </span>
              ))}
            </span>
          )}
        </DetailRow>
        <DetailRow icon={HandHeart} label="Tipo de provisão">
          {osc.provisao.length > 0 ? osc.provisao.join(', ') : naoInformado}
        </DetailRow>
        <DetailRow icon={UserCheck} label="Atendidos por ano (aprox.)">
          {osc.atendidosAno != null ? osc.atendidosAno.toLocaleString('pt-BR') : naoInformado}
        </DetailRow>
        <DetailRow icon={Home} label="Endereço">
          {osc.endereco || naoInformado}
        </DetailRow>
        <DetailRow icon={Phone} label="Contato">
          {osc.telefones.length > 0
            ? osc.telefones.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))
            : naoInformado}
        </DetailRow>
        <DetailRow icon={Mail} label="E-mail">
          {osc.emails.length > 0
            ? osc.emails.map((e) => (
                <span key={e} className="block break-all">
                  {e}
                </span>
              ))
            : naoInformado}
        </DetailRow>
        <DetailRow icon={Building2} label="CNPJ">
          {osc.cnpj || naoInformado}
        </DetailRow>
        <DetailRow icon={BadgeCheck} label="Inscrições e certificações">
          <span className="block">CMAS: {osc.cmas}</span>
          <span className="block">CNEAS: {osc.cneas}</span>
          <span className="block">CEBAS: {osc.cebas}</span>
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
      <div className="min-w-0">
        <p className="text-[11px] text-ink-faint">{label}</p>
        <div className="font-medium text-ink">{children}</div>
      </div>
    </div>
  )
}
