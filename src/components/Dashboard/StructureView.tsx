/**
 * GPS 2.0 - Structure View
 * Grid de BUs com dropdown cascateado e modal lateral de detalhes
 */

import { useState, useMemo } from 'react';
import {
  Search, Filter, ChevronRight, X,
  Building2, Route, GitBranch, Boxes, FileText,
  Users, BarChart3, Zap, ExternalLink, Eye
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BUCard } from './BUCard';
import { businessUnits, vps, getVPById, totaisGlobais } from '../../data/organizationData';
import type {
  BusinessUnit, DominioCompleto, JornadaCompleta,
  MacroprocessoCompleto, DetailType, Processo
} from '../../types';
import './StructureView.css';

// Props para StructureView com navegação
export interface StructureViewProps {
  onSelectBU?: (bu: BusinessUnit) => void;
  onSelectDominio?: (dominio: DominioCompleto, bu?: BusinessUnit) => void;
  onSelectJornada?: (jornada: JornadaCompleta, bu?: BusinessUnit, dominio?: DominioCompleto) => void;
  onSelectMacro?: (macro: MacroprocessoCompleto, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta) => void;
  onSelectProcesso?: (processo: Processo, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta, macro?: MacroprocessoCompleto) => void;
}

// ============================================
// Detail Panel Component
// ============================================

interface DetailPanelProps {
  isOpen: boolean;
  type: DetailType | null;
  data: BusinessUnit | DominioCompleto | JornadaCompleta | MacroprocessoCompleto | null;
  breadcrumb: { type: DetailType; nome: string }[];
  onClose: () => void;
  // Parent context for navigation
  parentBU?: BusinessUnit | null;
  parentDominio?: DominioCompleto | null;
  parentJornada?: JornadaCompleta | null;
  parentMacro?: MacroprocessoCompleto | null;
  // Navigation handlers
  onNavigateToBU?: (bu: BusinessUnit) => void;
  onNavigateToDominio?: (dominio: DominioCompleto, bu?: BusinessUnit) => void;
  onNavigateToJornada?: (jornada: JornadaCompleta, bu?: BusinessUnit, dominio?: DominioCompleto) => void;
  onNavigateToMacro?: (macro: MacroprocessoCompleto, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta) => void;
  onNavigateToProcesso?: (processo: Processo, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta, macro?: MacroprocessoCompleto) => void;
  // Open full page handler
  onOpenPage?: () => void;
}

