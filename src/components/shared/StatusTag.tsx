/**
 * GPS 2.0 - Status Tag Component
 * Componente de tag de status baseado no design do Figma
 */

import './StatusTag.css';

export type StatusType = 'atualizado' | 'desatualizado' | 'em_aprovacao' | 'critico';

interface StatusTagProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md';
}

const defaultLabels: Record<StatusType, string> = {
  atualizado: 'Atualizado',
  desatualizado: 'Desatualizado',
  em_aprovacao: 'Em aprovação',
  critico: 'Crítico',
};

export function StatusTag({ status, label, size = 'md' }: StatusTagProps) {
  const displayLabel = label || defaultLabels[status];

  return (
    <span className={`status-tag status-tag--${status} status-tag--${size}`}>
      {displayLabel}
    </span>
  );
}
