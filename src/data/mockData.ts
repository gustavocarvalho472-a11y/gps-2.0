/**
 * GPS 2.0 - Mock Data
 * Dados simulados baseados na estrutura real da Cogna
 */

import type {
  ArquiteturaData,
  Dominio,
  PropostaValor,
  Jornada,
  DonoJornada,
  JornadaCompleta,
  Macroprocesso,
  Processo,
} from '../types';

// ============================================
// PROCESSOS - Nomenclaturas reais Cogna
// ============================================

// MP01 - Operacionalizar Cobrança
const processosOperacionalizarCobranca: Processo[] = [
  { id: 'p1', codigo: 'P001', nome: 'Planejar metas de fornecedores de cobrança', status: 'ativo', complexidade: 'alta', automatizacao: 65, fte: 3.5 },
  { id: 'p2', codigo: 'P002', nome: 'Realizar cobrança (canais humanos)', status: 'ativo', complexidade: 'alta', automatizacao: 45, fte: 12.0 },
  { id: 'p3', codigo: 'P003', nome: 'Administrar carteira de acordos', status: 'ativo', complexidade: 'media', automatizacao: 72, fte: 4.0 },
  { id: 'p4', codigo: 'P004', nome: 'Encontrar o devedor', status: 'em_revisao', complexidade: 'media', automatizacao: 55, fte: 2.5 },
  { id: 'p5', codigo: 'P005', nome: 'Realizar o acordo', status: 'ativo', complexidade: 'baixa', automatizacao: 80, fte: 1.5 },
];

// MP02 - Gerir Produtos Financeiros
const processosGerirProdutosFinanceiros: Processo[] = [
  { id: 'p6', codigo: 'P006', nome: 'Elaborar e monitorar orçamento de geração de caixa', status: 'ativo', complexidade: 'alta', automatizacao: 60, fte: 2.0 },
  { id: 'p7', codigo: 'P007', nome: 'Definir estratégia de cobrança', status: 'ativo', complexidade: 'alta', automatizacao: 35, fte: 1.5 },
  { id: 'p8', codigo: 'P008', nome: 'Gerir campanhas motivacionais', status: 'ativo', complexidade: 'media', automatizacao: 70, fte: 2.0 },
  { id: 'p9', codigo: 'P009', nome: 'Analisar indicadores financeiros', status: 'ativo', complexidade: 'media', automatizacao: 85, fte: 1.0 },
  { id: 'p10', codigo: 'P010', nome: 'Gerir políticas de negociação', status: 'em_revisao', complexidade: 'alta', automatizacao: 40, fte: 2.5 },
];

// MP03 - Captar Alunos
const processosCaptarAlunos: Processo[] = [
  { id: 'p11', codigo: 'P011', nome: 'Gerar leads qualificados', status: 'ativo', complexidade: 'alta', automatizacao: 78, fte: 5.0 },
  { id: 'p12', codigo: 'P012', nome: 'Nutrir base de prospects', status: 'ativo', complexidade: 'media', automatizacao: 82, fte: 3.0 },
  { id: 'p13', codigo: 'P013', nome: 'Realizar inscrição', status: 'ativo', complexidade: 'baixa', automatizacao: 95, fte: 1.0 },
  { id: 'p14', codigo: 'P014', nome: 'Converter inscritos em matriculados', status: 'ativo', complexidade: 'alta', automatizacao: 62, fte: 8.0 },
  { id: 'p15', codigo: 'P015', nome: 'Acompanhar funil de conversão', status: 'ativo', complexidade: 'media', automatizacao: 88, fte: 1.5 },
];

