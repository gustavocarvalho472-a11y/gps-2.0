/**
 * GPS 2.0 - Showcase App
 * Aplicação para visualizar telas individuais para exportação para Figma
 */

import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { BUDetailPage } from '../components/Dashboard/BUDetailPage';
import { DominioDetailPage } from '../components/Dashboard/DominioDetailPage';
import { JornadaDetailPage } from '../components/Dashboard/JornadaDetailPage';
import { MacroDetailPage } from '../components/Dashboard/MacroDetailPage';
import { businessUnits } from '../data/organizationData';
import './Showcase.css';

// Mock data - pegar primeira BU com todos os níveis
const mockBU = businessUnits[0]; // Somos
const mockDominio = mockBU.dominios[0]; // Gestão Escolar
const mockJornada = mockDominio.jornadas[0]; // Matrícula
const mockMacro = mockJornada.macroprocessos[0]; // Captação

// Wrapper sem sidebar para showcase
function ShowcaseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="showcase-wrapper">
      {children}
    </div>
  );
}

// Página índice com links para todas as telas
function ShowcaseIndex() {
  const screens = [
    { path: '/bu-detail', name: 'BU Detail Page', description: 'Página de detalhe da Business Unit (Somos)' },
    { path: '/dominio-detail', name: 'Domínio Detail Page', description: 'Página de detalhe do Domínio (Gestão Escolar)' },
    { path: '/jornada-detail', name: 'Jornada Detail Page', description: 'Página de detalhe da Jornada (Matrícula)' },
    { path: '/macro-detail', name: 'Macroprocesso Detail Page', description: 'Página de detalhe do Macroprocesso (Captação)' },
  ];

  return (
    <div className="showcase-index">
      <header className="showcase-header">
        <h1>GPS 2.0 - Showcase de Telas</h1>
        <p>Clique em uma tela para visualizar. Use a extensão <strong>html.to.design</strong> para converter para Figma.</p>
      </header>

      <div className="showcase-grid">
        {screens.map((screen) => (
          <Link key={screen.path} to={screen.path} className="showcase-card">
            <h2>{screen.name}</h2>
            <p>{screen.description}</p>
            <span className="showcase-card-arrow">→</span>
          </Link>
        ))}
      </div>

      <footer className="showcase-footer">
        <p>Desenvolvido para Cogna Educação</p>
      </footer>
    </div>
  );
}

// Componente com botão de voltar
function ShowcasePage({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="showcase-page">
      <div className="showcase-page-toolbar">
        <Link to="/" className="showcase-back-link">← Voltar ao índice</Link>
        <span className="showcase-page-title">{title}</span>
      </div>
      <ShowcaseWrapper>
        {children}
      </ShowcaseWrapper>
    </div>
  );
}

export function ShowcaseApp() {
  // Dummy handlers que não fazem nada (apenas para visualização)
  const noop = () => {};

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ShowcaseIndex />} />

        <Route
          path="/bu-detail"
          element={
            <ShowcasePage title="BU Detail Page">
              <BUDetailPage
                bu={mockBU}
                onBack={noop}
                onSelectDominio={noop}
              />
            </ShowcasePage>
          }
        />

        <Route
          path="/dominio-detail"
          element={
            <ShowcasePage title="Domínio Detail Page">
              <DominioDetailPage
                bu={mockBU}
                dominio={mockDominio}
                onBack={noop}
                onSelectJornada={noop}
              />
            </ShowcasePage>
          }
        />

        <Route
          path="/jornada-detail"
          element={
            <ShowcasePage title="Jornada Detail Page">
              <JornadaDetailPage
                bu={mockBU}
                dominio={mockDominio}
                jornada={mockJornada}
                onBack={noop}
                onSelectMacro={noop}
              />
            </ShowcasePage>
          }
        />

        <Route
          path="/macro-detail"
          element={
            <ShowcasePage title="Macroprocesso Detail Page">
              <MacroDetailPage
                bu={mockBU}
                dominio={mockDominio}
                jornada={mockJornada}
                macro={mockMacro}
                onBack={noop}
                onSelectProcesso={noop}
              />
            </ShowcasePage>
          }
        />
      </Routes>
    </HashRouter>
  );
}
