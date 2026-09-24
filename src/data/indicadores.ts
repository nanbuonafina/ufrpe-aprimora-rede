import type { LucideIcon } from 'lucide-react'
import { Landmark, PiggyBank, HeartHandshake, Megaphone, Network } from 'lucide-react'

/**
 * Indicadores de monitoramento do programa, extraídos de
 * `documentos-compartilhados/Indicadores.xlsx` (aba Plan1).
 *
 * Todos os valores são o Marco Zero (T0), em pontos percentuais (0–100).
 * Indicadores com `comparativo: true` são calculados como %T1 − %T0 e só
 * ganham variação quando o segundo ciclo de coleta for publicado.
 */

export interface ItemCategoria {
  label: string
  valor: number
}

interface IndicadorBase {
  id: string
  titulo: string
  calculo: string
  comparativo?: boolean
}

export interface IndicadorPercentual extends IndicadorBase {
  tipo: 'percentual'
  /** Rótulo curto usado nas barras e na tabela. */
  rotulo: string
  valor: number
}

export interface IndicadorCategorias extends IndicadorBase {
  tipo: 'categorias'
  itens: ItemCategoria[]
}

export type NivelConhecimento = 'avancado' | 'intermediario' | 'basico' | 'nenhum'

export interface TemaNiveis {
  tema: string
  niveis: Record<NivelConhecimento, number>
}

export interface IndicadorNiveis extends IndicadorBase {
  tipo: 'niveis'
  temas: TemaNiveis[]
}

export type Indicador = IndicadorPercentual | IndicadorCategorias | IndicadorNiveis

export interface Destaque {
  valor: number
  texto: string
}

export interface EixoIndicadores {
  id: string
  numero: number
  titulo: string
  tituloCurto: string
  objetivo: string
  icon: LucideIcon
  marcosLegais: string[]
  /** Maior força do eixo no T0. */
  forca: Destaque
  /** Maior lacuna do eixo no T0. */
  lacuna: Destaque
  indicadores: Indicador[]
}

export const nivelInfo: Record<NivelConhecimento, { label: string; color: string; textOnFill: string }> = {
  avancado: { label: 'Avançado', color: '#2F3D14', textOnFill: '#FFFFFF' },
  intermediario: { label: 'Intermediário', color: '#4E6230', textOnFill: '#FFFFFF' },
  basico: { label: 'Básico', color: '#71884A', textOnFill: '#FFFFFF' },
  nenhum: { label: 'Nenhum', color: '#A3B47E', textOnFill: '#2E2013' },
}

export const NIVEIS: NivelConhecimento[] = ['avancado', 'intermediario', 'basico', 'nenhum']

const CALC_TIPIFICADOS = 'Nº de OSC que ofertam ÷ Nº total de respondentes × 100'

