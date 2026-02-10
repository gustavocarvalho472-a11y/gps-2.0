/**
 * GPS 2.0 - Showcase App
 * Versão do app para exportação para Figma (sem Cadastros e Cadeia de Valor)
 */

import { useState } from 'react';
import type { PageType, ViewType, FilterState, BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../types';
import { Layout } from '../components/Layout';
import { StructureView } from '../components/Dashboard/StructureView';
import { BUDetailPage } from '../components/Dashboard/BUDetailPage';
import { DominioDetailPage } from '../components/Dashboard/DominioDetailPage';
import { JornadaDetailPage } from '../components/Dashboard/JornadaDetailPage';
import { MacroDetailPage } from '../components/Dashboard/MacroDetailPage';
import { ProcessoPage } from '../components/Cadastros/ProcessoPage';
import { PlaceholderPage } from '../components/PlaceholderPage';

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

interface DrillDownState {
  bu: BusinessUnit | null;
  dominio: DominioCompleto | null;
  jornada: JornadaCompleta | null;
  macro: MacroprocessoCompleto | null;
  processo: Processo | null;
}

export function ShowcaseApp() {
  const [activePage, setActivePage] = useState<PageType>('estrutura');
  const [activeView, setActiveView] = useState<ViewType>('arquitetura');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const [drillDown, setDrillDown] = useState<DrillDownState>({
    bu: null,
    dominio: null,
    jornada: null,
    macro: null,
    processo: null,
  });

  const handlePageChange = (page: PageType) => {
    setActivePage(page);
  };

  const handleSelectBU = (bu: BusinessUnit) => {
    setDrillDown({ bu, dominio: null, jornada: null, macro: null, processo: null });
    setActivePage('bu-detail');
  };

  const handleSelectDominio = (dominio: DominioCompleto, bu?: BusinessUnit) => {
    setDrillDown(prev => ({
      bu: bu || prev.bu,
      dominio,
      jornada: null,
      macro: null,
      processo: null
    }));
    setActivePage('dominio-detail');
  };

  const handleSelectJornada = (jornada: JornadaCompleta, bu?: BusinessUnit, dominio?: DominioCompleto) => {
    setDrillDown(prev => ({
      bu: bu || prev.bu,
      dominio: dominio || prev.dominio,
      jornada,
      macro: null,
      processo: null
    }));
    setActivePage('jornada-detail');
  };

  const handleSelectMacro = (macro: MacroprocessoCompleto, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta) => {
    setDrillDown(prev => ({
      bu: bu || prev.bu,
      dominio: dominio || prev.dominio,
      jornada: jornada || prev.jornada,
      macro,
      processo: null
    }));
    setActivePage('macro-detail');
  };

  const handleBackToStructure = () => {
    setDrillDown({ bu: null, dominio: null, jornada: null, macro: null, processo: null });
    setActivePage('estrutura');
  };

  const handleBackToBU = () => {
    setDrillDown(prev => ({ ...prev, dominio: null, jornada: null, macro: null, processo: null }));
    setActivePage('bu-detail');
  };

  const handleBackToDominio = () => {
    setDrillDown(prev => ({ ...prev, jornada: null, macro: null, processo: null }));
    setActivePage('dominio-detail');
  };

  const handleBackToJornada = () => {
    setDrillDown(prev => ({ ...prev, macro: null, processo: null }));
    setActivePage('jornada-detail');
  };

  const handleBackToMacro = () => {
    setDrillDown(prev => ({ ...prev, processo: null }));
    setActivePage('macro-detail');
  };

  const handleSelectProcesso = (processo: Processo) => {
    setDrillDown(prev => ({ ...prev, processo }));
    setActivePage('processo-detail');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <PlaceholderPage
            title="Home"
            description="Página inicial em construção."
          />
        );

      case 'bu-detail':
        return drillDown.bu ? (
          <BUDetailPage
            bu={drillDown.bu}
            onBack={handleBackToStructure}
            onSelectDominio={handleSelectDominio}
          />
        ) : (
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
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
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
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
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
        );

      case 'macro-detail':
        return drillDown.bu && drillDown.dominio && drillDown.jornada && drillDown.macro ? (
          <MacroDetailPage
            bu={drillDown.bu}
            dominio={drillDown.dominio}
            jornada={drillDown.jornada}
            macro={drillDown.macro}
            onBack={handleBackToJornada}
            onSelectProcesso={handleSelectProcesso}
          />
        ) : (
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
        );

      case 'processo-detail':
        return drillDown.processo ? (
          <ProcessoPage
            processo={drillDown.processo}
            onBack={handleBackToMacro}
          />
        ) : (
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
        );

      case 'configuracoes':
        return (
          <PlaceholderPage
            title="Configurações"
            description="Configurações do sistema."
          />
        );

      case 'estrutura':
      default:
        return (
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
        );
    }
  };

  return (
    <Layout
      activePage={activePage}
      activeView={activeView}
      onPageChange={handlePageChange}
      onViewChange={setActiveView}
      filters={filters}
      onFilterChange={setFilters}
      hideCadeia={true}
      hideCadastros={true}
    >
      {renderContent()}
    </Layout>
  );
}
