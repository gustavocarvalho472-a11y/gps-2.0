/**
 * GPS 2.0 - Processo List Page (Cadastros)
 * Página de listagem de processos seguindo design do Figma
 */

import { useState } from 'react';
import {
  ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight,
  Search, Filter, Plus
} from 'lucide-react';
import { MetricCard, ProcessCard, type StatusType, type HierarchyItem, type ResponsavelInfo } from '../shared';
import './ProcessoListPage.css';

interface ProcessoItem {
  id: string;
  codigo: string;
  nome: string;
  status: StatusType;
  criticidade?: 'critico' | 'medio' | 'baixo';
  dataCriacao: string;
  dataAtualizacao: string;
  dominio: { codigo: string; nome: string };
  jornada: { codigo: string; nome: string };
  macroprocesso: { codigo: string; nome: string };
  responsavel: ResponsavelInfo;
}

interface ProcessoListPageProps {
  onBack: () => void;
  onAddNew: () => void;
  onSelectProcesso?: (processo: ProcessoItem) => void;
}

// Mock data seguindo o Figma (node 63:3007)
const mockProcessos: ProcessoItem[] = [
  {
    id: '1',
    codigo: 'PROC003',
    nome: 'Avaliação de Desempenho',
    status: 'desatualizado',
    criticidade: 'critico',
    dataCriacao: '01/08/2026',
    dataAtualizacao: '01/09/2026',
    dominio: { codigo: 'D001', nome: 'Coleta de feedback' },
    jornada: { codigo: 'J001', nome: 'Análise de resultados' },
    macroprocesso: { codigo: 'MP001', nome: 'Entrevistas e avaliações' },
    responsavel: {
      nome: 'Mariana Oliveira',
      cargo: 'Analista de RH',
      equipe: '(VPTECH) EQUIPE PÓS DESIGN E OPM'
    }
  },
  {
    id: '2',
    codigo: 'PROC004',
    nome: 'Treinamento e Desenvolvimento',
    status: 'em_aprovacao',
    criticidade: 'medio',
    dataCriacao: '05/08/2026',
    dataAtualizacao: '15/09/2026',
    dominio: { codigo: 'D002', nome: 'Planejamento de cursos' },
    jornada: { codigo: 'J002', nome: 'Avaliação de eficácia' },
    macroprocesso: { codigo: 'MP002', nome: 'Capacitação de equipes' },
    responsavel: {
      nome: 'Carlos Santos',
      cargo: 'Coordenador de Treinamento',
      equipe: '(PTI) EQUIPE DE RECURSOS HUMANOS'
    }
  },
  {
    id: '3',
    codigo: 'PROC005',
    nome: 'Onboarding de Funcionários',
    status: 'atualizado',
    criticidade: 'baixo',
    dataCriacao: '10/07/2026',
    dataAtualizacao: '20/09/2026',
    dominio: { codigo: 'D003', nome: 'Gestão de pessoas' },
    jornada: { codigo: 'J003', nome: 'Integração' },
    macroprocesso: { codigo: 'MP003', nome: 'Admissão e acolhimento' },
    responsavel: {
      nome: 'Ana Silva',
      cargo: 'Gerente de RH',
      equipe: '(VPCORP) EQUIPE RECURSOS HUMANOS'
    }
  },
  {
    id: '4',
    codigo: 'PROC006',
    nome: 'Solicitação de Férias',
    status: 'desatualizado',
    criticidade: 'baixo',
    dataCriacao: '15/06/2026',
    dataAtualizacao: '10/08/2026',
    dominio: { codigo: 'D004', nome: 'Administração de pessoal' },
    jornada: { codigo: 'J004', nome: 'Gestão de benefícios' },
    macroprocesso: { codigo: 'MP004', nome: 'Controle de ausências' },
    responsavel: {
      nome: 'Pedro Almeida',
      cargo: 'Analista DHO',
      equipe: '(PTI) EQUIPE GRADUAÇÃO'
    }
  },
];

export function ProcessoListPage({ onBack: _onBack, onAddNew, onSelectProcesso }: ProcessoListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra os processos
  const filteredProcessos = mockProcessos.filter(processo => {
    const matchesSearch = processo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || processo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredProcessos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProcessos = filteredProcessos.slice(startIndex, startIndex + itemsPerPage);

  // Métricas
  const totalProcessos = 2124;
  const atualizados = 2020;
  const desatualizados = 100;
  const emAprovacao = 4;

  // Converter processo para hierarchy items (com código conforme Figma)
  const getHierarchy = (processo: ProcessoItem): HierarchyItem[] => [
    { type: 'dominio', codigo: processo.dominio.codigo, nome: processo.dominio.nome },
    { type: 'jornada', codigo: processo.jornada.codigo, nome: processo.jornada.nome },
    { type: 'macroprocesso', codigo: processo.macroprocesso.codigo, nome: processo.macroprocesso.nome },
  ];

  return (
    <div className="processo-list-page">
      {/* Header */}
      <header className="processo-list-header">
        <div className="processo-list-title-section">
          <span className="processo-list-breadcrumb-label">Cadastros</span>
          <h1 className="processo-list-title">Processos</h1>
        </div>
        <button className="processo-list-add-btn" onClick={onAddNew}>
          <Plus size={20} />
          <span>Adicionar processo</span>
        </button>
      </header>

      {/* Metric Cards */}
      <div className="processo-list-metrics">
        <MetricCard label="Total de processos" value={totalProcessos} />
        <MetricCard label="Processos atualizados" value={atualizados} />
        <MetricCard label="Processos desatualizados" value={desatualizados} />
        <MetricCard label="Processos em aprovação" value={emAprovacao} />
      </div>

      {/* Search and Filter */}
      <div className="processo-list-toolbar">
        <div className="processo-list-search">
          <Search size={14} className="processo-list-search-icon" />
          <input
            type="text"
            placeholder="Pesquisar nome ou código do processo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="processo-list-search-input"
          />
        </div>
        <div className="processo-list-filter-wrapper">
          <button
            className="processo-list-filter-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <span>Filtrar</span>
            <Filter size={16} />
          </button>
          {showFilterDropdown && (
            <div className="processo-list-filter-dropdown">
              <button
                className={`processo-filter-option ${statusFilter === 'todos' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('todos'); setShowFilterDropdown(false); }}
              >
                Todos
              </button>
              <button
                className={`processo-filter-option ${statusFilter === 'atualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('atualizado'); setShowFilterDropdown(false); }}
              >
                Atualizados
              </button>
              <button
                className={`processo-filter-option ${statusFilter === 'desatualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('desatualizado'); setShowFilterDropdown(false); }}
              >
                Desatualizados
              </button>
              <button
                className={`processo-filter-option ${statusFilter === 'em_aprovacao' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('em_aprovacao'); setShowFilterDropdown(false); }}
              >
                Em aprovação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List of Cards */}
      <div className="processo-list-cards">
        {paginatedProcessos.map(processo => (
          <ProcessCard
            key={processo.id}
            codigo={processo.codigo}
            nome={processo.nome}
            status={processo.status}
            criticidade={processo.criticidade}
            showCriticidade={true}
            dataCriacao={processo.dataCriacao}
            dataAtualizacao={processo.dataAtualizacao}
            hierarchy={getHierarchy(processo)}
            responsavel={processo.responsavel}
            onClick={() => onSelectProcesso?.(processo)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="processo-list-pagination">
        <button
          className="processo-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          className="processo-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="processo-pagination-pages">
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`processo-pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="processo-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        >
          <ChevronRight size={20} />
        </button>
        <button
          className="processo-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
