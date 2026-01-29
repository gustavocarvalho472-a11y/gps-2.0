/**
 * GPS 2.0 - Bottom Bar Component
 * Barra inferior com navegação e controles
 */

import './BottomBar.css';

interface BottomBarProps {
  currentView?: string;
  lastUpdated?: string;
}

export function BottomBar({ currentView = 'Arquitetura', lastUpdated = '28/01/26' }: BottomBarProps) {
  return (
    <footer className="bottom-bar">
      <div className="bottom-bar-left">
        <button className="bottom-btn back-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Voltar</span>
        </button>

        <div className="view-selector">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>{currentView}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="nav-arrows">
          <button className="nav-arrow-btn" title="Anterior">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="nav-arrow-btn" title="Próximo">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <button className="bottom-btn expand-btn" title="Expandir">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="bottom-bar-right">
        <span className="data-indicator">att</span>
        <span className="update-info">Dados atualizados em {lastUpdated}</span>
      </div>
    </footer>
  );
}
