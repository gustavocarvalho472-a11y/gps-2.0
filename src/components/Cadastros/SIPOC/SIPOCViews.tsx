/**
 * GPS 2.0 - SIPOC Views
 * Visualizações SIPOC: Matriz, Detalhe, Conexões
 */

import { useState } from 'react';
import {
  ChevronRight, ArrowRight, Users, Package,
  Workflow, Box, UserCheck
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { ProcessSIPOC as SIPOCData, Responsavel } from '../../../types';
import './SIPOCViews.css';

// Extended process type for SIPOC views
export interface ProcessoSIPOC {
  id: string;
  codigo: string;
  nome: string;
  responsavel?: Responsavel;
  area?: string;
  ferramentas?: string[];
  fte?: number;
  status: 'ativo' | 'inativo' | 'em_revisao';
  sipoc: SIPOCData;
}

// SIPOC Colors
const SIPOC_COLORS = {
  S: { bg: '#EEF2FF', border: '#818CF8', text: '#4338CA', label: 'Supplier' },
  I: { bg: '#FFFBEB', border: '#F59E0B', text: '#B45309', label: 'Input' },
  P: { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', label: 'Process' },
  O: { bg: '#ECFDF5', border: '#10B981', text: '#047857', label: 'Output' },
  C: { bg: '#FDF2F8', border: '#F472B6', text: '#BE185D', label: 'Customer' },
};

// Helper function
function getInitials(nome: string): string {
  return nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

// ========================================
// SUB-TOGGLE - Modos SIPOC
// ========================================
export type SIPOCMode = 'matriz' | 'detalhe' | 'conexoes';

interface SIPOCModeToggleProps {
  mode: SIPOCMode;
  onModeChange: (mode: SIPOCMode) => void;
}

export function SIPOCModeToggle({ mode, onModeChange }: SIPOCModeToggleProps) {
  return (
    <div className="sipoc-mode-toggle">
      <button
        className={`sipoc-mode-btn ${mode === 'matriz' ? 'sipoc-mode-btn--active' : ''}`}
        onClick={() => onModeChange('matriz')}
      >
        Matriz
      </button>
      <button
        className={`sipoc-mode-btn ${mode === 'detalhe' ? 'sipoc-mode-btn--active' : ''}`}
        onClick={() => onModeChange('detalhe')}
      >
        Detalhe
      </button>
      <button
        className={`sipoc-mode-btn ${mode === 'conexoes' ? 'sipoc-mode-btn--active' : ''}`}
        onClick={() => onModeChange('conexoes')}
      >
        Conexões
      </button>
    </div>
  );
}

// ========================================
// SIPOC MATRIZ VIEW - Tabela
// ========================================
interface SIPOCMatrizViewProps {
  processos: ProcessoSIPOC[];
  onSelectProcesso?: (processo: ProcessoSIPOC) => void;
}

export function SIPOCMatrizView({ processos, onSelectProcesso }: SIPOCMatrizViewProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="sipoc-matriz">
      <div className="sipoc-matriz-table-wrapper">
        <table className="sipoc-matriz-table">
          <thead>
            <tr>
              <th className="sipoc-matriz-th sipoc-matriz-th--processo">
                Processo
              </th>
              <th className="sipoc-matriz-th" style={{ borderTopColor: SIPOC_COLORS.S.border }}>
                <span className="sipoc-matriz-th-label" style={{ color: SIPOC_COLORS.S.text }}>
                  <Users size={16} />
                  S - Fornecedor
                </span>
              </th>
              <th className="sipoc-matriz-th" style={{ borderTopColor: SIPOC_COLORS.I.border }}>
                <span className="sipoc-matriz-th-label" style={{ color: SIPOC_COLORS.I.text }}>
                  <Package size={16} />
                  I - Entrada
                </span>
              </th>
              <th className="sipoc-matriz-th" style={{ borderTopColor: SIPOC_COLORS.P.border }}>
                <span className="sipoc-matriz-th-label" style={{ color: SIPOC_COLORS.P.text }}>
                  <Workflow size={16} />
                  P - Processo
                </span>
              </th>
              <th className="sipoc-matriz-th" style={{ borderTopColor: SIPOC_COLORS.O.border }}>
                <span className="sipoc-matriz-th-label" style={{ color: SIPOC_COLORS.O.text }}>
                  <Box size={16} />
                  O - Saída
                </span>
              </th>
              <th className="sipoc-matriz-th" style={{ borderTopColor: SIPOC_COLORS.C.border }}>
                <span className="sipoc-matriz-th-label" style={{ color: SIPOC_COLORS.C.text }}>
                  <UserCheck size={16} />
                  C - Cliente
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {processos.map((processo) => (
              <tr
                key={processo.id}
                className={`sipoc-matriz-row ${hoveredRow === processo.id ? 'sipoc-matriz-row--hover' : ''}`}
                onMouseEnter={() => setHoveredRow(processo.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onSelectProcesso?.(processo)}
              >
                <td className="sipoc-matriz-td sipoc-matriz-td--processo">
                  <div className="sipoc-matriz-processo-info">
                    <span className="sipoc-matriz-processo-codigo">{processo.codigo}</span>
                    <span className="sipoc-matriz-processo-nome">{processo.nome}</span>
                    {processo.responsavel && (
                      <span className="sipoc-matriz-processo-dono">
                        {processo.responsavel.nome}
                      </span>
                    )}
                  </div>
                </td>
                <td className="sipoc-matriz-td" style={{ backgroundColor: hoveredRow === processo.id ? SIPOC_COLORS.S.bg : undefined }}>
                  {processo.sipoc.supplier}
                </td>
                <td className="sipoc-matriz-td" style={{ backgroundColor: hoveredRow === processo.id ? SIPOC_COLORS.I.bg : undefined }}>
                  {processo.sipoc.input}
                </td>
                <td className="sipoc-matriz-td sipoc-matriz-td--steps" style={{ backgroundColor: hoveredRow === processo.id ? SIPOC_COLORS.P.bg : undefined }}>
                  <div className="sipoc-matriz-steps">
                    {processo.sipoc.processSteps.map((step, idx) => (
                      <span key={idx} className="sipoc-matriz-step">
                        <span className="sipoc-matriz-step-num">{idx + 1}</span>
                        {step}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="sipoc-matriz-td" style={{ backgroundColor: hoveredRow === processo.id ? SIPOC_COLORS.O.bg : undefined }}>
                  {processo.sipoc.output}
                </td>
                <td className="sipoc-matriz-td" style={{ backgroundColor: hoveredRow === processo.id ? SIPOC_COLORS.C.bg : undefined }}>
                  {processo.sipoc.customer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ========================================
// SIPOC DETALHE VIEW - Sidebar + Details
// ========================================
interface SIPOCDetalheViewProps {
  processos: ProcessoSIPOC[];
  selectedProcesso?: ProcessoSIPOC;
  onSelectProcesso?: (processo: ProcessoSIPOC) => void;
}

export function SIPOCDetalheView({ processos, selectedProcesso, onSelectProcesso }: SIPOCDetalheViewProps) {
  const [selected, setSelected] = useState<ProcessoSIPOC | null>(selectedProcesso || processos[0] || null);

  const handleSelect = (processo: ProcessoSIPOC) => {
    setSelected(processo);
    onSelectProcesso?.(processo);
  };

  return (
    <div className="sipoc-detalhe">
      {/* Sidebar */}
      <aside className="sipoc-detalhe-sidebar">
        <div className="sipoc-detalhe-sidebar-header">
          <span className="sipoc-detalhe-sidebar-title">Processos</span>
          <span className="sipoc-detalhe-sidebar-count">{processos.length}</span>
        </div>
        <div className="sipoc-detalhe-sidebar-list">
          {processos.map((processo, idx) => (
            <button
              key={processo.id}
              className={`sipoc-detalhe-sidebar-item ${selected?.id === processo.id ? 'sipoc-detalhe-sidebar-item--active' : ''}`}
              onClick={() => handleSelect(processo)}
            >
              <span className="sipoc-detalhe-sidebar-item-num">{idx + 1}</span>
              <span className="sipoc-detalhe-sidebar-item-nome">{processo.nome}</span>
              {selected?.id === processo.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="sipoc-detalhe-main">
        {selected ? (
          <>
            {/* Header */}
            <header className="sipoc-detalhe-header">
              <div className="sipoc-detalhe-header-info">
                <span className="sipoc-detalhe-header-codigo">{selected.codigo}</span>
                <h2 className="sipoc-detalhe-header-nome">{selected.nome}</h2>
                {selected.responsavel && (
                  <div className="sipoc-detalhe-header-responsavel">
                    <Avatar className="sipoc-detalhe-header-avatar">
                      {selected.responsavel.foto && <AvatarImage src={selected.responsavel.foto} />}
                      <AvatarFallback>{getInitials(selected.responsavel.nome)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="sipoc-detalhe-header-responsavel-nome">{selected.responsavel.nome}</span>
                      <span className="sipoc-detalhe-header-responsavel-cargo">{selected.responsavel.cargo || selected.area}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="sipoc-detalhe-header-meta">
                {selected.fte !== undefined && (
                  <span className="sipoc-detalhe-header-meta-item">
                    <strong>FTE:</strong> {selected.fte}
                  </span>
                )}
                <span className={`sipoc-detalhe-header-status sipoc-detalhe-header-status--${selected.status}`}>
                  {selected.status === 'ativo' ? 'Ativo' : selected.status === 'em_revisao' ? 'Em Revisão' : 'Inativo'}
                </span>
              </div>
            </header>

            {/* SIPOC Blocks */}
            <div className="sipoc-detalhe-blocks">
              {/* S - Supplier */}
              <div className="sipoc-detalhe-block" style={{ borderLeftColor: SIPOC_COLORS.S.border }}>
                <div className="sipoc-detalhe-block-header" style={{ backgroundColor: SIPOC_COLORS.S.bg }}>
                  <Users size={18} style={{ color: SIPOC_COLORS.S.text }} />
                  <span style={{ color: SIPOC_COLORS.S.text }}>S - Fornecedor (Supplier)</span>
                </div>
                <div className="sipoc-detalhe-block-content">
                  {selected.sipoc.supplier}
                </div>
              </div>

              <div className="sipoc-detalhe-arrow">
                <ArrowRight size={20} />
              </div>

              {/* I - Input */}
              <div className="sipoc-detalhe-block" style={{ borderLeftColor: SIPOC_COLORS.I.border }}>
                <div className="sipoc-detalhe-block-header" style={{ backgroundColor: SIPOC_COLORS.I.bg }}>
                  <Package size={18} style={{ color: SIPOC_COLORS.I.text }} />
                  <span style={{ color: SIPOC_COLORS.I.text }}>I - Entrada (Input)</span>
                </div>
                <div className="sipoc-detalhe-block-content">
                  {selected.sipoc.input}
                </div>
              </div>

              <div className="sipoc-detalhe-arrow">
                <ArrowRight size={20} />
              </div>

              {/* P - Process */}
              <div className="sipoc-detalhe-block sipoc-detalhe-block--process" style={{ borderLeftColor: SIPOC_COLORS.P.border }}>
                <div className="sipoc-detalhe-block-header" style={{ backgroundColor: SIPOC_COLORS.P.bg }}>
                  <Workflow size={18} style={{ color: SIPOC_COLORS.P.text }} />
                  <span style={{ color: SIPOC_COLORS.P.text }}>P - Processo (Process)</span>
                </div>
                <div className="sipoc-detalhe-block-content">
                  <div className="sipoc-detalhe-timeline">
                    {selected.sipoc.processSteps.map((step, idx) => (
                      <div key={idx} className="sipoc-detalhe-timeline-item">
                        <div className="sipoc-detalhe-timeline-marker">
                          <span className="sipoc-detalhe-timeline-num">{idx + 1}</span>
                          {idx < selected.sipoc.processSteps.length - 1 && (
                            <div className="sipoc-detalhe-timeline-line" />
                          )}
                        </div>
                        <span className="sipoc-detalhe-timeline-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sipoc-detalhe-arrow">
                <ArrowRight size={20} />
              </div>

              {/* O - Output */}
              <div className="sipoc-detalhe-block" style={{ borderLeftColor: SIPOC_COLORS.O.border }}>
                <div className="sipoc-detalhe-block-header" style={{ backgroundColor: SIPOC_COLORS.O.bg }}>
                  <Box size={18} style={{ color: SIPOC_COLORS.O.text }} />
                  <span style={{ color: SIPOC_COLORS.O.text }}>O - Saída (Output)</span>
                </div>
                <div className="sipoc-detalhe-block-content">
                  {selected.sipoc.output}
                </div>
              </div>

              <div className="sipoc-detalhe-arrow">
                <ArrowRight size={20} />
              </div>

              {/* C - Customer */}
              <div className="sipoc-detalhe-block" style={{ borderLeftColor: SIPOC_COLORS.C.border }}>
                <div className="sipoc-detalhe-block-header" style={{ backgroundColor: SIPOC_COLORS.C.bg }}>
                  <UserCheck size={18} style={{ color: SIPOC_COLORS.C.text }} />
                  <span style={{ color: SIPOC_COLORS.C.text }}>C - Cliente (Customer)</span>
                </div>
                <div className="sipoc-detalhe-block-content">
                  {selected.sipoc.customer}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="sipoc-detalhe-empty">
            <p>Selecione um processo para ver os detalhes SIPOC</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ========================================
// SIPOC CONEXOES VIEW - Chain connections
// ========================================
interface SIPOCConexoesViewProps {
  processos: ProcessoSIPOC[];
  onSelectProcesso?: (processo: ProcessoSIPOC) => void;
}

export function SIPOCConexoesView({ processos, onSelectProcesso }: SIPOCConexoesViewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Get unique suppliers and customers
  const uniqueSuppliers = [...new Set(processos.map(p => p.sipoc.supplier))];
  const uniqueCustomers = [...new Set(processos.map(p => p.sipoc.customer))];
  const uniqueAreas = [...new Set(processos.filter(p => p.area).map(p => p.area!))];

  // Check if process is neighbor (previous or next)
  const isNeighbor = (currentIdx: number, hoveredIdx: number): boolean => {
    return Math.abs(currentIdx - hoveredIdx) === 1;
  };

  const getHoveredIndex = () => processos.findIndex(p => p.id === hoveredId);

  return (
    <div className="sipoc-conexoes">
      {/* Process Chain */}
      <div className="sipoc-conexoes-chain">
        {processos.map((processo, idx) => {
          const hoveredIdx = getHoveredIndex();
          const isHovered = processo.id === hoveredId;
          const isNeighborProcess = hoveredId !== null && isNeighbor(idx, hoveredIdx);

          return (
            <div key={processo.id} className="sipoc-conexoes-item">
              {/* Process Strip */}
              <div
                className={`sipoc-conexoes-strip ${isHovered ? 'sipoc-conexoes-strip--hover' : ''} ${isNeighborProcess ? 'sipoc-conexoes-strip--neighbor' : ''}`}
                onMouseEnter={() => setHoveredId(processo.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectProcesso?.(processo)}
              >
                <div className="sipoc-conexoes-strip-col" style={{ backgroundColor: SIPOC_COLORS.S.bg }}>
                  <span className="sipoc-conexoes-strip-label" style={{ color: SIPOC_COLORS.S.text }}>S</span>
                  <span className="sipoc-conexoes-strip-value">{processo.sipoc.supplier}</span>
                </div>
                <div className="sipoc-conexoes-strip-col" style={{ backgroundColor: SIPOC_COLORS.I.bg }}>
                  <span className="sipoc-conexoes-strip-label" style={{ color: SIPOC_COLORS.I.text }}>I</span>
                  <span className="sipoc-conexoes-strip-value">{processo.sipoc.input}</span>
                </div>
                <div className="sipoc-conexoes-strip-center">
                  <span className="sipoc-conexoes-strip-badge">{processo.codigo}</span>
                  <span className="sipoc-conexoes-strip-nome">{processo.nome}</span>
                </div>
                <div className="sipoc-conexoes-strip-col" style={{ backgroundColor: SIPOC_COLORS.O.bg }}>
                  <span className="sipoc-conexoes-strip-label" style={{ color: SIPOC_COLORS.O.text }}>O</span>
                  <span className="sipoc-conexoes-strip-value">{processo.sipoc.output}</span>
                </div>
                <div className="sipoc-conexoes-strip-col" style={{ backgroundColor: SIPOC_COLORS.C.bg }}>
                  <span className="sipoc-conexoes-strip-label" style={{ color: SIPOC_COLORS.C.text }}>C</span>
                  <span className="sipoc-conexoes-strip-value">{processo.sipoc.customer}</span>
                </div>
              </div>

              {/* Connection Pill */}
              {idx < processos.length - 1 && (
                <div className="sipoc-conexoes-pill">
                  <span>Output P{idx + 1}</span>
                  <ArrowRight size={14} />
                  <span>Input P{idx + 2}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="sipoc-conexoes-summary">
        <div className="sipoc-conexoes-summary-card">
          <Users size={24} style={{ color: SIPOC_COLORS.S.text }} />
          <div className="sipoc-conexoes-summary-info">
            <span className="sipoc-conexoes-summary-value">{uniqueSuppliers.length}</span>
            <span className="sipoc-conexoes-summary-label">Fornecedores únicos</span>
          </div>
        </div>
        <div className="sipoc-conexoes-summary-card">
          <UserCheck size={24} style={{ color: SIPOC_COLORS.C.text }} />
          <div className="sipoc-conexoes-summary-info">
            <span className="sipoc-conexoes-summary-value">{uniqueCustomers.length}</span>
            <span className="sipoc-conexoes-summary-label">Clientes únicos</span>
          </div>
        </div>
        <div className="sipoc-conexoes-summary-card">
          <Workflow size={24} style={{ color: SIPOC_COLORS.P.text }} />
          <div className="sipoc-conexoes-summary-info">
            <span className="sipoc-conexoes-summary-value">{processos.length}</span>
            <span className="sipoc-conexoes-summary-label">Total processos</span>
          </div>
        </div>
        <div className="sipoc-conexoes-summary-card">
          <Box size={24} style={{ color: SIPOC_COLORS.O.text }} />
          <div className="sipoc-conexoes-summary-info">
            <span className="sipoc-conexoes-summary-value">{uniqueAreas.length}</span>
            <span className="sipoc-conexoes-summary-label">Áreas envolvidas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// MAIN SIPOC VIEW - Combines all modes
// ========================================
interface SIPOCViewProps {
  processos: ProcessoSIPOC[];
  onSelectProcesso?: (processo: ProcessoSIPOC) => void;
}

export function SIPOCView({ processos, onSelectProcesso }: SIPOCViewProps) {
  const [mode, setMode] = useState<SIPOCMode>('matriz');

  return (
    <div className="sipoc-view">
      <div className="sipoc-view-header">
        <SIPOCModeToggle mode={mode} onModeChange={setMode} />
      </div>
      <div className="sipoc-view-content">
        {mode === 'matriz' && (
          <SIPOCMatrizView processos={processos} onSelectProcesso={onSelectProcesso} />
        )}
        {mode === 'detalhe' && (
          <SIPOCDetalheView processos={processos} onSelectProcesso={onSelectProcesso} />
        )}
        {mode === 'conexoes' && (
          <SIPOCConexoesView processos={processos} onSelectProcesso={onSelectProcesso} />
        )}
      </div>
    </div>
  );
}
