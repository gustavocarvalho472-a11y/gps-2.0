/**
 * GPS 2.0 - Jornada Detail Page
 * Página de detalhe de Jornada seguindo novo design Figma
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, Route, Building2, Users, MoreHorizontal, Eye, Boxes, Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProcessCard, type StatusType, type HierarchyItem, type ResponsavelInfo } from '../shared';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto } from '../../types';
import './EntityDetailPage.css';

interface JornadaDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  jornada: JornadaCompleta;
  onBack: () => void;
  onSelectMacro: (macro: MacroprocessoCompleto) => void;
}

export function JornadaDetailPage({ bu, dominio, jornada, onBack, onSelectMacro }: JornadaDetailPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Determinar status da jornada (mock - pode vir do backend)
  const jornadaStatus: StatusType = 'desatualizado';

  // Mock de VP (pode vir do backend)
  const vpNome = '(VPTECH) EQUIPE PÓS E OPM';

  // Filtrar macroprocessos
  const filteredMacros = jornada.macroprocessos.filter(macro => {
    const matchesSearch = macro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      macro.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || true;
    return matchesSearch && matchesStatus;
  });

  // Converter macroprocesso para props do ProcessCard
  const getMacroCardProps = (macro: MacroprocessoCompleto) => {
    const responsavel: ResponsavelInfo = {
      nome: macro.responsavel.nome,
      cargo: macro.responsavel.cargo || 'Process Owner',
      equipe: macro.responsavel.area || vpNome
    };

    // Hierarquia mostra domínio
    const hierarchy: HierarchyItem[] = [
      { type: 'dominio', codigo: dominio.codigo, nome: dominio.nome }
    ];

    return {
      codigo: macro.codigo,
      nome: macro.nome,
      status: 'desatualizado' as StatusType, // Mock - pode vir do backend
      dataCriacao: '01/08/2026', // Mock
      dataAtualizacao: '01/09/2026', // Mock
      hierarchy,
      responsavel
    };
  };

  return (
    <div className="entity-detail-page">
      {/* Header com Breadcrumb */}
      <header className="entity-header">
        <button className="entity-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <nav className="entity-breadcrumb">
          <span>Cadastros</span>
          <ChevronRight size={16} />
          <span>Jornadas</span>
          <ChevronRight size={16} />
          <span className="entity-breadcrumb-current">{jornada.nome}</span>
        </nav>
      </header>

      {/* Card Principal */}
      <div className="entity-card">
        {/* Cabeçalho do Card */}
        <div className="entity-card-header">
          <div className="entity-card-info">
            <span className="entity-card-type">Jornada</span>
            <h1 className="entity-card-title">{jornada.nome}</h1>
            <span className="entity-card-code">{jornada.codigo}</span>
          </div>

          <div className="entity-card-actions">
            <span className={`entity-tag entity-tag--${jornadaStatus}`}>
              {jornadaStatus === 'atualizado' ? 'Atualizado' : jornadaStatus === 'em_aprovacao' ? 'Em aprovação' : 'Desatualizado'}
            </span>
            <button className="entity-more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

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
              <AvatarImage src={jornada.responsavel.foto} alt={jornada.responsavel.nome} />
              <AvatarFallback>
                {jornada.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="entity-responsavel-info">
              <span className="entity-responsavel-label">Responsável</span>
              <span className="entity-responsavel-name">{jornada.responsavel.nome}</span>
              <span className="entity-responsavel-details">
                {jornada.responsavel.cargo}
                {jornada.responsavel.area && ` • ${jornada.responsavel.area}`}
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

      {/* Seção de Macroprocessos */}
      <div className="entity-children-section">
        <div className="entity-children-header">
          <div className="entity-children-title-group">
            <Boxes size={20} />
            <h2 className="entity-children-title">Macroprocessos</h2>
            <span className="entity-children-badge">{jornada.macroprocessos.length}</span>
          </div>
          <button className="entity-add-btn">
            <Plus size={20} />
            <span>Adicionar macroprocesso</span>
          </button>
        </div>

        {/* Toolbar de busca e filtro */}
        <div className="entity-toolbar">
          <div className="entity-search">
            <Search size={14} className="entity-search-icon" />
            <input
              type="text"
              placeholder="Pesquisar nome ou código do macroprocesso"
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

        {/* Lista de Macroprocessos */}
        {filteredMacros.length > 0 ? (
          <div className="entity-children-list">
            {filteredMacros.map(macro => {
              const cardProps = getMacroCardProps(macro);
              return (
                <ProcessCard
                  key={macro.id}
                  {...cardProps}
                  onClick={() => onSelectMacro(macro)}
                />
              );
            })}
          </div>
        ) : (
          <div className="entity-empty">
            <Boxes className="entity-empty-icon" />
            <h3 className="entity-empty-title">Nenhum macroprocesso encontrado</h3>
            <p className="entity-empty-desc">
              {searchTerm
                ? 'Nenhum macroprocesso corresponde aos critérios de busca.'
                : 'Esta jornada ainda não possui macroprocessos vinculados.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
