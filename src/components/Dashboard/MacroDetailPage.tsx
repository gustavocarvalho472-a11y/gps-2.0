/**
 * GPS 2.0 - Macroprocesso Detail Page
 * Página de detalhe de Macroprocesso seguindo novo design Figma
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, Route, GitBranch, Building2, Users, MoreHorizontal, Eye, FileText, Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProcessCard, type StatusType, type HierarchyItem, type ResponsavelInfo } from '../shared';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../../types';
import './EntityDetailPage.css';

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

  // Determinar status do macroprocesso (mock - pode vir do backend)
  const macroStatus: StatusType = 'desatualizado';

  // Mock de VP (pode vir do backend)
  const vpNome = '(VPTECH) EQUIPE PÓS E OPM';

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
      {/* Header com Breadcrumb */}
      <header className="entity-header">
        <button className="entity-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <nav className="entity-breadcrumb">
          <span>Cadastros</span>
          <ChevronRight size={16} />
          <span>Macroprocessos</span>
          <ChevronRight size={16} />
          <span className="entity-breadcrumb-current">{macro.nome}</span>
        </nav>
      </header>

      {/* Card Principal */}
      <div className="entity-card">
        {/* Cabeçalho do Card */}
        <div className="entity-card-header">
          <div className="entity-card-info">
            <span className="entity-card-type">Macroprocesso</span>
            <h1 className="entity-card-title">{macro.nome}</h1>
            <span className="entity-card-code">{macro.codigo}</span>
          </div>

          <div className="entity-card-actions">
            <span className={`entity-tag entity-tag--${macroStatus}`}>
              {macroStatus === 'atualizado' ? 'Atualizado' : macroStatus === 'em_aprovacao' ? 'Em aprovação' : 'Desatualizado'}
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

        {/* Lista de Processos */}
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
      </div>
    </div>
  );
}
