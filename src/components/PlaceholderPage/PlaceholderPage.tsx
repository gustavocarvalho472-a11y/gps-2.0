/**
 * GPS 2.0 - Placeholder Page
 * Página de "Em Construção" para funcionalidades não implementadas
 */

import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function PlaceholderPage({ title, description, actionLabel, onAction }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-content">
        <div className="placeholder-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17l10 5 10-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="placeholder-title">{title}</h1>
        {description && <p className="placeholder-description">{description}</p>}
        {actionLabel && onAction && (
          <button className="placeholder-action" onClick={onAction}>
            {actionLabel}
          </button>
        )}
        <div className="placeholder-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Em Construção</span>
        </div>
      </div>
    </div>
  );
}