export const eixosIndicadores: EixoIndicadores[] = [
  {
    id: 'gestao',
    numero: 1,
    titulo: 'Gestão e regularização institucional',
    tituloCurto: 'Gestão',
    objetivo:
      'Apoiar a ampliação da capacidade institucional das OSCs quanto à gestão, regularização, formalização e cumprimento das normativas.',
    icon: Landmark,
    marcosLegais: [
      'Lei nº 187, de 16/12/2021 (CEBAS)',
      'Portaria MDS de 29/12/2023 (CEBAS)',
      'Resolução CNAS de 14/05/2014',
      'Resolução CMAS nº 182, de 13/02/2025',
    ],
    forca: { valor: 94, texto: 'das OSCs estão inscritas no CMAS' },
    lacuna: { valor: 22, texto: 'possuem certificação CEBAS' },
    indicadores: [
      {
        id: 'cmas',
        tipo: 'percentual',
        titulo: '% de OSC com CMAS',
        rotulo: 'Inscritas no CMAS',
        valor: 94,
        calculo: 'Nº de OSC inscritas no CMAS ÷ Nº total de OSC × 100',
      },
      {
        id: 'capacitacao',
        tipo: 'percentual',
        titulo: '% de OSC com cursos de capacitação/educação permanente',
        rotulo: 'Capacitação / educação permanente',
        valor: 65,
        calculo: 'Nº de OSC que declararam participação ÷ Nº total de OSC × 100',
      },
      {
        id: 'cneas',
        tipo: 'percentual',
        titulo: '% de OSC com CNEAS',
        rotulo: 'Cadastradas no CNEAS',
        valor: 59,
        calculo: 'Nº de OSC com CNEAS ÷ Nº total de OSC × 100',
      },
      {
        id: 'contabil',
        tipo: 'percentual',
        titulo: '% de OSC com assessoramento contábil',
        rotulo: 'Assessoramento contábil',
        valor: 51,
        calculo: 'Nº de OSC com assessoria contábil ÷ Nº total de OSC × 100',
      },
      {
        id: 'juridico',
        tipo: 'percentual',
        titulo: '% de OSC com assessoramento jurídico',
        rotulo: 'Assessoramento jurídico',
        valor: 47,
        calculo: 'Nº de OSC com assessoria jurídica ÷ Nº total de OSC × 100',
      },
      {
        id: 'gestao-tecnica',
        tipo: 'percentual',
        titulo: '% de OSC com assessoramento técnico em gestão',
        rotulo: 'Assessoramento técnico em gestão',
        valor: 31,
        calculo: 'Nº de OSC com apoio técnico ÷ Nº total de OSC × 100',
      },
      {
        id: 'cebas',
        tipo: 'percentual',
        titulo: '% de OSC com CEBAS',
        rotulo: 'Certificadas com CEBAS',
        valor: 22,
        calculo: 'Nº de OSC com CEBAS ÷ Nº total de OSC × 100',
      },
      {
        id: 'conhecimento',
        tipo: 'niveis',
        titulo: 'Nível de conhecimento sobre SUAS, PNAS, CEBAS e normativas',
        calculo:
          'Taxa de evolução = Nº de OSC que passaram para um nível mais avançado ÷ Nº de OSC avaliadas × 100',
        comparativo: true,
        temas: [
          { tema: 'SUAS', niveis: { avancado: 12, intermediario: 40, basico: 43, nenhum: 5 } },
          { tema: 'PNAS', niveis: { avancado: 8, intermediario: 37, basico: 35, nenhum: 18 } },
          { tema: 'CEBAS', niveis: { avancado: 9, intermediario: 12, basico: 54, nenhum: 23 } },
          { tema: 'Normativas', niveis: { avancado: 6, intermediario: 35, basico: 45, nenhum: 9 } },
        ],
      },
    ],
  },
  {
    id: 'financeiro',
    numero: 2,
    titulo: 'Gestão financeira e sustentabilidade',
    tituloCurto: 'Financeiro',
    objetivo:
      'Fortalecer a capacidade institucional das OSCs quanto ao planejamento financeiro, diversificação de fontes de financiamento, captação e utilização de recursos e prestação de contas.',
    icon: PiggyBank,
    marcosLegais: [],
    forca: { valor: 78, texto: 'utilizam os recursos conforme o plano de trabalho' },
    lacuna: { valor: 12.5, texto: 'acessam subvenção federal' },
    indicadores: [
      {
        id: 'plano-trabalho',
        tipo: 'percentual',
        titulo: '% de OSCs que utilizam recursos conforme plano de trabalho',
        rotulo: 'Usam recursos conforme o plano',
        valor: 78,
        calculo: 'Nº de OSC que responderam “sim” ÷ Nº total de respondentes × 100',
      },
      {
        id: 'fontes-financiamento',
        tipo: 'categorias',
        titulo: 'Fontes de financiamento utilizadas',
        calculo: 'Variação de financiamento = %T1 − %T0',
        comparativo: true,
        itens: [
          { label: 'Doação de pessoa física', valor: 62.5 },
          { label: 'Doação de pessoa jurídica', valor: 39.1 },
          { label: 'Recursos próprios', valor: 31.2 },
          { label: 'Subvenção municipal', valor: 31.2 },
          { label: 'Doação internacional', valor: 18.8 },
          { label: 'Subvenção estadual', valor: 17.2 },
          { label: 'Mensalidade', valor: 17.2 },
          { label: 'Subvenção federal', valor: 12.5 },
          // Mantido como na planilha; confirmar com a equipe se é de fato uma fonte.
          { label: 'Certificação CEBAS', valor: 7.8 },
        ],
      },
    ],
  },
  {
    id: 'servicos',
    numero: 3,
    titulo: 'Provisão de serviços e oferta socioassistencial',
    tituloCurto: 'Serviços',
    objetivo: 'Qualificar a oferta dos serviços socioassistenciais.',
    icon: HeartHandshake,
    marcosLegais: ['Tipificação Nacional de Serviços Socioassistenciais'],
    forca: { valor: 54, texto: 'ofertam o Serviço de Convivência (SCFV)' },
    lacuna: { valor: 5, texto: 'atuam em calamidades públicas e emergências' },
    indicadores: [
      {
        id: 'psb',
        tipo: 'categorias',
        titulo: 'Proteção Social Básica',
        calculo: CALC_TIPIFICADOS,
        itens: [
          { label: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)', valor: 54 },
          { label: 'PSB no domicílio', valor: 8 },
        ],
      },
      {
        id: 'pse-media',
        tipo: 'categorias',
        titulo: 'Proteção Social Especial — Média Complexidade',
        calculo: CALC_TIPIFICADOS,
        itens: [
          { label: 'PSE para pessoas com deficiência e idosas (Centro Dia)', valor: 11 },
          { label: 'Abordagem social', valor: 8 },
        ],
      },
      {
        id: 'pse-alta',
        tipo: 'categorias',
        titulo: 'Proteção Social Especial — Alta Complexidade',
        calculo: CALC_TIPIFICADOS,
        itens: [
          { label: 'Serviço de acolhimento', valor: 18 },
          { label: 'Situações de calamidade pública e emergência', valor: 5 },
        ],
      },
    ],
  },
  {
    id: 'comunicacao',
    numero: 4,
    titulo: 'Comunicação institucional e territorial',
    tituloCurto: 'Comunicação',
    objetivo:
      'Fortalecer as estratégias de comunicação institucional, favorecendo maior visibilidade e poder de alcance no território de ação.',
    icon: Megaphone,
    marcosLegais: [],
    forca: { valor: 80, texto: 'se comunicam com o público por meios digitais' },
    lacuna: { valor: 12, texto: 'se comunicam via instituições parceiras da rede' },
    indicadores: [
      {
        id: 'comunicacao-publico',
        tipo: 'categorias',
        titulo: 'Formas de comunicação com o público foco',
        calculo: 'Variação de comunicação = %T1 − %T0',
        comparativo: true,
        itens: [
          { label: 'Meios digitais', valor: 80 },
          { label: 'Contato direto e apresentação em público', valor: 74 },
          { label: 'Instituições parceiras da rede', valor: 12 },
        ],
      },
      {
        id: 'divulgacao',
        tipo: 'categorias',
        titulo: 'Formas de divulgação da instituição',
        calculo: 'Variação de divulgação = %T1 − %T0',
        comparativo: true,
        itens: [
          { label: 'Meios digitais', valor: 78 },
          { label: 'Contato e apresentação em público', valor: 77 },
          { label: 'Rádio, TV, jornais e blogs', valor: 26 },
          { label: 'Portal ou site da instituição', valor: 21 },
          { label: 'Materiais impressos', valor: 20 },
          { label: 'Instituições parceiras da rede', valor: 9 },
        ],
      },
    ],
  },
  {
    id: 'rede',
    numero: 5,
    titulo: 'Encaminhamentos e acompanhamento',
    tituloCurto: 'Rede',
    objetivo:
      'Fortalecer a articulação em rede das OSCs, qualificando o fluxo de encaminhamento e acompanhamento e o processo de referência e contrarreferência.',
    icon: Network,
    marcosLegais: [],
    forca: { valor: 78, texto: 'acompanham os encaminhamentos que realizam' },
    lacuna: { valor: 15, texto: 'recebem contrarreferência/devolutiva da rede' },
    indicadores: [
      {
        id: 'encaminham',
        tipo: 'percentual',
        titulo: '% de OSCs que realizam encaminhamento para a Rede Socioassistencial e/ou de Proteção Social',
        rotulo: 'Realizam encaminhamentos',
        valor: 62,
        calculo: 'OSC que realizam encaminhamentos ÷ OSC respondentes × 100',
      },
      {
        id: 'acompanham',
        tipo: 'percentual',
        titulo: '% de OSCs que acompanham os encaminhamentos realizados',
        rotulo: 'Acompanham os encaminhamentos',
        valor: 78,
        calculo: 'OSC que acompanham ÷ OSC que realizam encaminhamentos × 100',
      },
      {
        id: 'formas-acompanhamento',
        tipo: 'categorias',
        titulo: 'Formas de acompanhamento dos encaminhamentos',
        calculo: 'Variação de acompanhamento = %T1 − %T0',
        comparativo: true,
        itens: [
          { label: 'Contato direto com usuários/famílias', valor: 45 },
          { label: 'Articulação e monitoramento junto à rede', valor: 45 },
          { label: 'Registros e documentação', valor: 27 },
          { label: 'Visitas e acompanhamento presencial', valor: 27 },
          { label: 'Contrarreferência/devolutiva da rede', valor: 15 },
        ],
      },
    ],
  },
]

export const totalIndicadores = eixosIndicadores.reduce((n, e) => n + e.indicadores.length, 0)

/** Valores de primeiro nível do eixo, na ordem da planilha — usados no mini-gráfico dos cards. */
export function serieResumo(eixo: EixoIndicadores): number[] {
  return eixo.indicadores.flatMap((ind) => {
    if (ind.tipo === 'percentual') return [ind.valor]
    if (ind.tipo === 'categorias') return ind.itens.map((i) => i.valor)
    return []
  })
}

export function formatPct(valor: number): string {
  return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}
