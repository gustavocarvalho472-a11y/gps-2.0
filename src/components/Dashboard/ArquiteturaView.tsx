/**
 * GPS 2.0 - Arquitetura View
 * Layout clean estilo shadcn/ui com CSS customizado
 */

import { useState } from 'react';
import type { Dominio, Jornada, Macroprocesso, Processo } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import './ArquiteturaView.css';

interface ArquiteturaViewProps {
  dominios: Dominio[];
  onOpenCadeia?: (macro: Macroprocesso) => void;
}

export function ArquiteturaView({ dominios, onOpenCadeia }: ArquiteturaViewProps) {
  const coreDominio = dominios.find((d) => d.tipo === 'core');

  // Todas as Propostas de Valor do domínio Core
  const allPVs = coreDominio?.propostasValor || [];

  const jornadasCore = coreDominio?.propostasValor?.flatMap((pv) =>
    pv.jornadas.map((j) => ({
      ...j,
      pvs: [{ id: pv.id, codigo: pv.codigo, nome: pv.nome, cor: pv.cor }],
    }))
  ) || [];

  const jornadasAgrupadas = jornadasCore.reduce((acc, jornada) => {
    const existing = acc.find((j) => j.codigo === jornada.codigo);
    if (existing) {
      jornada.pvs.forEach((pv) => {
        if (!existing.pvs.some((p) => p.id === pv.id)) {
          existing.pvs.push(pv);
        }
      });
    } else {
      acc.push({ ...jornada });
    }
    return acc;
  }, [] as (Jornada & { pvs: { id: string; codigo: string; nome: string; cor: string }[] })[]);

  const selectedJornada = jornadasAgrupadas[0];
  const totalMacroprocessos = selectedJornada?.macroprocessos?.length || 0;
  const totalProcessos = selectedJornada?.macroprocessos?.reduce(
    (acc, mp) => acc + mp.processos.length, 0
  ) || 0;

  const [selectedMacro, setSelectedMacro] = useState<Macroprocesso | null>(null);
  const [selectedProcesso, setSelectedProcesso] = useState<Processo | null>(null);

  const handleMacroClick = (macro: Macroprocesso) => {
    if (selectedMacro?.id === macro.id) {
      setSelectedMacro(null);
      setSelectedProcesso(null);
    } else {
      setSelectedMacro(macro);
      setSelectedProcesso(null);
    }
  };

  const handleProcessoClick = (processo: Processo) => {
    if (selectedProcesso?.id === processo.id) {
      setSelectedProcesso(null);
    } else {
      setSelectedProcesso(processo);
    }
  };

  if (!selectedJornada) {
    return (
      <div className="arquitetura-view" style={{ alignItems: 'center', justifyContent: 'center', height: 256 }}>
        Nenhuma jornada encontrada
      </div>
    );
  }

  return (
    <div className="arquitetura-view">
      {/* Header do Domínio */}
      <div className="dominio-header">
        <div className="dominio-header-left">
          <span className="dominio-label">Domínio</span>
          <span className="dominio-name">{coreDominio?.nome || 'Experiência (Plataforma)'}</span>
        </div>
        <div className="dominio-badges">
          <Badge variant="secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '6px 14px' }}>
            {jornadasAgrupadas.length} jornadas
          </Badge>
          <Badge variant="secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '6px 14px' }}>
            {totalMacroprocessos} macroprocessos
          </Badge>
          <Badge variant="secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '6px 14px' }}>
            {totalProcessos} processos
          </Badge>
        </div>
      </div>

      {/* Propostas de Valor */}
      <div className="pv-section">
        <div className="pv-section-header">
          <span className="pv-section-label">Propostas de Valor</span>
          <span className="pv-section-subtitle">Core Business</span>
        </div>
        <div className="pv-grid">
          {allPVs.map((pv) => (
            <div
              key={pv.id}
              className="pv-card"
              style={{ borderLeftColor: pv.cor }}
            >
              <div className="pv-card-header">
                <span className="pv-code" style={{ color: pv.cor }}>{pv.codigo}</span>
                <span className="pv-jornadas-count">{pv.jornadas.length} jornadas</span>
              </div>
              <p className="pv-nome">{pv.nome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Jornada Selecionada */}
      <div className="jornada-card">
        <div className="jornada-header">
          <div className="jornada-info">
            <span className="jornada-label">Jornada Selecionada</span>
            <div className="jornada-title">
              <span className="jornada-code">{selectedJornada.codigo}</span>
              <h2 className="jornada-nome">{selectedJornada.nome}</h2>
            </div>
          </div>
          <div className="jornada-meta">
            <div className="jornada-dono">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt={selectedJornada.dono}
                className="dono-avatar"
              />
              <div className="dono-info">
                <span className="dono-label">Dono da Jornada</span>
                <span className="dono-name">{selectedJornada.dono}</span>
                <span className="dono-cargo">Gerente de Operações</span>
                <span className="dono-area">Área: Operações Financeiras</span>
              </div>
            </div>
          </div>
        </div>
        <div className="jornada-stats">
          <div className="stat-item">
            <span className="stat-value">{selectedJornada.macroprocessos?.length || 0}</span>
            <span className="stat-label">Macroprocessos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{totalProcessos}</span>
            <span className="stat-label">Processos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{selectedJornada.totalProcessos}</span>
            <span className="stat-label">Total Mapeados</span>
          </div>
        </div>
      </div>

      {/* Macroprocessos */}
      <div className="macros-section">
        <div className="section-header">
          <div className="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Macroprocessos</span>
          </div>
          <Badge variant="secondary" style={{ padding: '4px 10px' }}>
            {selectedJornada.macroprocessos?.length || 0} itens
          </Badge>
        </div>
        <div className="macros-grid">
          {selectedJornada.macroprocessos?.map((macro) => {
            const isSelected = selectedMacro?.id === macro.id;
            return (
              <div
                key={macro.id}
                className={cn('macro-card', isSelected && 'selected')}
              >
                <button
                  onClick={() => handleMacroClick(macro)}
                  className="macro-card-content"
                >
                  <div className="macro-header">
                    <Badge variant="secondary" style={{ fontFamily: 'var(--font-family-mono, monospace)', fontWeight: 600, color: 'var(--primary)', padding: '4px 10px' }}>
                      {macro.codigo}
                    </Badge>
                    <span className="macro-count">{macro.processos.length} proc.</span>
                  </div>
                  <span className="macro-nome">{macro.nome}</span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="macro-chain-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCadeia?.(macro);
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Visualização detalhada
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Processos - Drill Down */}
      {selectedMacro && (
        <div className="processos-section">
          <div className="section-header">
            <div className="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Processos</span>
            </div>
            <Badge variant="default" style={{ padding: '4px 12px' }}>
              {selectedMacro.codigo} - {selectedMacro.nome}
            </Badge>
          </div>

          <table className="processos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome do Processo</th>
                <th>Status</th>
                <th>Automação</th>
                <th>Complexidade</th>
                <th>FTE</th>
              </tr>
            </thead>
            <tbody>
              {selectedMacro.processos.map((processo) => {
                const isSelected = selectedProcesso?.id === processo.id;
                return (
                  <tr
                    key={processo.id}
                    onClick={() => handleProcessoClick(processo)}
                    className={isSelected ? 'selected' : ''}
                  >
                    <td>{processo.codigo}</td>
                    <td style={{ fontWeight: 500 }}>{processo.nome}</td>
                    <td>
                      <Badge
                        variant="outline"
                        style={{
                          fontSize: 11,
                          padding: '4px 10px',
                          backgroundColor: processo.status === 'ativo' ? 'var(--status-ativo-bg)' : processo.status === 'em_revisao' ? 'var(--status-revisao-bg)' : 'var(--status-inativo-bg)',
                          color: processo.status === 'ativo' ? 'var(--status-ativo-text)' : processo.status === 'em_revisao' ? 'var(--status-revisao-text)' : 'var(--status-inativo-text)',
                          borderColor: processo.status === 'ativo' ? 'var(--status-ativo-border)' : processo.status === 'em_revisao' ? 'var(--status-revisao-border)' : 'var(--status-inativo-border)'
                        }}
                      >
                        {processo.status === 'ativo' ? 'Ativo' : processo.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
                      </Badge>
                    </td>
                    <td>
                      <div className="automacao-cell">
                        <Progress value={processo.automatizacao} className="h-1.5 w-16" />
                        <span className="automacao-value">{processo.automatizacao}%</span>
                      </div>
                    </td>
                    <td className={`complexidade-${processo.complexidade}`} style={{ fontWeight: 500 }}>
                      {processo.complexidade === 'alta' ? 'Alta' : processo.complexidade === 'media' ? 'Média' : 'Baixa'}
                    </td>
                    <td>{processo.fte}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Detalhes do Processo */}
          {selectedProcesso && (
            <div className="processo-detail">
              <div className="processo-detail-header">
                <h4>{selectedProcesso.codigo} - {selectedProcesso.nome}</h4>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProcesso(null);
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Button>
              </div>
              <div className="processo-detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <Badge
                    variant="outline"
                    style={{
                      padding: '4px 10px',
                      backgroundColor: selectedProcesso.status === 'ativo' ? 'var(--status-ativo-bg)' : selectedProcesso.status === 'em_revisao' ? 'var(--status-revisao-bg)' : 'var(--status-inativo-bg)',
                      color: selectedProcesso.status === 'ativo' ? 'var(--status-ativo-text)' : selectedProcesso.status === 'em_revisao' ? 'var(--status-revisao-text)' : 'var(--status-inativo-text)',
                      borderColor: selectedProcesso.status === 'ativo' ? 'var(--status-ativo-border)' : selectedProcesso.status === 'em_revisao' ? 'var(--status-revisao-border)' : 'var(--status-inativo-border)'
                    }}
                  >
                    {selectedProcesso.status === 'ativo' ? 'Ativo' : selectedProcesso.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
                  </Badge>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Automação</span>
                  <span className="detail-value">{selectedProcesso.automatizacao}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Complexidade</span>
                  <span className={cn('detail-value', `complexidade-${selectedProcesso.complexidade}`)}>
                    {selectedProcesso.complexidade === 'alta' ? 'Alta' : selectedProcesso.complexidade === 'media' ? 'Média' : 'Baixa'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">FTE</span>
                  <span className="detail-value">{selectedProcesso.fte}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
