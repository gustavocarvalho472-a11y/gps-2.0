/**
 * GPS 2.0 - Domínio List Page (Cadastros)
 * Página de listagem de domínios seguindo design do Figma
 */

import { useState } from 'react';
import {
  ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight,
  Search, Filter, Plus
} from 'lucide-react';
import { MetricCard, ProcessCard, type StatusType, type ResponsavelInfo } from '../shared';
import './DominioListPage.css';

interface DominioItem {
  id: string;
  codigo: string;
  nome: string;
  status: StatusType;
  dataCriacao: string;
  dataAtualizacao: string;
  responsavel: ResponsavelInfo;
}

interface DominioListPageProps {
  onBack: () => void;
  onAddNew: () => void;
  onSelectDominio?: (dominio: DominioItem) => void;
}

// Mock data seguindo o Figma
const mockDominios: DominioItem[] = [
  {
    id: '1',
    codigo: 'D001',
    nome: 'Gestão de Pessoas',
    status: 'desatualizado',
    dataCriacao: '01/08/2026',
    dataAtualizacao: '01/09/2026',
    responsavel: {
      nome: 'Mariana Oliveira',
      cargo: 'Gerente de RH',
      equipe: '(VPTECH) EQUIPE PÓS DESIGN E OPM'
    }
  },
  {
    id: '2',
    codigo: 'D002',
    nome: 'Operações Acadêmicas',
    status: 'em_aprovacao',
    dataCriacao: '05/08/2026',
    dataAtualizacao: '15/09/2026',
    responsavel: {
      nome: 'Carlos Santos',
      cargo: 'Diretor Acadêmico',
      equipe: '(PTI) EQUIPE DE RECURSOS HUMANOS'
    }
  },
  {
    id: '3',
    codigo: 'D003',
    nome: 'Relacionamento com Aluno',
    status: 'atualizado',
    dataCriacao: '05/01/2026',
    dataAtualizacao: '18/03/2026',
    responsavel: {
      nome: 'Ana Costa',
      cargo: 'Gerente de CX',
      equipe: '(VPCORP) EQUIPE CORPORATIVO'
    }
  },
  {
    id: '4',
    codigo: 'D004',
    nome: 'Finanças e Controladoria',
    status: 'desatualizado',
    dataCriacao: '20/01/2026',
    dataAtualizacao: '22/03/2026',
    responsavel: {
      nome: 'Pedro Almeida',
      cargo: 'Controller',
      equipe: '(VPTECH) EQUIPE GRADUAÇÃO'
    }
  },
  {
    id: '5',
    codigo: 'D005',
    nome: 'Tecnologia da Informação',
    status: 'atualizado',
    dataCriacao: '10/02/2026',
    dataAtualizacao: '25/03/2026',
    responsavel: {
      nome: 'Lucas Ferreira',
      cargo: 'CTO',
      equipe: '(VPTECH) EQUIPE INFRAESTRUTURA'
    }
  },
];

export function DominioListPage({ onBack: _onBack, onAddNew, onSelectDominio }: DominioListPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtra os domínios
  const filteredDominios = mockDominios.filter(dominio => {
    const matchesSearch = dominio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dominio.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || dominio.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredDominios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDominios = filteredDominios.slice(startIndex, startIndex + itemsPerPage);

  // Métricas (simuladas - seguindo padrão do Figma)
  const totalDominios = 2124;
  const atualizados = 2020;
  const desatualizados = 100;
  const emAprovacao = 4;

  return (
    <div className="dominio-list-page">
      {/* Header */}
      <header className="dominio-list-header">
        <div className="dominio-list-title-section">
          <span className="dominio-list-breadcrumb-label">Cadastros</span>
          <h1 className="dominio-list-title">Domínios</h1>
        </div>
        <button className="dominio-list-add-btn" onClick={onAddNew}>
          <Plus size={20} />
          <span>Adicionar domínio</span>
        </button>
      </header>

      {/* Metric Cards */}
      <div className="dominio-list-metrics">
        <MetricCard label="Total de domínios" value={totalDominios} />
        <MetricCard label="Domínios atualizados" value={atualizados} />
        <MetricCard label="Domínios desatualizados" value={desatualizados} />
        <MetricCard label="Domínios em aprovação" value={emAprovacao} />
      </div>

      {/* Search and Filter */}
      <div className="dominio-list-toolbar">
        <div className="dominio-list-search">
          <Search size={14} className="dominio-list-search-icon" />
          <input
            type="text"
            placeholder="Pesquisar nome ou código do domínio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dominio-list-search-input"
          />
        </div>
        <div className="dominio-list-filter-wrapper">
          <button
            className="dominio-list-filter-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <span>Filtrar</span>
            <Filter size={16} />
          </button>
          {showFilterDropdown && (
            <div className="dominio-list-filter-dropdown">
              <button
                className={`dominio-filter-option ${statusFilter === 'todos' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('todos'); setShowFilterDropdown(false); }}
              >
                Todos
              </button>
              <button
                className={`dominio-filter-option ${statusFilter === 'atualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('atualizado'); setShowFilterDropdown(false); }}
              >
                Atualizados
              </button>
              <button
                className={`dominio-filter-option ${statusFilter === 'desatualizado' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('desatualizado'); setShowFilterDropdown(false); }}
              >
                Desatualizados
              </button>
              <button
                className={`dominio-filter-option ${statusFilter === 'em_aprovacao' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('em_aprovacao'); setShowFilterDropdown(false); }}
              >
                Em aprovação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List of Cards */}
      <div className="dominio-list-cards">
        {paginatedDominios.map(dominio => (
          <ProcessCard
            key={dominio.id}
            codigo={dominio.codigo}
            nome={dominio.nome}
            status={dominio.status}
            dataCriacao={dominio.dataCriacao}
            dataAtualizacao={dominio.dataAtualizacao}
            responsavel={dominio.responsavel}
            onClick={() => onSelectDominio?.(dominio)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="dominio-list-pagination">
        <button
          className="dominio-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          className="dominio-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="dominio-pagination-pages">
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`dominio-pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="dominio-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        >
          <ChevronRight size={20} />
        </button>
        <button
          className="dominio-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
