/**
 * GPS 2.0 - Type Definitions
 */

// Hierarchy: BU → Domínio → Jornada → Macroprocesso → Processo

// Owner info - usado em todos os níveis
export interface Responsavel {
  id: string;
  nome: string;
  cargo?: string;
  area?: string;
  foto?: string;
}

// Categoria de BU
export type BUCategoria = 'alianca' | 'plataforma' | 'corporativo';

// Business Unit - Nível mais alto
export interface BusinessUnit {
  id: string;
  codigo: string;
  nome: string;
  categoria: BUCategoria;
  cor: string;
  icone?: string;
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
}

// ============================================
// Tipos legados (mantidos para compatibilidade)
// ============================================

export interface Macroprocesso {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  dono?: string;
  processos: Processo[];
}

export interface Jornada {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  dono?: string;
  dominioId?: string;
  dominioNome?: string;
  dominioTipo?: 'estrategico' | 'core' | 'plataforma' | 'corporativo';
  propostasValorIds?: string[];
  macroprocessos: Macroprocesso[];
  totalProcessos: number;
}

// Visão centrada no Dono da Jornada
export interface DonoJornada {
  id: string;
  nome: string;
  cargo?: string;
  area?: string;
  foto?: string;
  jornadas: JornadaCompleta[];
  totalProcessos: number;
}

export interface JornadaCompleta extends Jornada {
  dominio: {
    id: string;
    nome: string;
    tipo: 'estrategico' | 'core' | 'plataforma' | 'corporativo';
  };
  propostasValor: {
    id: string;
    codigo: string;
    nome: string;
    cor: string;
  }[];
}

export interface PropostaValor {
  id: string;
  codigo: string; // PV1, PV2, PV3, PV4
  nome: string;
  descricao: string;
  cor: string;
  jornadas: Jornada[];
}

export interface Dominio {
  id: string;
  nome: string;
  tipo: 'estrategico' | 'core' | 'plataforma' | 'corporativo';
  propostasValor?: PropostaValor[];
  jornadas?: Jornada[];
  totalProcessos: number;
}

export interface ArquiteturaData {
  dominios: Dominio[];
  totalProcessos: number;
  totalJornadas: number;
  totalMacroprocessos: number;
}

// Filter types
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
export type PageType = 'home' | 'arquitetura' | 'arvore' | 'heatmap' | 'configuracoes' | 'cadeia' | 'bu-detail' | 'dominio-detail' | 'jornada-detail' | 'macro-detail';
export type ViewType = 'arquitetura' | 'arvore' | 'heatmap';

// Drill-down navigation state
export interface DrillDownState {
  buId?: string;
  dominioId?: string;
  jornadaId?: string;
  macroId?: string;
}

export interface NavigationItem {
  id: PageType;
  label: string;
  icon: string;
  description: string;
  children?: NavigationItem[];
}
