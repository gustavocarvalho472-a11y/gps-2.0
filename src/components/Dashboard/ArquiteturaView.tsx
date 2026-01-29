/**
 * GPS 2.0 - Arquitetura View
 * Visualização com jornada selecionada e drill-down: Macroprocessos > Processos
 */

import { useState } from 'react';
import type { Dominio, Jornada, Macroprocesso, Processo } from '../../types';
import './ArquiteturaView.css';

interface ArquiteturaViewProps {
  dominios: Dominio[];
}

export function ArquiteturaView({ dominios }: ArquiteturaViewProps) {
  const coreDominio = dominios.find((d) => d.tipo === 'core');

  // Extrair todas as jornadas do Core com seus PVs
  const jornadasCore = coreDominio?.propostasValor?.flatMap((pv) =>
    pv.jornadas.map((j) => ({
      ...j,
      pvs: [{ id: pv.id, codigo: pv.codigo, nome: pv.nome, cor: pv.cor }],
    }))
  ) || [];

  // Agrupar jornadas que aparecem em múltiplas PVs (mesmo código)
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

  // Jornada selecionada (J01 - Gestão e Suporte à Operação)
  const selectedJornada = jornadasAgrupadas[0];

  // Calcular totais
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

  const getComplexidadeLabel = (complexidade: string | undefined) => {
    switch (complexidade) {
      case 'alta': return 'Alta';
      case 'media': return 'Média';
      case 'baixa': return 'Baixa';
      default: return complexidade || '-';
    }
  };

  if (!selectedJornada) {
    return <div className="arquitetura-view">Nenhuma jornada encontrada</div>;
  }

  return (
    <div className="arquitetura-view">
      {/* Header do Domínio */}
      <div className="dominio-header">
        <div className="dominio-header-left">
          <span className="dominio-label">DOMÍNIO</span>
          <span className="dominio-name">Core: Propostas de Valor</span>
        </div>
        <div className="dominio-badges">
          <span className="dominio-badge">{jornadasAgrupadas.length} jornadas</span>
          <span className="dominio-badge">{totalMacroprocessos} macroprocessos</span>
          <span className="dominio-badge">{totalProcessos} processos</span>
        </div>
      </div>

      {/* Jornada Selecionada - Card Destacado */}
      <div className="jornada-selected-card">
        <div className="jornada-selected-header">
          <div className="jornada-selected-info">
            <span className="jornada-selected-label">JORNADA SELECIONADA</span>
            <div className="jornada-selected-title">
              <span className="jornada-code-large">{selectedJornada.codigo}</span>
              <h2 className="jornada-nome-large">{selectedJornada.nome}</h2>
            </div>
          </div>
          <div className="jornada-selected-meta">
            <div className="jornada-dono-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="dono-info">
                <span className="dono-label">Dono da Jornada</span>
                <span className="dono-name">{selectedJornada.dono}</span>
              </div>
            </div>
            <div className="jornada-pvs-card">
              {selectedJornada.pvs.map((pv) => (
                <span
                  key={pv.id}
                  className="pv-badge-large"
                  style={{ backgroundColor: `${pv.cor}20`, color: pv.cor, borderColor: pv.cor }}
                  title={pv.nome}
                >
                  {pv.codigo}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="jornada-selected-stats">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Macroprocessos</span>
          </div>
          <span className="section-count">{selectedJornada.macroprocessos?.length || 0} macroprocessos</span>
        </div>

        <div className="macros-grid">
          {selectedJornada.macroprocessos?.map((macro) => {
            const isSelected = selectedMacro?.id === macro.id;

            return (
              <div
                key={macro.id}
                className={`macro-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleMacroClick(macro)}
              >
                {isSelected && <div className="macro-selected-bar" />}
                <div className="macro-header">
                  <span className="macro-code">{macro.codigo}</span>
                  <span className="macro-count">{macro.processos.length} processos</span>
                </div>
                <span className="macro-nome">{macro.nome}</span>
                {isSelected && (
                  <div className="macro-chevron">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Processos</span>
            </div>
            <span className="section-context">
              {selectedMacro.codigo} - {selectedMacro.nome}
            </span>
          </div>

          <div className="processos-table">
            <div className="processos-header-row">
              <span className="col-codigo">Código</span>
              <span className="col-nome">Nome do Processo</span>
              <span className="col-status">Status</span>
              <span className="col-automacao">Automação</span>
              <span className="col-complexidade">Complexidade</span>
              <span className="col-fte">FTE</span>
            </div>
            {selectedMacro.processos.map((processo) => {
              const isSelected = selectedProcesso?.id === processo.id;

              return (
                <div
                  key={processo.id}
                  className={`processo-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleProcessoClick(processo)}
                >
                  <span className="col-codigo">{processo.codigo}</span>
                  <span className="col-nome">{processo.nome}</span>
                  <span className={`col-status status-${processo.status}`}>
                    {processo.status === 'ativo' ? 'Ativo' : processo.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
                  </span>
                  <span className="col-automacao">
                    <div className="automacao-bar">
                      <div
                        className="automacao-fill"
                        style={{ width: `${processo.automatizacao}%` }}
                      />
                    </div>
                    <span className="automacao-value">{processo.automatizacao}%</span>
                  </span>
                  <span className={`col-complexidade complexidade-${processo.complexidade}`}>
                    {getComplexidadeLabel(processo.complexidade)}
                  </span>
                  <span className="col-fte">{processo.fte}</span>
                </div>
              );
            })}
          </div>

          {/* Detalhes do Processo Selecionado */}
          {selectedProcesso && (
            <div className="processo-detail">
              <div className="processo-detail-header">
                <h4>{selectedProcesso.codigo} - {selectedProcesso.nome}</h4>
                <button
                  className="processo-detail-close"
                  onClick={() => setSelectedProcesso(null)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="processo-detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value status-badge status-${selectedProcesso.status}`}>
                    {selectedProcesso.status === 'ativo' ? 'Ativo' : selectedProcesso.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Automação</span>
                  <span className="detail-value">{selectedProcesso.automatizacao}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Complexidade</span>
                  <span className={`detail-value complexidade-${selectedProcesso.complexidade}`}>
                    {getComplexidadeLabel(selectedProcesso.complexidade)}
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
