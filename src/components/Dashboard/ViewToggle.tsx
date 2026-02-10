/**
 * GPS 2.0 - Layout Switcher Component
 * Componente avançado para alternar entre visualizações
 */

import { LayoutGrid, List, Network } from 'lucide-react';
import './ViewToggle.css';

export type ViewMode = 'cards' | 'tabela' | 'organograma';

interface ViewToggleProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  showOrganograma?: boolean;
  totalItems?: number;
}

interface ViewOption {
  id: ViewMode;
  label: string;
  icon: React.ReactNode;
}

const viewOptions: ViewOption[] = [
  {
    id: 'cards',
    label: 'Cards',
    icon: <LayoutGrid size={16} />
  },
  {
    id: 'tabela',
    label: 'Lista',
    icon: <List size={16} />
  },
  {
    id: 'organograma',
    label: 'Hierarquia',
    icon: <Network size={16} />
  },
];

export function ViewToggle({
  activeView,
  onViewChange,
  showOrganograma = false,
  totalItems: _totalItems
}: ViewToggleProps) {
  const options = showOrganograma
    ? viewOptions
    : viewOptions.filter(opt => opt.id !== 'organograma');

  return (
    <div className="layout-switcher">
      <span className="layout-switcher-label">Visualização</span>

      <div className="layout-switcher-options" role="tablist">
        {options.map((option) => {
          const isActive = activeView === option.id;

          return (
            <button
              key={option.id}
              role="tab"
              aria-selected={isActive}
              className={`layout-switcher-option ${isActive ? 'layout-switcher-option--active' : ''}`}
              onClick={() => onViewChange(option.id)}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
