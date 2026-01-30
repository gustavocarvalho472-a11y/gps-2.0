/**
 * GPS 2.0 - Macroprocesso Detail Page
 * Mostra os processos de um Macroprocesso
 */

import { ArrowLeft, Boxes, FileText, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto } from '../../types';
import './DetailPage.css';

interface MacroDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  jornada: JornadaCompleta;
  macro: MacroprocessoCompleto;
  onBack: () => void;
}

export function MacroDetailPage({ bu, dominio, jornada, macro, onBack }: MacroDetailPageProps) {
  // Calcular estatísticas
  const processosAtivos = macro.processos.filter(p => p.status === 'ativo').length;
  const processosRevisao = macro.processos.filter(p => p.status === 'em_revisao').length;
  const automacaoMedia = macro.processos.length > 0
    ? Math.round(macro.processos.reduce((acc, p) => acc + (p.automatizacao || 0), 0) / macro.processos.length)
    : 0;

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
          <span className="detail-breadcrumb-current">{macro.nome}</span>
        </div>
      </nav>

      {/* Hero Card */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-main">
            <div className="detail-hero-icon">
              <Boxes />
            </div>
            <div className="detail-hero-text">
              <span className="detail-hero-code">{macro.codigo}</span>
              <h1 className="detail-hero-title">{macro.nome}</h1>
              <p className="detail-hero-subtitle">{bu.nome} / {dominio.nome} / {jornada.nome}</p>
            </div>
          </div>

          <div className="detail-hero-owner">
            <Avatar className="detail-hero-owner-avatar">
              <AvatarImage src={macro.responsavel.foto} alt={macro.responsavel.nome} />
              <AvatarFallback>
                {macro.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="detail-hero-owner-info">
              <span className="detail-hero-owner-label">Responsável</span>
              <span className="detail-hero-owner-name">{macro.responsavel.nome}</span>
              <span className="detail-hero-owner-role">{macro.responsavel.cargo}</span>
            </div>
          </div>
        </div>

        <div className="detail-hero-metrics">
          <div className="detail-hero-metric">
            <FileText />
            <span className="detail-hero-metric-value">{macro.totalProcessos}</span>
            <span className="detail-hero-metric-label">Processos</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <span className="detail-hero-metric-value" style={{ color: '#059669' }}>{processosAtivos}</span>
            <span className="detail-hero-metric-label">Ativos</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <span className="detail-hero-metric-value" style={{ color: '#D97706' }}>{processosRevisao}</span>
            <span className="detail-hero-metric-label">Revisão</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <span className="detail-hero-metric-value">{automacaoMedia}%</span>
            <span className="detail-hero-metric-label">Automação</span>
          </div>
        </div>
      </div>

      {/* Processos Table */}
      <section className="detail-section">
        <div className="detail-table-wrapper">
          <div className="detail-table-header">
            <div className="detail-section-header" style={{ margin: 0 }}>
              <FileText />
              <h2 className="detail-section-title">Processos</h2>
              <span className="detail-section-badge">{macro.processos.length}</span>
            </div>
          </div>

          <table className="detail-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Status</th>
                <th>Complexidade</th>
                <th>Automação</th>
                <th>FTE</th>
              </tr>
            </thead>
            <tbody>
              {macro.processos.map((processo) => (
                <tr key={processo.id}>
                  <td className="detail-table-code">{processo.codigo}</td>
                  <td className="detail-table-name">{processo.nome}</td>
                  <td>
                    <span className={`status-badge status-badge--${processo.status === 'em_revisao' ? 'revisao' : processo.status}`}>
                      {processo.status === 'ativo' ? 'Ativo' : processo.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <span className={`complexity complexity--${processo.complexidade}`}>
                      {processo.complexidade === 'alta' ? 'Alta' : processo.complexidade === 'media' ? 'Média' : 'Baixa'}
                    </span>
                  </td>
                  <td>
                    <div className="detail-progress">
                      <div className="detail-progress-bar">
                        <div
                          className="detail-progress-fill"
                          style={{ width: `${processo.automatizacao}%` }}
                        />
                      </div>
                      <span className="detail-progress-value">{processo.automatizacao}%</span>
                    </div>
                  </td>
                  <td className="detail-table-fte">{processo.fte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
