import 'leaflet/dist/leaflet.css'
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { tipoServicoInfo, type Osc } from '../../data/oscs'

interface MapViewProps {
  oscs: Osc[]
  selectedId: number | null
  onSelect: (id: number) => void
}

const RMR_CENTER: [number, number] = [-8.06, -34.98]

function FitOnMount() {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  return null
}

export function MapView({ oscs, selectedId, onSelect }: MapViewProps) {
  return (
    <div
      className="relative isolate h-[380px] shrink-0 sm:h-[440px] md:h-auto md:flex-1"
      role="region"
      aria-label="Mapa interativo dos municípios da Região Metropolitana do Recife com a localização das OSCs mapeadas"
    >
      <MapContainer
        center={RMR_CENTER}
        zoom={11}
        minZoom={9}
        maxZoom={17}
        scrollWheelZoom={false}
        className="h-full min-h-[360px] w-full"
        style={{ background: '#DCEBE6' }}
        attributionControl={false}
      >
        <FitOnMount />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {oscs.map((osc) => {
          const isActive = osc.id === selectedId
          const color = tipoServicoInfo[osc.tipo].color
          return (
            <CircleMarker
              key={osc.id}
              center={[osc.lat, osc.lng]}
              radius={isActive ? 10 : 7}
              pathOptions={{
                color: '#fff',
                weight: isActive ? 2.5 : 1.5,
                fillColor: color,
                fillOpacity: 1,
              }}
              eventHandlers={{ click: () => onSelect(osc.id) }}
            >
              <Tooltip direction="top" offset={[0, -6]} className="osc-label-tooltip">
                {osc.nome}
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>

      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded-lg border border-line bg-white/95 px-3 py-2.5 text-[11px] text-ink-soft shadow-card">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-faint">
          Tipo de serviço
        </p>
        <ul className="space-y-1">
          {Object.entries(tipoServicoInfo).map(([key, info]) => (
            <li key={key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: info.color }}
                aria-hidden="true"
              />
              {info.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
