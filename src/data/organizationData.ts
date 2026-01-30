/**
 * GPS 2.0 - Dados da Estrutura Organizacional
 * Mock data com BUs, Domínios, Jornadas, Macroprocessos e Processos
 */

import type { BusinessUnit, Responsavel, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../types';

// ============================================
// RESPONSÁVEIS (Donos)
// ============================================

const responsaveis: Record<string, Responsavel> = {
  // BU Leaders
  'r-somos': {
    id: 'r-somos',
    nome: 'Mario Ghio',
    cargo: 'CEO',
    area: 'SOMOS Educação',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  'r-saber': {
    id: 'r-saber',
    nome: 'Rodrigo Galindo',
    cargo: 'CEO',
    area: 'Saber',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  'r-alianca-ja': {
    id: 'r-alianca-ja',
    nome: 'Fernando Sasaki',
    cargo: 'Diretor Executivo',
    area: 'Aliança Jovens e Adultos',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  'r-lifelong': {
    id: 'r-lifelong',
    nome: 'Patricia Volpi',
    cargo: 'Diretora Executiva',
    area: 'Lifelong Learning',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  'r-revenue': {
    id: 'r-revenue',
    nome: 'Carlos Mendes',
    cargo: 'VP Revenue',
    area: 'Revenue Office',
    foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face',
  },
  'r-learning': {
    id: 'r-learning',
    nome: 'Amanda Ribeiro',
    cargo: 'VP Learning Experience',
    area: 'Learning Experience',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  'r-transform': {
    id: 'r-transform',
    nome: 'Ricardo Torres',
    cargo: 'VP Transformação',
    area: 'Transformation Office',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
  },
  'r-gcc': {
    id: 'r-gcc',
    nome: 'Juliana Costa',
    cargo: 'VP Gente & Cultura',
    area: 'G&CC',
    foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
  },
  'r-financas': {
    id: 'r-financas',
    nome: 'Eduardo Lima',
    cargo: 'CFO',
    area: 'Finanças',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  },
  'r-tech': {
    id: 'r-tech',
    nome: 'Marcelo Oliveira',
    cargo: 'CTO',
    area: 'Tecnologia',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
  },
  // Domain owners
  'r-dom-1': {
    id: 'r-dom-1',
    nome: 'Ana Paula Santos',
    cargo: 'Gerente de Domínio',
    area: 'Operações',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  },
  'r-dom-2': {
    id: 'r-dom-2',
    nome: 'Bruno Carvalho',
    cargo: 'Gerente de Domínio',
    area: 'Comercial',
    foto: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&h=80&fit=crop&crop=face',
  },
  'r-dom-3': {
    id: 'r-dom-3',
    nome: 'Camila Ferreira',
    cargo: 'Gerente de Domínio',
    area: 'Acadêmico',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  },
  // Journey owners
  'r-jor-1': {
    id: 'r-jor-1',
    nome: 'Daniel Souza',
    cargo: 'Product Owner',
    area: 'Jornadas',
    foto: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face',
  },
  'r-jor-2': {
    id: 'r-jor-2',
    nome: 'Elena Martins',
    cargo: 'Product Owner',
    area: 'Jornadas',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  },
  // Macro owners
  'r-macro-1': {
    id: 'r-macro-1',
    nome: 'Felipe Almeida',
    cargo: 'Process Owner',
    area: 'Processos',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
};

// ============================================
// HELPER: Gerar processos mock
// ============================================

function gerarProcessos(macroId: string, quantidade: number): Processo[] {
  const statuses: Array<'ativo' | 'inativo' | 'em_revisao'> = ['ativo', 'ativo', 'ativo', 'em_revisao', 'inativo'];
  const complexidades: Array<'baixa' | 'media' | 'alta'> = ['baixa', 'media', 'alta'];

  return Array.from({ length: quantidade }, (_, i) => ({
    id: `${macroId}-p-${i + 1}`,
    codigo: `P${String(i + 1).padStart(3, '0')}`,
    nome: `Processo ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    complexidade: complexidades[Math.floor(Math.random() * complexidades.length)],
    automatizacao: Math.floor(Math.random() * 100),
    fte: Math.floor(Math.random() * 10) + 1,
  }));
}

// ============================================
// HELPER: Gerar macroprocessos mock
// ============================================

function gerarMacroprocessos(jornadaId: string, quantidade: number, nomesMacro: string[]): MacroprocessoCompleto[] {
  return Array.from({ length: quantidade }, (_, i) => {
    const processos = gerarProcessos(`${jornadaId}-m-${i + 1}`, Math.floor(Math.random() * 8) + 3);
    return {
      id: `${jornadaId}-m-${i + 1}`,
      codigo: `M${String(i + 1).padStart(2, '0')}`,
      nome: nomesMacro[i] || `Macroprocesso ${i + 1}`,
      responsavel: responsaveis['r-macro-1'],
      processos,
      totalProcessos: processos.length,
    };
  });
}

// ============================================
// HELPER: Gerar jornadas mock
// ============================================

function gerarJornadas(dominioId: string, nomesJornadas: string[]): JornadaCompleta[] {
  const macroNomes = [
    'Captação', 'Análise', 'Processamento', 'Validação', 'Aprovação',
    'Execução', 'Monitoramento', 'Encerramento', 'Suporte', 'Melhoria'
  ];

  return nomesJornadas.map((nome, i) => {
    const macros = gerarMacroprocessos(`${dominioId}-j-${i + 1}`, Math.floor(Math.random() * 5) + 2, macroNomes);
    const totalProcessos = macros.reduce((acc, m) => acc + m.totalProcessos, 0);

    return {
      id: `${dominioId}-j-${i + 1}`,
      codigo: `J${String(i + 1).padStart(2, '0')}`,
      nome,
      responsavel: i % 2 === 0 ? responsaveis['r-jor-1'] : responsaveis['r-jor-2'],
      macroprocessos: macros,
      totalMacroprocessos: macros.length,
      totalProcessos,
    };
  });
}

// ============================================
// HELPER: Gerar domínios mock
// ============================================

function gerarDominios(buId: string, configDominios: { nome: string; jornadas: string[] }[]): DominioCompleto[] {
  return configDominios.map((config, i) => {
    const jornadas = gerarJornadas(`${buId}-d-${i + 1}`, config.jornadas);
    const totalMacros = jornadas.reduce((acc, j) => acc + j.totalMacroprocessos, 0);
    const totalProcs = jornadas.reduce((acc, j) => acc + j.totalProcessos, 0);

    return {
      id: `${buId}-d-${i + 1}`,
      codigo: `D${String(i + 1).padStart(2, '0')}`,
      nome: config.nome,
      responsavel: i % 3 === 0 ? responsaveis['r-dom-1'] : i % 3 === 1 ? responsaveis['r-dom-2'] : responsaveis['r-dom-3'],
      jornadas,
      totalJornadas: jornadas.length,
      totalMacroprocessos: totalMacros,
      totalProcessos: totalProcs,
    };
  });
}

// ============================================
// BUSINESS UNITS DATA
// ============================================

export const businessUnits: BusinessUnit[] = [
  // ==================== ALIANÇAS ====================
  {
    id: 'bu-somos',
    codigo: 'SOMOS',
    nome: 'SOMOS',
    categoria: 'alianca',
    cor: '#8B5CF6', // violet
    responsavel: responsaveis['r-somos'],
    dominios: gerarDominios('bu-somos', [
      { nome: 'Gestão Escolar', jornadas: ['Matrícula', 'Rematrícula', 'Transferência', 'Cancelamento'] },
      { nome: 'Conteúdo Didático', jornadas: ['Produção Editorial', 'Revisão', 'Publicação'] },
      { nome: 'Plataforma Digital', jornadas: ['Acesso Aluno', 'Gestão Conteúdo', 'Avaliações Online'] },
      { nome: 'Comercial', jornadas: ['Captação Escolas', 'Negociação', 'Contrato', 'Renovação'] },
      { nome: 'Suporte Pedagógico', jornadas: ['Formação Professores', 'Consultoria', 'Eventos'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-saber',
    codigo: 'SABER',
    nome: 'Saber',
    categoria: 'alianca',
    cor: '#8B5CF6',
    responsavel: responsaveis['r-saber'],
    dominios: gerarDominios('bu-saber', [
      { nome: 'Graduação', jornadas: ['Vestibular', 'Matrícula', 'Gestão Acadêmica', 'Formatura'] },
      { nome: 'Pós-Graduação', jornadas: ['Inscrição', 'Orientação', 'TCC/Dissertação'] },
      { nome: 'EAD', jornadas: ['Produção Conteúdo', 'Tutoria', 'Avaliação'] },
      { nome: 'Extensão', jornadas: ['Cursos Livres', 'Workshops', 'Certificação'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-alianca-ja',
    codigo: 'AJA',
    nome: 'Aliança Jovens e Adultos',
    categoria: 'alianca',
    cor: '#8B5CF6',
    responsavel: responsaveis['r-alianca-ja'],
    dominios: gerarDominios('bu-alianca-ja', [
      { nome: 'Captação', jornadas: ['Lead Generation', 'Qualificação', 'Conversão'] },
      { nome: 'Experiência do Aluno', jornadas: ['Onboarding', 'Acompanhamento', 'Retenção'] },
      { nome: 'Financeiro Aluno', jornadas: ['Cobrança', 'Negociação', 'Bolsas'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-lifelong',
    codigo: 'LIFE',
    nome: 'Lifelong Learning',
    categoria: 'alianca',
    cor: '#8B5CF6',
    responsavel: responsaveis['r-lifelong'],
    dominios: gerarDominios('bu-lifelong', [
      { nome: 'Cursos Corporativos', jornadas: ['Diagnóstico', 'Customização', 'Entrega', 'Avaliação'] },
      { nome: 'Plataforma B2B', jornadas: ['Onboarding Empresa', 'Gestão Usuários', 'Relatórios'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },

  // ==================== PLATAFORMAS ====================
  {
    id: 'bu-revenue',
    codigo: 'REV',
    nome: 'Revenue Office',
    categoria: 'plataforma',
    cor: '#14B8A6', // teal
    responsavel: responsaveis['r-revenue'],
    dominios: gerarDominios('bu-revenue', [
      { nome: 'Pricing', jornadas: ['Análise Mercado', 'Precificação', 'Aprovação'] },
      { nome: 'Cobrança', jornadas: ['Faturamento', 'Cobrança', 'Inadimplência', 'Recuperação'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-learning',
    codigo: 'LEX',
    nome: 'Learning Experience',
    categoria: 'plataforma',
    cor: '#14B8A6',
    responsavel: responsaveis['r-learning'],
    dominios: gerarDominios('bu-learning', [
      { nome: 'Design Instrucional', jornadas: ['Concepção', 'Desenvolvimento', 'Revisão'] },
      { nome: 'Produção Multimídia', jornadas: ['Roteirização', 'Gravação', 'Edição', 'Publicação'] },
      { nome: 'Learning Analytics', jornadas: ['Coleta Dados', 'Análise', 'Insights'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-transform',
    codigo: 'TRX',
    nome: 'Transformation Office',
    categoria: 'plataforma',
    cor: '#14B8A6',
    responsavel: responsaveis['r-transform'],
    dominios: gerarDominios('bu-transform', [
      { nome: 'Processos', jornadas: ['Mapeamento', 'Otimização', 'Automação'] },
      { nome: 'Projetos', jornadas: ['Intake', 'Planejamento', 'Execução', 'Encerramento'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },

  // ==================== CORPORATIVOS ====================
  {
    id: 'bu-gcc',
    codigo: 'GCC',
    nome: 'G&CC',
    categoria: 'corporativo',
    cor: '#22C55E', // green
    responsavel: responsaveis['r-gcc'],
    dominios: gerarDominios('bu-gcc', [
      { nome: 'Recrutamento', jornadas: ['Requisição', 'Seleção', 'Contratação', 'Onboarding'] },
      { nome: 'Desenvolvimento', jornadas: ['Avaliação', 'PDI', 'Treinamento', 'Carreira'] },
      { nome: 'Folha', jornadas: ['Processamento', 'Benefícios', 'Férias', 'Rescisão'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-financas',
    codigo: 'FIN',
    nome: 'Finanças',
    categoria: 'corporativo',
    cor: '#22C55E',
    responsavel: responsaveis['r-financas'],
    dominios: gerarDominios('bu-financas', [
      { nome: 'Contabilidade', jornadas: ['Lançamentos', 'Conciliação', 'Fechamento'] },
      { nome: 'Tesouraria', jornadas: ['Contas a Pagar', 'Contas a Receber', 'Caixa'] },
      { nome: 'Controladoria', jornadas: ['Orçamento', 'Forecast', 'Reporting'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
  {
    id: 'bu-tech',
    codigo: 'TECH',
    nome: 'Tecnologia',
    categoria: 'corporativo',
    cor: '#22C55E',
    responsavel: responsaveis['r-tech'],
    dominios: gerarDominios('bu-tech', [
      { nome: 'Desenvolvimento', jornadas: ['Discovery', 'Build', 'Deploy', 'Sustentação'] },
      { nome: 'Infraestrutura', jornadas: ['Provisionamento', 'Monitoramento', 'Incidentes'] },
      { nome: 'Dados', jornadas: ['Ingestão', 'Processamento', 'Visualização'] },
    ]),
    get totalDominios() { return this.dominios.length; },
    get totalJornadas() { return this.dominios.reduce((acc, d) => acc + d.totalJornadas, 0); },
    get totalMacroprocessos() { return this.dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0); },
    get totalProcessos() { return this.dominios.reduce((acc, d) => acc + d.totalProcessos, 0); },
  },
];

// ============================================
// HELPERS para busca
// ============================================

export function getBUById(id: string): BusinessUnit | undefined {
  return businessUnits.find(bu => bu.id === id);
}

export function getDominioById(buId: string, dominioId: string): DominioCompleto | undefined {
  const bu = getBUById(buId);
  return bu?.dominios.find(d => d.id === dominioId);
}

export function getJornadaById(buId: string, dominioId: string, jornadaId: string): JornadaCompleta | undefined {
  const dominio = getDominioById(buId, dominioId);
  return dominio?.jornadas.find(j => j.id === jornadaId);
}

export function getMacroById(buId: string, dominioId: string, jornadaId: string, macroId: string): MacroprocessoCompleto | undefined {
  const jornada = getJornadaById(buId, dominioId, jornadaId);
  return jornada?.macroprocessos.find(m => m.id === macroId);
}

// Totais globais
export const totaisGlobais = {
  get totalBUs() { return businessUnits.length; },
  get totalDominios() { return businessUnits.reduce((acc, bu) => acc + bu.totalDominios, 0); },
  get totalJornadas() { return businessUnits.reduce((acc, bu) => acc + bu.totalJornadas, 0); },
  get totalMacroprocessos() { return businessUnits.reduce((acc, bu) => acc + bu.totalMacroprocessos, 0); },
  get totalProcessos() { return businessUnits.reduce((acc, bu) => acc + bu.totalProcessos, 0); },
};

// BUs por categoria
export const busPorCategoria = {
  aliancas: businessUnits.filter(bu => bu.categoria === 'alianca'),
  plataformas: businessUnits.filter(bu => bu.categoria === 'plataforma'),
  corporativos: businessUnits.filter(bu => bu.categoria === 'corporativo'),
};
