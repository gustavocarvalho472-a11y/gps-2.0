/**
 * GPS 2.0 - Main Application
 * Sistema de Gestão de Processos - Cogna
 */

import { useState } from 'react';
import type { PageType, ViewType, FilterState, Macroprocesso, BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { HomeView } from './components/Dashboard/HomeView';
import { BUDetailPage } from './components/Dashboard/BUDetailPage';
import { DominioDetailPage } from './components/Dashboard/DominioDetailPage';
import { JornadaDetailPage } from './components/Dashboard/JornadaDetailPage';
import { MacroDetailPage } from './components/Dashboard/MacroDetailPage';
import { CadeiaPage } from './components/Dashboard/CadeiaPage';
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

// Drill-down navigation state
interface DrillDownState {
  bu: BusinessUnit | null;
  dominio: DominioCompleto | null;
  jornada: JornadaCompleta | null;
  macro: MacroprocessoCompleto | null;
}

function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [activeView, setActiveView] = useState<ViewType>('arquitetura');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedMacro, setSelectedMacro] = useState<Macroprocesso | null>(null);

  // Drill-down state
  const [drillDown, setDrillDown] = useState<DrillDownState>({
    bu: null,
    dominio: null,
    jornada: null,
    macro: null,
  });

  // Handlers para navegação drill-down
  const handleSelectBU = (bu: BusinessUnit) => {
    setDrillDown({ bu, dominio: null, jornada: null, macro: null });
    setActivePage('bu-detail');
  };

  const handleSelectDominio = (dominio: DominioCompleto) => {
    setDrillDown(prev => ({ ...prev, dominio, jornada: null, macro: null }));
    setActivePage('dominio-detail');
  };

  const handleSelectJornada = (jornada: JornadaCompleta) => {
    setDrillDown(prev => ({ ...prev, jornada, macro: null }));
    setActivePage('jornada-detail');
  };

  const handleSelectMacro = (macro: MacroprocessoCompleto) => {
    setDrillDown(prev => ({ ...prev, macro }));
    setActivePage('macro-detail');
  };

  const handleBackToHome = () => {
    setDrillDown({ bu: null, dominio: null, jornada: null, macro: null });
    setActivePage('home');
  };

  const handleBackToBU = () => {
    setDrillDown(prev => ({ ...prev, dominio: null, jornada: null, macro: null }));
    setActivePage('bu-detail');
  };

  const handleBackToDominio = () => {
    setDrillDown(prev => ({ ...prev, jornada: null, macro: null }));
    setActivePage('dominio-detail');
  };

  const handleBackToJornada = () => {
    setDrillDown(prev => ({ ...prev, macro: null }));
    setActivePage('jornada-detail');
  };

  // Legacy handlers
  const handleOpenCadeia = (macro: Macroprocesso) => {
    setSelectedMacro(macro);
    setActivePage('cadeia');
  };

  const handleBackFromCadeia = () => {
    setActivePage('arquitetura');
    setSelectedMacro(null);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomeView onSelectBU={handleSelectBU} />;

      case 'bu-detail':
        return drillDown.bu ? (
          <BUDetailPage
            bu={drillDown.bu}
            onBack={handleBackToHome}
            onSelectDominio={handleSelectDominio}
          />
        ) : (
          <HomeView onSelectBU={handleSelectBU} />
        );

      case 'dominio-detail':
        return drillDown.bu && drillDown.dominio ? (
          <DominioDetailPage
            bu={drillDown.bu}
            dominio={drillDown.dominio}
            onBack={handleBackToBU}
            onSelectJornada={handleSelectJornada}
          />
        ) : (
          <HomeView onSelectBU={handleSelectBU} />
        );

      case 'jornada-detail':
        return drillDown.bu && drillDown.dominio && drillDown.jornada ? (
          <JornadaDetailPage
            bu={drillDown.bu}
            dominio={drillDown.dominio}
            jornada={drillDown.jornada}
            onBack={handleBackToDominio}
            onSelectMacro={handleSelectMacro}
          />
        ) : (
          <HomeView onSelectBU={handleSelectBU} />
        );

      case 'macro-detail':
        return drillDown.bu && drillDown.dominio && drillDown.jornada && drillDown.macro ? (
          <MacroDetailPage
            bu={drillDown.bu}
            dominio={drillDown.dominio}
            jornada={drillDown.jornada}
            macro={drillDown.macro}
            onBack={handleBackToJornada}
          />
        ) : (
          <HomeView onSelectBU={handleSelectBU} />
        );

      case 'cadeia':
        return selectedMacro ? (
          <CadeiaPage macroprocesso={selectedMacro} onBack={handleBackFromCadeia} />
        ) : (
          <Dashboard activeView={activeView} onOpenCadeia={handleOpenCadeia} />
        );

      case 'arquitetura':
      case 'arvore':
      case 'heatmap':
        return <Dashboard activeView={activeView} onOpenCadeia={handleOpenCadeia} />;

      case 'configuracoes':
        return (
          <PlaceholderPage
            title="Configurações"
            description="Configurações do sistema, permissões e preferências de usuário."
          />
        );

      default:
        return <HomeView onSelectBU={handleSelectBU} />;
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
