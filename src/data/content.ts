import type { LucideIcon } from 'lucide-react'
import { Scale, HandCoins, Wrench } from 'lucide-react'

export const site = {
  name: 'Aprimora Rede+',
  nucleo: 'UFRPE · Região Metropolitana do Recife',
  shortNucleo: 'NOSCas-RMR',
  instagramHandle: '@aprimorarede.ufrpe',
}

export const hero = {
  tag: 'Região Metropolitana do Recife',
  title: 'Apoio técnico, jurídico e contábil para organizações de assistência social',
  description:
    'O Aprimora Rede+ é uma iniciativa do Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS) e o Governo Federal, que conecta Organizações da Sociedade Civil da Região Metropolitana do Recife ao assessoramento que precisam para fortalecer seus serviços no Sistema Único de Assistência Social (SUAS).',
  primaryCta: 'Solicitar assessoria',
  secondaryCta: 'Conheça o programa',
}

export const partners = ['UFRPE', 'FADURPE', 'Sudene', 'SUAS', 'MDS', 'Governo Federal']

export interface OfferCard {
  icon: LucideIcon
  title: string
  description: string
  tone: 'primary' | 'olive' | 'accent'
}

export const offerCards: OfferCard[] = [
  {
    icon: Scale,
    title: 'Orientação jurídica',
    description:
      'Apoio em questões legais, estatutos, credenciamento no CNAS e regularização junto ao SUAS.',
    tone: 'primary',
  },
  {
    icon: HandCoins,
    title: 'Assessoria contábil',
    description:
      'Suporte em prestação de contas, gestão financeira e mobilização de recursos para as entidades.',
    tone: 'olive',
  },
  {
    icon: Wrench,
    title: 'Assessoria técnica',
    description:
      'Apoio no planejamento, elaboração de projetos e melhoria dos serviços socioassistenciais.',
    tone: 'accent',
  },
]

export const programNumbers = [
  { value: 6, suffix: '', label: 'Metas do programa' },
  { value: 7, suffix: '', label: 'Municípios atendidos' },
  { value: 4, suffix: '+', label: 'Capacitações previstas' },
  { value: 2, suffix: '', label: 'Eventos/seminários' },
  { value: 6, suffix: '+', label: 'Materiais educativos' },
  { value: 20, suffix: '', label: 'OSCs mapeadas na RMR' },
]

export interface Eixo {
  numero: number
  titulo: string
  descricao: string
}

export const eixos: Eixo[] = [
  {
    numero: 1,
    titulo: 'Reordenamento das provisões',
    descricao:
      'Inscrição das OSCs nos conselhos municipais e distrital de assistência social, planos de providências para adequação ao SUAS e apoio técnico na obtenção e renovação da certificação CEBAS.',
  },
  {
    numero: 2,
    titulo: 'Articulação da rede',
    descricao:
      'Fluxos de referência e contrarreferência entre unidades públicas e OSCs, indicadores de efetividade e fortalecimento da vigilância socioassistencial no território.',
  },
  {
    numero: 3,
    titulo: 'Fortalecimento de parcerias',
    descricao:
      'Práticas alinhadas ao Marco Regulatório das Organizações da Sociedade Civil (MROSC) e mobilização de recursos técnicos e financeiros para a sustentabilidade das OSCs.',
  },
  {
    numero: 4,
    titulo: 'Educação permanente',
    descricao:
      'Cursos de aperfeiçoamento, atualização e especialização via ESA-SUAS e parcerias, além de supervisão técnica para profissionais do SUAS.',
  },
  {
    numero: 5,
    titulo: 'Gestão da informação',
    descricao:
      'Acompanhamento da rede socioassistencial do SUAS por meio de boletins periódicos e diálogos sobre vínculo SUAS e Ouvidoria.',
  },
]

export const ods = [
  { numero: 5, titulo: 'Igualdade de gênero' },
  { numero: 10, titulo: 'Redução das desigualdades' },
  { numero: 16, titulo: 'Paz, justiça e instituições eficazes' },
  { numero: 17, titulo: 'Parcerias e meios de implementação' },
]

export const coordenacao = [
  {
    nome: 'Profa. Dra. Chiara Natércia França Araújo',
    papel: 'Coordenadora Técnica · DECON/UFRPE',
    email: 'chiara.franca@ufrpe.br',
  },
  {
    nome: 'Profa. Dra. Maria do Rosário de Fátima Andrade Leitão',
    papel: 'Coordenadora Técnica · DECISO/UFRPE',
    email: 'maria.aleitao@ufrpe.br',
  },
]

export type MaterialCategoria =
  | 'Gestão Financeira'
  | 'Captação de Recursos'
  | 'Prestação de Contas'
  | 'Jurídico'
  | 'Governança'

export interface MaterialEducativo {
  titulo: string
  descricao: string
  categoria: MaterialCategoria
  formato: 'PDF' | 'E-book' | 'Cartilha'
  paginas: number
}

export const materiaisEducativos: MaterialEducativo[] = [
  {
    titulo: 'Cartilha de Gestão Financeira para OSCs',
    descricao: 'Orientações práticas de fluxo de caixa, controles contábeis e organização financeira para pequenas e médias organizações.',
    categoria: 'Gestão Financeira',
    formato: 'Cartilha',
    paginas: 24,
  },
  {
    titulo: 'Guia de Captação de Recursos',
    descricao: 'Estratégias para diversificar fontes de financiamento: editais públicos, parcerias privadas e campanhas de doação.',
    categoria: 'Captação de Recursos',
    formato: 'PDF',
    paginas: 18,
  },
  {
    titulo: 'Manual de Prestação de Contas',
    descricao: 'Passo a passo para prestação de contas de parcerias e convênios, com modelos de relatórios e checklists.',
    categoria: 'Prestação de Contas',
    formato: 'PDF',
    paginas: 32,
  },
  {
    titulo: 'Estatuto Social e Regularização Jurídica',
    descricao: 'Como elaborar e atualizar o estatuto social e manter a documentação da OSC regularizada junto aos órgãos competentes.',
    categoria: 'Jurídico',
    formato: 'E-book',
    paginas: 20,
  },
  {
    titulo: 'Certificação CEBAS: passo a passo',
    descricao: 'Requisitos, documentação e prazos para obtenção e renovação da Certificação de Entidade Beneficente de Assistência Social.',
    categoria: 'Jurídico',
    formato: 'PDF',
    paginas: 16,
  },
  {
    titulo: 'Governança e Conselho Fiscal em OSCs',
    descricao: 'Boas práticas de governança, composição de conselhos e transparência institucional para organizações da sociedade civil.',
    categoria: 'Governança',
    formato: 'E-book',
    paginas: 22,
  },
]

export const assessoriaTipos = ['Jurídica', 'Contábil-financeira', 'Técnica', 'Todas'] as const

export const municipiosFormulario = [
  'Recife',
  'Jaboatão dos Guararapes',
  'Camaragibe',
  'Cabo de Santo Agostinho',
  'São Lourenço da Mata',
] as const
