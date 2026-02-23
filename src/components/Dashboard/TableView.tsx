/**
 * GPS 2.0 - Table View Component
 * Tabela hierárquica expansível estilo Excel.
 * Hierarquia: BU → Domínio → Jornada → Macroprocesso → Processo
 * Cada nível expande como linhas abaixo, mantendo as mesmas colunas.
 * Exportável para CSV/Excel.
 */

import { ChevronDown, ArrowUpDown, Filter, Search, X, Eye, Route, GitBranch, Boxes, FileText, Building2, Download } from 'lucide-react';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo, DetailType } from '../../types';
import { type StatusType } from '../shared';
import './TableView.css';

interface TableViewProps {
  businessUnits: BusinessUnit[];
  onSelectBU?: (bu: BusinessUnit) => void;
  onSelectDominio?: (dominio: DominioCompleto, bu?: BusinessUnit) => void;
  onSelectJornada?: (jornada: JornadaCompleta, bu?: BusinessUnit, dominio?: DominioCompleto) => void;
  onSelectMacro?: (macro: MacroprocessoCompleto, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta) => void;
  onSelectProcesso?: (processo: Processo, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta, macro?: MacroprocessoCompleto) => void;
  onShowDetails?: (
    type: DetailType,
    data: any,
    breadcrumb: { type: DetailType; nome: string }[],
    context?: { bu?: BusinessUnit; dominio?: DominioCompleto; jornada?: JornadaCompleta }
  ) => void;
}

type SortDirection = 'asc' | 'desc';
type FilterableColumn = 'nome' | 'responsavel' | 'status';
type HierType = 'bu' | 'dominio' | 'jornada' | 'macro' | 'processo';

// Resumo de status agregado para níveis acima do processo
interface StatusSummary {
  totalProcessos: number;
  desatualizados: number;  // processos com status 'inativo'
  emRevisao: number;       // processos com status 'em_revisao'
}

interface HierRow {
  id: string;
  level: number;
  type: HierType;
  nome: string;
  cor: string;
  responsavel: string;
  countDominios?: number;
  countJornadas?: number;
  countMacros?: number;
  countProcessos?: number;
  status?: StatusType;           // Só para processos individuais
  statusSummary?: StatusSummary; // Para níveis agregados (BU, Domínio, Jornada, Macro)
  hasChildren: boolean;
  bu: BusinessUnit;
  dominio?: DominioCompleto;
  jornada?: JornadaCompleta;
  macro?: MacroprocessoCompleto;
  processo?: Processo;
}

// ============ Helpers ============

// Calcula o resumo de status a partir de uma lista de processos
function computeStatusSummary(processos: Processo[]): StatusSummary {
  let desatualizados = 0;
  let emRevisao = 0;
  for (const p of processos) {
    if (p.status === 'inativo') desatualizados++;
    else if (p.status === 'em_revisao') emRevisao++;
  }
  return { totalProcessos: processos.length, desatualizados, emRevisao };
}

// Coleta todos os processos recursivamente de qualquer nível
function collectProcessos(obj: BusinessUnit | DominioCompleto | JornadaCompleta | MacroprocessoCompleto): Processo[] {
  if ('dominios' in obj) {
    return obj.dominios.flatMap(d => d.jornadas.flatMap(j => j.macroprocessos.flatMap(m => m.processos)));
  }
  if ('jornadas' in obj) {
    return obj.jornadas.flatMap(j => j.macroprocessos.flatMap(m => m.processos));
  }
  if ('macroprocessos' in obj) {
    return obj.macroprocessos.flatMap(m => m.processos);
  }
  if ('processos' in obj) {
    return obj.processos;
  }
  return [];
}

// Retorna StatusType agregado a partir do summary (para filtros e sort)
function summaryToStatus(summary: StatusSummary): StatusType {
  if (summary.desatualizados > 0) return 'desatualizado';
  if (summary.emRevisao > 0) return 'em_aprovacao';
  return 'atualizado';
}

function getStatusLabel(status: StatusType): string {
  const labels: Record<StatusType, string> = {
    atualizado: 'Atualizado', desatualizado: 'Desatualizado',
    em_aprovacao: 'Em aprovação', critico: 'Crítico',
  };
  return labels[status] || status;
}


