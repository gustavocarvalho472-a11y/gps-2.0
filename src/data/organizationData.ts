/**
 * GPS 2.0 - Dados da Estrutura Organizacional
 * Mock data com VPs, BUs, Domínios, Jornadas, Macroprocessos e Processos
 */

import type { VP, BusinessUnit, Responsavel, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../types';

// ============================================
// VPs (Vice-Presidentes) - 10 no total
// ============================================

export const vps: VP[] = [
  {
    id: 'vp-1',
    nome: 'Roberto Valério',
    cargo: 'CEO',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    cor: '#7C3AED', // violet
  },
  {
    id: 'vp-2',
    nome: 'Mario Ghio',
    cargo: 'VP Alianças Educacionais',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    cor: '#8B5CF6', // purple
  },
  {
    id: 'vp-3',
    nome: 'Fernando Sasaki',
    cargo: 'VP Ensino Superior',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    cor: '#6366F1', // indigo
  },
  {
    id: 'vp-4',
    nome: 'Patricia Volpi',
    cargo: 'VP Educação Continuada',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    cor: '#EC4899', // pink
  },
  {
    id: 'vp-5',
    nome: 'Carlos Mendes',
    cargo: 'VP Revenue & Growth',
    foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face',
    cor: '#F59E0B', // amber
  },
  {
    id: 'vp-6',
    nome: 'Amanda Ribeiro',
    cargo: 'VP Experiência & Produto',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    cor: '#14B8A6', // teal
  },
  {
    id: 'vp-7',
    nome: 'Ricardo Torres',
    cargo: 'VP Transformação Digital',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    cor: '#0EA5E9', // sky
  },
  {
    id: 'vp-8',
    nome: 'Juliana Costa',
    cargo: 'VP Pessoas & Cultura',
    foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
    cor: '#22C55E', // green
  },
  {
    id: 'vp-9',
    nome: 'Eduardo Lima',
    cargo: 'CFO',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
    cor: '#EF4444', // red
  },
  {
    id: 'vp-10',
    nome: 'Marcelo Oliveira',
    cargo: 'CTO',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
    cor: '#3B82F6', // blue
  },
];

// ============================================
// RESPONSÁVEIS (Donos)
// ============================================

const responsaveis: Record<string, Responsavel> = {
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
  const nomesProcessos = [
    'Receber solicitação', 'Validar dados', 'Processar informações', 'Aprovar requisição',
    'Enviar notificação', 'Atualizar cadastro', 'Gerar relatório', 'Arquivar documentos',
    'Revisar pendências', 'Finalizar atendimento', 'Registrar ocorrência', 'Encaminhar área'
  ];

  return Array.from({ length: quantidade }, (_, i) => ({
    id: `${macroId}-p-${i + 1}`,
    codigo: `P${String(i + 1).padStart(3, '0')}`,
    nome: nomesProcessos[i % nomesProcessos.length],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    complexidade: complexidades[Math.floor(Math.random() * complexidades.length)],
    automatizacao: Math.floor(Math.random() * 100),
    fte: +(Math.random() * 5 + 0.5).toFixed(1),
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
    const macros = gerarMacroprocessos(`${dominioId}-j-${i + 1}`, Math.floor(Math.random() * 4) + 2, macroNomes);
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
// Função para criar BU com totais calculados
// ============================================

function criarBU(
  id: string,
  codigo: string,
  nome: string,
  categoria: 'alianca' | 'plataforma' | 'corporativo',
  cor: string,
  vpId: string,
  responsavel: Responsavel,
  configDominios: { nome: string; jornadas: string[] }[]
): BusinessUnit {
  const dominios = gerarDominios(id, configDominios);
  return {
    id,
    codigo,
    nome,
    categoria,
    cor,
    vpId,
    responsavel,
    dominios,
    totalDominios: dominios.length,
    totalJornadas: dominios.reduce((acc, d) => acc + d.totalJornadas, 0),
    totalMacroprocessos: dominios.reduce((acc, d) => acc + d.totalMacroprocessos, 0),
    totalProcessos: dominios.reduce((acc, d) => acc + d.totalProcessos, 0),
  };
}

// ============================================
// BUSINESS UNITS DATA - 10 BUs Cogna
// ============================================

export const businessUnits: BusinessUnit[] = [
  // ==================== ALIANÇAS (Unidades de Negócio Educacionais) ====================

  // 1. Somos
  criarBU('bu-somos', 'SOMOS', 'Somos', 'alianca', '#8B5CF6', 'vp-2',
    { id: 'r-somos', nome: 'Rodrigo Galindo', cargo: 'CEO SOMOS', area: 'SOMOS', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Gestão Escolar', jornadas: ['Matrícula', 'Rematrícula', 'Transferência', 'Secretaria'] },
      { nome: 'Conteúdo Didático', jornadas: ['Produção Editorial', 'Revisão Pedagógica', 'Publicação'] },
      { nome: 'Plataforma Digital', jornadas: ['Acesso Aluno', 'Gestão Conteúdo', 'Suporte Técnico'] },
      { nome: 'Comercial B2B', jornadas: ['Prospecção', 'Negociação', 'Implantação'] },
    ]
  ),

  // 2. Saber
  criarBU('bu-saber', 'SABER', 'Saber', 'alianca', '#6366F1', 'vp-3',
    { id: 'r-saber', nome: 'Ana Martins', cargo: 'CEO Saber', area: 'Saber', foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Graduação Presencial', jornadas: ['Vestibular', 'Matrícula', 'Vida Acadêmica', 'Formatura'] },
      { nome: 'Graduação EAD', jornadas: ['Inscrição Online', 'Tutoria', 'Avaliação', 'Certificação'] },
      { nome: 'Pós-Graduação', jornadas: ['Seleção', 'Orientação', 'Defesa TCC'] },
      { nome: 'Relacionamento Aluno', jornadas: ['Atendimento', 'Ouvidoria', 'Fidelização'] },
    ]
  ),

  // 3. Aliança 2 - Jovens e Adultos
  criarBU('bu-alianca2', 'AL2', 'Aliança 2 - Jovens e Adultos', 'alianca', '#EC4899', 'vp-4',
    { id: 'r-alianca2', nome: 'Pedro Costa', cargo: 'Diretor Aliança 2', area: 'Aliança 2', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'EJA - Educação de Jovens e Adultos', jornadas: ['Captação', 'Matrícula', 'Acompanhamento', 'Conclusão'] },
      { nome: 'Cursos Técnicos', jornadas: ['Oferta', 'Inscrição', 'Estágio', 'Certificação'] },
      { nome: 'Preparatórios', jornadas: ['ENEM', 'Concursos', 'Vestibulares'] },
    ]
  ),

  // 4. Aliança 3 - Lifelong Learning
  criarBU('bu-alianca3', 'AL3', 'Aliança 3 - Lifelong Learning', 'alianca', '#F97316', 'vp-4',
    { id: 'r-alianca3', nome: 'Renata Lima', cargo: 'Diretora Aliança 3', area: 'Aliança 3', foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Educação Corporativa', jornadas: ['Diagnóstico', 'Customização', 'Entrega', 'Mensuração'] },
      { nome: 'Cursos Livres', jornadas: ['Catálogo', 'Inscrição', 'Consumo', 'Certificação'] },
      { nome: 'Bootcamps', jornadas: ['Lançamento', 'Seleção', 'Imersão', 'Empregabilidade'] },
    ]
  ),

  // ==================== PLATAFORMAS (Áreas de Suporte ao Negócio) ====================

  // 5. Revenue Office
  criarBU('bu-revenue', 'REV', 'Revenue Office', 'plataforma', '#F59E0B', 'vp-5',
    { id: 'r-revenue', nome: 'Carlos Mendes', cargo: 'VP Revenue', area: 'Revenue', foto: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Pricing & Revenue Management', jornadas: ['Análise Mercado', 'Precificação', 'Aprovação', 'Monitoramento'] },
      { nome: 'Cobrança', jornadas: ['Faturamento', 'Régua de Cobrança', 'Inadimplência', 'Recuperação'] },
      { nome: 'CRM & Vendas', jornadas: ['Leads', 'Qualificação', 'Conversão', 'Retenção'] },
    ]
  ),

  // 6. Learning Experience
  criarBU('bu-lex', 'LEX', 'Learning Experience', 'plataforma', '#14B8A6', 'vp-6',
    { id: 'r-lex', nome: 'Amanda Ribeiro', cargo: 'VP Learning Experience', area: 'LEx', foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Design Instrucional', jornadas: ['Concepção', 'Roteirização', 'Desenvolvimento', 'Revisão'] },
      { nome: 'Produção Multimídia', jornadas: ['Gravação', 'Edição', 'Pós-produção', 'Publicação'] },
      { nome: 'Plataforma LMS', jornadas: ['Configuração', 'Curadoria', 'Analytics', 'Suporte'] },
    ]
  ),

  // 7. Transformation Office
  criarBU('bu-trx', 'TRX', 'Transformation Office', 'plataforma', '#0EA5E9', 'vp-7',
    { id: 'r-trx', nome: 'Ricardo Torres', cargo: 'VP Transformação', area: 'TrX', foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Processos', jornadas: ['Mapeamento', 'Análise', 'Otimização', 'Automação'] },
      { nome: 'Projetos Estratégicos', jornadas: ['Intake', 'Planejamento', 'Execução', 'Encerramento'] },
      { nome: 'Change Management', jornadas: ['Diagnóstico', 'Comunicação', 'Treinamento', 'Adoção'] },
    ]
  ),

  // ==================== CORPORATIVO (Funções Corporativas) ====================

  // 8. G&CC - Gente, Cultura e Comunicação
  criarBU('bu-gcc', 'GCC', 'G&CC', 'corporativo', '#22C55E', 'vp-8',
    { id: 'r-gcc', nome: 'Juliana Costa', cargo: 'VP Gente & Cultura', area: 'G&CC', foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Talent Acquisition', jornadas: ['Requisição', 'Seleção', 'Contratação', 'Onboarding'] },
      { nome: 'Desenvolvimento', jornadas: ['Avaliação Desempenho', 'PDI', 'Treinamento', 'Sucessão'] },
      { nome: 'Operações RH', jornadas: ['Folha de Pagamento', 'Benefícios', 'Férias', 'Desligamento'] },
      { nome: 'Comunicação Interna', jornadas: ['Campanhas', 'Endomarketing', 'Eventos'] },
    ]
  ),

  // 9. Finanças
  criarBU('bu-fin', 'FIN', 'Finanças', 'corporativo', '#EF4444', 'vp-9',
    { id: 'r-fin', nome: 'Eduardo Lima', cargo: 'CFO', area: 'Finanças', foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Contabilidade', jornadas: ['Lançamentos', 'Conciliação', 'Fechamento Mensal', 'Balanço'] },
      { nome: 'Tesouraria', jornadas: ['Contas a Pagar', 'Contas a Receber', 'Gestão de Caixa'] },
      { nome: 'Controladoria', jornadas: ['Orçamento', 'Forecast', 'Reporting', 'Análise Variância'] },
      { nome: 'Fiscal & Tributário', jornadas: ['Apuração', 'Obrigações Acessórias', 'Planejamento Tributário'] },
    ]
  ),

  // 10. Tecnologia
  criarBU('bu-tech', 'TECH', 'Tecnologia', 'corporativo', '#3B82F6', 'vp-10',
    { id: 'r-tech', nome: 'Marcelo Oliveira', cargo: 'CTO', area: 'Tech', foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face' },
    [
      { nome: 'Desenvolvimento', jornadas: ['Discovery', 'Build', 'Test', 'Deploy'] },
      { nome: 'Infraestrutura & Cloud', jornadas: ['Provisionamento', 'Monitoramento', 'Incidentes', 'Capacity'] },
      { nome: 'Data & Analytics', jornadas: ['Ingestão', 'Processamento', 'Modelagem', 'Visualização'] },
      { nome: 'Segurança', jornadas: ['Governança', 'Compliance', 'Resposta Incidentes'] },
    ]
  ),
];

// ============================================
// HELPERS para busca
// ============================================

export function getVPById(id: string): VP | undefined {
  return vps.find(vp => vp.id === id);
}

export function getBUsByVP(vpId: string): BusinessUnit[] {
  return businessUnits.filter(bu => bu.vpId === vpId);
}

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
  get totalVPs() { return vps.length; },
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
