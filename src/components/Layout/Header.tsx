/**
 * GPS 2.0 - Header Component
 * Header com logo, tabs de navegação e toggle de filtros
 */

import type { ReactNode } from 'react';
import type { ViewType } from '../../types';
import './Header.css';

interface HeaderProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function Header({ activeView, onViewChange, showFilters, onToggleFilters }: HeaderProps) {
  const navItems: { id: ViewType; label: string; icon: ReactNode }[] = [
    {
      id: 'arquitetura',
      label: 'ARQUITETURA',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'arvore',
      label: 'ÁRVORE DE PROCESSOS',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v6M12 9l-6 6M12 9l6 6M6 15v4M18 15v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="3" r="2" fill="currentColor" />
          <circle cx="6" cy="19" r="2" fill="currentColor" />
          <circle cx="18" cy="19" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'heatmap',
      label: 'HEATMAP',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
          <rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="17" y="3" width="5" height="5" rx="1" fill="currentColor" opacity="0.9" />
          <rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.8" />
          <rect x="17" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.4" />
          <rect x="3" y="17" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="10" y="17" width="5" height="5" rx="1" fill="currentColor" opacity="0.2" />
          <rect x="17" y="17" width="5" height="5" rx="1" fill="currentColor" opacity="0.6" />
        </svg>
      ),
    },
  ];

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 5C11.716 5 5 11.716 5 20c0 8.284 6.716 15 15 15 3.866 0 7.39-1.462 10.056-3.865"
            stroke="var(--color-primary-40)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="28" cy="12" r="4" fill="var(--color-primary-40)" />
        </svg>
      </div>

      {/* Navigation Tabs */}
      <nav className="header-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-tab ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="nav-tab-icon">{item.icon}</span>
            <span className="nav-tab-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Right Section */}
      <div className="header-right">
        {/* Cogna Logo */}
        <div className="cogna-logo">
          <span className="cogna-text">cogna</span>
          <span className="cogna-subtitle">EDUCAÇÃO</span>
        </div>

        {/* Filters Toggle */}
        <button
          className={`filters-toggle ${showFilters ? 'active' : ''}`}
          onClick={onToggleFilters}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2.5 5h15M5 10h10M7.5 15h5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Filtros</span>
        </button>
      </div>
    </header>
  );
}
