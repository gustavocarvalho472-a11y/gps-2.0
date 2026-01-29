/**
 * GPS 2.0 - Filter Bar Component
 */

import { useState } from 'react';
import { businessUnits, segmentos } from '../../data/mockData';
import './FilterBar.css';

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  { id: 'businessUnit', label: 'Business Unit', options: businessUnits },
  { id: 'segmento', label: 'Segmento', options: segmentos },
  { id: 'dominio', label: 'Domínio', options: ['Estratégico', 'Core', 'Plataforma', 'Corporativo'] },
];

export function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterSelect = (filterId: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
    setOpenDropdown(null);
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="filter-bar">
      <div className="filter-bar-left">
        <span className="filter-label">Filtros:</span>

        {filterOptions.map((filter) => (
          <div key={filter.id} className="filter-dropdown">
            <button
              className={`filter-button ${activeFilters[filter.id] ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === filter.id ? null : filter.id)}
            >
              <span>{activeFilters[filter.id] || filter.label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {openDropdown === filter.id && (
              <div className="filter-menu">
                {filter.options.map((option) => (
                  <button
                    key={option}
                    className={`filter-option ${activeFilters[filter.id] === option ? 'selected' : ''}`}
                    onClick={() => handleFilterSelect(filter.id, option)}
                  >
                    {option}
                    {activeFilters[filter.id] === option && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13.333 4L6 11.333 2.667 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="filter-more">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3.333v9.334M3.333 8h9.334"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Mais filtros
        </button>
      </div>

      {hasActiveFilters && (
        <div className="filter-bar-right">
          <div className="active-filters">
            {Object.entries(activeFilters).map(([key, value]) => (
              <span key={key} className="filter-chip">
                {value}
                <button onClick={() => removeFilter(key)} className="chip-remove">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M10.5 3.5l-7 7M3.5 3.5l7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <button className="clear-filters" onClick={clearAllFilters}>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
