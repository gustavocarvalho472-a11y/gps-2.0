/**
 * GPS 2.0 - Jornada Detail Page
 * Mostra os macroprocessos de uma Jornada
 */

import { ArrowLeft, GitBranch, FileText, ChevronRight, Boxes } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto } from '../../types';
import './DetailPage.css';

interface JornadaDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  jornada: JornadaCompleta;
  onBack: () => void;
  onSelectMacro: (macro: MacroprocessoCompleto) => void;
}

function MacroCard({
  macro,
  onClick,
}: {
  macro: MacroprocessoCompleto;
  onClick: () => void;
}) {
  return (
    <article className="detail-card" onClick={onClick}>
      <div className="detail-card-accent" />
      <div className="detail-card-body">
        <div className="detail-card-top">
          <span className="detail-card-code">{macro.codigo}</span>
          <ChevronRight className="detail-card-chevron" />
        </div>

        <h3 className="detail-card-title">{macro.nome}</h3>

        <div className="detail-card-owner">
          <Avatar className="detail-card-avatar">
            <AvatarImage src={macro.responsavel.foto} alt={macro.responsavel.nome} />
            <AvatarFallback>
              {macro.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="detail-card-owner-info">
            <span className="detail-card-owner-name">{macro.responsavel.nome}</span>
            <span className="detail-card-owner-role">{macro.responsavel.cargo}</span>
          </div>
        </div>

        <div className="detail-card-stats">
          <div className="detail-card-stat">
            <span className="detail-card-stat-value">{macro.totalProcessos}</span>
            <span className="detail-card-stat-label">Processos</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function JornadaDetailPage({ bu, dominio, jornada, onBack, onSelectMacro }: JornadaDetailPageProps) {
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
          <span>{dominio.nome}</span>
          <ChevronRight />
          <span className="detail-breadcrumb-current">{jornada.nome}</span>
        </div>
      </nav>

      {/* Hero Card */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-main">
            <div className="detail-hero-icon">
              <GitBranch />
            </div>
            <div className="detail-hero-text">
              <span className="detail-hero-type">Jornada</span>
              <h1 className="detail-hero-title">{jornada.nome}</h1>
              <p className="detail-hero-subtitle">{bu.nome} · {dominio.nome} · {jornada.codigo}</p>
            </div>
          </div>

          <div className="detail-hero-owner">
            <Avatar className="detail-hero-owner-avatar">
              <AvatarImage src={jornada.responsavel.foto} alt={jornada.responsavel.nome} />
              <AvatarFallback>
                {jornada.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="detail-hero-owner-info">
              <span className="detail-hero-owner-label">Responsável</span>
              <span className="detail-hero-owner-name">{jornada.responsavel.nome}</span>
              <span className="detail-hero-owner-role">{jornada.responsavel.cargo}</span>
            </div>
          </div>
        </div>

        <div className="detail-hero-metrics">
          <div className="detail-hero-metric">
            <Boxes />
            <span className="detail-hero-metric-value">{jornada.totalMacroprocessos}</span>
            <span className="detail-hero-metric-label">Macroprocessos</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <FileText />
            <span className="detail-hero-metric-value">{jornada.totalProcessos}</span>
            <span className="detail-hero-metric-label">Processos</span>
          </div>
        </div>
      </div>

      {/* Macroprocessos Section */}
      <section className="detail-section">
        <header className="detail-section-header">
          <Boxes />
          <h2 className="detail-section-title">Macroprocessos</h2>
          <span className="detail-section-badge">{jornada.macroprocessos.length}</span>
        </header>

        {jornada.macroprocessos.length > 0 ? (
          <div className="detail-grid">
            {jornada.macroprocessos.map((macro) => (
              <MacroCard
                key={macro.id}
                macro={macro}
                onClick={() => onSelectMacro(macro)}
              />
            ))}
          </div>
        ) : (
          <div className="detail-empty">
            <Boxes className="detail-empty-icon" />
            <h3 className="detail-empty-title">Nenhum macroprocesso cadastrado</h3>
            <p className="detail-empty-desc">
              Esta jornada ainda não possui macroprocessos vinculados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