// MP04 - Reter Alunos
const processosReterAlunos: Processo[] = [
  { id: 'p16', codigo: 'P016', nome: 'Identificar alunos em risco de evasão', status: 'ativo', complexidade: 'alta', automatizacao: 75, fte: 2.0 },
  { id: 'p17', codigo: 'P017', nome: 'Executar ações de retenção', status: 'ativo', complexidade: 'media', automatizacao: 55, fte: 6.0 },
  { id: 'p18', codigo: 'P018', nome: 'Gerir programas de fidelização', status: 'em_revisao', complexidade: 'media', automatizacao: 45, fte: 2.5 },
  { id: 'p19', codigo: 'P019', nome: 'Analisar motivos de cancelamento', status: 'ativo', complexidade: 'baixa', automatizacao: 90, fte: 1.0 },
  { id: 'p20', codigo: 'P020', nome: 'Realizar rematrícula', status: 'ativo', complexidade: 'baixa', automatizacao: 92, fte: 1.5 },
];

// MP05 - Entregar Experiência Acadêmica
const processosEntregarExperiencia: Processo[] = [
  { id: 'p21', codigo: 'P021', nome: 'Disponibilizar conteúdo didático', status: 'ativo', complexidade: 'media', automatizacao: 88, fte: 3.0 },
  { id: 'p22', codigo: 'P022', nome: 'Realizar atendimento ao aluno', status: 'ativo', complexidade: 'alta', automatizacao: 52, fte: 15.0 },
  { id: 'p23', codigo: 'P023', nome: 'Gerir avaliações e notas', status: 'ativo', complexidade: 'media', automatizacao: 85, fte: 2.0 },
  { id: 'p24', codigo: 'P024', nome: 'Emitir documentos acadêmicos', status: 'ativo', complexidade: 'baixa', automatizacao: 95, fte: 1.0 },
  { id: 'p25', codigo: 'P025', nome: 'Medir satisfação do aluno (NPS)', status: 'ativo', complexidade: 'baixa', automatizacao: 92, fte: 0.5 },
];

// ============================================
// MACROPROCESSOS
// ============================================
const macroprocessosCobranca: Macroprocesso[] = [
  { id: 'mp1', codigo: 'MP01', nome: 'Operacionalizar Cobrança', processos: processosOperacionalizarCobranca },
  { id: 'mp2', codigo: 'MP02', nome: 'Gerir Produtos Financeiros', processos: processosGerirProdutosFinanceiros },
  { id: 'mp3', codigo: 'MP03', nome: 'Captar Alunos', processos: processosCaptarAlunos },
  { id: 'mp4', codigo: 'MP04', nome: 'Reter Alunos', processos: processosReterAlunos },
  { id: 'mp5', codigo: 'MP05', nome: 'Entregar Experiência Acadêmica', processos: processosEntregarExperiencia },
];

// Macroprocessos vazios para outras jornadas
const macroprocessosEditorial: Macroprocesso[] = [
  { id: 'mpe1', codigo: 'MPE1', nome: 'Desenvolver Conteúdo Didático', processos: [] },
  { id: 'mpe2', codigo: 'MPE2', nome: 'Curar Conteúdo Externo', processos: [] },
  { id: 'mpe3', codigo: 'MPE3', nome: 'Publicar Material', processos: [] },
];

const macroprocessosPlataforma: Macroprocesso[] = [
  { id: 'mpp1', codigo: 'MPP1', nome: 'Evoluir Plataforma Digital', processos: [] },
  { id: 'mpp2', codigo: 'MPP2', nome: 'Integrar Sistemas', processos: [] },
];

// ============================================
// JORNADAS POR PROPOSTA DE VALOR
// ============================================