function DetailPanel({ isOpen, type, data, breadcrumb, onClose, parentBU, parentDominio, parentJornada, parentMacro, onNavigateToBU, onNavigateToDominio, onNavigateToJornada, onNavigateToMacro, onNavigateToProcesso, onOpenPage }: DetailPanelProps) {
  if (!isOpen || !data || !type) return null;

  const getIcon = () => {
    switch (type) {
      case 'bu': return <Building2 />;
      case 'dominio': return <Route />;
      case 'jornada': return <GitBranch />;
      case 'macro': return <Boxes />;
      default: return <FileText />;
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'bu': {
        const bu = data as BusinessUnit;
        const vp = getVPById(bu.vpId);
        return (
          <>
            {/* Stats Cards */}
            <div className="panel-stats-grid">
              <div className="panel-stat-card panel-stat-card--dominio">
                <div className="panel-stat-card-icon">
                  <Route size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{bu.totalDominios}</span>
                  <span className="panel-stat-card-label">Domínios</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--jornada">
                <div className="panel-stat-card-icon">
                  <GitBranch size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{bu.totalJornadas}</span>
                  <span className="panel-stat-card-label">Jornadas</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--macro">
                <div className="panel-stat-card-icon">
                  <Boxes size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{bu.totalMacroprocessos}</span>
                  <span className="panel-stat-card-label">Macroprocessos</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--processo">
                <div className="panel-stat-card-icon">
                  <FileText size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{bu.totalProcessos}</span>
                  <span className="panel-stat-card-label">Processos</span>
                </div>
              </div>
            </div>

            {/* VP Responsável */}
            {vp && (
              <div className="panel-section">
                <h4 className="panel-section-title">VP Responsável</h4>
                <div className="panel-owner-card">
                  <Avatar className="panel-owner-avatar">
                    <AvatarImage src={vp.foto} alt={vp.nome} />
                    <AvatarFallback>{vp.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="panel-owner-info">
                    <p className="panel-owner-name">{vp.nome}</p>
                    <p className="panel-owner-role">{vp.cargo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Domínios Cards */}
            <div className="panel-section">
              <h4 className="panel-section-title">Domínios ({bu.dominios.length})</h4>
              <div className="panel-cards">
                {bu.dominios.map(d => (
                  <button
                    key={d.id}
                    className="panel-item-card panel-item-card--dominio"
                    onClick={() => onNavigateToDominio?.(d, bu)}
                  >
                    <div className="panel-item-card-icon">
                      <Route size={16} />
                    </div>
                    <div className="panel-item-card-content">
                      <span className="panel-item-card-name">{d.nome}</span>
                      <span className="panel-item-card-meta">{d.totalProcessos} processos</span>
                    </div>
                    <ChevronRight className="panel-item-card-arrow" />
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }
      case 'dominio': {
        const dominio = data as DominioCompleto;
        return (
          <>
            {/* Stats Cards */}
            <div className="panel-stats-grid panel-stats-grid--3">
              <div className="panel-stat-card panel-stat-card--jornada">
                <div className="panel-stat-card-icon">
                  <GitBranch size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{dominio.totalJornadas}</span>
                  <span className="panel-stat-card-label">Jornadas</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--macro">
                <div className="panel-stat-card-icon">
                  <Boxes size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{dominio.totalMacroprocessos}</span>
                  <span className="panel-stat-card-label">Macroprocessos</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--processo">
                <div className="panel-stat-card-icon">
                  <FileText size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{dominio.totalProcessos}</span>
                  <span className="panel-stat-card-label">Processos</span>
                </div>
              </div>
            </div>

            {/* Responsável */}
            <div className="panel-section">
              <h4 className="panel-section-title">Responsável</h4>
              <div className="panel-owner-card">
                <Avatar className="panel-owner-avatar">
                  <AvatarImage src={dominio.responsavel.foto} alt={dominio.responsavel.nome} />
                  <AvatarFallback>{dominio.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="panel-owner-info">
                  <p className="panel-owner-name">{dominio.responsavel.nome}</p>
                  <p className="panel-owner-role">{dominio.responsavel.cargo}</p>
                </div>
              </div>
            </div>

            {/* Jornadas Cards */}
            <div className="panel-section">
              <h4 className="panel-section-title">Jornadas ({dominio.jornadas.length})</h4>
              <div className="panel-cards">
                {dominio.jornadas.map(j => (
                  <button
                    key={j.id}
                    className="panel-item-card panel-item-card--jornada"
                    onClick={() => onNavigateToJornada?.(j, parentBU || undefined, dominio)}
                  >
                    <div className="panel-item-card-icon">
                      <GitBranch size={16} />
                    </div>
                    <div className="panel-item-card-content">
                      <span className="panel-item-card-name">{j.nome}</span>
                      <span className="panel-item-card-meta">{j.totalProcessos} processos</span>
                    </div>
                    <ChevronRight className="panel-item-card-arrow" />
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }
      case 'jornada': {
        const jornada = data as JornadaCompleta;
        return (
          <>
            {/* Stats Cards */}
            <div className="panel-stats-grid panel-stats-grid--2">
              <div className="panel-stat-card panel-stat-card--macro">
                <div className="panel-stat-card-icon">
                  <Boxes size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{jornada.totalMacroprocessos}</span>
                  <span className="panel-stat-card-label">Macroprocessos</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--processo">
                <div className="panel-stat-card-icon">
                  <FileText size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{jornada.totalProcessos}</span>
                  <span className="panel-stat-card-label">Processos</span>
                </div>
              </div>
            </div>

            {/* Responsável */}
            <div className="panel-section">
              <h4 className="panel-section-title">Responsável</h4>
              <div className="panel-owner-card">
                <Avatar className="panel-owner-avatar">
                  <AvatarImage src={jornada.responsavel.foto} alt={jornada.responsavel.nome} />
                  <AvatarFallback>{jornada.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="panel-owner-info">
                  <p className="panel-owner-name">{jornada.responsavel.nome}</p>
                  <p className="panel-owner-role">{jornada.responsavel.cargo}</p>
                </div>
              </div>
            </div>

            {/* Macroprocessos Cards */}
            <div className="panel-section">
              <h4 className="panel-section-title">Macroprocessos ({jornada.macroprocessos.length})</h4>
              <div className="panel-cards">
                {jornada.macroprocessos.map(m => (
                  <button
                    key={m.id}
                    className="panel-item-card panel-item-card--macro"
                    onClick={() => onNavigateToMacro?.(m, parentBU || undefined, parentDominio || undefined, jornada)}
                  >
                    <div className="panel-item-card-icon">
                      <Boxes size={16} />
                    </div>
                    <div className="panel-item-card-content">
                      <span className="panel-item-card-name">{m.nome}</span>
                      <span className="panel-item-card-meta">{m.totalProcessos} processos</span>
                    </div>
                    <ChevronRight className="panel-item-card-arrow" />
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }
      case 'macro': {
        const macro = data as MacroprocessoCompleto;
        const ativos = macro.processos.filter(p => p.status === 'ativo').length;
        const revisao = macro.processos.filter(p => p.status === 'em_revisao').length;
        const automacaoMedia = macro.processos.length > 0
          ? Math.round(macro.processos.reduce((acc, p) => acc + (p.automatizacao || 0), 0) / macro.processos.length)
          : 0;

        return (
          <>
            {/* Stats Cards */}
            <div className="panel-stats-grid">
              <div className="panel-stat-card panel-stat-card--processo">
                <div className="panel-stat-card-icon">
                  <FileText size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{macro.totalProcessos}</span>
                  <span className="panel-stat-card-label">Processos</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--success">
                <div className="panel-stat-card-icon">
                  <Users size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{ativos}</span>
                  <span className="panel-stat-card-label">Ativos</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--warning">
                <div className="panel-stat-card-icon">
                  <BarChart3 size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{revisao}</span>
                  <span className="panel-stat-card-label">Revisão</span>
                </div>
              </div>
              <div className="panel-stat-card panel-stat-card--info">
                <div className="panel-stat-card-icon">
                  <Zap size={20} />
                </div>
                <div className="panel-stat-card-info">
                  <span className="panel-stat-card-value">{automacaoMedia}%</span>
                  <span className="panel-stat-card-label">Automação</span>
                </div>
              </div>
            </div>

            {/* Responsável */}
            <div className="panel-section">
              <h4 className="panel-section-title">Responsável</h4>
              <div className="panel-owner-card">
                <Avatar className="panel-owner-avatar">
                  <AvatarImage src={macro.responsavel.foto} alt={macro.responsavel.nome} />
                  <AvatarFallback>{macro.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="panel-owner-info">
                  <p className="panel-owner-name">{macro.responsavel.nome}</p>
                  <p className="panel-owner-role">{macro.responsavel.cargo}</p>
                </div>
              </div>
            </div>

            {/* Processos Cards */}
            <div className="panel-section">
              <h4 className="panel-section-title">Processos ({macro.processos.length})</h4>
              <div className="panel-cards">
                {macro.processos.map(p => (
                  <button
                    key={p.id}
                    className="panel-item-card panel-item-card--processo"
                    onClick={() => onNavigateToProcesso?.(p, parentBU || undefined, parentDominio || undefined, parentJornada || undefined, macro)}
                    title="Ver detalhes do processo"
                  >
                    <div className="panel-item-card-icon">
                      <FileText size={16} />
                    </div>
                    <div className="panel-item-card-content">
                      <span className="panel-item-card-name">{p.nome}</span>
                      <span className="panel-item-card-meta">{p.codigo}</span>
                    </div>
                    <span className={`panel-item-card-status panel-item-card-status--${p.status === 'em_revisao' ? 'revisao' : p.status}`}>
                      {p.status === 'ativo' ? 'Ativo' : p.status === 'em_revisao' ? 'Revisão' : 'Inativo'}
                    </span>
                    <ChevronRight className="panel-item-card-arrow" />
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };

  const getTitle = () => {
    if ('nome' in data) return data.nome;
    return '';
  };

  const getCodigo = () => {
    if ('codigo' in data) return data.codigo;
    return '';
  };

  return (
    <div className={`detail-panel ${isOpen ? 'detail-panel--open' : ''}`}>
      <div className="panel-header">
        <div className="panel-breadcrumb">
          {breadcrumb.map((item, i) => (
            <span key={i}>
              {i > 0 && <ChevronRight className="panel-breadcrumb-sep" />}
              <span className={i === breadcrumb.length - 1 ? 'panel-breadcrumb-current' : ''}>
                {item.nome}
              </span>
            </span>
          ))}
        </div>
        <button className="panel-close" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="panel-hero">
        <div className="panel-hero-icon">{getIcon()}</div>
        <div className="panel-hero-info">
          <span className="panel-hero-code">{getCodigo()}</span>
          <h2 className="panel-hero-title">{getTitle()}</h2>
        </div>
        {onOpenPage && (
          <button className="panel-hero-action" onClick={onOpenPage} title="Ver página completa">
            <ExternalLink size={16} />
            <span>Ver página</span>
          </button>
        )}
      </div>

      <div className="panel-content">
        {renderContent()}
      </div>
    </div>
  );
}

// ============================================
// Main Structure View
// ============================================

export function StructureView({ onSelectBU, onSelectDominio, onSelectJornada, onSelectMacro, onSelectProcesso }: StructureViewProps) {
  const [search, setSearch] = useState('');
  const [selectedVP, setSelectedVP] = useState<string | null>(null);
  const [expandedBU, setExpandedBU] = useState<string | null>(null);

  // Detail Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelType, setPanelType] = useState<DetailType | null>(null);
  const [panelData, setPanelData] = useState<any>(null);
  const [panelBreadcrumb, setPanelBreadcrumb] = useState<{ type: DetailType; nome: string }[]>([]);

  // Parent context for navigation
  const [parentBU, setParentBU] = useState<BusinessUnit | null>(null);
  const [parentDominio, setParentDominio] = useState<DominioCompleto | null>(null);
  const [parentJornada, setParentJornada] = useState<JornadaCompleta | null>(null);
  const [parentMacro, setParentMacro] = useState<MacroprocessoCompleto | null>(null);

  // Filter BUs
  const filteredBUs = useMemo(() => {
    return businessUnits.filter(bu => {
      const matchesSearch = search === '' ||
        bu.nome.toLowerCase().includes(search.toLowerCase()) ||
        bu.codigo.toLowerCase().includes(search.toLowerCase());
      const matchesVP = selectedVP === null || bu.vpId === selectedVP;
      return matchesSearch && matchesVP;
    });
  }, [search, selectedVP]);

  const handleShowDetails = (
    type: DetailType,
    data: any,
    breadcrumb: { type: DetailType; nome: string }[],
    context?: { bu?: BusinessUnit; dominio?: DominioCompleto; jornada?: JornadaCompleta }
  ) => {
    setPanelType(type);
    setPanelData(data);
    setPanelBreadcrumb(breadcrumb);
    setPanelOpen(true);

    // Update parent context based on type and provided context
    if (type === 'bu') {
      setParentBU(data as BusinessUnit);
      setParentDominio(null);
      setParentJornada(null);
      setParentMacro(null);
    } else if (type === 'dominio') {
      // Use provided context or keep existing
      if (context?.bu) setParentBU(context.bu);
      setParentDominio(data as DominioCompleto);
      setParentJornada(null);
      setParentMacro(null);
    } else if (type === 'jornada') {
      // Use provided context or keep existing
      if (context?.bu) setParentBU(context.bu);
      if (context?.dominio) setParentDominio(context.dominio);
      setParentJornada(data as JornadaCompleta);
      setParentMacro(null);
    } else if (type === 'macro') {
      // Use provided context or keep existing
      if (context?.bu) setParentBU(context.bu);
      if (context?.dominio) setParentDominio(context.dominio);
      if (context?.jornada) setParentJornada(context.jornada);
      setParentMacro(data as MacroprocessoCompleto);
    }
  };

  // Handler to open full page for current panel item
  const handleOpenPage = () => {
    if (!panelType || !panelData) return;

    switch (panelType) {
      case 'bu':
        onSelectBU?.(panelData as BusinessUnit);
        break;
      case 'dominio':
        onSelectDominio?.(panelData as DominioCompleto, parentBU || undefined);
        break;
      case 'jornada':
        onSelectJornada?.(panelData as JornadaCompleta, parentBU || undefined, parentDominio || undefined);
        break;
      case 'macro':
        onSelectMacro?.(panelData as MacroprocessoCompleto, parentBU || undefined, parentDominio || undefined, parentJornada || undefined);
        break;
    }
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
  };

  return (
    <div className={`structure-view ${panelOpen ? 'structure-view--panel-open' : ''}`}>
      {/* Main Content */}
      <div className="structure-main">
        {/* Header */}
        <header className="structure-header">
          <div className="structure-header-left">
            <span className="structure-badge">GPS 2.0</span>
            <h1 className="structure-title">Estrutura Organizacional</h1>
            <p className="structure-subtitle">
              {totaisGlobais.totalBUs} Business Units · {totaisGlobais.totalDominios} Domínios · {totaisGlobais.totalProcessos.toLocaleString('pt-BR')} Processos
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="structure-filters">
          <div className="structure-search">
            <Search className="structure-search-icon" />
            <input
              type="text"
              placeholder="Buscar BU, domínio, jornada..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="structure-search-input"
            />
          </div>

          <div className="structure-filter-group">
            <Filter className="structure-filter-icon" />
            <select
              value={selectedVP || ''}
              onChange={(e) => setSelectedVP(e.target.value || null)}
              className="structure-filter-select"
            >
              <option value="">Todos os VPs</option>
              {vps.map(vp => (
                <option key={vp.id} value={vp.id}>{vp.nome} - {vp.cargo}</option>
              ))}
            </select>
          </div>
        </div>

        {/* BU Grid */}
        <div className="structure-grid">
          {filteredBUs.map(bu => (
            <BUCard
              key={bu.id}
              bu={bu}
              isExpanded={expandedBU === bu.id}
              onToggle={() => setExpandedBU(expandedBU === bu.id ? null : bu.id)}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>

        {filteredBUs.length === 0 && (
          <div className="structure-empty">
            <p>Nenhuma BU encontrada</p>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <DetailPanel
        isOpen={panelOpen}
        type={panelType}
        data={panelData}
        breadcrumb={panelBreadcrumb}
        onClose={handleClosePanel}
        parentBU={parentBU}
        parentDominio={parentDominio}
        parentJornada={parentJornada}
        parentMacro={parentMacro}
        onNavigateToBU={onSelectBU}
        onNavigateToDominio={onSelectDominio}
        onNavigateToJornada={onSelectJornada}
        onNavigateToMacro={onSelectMacro}
        onNavigateToProcesso={onSelectProcesso}
        onOpenPage={handleOpenPage}
      />

      {/* Overlay */}
      {panelOpen && <div className="structure-overlay" onClick={handleClosePanel} />}
    </div>
  );
}
