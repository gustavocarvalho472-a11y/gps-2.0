/**
 * GPS 2.0 - Metric Cards Component
 */

import type { ArquiteturaData } from '../../types';
import './MetricCards.css';

interface MetricCardsProps {
  data: ArquiteturaData;
}

export function MetricCards({ data }: MetricCardsProps) {
  const metrics = [
    {
      id: 'processos',
      label: 'Processos',
      value: data.totalProcessos,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: 'primary',
      trend: '+12%',
      trendUp: true,
    },
    {
      id: 'jornadas',
      label: 'Jornadas',
      value: data.totalJornadas,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 10V3L4 14h7v7l9-11h-7z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: 'secondary',
      trend: '+3',
      trendUp: true,
    },
    {
      id: 'dominios',
      label: 'Domínios',
      value: data.dominios.length,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: 'success',
    },
    {
      id: 'mapeamento',
      label: 'Mapeado',
      value: '89%',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: 'warning',
      trend: '+5%',
      trendUp: true,
    },
  ];

  return (
    <div className="metric-cards">
      {metrics.map((metric) => (
        <div key={metric.id} className={`metric-card metric-${metric.color}`}>
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-content">
            <span className="metric-value">{metric.value}</span>
            <span className="metric-label">{metric.label}</span>
          </div>
          {metric.trend && (
            <div className={`metric-trend ${metric.trendUp ? 'up' : 'down'}`}>
              {metric.trendUp ? '↑' : '↓'} {metric.trend}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