// PV1 - Jornadas
const jornadasPV1: Jornada[] = [
  {
    id: 'j1',
    codigo: 'J01',
    nome: 'Jornada de Cobrança e Produtos Financeiros',
    dono: 'Maria Silva',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv1'],
    macroprocessos: macroprocessosCobranca,
    totalProcessos: 25,
  },
  {
    id: 'j2',
    codigo: 'J02',
    nome: 'Jornada de Captação e Matrícula',
    dono: 'João Santos',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv1'],
    macroprocessos: [],
    totalProcessos: 18,
  },
  {
    id: 'j3',
    codigo: 'J03',
    nome: 'Jornada de Experiência do Aluno',
    dono: 'Ana Costa',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv1', 'pv2'],
    macroprocessos: [],
    totalProcessos: 22,
  },
  {
    id: 'j4',
    codigo: 'J04',
    nome: 'Jornada de Retenção e Fidelização',
    dono: 'Carlos Oliveira',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv1'],
    macroprocessos: [],
    totalProcessos: 15,
  },
];

// PV2 - Jornadas
const jornadasPV2: Jornada[] = [
  {
    id: 'j5',
    codigo: 'J05',
    nome: 'Jornada Editorial e Produção de Conteúdo',
    dono: 'Paula Mendes',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv2'],
    macroprocessos: macroprocessosEditorial,
    totalProcessos: 12,
  },
  {
    id: 'j6',
    codigo: 'J06',
    nome: 'Jornada de Curadoria de Conteúdo',
    dono: 'Roberto Lima',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv2', 'pv3'],
    macroprocessos: [],
    totalProcessos: 8,
  },
];

// PV3 - Jornadas
const jornadasPV3: Jornada[] = [
  {
    id: 'j7',
    codigo: 'J07',
    nome: 'Jornada de Evolução da Plataforma',
    dono: 'Fernanda Dias',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv3'],
    macroprocessos: macroprocessosPlataforma,
    totalProcessos: 14,
  },
  {
    id: 'j8',
    codigo: 'J08',
    nome: 'Jornada de Integração de Sistemas',
    dono: 'Lucas Ferreira',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv3', 'pv4'],
    macroprocessos: [],
    totalProcessos: 19,
  },
];

// PV4 - Jornadas
const jornadasPV4: Jornada[] = [
  {
    id: 'j9',
    codigo: 'J09',
    nome: 'Jornada de Serviços B2B',
    dono: 'Mariana Rocha',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv4'],
    macroprocessos: [],
    totalProcessos: 11,
  },
  {
    id: 'j10',
    codigo: 'J10',
    nome: 'Jornada de Soluções em Gestão Educacional',
    dono: 'Pedro Alves',
    dominioId: 'core',
    dominioNome: 'Experiência (Plataforma)',
    dominioTipo: 'core',
    propostasValorIds: ['pv4'],
    macroprocessos: [],
    totalProcessos: 16,
  },
];

// ============================================
// PROPOSTAS DE VALOR
// ============================================
const propostasValor: PropostaValor[] = [
  {
    id: 'pv1',
    codigo: 'PV1',
    nome: 'Ser um provedor de ensino ponta a ponta',
    descricao: 'Provedor completo de soluções educacionais',
    cor: '#7C3AED',
    jornadas: jornadasPV1,
  },
  {
    id: 'pv2',
    codigo: 'PV2',
    nome: 'Ser uma fábrica de conteúdo de ensino e aprendizagem',
    descricao: 'Produção de conteúdo educacional',
    cor: '#8B5CF6',
    jornadas: jornadasPV2,
  },
  {
    id: 'pv3',
    codigo: 'PV3',
    nome: 'Ser uma plataforma digital de conteúdo e sistemas de ensino',
    descricao: 'Plataforma digital educacional',
    cor: '#A78BFA',
    jornadas: jornadasPV3,
  },
  {
    id: 'pv4',
    codigo: 'PV4',
    nome: 'Ser um HUB de serviços e soluções em gestão para educação',
    descricao: 'Hub de serviços educacionais',
    cor: '#C4B5FD',
    jornadas: jornadasPV4,
  },
];

// ============================================
// JORNADAS OUTROS DOMÍNIOS
// ============================================

