import type { TipoServico, MunicipioSlug } from '../../data/oscs'

export type MunicipioFiltro = MunicipioSlug | 'todos'

export interface DashboardFilters {
  activeTipos: Set<TipoServico>
  activeMunicipio: MunicipioFiltro
  search: string
}
