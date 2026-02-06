/**
 * GPS 2.0 - BU Detail Page
 * Página de detalhe de Business Unit seguindo novo design Figma
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, Users, MoreHorizontal, Eye, Layers, Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto } from '../../types';
import type { StatusType } from '../shared';
import './EntityDetailPage.css';

interface BUDetailPageProps {
  bu: BusinessUnit;
  onBack: () => void;
  onSelectDominio: (dominio: DominioCompleto) => void;
}

// Card de Domínio específico para BU (mostra estatísticas)
function DominioCard({
  dominio,
  onClick,
}: {
  dominio: DominioCompleto;
  onClick: () => void;
}) {
  return (
    <article className="bu-dominio-card" onClick={onClick}>
      <div className="bu-dominio-card-accent" />
      <div className="bu-dominio-card-content">
        <div className="bu-dominio-card-header">
          <span className="bu-dominio-card-code">{dominio.codigo}</span>
          <ChevronRight size={16} className="bu-dominio-card-chevron" />
        </div>

        <h3 className="bu-dominio-card-title">{dominio.nome}</h3>

        <div className="bu-dominio-card-responsavel">
          <Avatar className="bu-dominio-card-avatar">
            <AvatarImage src={dominio.responsavel.foto} alt={dominio.responsavel.nome} />
            <AvatarFallback>
              {dominio.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="bu-dominio-card-responsavel-info">
            <span className="bu-dominio-card-responsavel-name">{dominio.responsavel.nome}</span>
            <span className="bu-dominio-card-responsavel-role">{dominio.responsavel.cargo}</span>
          </div>
        </div>

        <div className="bu-dominio-card-stats">
          <div className="bu-dominio-card-stat">
            <span className="bu-dominio-card-stat-value">{dominio.totalJornadas}</span>
            <span className="bu-dominio-card-stat-label">Jornadas</span>
          </div>
          <div className="bu-dominio-card-stat">
            <span className="bu-dominio-card-stat-value">{dominio.totalMacroprocessos}</span>
            <span className="bu-dominio-card-stat-label">Macroprocessos</span>
          </div>
          <div className="bu-dominio-card-stat">
            <span className="bu-dominio-card-stat-value">{dominio.totalProcessos}</span>
            <span className="bu-dominio-card-stat-label">Processos</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BUDetailPage({ bu, onBack, onSelectDominio }: BUDetailPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Determinar status da BU (mock - pode vir do backend)
  const buStatus: StatusType = 'atualizado';

  // Mock de VP (pode vir do backend)
  const vpNome = '(VPTECH) EQUIPE PÓS E OPM';

  // Filtrar domínios
  const filteredDominios = bu.dominios.filter(dominio => {
    const matchesSearch = dominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dominio.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="entity-detail-page">
      {/* Header com Breadcrumb */}
      <header className="entity-header">
        <button className="entity-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <nav className="entity-breadcrumb">
          <span>Estrutura</span>
          <ChevronRight size={16} />
          <span className="entity-breadcrumb-current">{bu.nome}</span>
        </nav>
      </header>

      {/* Card Principal */}
      <div className="entity-card">
        {/* Cabeçalho do Card */}
        <div className="entity-card-header">
          <div className="entity-card-info">
            <span className="entity-card-type">Business Unit</span>
            <h1 className="entity-card-title">{bu.nome}</h1>
            <span className="entity-card-code">{bu.codigo}</span>
          </div>

          <div className="entity-card-actions">
            <span className={`entity-tag entity-tag--${buStatus}`}>
              {buStatus === 'atualizado' ? 'Atualizado' : buStatus === 'em_aprovacao' ? 'Em aprovação' : 'Desatualizado'}
            </span>
            <button className="entity-more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Hierarquia - BU só mostra VP */}
        <div className="entity-hierarchy">
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

        {/* Métricas da BU */}
        <div className="entity-metrics">
          <div className="entity-metric">
            <span className="entity-metric-value">{bu.totalDominios}</span>
            <span className="entity-metric-label">Domínios</span>
          </div>
          <div className="entity-metric">
            <span className="entity-metric-value">{bu.totalJornadas}</span>
            <span className="entity-metric-label">Jornadas</span>
          </div>
          <div className="entity-metric">
            <span className="entity-metric-value">{bu.totalMacroprocessos}</span>
            <span className="entity-metric-label">Macroprocessos</span>
          </div>
          <div className="entity-metric">
            <span className="entity-metric-value">{bu.totalProcessos}</span>
            <span className="entity-metric-label">Processos</span>
          </div>
        </div>

        {/* Responsável e Ações */}
        <div className="entity-responsavel-section">
          <div className="entity-responsavel">
            <Avatar className="entity-avatar">
              <AvatarImage src={bu.responsavel.foto} alt={bu.responsavel.nome} />
              <AvatarFallback>
                {bu.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="entity-responsavel-info">
              <span className="entity-responsavel-label">Responsável</span>
              <span className="entity-responsavel-name">{bu.responsavel.nome}</span>
              <span className="entity-responsavel-details">
                {bu.responsavel.cargo}
                {bu.responsavel.area && ` • ${bu.responsavel.area}`}
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

      {/* Seção de Domínios */}
      <div className="entity-children-section">
        <div className="entity-children-header">
          <div className="entity-children-title-group">
            <Layers size={20} />
            <h2 className="entity-children-title">Domínios</h2>
            <span className="entity-children-badge">{bu.dominios.length}</span>
          </div>
          <button className="entity-add-btn">
            <Plus size={20} />
            <span>Adicionar domínio</span>
          </button>
        </div>

        {/* Toolbar de busca e filtro */}
        <div className="entity-toolbar">
          <div className="entity-search">
            <Search size={14} className="entity-search-icon" />
            <input
              type="text"
              placeholder="Pesquisar nome ou código do domínio"
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

        {/* Lista de Domínios */}
        {filteredDominios.length > 0 ? (
          <div className="bu-dominio-grid">
            {filteredDominios.map(dominio => (
              <DominioCard
                key={dominio.id}
                dominio={dominio}
                onClick={() => onSelectDominio(dominio)}
              />
            ))}
          </div>
        ) : (
          <div className="entity-empty">
            <Layers className="entity-empty-icon" />
            <h3 className="entity-empty-title">Nenhum domínio encontrado</h3>
            <p className="entity-empty-desc">
              {searchTerm
                ? 'Nenhum domínio corresponde aos critérios de busca.'
                : 'Esta Business Unit ainda não possui domínios vinculados.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
