/**
 * GPS 2.0 - Macroprocesso Detail Page
 * Mostra os processos de um Macroprocesso
 */

import { ArrowLeft, Boxes, FileText, ChevronRight, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BusinessUnit, DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../../types';
import './DetailPage.css';

interface MacroDetailPageProps {
  bu: BusinessUnit;
  dominio: DominioCompleto;
  jornada: JornadaCompleta;
  macro: MacroprocessoCompleto;
  onBack: () => void;
  onSelectProcesso?: (processo: Processo) => void;
}

export function MacroDetailPage({ bu, dominio, jornada, macro, onBack, onSelectProcesso }: MacroDetailPageProps) {
  // Calcular estatísticas
  const processosAtualizados = macro.processos.filter(p => p.status === 'ativo').length;
  const processosDesatualizados = macro.processos.filter(p => p.status !== 'ativo').length;

  // Helper para determinar se processo está atualizado
  const isAtualizado = (status: string) => status === 'ativo';

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
              <span className="detail-hero-type">Macroprocesso</span>
              <h1 className="detail-hero-title">{macro.nome}</h1>
              <p className="detail-hero-subtitle">{bu.nome} · {dominio.nome} · {jornada.nome} · {macro.codigo}</p>
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
            <CheckCircle2 style={{ color: '#059669' }} />
            <span className="detail-hero-metric-value" style={{ color: '#059669' }}>{processosAtualizados}</span>
            <span className="detail-hero-metric-label">Atualizados</span>
          </div>
          <div className="detail-hero-metric-divider" />
          <div className="detail-hero-metric">
            <AlertCircle style={{ color: '#DC2626' }} />
            <span className="detail-hero-metric-value" style={{ color: '#DC2626' }}>{processosDesatualizados}</span>
            <span className="detail-hero-metric-label">Desatualizados</span>
          </div>
        </div>
      </div>

      {/* Processos Table */}
      <section className="detail-section">
        <header className="detail-section-header">
          <FileText />
          <h2 className="detail-section-title">Processos</h2>
          <span className="detail-section-badge">{macro.processos.length}</span>
        </header>

        {macro.processos.length > 0 ? (
          <div className="detail-table-wrapper">
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Atualização</th>
                  <th>Status</th>
                  <th>Complexidade</th>
                  <th>FTE</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {macro.processos.map((processo) => (
                  <tr key={processo.id}>
                    <td className="detail-table-code">{processo.codigo}</td>
                    <td className="detail-table-name">{processo.nome}</td>
                    <td>
                      <span className={`update-tag update-tag--${isAtualizado(processo.status) ? 'atualizado' : 'desatualizado'}`}>
                        {isAtualizado(processo.status) ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                        {isAtualizado(processo.status) ? 'Atualizado' : 'Desatualizado'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge status-badge--${processo.status === 'em_revisao' ? 'revisao' : processo.status}`}>
                        {processo.status === 'ativo' ? 'Atualizado' : processo.status === 'em_revisao' ? 'Desatualizado' : 'Desatualizado'}
                      </span>
                    </td>
                    <td>
                      <span className={`complexity complexity--${processo.complexidade}`}>
                        {processo.complexidade === 'alta' ? 'Alta' : processo.complexidade === 'media' ? 'Média' : 'Baixa'}
                      </span>
                    </td>
                    <td className="detail-table-fte">{processo.fte}</td>
                    <td className="detail-table-actions">
                      <button
                        className="detail-table-action-btn"
                        onClick={() => onSelectProcesso?.(processo)}
                        title="Ver detalhes do processo"
                      >
                        <Eye size={16} />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="detail-empty">
            <FileText className="detail-empty-icon" />
            <h3 className="detail-empty-title">Nenhum processo cadastrado</h3>
            <p className="detail-empty-desc">
              Este macroprocesso ainda não possui processos vinculados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
