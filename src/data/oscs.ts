export type TipoServico =
  | 'crianca'
  | 'idoso'
  | 'mulher'
  | 'pessoa_rua'
  | 'deficiencia'

export type MunicipioSlug =
  | 'recife'
  | 'olinda'
  | 'jaboatao'
  | 'paulista'
  | 'cabo'
  | 'camaragibe'
  | 'sao_lourenco'
  | 'abreu_e_lima'
  | 'igarassu'
  | 'itapissuma'
  | 'itamaraca'
  | 'moreno'
  | 'aracoiaba'
  | 'ipojuca'

export interface Osc {
  id: number
  nome: string
  municipio: MunicipioSlug
  tipo: TipoServico
  bairro: string
  telefone: string
  email: string
  cnpj: string
  situacaoCnas: string
  /** Coordenadas geográficas reais (WGS84) usadas no mapa interativo */
  lat: number
  lng: number
}

export const tipoServicoInfo: Record<TipoServico, { label: string; color: string }> = {
  crianca: { label: 'Criança e adolescente', color: '#1D9E75' },
  idoso: { label: 'Idoso', color: '#378ADD' },
  mulher: { label: 'Mulher', color: '#D4537E' },
  pessoa_rua: { label: 'Pop. em situação de rua', color: '#BA7517' },
  deficiencia: { label: 'Pessoa com deficiência', color: '#7F77DD' },
}

/** Municípios oficiais da Região Metropolitana do Recife (RMR), com centro geográfico aproximado. */
export const municipioInfo: Record<MunicipioSlug, { label: string; lat: number; lng: number }> = {
  recife: { label: 'Recife', lat: -8.0476, lng: -34.877 },
  olinda: { label: 'Olinda', lat: -7.9936, lng: -34.8551 },
  jaboatao: { label: 'Jaboatão dos Guararapes', lat: -8.1128, lng: -35.0148 },
  paulista: { label: 'Paulista', lat: -7.9407, lng: -34.8728 },
  cabo: { label: 'Cabo de Santo Agostinho', lat: -8.2909, lng: -35.0353 },
  camaragibe: { label: 'Camaragibe', lat: -8.0217, lng: -34.9808 },
  sao_lourenco: { label: 'São Lourenço da Mata', lat: -7.9967, lng: -35.0136 },
  abreu_e_lima: { label: 'Abreu e Lima', lat: -7.9075, lng: -34.9014 },
  igarassu: { label: 'Igarassu', lat: -7.8339, lng: -34.9061 },
  itapissuma: { label: 'Itapissuma', lat: -7.7758, lng: -34.8944 },
  itamaraca: { label: 'Ilha de Itamaracá', lat: -7.7475, lng: -34.8264 },
  moreno: { label: 'Moreno', lat: -8.1183, lng: -35.0906 },
  aracoiaba: { label: 'Araçoiaba', lat: -8.0128, lng: -35.1197 },
  ipojuca: { label: 'Ipojuca', lat: -8.4034, lng: -35.0631 },
}

