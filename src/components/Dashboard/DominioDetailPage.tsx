/**
 * GPS 2.0 - Domínio Detail Page
 * Página de detalhe de Domínio com layout: BU context → H1 → Metrics Cards
 */

import { useState } from 'react';
import { ArrowLeft, Building2, Users, MoreHorizontal, Eye, GitBranch, Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MetricsCards, type MetricItem } from './MetricsCards';
import { ProcessCard, type StatusType, type ResponsavelInfo } from '../shared';
import type { BusinessUnit, DominioCompleto, JornadaCompleta } from '../../types';
import './EntityDetailPage.css';

interface DominioDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  onBack: () => void;
  onSelectJornada: (jornada: JornadaCompleta) => void;
}

export function DominioDetailPage({ bu, dominio, onBack, onSelectJornada }: DominioDetailPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Determinar status do domínio (mock - pode vir do backend)
  const dominioStatus = 'desatualizado' as StatusType;

  // Mock de VP (pode vir do backend)
  const vpNome = '(VPTECH) EQUIPE PÓS E OPM';

  // Métricas completas da hierarquia
  const hierarchyMetrics: MetricItem[] = [
    { id: 'dominio', label: 'Domínio', value: 1, icon: 'dominio' },
    { id: 'jornadas', label: 'Jornadas', value: dominio.totalJornadas, icon: 'jornada' },
    { id: 'macros', label: 'Macroprocessos', value: dominio.totalMacroprocessos, icon: 'macro' },
    { id: 'processos', label: 'Processos', value: dominio.totalProcessos, icon: 'processo' },
  ];

  // Filtrar jornadas
  const filteredJornadas = dominio.jornadas.filter(jornada => {
    const matchesSearch = jornada.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jornada.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || true;
    return matchesSearch && matchesStatus;
  });

  // Converter jornada para props do ProcessCard
  const getJornadaCardProps = (jornada: JornadaCompleta) => {
    const responsavel: ResponsavelInfo = {
      nome: jornada.responsavel.nome,
      cargo: jornada.responsavel.cargo || 'Product Owner',
      equipe: jornada.responsavel.area || vpNome
    };

    return {
      codigo: jornada.codigo,
      nome: jornada.nome,
      status: 'desatualizado' as StatusType,
      dataCriacao: '01/08/2026',
      dataAtualizacao: '01/09/2026',
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
          <span className="entity-hero-type">Domínio</span>
          <h1 className="entity-hero-title">{dominio.nome}</h1>
          <span className="entity-hero-code">{dominio.codigo}</span>
        </div>
        <div className="entity-hero-actions">
          <span className={`entity-tag entity-tag--${dominioStatus}`}>
            {dominioStatus === 'atualizado' ? 'Atualizado' : dominioStatus === 'em_aprovacao' ? 'Em aprovação' : 'Desatualizado'}
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
              <AvatarImage src={dominio.responsavel.foto} alt={dominio.responsavel.nome} />
              <AvatarFallback>
                {dominio.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="entity-responsavel-info">
              <span className="entity-responsavel-label">Responsável</span>
              <span className="entity-responsavel-name">{dominio.responsavel.nome}</span>
              <span className="entity-responsavel-details">
                {dominio.responsavel.cargo}
                {dominio.responsavel.area && ` • ${dominio.responsavel.area}`}
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

      {/* Seção de Jornadas */}
      <div className="entity-children-section">
        <div className="entity-children-header">
          <div className="entity-children-title-group">
            <GitBranch size={20} />
            <h2 className="entity-children-title">Jornadas</h2>
            <span className="entity-children-badge">{dominio.jornadas.length}</span>
          </div>
          <button className="entity-add-btn">
            <Plus size={20} />
            <span>Adicionar jornada</span>
          </button>
        </div>

        {/* Toolbar de busca e filtro */}
        <div className="entity-toolbar">
          <div className="entity-search">
            <Search size={14} className="entity-search-icon" />
            <input
              type="text"
              placeholder="Pesquisar nome ou código da jornada"
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

        {/* Lista de Jornadas */}
        {filteredJornadas.length > 0 ? (
          <div className="entity-children-list">
            {filteredJornadas.map(jornada => {
              const cardProps = getJornadaCardProps(jornada);
              return (
                <ProcessCard
                  key={jornada.id}
                  {...cardProps}
                  onClick={() => onSelectJornada(jornada)}
                />
              );
            })}
          </div>
        ) : (
          <div className="entity-empty">
            <GitBranch className="entity-empty-icon" />
            <h3 className="entity-empty-title">Nenhuma jornada encontrada</h3>
            <p className="entity-empty-desc">
              {searchTerm
                ? 'Nenhuma jornada corresponde aos critérios de busca.'
                : 'Este domínio ainda não possui jornadas vinculadas.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
