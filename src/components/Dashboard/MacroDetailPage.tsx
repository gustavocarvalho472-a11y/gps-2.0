/**
 * GPS 2.0 - Macroprocesso Detail Page
 * Página de detalhe de Macroprocesso com layout: BU context → H1 → Metrics Cards
 * Views: Cards, Tabela, Fluxo (cadeia de processos com I/O)
 */

import { useState } from 'react';
import {
  ArrowLeft, Route, GitBranch, Building2, Users, MoreHorizontal, Eye, FileText,
  Search, Filter, Plus, LayoutGrid, List, Workflow, ArrowRight, ExternalLink
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MetricsCards, type MetricItem } from './MetricsCards';
import { ProcessCard, type StatusType, type HierarchyItem, type ResponsavelInfo } from '../shared';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../../types';
import './EntityDetailPage.css';
import './MacroFluxoView.css';

// View mode types
type MacroViewMode = 'cards' | 'tabela' | 'fluxo';

// Interface para processo com dados de fluxo (inputs/outputs)
interface ProcessoFluxo {
  id: string;
  ordem: number;
  codigo: string;
  nome: string;
  responsavel: { nome: string; iniciais: string };
  inputs: string[];
  outputs: string[];
}

// Interface para processos externos
interface ProcessoExterno {
  id: string;
  codigo: string;
  nome: string;
  area: string;
  responsavel: { nome: string; iniciais: string };
  outputs?: string[];
  inputs?: string[];
  alimenta?: string;   // Código do processo interno que alimenta
  recebeDe?: string;   // Código do processo interno de onde recebe
}

// Mock data para o fluxo de processos
const mockProcessosFluxo: ProcessoFluxo[] = [
  {
    id: '1',
    ordem: 1,
    codigo: 'P1',
    nome: 'Captação e Triagem',
    responsavel: { nome: 'Carlos Silva', iniciais: 'CS' },
    inputs: ['Leads qualificados', 'Canais de entrada'],
    outputs: ['Documentos coletados', 'Dados financeiros']
  },
  {
    id: '2',
    ordem: 2,
    codigo: 'P2',
    nome: 'Análise Documental',
    responsavel: { nome: 'Ana Lima', iniciais: 'AL' },
    inputs: ['Documentos coletados'],
    outputs: ['Dossiê validado']
  },
  {
    id: '3',
    ordem: 3,
    codigo: 'P3',
    nome: 'Análise Financeira',
    responsavel: { nome: 'Pedro Oliveira', iniciais: 'PO' },
    inputs: ['Dados financeiros'],
    outputs: ['Parecer financeiro']
  },
  {
    id: '4',
    ordem: 4,
    codigo: 'P4',
    nome: 'Aprovação',
    responsavel: { nome: 'Márcia Ferreira', iniciais: 'MF' },
    inputs: ['Dossiê validado', 'Parecer financeiro'],
    outputs: ['Aprovação formal']
  },
  {
    id: '5',
    ordem: 5,
    codigo: 'P5',
    nome: 'Integração Sistêmica',
    responsavel: { nome: 'João Rocha', iniciais: 'JR' },
    inputs: ['Aprovação formal'],
    outputs: ['Aluno integrado', 'Dados acadêmicos']
  }
];

// Mock data para processos externos
const mockProcessosExternos: ProcessoExterno[] = [
  {
    id: 'e1',
    codigo: 'E1',
    nome: 'Campanha de Captação',
    area: 'Marketing',
    responsavel: { nome: 'Roberto Costa', iniciais: 'RC' },
    outputs: ['Leads qualificados'],
    alimenta: 'P1'
  },
  {
    id: 'e2',
    codigo: 'E2',
    nome: 'Montagem de Grade',
    area: 'Acadêmico',
    responsavel: { nome: 'Lucia Mendes', iniciais: 'LM' },
    inputs: ['Aluno integrado'],
    recebeDe: 'P5'
  }
];

interface MacroDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  jornada: JornadaCompleta;
  macro: MacroprocessoCompleto;
  onBack: () => void;
  onSelectProcesso?: (processo: Processo) => void;
}