export const oscs: Osc[] = [
  { id: 1, nome: 'Assoc. Criança Esperança', municipio: 'recife', tipo: 'crianca', bairro: 'Casa Amarela', telefone: '(81) 9 9100-0001', email: 'criancaesperanca@osc.org', cnpj: '12.345.678/0001-01', situacaoCnas: 'Registrada', lat: -8.0296, lng: -34.9188 },
  { id: 2, nome: 'Lar dos Idosos São José', municipio: 'recife', tipo: 'idoso', bairro: 'Boa Vista', telefone: '(81) 9 9100-0002', email: 'larsaojose@osc.org', cnpj: '12.345.678/0001-02', situacaoCnas: 'Certificada CEBAS', lat: -8.0631, lng: -34.8837 },
  { id: 3, nome: 'Casa da Mulher Nordestina', municipio: 'recife', tipo: 'mulher', bairro: 'Afogados', telefone: '(81) 9 9100-0003', email: 'casawoman@osc.org', cnpj: '12.345.678/0001-03', situacaoCnas: 'Em renovação', lat: -8.0813, lng: -34.9107 },
  { id: 4, nome: 'Centro Recomeço — Pop. Rua', municipio: 'recife', tipo: 'pessoa_rua', bairro: 'Santo Amaro', telefone: '(81) 9 9100-0004', email: 'recomeco@osc.org', cnpj: '12.345.678/0001-04', situacaoCnas: 'Registrada', lat: -8.0546, lng: -34.8783 },
  { id: 5, nome: 'Inst. Florescer — Autismo', municipio: 'recife', tipo: 'deficiencia', bairro: 'Graças', telefone: '(81) 9 9100-0005', email: 'florescer@osc.org', cnpj: '12.345.678/0001-05', situacaoCnas: 'Registrada', lat: -8.0466, lng: -34.9004 },
  { id: 6, nome: 'Assoc. Jov. Construindo', municipio: 'recife', tipo: 'crianca', bairro: 'Ibura', telefone: '(81) 9 9100-0006', email: 'jovconstruindo@osc.org', cnpj: '12.345.678/0001-06', situacaoCnas: 'Em processo', lat: -8.1122, lng: -34.9384 },
  { id: 7, nome: 'Projeto Acolher Recife', municipio: 'recife', tipo: 'pessoa_rua', bairro: 'Derby', telefone: '(81) 9 9100-0007', email: 'acolherrecife@osc.org', cnpj: '12.345.678/0001-07', situacaoCnas: 'Registrada', lat: -8.0537, lng: -34.9004 },
  { id: 8, nome: 'Cuidar Bem — Idosos Jaboatão', municipio: 'jaboatao', tipo: 'idoso', bairro: 'Prazeres', telefone: '(81) 9 9200-0001', email: 'cuidarbem@osc.org', cnpj: '12.345.678/0002-01', situacaoCnas: 'Certificada CEBAS', lat: -8.1547, lng: -35.0067 },
  { id: 9, nome: 'Assoc. Crianças de Jaboatão', municipio: 'jaboatao', tipo: 'crianca', bairro: 'Muribeca', telefone: '(81) 9 9200-0002', email: 'criancasjaboatao@osc.org', cnpj: '12.345.678/0002-02', situacaoCnas: 'Registrada', lat: -8.1467, lng: -34.9975 },
  { id: 10, nome: 'Mulheres em Ação — Jaboatão', municipio: 'jaboatao', tipo: 'mulher', bairro: 'Cavaleiro', telefone: '(81) 9 9200-0003', email: 'mulheresacao@osc.org', cnpj: '12.345.678/0002-03', situacaoCnas: 'Registrada', lat: -8.1319, lng: -35.0206 },
  { id: 11, nome: 'Casa Abrigo Renascer', municipio: 'jaboatao', tipo: 'mulher', bairro: 'Curado', telefone: '(81) 9 9200-0004', email: 'renascer@osc.org', cnpj: '12.345.678/0002-04', situacaoCnas: 'Em renovação', lat: -8.0951, lng: -34.9724 },
  { id: 12, nome: 'Centro Idoso Vida Plena', municipio: 'camaragibe', tipo: 'idoso', bairro: 'Centro', telefone: '(81) 9 9300-0001', email: 'vidaplena@osc.org', cnpj: '12.345.678/0003-01', situacaoCnas: 'Registrada', lat: -8.0217, lng: -34.9808 },
  { id: 13, nome: 'Projeto Futuro — Camaragibe', municipio: 'camaragibe', tipo: 'crianca', bairro: 'Aldeia', telefone: '(81) 9 9300-0002', email: 'projfuturo@osc.org', cnpj: '12.345.678/0003-02', situacaoCnas: 'Em processo', lat: -8.0067, lng: -34.9975 },
  { id: 14, nome: 'Inst. Inclusão Caminhos', municipio: 'camaragibe', tipo: 'deficiencia', bairro: 'Timbi', telefone: '(81) 9 9300-0003', email: 'caminhos@osc.org', cnpj: '12.345.678/0003-03', situacaoCnas: 'Registrada', lat: -8.0294, lng: -34.9647 },
  { id: 15, nome: 'Assoc. Idosos do Cabo', municipio: 'cabo', tipo: 'idoso', bairro: 'Centro', telefone: '(81) 9 9400-0001', email: 'idososcabo@osc.org', cnpj: '12.345.678/0004-01', situacaoCnas: 'Registrada', lat: -8.2909, lng: -35.0353 },
  { id: 16, nome: 'Casa Acolhida Cabo', municipio: 'cabo', tipo: 'pessoa_rua', bairro: 'Ponte dos Carvalhos', telefone: '(81) 9 9400-0002', email: 'acolhidacabo@osc.org', cnpj: '12.345.678/0004-02', situacaoCnas: 'Em renovação', lat: -8.2597, lng: -35.0122 },
  { id: 17, nome: 'Assoc. Criança Feliz — SLM', municipio: 'sao_lourenco', tipo: 'crianca', bairro: 'Centro', telefone: '(81) 9 9500-0001', email: 'criancafeliz@osc.org', cnpj: '12.345.678/0005-01', situacaoCnas: 'Registrada', lat: -7.9967, lng: -35.0136 },
  { id: 18, nome: 'Inst. Idosos São Lourenço', municipio: 'sao_lourenco', tipo: 'idoso', bairro: 'Camorim Grande', telefone: '(81) 9 9500-0002', email: 'idososlm@osc.org', cnpj: '12.345.678/0005-02', situacaoCnas: 'Em processo', lat: -7.9814, lng: -35.0339 },
  { id: 19, nome: 'Rede Jovem Olinda', municipio: 'olinda', tipo: 'crianca', bairro: 'Carmo', telefone: '(81) 9 9600-0001', email: 'redejovemolinda@osc.org', cnpj: '12.345.678/0006-01', situacaoCnas: 'Registrada', lat: -7.9936, lng: -34.8551 },
  { id: 20, nome: 'Casa da Mulher de Paulista', municipio: 'paulista', tipo: 'mulher', bairro: 'Centro', telefone: '(81) 9 9700-0001', email: 'casamulherpaulista@osc.org', cnpj: '12.345.678/0007-01', situacaoCnas: 'Em processo', lat: -7.9407, lng: -34.8728 },
]
