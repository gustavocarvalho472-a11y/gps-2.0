/**
 * GPS 2.0 - Jornada List Page (Cadastros)
 * Página de listagem de jornadas seguindo design do Figma
 */

import { useState } from 'react';
import {
  ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight,
  Search, Filter, Plus
} from 'lucide-react';
import { MetricCard, ProcessCard, type StatusType, type HierarchyItem, type ResponsavelInfo } from '../shared';
import './JornadaListPage.css';

interface JornadaItem {
  id: string;
  codigo: string;
  nome: string;
  status: StatusType;
  dataCriacao: string;
  dataAtualizacao: string;
  dominio: { codigo: string; nome: string };
  responsavel: ResponsavelInfo;
}

interface JornadaListPageProps {
  onBack: () => void;
  onAddNew: () => void;
  onSelectJornada?: (jornada: JornadaItem) => void;
}

// Mock data seguindo o Figma
const mockJornadas: JornadaItem[] = [
  {
    id: '1',
    codigo: 'J001',
    nome: 'Processo de Seleção',
    status: 'desatualizado',
    dataCriacao: '01/08/2026',
    dataAtualizacao: '01/09/2026',
    dominio: { codigo: 'D001', nome: 'Gestão de Pessoas' },
    responsavel: {
      nome: 'Mariana Oliveira',
      cargo: 'Analista de RH',
      equipe: '(VPTECH) EQUIPE PÓS DESIGN E OPM'
    }
  },
  {
    id: '2',
    codigo: 'J002',
    nome: 'Onboarding de Funcionários',
    status: 'em_aprovacao',
    dataCriacao: '05/08/2026',
    dataAtualizacao: '15/09/2026',
    dominio: { codigo: 'D001', nome: 'Gestão de Pessoas' },
    responsavel: {
      nome: 'Carlos Santos',
      cargo: 'Coordenador de Treinamento',
      equipe: '(PTI) EQUIPE DE RECURSOS HUMANOS'
    }
  },
  {
    id: '3',
    codigo: 'J003',
    nome: 'Matrícula de Alunos',
    status: 'atualizado',
    dataCriacao: '05/01/2026',
    dataAtualizacao: '18/03/2026',
    dominio: { codigo: 'D002', nome: 'Operações Acadêmicas' },
    responsavel: {
      nome: 'Ana Costa',
      cargo: 'Gerente Acadêmico',
      equipe: '(VPCORP) EQUIPE CORPORATIVO'
    }
  },
  {
    id: '4',
    codigo: 'J004',
    nome: 'Atendimento ao Aluno',
    status: 'desatualizado',
    dataCriacao: '20/01/2026',
    dataAtualizacao: '22/03/2026',
    dominio: { codigo: 'D003', nome: 'Relacionamento com Aluno' },
    responsavel: {
      nome: 'Pedro Almeida',
      cargo: 'Coordenador de CX',
      equipe: '(VPTECH) EQUIPE GRADUAÇÃO'
    }
  },
  {
    id: '5',
    codigo: 'J005',
    nome: 'Gestão de Contratos',
    status: 'atualizado',
    dataCriacao: '10/02/2026',
    dataAtualizacao: '25/03/2026',
    dominio: { codigo: 'D004', nome: 'Finanças e Controladoria' },
    responsavel: {
      nome: 'Lucas Ferreira',
      cargo: 'Gerente Financeiro',
      equipe: '(VPTECH) EQUIPE INFRAESTRUTURA'
    }
  },
];

export function JornadaListPage({ onBack: _onBack, onAddNew, onSelectJornada }: JornadaListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra as jornadas
  const filteredJornadas = mockJornadas.filter(jornada => {
    const matchesSearch = jornada.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jornada.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || jornada.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredJornadas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJornadas = filteredJornadas.slice(startIndex, startIndex + itemsPerPage);

  // Métricas (simuladas - seguindo padrão do Figma)
  const totalJornadas = 2124;
  const atualizados = 2020;
  const desatualizados = 100;
  const emAprovacao = 4;

  // Converter jornada para hierarchy items
  const getHierarchy = (jornada: JornadaItem): HierarchyItem[] => [
    { type: 'dominio', codigo: jornada.dominio.codigo, nome: jornada.dominio.nome },
  ];

  return (
    <div className="jornada-list-page">
      {/* Header */}
      <header className="jornada-list-header">
        <div className="jornada-list-title-section">
          <span className="jornada-list-breadcrumb-label">Cadastros</span>
          <h1 className="jornada-list-title">Jornadas</h1>
        </div>
        <button className="jornada-list-add-btn" onClick={onAddNew}>
          <Plus size={20} />
          <span>Adicionar jornada</span>
        </button>
      </header>

      {/* Metric Cards */}
      <div className="jornada-list-metrics">
        <MetricCard label="Total de jornadas" value={totalJornadas} />
        <MetricCard label="Jornadas atualizadas" value={atualizados} />
        <MetricCard label="Jornadas desatualizadas" value={desatualizados} />
        <MetricCard label="Jornadas em aprovação" value={emAprovacao} />
      </div>

      {/* Search and Filter */}
      <div className="jornada-list-toolbar">
        <div className="jornada-list-search">
          <Search size={14} className="jornada-list-search-icon" />
          <input
            type="text"
            placeholder="Pesquisar nome ou código da jornada"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="jornada-list-search-input"
          />
        </div>
        <div className="jornada-list-filter-wrapper">
          <button
            className="jornada-list-filter-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <span>Filtrar</span>
            <Filter size={16} />
          </button>
          {showFilterDropdown && (
            <div className="jornada-list-filter-dropdown">
              <button
                className={`jornada-filter-option ${statusFilter === 'todos' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('todos'); setShowFilterDropdown(false); }}
              >
                Todos
              </button>
              <button
                className={`jornada-filter-option ${statusFilter === 'atualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('atualizado'); setShowFilterDropdown(false); }}
              >
                Atualizados
              </button>
              <button
                className={`jornada-filter-option ${statusFilter === 'desatualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('desatualizado'); setShowFilterDropdown(false); }}
              >
                Desatualizados
              </button>
              <button
                className={`jornada-filter-option ${statusFilter === 'em_aprovacao' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('em_aprovacao'); setShowFilterDropdown(false); }}
              >
                Em aprovação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List of Cards */}
      <div className="jornada-list-cards">
        {paginatedJornadas.map(jornada => (
          <ProcessCard
            key={jornada.id}
            codigo={jornada.codigo}
            nome={jornada.nome}
            status={jornada.status}
            dataCriacao={jornada.dataCriacao}
            dataAtualizacao={jornada.dataAtualizacao}
            hierarchy={getHierarchy(jornada)}
            responsavel={jornada.responsavel}
            onClick={() => onSelectJornada?.(jornada)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="jornada-list-pagination">
        <button
          className="jornada-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          className="jornada-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="jornada-pagination-pages">
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`jornada-pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="jornada-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        >
          <ChevronRight size={20} />
        </button>
        <button
          className="jornada-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
