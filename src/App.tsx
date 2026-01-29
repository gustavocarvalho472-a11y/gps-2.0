/**
 * GPS 2.0 - Main Application
 * Sistema de Gestão de Processos - Cogna
 */

import { useState } from 'react';
import type { PageType, ViewType, FilterState } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PlaceholderPage } from './components/PlaceholderPage';

const initialFilters: FilterState = {
  businessUnit: null,
  segmento: null,
  marca: null,
  produto: null,
  modalidade: null,
  dominio: null,
  jornada: null,
  processo: null,
};

function App() {
  const [activePage, setActivePage] = useState<PageType>('arquitetura');
  const [activeView, setActiveView] = useState<ViewType>('arquitetura');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <PlaceholderPage
            title="Home"
            description="Painel principal com visão geral do sistema de gestão de processos."
          />
        );
      case 'arquitetura':
      case 'arvore':
      case 'heatmap':
        return <Dashboard activeView={activeView} />;
      case 'configuracoes':
        return (
          <PlaceholderPage
            title="Configurações"
            description="Configurações do sistema, permissões e preferências de usuário."
          />
        );
      default:
        return <Dashboard activeView={activeView} />;
    }
  };

  return (
    <Layout
      activePage={activePage}
      activeView={activeView}
      onPageChange={setActivePage}
      onViewChange={setActiveView}
      filters={filters}
      onFilterChange={setFilters}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
