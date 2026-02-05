/**
 * GPS 2.0 - Metric Card Component
 * Componente de card de métricas baseado no design do Figma
 */

import './MetricCard.css';

interface MetricCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function MetricCard({ label, value, className = '' }: MetricCardProps) {
  const formattedValue = typeof value === 'number'
    ? value.toLocaleString('pt-BR')
    : value;

  return (
    <div className={`gps-metric-card ${className}`}>
      <span className="gps-metric-card-label">{label}</span>
      <span className="gps-metric-card-value">{formattedValue}</span>
    </div>
  );
}