const columnLabels: Record<string, string> = {
  nome: 'Nome', responsavel: 'Responsável', status: 'Status',
};

const hierTypeLabels: Record<HierType, string> = {
  bu: 'BU', dominio: 'Domínio', jornada: 'Jornada', macro: 'Macroprocesso', processo: 'Processo',
};

const hierTypeBgColors: Record<HierType, string> = {
  bu: '#F5EDFF', dominio: '#E0F2FE', jornada: '#DCFCE7', macro: '#FEF3C7', processo: '#FCE7F3',
};

const hierTypeIconColors: Record<HierType, string> = {
  bu: '#9755FE', dominio: '#0EA5E9', jornada: '#22C55E', macro: '#F59E0B', processo: '#EC4899',
};

// Build flat row list from hierarchy + expansion state
function buildFlatRows(bus: BusinessUnit[], expanded: Set<string>): HierRow[] {
  const rows: HierRow[] = [];

  for (const bu of bus) {
    const buSummary = computeStatusSummary(collectProcessos(bu));
    rows.push({
      id: bu.id, level: 0, type: 'bu',
      nome: bu.nome, cor: bu.cor,
      responsavel: bu.responsavel?.nome || '—',
      countDominios: bu.totalDominios,
      countJornadas: bu.totalJornadas,
      countMacros: bu.totalMacroprocessos,
      countProcessos: bu.totalProcessos,
      statusSummary: buSummary,
      hasChildren: bu.dominios.length > 0,
      bu,
    });

    if (!expanded.has(bu.id)) continue;

    for (const dom of bu.dominios) {
      const domSummary = computeStatusSummary(collectProcessos(dom));
      rows.push({
        id: dom.id, level: 1, type: 'dominio',
        nome: dom.nome, cor: bu.cor,
        responsavel: dom.responsavel?.nome || '—',
        countJornadas: dom.totalJornadas,
        countMacros: dom.totalMacroprocessos,
        countProcessos: dom.totalProcessos,
        statusSummary: domSummary,
        hasChildren: dom.jornadas.length > 0,
        bu, dominio: dom,
      });

      if (!expanded.has(dom.id)) continue;

      for (const jor of dom.jornadas) {
        const jorSummary = computeStatusSummary(collectProcessos(jor));
        rows.push({
          id: jor.id, level: 2, type: 'jornada',
          nome: jor.nome, cor: bu.cor,
          responsavel: jor.responsavel?.nome || '—',
          countMacros: jor.totalMacroprocessos,
          countProcessos: jor.totalProcessos,
          statusSummary: jorSummary,
          hasChildren: jor.macroprocessos.length > 0,
          bu, dominio: dom, jornada: jor,
        });

        if (!expanded.has(jor.id)) continue;

        for (const macro of jor.macroprocessos) {
          const macroSummary = computeStatusSummary(collectProcessos(macro));
          rows.push({
            id: macro.id, level: 3, type: 'macro',
            nome: macro.nome, cor: bu.cor,
            responsavel: macro.responsavel?.nome || '—',
            countProcessos: macro.totalProcessos,
            statusSummary: macroSummary,
            hasChildren: macro.processos.length > 0,
            bu, dominio: dom, jornada: jor, macro,
          });

          if (!expanded.has(macro.id)) continue;

          for (const proc of macro.processos) {
            const procStatus: StatusType = proc.status === 'ativo' ? 'atualizado'
              : proc.status === 'em_revisao' ? 'em_aprovacao' : 'desatualizado';
            rows.push({
              id: proc.id, level: 4, type: 'processo',
              nome: proc.nome, cor: bu.cor,
              responsavel: proc.responsavel?.nome || '—',
              status: procStatus,
              hasChildren: false,
              bu, dominio: dom, jornada: jor, macro, processo: proc,
            });
          }
        }
      }
    }
  }

  return rows;
}

