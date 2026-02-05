/**
 * GPS 2.0 - Layout Principal
 * Layout com Sidebar (navegação) + FilterSidebar (filtros) + Conteúdo
 */

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { PageType, ViewType, FilterState } from '../../types';
import { Sidebar } from './Sidebar';
import { FilterSidebar } from './FilterSidebar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  activePage: PageType;
  activeView: ViewType;
  onPageChange: (page: PageType) => void;
  onViewChange: (view: ViewType) => void;
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  showFilters?: boolean;
}

export function Layout({
  children,
  activePage,
  activeView,
  onPageChange,
  onViewChange,
  filters,
  onFilterChange,
  showFilters = true,
}: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const filtersOpen = true;

  // Only show filters on arquitetura page when filters are provided
  const shouldShowFilters = showFilters && activePage === 'arquitetura' && filters && onFilterChange;

  return (
    <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        activePage={activePage}
        activeView={activeView}
        onPageChange={onPageChange}
        onViewChange={onViewChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="layout-content">
        <div className="layout-body">
          {shouldShowFilters && filters && onFilterChange && (
            <FilterSidebar
              isOpen={filtersOpen}
              filters={filters}
              onFilterChange={onFilterChange}
            />
          )}
          <main className={`layout-main ${!shouldShowFilters ? 'full-width' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
