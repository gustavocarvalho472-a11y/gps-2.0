/**
 * GPS 2.0 - Domínio Detail Page
 * Mostra as jornadas de um Domínio
 */

import { ArrowLeft, Layers, GitBranch, FileText, ChevronRight, Boxes } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto, JornadaCompleta } from '../../types';
import './DetailPage.css';

interface DominioDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  onBack: () => void;
  onSelectJornada: (jornada: JornadaCompleta) => void;
}

function JornadaCard({
  jornada,
  onClick,
}: {
  jornada: JornadaCompleta;
  onClick: () => void;
}) {
  return (
    <article className="detail-card" onClick={onClick}>
      <div className="detail-card-accent" />
      <div className="detail-card-body">
        <div className="detail-card-top">
          <span className="detail-card-code">{jornada.codigo}</span>
          <ChevronRight className="detail-card-chevron" />
        </div>

        <h3 className="detail-card-title">{jornada.nome}</h3>

        <div className="detail-card-owner">
          <Avatar className="detail-card-avatar">
            <AvatarImage src={jornada.responsavel.foto} alt={jornada.responsavel.nome} />
            <AvatarFallback>
              {jornada.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="detail-card-owner-info">
            <span className="detail-card-owner-name">{jornada.responsavel.nome}</span>
            <span className="detail-card-owner-role">{jornada.responsavel.cargo}</span>
          </div>
        </div>

        <div className="detail-card-stats">
          <div className="detail-card-stat">
            <span className="detail-card-stat-value">{jornada.totalMacroprocessos}</span>
            <span className="detail-card-stat-label">Macroprocessos</span>
          </div>
          <div className="detail-card-stat">
            <span className="detail-card-stat-value">{jornada.totalProcessos}</span>
            <span className="detail-card-stat-label">Processos</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function DominioDetailPage({ bu, dominio, onBack, onSelectJornada }: DominioDetailPageProps) {
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
          <span>{bu.nome}</span>
          <ChevronRight />
          <span className="detail-breadcrumb-current">{dominio.nome}</span>
        </div>
      </nav>

      {/* Hero Card */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-main">
            <div className="detail-hero-icon">
              <Layers />
            </div>
            <div className="detail-hero-text">
              <span className="detail-hero-type">Domínio</span>
              <h1 className="detail-hero-title">{dominio.nome}</h1>
              <p className="detail-hero-subtitle">{bu.nome} · {dominio.codigo}</p>
            </div>
          </div>

          <div className="detail-hero-owner">
            <Avatar className="detail-hero-owner-avatar">
              <AvatarImage src={dominio.responsavel.foto} alt={dominio.responsavel.nome} />
              <AvatarFallback>
                {dominio.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="detail-hero-owner-info">
              <span className="detail-hero-owner-label">Responsável</span>
              <span className="detail-hero-owner-name">{dominio.responsavel.nome}</span>
              <span className="detail-hero-owner-role">{dominio.responsavel.cargo}</span>
            </div>
          </div>
        </div>

        <div className="detail-hero-metrics">
          <div className="detail-hero-metric">
            <GitBranch />
            <span className="detail-hero-metric-value">{dominio.totalJornadas}</span>
            <span className="detail-hero-metric-label">Jornadas</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <Boxes />
            <span className="detail-hero-metric-value">{dominio.totalMacroprocessos}</span>
            <span className="detail-hero-metric-label">Macroprocessos</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <FileText />
            <span className="detail-hero-metric-value">{dominio.totalProcessos}</span>
            <span className="detail-hero-metric-label">Processos</span>
          </div>
        </div>
      </div>

      {/* Jornadas Section */}
      <section className="detail-section">
        <header className="detail-section-header">
          <GitBranch />
          <h2 className="detail-section-title">Jornadas</h2>
          <span className="detail-section-badge">{dominio.jornadas.length}</span>
        </header>

        {dominio.jornadas.length > 0 ? (
          <div className="detail-grid">
            {dominio.jornadas.map((jornada) => (
              <JornadaCard
                key={jornada.id}
                jornada={jornada}
                onClick={() => onSelectJornada(jornada)}
              />
            ))}
          </div>
        ) : (
          <div className="detail-empty">
            <GitBranch className="detail-empty-icon" />
            <h3 className="detail-empty-title">Nenhuma jornada cadastrada</h3>
            <p className="detail-empty-desc">
              Este domínio ainda não possui jornadas vinculadas.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
