/**
 * GPS 2.0 - Dashboard Principal
 */

import type { ViewType } from '../../types';
import { dominios } from '../../data/mockData';
import { ArquiteturaView } from './ArquiteturaView';
import { PlaceholderPage } from '../PlaceholderPage';
import { BottomBar } from './BottomBar';
import './Dashboard.css';

interface DashboardProps {
  activeView: ViewType;
}

export function Dashboard({ activeView }: DashboardProps) {
  const renderView = () => {
    switch (activeView) {
      case 'arquitetura':
        return <ArquiteturaView dominios={dominios} />;
      case 'arvore':
        return (
          <PlaceholderPage
            title="Árvore de Processos"
            description="Visualize a hierarquia completa dos processos organizacionais."
          />
        );
      case 'heatmap':
        return (
          <PlaceholderPage
            title="Heatmap"
            description="Analise métricas e indicadores através de mapas de calor interativos."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">{renderView()}</div>
      <BottomBar currentView={activeView === 'arquitetura' ? 'Arquitetura' : activeView === 'arvore' ? 'Árvore' : 'Heatmap'} />
    </div>
  );
}
