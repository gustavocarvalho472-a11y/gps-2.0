/**
 * GPS 2.0 - Home Dashboard View
 * Executive-grade organizational structure visualization
 */

import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { busPorCategoria, totaisGlobais } from '../../data/organizationData';
import type { BusinessUnit } from '../../types';
import './HomeView.css';

interface HomeViewProps {
  onSelectBU?: (bu: BusinessUnit) => void;
}

// Configuração por categoria
const categoriaConfig = {
  alianca: {
    label: 'Alianças',
    sublabel: 'Unidades de Negócio Educacionais',
    accent: '#7C3AED',
    accentLight: 'rgba(124, 58, 237, 0.08)',
  },
  plataforma: {
    label: 'Plataformas',
    sublabel: 'Áreas de Suporte ao Negócio',
    accent: '#0284C7',
    accentLight: 'rgba(2, 132, 199, 0.08)',
  },
  corporativo: {
    label: 'Corporativos',
    sublabel: 'Funções Corporativas',
    accent: '#059669',
    accentLight: 'rgba(5, 150, 105, 0.08)',
  },
};

function BUCard({ bu, onClick, index }: { bu: BusinessUnit; onClick: () => void; index: number }) {
  const config = categoriaConfig[bu.categoria];

  return (
    <article
      className="bu-card"
      onClick={onClick}
      style={{
        '--accent': config.accent,
        '--accent-light': config.accentLight,
        '--delay': `${index * 40}ms`
      } as React.CSSProperties}
    >
      <div className="bu-card-accent" />

      <div className="bu-card-body">
        {/* Top row: code + arrow */}
        <div className="bu-card-top">
          <span className="bu-card-code">{bu.codigo}</span>
          <ChevronRight className="bu-card-chevron" />
        </div>

        {/* Title */}
        <h3 className="bu-card-title">{bu.nome}</h3>

        {/* Stats row */}
        <div className="bu-card-stats">
          <div className="bu-card-stat bu-card-stat--main">
            <span className="bu-card-stat-value">{bu.totalProcessos}</span>
            <span className="bu-card-stat-label">processos</span>
          </div>
          <div className="bu-card-stat-divider" />
          <div className="bu-card-stat">
            <span className="bu-card-stat-value">{bu.totalDominios}</span>
            <span className="bu-card-stat-label">dom.</span>
          </div>
          <div className="bu-card-stat">
            <span className="bu-card-stat-value">{bu.totalJornadas}</span>
            <span className="bu-card-stat-label">jorn.</span>
          </div>
          <div className="bu-card-stat">
            <span className="bu-card-stat-value">{bu.totalMacroprocessos}</span>
            <span className="bu-card-stat-label">Macroprocessos</span>
          </div>
        </div>

        {/* Owner */}
        <div className="bu-card-owner">
          <Avatar className="bu-card-avatar">
            <AvatarImage src={bu.responsavel.foto} alt={bu.responsavel.nome} />
            <AvatarFallback>
              {bu.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="bu-card-owner-info">
            <span className="bu-card-owner-name">{bu.responsavel.nome}</span>
            <span className="bu-card-owner-role">{bu.responsavel.cargo || 'Diretor(a)'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function CategoriaSection({
  categoria,
  bus,
  onSelectBU,
}: {
  categoria: 'alianca' | 'plataforma' | 'corporativo';
  bus: BusinessUnit[];
  onSelectBU: (bu: BusinessUnit) => void;
}) {
  const config = categoriaConfig[categoria];

  return (
    <section className="categoria-section">
      <header className="categoria-header">
        <div
          className="categoria-dot"
          style={{ backgroundColor: config.accent }}
        />
        <div className="categoria-info">
          <h2 className="categoria-title">{config.label}</h2>
          <p className="categoria-subtitle">{config.sublabel}</p>
        </div>
        <span className="categoria-badge">{bus.length}</span>
      </header>

      <div className="categoria-grid">
        {bus.map((bu, index) => (
          <BUCard
            key={bu.id}
            bu={bu}
            onClick={() => onSelectBU(bu)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export function HomeView({ onSelectBU }: HomeViewProps) {
  const handleSelectBU = (bu: BusinessUnit) => {
    if (onSelectBU) {
      onSelectBU(bu);
    }
  };

  return (
    <div className="home-view">
      {/* Header */}
      <header className="home-header">
        <div className="home-header-left">
          <span className="home-badge">GPS 2.0</span>
          <h1 className="home-title">Estrutura Organizacional</h1>
          <p className="home-subtitle">
            Navegue pela arquitetura de processos da organização
          </p>
        </div>

        <div className="home-metrics">
          <div className="home-metric">
            <span className="home-metric-value">{totaisGlobais.totalBUs}</span>
            <span className="home-metric-label">Unidades</span>
          </div>
          <div className="home-metric">
            <span className="home-metric-value">{totaisGlobais.totalDominios}</span>
            <span className="home-metric-label">Domínios</span>
          </div>
          <div className="home-metric">
            <span className="home-metric-value">{totaisGlobais.totalJornadas}</span>
            <span className="home-metric-label">Jornadas</span>
          </div>
          <div className="home-metric home-metric--primary">
            <span className="home-metric-value">{totaisGlobais.totalProcessos.toLocaleString('pt-BR')}</span>
            <span className="home-metric-label">Processos</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="home-main">
        <CategoriaSection
          categoria="alianca"
          bus={busPorCategoria.aliancas}
          onSelectBU={handleSelectBU}
        />

        <CategoriaSection
          categoria="plataforma"
          bus={busPorCategoria.plataformas}
          onSelectBU={handleSelectBU}
        />

        <CategoriaSection
          categoria="corporativo"
          bus={busPorCategoria.corporativos}
          onSelectBU={handleSelectBU}
        />
      </main>
    </div>
  );
}
