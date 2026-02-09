/**
 * GPS 2.0 - Metrics Cards (Big Numbers)
 * Cards de métricas no estilo dashboard para visão analítica rápida
 */

import { Building2, Route, GitBranch, Boxes, FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './MetricsCards.css';

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  icon: 'bu' | 'dominio' | 'jornada' | 'macro' | 'processo';
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red';
}

interface MetricsCardsProps {
  metrics: MetricItem[];
  variant?: 'default' | 'compact';
}

const iconMap = {
  bu: Building2,
  dominio: Route,
  jornada: GitBranch,
  macro: Boxes,
  processo: FileText,
};

const colorMap = {
  bu: 'purple',
  dominio: 'blue',
  jornada: 'green',
  macro: 'orange',
  processo: 'red',
};

export function MetricsCards({ metrics, variant = 'default' }: MetricsCardsProps) {
  return (
    <div className={`metrics-cards metrics-cards--${variant}`}>
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon];
        const color = metric.color || colorMap[metric.icon];

        return (
          <div
            key={metric.id}
            className={`metric-card metric-card--${color}`}
          >
            <div className="metric-card-icon">
              <Icon size={24} />
            </div>
            <div className="metric-card-content">
              <span className="metric-card-value">
                {metric.value.toLocaleString('pt-BR')}
              </span>
              <span className="metric-card-label">{metric.label}</span>
            </div>
            {metric.trend && (
              <div className={`metric-card-trend metric-card-trend--${metric.trend.direction}`}>
                {metric.trend.direction === 'up' && <TrendingUp size={14} />}
                {metric.trend.direction === 'down' && <TrendingDown size={14} />}
                {metric.trend.direction === 'neutral' && <Minus size={14} />}
                <span>{metric.trend.value}%</span>
              </div>
            )}
          </div>
        );
      })}
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
