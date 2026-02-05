/**
 * GPS 2.0 - Process Card Component
 * Componente de card de processo baseado no design do Figma (node 77:379)
 */

import { Route, GitBranch, Boxes, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { StatusTag, type StatusType } from './StatusTag';
import './ProcessCard.css';

export interface HierarchyItem {
  type: 'dominio' | 'jornada' | 'macroprocesso';
  codigo?: string;
  nome: string;
}

export interface ResponsavelInfo {
  nome: string;
  cargo: string;
  equipe: string;
  foto?: string;
}

export interface ProcessCardProps {
  codigo: string;
  nome: string;
  status: StatusType;
  criticidade?: 'critico' | 'medio' | 'baixo';
  dataCriacao?: string;
  dataAtualizacao?: string;
  hierarchy?: HierarchyItem[];
  responsavel?: ResponsavelInfo;
  onClick?: () => void;
  onMenuClick?: (e: React.MouseEvent) => void;
  showCriticidade?: boolean;
  accentColor?: string;
}

const hierarchyIcons: Record<string, React.ReactNode> = {
  dominio: <Route size={20} />,
  jornada: <GitBranch size={20} />,
  macroprocesso: <Boxes size={20} />,
};

const hierarchyLabels: Record<string, string> = {
  dominio: 'Domínio',
  jornada: 'Jornada',
  macroprocesso: 'Macroprocesso',
};

function getInitials(nome: string): string {
  return nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export function ProcessCard({
  codigo,
  nome,
  status,
  criticidade,
  dataCriacao,
  dataAtualizacao,
  hierarchy = [],
  responsavel,
  onClick,
  onMenuClick,
  showCriticidade = false,
  accentColor = '#9755FE',
}: ProcessCardProps) {
  return (
    <div className="gps-process-card" onClick={onClick}>
      {/* Left accent border */}
      <div className="gps-process-card-accent" style={{ backgroundColor: accentColor }} />

      {/* Card content */}
      <div className="gps-process-card-content">
        {/* Header row */}
        <div className="gps-process-card-header">
          <div className="gps-process-card-title-section">
            <span className="gps-process-card-code">{codigo}</span>
            <div className="gps-process-card-name-row">
              <h3 className="gps-process-card-name">{nome}</h3>
              {showCriticidade && criticidade && (
                <StatusTag status={criticidade === 'critico' ? 'critico' : 'desatualizado'} label={
                  criticidade === 'critico' ? 'Crítico' :
                  criticidade === 'medio' ? 'Médio' : 'Baixo'
                } size="sm" />
              )}
            </div>
          </div>
          <div className="gps-process-card-status-section">
            <StatusTag status={status} />
            {dataCriacao && (
              <span className="gps-process-card-date">Criado em {dataCriacao}</span>
            )}
            {dataAtualizacao && (
              <span className="gps-process-card-date">Última atualização em {dataAtualizacao}</span>
            )}
          </div>
        </div>

        {/* Hierarchy row */}
        {hierarchy.length > 0 && (
          <div className="gps-process-card-hierarchy">
            {hierarchy.map((item, index) => (
              <div key={index} className="gps-process-card-hierarchy-item">
                <div className={`gps-process-card-hierarchy-icon gps-process-card-hierarchy-icon--${item.type}`}>
                  {hierarchyIcons[item.type]}
                </div>
                <div className="gps-process-card-hierarchy-info">
                  <span className="gps-process-card-hierarchy-label">{hierarchyLabels[item.type]}</span>
                  <span className="gps-process-card-hierarchy-value">
                    {item.codigo ? `${item.codigo} - ${item.nome}` : item.nome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer row */}
        {responsavel && (
          <div className="gps-process-card-footer">
            <div className="gps-process-card-responsavel">
              <div className="gps-process-card-avatar-wrapper">
                <Avatar className="gps-process-card-avatar">
                  {responsavel.foto ? (
                    <AvatarImage src={responsavel.foto} alt={responsavel.nome} />
                  ) : null}
                  <AvatarFallback>
                    {getInitials(responsavel.nome)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="gps-process-card-responsavel-info">
                <span className="gps-process-card-responsavel-nome">{responsavel.nome}</span>
                <span className="gps-process-card-responsavel-details">
                  {responsavel.cargo} • {responsavel.equipe}
                </span>
              </div>
            </div>
            <button
              className="gps-process-card-menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                onMenuClick?.(e);
              }}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