// ===== TextFilterDropdown =====
function TextFilterDropdown({
  column, options, selected, onApply, onClear, onClose,
}: {
  column: string;
  options: { value: string; count: number }[];
  selected: Set<string>;
  onApply: (values: Set<string>) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [localSelected, setLocalSelected] = useState<Set<string>>(new Set(selected));
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredOptions = options.filter(o => o.value.toLowerCase().includes(search.toLowerCase()));
  const allSelected = filteredOptions.length > 0 && filteredOptions.every(o => localSelected.has(o.value));

  const toggleAll = () => {
    const next = new Set(localSelected);
    if (allSelected) filteredOptions.forEach(o => next.delete(o.value));
    else filteredOptions.forEach(o => next.add(o.value));
    setLocalSelected(next);
  };

  const toggleOne = (value: string) => {
    const next = new Set(localSelected);
    if (next.has(value)) next.delete(value); else next.add(value);
    setLocalSelected(next);
  };

  return (
    <div className="tv-filter-dropdown" ref={dropdownRef} onClick={e => e.stopPropagation()}>
      <div className="tv-filter-dropdown-header">
        <span>Filtrar {columnLabels[column] || column}</span>
      </div>
      <div className="tv-filter-search">
        <Search size={14} />
        <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} autoFocus />
      </div>
      <div className="tv-filter-options">
        <label className="tv-filter-option tv-filter-option--all">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} />
          <span>Selecionar todos</span>
          <span className="tv-filter-count">{filteredOptions.length}</span>
        </label>
        <div className="tv-filter-divider" />
        {filteredOptions.map(opt => (
          <label key={opt.value} className="tv-filter-option">
            <input type="checkbox" checked={localSelected.has(opt.value)} onChange={() => toggleOne(opt.value)} />
            <span className="tv-filter-value">{opt.value}</span>
            <span className="tv-filter-count">{opt.count}</span>
          </label>
        ))}
        {filteredOptions.length === 0 && <div className="tv-filter-empty">Nenhum resultado</div>}
      </div>
      <div className="tv-filter-actions">
        <button className="tv-filter-btn-clear" onClick={() => { onClear(); onClose(); }}>Limpar</button>
        <button className="tv-filter-btn-apply" onClick={() => { onApply(localSelected); onClose(); }}>Aplicar</button>
      </div>
    </div>
  );
}

// ===== StatusSummaryCell — Resumo agregado de status =====
function StatusSummaryCell({ summary, type }: { summary: StatusSummary; type: HierType }) {
  const issues = summary.desatualizados + summary.emRevisao;
  const levelLabel = type === 'bu' ? 'desta BU' : type === 'dominio' ? 'deste domínio' : type === 'jornada' ? 'desta jornada' : 'deste macro';

  if (issues === 0) {
    return (
      <span className="tv-status-pill tv-status-pill--ok" title={`Todos os ${summary.totalProcessos} processos ${levelLabel} estão atualizados`}>
        Atualizado
      </span>
    );
  }

  // Tooltip detalhado
  const tooltipParts: string[] = [];
  if (summary.desatualizados > 0) tooltipParts.push(`${summary.desatualizados} desatualizado(s)`);
  if (summary.emRevisao > 0) tooltipParts.push(`${summary.emRevisao} em revisão`);
  const tooltip = `${tooltipParts.join(' e ')} de ${summary.totalProcessos} processos ${levelLabel}. Expanda para identificar.`;

  return (
    <span className="tv-status-pill tv-status-pill--issues" title={tooltip}>
      {issues} desatual.
    </span>
  );
}

