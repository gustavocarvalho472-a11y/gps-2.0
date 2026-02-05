/**
 * GPS 2.0 - BU Detail Page
 * Mostra os domínios de uma Business Unit
 */

import { ArrowLeft, Building2, Layers, GitBranch, FileText, ChevronRight, Boxes } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto } from '../../types';
import './DetailPage.css';

interface BUDetailPageProps {
  bu: BusinessUnit;
  onBack: () => void;
  onSelectDominio: (dominio: DominioCompleto) => void;
}

function DominioCard({
  dominio,
  onClick,
}: {
  dominio: DominioCompleto;
  onClick: () => void;
}) {
  return (
    <article className="detail-card" onClick={onClick}>
      <div className="detail-card-accent" />
      <div className="detail-card-body">
        <div className="detail-card-top">
          <span className="detail-card-code">{dominio.codigo}</span>
          <ChevronRight className="detail-card-chevron" />
        </div>

        <h3 className="detail-card-title">{dominio.nome}</h3>

        <div className="detail-card-owner">
          <Avatar className="detail-card-avatar">
            <AvatarImage src={dominio.responsavel.foto} alt={dominio.responsavel.nome} />
            <AvatarFallback>
              {dominio.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="detail-card-owner-info">
            <span className="detail-card-owner-name">{dominio.responsavel.nome}</span>
            <span className="detail-card-owner-role">{dominio.responsavel.cargo}</span>
          </div>
        </div>

        <div className="detail-card-stats">
          <div className="detail-card-stat">
            <span className="detail-card-stat-value">{dominio.totalJornadas}</span>
            <span className="detail-card-stat-label">Jornadas</span>
          </div>
          <div className="detail-card-stat">
            <span className="detail-card-stat-value">{dominio.totalMacroprocessos}</span>
            <span className="detail-card-stat-label">Macroprocessos</span>
          </div>
          <div className="detail-card-stat">
            <span className="detail-card-stat-value">{dominio.totalProcessos}</span>
            <span className="detail-card-stat-label">Processos</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BUDetailPage({ bu, onBack, onSelectDominio }: BUDetailPageProps) {
  return (
    <div className="detail-page">
      {/* Navigation */}
      <nav className="detail-nav">
        <button className="detail-back" onClick={onBack}>
          <ArrowLeft />
          Voltar
        </button>
        <div className="detail-breadcrumb">
          <span>Estrutura</span>
          <ChevronRight />
          <span className="detail-breadcrumb-current">{bu.nome}</span>
        </div>
      </nav>

      {/* Hero Card */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-main">
            <div className="detail-hero-icon" style={{ background: bu.cor + '15' }}>
              <Building2 style={{ color: bu.cor }} />
            </div>
            <div className="detail-hero-text">
              <span className="detail-hero-type">Business Unit</span>
              <h1 className="detail-hero-title">{bu.nome}</h1>
              <span className="detail-hero-code">{bu.codigo}</span>
            </div>
          </div>

          <div className="detail-hero-owner">
            <Avatar className="detail-hero-owner-avatar">
              <AvatarImage src={bu.responsavel.foto} alt={bu.responsavel.nome} />
              <AvatarFallback>
                {bu.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="detail-hero-owner-info">
              <span className="detail-hero-owner-label">Responsável</span>
              <span className="detail-hero-owner-name">{bu.responsavel.nome}</span>
              <span className="detail-hero-owner-role">{bu.responsavel.cargo}</span>
            </div>
          </div>
        </div>

        <div className="detail-hero-metrics">
          <div className="detail-hero-metric">
            <Layers />
            <span className="detail-hero-metric-value">{bu.totalDominios}</span>
            <span className="detail-hero-metric-label">Domínios</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <GitBranch />
            <span className="detail-hero-metric-value">{bu.totalJornadas}</span>
            <span className="detail-hero-metric-label">Jornadas</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <Boxes />
            <span className="detail-hero-metric-value">{bu.totalMacroprocessos}</span>
            <span className="detail-hero-metric-label">Macroprocessos</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <FileText />
            <span className="detail-hero-metric-value">{bu.totalProcessos}</span>
            <span className="detail-hero-metric-label">Processos</span>
          </div>
        </div>
      </div>

      {/* Domínios Section */}
      <section className="detail-section">
        <header className="detail-section-header">
          <Layers />
          <h2 className="detail-section-title">Domínios</h2>
          <span className="detail-section-badge">{bu.dominios.length}</span>
        </header>

        {bu.dominios.length > 0 ? (
          <div className="detail-grid">
            {bu.dominios.map((dominio) => (
              <DominioCard
                key={dominio.id}
                dominio={dominio}
                onClick={() => onSelectDominio(dominio)}
              />
            ))}
          </div>
        ) : (
          <div className="detail-empty">
            <Layers className="detail-empty-icon" />
            <h3 className="detail-empty-title">Nenhum domínio cadastrado</h3>
            <p className="detail-empty-desc">
              Esta Business Unit ainda não possui domínios vinculados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
