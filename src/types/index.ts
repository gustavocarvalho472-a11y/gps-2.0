/**
 * GPS 2.0 - Type Definitions
 */

// Hierarchy: VP → BU → Domínio → Jornada → Macroprocesso → Processo

// Owner info - usado em todos os níveis
export interface Responsavel {
  id: string;
  nome: string;
  cargo?: string;
  area?: string;
  foto?: string;
}

// Vice-Presidente - Nível mais alto
export interface VP {
  id: string;
  nome: string;
  cargo: string;
  foto?: string;
  cor: string; // Cor do VP para identificação visual
}

// Categoria de BU
export type BUCategoria = 'alianca' | 'plataforma' | 'corporativo';

// Business Unit - Vinculada a um VP
export interface BusinessUnit {
  id: string;
  codigo: string;
  nome: string;
  categoria: BUCategoria;
  cor: string;
  icone?: string;
  vpId: string; // ID do VP responsável
  responsavel: Responsavel;
  dominios: DominioCompleto[];
  // Métricas agregadas
  totalDominios: number;
  totalJornadas: number;
  totalMacroprocessos: number;
  totalProcessos: number;
}

// Domínio com dono
export interface DominioCompleto {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  responsavel: Responsavel;
  jornadas: JornadaCompleta[];
  // Métricas
  totalJornadas: number;
  totalMacroprocessos: number;
  totalProcessos: number;
}

// Jornada com dono
export interface JornadaCompleta {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  responsavel: Responsavel;
  macroprocessos: MacroprocessoCompleto[];
  // Métricas
  totalMacroprocessos: number;
  totalProcessos: number;
}

// Macroprocesso com dono
export interface MacroprocessoCompleto {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  responsavel: Responsavel;
  processos: Processo[];
  // Métricas
  totalProcessos: number;
}

// SIPOC - Metodologia de análise de processos
export interface ProcessSIPOC {
  supplier: string;       // Fornecedor - quem fornece os insumos
  input: string;          // Entrada - o que entra no processo
  processSteps: string[]; // Etapas - lista ordenada de steps do processo
  output: string;         // Saída - o que o processo produz
  customer: string;       // Cliente - quem recebe o resultado
}

export interface Processo {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  responsavel?: Responsavel;
  status: 'ativo' | 'inativo' | 'em_revisao';
  complexidade?: 'baixa' | 'media' | 'alta';
  automatizacao?: number; // 0-100%
  analitico?: number; // 0-100%
  fte?: number;
  // SIPOC data
  sipoc?: ProcessSIPOC;
  ferramentas?: string[]; // ferramentas utilizadas
  area?: string;          // departamento/área
}

// Legacy types for ArquiteturaView
export type DominioTipo = 'estrategico' | 'core' | 'plataforma' | 'corporativo';

export interface Macroprocesso {
  id: string;
  codigo: string;
  nome: string;
  processos: Processo[];
}

export interface Jornada {
  id: string;
  codigo: string;
  nome: string;
  dono?: string;
  dominioId?: string;
  dominioNome?: string;
  dominioTipo?: DominioTipo;
  propostasValorIds?: string[];
  macroprocessos: Macroprocesso[];
  totalProcessos: number;
}

export interface PropostaValor {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  cor: string;
  jornadas: Jornada[];
}

export interface Dominio {
  id: string;
  nome: string;
  tipo: DominioTipo;
  jornadas?: Jornada[];
  propostasValor?: PropostaValor[];
  totalProcessos: number;
}

export interface ArquiteturaData {
  dominios: Dominio[];
  totalProcessos: number;
  totalJornadas: number;
  totalMacroprocessos: number;
}

export interface JornadaCompleta extends Jornada {
  dominio: {
    id: string;
    nome: string;
    tipo: DominioTipo;
  };
  propostasValor: {
    id: string;
    codigo: string;
    nome: string;
    cor: string;
  }[];
}

export interface DonoJornada {
  id: string;
  nome: string;
  cargo?: string;
  area?: string;
  jornadas: JornadaCompleta[];
  totalProcessos: number;
}

// Detail Panel - Para o modal lateral
export type DetailType = 'bu' | 'dominio' | 'jornada' | 'macro' | 'processo';

export interface DetailPanelState {
  isOpen: boolean;
  type: DetailType | null;
  data: BusinessUnit | DominioCompleto | JornadaCompleta | MacroprocessoCompleto | Processo | null;
  breadcrumb: { type: DetailType; id: string; nome: string }[];
}

// Dropdown/Expandable state
export interface ExpandedState {
  buId: string | null;
  dominioId: string | null;
  jornadaId: string | null;
  macroId: string | null;
}

// Filter types for Structure View
export interface StructureFilterState {
  search: string;
  vpId: string | null;
  categoria: BUCategoria | null;
}

// Legacy filter types for Arquitetura View
export interface FilterState {
  businessUnit: string | null;
  segmento: string | null;
  marca: string | null;
  produto: string | null;
  modalidade: string | null;
  dominio: string | null;
  jornada: string | null;
  processo: string | null;
}

// Navigation
export type PageType =
  | 'home'
  | 'estrutura'
  | 'arquitetura'
  | 'arvore'
  | 'heatmap'
  | 'configuracoes'
  | 'cadeia'
  | 'bu-detail'
  | 'dominio-detail'
  | 'jornada-detail'
  | 'macro-detail'
  | 'processo-detail'
  // Cadastros section
  | 'cadastros-dominios'
  | 'cadastros-jornadas'
  | 'cadastros-macroprocessos'
  | 'cadastros-processos'
  | 'cadastros-processo-detalhe'
  | 'cadastros-processo-novo';
export type ViewType = 'arquitetura' | 'arvore' | 'heatmap';

// Processo detalhado (para página de cadastro)
export interface ProcessoDetalhado extends Processo {
  dominio?: { id: string; codigo: string; nome: string };
  jornada?: { id: string; codigo: string; nome: string };
  macroprocesso?: { id: string; codigo: string; nome: string };
  bu?: { id: string; codigo: string; nome: string };
  vp?: { id: string; nome: string };
  criadoEm?: string;
  atualizadoEm?: string;
  criticidade?: 'baixa' | 'media' | 'alta' | 'critico';
}

// Navigation Item
export interface NavigationItem {
  id: PageType;
  label: string;
  icon: string;
  description: string;
  children?: NavigationItem[];
}
