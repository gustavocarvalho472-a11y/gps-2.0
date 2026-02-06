/**
 * GPS 2.0 - Sidebar Navigation
 * Menu lateral colapsável com seções expansíveis
 */

import { useState } from 'react';
import { Home, Building2, Link2, FolderPlus, Layers, GitBranch, Boxes, FileText, Settings, ChevronDown, ChevronRight, PanelLeftClose, PanelLeft } from 'lucide-react';
import type { PageType, ViewType } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  activePage: PageType;
  activeView: ViewType;
  onPageChange: (page: PageType) => void;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  hideCadeia?: boolean;
  hideCadastros?: boolean;
}

interface NavItem {
  id: PageType;
  label: string;
  view?: ViewType;
  icon: React.ReactNode;
  children?: NavItem[];
}

export function Sidebar({
  activePage,
  onPageChange,
  onViewChange,
  collapsed,
  onToggleCollapse,
  hideCadeia = false,
  hideCadastros = false,
}: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['cadastros']);

  const handleNavClick = (page: PageType, view?: ViewType) => {
    onPageChange(page);
    if (view) {
      onViewChange(view);
    }
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  // Check if a parent menu should be highlighted
  const isCadastrosActive = activePage.startsWith('cadastros-');

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={20} />,
    },
    {
      id: 'estrutura',
      label: 'Estrutura organizacional',
      icon: <Building2 size={20} />,
    },
    ...(!hideCadeia ? [{
      id: 'cadeia' as PageType,
      label: 'Cadeia de valor',
      icon: <Link2 size={20} />,
    }] : []),
  ];

  const cadastrosSubItems: NavItem[] = [
    {
      id: 'cadastros-dominios',
      label: 'Domínios',
      icon: <Layers size={18} />,
    },
    {
      id: 'cadastros-jornadas',
      label: 'Jornadas',
      icon: <GitBranch size={18} />,
    },
    {
      id: 'cadastros-macroprocessos',
      label: 'Macroprocessos',
      icon: <Boxes size={18} />,
    },
    {
      id: 'cadastros-processos',
      label: 'Processos',
      icon: <FileText size={18} />,
    },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
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
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* Main nav items */}
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

        {/* Cadastros expandable section */}
        {!hideCadastros && (
          <div className="sidebar-group">
            <button
              className={`sidebar-item sidebar-item-expandable ${isCadastrosActive ? 'active' : ''}`}
              onClick={() => !collapsed && toggleMenu('cadastros')}
              title={collapsed ? 'Cadastros' : undefined}
            >
              <span className="sidebar-icon">
                <FolderPlus size={20} />
              </span>
              <span className="sidebar-label">Cadastros</span>
              {!collapsed && (
                <span className="sidebar-expand-icon">
                  {isMenuExpanded('cadastros') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              )}
            </button>

            {!collapsed && isMenuExpanded('cadastros') && (
              <div className="sidebar-submenu">
                {cadastrosSubItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    className={`sidebar-subitem ${activePage === subItem.id || (subItem.id === 'cadastros-processos' && activePage === 'cadastros-processo-detalhe') ? 'active' : ''}`}
                    onClick={() => handleNavClick(subItem.id)}
                  >
                    <span className="sidebar-subitem-icon">{subItem.icon}</span>
                    <span className="sidebar-subitem-label">{subItem.label}</span>
                    <ChevronRight className="sidebar-subitem-chevron" size={14} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        <button
          className={`sidebar-item ${activePage === 'configuracoes' ? 'active' : ''}`}
          onClick={() => handleNavClick('configuracoes')}
          title={collapsed ? 'Configurações' : undefined}
        >
          <span className="sidebar-icon">
            <Settings size={20} />
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
