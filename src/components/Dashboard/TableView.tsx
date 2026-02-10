/**
 * GPS 2.0 - Table View Component
 * Visualização em tabela das Business Units
 */

import { ChevronRight } from 'lucide-react';
import type { BusinessUnit } from '../../types';
import { getVPById } from '../../data/organizationData';
import { StatusTag, type StatusType } from '../shared';
import './TableView.css';

interface TableViewProps {
  businessUnits: BusinessUnit[];
  onSelectBU?: (bu: BusinessUnit) => void;
}

// Mock function to determine BU status (should come from backend)
function getBUStatus(bu: BusinessUnit): StatusType {
  // Simple logic based on ID for demo - in real app would come from backend
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

export function TableView({ businessUnits, onSelectBU }: TableViewProps) {
  return (
    <div className="table-view">
      <div className="table-view-container">
        <table className="table-view-table">
          <thead>
            <tr>
              <th>Unidade de Negócio</th>
              <th>VP</th>
              <th>Responsável</th>
              <th>Domínios</th>
              <th>Processos</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {businessUnits.map((bu) => {
              const status = getBUStatus(bu);
              return (
                <tr
                  key={bu.id}
                  onClick={() => onSelectBU?.(bu)}
                  className="table-view-row"
                >
                  <td className="table-view-cell-name">
                    <span className="table-view-bu-name">{bu.nome}</span>
                  </td>
                  <td className="table-view-cell-vp">
                    {getVPName(bu.vpId)}
                  </td>
                  <td className="table-view-cell-responsavel">
                    {bu.responsavel?.nome || '—'}
                  </td>
                  <td className="table-view-cell-number">
                    {bu.totalDominios}
                  </td>
                  <td className="table-view-cell-number table-view-cell-processos">
                    {bu.totalProcessos}
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

      {businessUnits.length === 0 && (
        <div className="table-view-empty">
          <p>Nenhuma Business Unit encontrada</p>
        </div>
      )}
    </div>
  );
}