// Jornadas Estratégicas
const jornadasEstrategico: Jornada[] = [
  {
    id: 'je1',
    codigo: 'JE01',
    nome: 'Jornada de Planejamento Estratégico',
    dono: 'Ricardo Mendonça',
    dominioId: 'estrategico',
    dominioNome: 'Estratégico',
    dominioTipo: 'estrategico',
    macroprocessos: [],
    totalProcessos: 5,
  },
  {
    id: 'je2',
    codigo: 'JE02',
    nome: 'Jornada de Governança Corporativa',
    dono: 'Claudia Ramos',
    dominioId: 'estrategico',
    dominioNome: 'Estratégico',
    dominioTipo: 'estrategico',
    macroprocessos: [],
    totalProcessos: 8,
  },
  {
    id: 'je3',
    codigo: 'JE03',
    nome: 'Jornada de Relacionamento Institucional',
    dono: 'André Pinto',
    dominioId: 'estrategico',
    dominioNome: 'Estratégico',
    dominioTipo: 'estrategico',
    macroprocessos: [],
    totalProcessos: 4,
  },
];

// Jornadas Plataforma
const jornadasPlataforma: Jornada[] = [
  {
    id: 'jp1',
    codigo: 'JP01',
    nome: 'Jornada de Arquitetura e Capacidades',
    dono: 'Thiago Nascimento',
    dominioId: 'plataforma',
    dominioNome: 'Plataforma',
    dominioTipo: 'plataforma',
    macroprocessos: [],
    totalProcessos: 12,
  },
  {
    id: 'jp2',
    codigo: 'JP02',
    nome: 'Jornada de Desenvolvimento de Soluções',
    dono: 'Camila Souza',
    dominioId: 'plataforma',
    dominioNome: 'Plataforma',
    dominioTipo: 'plataforma',
    macroprocessos: [],
    totalProcessos: 24,
  },
  {
    id: 'jp3',
    codigo: 'JP03',
    nome: 'Jornada de Governança e Engenharia de Dados',
    dono: 'Bruno Carvalho',
    dominioId: 'plataforma',
    dominioNome: 'Plataforma',
    dominioTipo: 'plataforma',
    macroprocessos: [],
    totalProcessos: 18,
  },
  {
    id: 'jp4',
    codigo: 'JP04',
    nome: 'Jornada de Segurança da Informação',
    dono: 'Renata Farias',
    dominioId: 'plataforma',
    dominioNome: 'Plataforma',
    dominioTipo: 'plataforma',
    macroprocessos: [],
    totalProcessos: 15,
  },
];

// Jornadas Corporativo
const jornadasCorporativo: Jornada[] = [
  {
    id: 'jc1',
    codigo: 'JC01',
    nome: 'Jornada de Gestão de Pessoas',
    dono: 'Juliana Martins',
    dominioId: 'corporativo',
    dominioNome: 'Corporativo',
    dominioTipo: 'corporativo',
    macroprocessos: [],
    totalProcessos: 22,
  },
  {
    id: 'jc2',
    codigo: 'JC02',
    nome: 'Jornada de Finanças e Controladoria',
    dono: 'Marcos Pereira',
    dominioId: 'corporativo',
    dominioNome: 'Corporativo',
    dominioTipo: 'corporativo',
    macroprocessos: [],
    totalProcessos: 28,
  },
  {
    id: 'jc3',
    codigo: 'JC03',
    nome: 'Jornada Jurídica e Compliance',
    dono: 'Patrícia Gomes',
    dominioId: 'corporativo',
    dominioNome: 'Corporativo',
    dominioTipo: 'corporativo',
    macroprocessos: [],
    totalProcessos: 14,
  },
  {
    id: 'jc4',
    codigo: 'JC04',
    nome: 'Jornada de Suprimentos e Compras',
    dono: 'Eduardo Santos',
    dominioId: 'corporativo',
    dominioNome: 'Corporativo',
    dominioTipo: 'corporativo',
    macroprocessos: [],
    totalProcessos: 16,
  },
  {
    id: 'jc5',
    codigo: 'JC05',
    nome: 'Jornada de Marketing Institucional',
    dono: 'Daniela Costa',
    dominioId: 'corporativo',
    dominioNome: 'Corporativo',
    dominioTipo: 'corporativo',
    macroprocessos: [],
    totalProcessos: 19,
  },
];

