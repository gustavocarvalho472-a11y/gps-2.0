/**
 * GPS 2.0 - Main Application
 * Sistema de Gestão de Processos - Cogna
 */

import { useState } from 'react';
import type { PageType, ViewType, FilterState, Macroprocesso, BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, ProcessoDetalhado, Processo } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StructureView } from './components/Dashboard/StructureView';
import { BUDetailPage } from './components/Dashboard/BUDetailPage';
import { DominioDetailPage } from './components/Dashboard/DominioDetailPage';
import { JornadaDetailPage } from './components/Dashboard/JornadaDetailPage';
import { MacroDetailPage } from './components/Dashboard/MacroDetailPage';
import { CadeiaPage } from './components/Dashboard/CadeiaPage';
import { PlaceholderPage } from './components/PlaceholderPage';
import { ProcessoPage, ProcessoFormPage, ProcessoListPage, DominioFormPage, DominioListPage, JornadaFormPage, JornadaListPage, MacroprocessoFormPage, MacroprocessoListPage } from './components/Cadastros';

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
  const [selectedProcesso, setSelectedProcesso] = useState<ProcessoDetalhado | null>(null);

  // Drill-down state
  const [drillDown, setDrillDown] = useState<DrillDownState>({
    bu: null,
    dominio: null,
    jornada: null,
    macro: null,
  });

  // Cadastros sub-page state
  const [showDominioForm, setShowDominioForm] = useState(false);
  const [showJornadaForm, setShowJornadaForm] = useState(false);
  const [showMacroForm, setShowMacroForm] = useState(false);
  const [showProcessoForm, setShowProcessoForm] = useState(false);

  // Handler para mudança de página (reseta estados internos)
  const handlePageChange = (page: PageType) => {
    setShowDominioForm(false);
    setShowJornadaForm(false);
    setShowMacroForm(false);
    setShowProcessoForm(false);
    setActivePage(page);
  };

  // Handlers para navegação drill-down
  const handleSelectBU = (bu: BusinessUnit) => {
    setDrillDown({ bu, dominio: null, jornada: null, macro: null });
    setActivePage('bu-detail');
  };

  const handleSelectDominio = (dominio: DominioCompleto, bu?: BusinessUnit) => {
    setDrillDown(prev => ({
      bu: bu || prev.bu,
      dominio,
      jornada: null,
      macro: null
    }));
    setActivePage('dominio-detail');
  };

  const handleSelectJornada = (jornada: JornadaCompleta, bu?: BusinessUnit, dominio?: DominioCompleto) => {
    setDrillDown(prev => ({
      bu: bu || prev.bu,
      dominio: dominio || prev.dominio,
      jornada,
      macro: null
    }));
    setActivePage('jornada-detail');
  };

  const handleSelectMacro = (macro: MacroprocessoCompleto, bu?: BusinessUnit, dominio?: DominioCompleto, jornada?: JornadaCompleta) => {
    setDrillDown(prev => ({
      bu: bu || prev.bu,
      dominio: dominio || prev.dominio,
      jornada: jornada || prev.jornada,
      macro
    }));
    setActivePage('macro-detail');
  };

  const handleBackToStructure = () => {
    setDrillDown({ bu: null, dominio: null, jornada: null, macro: null });
    setActivePage('estrutura');
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

  // Handler para selecionar processo da tabela de macroprocesso ou painel lateral
  const handleSelectProcesso = (
    processo: Processo,
    bu?: BusinessUnit,
    dominio?: DominioCompleto,
    jornada?: JornadaCompleta,
    macro?: MacroprocessoCompleto
  ) => {
    // Usa os parâmetros passados ou fallback para o drill-down state
    const contextBU = bu || drillDown.bu;
    const contextDominio = dominio || drillDown.dominio;
    const contextJornada = jornada || drillDown.jornada;
    const contextMacro = macro || drillDown.macro;

    // Converte Processo para ProcessoDetalhado com dados do contexto
    const processoDetalhado: ProcessoDetalhado = {
      ...processo,
      dominio: contextDominio ? {
        id: contextDominio.id,
        codigo: contextDominio.codigo,
        nome: contextDominio.nome
      } : undefined,
      jornada: contextJornada ? {
        id: contextJornada.id,
        codigo: contextJornada.codigo,
        nome: contextJornada.nome
      } : undefined,
      macroprocesso: contextMacro ? {
        id: contextMacro.id,
        codigo: contextMacro.codigo,
        nome: contextMacro.nome
      } : undefined,
      bu: contextBU ? {
        id: contextBU.id,
        codigo: contextBU.codigo,
        nome: contextBU.nome
      } : undefined,
    };
    setSelectedProcesso(processoDetalhado);
    setActivePage('cadastros-processo-detalhe');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <PlaceholderPage
            title="Home"
            description="Página inicial em construção. Utilize a seção 'Estrutura Organizacional' no menu para navegar pela estrutura de processos."
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

      // Cadastros pages
      case 'cadastros-dominios':
        if (showDominioForm) {
          return (
            <DominioFormPage
              onBack={() => setShowDominioForm(false)}
            />
          );
        }
        return (
          <DominioListPage
            onBack={() => setActivePage('estrutura')}
            onAddNew={() => setShowDominioForm(true)}
          />
        );

      case 'cadastros-jornadas':
        if (showJornadaForm) {
          return (
            <JornadaFormPage
              onBack={() => setShowJornadaForm(false)}
            />
          );
        }
        return (
          <JornadaListPage
            onBack={() => setActivePage('estrutura')}
            onAddNew={() => setShowJornadaForm(true)}
          />
        );

      case 'cadastros-macroprocessos':
        if (showMacroForm) {
          return (
            <MacroprocessoFormPage
              onBack={() => setShowMacroForm(false)}
            />
          );
        }
        return (
          <MacroprocessoListPage
            onBack={() => setActivePage('estrutura')}
            onAddNew={() => setShowMacroForm(true)}
          />
        );

      case 'cadastros-processos':
        if (showProcessoForm) {
          return (
            <ProcessoFormPage
              onBack={() => setShowProcessoForm(false)}
            />
          );
        }
        return (
          <ProcessoListPage
            onBack={() => setActivePage('estrutura')}
            onAddNew={() => setShowProcessoForm(true)}
          />
        );

      case 'cadastros-processo-detalhe':
        return selectedProcesso ? (
          <ProcessoPage
            processo={selectedProcesso}
            onBack={() => {
              // Volta para macro-detail se veio de lá, senão vai para estrutura
              if (drillDown.macro) {
                setActivePage('macro-detail');
              } else {
                setActivePage('estrutura');
              }
            }}
          />
        ) : (
          <ProcessoFormPage
            onBack={() => setActivePage('estrutura')}
          />
        );

      case 'estrutura':
        return (
          <StructureView
            onSelectBU={handleSelectBU}
            onSelectDominio={handleSelectDominio}
            onSelectJornada={handleSelectJornada}
            onSelectMacro={handleSelectMacro}
            onSelectProcesso={handleSelectProcesso}
          />
        );

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
      hideCadeia={true}
      filters={filters}
      onFilterChange={setFilters}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
