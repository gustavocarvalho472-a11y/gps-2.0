/**
 * GPS 2.0 - Dados da Estrutura Organizacional
 * Simulação realista com nomes únicos em todos os níveis
 * Hierarquia: CEO (N0) → VP (N1) → BU Owner (N2) → Domínio (N3) → Jornada (N4) → Macro (N5) → Processo (N6)
 */

import type { VP, BusinessUnit, Responsavel, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../types';

// ============================================
// FOTOS - Pool de URLs Unsplash (sem repetição)
// ============================================
const F = {
  m1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  m2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  m3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  m4: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face',
  m5: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
  m6: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  m7: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
  m8: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face',
  m9: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&h=80&fit=crop&crop=face',
  m10: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&crop=face',
  m11: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&crop=face',
  m12: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face',
  m13: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face',
  m14: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=80&h=80&fit=crop&crop=face',
  m15: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=80&h=80&fit=crop&crop=face',
  m16: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=80&h=80&fit=crop&crop=face',
  f1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  f2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  f3: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face',
  f4: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  f5: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  f6: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  f7: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  f8: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face',
  f9: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  f10: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&h=80&fit=crop&crop=face',
  f11: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&h=80&fit=crop&crop=face',
  f12: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&h=80&fit=crop&crop=face',
  f13: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face',
};

// ============================================
// VPs (Vice-Presidentes) - N1 - 9 VPs + CEO
// ============================================
export const vps: VP[] = [
  {
    id: 'vp-1',
    nome: 'Roberto Valério',
    cargo: 'CEO',
    foto: F.m1,
    cor: '#7C3AED',
  },
  {
    id: 'vp-2',
    nome: 'Mario Ghio',
    cargo: 'VP Alianças Educacionais',
    foto: F.m2,
    cor: '#8B5CF6',
    equipe: [
      { id: 'eq-vp2-1', nome: 'Carolina Mendes', cargo: 'Assessora Executiva', area: 'VP Alianças', foto: F.f8 },
      { id: 'eq-vp2-2', nome: 'Diego Ferreira', cargo: 'Coordenador de Planejamento', area: 'VP Alianças', foto: F.m10 },
    ],
  },
  {
    id: 'vp-3',
    nome: 'Fernando Sasaki',
    cargo: 'VP Ensino Superior',
    foto: F.m3,
    cor: '#6366F1',
    equipe: [
      { id: 'eq-vp3-1', nome: 'Elisa Tavares', cargo: 'Analista Sênior', area: 'VP Ensino Superior', foto: F.f9 },
    ],
  },
  {
    id: 'vp-4',
    nome: 'Patricia Volpi',
    cargo: 'VP Educação Continuada',
    foto: F.f1,
    cor: '#EC4899',
    equipe: [
      { id: 'eq-vp4-1', nome: 'Fábio Santos', cargo: 'Coordenador de Portfólio', area: 'VP Ed. Continuada', foto: F.m11 },
      { id: 'eq-vp4-2', nome: 'Gabrielle Nunes', cargo: 'Analista de Estratégia', area: 'VP Ed. Continuada', foto: F.f10 },
    ],
  },
  {
    id: 'vp-5',
    nome: 'Carlos Mendes',
    cargo: 'VP Revenue & Growth',
    foto: F.m4,
    cor: '#F59E0B',
    equipe: [
      { id: 'eq-vp5-1', nome: 'Humberto Silva', cargo: 'Especialista BI', area: 'Revenue', foto: F.m12 },
    ],
  },
  {
    id: 'vp-6',
    nome: 'Amanda Ribeiro',
    cargo: 'VP Experiência & Produto',
    foto: F.f2,
    cor: '#14B8A6',
    equipe: [
      { id: 'eq-vp6-1', nome: 'Ivana Pereira', cargo: 'Designer Lead', area: 'LEx', foto: F.f11 },
    ],
  },
  {
    id: 'vp-7',
    nome: 'Ricardo Torres',
    cargo: 'VP Transformação Digital',
    foto: F.m5,
    cor: '#0EA5E9',
    equipe: [
      { id: 'eq-vp7-1', nome: 'Jorge Machado', cargo: 'Arquiteto de Processos', area: 'TrX', foto: F.m13 },
      { id: 'eq-vp7-2', nome: 'Karina Rocha', cargo: 'PMO', area: 'TrX', foto: F.f12 },
    ],
  },
  {
    id: 'vp-8',
    nome: 'Juliana Costa',
    cargo: 'VP Pessoas & Cultura',
    foto: F.f3,
    cor: '#22C55E',
    equipe: [
      { id: 'eq-vp8-1', nome: 'Leandro Costa', cargo: 'Business Partner', area: 'G&CC', foto: F.m14 },
    ],
  },
  {
    id: 'vp-9',
    nome: 'Eduardo Lima',
    cargo: 'CFO',
    foto: F.m6,
    cor: '#EF4444',
    equipe: [
      { id: 'eq-vp9-1', nome: 'Milena Souza', cargo: 'Analista FP&A Sênior', area: 'Finanças', foto: F.f13 },
    ],
  },
  {
    id: 'vp-10',
    nome: 'Marcelo Oliveira',
    cargo: 'CTO',
    foto: F.m7,
    cor: '#3B82F6',
    equipe: [
      { id: 'eq-vp10-1', nome: 'Nelson Gomes', cargo: 'Tech Lead', area: 'Tecnologia', foto: F.m15 },
      { id: 'eq-vp10-2', nome: 'Olívia Fernandes', cargo: 'Scrum Master', area: 'Tecnologia', foto: F.f4 },
    ],
  },
];

// ============================================
// POOLS DE RESPONSÁVEIS POR NÍVEL
// ============================================

// N2 - BU Owners (10 únicos)
const buOwners: Record<string, Responsavel> = {
  somos: { id: 'bo-1', nome: 'Rodrigo Galindo', cargo: 'CEO SOMOS', area: 'SOMOS', foto: F.m8 },
  saber: { id: 'bo-2', nome: 'Ana Martins', cargo: 'CEO Saber', area: 'Saber', foto: F.f5 },
  alianca2: { id: 'bo-3', nome: 'Pedro Costa', cargo: 'Diretor Aliança 2', area: 'Aliança 2', foto: F.m9 },
  alianca3: { id: 'bo-4', nome: 'Renata Lima', cargo: 'Diretora Aliança 3', area: 'Aliança 3', foto: F.f6 },
  revenue: { id: 'bo-5', nome: 'Thiago Andrade', cargo: 'Diretor de Revenue', area: 'Revenue', foto: F.m10 },
  lex: { id: 'bo-6', nome: 'Mariana Duarte', cargo: 'Diretora de Produto', area: 'Learning Experience', foto: F.f7 },
  trx: { id: 'bo-7', nome: 'Lucas Ferreira', cargo: 'Diretor de Transformação', area: 'TrX', foto: F.m11 },
  gcc: { id: 'bo-8', nome: 'Beatriz Moraes', cargo: 'Diretora de RH', area: 'G&CC', foto: F.f8 },
  fin: { id: 'bo-9', nome: 'André Campos', cargo: 'Controller', area: 'Finanças', foto: F.m12 },
  tech: { id: 'bo-10', nome: 'Rafael Mendonça', cargo: 'Diretor de Engenharia', area: 'Tecnologia', foto: F.m13 },
};

// N3 - Domain Owners (18 únicos)
const domOwners: Responsavel[] = [
  { id: 'do-1', nome: 'Ana Paula Santos', cargo: 'Gerente de Domínio', area: 'Gestão Escolar', foto: F.f4 },
  { id: 'do-2', nome: 'Bruno Carvalho', cargo: 'Gerente de Domínio', area: 'Comercial', foto: F.m14 },
  { id: 'do-3', nome: 'Camila Ferreira', cargo: 'Gerente de Domínio', area: 'Acadêmico', foto: F.f5 },
  { id: 'do-4', nome: 'Fernanda Ribeiro', cargo: 'Gerente de Domínio', area: 'Plataforma', foto: F.f9 },
  { id: 'do-5', nome: 'Gustavo Henrique', cargo: 'Gerente de Domínio', area: 'Graduação', foto: F.m15 },
  { id: 'do-6', nome: 'Helena Vieira', cargo: 'Gerente de Domínio', area: 'Pós-Graduação', foto: F.f10 },
  { id: 'do-7', nome: 'Igor Nascimento', cargo: 'Gerente de Domínio', area: 'EJA', foto: F.m16 },
  { id: 'do-8', nome: 'Julia Almeida', cargo: 'Gerente de Domínio', area: 'Corporativo', foto: F.f11 },
  { id: 'do-9', nome: 'Kleber Dias', cargo: 'Gerente de Domínio', area: 'Pricing', foto: F.m8 },
  { id: 'do-10', nome: 'Larissa Monteiro', cargo: 'Gerente de Domínio', area: 'Design Instrucional', foto: F.f12 },
  { id: 'do-11', nome: 'Marcos Vinicius', cargo: 'Gerente de Domínio', area: 'Processos', foto: F.m9 },
  { id: 'do-12', nome: 'Natalia Pereira', cargo: 'Gerente de Domínio', area: 'Talent', foto: F.f13 },
  { id: 'do-13', nome: 'Otávio Barbosa', cargo: 'Gerente de Domínio', area: 'Contabilidade', foto: F.m2 },
  { id: 'do-14', nome: 'Paula Gomes', cargo: 'Gerente de Domínio', area: 'Desenvolvimento SW', foto: F.f6 },
  { id: 'do-15', nome: 'Roberto Alves', cargo: 'Gerente de Domínio', area: 'Infra & Cloud', foto: F.m3 },
  { id: 'do-16', nome: 'Sandra Oliveira', cargo: 'Gerente de Domínio', area: 'Comunicação', foto: F.f7 },
  { id: 'do-17', nome: 'Tiago Pinto', cargo: 'Gerente de Domínio', area: 'Cursos Livres', foto: F.m4 },
  { id: 'do-18', nome: 'Vanessa Cruz', cargo: 'Gerente de Domínio', area: 'Data & Analytics', foto: F.f1 },
];

// N4 - Journey Owners (12 únicos)
const jorOwners: Responsavel[] = [
  { id: 'jo-1', nome: 'Daniel Souza', cargo: 'Product Owner', area: 'Matrícula', foto: F.m8 },
  { id: 'jo-2', nome: 'Elena Martins', cargo: 'Product Owner', area: 'Jornada do Aluno', foto: F.f6 },
  { id: 'jo-3', nome: 'Francisco Barros', cargo: 'Product Owner', area: 'Captação', foto: F.m14 },
  { id: 'jo-4', nome: 'Giovana Silva', cargo: 'Product Owner', area: 'Implantação', foto: F.f9 },
  { id: 'jo-5', nome: 'Henrique Moura', cargo: 'Product Owner', area: 'Conteúdo', foto: F.m15 },
  { id: 'jo-6', nome: 'Ingrid Teixeira', cargo: 'Product Owner', area: 'Financeiro', foto: F.f10 },
  { id: 'jo-7', nome: 'Jonas Freitas', cargo: 'Product Owner', area: 'Cobrança', foto: F.m16 },
  { id: 'jo-8', nome: 'Karen Lopes', cargo: 'Product Owner', area: 'Produção', foto: F.f11 },
  { id: 'jo-9', nome: 'Leonardo Ramos', cargo: 'Product Owner', area: 'Deploy', foto: F.m10 },
  { id: 'jo-10', nome: 'Michele Castro', cargo: 'Product Owner', area: 'Seleção', foto: F.f12 },
  { id: 'jo-11', nome: 'Nilton Marques', cargo: 'Product Owner', area: 'Projetos', foto: F.m11 },
  { id: 'jo-12', nome: 'Priscila Fonseca', cargo: 'Product Owner', area: 'Analytics', foto: F.f13 },
];

// N5 - Macro Owners (10 únicos)
const macOwners: Responsavel[] = [
  { id: 'mo-1', nome: 'Felipe Almeida', cargo: 'Process Owner', area: 'Processos', foto: F.m1 },
  { id: 'mo-2', nome: 'Gabriela Lima', cargo: 'Process Owner', area: 'Operações', foto: F.f7 },
  { id: 'mo-3', nome: 'Hugo Nascimento', cargo: 'Process Owner', area: 'Qualidade', foto: F.m3 },
  { id: 'mo-4', nome: 'Isabela Torres', cargo: 'Process Owner', area: 'Melhoria Contínua', foto: F.f4 },
  { id: 'mo-5', nome: 'Jefferson Cardoso', cargo: 'Process Owner', area: 'Automação', foto: F.m5 },
  { id: 'mo-6', nome: 'Luana Correia', cargo: 'Process Owner', area: 'Compliance', foto: F.f8 },
  { id: 'mo-7', nome: 'Matheus Rocha', cargo: 'Process Owner', area: 'Eficiência', foto: F.m6 },
  { id: 'mo-8', nome: 'Nathalie Santos', cargo: 'Process Owner', area: 'Governança', foto: F.f9 },
  { id: 'mo-9', nome: 'Otávio Mendes', cargo: 'Process Owner', area: 'Integração', foto: F.m7 },
  { id: 'mo-10', nome: 'Patrícia Viana', cargo: 'Process Owner', area: 'Monitoramento', foto: F.f10 },
];

// N6 - Process Owners (8 únicos)
const procOwners: Responsavel[] = [
  { id: 'po-1', nome: 'Paulo Henrique', cargo: 'Analista de Processos', area: 'Processos', foto: F.m9 },
  { id: 'po-2', nome: 'Raquel Menezes', cargo: 'Analista de Processos Sr.', area: 'Qualidade', foto: F.f11 },
  { id: 'po-3', nome: 'Samuel Oliveira', cargo: 'Analista de Processos', area: 'Operações', foto: F.m14 },
  { id: 'po-4', nome: 'Tatiane Ferraz', cargo: 'Coordenadora de Processos', area: 'Governança', foto: F.f12 },
  { id: 'po-5', nome: 'Vinícius Lira', cargo: 'Analista de Processos', area: 'Automação', foto: F.m15 },
  { id: 'po-6', nome: 'Yasmin Borges', cargo: 'Analista de Processos Jr.', area: 'Melhoria', foto: F.f13 },
  { id: 'po-7', nome: 'Wagner Teles', cargo: 'Analista de Processos', area: 'Compliance', foto: F.m16 },
  { id: 'po-8', nome: 'Simone Amaral', cargo: 'Analista de Processos Sr.', area: 'Eficiência', foto: F.f1 },
];

// Team members (non-owners) - pools per level
const buTeam: Responsavel[][] = [
  // Somos
  [
    { id: 'bt-1', nome: 'Viviane Lopes', cargo: 'Coordenadora Pedagógica', area: 'SOMOS', foto: F.f2 },
    { id: 'bt-2', nome: 'Anderson Prado', cargo: 'Analista Comercial Sr.', area: 'SOMOS', foto: F.m4 },
  ],
  // Saber
  [
    { id: 'bt-3', nome: 'Lígia Farias', cargo: 'Coord. Acadêmica', area: 'Saber', foto: F.f3 },
    { id: 'bt-4', nome: 'Roberto Neto', cargo: 'Analista de Regulação', area: 'Saber', foto: F.m5 },
  ],
  // Aliança 2
  [
    { id: 'bt-5', nome: 'Cíntia Medeiros', cargo: 'Analista EJA', area: 'Aliança 2', foto: F.f8 },
  ],
  // Aliança 3
  [
    { id: 'bt-6', nome: 'Patrick Duarte', cargo: 'Analista de Mercado', area: 'Aliança 3', foto: F.m6 },
  ],
  // Revenue
  [
    { id: 'bt-7', nome: 'Queila Martins', cargo: 'Analista de Pricing', area: 'Revenue', foto: F.f9 },
    { id: 'bt-8', nome: 'Rodrigo Neto', cargo: 'Analista CRM', area: 'Revenue', foto: F.m7 },
  ],
  // LEx
  [
    { id: 'bt-9', nome: 'Tamires Gonçalves', cargo: 'Designer Instrucional', area: 'LEx', foto: F.f10 },
  ],
  // TrX
  [
    { id: 'bt-10', nome: 'Thiago Lima', cargo: 'Analista de Projetos', area: 'TrX', foto: F.m8 },
    { id: 'bt-11', nome: 'Débora Pinheiro', cargo: 'Change Manager', area: 'TrX', foto: F.f11 },
  ],
  // G&CC
  [
    { id: 'bt-12', nome: 'Marcela Vasconcelos', cargo: 'Analista de DHO', area: 'G&CC', foto: F.f12 },
  ],
  // Finanças
  [
    { id: 'bt-13', nome: 'Caio Barros', cargo: 'Analista Fiscal Sr.', area: 'Finanças', foto: F.m9 },
    { id: 'bt-14', nome: 'Lorena Assis', cargo: 'Analista Contábil', area: 'Finanças', foto: F.f13 },
  ],
  // Tecnologia
  [
    { id: 'bt-15', nome: 'Alexandre Ramos', cargo: 'DevOps Engineer', area: 'Tecnologia', foto: F.m10 },
    { id: 'bt-16', nome: 'Bianca Moreira', cargo: 'Data Engineer', area: 'Tecnologia', foto: F.f4 },
  ],
];

// Domain-level team members (1 per some domains)
const domTeam: Responsavel[] = [
  { id: 'dt-1', nome: 'Carla Mendonça', cargo: 'Analista de Negócios', area: 'Gestão Escolar', foto: F.f5 },
  { id: 'dt-2', nome: 'Eduardo Reis', cargo: 'Analista de Sistemas', area: 'Plataforma Digital', foto: F.m11 },
  { id: 'dt-3', nome: 'Flavia Monteiro', cargo: 'Analista Acadêmico', area: 'Graduação', foto: F.f6 },
  { id: 'dt-4', nome: 'Giovanni Bastos', cargo: 'Coord. Operações', area: 'Cobrança', foto: F.m12 },
  { id: 'dt-5', nome: 'Heloísa Cunha', cargo: 'UX Researcher', area: 'LMS', foto: F.f7 },
  { id: 'dt-6', nome: 'Ivan Correia', cargo: 'Analista de Processos', area: 'Processos', foto: F.m13 },
  { id: 'dt-7', nome: 'Jéssica Braga', cargo: 'Analista de RH', area: 'Talent', foto: F.f8 },
  { id: 'dt-8', nome: 'Kevin Araújo', cargo: 'Analista Contábil Jr.', area: 'Contabilidade', foto: F.m14 },
  { id: 'dt-9', nome: 'Letícia Fonseca', cargo: 'QA Engineer', area: 'Desenvolvimento', foto: F.f9 },
  { id: 'dt-10', nome: 'Murilo Peixoto', cargo: 'SRE Engineer', area: 'Infra & Cloud', foto: F.m15 },
];

// Journey-level team members
const jorTeam: Responsavel[] = [
  { id: 'jt-1', nome: 'Adriana Borges', cargo: 'Analista Jr.', area: 'Matrícula', foto: F.f10 },
  { id: 'jt-2', nome: 'Bruno Teixeira', cargo: 'Estagiário', area: 'Secretaria', foto: F.m16 },
  { id: 'jt-3', nome: 'Cristina Leal', cargo: 'Analista Jr.', area: 'Seleção', foto: F.f11 },
  { id: 'jt-4', nome: 'Denis Moreira', cargo: 'Estagiário', area: 'Forecast', foto: F.m1 },
  { id: 'jt-5', nome: 'Estela Vieira', cargo: 'Analista Jr.', area: 'Avaliação', foto: F.f12 },
  { id: 'jt-6', nome: 'Filipe Aguiar', cargo: 'Estagiário', area: 'Deploy', foto: F.m2 },
];

// ============================================
// HELPER: Gerar processos mock
// ============================================
let procIdx = 0;
function gerarProcessos(macroId: string, quantidade: number): Processo[] {
  const statuses: Array<'ativo' | 'inativo' | 'em_revisao'> = ['ativo', 'ativo', 'ativo', 'ativo', 'ativo', 'ativo', 'ativo', 'ativo', 'ativo', 'inativo'];
  const complexidades: Array<'baixa' | 'media' | 'alta'> = ['baixa', 'media', 'alta'];
  const nomesProcessos = [
    'Receber solicitação', 'Validar dados', 'Processar informações', 'Aprovar requisição',
    'Enviar notificação', 'Atualizar cadastro', 'Gerar relatório', 'Arquivar documentos',
    'Revisar pendências', 'Finalizar atendimento', 'Registrar ocorrência', 'Encaminhar área',
  ];

  return Array.from({ length: quantidade }, (_, i) => {
    const owner = procOwners[procIdx % procOwners.length];
    procIdx++;
    return {
      id: `${macroId}-p-${i + 1}`,
      codigo: `P${String(i + 1).padStart(3, '0')}`,
      nome: nomesProcessos[i % nomesProcessos.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      complexidade: complexidades[Math.floor(Math.random() * complexidades.length)],
      automatizacao: Math.floor(Math.random() * 100),
      fte: +(Math.random() * 5 + 0.5).toFixed(1),
      // ~50% dos processos têm dono
      ...(i % 2 === 0 ? { responsavel: owner } : {}),
    };
  });
}

// ============================================
// HELPER: Gerar macroprocessos
// ============================================
let macIdx = 0;
function gerarMacroprocessos(jornadaId: string, quantidade: number, nomesMacro: string[]): MacroprocessoCompleto[] {
  return Array.from({ length: quantidade }, (_, i) => {
    const processos = gerarProcessos(`${jornadaId}-m-${i + 1}`, Math.floor(Math.random() * 8) + 3);
    const owner = macOwners[macIdx % macOwners.length];
    macIdx++;
    return {
      id: `${jornadaId}-m-${i + 1}`,
      codigo: `M${String(i + 1).padStart(2, '0')}`,
      nome: nomesMacro[i] || `Macroprocesso ${i + 1}`,
      responsavel: owner,
      processos,
      totalProcessos: processos.length,
    };
  });
}

// ============================================
// HELPER: Gerar jornadas
// ============================================
let jorIdx = 0;
let jorTeamIdx = 0;
function gerarJornadas(dominioId: string, nomesJornadas: string[]): JornadaCompleta[] {
  const macroNomes = [
    'Captação', 'Análise', 'Processamento', 'Validação', 'Aprovação',
    'Execução', 'Monitoramento', 'Encerramento', 'Suporte', 'Melhoria',
  ];

  return nomesJornadas.map((nome, i) => {
    const macros = gerarMacroprocessos(`${dominioId}-j-${i + 1}`, Math.floor(Math.random() * 4) + 2, macroNomes);
    const totalProcessos = macros.reduce((acc, m) => acc + m.totalProcessos, 0);
    const owner = jorOwners[jorIdx % jorOwners.length];
    jorIdx++;

    // ~40% das jornadas têm team member
    const equipe = i % 3 === 0 ? [jorTeam[jorTeamIdx % jorTeam.length]] : undefined;
    if (equipe) jorTeamIdx++;

    return {
      id: `${dominioId}-j-${i + 1}`,
      codigo: `J${String(i + 1).padStart(2, '0')}`,
      nome,
      responsavel: owner,
      macroprocessos: macros,
      totalMacroprocessos: macros.length,
      totalProcessos,
      equipe,
    };
  });
}

// ============================================
// HELPER: Gerar domínios
// ============================================
let domIdx = 0;
let domTeamIdx = 0;
function gerarDominios(buId: string, configDominios: { nome: string; jornadas: string[] }[]): DominioCompleto[] {
  return configDominios.map((config, i) => {
    const jornadas = gerarJornadas(`${buId}-d-${i + 1}`, config.jornadas);
    const totalMacros = jornadas.reduce((acc, j) => acc + j.totalMacroprocessos, 0);
    const totalProcs = jornadas.reduce((acc, j) => acc + j.totalProcessos, 0);
    const owner = domOwners[domIdx % domOwners.length];
    domIdx++;

    // ~60% dos domínios têm team member
    const equipe = i % 3 !== 2 ? [domTeam[domTeamIdx % domTeam.length]] : undefined;
    if (equipe) domTeamIdx++;

    return {
      id: `${buId}-d-${i + 1}`,
      codigo: `D${String(i + 1).padStart(2, '0')}`,
      nome: config.nome,
      responsavel: owner,
      jornadas,
      totalJornadas: jornadas.length,
      totalMacroprocessos: totalMacros,
      totalProcessos: totalProcs,
      equipe,
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
  configDominios: { nome: string; jornadas: string[] }[],
  equipe?: Responsavel[]
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
    equipe,
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
  // ==================== ALIANÇAS ====================

  // 1. Somos
  criarBU('bu-somos', 'SOMOS', 'Somos', 'alianca', '#8B5CF6', 'vp-2',
    buOwners.somos,
    [
      { nome: 'Gestão Escolar', jornadas: ['Matrícula', 'Rematrícula', 'Transferência', 'Secretaria'] },
      { nome: 'Conteúdo Didático', jornadas: ['Produção Editorial', 'Revisão Pedagógica', 'Publicação'] },
      { nome: 'Plataforma Digital', jornadas: ['Acesso Aluno', 'Gestão Conteúdo', 'Suporte Técnico'] },
      { nome: 'Comercial B2B', jornadas: ['Prospecção', 'Negociação', 'Implantação'] },
    ],
    buTeam[0]
  ),

  // 2. Saber
  criarBU('bu-saber', 'SABER', 'Saber', 'alianca', '#6366F1', 'vp-3',
    buOwners.saber,
    [
      { nome: 'Graduação Presencial', jornadas: ['Vestibular', 'Matrícula', 'Vida Acadêmica', 'Formatura'] },
      { nome: 'Graduação EAD', jornadas: ['Inscrição Online', 'Tutoria', 'Avaliação', 'Certificação'] },
      { nome: 'Pós-Graduação', jornadas: ['Seleção', 'Orientação', 'Defesa TCC'] },
      { nome: 'Relacionamento Aluno', jornadas: ['Atendimento', 'Ouvidoria', 'Fidelização'] },
    ],
    buTeam[1]
  ),

  // 3. Aliança 2
  criarBU('bu-alianca2', 'AL2', 'Aliança 2 - Jovens e Adultos', 'alianca', '#EC4899', 'vp-4',
    buOwners.alianca2,
    [
      { nome: 'EJA - Educação de Jovens e Adultos', jornadas: ['Captação', 'Matrícula', 'Acompanhamento', 'Conclusão'] },
      { nome: 'Cursos Técnicos', jornadas: ['Oferta', 'Inscrição', 'Estágio', 'Certificação'] },
      { nome: 'Preparatórios', jornadas: ['ENEM', 'Concursos', 'Vestibulares'] },
    ],
    buTeam[2]
  ),

  // 4. Aliança 3
  criarBU('bu-alianca3', 'AL3', 'Aliança 3 - Lifelong Learning', 'alianca', '#F97316', 'vp-4',
    buOwners.alianca3,
    [
      { nome: 'Educação Corporativa', jornadas: ['Diagnóstico', 'Customização', 'Entrega', 'Mensuração'] },
      { nome: 'Cursos Livres', jornadas: ['Catálogo', 'Inscrição', 'Consumo', 'Certificação'] },
      { nome: 'Bootcamps', jornadas: ['Lançamento', 'Seleção', 'Imersão', 'Empregabilidade'] },
    ],
    buTeam[3]
  ),

  // ==================== PLATAFORMAS ====================

  // 5. Revenue Office
  criarBU('bu-revenue', 'REV', 'Revenue Office', 'plataforma', '#F59E0B', 'vp-5',
    buOwners.revenue,
    [
      { nome: 'Pricing & Revenue Management', jornadas: ['Análise Mercado', 'Precificação', 'Aprovação', 'Monitoramento'] },
      { nome: 'Cobrança', jornadas: ['Faturamento', 'Régua de Cobrança', 'Inadimplência', 'Recuperação'] },
      { nome: 'CRM & Vendas', jornadas: ['Leads', 'Qualificação', 'Conversão', 'Retenção'] },
    ],
    buTeam[4]
  ),

  // 6. Learning Experience
  criarBU('bu-lex', 'LEX', 'Learning Experience', 'plataforma', '#14B8A6', 'vp-6',
    buOwners.lex,
    [
      { nome: 'Design Instrucional', jornadas: ['Concepção', 'Roteirização', 'Desenvolvimento', 'Revisão'] },
      { nome: 'Produção Multimídia', jornadas: ['Gravação', 'Edição', 'Pós-produção', 'Publicação'] },
      { nome: 'Plataforma LMS', jornadas: ['Configuração', 'Curadoria', 'Analytics', 'Suporte'] },
    ],
    buTeam[5]
  ),

  // 7. Transformation Office
  criarBU('bu-trx', 'TRX', 'Transformation Office', 'plataforma', '#0EA5E9', 'vp-7',
    buOwners.trx,
    [
      { nome: 'Processos', jornadas: ['Mapeamento', 'Análise', 'Otimização', 'Automação'] },
      { nome: 'Projetos Estratégicos', jornadas: ['Intake', 'Planejamento', 'Execução', 'Encerramento'] },
      { nome: 'Change Management', jornadas: ['Diagnóstico', 'Comunicação', 'Treinamento', 'Adoção'] },
    ],
    buTeam[6]
  ),

  // ==================== CORPORATIVO ====================

  // 8. G&CC
  criarBU('bu-gcc', 'GCC', 'G&CC', 'corporativo', '#22C55E', 'vp-8',
    buOwners.gcc,
    [
      { nome: 'Talent Acquisition', jornadas: ['Requisição', 'Seleção', 'Contratação', 'Onboarding'] },
      { nome: 'Desenvolvimento', jornadas: ['Avaliação Desempenho', 'PDI', 'Treinamento', 'Sucessão'] },
      { nome: 'Operações RH', jornadas: ['Folha de Pagamento', 'Benefícios', 'Férias', 'Desligamento'] },
      { nome: 'Comunicação Interna', jornadas: ['Campanhas', 'Endomarketing', 'Eventos'] },
    ],
    buTeam[7]
  ),

  // 9. Finanças
  criarBU('bu-fin', 'FIN', 'Finanças', 'corporativo', '#EF4444', 'vp-9',
    buOwners.fin,
    [
      { nome: 'Contabilidade', jornadas: ['Lançamentos', 'Conciliação', 'Fechamento Mensal', 'Balanço'] },
      { nome: 'Tesouraria', jornadas: ['Contas a Pagar', 'Contas a Receber', 'Gestão de Caixa'] },
      { nome: 'Controladoria', jornadas: ['Orçamento', 'Forecast', 'Reporting', 'Análise Variância'] },
      { nome: 'Fiscal & Tributário', jornadas: ['Apuração', 'Obrigações Acessórias', 'Planejamento Tributário'] },
    ],
    buTeam[8]
  ),

  // 10. Tecnologia
  criarBU('bu-tech', 'TECH', 'Tecnologia', 'corporativo', '#3B82F6', 'vp-10',
    buOwners.tech,
    [
      { nome: 'Desenvolvimento', jornadas: ['Discovery', 'Build', 'Test', 'Deploy'] },
      { nome: 'Infraestrutura & Cloud', jornadas: ['Provisionamento', 'Monitoramento', 'Incidentes', 'Capacity'] },
      { nome: 'Data & Analytics', jornadas: ['Ingestão', 'Processamento', 'Modelagem', 'Visualização'] },
      { nome: 'Segurança', jornadas: ['Governança', 'Compliance', 'Resposta Incidentes'] },
    ],
    buTeam[9]
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
