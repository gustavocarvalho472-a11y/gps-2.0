/**
 * GPS 2.0 - Sidebar Navigation
 * Menu lateral colapsável estilo Teams
 */

import type { PageType, ViewType } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  activePage: PageType;
  activeView: ViewType;
  onPageChange: (page: PageType) => void;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: PageType;
  label: string;
  view?: ViewType;
  icon: React.ReactNode;
}

export function Sidebar({
  activePage,
  onPageChange,
  onViewChange,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const handleNavClick = (page: PageType, view?: ViewType) => {
    onPageChange(page);
    if (view) {
      onViewChange(view);
    }
  };

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'arquitetura',
      label: 'Arquitetura de Negócios',
      view: 'arquitetura',
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
      label: 'Árvore de Processos',
      view: 'arvore',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v6M12 9l-6 6M12 9l6 6M6 15v4M18 15v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="3" r="2" fill="currentColor" />
          <circle cx="6" cy="19" r="2" fill="currentColor" />
          <circle cx="18" cy="19" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'heatmap',
      label: 'Heatmap',
      view: 'heatmap',
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
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 5C11.716 5 5 11.716 5 20c0 8.284 6.716 15 15 15 3.866 0 7.39-1.462 10.056-3.865"
              stroke="var(--color-primary-40)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="28" cy="12" r="4" fill="var(--color-primary-40)" />
          </svg>
          <span className="sidebar-logo-text">GPS 2.0</span>
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id, item.view)}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <button
          className={`sidebar-item ${activePage === 'configuracoes' ? 'active' : ''}`}
          onClick={() => handleNavClick('configuracoes')}
          title={collapsed ? 'Configurações' : undefined}
        >
          <span className="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="sidebar-label">Configurações</span>
        </button>

        {/* Cogna Logo */}
        <div className="sidebar-footer">
          <span className="cogna-text">cogna</span>
          <span className="cogna-subtitle">EDUCAÇÃO</span>
        </div>
      </div>
    </aside>
  );
}
