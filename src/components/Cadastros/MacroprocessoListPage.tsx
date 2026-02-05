/**
 * GPS 2.0 - Macroprocesso List Page (Cadastros)
 * Página de listagem de macroprocessos seguindo design do Figma
 */

import { useState } from 'react';
import {
  ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight,
  Search, Filter, Plus
} from 'lucide-react';
import { MetricCard, ProcessCard, type StatusType, type HierarchyItem, type ResponsavelInfo } from '../shared';
import './MacroprocessoListPage.css';

interface MacroprocessoItem {
  id: string;
  codigo: string;
  nome: string;
  status: StatusType;
  dataCriacao: string;
  dataAtualizacao: string;
  dominio: { codigo: string; nome: string };
  jornada: { codigo: string; nome: string };
  responsavel: ResponsavelInfo;
}

interface MacroprocessoListPageProps {
  onBack: () => void;
  onAddNew: () => void;
  onSelectMacro?: (macro: MacroprocessoItem) => void;
}

// Mock data seguindo o Figma
const mockMacroprocessos: MacroprocessoItem[] = [
  {
    id: '1',
    codigo: 'MP001',
    nome: 'Entrevistas e avaliações',
    status: 'desatualizado',
    dataCriacao: '01/08/2026',
    dataAtualizacao: '01/09/2026',
    dominio: { codigo: 'D001', nome: 'Coleta de feedback' },
    jornada: { codigo: 'J001', nome: 'Análise de resultados' },
    responsavel: {
      nome: 'Mariana Oliveira',
      cargo: 'Analista de RH',
      equipe: '(VPTECH) EQUIPE PÓS DESIGN E OPM'
    }
  },
  {
    id: '2',
    codigo: 'MP002',
    nome: 'Treinamento e Desenvolvimento',
    status: 'em_aprovacao',
    dataCriacao: '05/08/2026',
    dataAtualizacao: '15/09/2026',
    dominio: { codigo: 'D002', nome: 'Planejamento de cursos' },
    jornada: { codigo: 'J002', nome: 'Avaliação de eficácia' },
    responsavel: {
      nome: 'Carlos Santos',
      cargo: 'Coordenador de Treinamento',
      equipe: '(PTI) EQUIPE DE RECURSOS HUMANOS'
    }
  },
  {
    id: '3',
    codigo: 'MP003',
    nome: 'Gestão de desempenho',
    status: 'atualizado',
    dataCriacao: '05/01/2026',
    dataAtualizacao: '18/03/2026',
    dominio: { codigo: 'D003', nome: 'Avaliação de performance' },
    jornada: { codigo: 'J003', nome: 'Feedback contínuo' },
    responsavel: {
      nome: 'Ana Costa',
      cargo: 'Gerente de RH',
      equipe: '(VPCORP) EQUIPE CORPORATIVO'
    }
  },
  {
    id: '4',
    codigo: 'MP004',
    nome: 'Onboarding de colaboradores',
    status: 'desatualizado',
    dataCriacao: '20/01/2026',
    dataAtualizacao: '22/03/2026',
    dominio: { codigo: 'D004', nome: 'Integração inicial' },
    jornada: { codigo: 'J004', nome: 'Ambientação corporativa' },
    responsavel: {
      nome: 'Pedro Almeida',
      cargo: 'Analista de DHO',
      equipe: '(VPTECH) EQUIPE GRADUAÇÃO'
    }
  },
];

export function MacroprocessoListPage({ onBack: _onBack, onAddNew, onSelectMacro }: MacroprocessoListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra os macroprocessos
  const filteredMacros = mockMacroprocessos.filter(macro => {
    const matchesSearch = macro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      macro.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || macro.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredMacros.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMacros = filteredMacros.slice(startIndex, startIndex + itemsPerPage);

  // Métricas (simuladas - no Figma são 2.124, 2.020, 100, 4)
  const totalMacros = 2124;
  const atualizados = 2020;
  const desatualizados = 100;
  const emAprovacao = 4;

  // Converter macroprocesso para hierarchy items
  const getHierarchy = (macro: MacroprocessoItem): HierarchyItem[] => [
    { type: 'dominio', codigo: macro.dominio.codigo, nome: macro.dominio.nome },
    { type: 'jornada', codigo: macro.jornada.codigo, nome: macro.jornada.nome },
  ];

  return (
    <div className="macro-list-page">
      {/* Header */}
      <header className="macro-list-header">
        <div className="macro-list-title-section">
          <span className="macro-list-breadcrumb-label">Cadastros</span>
          <h1 className="macro-list-title">Macroprocessos</h1>
        </div>
        <button className="macro-list-add-btn" onClick={onAddNew}>
          <Plus size={20} />
          <span>Adicionar macroprocesso</span>
        </button>
      </header>

      {/* Metric Cards */}
      <div className="macro-list-metrics">
        <MetricCard label="Total de macroprocessos" value={totalMacros} />
        <MetricCard label="Macroprocessos atualizados" value={atualizados} />
        <MetricCard label="Macroprocessos desatualizados" value={desatualizados} />
        <MetricCard label="Macroprocessos em aprovação" value={emAprovacao} />
      </div>

      {/* Search and Filter */}
      <div className="macro-list-toolbar">
        <div className="macro-list-search">
          <Search size={14} className="macro-list-search-icon" />
          <input
            type="text"
            placeholder="Pesquisar nome ou código do macroprocesso"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="macro-list-search-input"
          />
        </div>
        <div className="macro-list-filter-wrapper">
          <button
            className="macro-list-filter-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <span>Filtrar</span>
            <Filter size={16} />
          </button>
          {showFilterDropdown && (
            <div className="macro-list-filter-dropdown">
              <button
                className={`macro-filter-option ${statusFilter === 'todos' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('todos'); setShowFilterDropdown(false); }}
              >
                Todos
              </button>
              <button
                className={`macro-filter-option ${statusFilter === 'atualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('atualizado'); setShowFilterDropdown(false); }}
              >
                Atualizados
              </button>
              <button
                className={`macro-filter-option ${statusFilter === 'desatualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('desatualizado'); setShowFilterDropdown(false); }}
              >
                Desatualizados
              </button>
              <button
                className={`macro-filter-option ${statusFilter === 'em_aprovacao' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('em_aprovacao'); setShowFilterDropdown(false); }}
              >
                Em aprovação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List of Cards */}
      <div className="macro-list-cards">
        {paginatedMacros.map(macro => (
          <ProcessCard
            key={macro.id}
            codigo={macro.codigo}
            nome={macro.nome}
            status={macro.status}
            dataCriacao={macro.dataCriacao}
            dataAtualizacao={macro.dataAtualizacao}
            hierarchy={getHierarchy(macro)}
            responsavel={macro.responsavel}
            onClick={() => onSelectMacro?.(macro)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="macro-list-pagination">
        <button
          className="macro-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          className="macro-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="macro-pagination-pages">
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`macro-pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="macro-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        >
          <ChevronRight size={20} />
        </button>
        <button
          className="macro-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