// ============================================
// DOMÍNIOS
// ============================================
export const dominios: Dominio[] = [
  {
    id: 'estrategico',
    nome: 'Estratégico',
    tipo: 'estrategico',
    jornadas: jornadasEstrategico,
    totalProcessos: jornadasEstrategico.reduce((acc, j) => acc + j.totalProcessos, 0),
  },
  {
    id: 'core',
    nome: 'Experiência (Plataforma)',
    tipo: 'core',
    propostasValor: propostasValor,
    totalProcessos: propostasValor.reduce(
      (acc, pv) => acc + pv.jornadas.reduce((a, j) => a + j.totalProcessos, 0),
      0
    ),
  },
  {
    id: 'plataforma',
    nome: 'Plataforma',
    tipo: 'plataforma',
    jornadas: jornadasPlataforma,
    totalProcessos: jornadasPlataforma.reduce((acc, j) => acc + j.totalProcessos, 0),
  },
  {
    id: 'corporativo',
    nome: 'Corporativo',
    tipo: 'corporativo',
    jornadas: jornadasCorporativo,
    totalProcessos: jornadasCorporativo.reduce((acc, j) => acc + j.totalProcessos, 0),
  },
];

// Arquitetura completa
export const arquiteturaData: ArquiteturaData = {
  dominios,
  totalProcessos: dominios.reduce((acc, d) => acc + d.totalProcessos, 0),
  totalJornadas:
    jornadasEstrategico.length +
    jornadasPlataforma.length +
    jornadasCorporativo.length +
    propostasValor.reduce((acc, pv) => acc + pv.jornadas.length, 0),
  totalMacroprocessos: 42,
};

// ============================================
// VISÃO DO DONO DE JORNADA
// ============================================

// Helper: Mapa de Propostas de Valor
const pvMap = new Map(propostasValor.map((pv) => [pv.id, pv]));

// Função para criar JornadaCompleta a partir de Jornada
function createJornadaCompleta(jornada: Jornada): JornadaCompleta {
  const pvs = (jornada.propostasValorIds || [])
    .map((pvId) => pvMap.get(pvId))
    .filter(Boolean)
    .map((pv) => ({
      id: pv!.id,
      codigo: pv!.codigo,
      nome: pv!.nome,
      cor: pv!.cor,
    }));

  return {
    ...jornada,
    dominio: {
      id: jornada.dominioId || '',
      nome: jornada.dominioNome || '',
      tipo: jornada.dominioTipo || 'core',
    },
    propostasValor: pvs,
  };
}

// Agrupar todas as jornadas
const todasJornadas: Jornada[] = [
  ...jornadasPV1,
  ...jornadasPV2,
  ...jornadasPV3,
  ...jornadasPV4,
  ...jornadasEstrategico,
  ...jornadasPlataforma,
  ...jornadasCorporativo,
];

// Agrupar por dono
function groupByDono(jornadas: Jornada[]): DonoJornada[] {
  const donoMap = new Map<string, Jornada[]>();

  jornadas.forEach((jornada) => {
    const dono = jornada.dono || 'Sem dono definido';
    if (!donoMap.has(dono)) {
      donoMap.set(dono, []);
    }
    donoMap.get(dono)!.push(jornada);
  });

  return Array.from(donoMap.entries()).map(([nome, jornadas], index) => ({
    id: `dono-${index}`,
    nome,
    cargo: getCargoByName(nome),
    area: getAreaByName(nome),
    jornadas: jornadas.map(createJornadaCompleta),
    totalProcessos: jornadas.reduce((acc, j) => acc + j.totalProcessos, 0),
  }));
}

