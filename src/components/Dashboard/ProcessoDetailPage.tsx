/**
 * GPS 2.0 - Processo Detail Page
 * Mostra os detalhes de um Processo individual
 */

import { ArrowLeft, FileText, ChevronRight, Users, BarChart3, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../../types';
import './DetailPage.css';

interface ProcessoDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  jornada: JornadaCompleta;
  macro: MacroprocessoCompleto;
  processo: Processo;
  onBack: () => void;
}

export function ProcessoDetailPage({ bu, dominio, jornada, macro, processo, onBack }: ProcessoDetailPageProps) {
  // Helper para determinar se processo está atualizado
  const isAtualizado = processo.status === 'ativo';

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo': return 'Atualizado';
      case 'em_revisao': return 'Desatualizado';
      case 'inativo': return 'Desatualizado';
      default: return status;
    }
  };

  const getComplexidadeLabel = (complexidade?: string) => {
    switch (complexidade) {
      case 'alta': return 'Alta';
      case 'media': return 'Média';
      case 'baixa': return 'Baixa';
      default: return 'N/A';
    }
  };

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
          <span>{jornada.nome}</span>
          <ChevronRight />
          <span>{macro.nome}</span>
          <ChevronRight />
          <span className="detail-breadcrumb-current">{processo.nome}</span>
        </div>
      </nav>

      {/* Hero Card */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-main">
            <div className="detail-hero-icon">
              <FileText />
            </div>
            <div className="detail-hero-text">
              <span className="detail-hero-type">Processo</span>
              <h1 className="detail-hero-title">{processo.nome}</h1>
              <p className="detail-hero-subtitle">
                {bu.nome} · {dominio.nome} · {jornada.nome} · {macro.nome} · {processo.codigo}
              </p>
            </div>
          </div>

          {processo.responsavel && (
            <div className="detail-hero-owner">
              <Avatar className="detail-hero-owner-avatar">
                <AvatarImage src={processo.responsavel.foto} alt={processo.responsavel.nome} />
                <AvatarFallback>
                  {processo.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="detail-hero-owner-info">
                <span className="detail-hero-owner-label">Responsável</span>
                <span className="detail-hero-owner-name">{processo.responsavel.nome}</span>
                <span className="detail-hero-owner-role">{processo.responsavel.cargo}</span>
              </div>
            </div>
          )}
        </div>

        <div className="detail-hero-metrics">
          <div className="detail-hero-metric">
            {isAtualizado ? <CheckCircle2 style={{ color: '#059669' }} /> : <AlertCircle style={{ color: '#DC2626' }} />}
            <span className={`update-tag update-tag--${isAtualizado ? 'atualizado' : 'desatualizado'}`}>
              {isAtualizado ? 'Atualizado' : 'Desatualizado'}
            </span>
            <span className="detail-hero-metric-label">Atualização</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <Users />
            <span className={`detail-hero-metric-value status-color--${processo.status === 'em_revisao' ? 'revisao' : processo.status}`}>
              {getStatusLabel(processo.status)}
            </span>
            <span className="detail-hero-metric-label">Status</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <BarChart3 />
            <span className={`detail-hero-metric-value complexity-color--${processo.complexidade}`}>
              {getComplexidadeLabel(processo.complexidade)}
            </span>
            <span className="detail-hero-metric-label">Complexidade</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <Clock />
            <span className="detail-hero-metric-value">{processo.fte ?? 'N/A'}</span>
            <span className="detail-hero-metric-label">FTE</span>
          </div>
        </div>
      </div>

      {/* Informações Detalhadas */}
      <section className="detail-section">
        <div className="detail-info-grid">
          {/* Card de Analytics */}
          <div className="detail-info-card">
            <h3 className="detail-info-card-title">Nível Analítico</h3>
            <div className="detail-info-progress">
              <div className="detail-info-progress-bar">
                <div
                  className="detail-info-progress-fill detail-info-progress-fill--analytics"
                  style={{ width: `${processo.analitico ?? 0}%` }}
                />
              </div>
              <span className="detail-info-progress-value">{processo.analitico ?? 0}%</span>
            </div>
            <p className="detail-info-card-desc">
              {(processo.analitico ?? 0) >= 70
                ? 'Este processo possui alto nível de análise de dados.'
                : (processo.analitico ?? 0) >= 40
                ? 'Este processo possui nível moderado de análise.'
                : 'Este processo possui baixo nível de análise de dados.'}
            </p>
          </div>
        </div>
      </section>

      {/* Descrição */}
      {processo.descricao && (
        <section className="detail-section">
          <header className="detail-section-header">
            <FileText />
            <h2 className="detail-section-title">Descrição</h2>
          </header>
          <div className="detail-description-card">
            <p>{processo.descricao}</p>
          </div>
        </section>
      )}
    </div>
  );
}
