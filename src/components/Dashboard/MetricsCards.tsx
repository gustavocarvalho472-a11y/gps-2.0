/**
 * GPS 2.0 - Metrics Cards (Big Numbers)
 * Cards de métricas no estilo Figma - cards brancos simples
 */

import './MetricsCards.css';

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  icon?: 'bu' | 'dominio' | 'jornada' | 'macro' | 'processo';
}

interface MetricsCardsProps {
  metrics: MetricItem[];
  variant?: 'default' | 'compact';
}

export function MetricsCards({ metrics, variant = 'default' }: MetricsCardsProps) {
  return (
    <div className={`metrics-cards metrics-cards--${variant}`}>
      {metrics.map((metric) => (
        <div key={metric.id} className="metric-card">
          <span className="metric-card-label">{metric.label}</span>
          <span className="metric-card-value">
            {metric.value.toLocaleString('pt-BR')}
          </span>
        </div>
      ))}
    </div>
  );
}

// Helper para criar métricas globais da estrutura organizacional
export function createGlobalMetrics(totais: {
  totalBUs: number;
  totalDominios: number;
  totalJornadas: number;
  totalMacroprocessos: number;
  totalProcessos: number;
}): MetricItem[] {
  return [
    {
      id: 'bus',
      label: 'Business Units',
      value: totais.totalBUs,
      icon: 'bu',
    },
    {
      id: 'dominios',
      label: 'Domínios',
      value: totais.totalDominios,
      icon: 'dominio',
    },
    {
      id: 'jornadas',
      label: 'Jornadas',
      value: totais.totalJornadas,
      icon: 'jornada',
    },
    {
      id: 'macros',
      label: 'Macroprocessos',
      value: totais.totalMacroprocessos,
      icon: 'macro',
    },
    {
      id: 'processos',
      label: 'Processos',
      value: totais.totalProcessos,
      icon: 'processo',
    },
  ];
}
