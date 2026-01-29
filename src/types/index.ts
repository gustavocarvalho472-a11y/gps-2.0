/**
 * GPS 2.0 - Type Definitions
 */

// Hierarchy: Domínio → Proposta de Valor → Jornada → Macroprocesso → Processo

export interface Processo {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  dono?: string;
  status: 'ativo' | 'inativo' | 'em_revisao';
  complexidade?: 'baixa' | 'media' | 'alta';
  automatizacao?: number; // 0-100%
  analitico?: number; // 0-100%
  fte?: number;
}

export interface Macroprocesso {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
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
export type PageType = 'home' | 'arquitetura' | 'arvore' | 'heatmap' | 'configuracoes';
export type ViewType = 'arquitetura' | 'arvore' | 'heatmap';

export interface NavigationItem {
  id: PageType;
  label: string;
  icon: string;
  description: string;
  children?: NavigationItem[];
}
