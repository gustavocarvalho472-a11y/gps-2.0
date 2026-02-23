/**
 * GPS 2.0 - Domínio Detail Page
 * Página de detalhe de Domínio com tabs: Jornadas, Macroprocessos, Processos, Cadeia de Valor
 */

import { useState } from 'react';
import { ArrowLeft, Building2, Users, MoreHorizontal, Clock, GitBranch, Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProcessCard, type StatusType, type ResponsavelInfo } from '../shared';
import { CadeiaDeValorView } from './CadeiaDeValorView';
import type { BusinessUnit, DominioCompleto, JornadaCompleta } from '../../types';
import './EntityDetailPage.css';

interface DominioDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  onBack: () => void;
  onSelectJornada: (jornada: JornadaCompleta) => void;
}

type TabId = 'jornadas' | 'macroprocessos' | 'processos' | 'cadeia';

export function DominioDetailPage({ bu, dominio, onBack, onSelectJornada }: DominioDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>('jornadas');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Determinar status do domínio (mock - pode vir do backend)
  const dominioStatus = 'desatualizado' as StatusType;

  // Mock de VP (pode vir do backend)
  const vpNome = '(VPTECH) EQUIPE PÓS E OPM';

  // Aggregate counts
  const allMacros = dominio.jornadas.flatMap(j => j.macroprocessos);
  const allProcessos = allMacros.flatMap(m => m.processos);

  const tabs = [
    { id: 'jornadas' as TabId, label: 'Jornadas', count: dominio.jornadas.length },
    { id: 'macroprocessos' as TabId, label: 'Macroprocessos', count: allMacros.length },
    { id: 'processos' as TabId, label: 'Processos', count: allProcessos.length },
    { id: 'cadeia' as TabId, label: 'Cadeia de Valor', count: null },
  ];

  // Filtrar jornadas
  const filteredJornadas = dominio.jornadas.filter(jornada => {
    const matchesSearch = jornada.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jornada.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || true;
    return matchesSearch && matchesStatus;
  });

  // Filtrar macroprocessos (flat list)
  const filteredMacros = allMacros.filter(macro => {
    const matchesSearch = macro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      macro.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || true;
    return matchesSearch && matchesStatus;
  });

  // Filtrar processos (flat list)
  const filteredProcessos = allProcessos.filter(processo => {
    const matchesSearch = processo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.codigo.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setSearchTerm('');
    setStatusFilter('todos');
    setShowFilterDropdown(false);
  };

  const getAddLabel = () => {
    if (activeTab === 'jornadas') return 'Adicionar jornada';
    if (activeTab === 'macroprocessos') return 'Adicionar macroprocesso';
    if (activeTab === 'processos') return 'Adicionar processo';
    return null;
  };

  const getSearchPlaceholder = () => {
    if (activeTab === 'jornadas') return 'Pesquisar nome ou código da jornada';
    if (activeTab === 'macroprocessos') return 'Pesquisar nome ou código do macroprocesso';
    return 'Pesquisar nome ou código do processo';
  };

  const renderList = () => {
    if (activeTab === 'cadeia') {
      return <CadeiaDeValorView dominio={dominio} buNome={bu.nome} vpNome={vpNome} />;
    }

    const items =
      activeTab === 'jornadas' ? filteredJornadas :
      activeTab === 'macroprocessos' ? filteredMacros :
      filteredProcessos;

    const emptyLabel =
      activeTab === 'jornadas' ? 'jornada' :
      activeTab === 'macroprocessos' ? 'macroprocesso' : 'processo';

    return (
      <>
        {/* Toolbar de busca e filtro */}
        <div className="entity-toolbar">
          <div className="entity-search">
            <Search size={14} className="entity-search-icon" />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
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

        {items.length > 0 ? (
          <div className="entity-children-list">
            {activeTab === 'jornadas' && filteredJornadas.map(jornada => {
              const cardProps = getJornadaCardProps(jornada);
              return (
                <ProcessCard
                  key={jornada.id}
                  {...cardProps}
                  onClick={() => onSelectJornada(jornada)}
                />
              );
            })}
            {activeTab === 'macroprocessos' && filteredMacros.map(macro => (
              <ProcessCard
                key={macro.id}
                codigo={macro.codigo}
                nome={macro.nome}
                status={'desatualizado' as StatusType}
                dataCriacao="01/08/2026"
                dataAtualizacao="01/09/2026"
                responsavel={{
                  nome: macro.responsavel.nome,
                  cargo: macro.responsavel.cargo || 'Process Owner',
                  equipe: macro.responsavel.area || vpNome
                }}
              />
            ))}
            {activeTab === 'processos' && filteredProcessos.map(processo => (
              <ProcessCard
                key={processo.id}
                codigo={processo.codigo}
                nome={processo.nome}
                status={'desatualizado' as StatusType}
                dataCriacao="01/08/2026"
                dataAtualizacao="01/09/2026"
                responsavel={processo.responsavel ? {
                  nome: processo.responsavel.nome,
                  cargo: processo.responsavel.cargo || 'Analista',
                  equipe: processo.responsavel.area || vpNome
                } : {
                  nome: 'Não definido',
                  cargo: '-',
                  equipe: vpNome
                }}
              />
            ))}
          </div>
        ) : (
          <div className="entity-empty">
            <GitBranch className="entity-empty-icon" />
            <h3 className="entity-empty-title">Nenhum {emptyLabel} encontrado</h3>
            <p className="entity-empty-desc">
              {searchTerm
                ? `Nenhum ${emptyLabel} corresponde aos critérios de busca.`
                : `Este domínio ainda não possui ${emptyLabel}s vinculados.`}
            </p>
          </div>
        )}
      </>
    );
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

      {/* Card de Detalhes */}
      <div className="entity-card">
        {/* Cabeçalho: Tipo, Título, Código + Status + More */}
        <div className="entity-card-header">
          <div className="entity-card-info">
            <span className="entity-card-type">Domínio</span>
            <h1 className="entity-card-title">{dominio.nome}</h1>
            <span className="entity-card-code">{dominio.codigo}</span>
          </div>
          <div className="entity-card-actions">
            <span className={`entity-tag entity-tag--${dominioStatus}`}>
              {dominioStatus === 'atualizado' ? 'Atualizado' : dominioStatus === 'em_aprovacao' ? 'Em aprovação' : 'Desatualizado'}
            </span>
            <button className="entity-more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

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
            <div className="entity-avatar-border">
              <Avatar className="entity-avatar">
                <AvatarImage src={dominio.responsavel.foto} alt={dominio.responsavel.nome} />
                <AvatarFallback>
                  {dominio.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
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
            <Clock size={16} />
            Visualizar histórico
          </button>
        </div>

        {/* Footer com datas */}
        <div className="entity-footer">
          <span className="entity-date">Criado em 02/02/2026</span>
          <span className="entity-date">Última atualização em 02/02/2026</span>
        </div>
      </div>

      {/* Seção de conteúdo com tabs */}
      <div className="entity-children-section">
        {/* Tab bar + Add button */}
        <div className="entity-tabs-bar">
          <div className="entity-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`entity-tab ${activeTab === tab.id ? 'entity-tab--active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="entity-tab-count">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
          {getAddLabel() && (
            <button className="entity-add-btn">
              <Plus size={20} />
              <span>{getAddLabel()}</span>
            </button>
          )}
        </div>

        {/* Tab content */}
        {renderList()}
      </div>
    </div>
  );
}
