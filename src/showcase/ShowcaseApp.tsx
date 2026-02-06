/**
 * GPS 2.0 - Showcase App
 * Aplicação com fluxo completo de navegação para exportação para Figma
 */

import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { BUDetailPage } from '../components/Dashboard/BUDetailPage';
import { DominioDetailPage } from '../components/Dashboard/DominioDetailPage';
import { JornadaDetailPage } from '../components/Dashboard/JornadaDetailPage';
import { MacroDetailPage } from '../components/Dashboard/MacroDetailPage';
import { businessUnits } from '../data/organizationData';
import type { Dominio, Jornada, Macroprocesso } from '../types';
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
        <p>Navegue pelas telas como no sistema real. Use a extensão <strong>html.to.design</strong> para converter para Figma.</p>
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

// Componente com toolbar de navegação
function ShowcaseToolbar({ title }: { title: string }) {
  return (
    <div className="showcase-page-toolbar">
      <Link to="/" className="showcase-back-link">← Índice</Link>
      <span className="showcase-page-title">{title}</span>
    </div>
  );
}

// ===== PÁGINAS COM NAVEGAÇÃO REAL =====

function BUDetailShowcase() {
  const navigate = useNavigate();

  const handleSelectDominio = (dominio: Dominio) => {
    // Navega para o domínio selecionado (por enquanto sempre vai para o primeiro)
    navigate('/dominio-detail');
    console.log('Navegando para domínio:', dominio.nome);
  };

  return (
    <div className="showcase-page">
      <ShowcaseToolbar title="BU Detail Page" />
      <ShowcaseWrapper>
        <BUDetailPage
          bu={mockBU}
          onBack={() => navigate('/')}
          onSelectDominio={handleSelectDominio}
        />
      </ShowcaseWrapper>
    </div>
  );
}

function DominioDetailShowcase() {
  const navigate = useNavigate();

  const handleSelectJornada = (jornada: Jornada) => {
    navigate('/jornada-detail');
    console.log('Navegando para jornada:', jornada.nome);
  };

  return (
    <div className="showcase-page">
      <ShowcaseToolbar title="Domínio Detail Page" />
      <ShowcaseWrapper>
        <DominioDetailPage
          bu={mockBU}
          dominio={mockDominio}
          onBack={() => navigate('/bu-detail')}
          onSelectJornada={handleSelectJornada}
        />
      </ShowcaseWrapper>
    </div>
  );
}

function JornadaDetailShowcase() {
  const navigate = useNavigate();

  const handleSelectMacro = (macro: Macroprocesso) => {
    navigate('/macro-detail');
    console.log('Navegando para macro:', macro.nome);
  };

  return (
    <div className="showcase-page">
      <ShowcaseToolbar title="Jornada Detail Page" />
      <ShowcaseWrapper>
        <JornadaDetailPage
          bu={mockBU}
          dominio={mockDominio}
          jornada={mockJornada}
          onBack={() => navigate('/dominio-detail')}
          onSelectMacro={handleSelectMacro}
        />
      </ShowcaseWrapper>
    </div>
  );
}

function MacroDetailShowcase() {
  const navigate = useNavigate();

  return (
    <div className="showcase-page">
      <ShowcaseToolbar title="Macroprocesso Detail Page" />
      <ShowcaseWrapper>
        <MacroDetailPage
          bu={mockBU}
          dominio={mockDominio}
          jornada={mockJornada}
          macro={mockMacro}
          onBack={() => navigate('/jornada-detail')}
          onSelectProcesso={(processo) => {
            console.log('Processo selecionado:', processo.nome);
            alert(`Processo: ${processo.nome}\n(Modal seria aberto aqui)`);
          }}
        />
      </ShowcaseWrapper>
    </div>
  );
}

export function ShowcaseApp() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ShowcaseIndex />} />
        <Route path="/bu-detail" element={<BUDetailShowcase />} />
        <Route path="/dominio-detail" element={<DominioDetailShowcase />} />
        <Route path="/jornada-detail" element={<JornadaDetailShowcase />} />
        <Route path="/macro-detail" element={<MacroDetailShowcase />} />
      </Routes>
    </HashRouter>
  );
}