// Helpers para dados fictícios de cargo e área
function getCargoByName(nome: string): string {
  const cargos: Record<string, string> = {
    'Maria Silva': 'Diretora de Operações',
    'João Santos': 'Gerente de Growth',
    'Ana Costa': 'Head de CX',
    'Carlos Oliveira': 'Coordenador Acadêmico',
    'Paula Mendes': 'Diretora Editorial',
    'Roberto Lima': 'Gerente de Produto',
    'Fernanda Dias': 'Head de Marketing',
    'Lucas Ferreira': 'Tech Lead',
    'Mariana Rocha': 'Product Manager',
    'Pedro Alves': 'Arquiteto de Soluções',
    'Ricardo Mendonça': 'VP de Estratégia',
    'Claudia Ramos': 'Diretora de Governança',
    'André Pinto': 'Gerente de RI',
    'Thiago Nascimento': 'Arquiteto Enterprise',
    'Camila Souza': 'Engineering Manager',
    'Bruno Carvalho': 'Head de Data',
    'Renata Farias': 'CISO',
    'Juliana Martins': 'CHRO',
    'Marcos Pereira': 'CFO',
    'Patrícia Gomes': 'General Counsel',
    'Eduardo Santos': 'Head de Suprimentos',
    'Daniela Costa': 'CMO',
  };
  return cargos[nome] || 'Gestor';
}

function getAreaByName(nome: string): string {
  const areas: Record<string, string> = {
    'Maria Silva': 'Operações',
    'João Santos': 'Growth',
    'Ana Costa': 'Customer Experience',
    'Carlos Oliveira': 'Acadêmico',
    'Paula Mendes': 'Editorial',
    'Roberto Lima': 'Produto',
    'Fernanda Dias': 'Marketing',
    'Lucas Ferreira': 'Tecnologia',
    'Mariana Rocha': 'Produto',
    'Pedro Alves': 'Arquitetura',
    'Ricardo Mendonça': 'Estratégia',
    'Claudia Ramos': 'Governança',
    'André Pinto': 'Relações Institucionais',
    'Thiago Nascimento': 'Arquitetura',
    'Camila Souza': 'Engenharia',
    'Bruno Carvalho': 'Data',
    'Renata Farias': 'Segurança',
    'Juliana Martins': 'RH',
    'Marcos Pereira': 'Finanças',
    'Patrícia Gomes': 'Jurídico',
    'Eduardo Santos': 'Suprimentos',
    'Daniela Costa': 'Marketing',
  };
  return areas[nome] || 'Não definida';
}

// Exportar dados agrupados por dono
export const donosJornada: DonoJornada[] = groupByDono(todasJornadas);

// Exportar todas as jornadas completas
export const jornadasCompletas: JornadaCompleta[] = todasJornadas.map(createJornadaCompleta);

// Business Units para filtros
export const businessUnits = [
  'Graduação e Pós-graduação',
  'Ensino Básico',
  'Saber',
  'Aliança 2',
  'Aliança 3',
  'Revenue Office',
  'Learning Experience',
  'Transformation Office',
  'G&CC',
  'Finanças',
  'Tecnologia',
];

// Segmentos
export const segmentos = ['Ensino Básico', 'Ensino Superior', 'Pós-Graduação', 'Cursos Livres'];

// Marcas
export const marcas = ['Anhanguera', 'Pitágoras', 'Unopar', 'Ampli', 'Fama'];

// Cores por tipo de domínio
export const dominioColors = {
  estrategico: { bg: '#FAF5FF', border: '#7C3AED', text: '#5B21B6' },
  core: { bg: '#FAF5FF', border: '#8B5CF6', text: '#6D28D9' },
  plataforma: { bg: '#ECFDF5', border: '#10B981', text: '#047857' },
  corporativo: { bg: '#FEF3C7', border: '#F59E0B', text: '#B45309' },
};
