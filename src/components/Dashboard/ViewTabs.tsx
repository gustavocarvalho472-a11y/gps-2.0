/**
 * GPS 2.0 - View Tabs Component
 */

import type { ViewType } from '../../types';
import type { ReactNode } from 'react';
import './ViewTabs.css';

interface ViewTabsProps {
  activeView: ViewType;
  onChangeView: (view: ViewType) => void;
}

const tabs: { id: ViewType; label: string; icon: ReactNode }[] = [
  {
    id: 'arquitetura',
    label: 'Arquitetura',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'arvore',
    label: 'Árvore de Processos',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2v6M10 8l-5 4M10 8l5 4M5 12v4M15 12v4M5 16H3M5 16h2M15 16h-2M15 16h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="2" r="1" fill="currentColor" />
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'heatmap',
    label: 'Heatmap',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.3" />
        <rect x="8" y="2" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="14" y="2" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.9" />
        <rect x="2" y="8" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
        <rect x="8" y="8" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.8" />
        <rect x="14" y="8" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.4" />
        <rect x="2" y="14" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.7" />
        <rect x="8" y="14" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.2" />
        <rect x="14" y="14" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
];

export function ViewTabs({ activeView, onChangeView }: ViewTabsProps) {
  return (
    <div className="view-tabs">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeView === tab.id ? 'active' : ''}`}
            onClick={() => onChangeView(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