export function MacroDetailPage({ bu, dominio, jornada, macro, onBack, onSelectProcesso }: MacroDetailPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<MacroViewMode>('cards');

  // View mode options
  const viewModes = [
    { id: 'cards' as MacroViewMode, label: 'Cards', icon: <LayoutGrid size={16} /> },
    { id: 'tabela' as MacroViewMode, label: 'Tabela', icon: <List size={16} /> },
    { id: 'fluxo' as MacroViewMode, label: 'Fluxo', icon: <Workflow size={16} /> },
  ];

  // Determinar status do macroprocesso (mock - pode vir do backend)
  const macroStatus = 'desatualizado' as StatusType;

  // Mock de VP (pode vir do backend)
  const vpNome = '(VPTECH) EQUIPE PÓS E OPM';

  // Métricas completas da hierarquia
  const hierarchyMetrics: MetricItem[] = [
    { id: 'dominio', label: 'Domínio', value: 1, icon: 'dominio' },
    { id: 'jornada', label: 'Jornada', value: 1, icon: 'jornada' },
    { id: 'macro', label: 'Macroprocesso', value: 1, icon: 'macro' },
    { id: 'processos', label: 'Processos', value: macro.totalProcessos, icon: 'processo' },
  ];

  // Filtrar processos
  const filteredProcessos = macro.processos.filter(processo => {
    const matchesSearch = processo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' ||
      (statusFilter === 'atualizado' && processo.status === 'ativo') ||
      (statusFilter === 'desatualizado' && processo.status !== 'ativo');
    return matchesSearch && matchesStatus;
  });

  // Converter processo para props do ProcessCard
  const getProcessoCardProps = (processo: Processo) => {
    const responsavel: ResponsavelInfo = processo.responsavel ? {
      nome: processo.responsavel.nome,
      cargo: processo.responsavel.cargo || 'Analista',
      equipe: processo.responsavel.area || vpNome
    } : {
      nome: 'Sem responsável',
      cargo: '',
      equipe: ''
    };

    // Hierarquia mostra domínio e jornada
    const hierarchy: HierarchyItem[] = [
      { type: 'dominio', codigo: dominio.codigo, nome: dominio.nome },
      { type: 'jornada', codigo: jornada.codigo, nome: jornada.nome }
    ];

    // Determinar status
    const status: StatusType = processo.status === 'ativo' ? 'atualizado' : 'desatualizado';

    // Verificar se é crítico (baseado na complexidade)
    const isCritico = processo.complexidade === 'alta';

    return {
      codigo: processo.codigo,
      nome: processo.nome,
      status,
      criticidade: isCritico ? 'critico' as const : undefined,
      showCriticidade: isCritico,
      dataCriacao: '01/08/2026', // Mock
      dataAtualizacao: '01/09/2026', // Mock
      hierarchy,
      responsavel
    };
  };

  return (
    <div className="entity-detail-page">
      {/* Header com contexto da BU */}
      <header className="entity-header">
        <button className="entity-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <div className="entity-context">
          <Building2 size={16} className="entity-context-icon" />
          <span className="entity-context-label">BU</span>
          <span className="entity-context-value">{bu.nome}</span>
        </div>
      </header>

      {/* H1 - Título Principal */}
      <div className="entity-hero">
        <div className="entity-hero-content">
          <span className="entity-hero-type">Macroprocesso</span>
          <h1 className="entity-hero-title">{macro.nome}</h1>
          <span className="entity-hero-code">{macro.codigo}</span>
        </div>
        <div className="entity-hero-actions">
          <span className={`entity-tag entity-tag--${macroStatus}`}>
            {macroStatus === 'atualizado' ? 'Atualizado' : macroStatus === 'em_aprovacao' ? 'Em aprovação' : 'Desatualizado'}
          </span>
          <button className="entity-more-btn">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Metrics Cards - Hierarquia completa */}
      <MetricsCards metrics={hierarchyMetrics} />

      {/* Card de Detalhes */}
      <div className="entity-card">
        {/* Hierarquia */}
        <div className="entity-hierarchy">
          <div className="entity-hierarchy-item">
            <div className="entity-hierarchy-icon entity-hierarchy-icon--dominio">
              <Route size={16} />
            </div>
            <div className="entity-hierarchy-info">
              <span className="entity-hierarchy-label">Domínio</span>
              <span className="entity-hierarchy-value">{dominio.codigo} - {dominio.nome}</span>
            </div>
          </div>

          <div className="entity-hierarchy-item">
            <div className="entity-hierarchy-icon entity-hierarchy-icon--jornada">
              <GitBranch size={16} />
            </div>
            <div className="entity-hierarchy-info">
              <span className="entity-hierarchy-label">Jornada</span>
              <span className="entity-hierarchy-value">{jornada.codigo} - {jornada.nome}</span>
            </div>
          </div>

          <div className="entity-hierarchy-item">
            <div className="entity-hierarchy-icon entity-hierarchy-icon--bu">
              <Building2 size={16} />
            </div>
            <div className="entity-hierarchy-info">
              <span className="entity-hierarchy-label">Business Unit</span>
              <span className="entity-hierarchy-value">{bu.nome}</span>
            </div>
          </div>

          <div className="entity-hierarchy-item">
            <div className="entity-hierarchy-icon entity-hierarchy-icon--vp">
              <Users size={16} />
            </div>
            <div className="entity-hierarchy-info">
              <span className="entity-hierarchy-label">VP</span>
              <span className="entity-hierarchy-value">{vpNome}</span>
            </div>
          </div>
        </div>

        {/* Responsável e Ações */}
        <div className="entity-responsavel-section">
          <div className="entity-responsavel">
            <Avatar className="entity-avatar">
              <AvatarImage src={macro.responsavel.foto} alt={macro.responsavel.nome} />
              <AvatarFallback>
                {macro.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="entity-responsavel-info">
              <span className="entity-responsavel-label">Responsável</span>
              <span className="entity-responsavel-name">{macro.responsavel.nome}</span>
              <span className="entity-responsavel-details">
                {macro.responsavel.cargo}
                {macro.responsavel.area && ` • ${macro.responsavel.area}`}
              </span>
            </div>
          </div>

          <button className="entity-action-btn">
            <Eye size={16} />
            Visualizar aprovações
          </button>
        </div>

        {/* Footer com datas */}
        <div className="entity-footer">
          <span className="entity-date">Criado em 02/02/2026</span>
          <span className="entity-date">Última atualização em 02/02/2026</span>
        </div>
      </div>

      {/* Seção de Processos */}
      <div className="entity-children-section">
        <div className="entity-children-header">
          <div className="entity-children-title-group">
            <FileText size={20} />
            <h2 className="entity-children-title">Processos</h2>
            <span className="entity-children-badge">{macro.processos.length}</span>
          </div>
          <button className="entity-add-btn">
            <Plus size={20} />
            <span>Adicionar processo</span>
          </button>
        </div>

        {/* Toolbar de busca e filtro */}
        <div className="entity-toolbar">
          <div className="entity-toolbar-left">
            <div className="entity-search">
              <Search size={14} className="entity-search-icon" />
              <input
                type="text"
                placeholder="Pesquisar nome ou código do processo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="entity-search-input"
              />
            </div>
            <div className="entity-filter-wrapper">
              <button
                className="entity-filter-btn"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <span>Filtrar</span>
                <Filter size={16} />
              </button>
              {showFilterDropdown && (
                <div className="entity-filter-dropdown">
                  <button
                    className={`entity-filter-option ${statusFilter === 'todos' ? 'active' : ''}`}
                    onClick={() => { setStatusFilter('todos'); setShowFilterDropdown(false); }}
                  >
                    Todos
                  </button>
                  <button
                    className={`entity-filter-option ${statusFilter === 'atualizado' ? 'active' : ''}`}
                    onClick={() => { setStatusFilter('atualizado'); setShowFilterDropdown(false); }}
                  >
                    Atualizados
                  </button>
                  <button
                    className={`entity-filter-option ${statusFilter === 'desatualizado' ? 'active' : ''}`}
                    onClick={() => { setStatusFilter('desatualizado'); setShowFilterDropdown(false); }}
                  >
                    Desatualizados
                  </button>
                  <button
                    className={`entity-filter-option ${statusFilter === 'em_aprovacao' ? 'active' : ''}`}
                    onClick={() => { setStatusFilter('em_aprovacao'); setShowFilterDropdown(false); }}
                  >
                    Em aprovação
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Toggle - linha separada */}
        <div className="macro-view-toggle">
          <span className="macro-view-label">Visualização</span>
          <div className="macro-view-options">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                className={`macro-view-btn ${viewMode === mode.id ? 'macro-view-btn--active' : ''}`}
                onClick={() => setViewMode(mode.id)}
                title={mode.label}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* View: Cards */}
        {viewMode === 'cards' && (
          <>
            {filteredProcessos.length > 0 ? (
              <div className="entity-children-list">
                {filteredProcessos.map(processo => {
                  const cardProps = getProcessoCardProps(processo);
                  return (
                    <ProcessCard
                      key={processo.id}
                      {...cardProps}
                      onClick={() => onSelectProcesso?.(processo)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="entity-empty">
                <FileText className="entity-empty-icon" />
                <h3 className="entity-empty-title">Nenhum processo encontrado</h3>
                <p className="entity-empty-desc">
                  {searchTerm
                    ? 'Nenhum processo corresponde aos critérios de busca.'
                    : 'Este macroprocesso ainda não possui processos vinculados.'}
                </p>
              </div>
            )}
          </>
        )}

        {/* View: Tabela */}
        {viewMode === 'tabela' && (
          <div className="macro-table-wrapper">
            <table className="macro-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Responsável</th>
                  <th>Complexidade</th>
                  <th>Atualização</th>
                </tr>
              </thead>
              <tbody>
                {filteredProcessos.map(processo => (
                  <tr key={processo.id} onClick={() => onSelectProcesso?.(processo)}>
                    <td className="macro-table-codigo">{processo.codigo}</td>
                    <td className="macro-table-nome">{processo.nome}</td>
                    <td>
                      <span className={`macro-table-status macro-table-status--${processo.status === 'ativo' ? 'atualizado' : 'desatualizado'}`}>
                        {processo.status === 'ativo' ? 'Atualizado' : 'Desatualizado'}
                      </span>
                    </td>
                    <td>{processo.responsavel?.nome || 'Sem responsável'}</td>
                    <td>
                      <span className={`macro-table-complexidade macro-table-complexidade--${processo.complexidade || 'media'}`}>
                        {processo.complexidade === 'alta' ? 'Alta' : processo.complexidade === 'baixa' ? 'Baixa' : 'Média'}
                      </span>
                    </td>
                    <td>01/09/2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View: Fluxo - Layout Horizontal Clean */}
        {viewMode === 'fluxo' && (
          <div className="macro-fluxo">
            {/* Header */}
            <div className="macro-fluxo-header">
              <div className="macro-fluxo-header-info">
                <h3 className="macro-fluxo-title">Cadeia de Processos</h3>
                <p className="macro-fluxo-subtitle">{macro.codigo} • {mockProcessosFluxo.length} etapas</p>
              </div>
              <div className="macro-fluxo-badge">
                <Workflow size={14} />
                <span>{mockProcessosFluxo.length} Processos</span>
              </div>
            </div>

            {/* Cadeia Horizontal de Processos Internos */}
            <div className="macro-fluxo-chain">
              {mockProcessosFluxo.map((proc, index) => (
                <div key={proc.id} className="macro-fluxo-step">
                  {/* Badge com número da ordem */}
                  <div className="macro-fluxo-card-wrapper">
                    <span className="macro-fluxo-card-badge">{proc.ordem}</span>

                    <div className="macro-fluxo-card" onClick={() => {
                      const realProcesso = macro.processos.find(p => p.codigo === proc.codigo);
                      if (realProcesso) onSelectProcesso?.(realProcesso);
                    }}>
                      {/* Header com nome e responsável */}
                      <div className="macro-fluxo-card-header">
                        <h4 className="macro-fluxo-card-name">{proc.nome}</h4>
                        <div className="macro-fluxo-card-owner-row">
                          <span className="macro-fluxo-card-avatar">{proc.responsavel.iniciais}</span>
                          <span className="macro-fluxo-card-owner">{proc.responsavel.nome}</span>
                        </div>
                      </div>

                      {/* Inputs */}
                      <div className="macro-fluxo-card-io">
                        <span className="macro-fluxo-io-label">INPUTS</span>
                        <ul className="macro-fluxo-io-list">
                          {proc.inputs.map((input, i) => (
                            <li key={i} className="macro-fluxo-io-item macro-fluxo-io-item--input">{input}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Outputs */}
                      <div className="macro-fluxo-card-io">
                        <span className="macro-fluxo-io-label macro-fluxo-io-label--output">OUTPUTS</span>
                        <ul className="macro-fluxo-io-list">
                          {proc.outputs.map((output, i) => (
                            <li key={i} className="macro-fluxo-io-item macro-fluxo-io-item--output">{output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Seta entre os cards (não mostrar após o último) */}
                  {index < mockProcessosFluxo.length - 1 && (
                    <div className="macro-fluxo-arrow">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Seção de Processos Externos */}
            {mockProcessosExternos.length > 0 && (
              <div className="macro-fluxo-external-section">
                <div className="macro-fluxo-section-label">
                  <ExternalLink size={14} />
                  <span>Conexões com outras áreas</span>
                </div>

                <div className="macro-fluxo-chain">
                  {mockProcessosExternos.map((proc, index) => (
                    <div key={proc.id} className="macro-fluxo-step">
                      <div className="macro-fluxo-card-wrapper">
                        <span className="macro-fluxo-card-badge macro-fluxo-card-badge--external">{proc.codigo}</span>

                        <div className="macro-fluxo-card macro-fluxo-card--external">
                          {/* Tag da área */}
                          <span className="macro-fluxo-card-area">{proc.area}</span>

                          {/* Header com nome */}
                          <h4 className="macro-fluxo-card-name">{proc.nome}</h4>

                          {/* Responsável */}
                          <div className="macro-fluxo-card-owner-row">
                            <span className="macro-fluxo-card-avatar macro-fluxo-card-avatar--external">{proc.responsavel.iniciais}</span>
                            <span className="macro-fluxo-card-owner">{proc.responsavel.nome}</span>
                          </div>

                          {/* Outputs (se fornece para o fluxo) */}
                          {proc.outputs && proc.outputs.length > 0 && (
                            <div className="macro-fluxo-card-io">
                              <span className="macro-fluxo-io-label macro-fluxo-io-label--output">OUTPUTS</span>
                              <ul className="macro-fluxo-io-list">
                                {proc.outputs.map((output, i) => (
                                  <li key={i} className="macro-fluxo-io-item macro-fluxo-io-item--output">{output}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Inputs (se recebe do fluxo) */}
                          {proc.inputs && proc.inputs.length > 0 && (
                            <div className="macro-fluxo-card-io">
                              <span className="macro-fluxo-io-label">INPUTS</span>
                              <ul className="macro-fluxo-io-list">
                                {proc.inputs.map((input, i) => (
                                  <li key={i} className="macro-fluxo-io-item macro-fluxo-io-item--input">{input}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Badge de conexão */}
                        {proc.alimenta && (
                          <div className="macro-fluxo-connection-tag macro-fluxo-connection-tag--alimenta">
                            <span>Alimenta:</span>
                            <strong>{proc.alimenta} - {mockProcessosFluxo.find(p => p.codigo === proc.alimenta)?.nome}</strong>
                          </div>
                        )}
                        {proc.recebeDe && (
                          <div className="macro-fluxo-connection-tag macro-fluxo-connection-tag--recebe">
                            <span>Recebe de:</span>
                            <strong>{proc.recebeDe} - {mockProcessosFluxo.find(p => p.codigo === proc.recebeDe)?.nome}</strong>
                          </div>
                        )}
                      </div>

                      {index < mockProcessosExternos.length - 1 && (
                        <div className="macro-fluxo-arrow macro-fluxo-arrow--external">
                          <ArrowRight size={20} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legenda */}
            <div className="macro-fluxo-legend">
              <div className="macro-fluxo-legend-item">
                <span className="macro-fluxo-legend-dot macro-fluxo-legend-dot--interno"></span>
                <span>Processo interno</span>
              </div>
              <div className="macro-fluxo-legend-item">
                <span className="macro-fluxo-legend-dot macro-fluxo-legend-dot--externo"></span>
                <span>Processo externo</span>
              </div>
              <div className="macro-fluxo-legend-item">
                <span className="macro-fluxo-legend-dot macro-fluxo-legend-dot--input"></span>
                <span>Input</span>
              </div>
              <div className="macro-fluxo-legend-item">
                <span className="macro-fluxo-legend-dot macro-fluxo-legend-dot--output"></span>
                <span>Output</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
