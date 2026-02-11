/**
 * GPS 2.0 - Table View Component
 * Visualização em tabela das Business Units
 */

import { ChevronRight, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import type { BusinessUnit } from '../../types';
import { getVPById } from '../../data/organizationData';
import { StatusTag, type StatusType } from '../shared';
import './TableView.css';

interface TableViewProps {
  businessUnits: BusinessUnit[];
  onSelectBU?: (bu: BusinessUnit) => void;
}

type SortField = 'nome' | 'vp' | 'responsavel' | 'dominios' | 'macroprocessos' | 'processos' | 'status';
type SortDirection = 'asc' | 'desc';

// Mock function to determine BU status (should come from backend)
function getBUStatus(bu: BusinessUnit): StatusType {
  const statusMap: Record<string, StatusType> = {
    'bu-1': 'atualizado',
    'bu-2': 'atualizado',
    'bu-3': 'desatualizado',
    'bu-4': 'atualizado',
    'bu-5': 'em_aprovacao',
    'bu-6': 'atualizado',
  };
  return statusMap[bu.id] || 'atualizado';
}

// Get VP name from VP ID
function getVPName(vpId: string): string {
  const vp = getVPById(vpId);
  return vp?.nome || '—';
}

// Get initials from name
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export function TableView({ businessUnits, onSelectBU }: TableViewProps) {
  const [sortField, setSortField] = useState<SortField>('nome');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUnits = [...businessUnits].sort((a, b) => {
    const dir = sortDirection === 'asc' ? 1 : -1;
    switch (sortField) {
      case 'nome': return a.nome.localeCompare(b.nome) * dir;
      case 'vp': return getVPName(a.vpId).localeCompare(getVPName(b.vpId)) * dir;
      case 'responsavel': return (a.responsavel?.nome || '').localeCompare(b.responsavel?.nome || '') * dir;
      case 'dominios': return (a.totalDominios - b.totalDominios) * dir;
      case 'macroprocessos': return (a.totalMacroprocessos - b.totalMacroprocessos) * dir;
      case 'processos': return (a.totalProcessos - b.totalProcessos) * dir;
      default: return 0;
    }
  });

  const renderSortIcon = (field: SortField) => (
    <ArrowUpDown
      size={12}
      className={`table-view-sort-icon ${sortField === field ? 'table-view-sort-icon--active' : ''}`}
    />
  );

  return (
    <div className="table-view">
      <div className="table-view-container">
        <table className="table-view-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('nome')} className="table-view-th--sortable">
                <span>Unidade de Negócio</span>
                {renderSortIcon('nome')}
              </th>
              <th onClick={() => handleSort('vp')} className="table-view-th--sortable">
                <span>VP</span>
                {renderSortIcon('vp')}
              </th>
              <th onClick={() => handleSort('responsavel')} className="table-view-th--sortable">
                <span>Responsável</span>
                {renderSortIcon('responsavel')}
              </th>
              <th onClick={() => handleSort('dominios')} className="table-view-th--sortable table-view-th--center">
                <span>Domínios</span>
                {renderSortIcon('dominios')}
              </th>
              <th onClick={() => handleSort('macroprocessos')} className="table-view-th--sortable table-view-th--center">
                <span>Macros</span>
                {renderSortIcon('macroprocessos')}
              </th>
              <th onClick={() => handleSort('processos')} className="table-view-th--sortable table-view-th--center">
                <span>Processos</span>
                {renderSortIcon('processos')}
              </th>
              <th>Status</th>
              <th className="table-view-th--action"></th>
            </tr>
          </thead>
          <tbody>
            {sortedUnits.map((bu, index) => {
              const status = getBUStatus(bu);
              return (
                <tr
                  key={bu.id}
                  onClick={() => onSelectBU?.(bu)}
                  className="table-view-row"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="table-view-cell-name">
                    <div className="table-view-bu-indicator" style={{ backgroundColor: bu.cor || '#9755FE' }} />
                    <span className="table-view-bu-name">{bu.nome}</span>
                  </td>
                  <td className="table-view-cell-text">
                    {getVPName(bu.vpId)}
                  </td>
                  <td className="table-view-cell-responsavel">
                    <div className="table-view-avatar">
                      {getInitials(bu.responsavel?.nome || 'NA')}
                    </div>
                    <span>{bu.responsavel?.nome || '—'}</span>
                  </td>
                  <td className="table-view-cell-number">
                    <span className="table-view-number-badge">{bu.totalDominios}</span>
                  </td>
                  <td className="table-view-cell-number">
                    <span className="table-view-number-badge">{bu.totalMacroprocessos}</span>
                  </td>
                  <td className="table-view-cell-number">
                    <span className="table-view-number-badge table-view-number-badge--highlight">
                      {bu.totalProcessos.toLocaleString('pt-BR')}
                    </span>
                  </td>
                  <td className="table-view-cell-status">
                    <StatusTag status={status} size="sm" />
                  </td>
                  <td className="table-view-cell-action">
                    <ChevronRight size={16} className="table-view-chevron" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rodapé com resumo */}
      <div className="table-view-footer">
        <span className="table-view-footer-count">
          {businessUnits.length} unidades de negócio
        </span>
        <span className="table-view-footer-total">
          Total: {businessUnits.reduce((sum, bu) => sum + bu.totalProcessos, 0).toLocaleString('pt-BR')} processos
        </span>
      </div>

      {businessUnits.length === 0 && (
        <div className="table-view-empty">
          <p>Nenhuma Business Unit encontrada</p>
        </div>
      )}
    </div>
  );
}
