/**
 * GPS 2.0 - Filter Sidebar
 * Sidebar esquerda com filtros colapsáveis
 */

import { useState } from 'react';
import type { FilterState } from '../../types';
import { businessUnits, segmentos, marcas, dominios } from '../../data/mockData';
import './FilterSidebar.css';

interface FilterSidebarProps {
  isOpen: boolean;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className={`filter-section ${isOpen ? 'open' : ''}`}>
      <button className="filter-section-header" onClick={onToggle}>
        <span className="filter-section-title">{title}</span>
        <svg
          className={`filter-section-icon ${isOpen ? 'open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && <div className="filter-section-content">{children}</div>}
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  return (
    <div className="filter-dropdown">
      <label className="filter-label">{label}</label>
      <div className="filter-select-wrapper">
        <select
          className="filter-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Todos</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg className="filter-select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function FilterSidebar({ isOpen, filters, onFilterChange }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    visaoNegocio: true,
    commonGround: true,
    lentesAnalise: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Get unique jornadas from dominios
  const jornadasOptions = dominios.flatMap((d) => {
    if (d.tipo === 'core' && d.propostasValor) {
      return d.propostasValor.flatMap((pv) => pv.jornadas.map((j) => j.nome));
    }
    return d.jornadas?.map((j) => j.nome) || [];
  });

  // Products and Modalidades (mock data for now)
  const produtos = ['Graduação', 'Pós-Graduação', 'Técnico', 'EJA', 'Extensão'];
  const modalidades = ['Presencial', 'EAD', 'Semipresencial', 'Híbrido'];
  const processos = ['Todos os processos', 'Atualizados', 'Desatualizados'];
  const aplicacoes = ['Sistema A', 'Sistema B', 'Portal', 'App Mobile'];

  if (!isOpen) return null;

  return (
    <aside className="filter-sidebar">
      <FilterSection
        title="Visão de Negócio"
        isOpen={openSections.visaoNegocio}
        onToggle={() => toggleSection('visaoNegocio')}
      >
        <FilterDropdown
          label="Business Unit"
          value={filters.businessUnit || ''}
          options={businessUnits}
          onChange={(v) => updateFilter('businessUnit', v)}
        />
        <FilterDropdown
          label="Seg. de Ensino"
          value={filters.segmento || ''}
          options={segmentos}
          onChange={(v) => updateFilter('segmento', v)}
        />
        <FilterDropdown
          label="Marca"
          value={filters.marca || ''}
          options={marcas}
          onChange={(v) => updateFilter('marca', v)}
        />
        <FilterDropdown
          label="Produto"
          value={filters.produto || ''}
          options={produtos}
          onChange={(v) => updateFilter('produto', v)}
        />
        <FilterDropdown
          label="Modalidade"
          value={filters.modalidade || ''}
          options={modalidades}
          onChange={(v) => updateFilter('modalidade', v)}
        />
      </FilterSection>

      <FilterSection
        title="Common Ground"
        isOpen={openSections.commonGround}
        onToggle={() => toggleSection('commonGround')}
      >
        <FilterDropdown
          label="Domínio"
          value={filters.dominio || ''}
          options={dominios.map((d) => d.nome)}
          onChange={(v) => updateFilter('dominio', v)}
        />
        <FilterDropdown
          label="Jornada"
          value={filters.jornada || ''}
          options={[...new Set(jornadasOptions)]}
          onChange={(v) => updateFilter('jornada', v)}
        />
      </FilterSection>

      <FilterSection
        title="Lentes de Análise"
        isOpen={openSections.lentesAnalise}
        onToggle={() => toggleSection('lentesAnalise')}
      >
        <FilterDropdown
          label="Processo"
          value={filters.processo || ''}
          options={processos}
          onChange={(v) => updateFilter('processo', v)}
        />
        <FilterDropdown
          label="Aplicação"
          value=""
          options={aplicacoes}
          onChange={() => {}}
        />
      </FilterSection>
    </aside>
  );
}
