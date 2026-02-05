/**
 * GPS 2.0 - BU Card Component
 * Layout baseado no design do Figma - Card com borda lateral e cascata expansível
 */

import { useState } from 'react';
import {
  ChevronDown, ChevronRight, Eye,
  Route, GitBranch, Boxes, FileText
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getVPById } from '../../../data/organizationData';
import type {
  BusinessUnit, DetailType
} from '../../../types';
import './BUCard.css';

export interface BUCardProps {
  bu: BusinessUnit;
  isExpanded: boolean;
  onToggle: () => void;
  onShowDetails: (
    type: DetailType,
    data: any,
    breadcrumb: { type: DetailType; nome: string }[],
    context?: { bu?: BusinessUnit; dominio?: any; jornada?: any }
  ) => void;
}

export function BUCard({ bu, isExpanded, onToggle, onShowDetails }: BUCardProps) {
  const [expandedDominio, setExpandedDominio] = useState<string | null>(null);
  const [expandedJornada, setExpandedJornada] = useState<string | null>(null);
  const [expandedMacro, setExpandedMacro] = useState<string | null>(null);

  const vp = getVPById(bu.vpId);

  return (
    <div className={`bu-card-new ${isExpanded ? 'bu-card-new--open' : ''}`}>
      {/* Accent border */}
      <div className="bu-card-new-accent" style={{ backgroundColor: bu.cor }} />

      {/* Main content */}
      <div className="bu-card-new-main">
        {/* Row 1: Header with title, VP, and actions */}
        <div className="bu-card-new-header">
          {/* Left: Code + Name */}
          <div className="bu-card-new-title">
            <span className="bu-card-new-code">{bu.codigo}</span>
            <h3 className="bu-card-new-name">{bu.nome}</h3>
          </div>

          {/* VP Info */}
          {vp && (
            <div className="bu-card-new-vp">
              <Avatar className="bu-card-new-vp-avatar">
                <AvatarImage src={vp.foto} alt={vp.nome} />
                <AvatarFallback style={{ backgroundColor: vp.cor, color: 'white' }}>
                  {vp.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="bu-card-new-vp-info">
                <span className="bu-card-new-vp-name">{vp.nome}</span>
                <span className="bu-card-new-vp-role">{vp.cargo}</span>
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="bu-card-new-spacer" />

          {/* Ver detalhes button */}
          <button
            className="bu-card-new-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails('bu', bu, [{ type: 'bu', nome: bu.nome }]);
            }}
          >
            <Eye size={16} />
            <span>Ver detalhes</span>
          </button>

          {/* Chevron para expandir */}
          <button className="bu-card-new-expand" onClick={onToggle}>
            <ChevronDown className={`bu-card-new-chevron ${isExpanded ? 'bu-card-new-chevron--open' : ''}`} />
          </button>
        </div>

        {/* Row 2: Stats with colored icons */}
        <div className="bu-card-new-stats">
          <div className="bu-card-new-stat">
            <div className="bu-card-new-stat-icon-wrapper bu-card-new-stat-icon--dominio">
              <Route size={20} />
            </div>
            <div className="bu-card-new-stat-info">
              <span className="bu-card-new-stat-value">{bu.totalDominios}</span>
              <span className="bu-card-new-stat-label">DOMÍNIOS</span>
            </div>
          </div>
          <div className="bu-card-new-stat">
            <div className="bu-card-new-stat-icon-wrapper bu-card-new-stat-icon--jornada">
              <GitBranch size={20} />
            </div>
            <div className="bu-card-new-stat-info">
              <span className="bu-card-new-stat-value">{bu.totalJornadas}</span>
              <span className="bu-card-new-stat-label">JORNADAS</span>
            </div>
          </div>
          <div className="bu-card-new-stat">
            <div className="bu-card-new-stat-icon-wrapper bu-card-new-stat-icon--macro">
              <Boxes size={20} />
            </div>
            <div className="bu-card-new-stat-info">
              <span className="bu-card-new-stat-value">{bu.totalMacroprocessos}</span>
              <span className="bu-card-new-stat-label">MACROPROCESSOS</span>
            </div>
          </div>
          <div className="bu-card-new-stat bu-card-new-stat--highlight">
            <div className="bu-card-new-stat-icon-wrapper bu-card-new-stat-icon--processo">
              <FileText size={20} />
            </div>
            <div className="bu-card-new-stat-info">
              <span className="bu-card-new-stat-value">{bu.totalProcessos}</span>
              <span className="bu-card-new-stat-label">PROCESSOS</span>
            </div>
          </div>
        </div>


        {/* Expandable Cascade Content */}
        {isExpanded && (
          <div className="bu-card-new-cascade">
            {bu.dominios.map(dominio => (
              <div key={dominio.id} className="cascade-item">
                {/* Domínio Row */}
                <div
                  className="cascade-row cascade-row--dominio"
                  onClick={() => setExpandedDominio(expandedDominio === dominio.id ? null : dominio.id)}
                >
                  <ChevronRight className={`cascade-chevron ${expandedDominio === dominio.id ? 'cascade-chevron--open' : ''}`} />
                  <div className="cascade-icon cascade-icon--dominio">
                    <Route size={14} />
                  </div>
                  <span className="cascade-name">{dominio.nome}</span>
                  <span className="cascade-count">{dominio.totalProcessos} processos</span>
                  <button
                    className="cascade-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowDetails('dominio', dominio, [
                        { type: 'bu', nome: bu.nome },
                        { type: 'dominio', nome: dominio.nome }
                      ], { bu });
                    }}
                  >
                    <Eye size={12} />
                  </button>
                </div>

                {/* Jornadas */}
                {expandedDominio === dominio.id && (
                  <div className="cascade-nested">
                    {dominio.jornadas.map(jornada => (
                      <div key={jornada.id} className="cascade-item">
                        <div
                          className="cascade-row cascade-row--jornada"
                          onClick={() => setExpandedJornada(expandedJornada === jornada.id ? null : jornada.id)}
                        >
                          <ChevronRight className={`cascade-chevron ${expandedJornada === jornada.id ? 'cascade-chevron--open' : ''}`} />
                          <div className="cascade-icon cascade-icon--jornada">
                            <GitBranch size={14} />
                          </div>
                          <span className="cascade-name">{jornada.nome}</span>
                          <span className="cascade-count">{jornada.totalProcessos} processos</span>
                          <button
                            className="cascade-details-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onShowDetails('jornada', jornada, [
                                { type: 'bu', nome: bu.nome },
                                { type: 'dominio', nome: dominio.nome },
                                { type: 'jornada', nome: jornada.nome }
                              ], { bu, dominio });
                            }}
                          >
                            <Eye size={12} />
                          </button>
                        </div>

                        {/* Macroprocessos */}
                        {expandedJornada === jornada.id && (
                          <div className="cascade-nested">
                            {jornada.macroprocessos.map(macro => (
                              <div key={macro.id} className="cascade-item">
                                <div
                                  className="cascade-row cascade-row--macro"
                                  onClick={() => setExpandedMacro(expandedMacro === macro.id ? null : macro.id)}
                                >
                                  <ChevronRight className={`cascade-chevron ${expandedMacro === macro.id ? 'cascade-chevron--open' : ''}`} />
                                  <div className="cascade-icon cascade-icon--macro">
                                    <Boxes size={14} />
                                  </div>
                                  <span className="cascade-name">{macro.nome}</span>
                                  <span className="cascade-count">{macro.totalProcessos} processos</span>
                                  <button
                                    className="cascade-details-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onShowDetails('macro', macro, [
                                        { type: 'bu', nome: bu.nome },
                                        { type: 'dominio', nome: dominio.nome },
                                        { type: 'jornada', nome: jornada.nome },
                                        { type: 'macro', nome: macro.nome }
                                      ], { bu, dominio, jornada });
                                    }}
                                  >
                                    <Eye size={12} />
                                  </button>
                                </div>

                                {/* Processos */}
                                {expandedMacro === macro.id && (
                                  <div className="cascade-nested">
                                    {macro.processos.map(processo => (
                                      <div key={processo.id} className="cascade-row cascade-row--processo">
                                        <div className="cascade-icon cascade-icon--processo">
                                          <FileText size={14} />
                                        </div>
                                        <span className="cascade-name">{processo.nome}</span>
                                        <span className={`cascade-status cascade-status--${processo.status === 'em_revisao' ? 'revisao' : processo.status}`}>
                                          {processo.status === 'ativo' ? 'Atualizado' : processo.status === 'em_revisao' ? 'Desatualizado' : 'Desatualizado'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
