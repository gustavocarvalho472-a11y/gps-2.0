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

// Processos de exemplo para drill-down
const processosGestaoOperacao: Processo[] = [
  { id: 'p1', codigo: 'P001', nome: 'Gestão de Matrículas', status: 'ativo', complexidade: 'alta', automatizacao: 75, fte: 3.5 },
  { id: 'p2', codigo: 'P002', nome: 'Atendimento ao Aluno', status: 'ativo', complexidade: 'media', automatizacao: 60, fte: 8.0 },
  { id: 'p3', codigo: 'P003', nome: 'Gestão de Documentos', status: 'ativo', complexidade: 'baixa', automatizacao: 85, fte: 2.0 },
  { id: 'p4', codigo: 'P004', nome: 'Controle de Frequência', status: 'em_revisao', complexidade: 'media', automatizacao: 40, fte: 1.5 },
  { id: 'p5', codigo: 'P005', nome: 'Gestão de Notas', status: 'ativo', complexidade: 'alta', automatizacao: 90, fte: 1.0 },
];

const processosCrescimento: Processo[] = [
  { id: 'p6', codigo: 'P006', nome: 'Captação de Leads', status: 'ativo', complexidade: 'alta', automatizacao: 80, fte: 5.0 },
  { id: 'p7', codigo: 'P007', nome: 'Conversão de Matrículas', status: 'ativo', complexidade: 'alta', automatizacao: 65, fte: 12.0 },
  { id: 'p8', codigo: 'P008', nome: 'Retenção de Alunos', status: 'ativo', complexidade: 'media', automatizacao: 55, fte: 4.0 },
  { id: 'p9', codigo: 'P009', nome: 'Análise de Mercado', status: 'ativo', complexidade: 'media', automatizacao: 30, fte: 2.0 },
];

const processosExperiencia: Processo[] = [
  { id: 'p10', codigo: 'P010', nome: 'Pesquisa de Satisfação', status: 'ativo', complexidade: 'baixa', automatizacao: 95, fte: 0.5 },
  { id: 'p11', codigo: 'P011', nome: 'Gestão de Reclamações', status: 'ativo', complexidade: 'media', automatizacao: 70, fte: 3.0 },
  { id: 'p12', codigo: 'P012', nome: 'NPS e Métricas', status: 'ativo', complexidade: 'baixa', automatizacao: 90, fte: 1.0 },
];

// Macroprocessos de exemplo
const macroprocessosGestaoOperacao: Macroprocesso[] = [
  { id: 'mp1', codigo: 'MP01', nome: 'Gestão Acadêmica', processos: processosGestaoOperacao.slice(0, 3) },
  { id: 'mp2', codigo: 'MP02', nome: 'Controle Acadêmico', processos: processosGestaoOperacao.slice(3) },
];

const macroprocessosCrescimento: Macroprocesso[] = [
  { id: 'mp3', codigo: 'MP03', nome: 'Aquisição', processos: processosCrescimento.slice(0, 2) },
  { id: 'mp4', codigo: 'MP04', nome: 'Fidelização', processos: processosCrescimento.slice(2) },
];

const macroprocessosExperiencia: Macroprocesso[] = [
  { id: 'mp5', codigo: 'MP05', nome: 'Voz do Cliente', processos: processosExperiencia },
];

// Jornadas do Core - Propostas de Valor
const jornadasPV1: Jornada[] = [
  {
    id: 'j1',
    codigo: 'J01',
    nome: 'Gestão e Suporte à Operação',
    dono: 'Maria Silva',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv1'],
    macroprocessos: macroprocessosGestaoOperacao,
    totalProcessos: 26,
  },
  {
    id: 'j2',
    codigo: 'J02',
    nome: 'Crescimento',
    dono: 'João Santos',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv1'],
    macroprocessos: macroprocessosCrescimento,
    totalProcessos: 18,
  },
  {
    id: 'j3',
    codigo: 'J03',
    nome: 'Experiência',
    dono: 'Ana Costa',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv1', 'pv2'],
    macroprocessos: macroprocessosExperiencia,
    totalProcessos: 22,
  },
  {
    id: 'j4',
    codigo: 'J04',
    nome: 'Planejamento e Gestão de Carga Horária',
    dono: 'Carlos Oliveira',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv1'],
    macroprocessos: [],
    totalProcessos: 15,
  },
];

const jornadasPV2: Jornada[] = [
  {
    id: 'j5',
    codigo: 'J05',
    nome: 'Editorial',
    dono: 'Paula Mendes',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv2'],
    macroprocessos: [],
    totalProcessos: 12,
  },
  {
    id: 'j6',
    codigo: 'J06',
    nome: 'Crescimento',
    dono: 'Roberto Lima',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv2', 'pv3'],
    macroprocessos: [],
    totalProcessos: 8,
  },
];

const jornadasPV3: Jornada[] = [
  {
    id: 'j7',
    codigo: 'J07',
    nome: 'Crescimento',
    dono: 'Fernanda Dias',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv3'],
    macroprocessos: [],
    totalProcessos: 14,
  },
  {
    id: 'j8',
    codigo: 'J08',
    nome: 'Design Plataforma',
    dono: 'Lucas Ferreira',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv3', 'pv4'],
    macroprocessos: [],
    totalProcessos: 19,
  },
];

const jornadasPV4: Jornada[] = [
  {
    id: 'j9',
    codigo: 'J09',
    nome: 'Crescimento',
    dono: 'Mariana Rocha',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv4'],
    macroprocessos: [],
    totalProcessos: 11,
  },
  {
    id: 'j10',
    codigo: 'J10',
    nome: 'Design de Soluções',
    dono: 'Pedro Alves',
    dominioId: 'core',
    dominioNome: 'Core: Propostas de Valor',
    dominioTipo: 'core',
    propostasValorIds: ['pv4'],
    macroprocessos: [],
    totalProcessos: 16,
  },
];

// Propostas de Valor
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

// Jornadas Estratégicas
const jornadasEstrategico: Jornada[] = [
  {
    id: 'je1',
    codigo: 'JE01',
    nome: 'Estratégia',
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
    nome: 'Governança',
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
    nome: 'Relacionamento Institucional',
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
    nome: 'Arquitetura e Capacidades',
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
    nome: 'Desenvolvimento de Soluções',
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
    nome: 'Governança e Engenharia de Dados',
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
    nome: 'Segurança da Informação',
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
    nome: 'Gestão de Pessoas',
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
    nome: 'Finanças',
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
    nome: 'Jurídico',
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
    nome: 'Suprimentos',
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
    nome: 'Comunicação e Marketing',
    dono: 'Daniela Costa',
    dominioId: 'corporativo',
    dominioNome: 'Corporativo',
    dominioTipo: 'corporativo',
    macroprocessos: [],
    totalProcessos: 19,
  },
];

// Domínios
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
    nome: 'Core: Propostas de Valor',
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
  'Somos',
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