// ===== Main Component =====
export function TableView({ businessUnits, onShowDetails }: TableViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<string>('nome');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [activeFilter, setActiveFilter] = useState<FilterableColumn | null>(null);

  const [filters, setFilters] = useState<Record<FilterableColumn, Set<string>>>({
    nome: new Set(), responsavel: new Set(), status: new Set(),
  });

  // Filter BUs by text filters
  const filteredBUs = useMemo(() => {
    let result = [...businessUnits];
    if (filters.nome.size > 0) result = result.filter(bu => filters.nome.has(bu.nome));
    if (filters.responsavel.size > 0) result = result.filter(bu => filters.responsavel.has(bu.responsavel?.nome || '—'));
    if (filters.status.size > 0) result = result.filter(bu => filters.status.has(getStatusLabel(summaryToStatus(computeStatusSummary(collectProcessos(bu))))));
    return result;
  }, [businessUnits, filters]);

  // Sort BUs then build flat rows
  const sortedBUs = useMemo(() => {
    const dir = sortDirection === 'asc' ? 1 : -1;
    return [...filteredBUs].sort((a, b) => {
      switch (sortField) {
        case 'nome': return a.nome.localeCompare(b.nome) * dir;
        case 'responsavel': return (a.responsavel?.nome || '').localeCompare(b.responsavel?.nome || '') * dir;
        case 'countDominios': return (a.totalDominios - b.totalDominios) * dir;
        case 'countJornadas': return (a.totalJornadas - b.totalJornadas) * dir;
        case 'countMacros': return (a.totalMacroprocessos - b.totalMacroprocessos) * dir;
        case 'countProcessos': return (a.totalProcessos - b.totalProcessos) * dir;
        case 'status': {
          const sa = summaryToStatus(computeStatusSummary(collectProcessos(a)));
          const sb = summaryToStatus(computeStatusSummary(collectProcessos(b)));
          return getStatusLabel(sa).localeCompare(getStatusLabel(sb)) * dir;
        }
        default: return 0;
      }
    });
  }, [filteredBUs, sortField, sortDirection]);

  // Build flat rows from sorted BUs + expansion state
  const flatRows = useMemo(() => buildFlatRows(sortedBUs, expanded), [sortedBUs, expanded]);

  // Filter options for text columns (from full dataset)
  const filterOptions = useMemo(() => {
    const result: Record<FilterableColumn, { value: string; count: number }[]> = {
      nome: [], responsavel: [], status: [],
    };

    const nomeCounts = new Map<string, number>();
    const respCounts = new Map<string, number>();
    const statusCounts = new Map<string, number>();

    for (const bu of businessUnits) {
      nomeCounts.set(bu.nome, (nomeCounts.get(bu.nome) || 0) + 1);
      const r = bu.responsavel?.nome || '—';
      respCounts.set(r, (respCounts.get(r) || 0) + 1);
      const s = getStatusLabel(summaryToStatus(computeStatusSummary(collectProcessos(bu))));
      statusCounts.set(s, (statusCounts.get(s) || 0) + 1);
    }

    result.nome = Array.from(nomeCounts.entries()).map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));
    result.responsavel = Array.from(respCounts.entries()).map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));
    result.status = Array.from(statusCounts.entries()).map(([value, count]) => ({ value, count })).sort((a, b) => a.value.localeCompare(b.value));

    return result;
  }, [businessUnits]);

  // Active filter chips
  const activeFilterChips = useMemo(() => {
    const chips: { column: FilterableColumn; label: string; displayValue: string }[] = [];
    for (const col of ['nome', 'responsavel', 'status'] as FilterableColumn[]) {
      if (filters[col].size > 0) {
        const values = Array.from(filters[col]);
        const display = values.length <= 2 ? values.join(', ') : `${values.length} selecionados`;
        chips.push({ column: col, label: columnLabels[col], displayValue: display });
      }
    }
    return chips;
  }, [filters]);

  const hasActiveFilters = activeFilterChips.length > 0;

  // Handlers
  const handleSort = (field: string) => {
    if (sortField === field) setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDirection('asc'); }
  };

  const applyFilter = (col: FilterableColumn, values: Set<string>) => {
    setFilters(prev => ({ ...prev, [col]: values }));
  };

  const clearFilter = (col: FilterableColumn) => {
    setFilters(prev => ({ ...prev, [col]: new Set<string>() }));
  };

  const clearAllFilters = () => {
    setFilters({ nome: new Set(), responsavel: new Set(), status: new Set() });
  };

  const toggleExpand = useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleShowDetail = useCallback((row: HierRow) => {
    if (!onShowDetails) return;
    const breadcrumb: { type: DetailType; nome: string }[] = [];
    breadcrumb.push({ type: 'bu', nome: row.bu.nome });
    if (row.dominio) breadcrumb.push({ type: 'dominio', nome: row.dominio.nome });
    if (row.jornada) breadcrumb.push({ type: 'jornada', nome: row.jornada.nome });
    if (row.macro) breadcrumb.push({ type: 'macro', nome: row.macro.nome });
    if (row.processo) breadcrumb.push({ type: 'processo', nome: row.processo.nome });

    const data = row.type === 'bu' ? row.bu
      : row.type === 'dominio' ? row.dominio
      : row.type === 'jornada' ? row.jornada
      : row.type === 'macro' ? row.macro
      : row.processo;

    onShowDetails(row.type, data, breadcrumb, {
      bu: row.bu,
      dominio: row.dominio,
      jornada: row.jornada,
    });
  }, [onShowDetails]);

  // Export CSV helper
  const statusSummaryLabel = (summary: StatusSummary): string => {
    const issues = summary.desatualizados + summary.emRevisao;
    if (issues === 0) return 'Atualizado';
    const parts: string[] = [];
    if (summary.desatualizados > 0) parts.push(`${summary.desatualizados} desatualizado(s)`);
    if (summary.emRevisao > 0) parts.push(`${summary.emRevisao} em revisão`);
    return parts.join(', ');
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Tipo', 'Responsável', 'Domínios', 'Jornadas', 'Macroprocessos', 'Processos', 'Status'];
    const csvRows = [headers.join(';')];
    for (const row of flatRows) {
      const status = row.type === 'processo' && row.status
        ? getStatusLabel(row.status)
        : row.statusSummary ? statusSummaryLabel(row.statusSummary) : '—';
      csvRows.push([
        row.nome, hierTypeLabels[row.type], row.responsavel,
        row.countDominios ?? '', row.countJornadas ?? '', row.countMacros ?? '', row.countProcessos ?? '',
        status,
      ].join(';'));
    }
    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business-units.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render header cell with sort + optional filter
  const renderTh = (sortKey: string, label: string, filterKey?: FilterableColumn, center?: boolean) => {
    const filterActive = filterKey ? filters[filterKey].size > 0 : false;
    return (
      <th className={center ? 'table-view-th--center' : ''}>
        <div className="tv-th-content" style={center ? { justifyContent: 'center' } : undefined}>
          <span className="tv-th-label" onClick={() => handleSort(sortKey)}>
            {label}
            <ArrowUpDown size={12} className={`tv-sort-icon ${sortField === sortKey ? 'tv-sort-icon--active' : ''}`} />
          </span>
          {filterKey && (
            <button
              className={`tv-filter-trigger ${filterActive ? 'tv-filter-trigger--active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setActiveFilter(prev => prev === filterKey ? null : filterKey); }}
              title={`Filtrar ${columnLabels[filterKey]}`}
            >
              <Filter size={12} />
              {filterActive && <span className="tv-filter-dot" />}
            </button>
          )}
        </div>
        {filterKey && activeFilter === filterKey && (
          <TextFilterDropdown
            column={filterKey}
            options={filterOptions[filterKey]}
            selected={filters[filterKey]}
            onApply={(values) => applyFilter(filterKey, values)}
            onClear={() => clearFilter(filterKey)}
            onClose={() => setActiveFilter(null)}
          />
        )}
      </th>
    );
  };

  // Get type icon
  const getTypeIcon = (type: HierType) => {
    switch (type) {
      case 'bu': return <Building2 size={14} />;
      case 'dominio': return <Route size={14} />;
      case 'jornada': return <GitBranch size={14} />;
      case 'macro': return <Boxes size={14} />;
      case 'processo': return <FileText size={14} />;
    }
  };

  return (
    <div className="table-view">
      {/* Export Button */}
      <div className="tv-export-bar">
        <button className="tv-toolbar-btn tv-toolbar-btn--export" onClick={exportToCSV}>
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <div className="tv-active-filters">
          <span className="tv-active-filters-label">Filtros:</span>
          <div className="tv-active-filters-chips">
            {activeFilterChips.map(chip => (
              <span key={chip.column} className="tv-chip">
                <span className="tv-chip-label">{chip.label}:</span>
                <span className="tv-chip-value">{chip.displayValue}</span>
                <button className="tv-chip-remove" onClick={() => clearFilter(chip.column)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <button className="tv-clear-all" onClick={clearAllFilters}>Limpar todos</button>
        </div>
      )}

      {/* Table */}
      <div className="table-view-container">
        <table className="table-view-table">
          <thead>
            <tr>
              {renderTh('nome', 'Nome', 'nome')}
              {renderTh('responsavel', 'Responsável', 'responsavel')}
              {renderTh('countDominios', 'Domínios', undefined, true)}
              {renderTh('countJornadas', 'Jornadas', undefined, true)}
              {renderTh('countMacros', 'Macroprocessos', undefined, true)}
              {renderTh('countProcessos', 'Processos', undefined, true)}
              {renderTh('status', 'Status', 'status')}
              <th className="table-view-th--action"></th>
            </tr>
          </thead>
          <tbody>
            {flatRows.map((row, index) => (
              <tr
                key={`${row.type}-${row.id}`}
                className={`table-view-row tv-hier-row tv-hier-row--level-${row.level} tv-hier-row--${row.type} ${expanded.has(row.id) ? 'table-view-row--expanded' : ''}`}
                onClick={() => row.hasChildren ? toggleExpand(row.id) : handleShowDetail(row)}
                style={{ animationDelay: `${Math.min(index * 15, 300)}ms` }}
              >
                {/* Name */}
                <td>
                  <div className="table-view-cell-name" style={{ paddingLeft: row.level * 12 }}>
                    {row.hasChildren ? (
                      <button
                        className={`tv-row-expand-btn ${expanded.has(row.id) ? 'tv-row-expand-btn--open' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleExpand(row.id); }}
                      >
                        <ChevronDown size={14} />
                      </button>
                    ) : (
                      <span className="tv-row-expand-spacer" />
                    )}
                    <div
                      className="tv-hier-type-icon"
                      style={{ backgroundColor: hierTypeBgColors[row.type], color: hierTypeIconColors[row.type] }}
                    >
                      {getTypeIcon(row.type)}
                    </div>
                    <div className="tv-hier-name-group">
                      <span className="table-view-bu-name">{row.nome}</span>
                      {row.level > 0 && (
                        <span className="tv-hier-type-label">
                          {hierTypeLabels[row.type]}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Responsável */}
                <td>
                  <span>{row.responsavel}</span>
                </td>

                {/* Domínios */}
                <td className="table-view-cell-number">
                  {row.countDominios != null ? (
                    <span className="table-view-number-badge">{row.countDominios}</span>
                  ) : (
                    <span className="tv-cell-dash">—</span>
                  )}
                </td>

                {/* Jornadas */}
                <td className="table-view-cell-number">
                  {row.countJornadas != null ? (
                    <span className="table-view-number-badge">{row.countJornadas}</span>
                  ) : (
                    <span className="tv-cell-dash">—</span>
                  )}
                </td>

                {/* Macroprocessos */}
                <td className="table-view-cell-number">
                  {row.countMacros != null ? (
                    <span className="table-view-number-badge">{row.countMacros}</span>
                  ) : (
                    <span className="tv-cell-dash">—</span>
                  )}
                </td>

                {/* Processos */}
                <td className="table-view-cell-number">
                  {row.countProcessos != null ? (
                    <span className="table-view-number-badge">
                      {row.countProcessos.toLocaleString('pt-BR')}
                    </span>
                  ) : (
                    <span className="tv-cell-dash">—</span>
                  )}
                </td>

                {/* Status */}
                <td className="table-view-cell-status">
                  {row.type === 'processo' && row.status ? (
                    <span className={`tv-status-pill ${row.status === 'atualizado' ? 'tv-status-pill--ok' : 'tv-status-pill--issues'}`}>
                      {getStatusLabel(row.status)}
                    </span>
                  ) : row.statusSummary ? (
                    <StatusSummaryCell summary={row.statusSummary} type={row.type} />
                  ) : (
                    <span className="tv-cell-dash">—</span>
                  )}
                </td>

                {/* Action */}
                <td className="table-view-cell-action">
                  <div className="tv-row-actions">
                    {onShowDetails && (
                      <button
                        className="tv-row-eye-btn"
                        onClick={(e) => { e.stopPropagation(); handleShowDetail(row); }}
                        title="Ver detalhes"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {flatRows.length === 0 && (
              <tr>
                <td colSpan={8} className="tv-no-results">
                  Nenhum resultado encontrado com os filtros aplicados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
