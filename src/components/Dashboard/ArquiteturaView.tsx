/**
 * GPS 2.0 - Arquitetura View
 * Visualização da estrutura organizacional por Domínio > PV > Jornada
 */

import { useState } from 'react';
import type { Dominio, Jornada, PropostaValor } from '../../types';
import { dominioColors } from '../../data/mockData';
import './ArquiteturaView.css';

interface ArquiteturaViewProps {
  dominios: Dominio[];
}

export function ArquiteturaView({ dominios }: ArquiteturaViewProps) {
  const coreDominio = dominios.find((d) => d.tipo === 'core');
  const estrategicoDominio = dominios.find((d) => d.tipo === 'estrategico');
  const plataformaDominio = dominios.find((d) => d.tipo === 'plataforma');
  const corporativoDominio = dominios.find((d) => d.tipo === 'corporativo');

  const defaultPV = coreDominio?.propostasValor?.[0] || null;
  const defaultJornada = defaultPV?.jornadas?.[0] || null;

  const [selectedPV, setSelectedPV] = useState<PropostaValor | null>(defaultPV);
  const [selectedJornada, setSelectedJornada] = useState<Jornada | null>(defaultJornada);
  const [drillDownOpen, setDrillDownOpen] = useState(false);

  const handlePVClick = (pv: PropostaValor) => {
    if (selectedPV?.id === pv.id) {
      setSelectedPV(null);
      setSelectedJornada(null);
    } else {
      setSelectedPV(pv);
      setSelectedJornada(pv.jornadas[0] || null);
    }
    setDrillDownOpen(false);
  };

  const handleJornadaClick = (jornada: Jornada) => {
    setSelectedJornada(jornada);
    setDrillDownOpen(false);
  };

  const renderOtherDominio = (dominio: Dominio | undefined, title: string) => {
    if (!dominio?.jornadas?.length) return null;
    const colors = dominioColors[dominio.tipo as keyof typeof dominioColors];

    return (
      <div className="other-dominio" style={{ borderLeftColor: colors?.border }}>
        <div className="other-dominio-marker" style={{ backgroundColor: colors?.border }} />
        <span className="other-dominio-title">{title}</span>
        <span className="other-dominio-stats">
          {dominio.jornadas.length} jornadas · {dominio.totalProcessos} processos
        </span>
      </div>
    );
  };

  return (
    <div className="arquitetura-view">
      {/* Domínio Core */}
      <div className="dominio-core">
        <div className="dominio-header">
          <span>DOMÍNIO: Core - Propostas de Valor</span>
          <span className="dominio-badge">{coreDominio?.totalProcessos || 0} processos</span>
        </div>

        <div className="jornada-indicator">
          {selectedJornada
            ? `Jornada: ${selectedJornada.codigo} - ${selectedJornada.nome}`
            : 'Selecione uma Proposta de Valor'}
        </div>

        {/* PV Cards */}
        <div className="pv-grid">
          {coreDominio?.propostasValor?.map((pv) => {
            const isSelected = selectedPV?.id === pv.id;
            const total = pv.jornadas.reduce((acc, j) => acc + j.totalProcessos, 0);

            return (
              <div
                key={pv.id}
                className={`pv-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handlePVClick(pv)}
                style={{ '--pv-color': pv.cor } as React.CSSProperties}
              >
                <div className="pv-header">
                  <div className="pv-dot" style={{ backgroundColor: pv.cor }} />
                  <span className="pv-code" style={{ color: pv.cor }}>{pv.codigo}</span>
                </div>
                <div className="pv-nome">{pv.nome}</div>
                <div className="pv-stats">
                  <span className="pv-jornadas">{pv.jornadas.length} jornadas</span>
                  <span className="pv-processos">{total} proc.</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jornadas */}
        {selectedPV && (
          <div className="jornadas-section">
            <div className="jornadas-header">
              <span>Jornadas de {selectedPV.codigo}</span>
              <span className="jornadas-count">{selectedPV.jornadas.length}</span>
            </div>
            <div className="jornadas-list">
              {selectedPV.jornadas.map((jornada) => {
                const isSelected = selectedJornada?.id === jornada.id;
                return (
                  <div
                    key={jornada.id}
                    className={`jornada-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleJornadaClick(jornada)}
                  >
                    <span className="jornada-code">{jornada.codigo}</span>
                    <span className="jornada-nome">{jornada.nome}</span>
                    {jornada.dono && <span className="jornada-dono">{jornada.dono}</span>}
                    <span className="jornada-count">{jornada.totalProcessos}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Drill Down */}
        <div className="drill-down">
          <button
            className={`drill-down-toggle ${drillDownOpen ? 'open' : ''}`}
            onClick={() => setDrillDownOpen(!drillDownOpen)}
          >
            <span>Drill down de processos</span>
            {selectedJornada && <span className="drill-down-context">({selectedJornada.nome})</span>}
            <svg className="drill-down-arrow" width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>

          {drillDownOpen && selectedJornada && (
            <div className="drill-down-content">
              {selectedJornada.macroprocessos.length === 0 ? (
                <div className="drill-down-empty">Nenhum processo mapeado</div>
              ) : (
                <div className="macros-grid">
                  {selectedJornada.macroprocessos.map((macro) => (
                    <div key={macro.id} className="macro-card">
                      <div className="macro-header">
                        <span className="macro-code">{macro.codigo}</span>
                        <span className="macro-nome">{macro.nome}</span>
                        <span className="macro-count">{macro.processos.length}</span>
                      </div>
                      <div className="processos-list">
                        {macro.processos.map((proc) => (
                          <div key={proc.id} className="processo-item">
                            <span className="processo-code">{proc.codigo}</span>
                            <span className="processo-nome">{proc.nome}</span>
                            <span className={`processo-status ${proc.status}`}>
                              {proc.status === 'ativo' ? 'Ativo' : proc.status === 'em_revisao' ? 'Revisão' : 'Inativo'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Outros Domínios */}
      <div className="outros-dominios">
        {renderOtherDominio(estrategicoDominio, 'Estratégico')}
        {renderOtherDominio(plataformaDominio, 'Plataforma')}
        {renderOtherDominio(corporativoDominio, 'Corporativo')}
      </div>
    </div>
  );
}
