/**
 * GPS 2.0 - Cadeia de Valor View
 * Visão hierárquica: Domínio → Jornadas → Macroprocessos → Processos
 */

import { GitBranch, Boxes, Building2, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { DominioCompleto, JornadaCompleta, MacroprocessoCompleto, Processo } from '../../types';
import './CadeiaDeValorView.css';

// Mock status cycle for jornadas/macros (data doesn't carry status yet)
const JORNADA_STATUSES = ['desatualizado', 'em_aprovacao', 'atualizado', 'atualizado'] as const;
type JornadaStatus = 'desatualizado' | 'em_aprovacao' | 'atualizado';

const STATUS_LABEL: Record<JornadaStatus, string> = {
  atualizado: 'Atualizado',
  em_aprovacao: 'Em aprovação',
  desatualizado: 'Desatualizado',
};

const PROCESSO_STATUS_LABEL: Record<string, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
  em_revisao: 'Em revisão',
};

function getInitials(nome: string) {
  return nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

// ─── Processo Mini Card ───────────────────────────────────────────────────────
function ProcessoMiniCard({ processo }: { processo: Processo }) {
  const statusLabel = PROCESSO_STATUS_LABEL[processo.status] ?? 'Ativo';
  const statusClass = `cadeia-proc-status--${processo.status}`;

  return (
    <div className="cadeia-proc-card">
      <div className="cadeia-proc-card-top">
        <span className="cadeia-proc-code">{processo.codigo}</span>
        <span className={`cadeia-proc-status ${statusClass}`}>{statusLabel}</span>
      </div>
      <p className="cadeia-proc-name">{processo.nome}</p>
    </div>
  );
}

// ─── Macroprocesso Block ──────────────────────────────────────────────────────
function MacroBlock({ macro }: { macro: MacroprocessoCompleto }) {
  return (
    <div className="cadeia-macro-block">
      <div className="cadeia-macro-block-header">
        <div className="cadeia-macro-block-header-left">
          <div className="cadeia-macro-block-icon">
            <Boxes size={14} />
          </div>
          <span className="cadeia-macro-block-label">Macroprocesso {macro.codigo}</span>
          <span className="cadeia-macro-block-name">{macro.nome}</span>
        </div>
        <span className="cadeia-macro-block-count">{macro.processos.length}</span>
      </div>

      {macro.processos.length > 0 && (
        <div className="cadeia-macro-block-processos">
          {macro.processos.map(p => (
            <ProcessoMiniCard key={p.id} processo={p} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Jornada Section ─────────────────────────────────────────────────────────
function JornadaSection({ jornada, statusIdx }: { jornada: JornadaCompleta; statusIdx: number }) {
  const status: JornadaStatus = JORNADA_STATUSES[statusIdx % JORNADA_STATUSES.length];

  return (
    <div className="cadeia-jornada-section">
      {/* Jornada header row */}
      <div className="cadeia-jornada-row">
        <div className="cadeia-jornada-row-left">
          <div className="cadeia-jornada-row-icon">
            <GitBranch size={16} />
          </div>
          <div className="cadeia-jornada-row-info">
            <span className="cadeia-jornada-row-label">Jornada {jornada.codigo}</span>
            <span className="cadeia-jornada-row-name">{jornada.nome}</span>
          </div>
          <span className={`cadeia-jornada-badge cadeia-jornada-badge--${status}`}>
            {STATUS_LABEL[status]}
          </span>
        </div>
        <div className="cadeia-jornada-row-right">
          <div className="cadeia-jornada-responsavel">
            <div className="cadeia-jornada-avatar-wrap">
              <Avatar className="cadeia-jornada-avatar">
                <AvatarImage src={jornada.responsavel.foto} alt={jornada.responsavel.nome} />
                <AvatarFallback>{getInitials(jornada.responsavel.nome)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="cadeia-jornada-resp-info">
              <span className="cadeia-jornada-resp-name">{jornada.responsavel.nome}</span>
              <span className="cadeia-jornada-resp-role">
                {jornada.responsavel.cargo || 'Product Owner'}
                {jornada.responsavel.area && ` • ${jornada.responsavel.area}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Macroprocessos */}
      <div className="cadeia-macros-list">
        {jornada.macroprocessos.map(macro => (
          <MacroBlock key={macro.id} macro={macro} />
        ))}
      </div>
    </div>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────
interface SummaryCardProps {
  dominio: DominioCompleto;
  buNome: string;
  vpNome: string;
  totalMacros: number;
  totalProcessos: number;
}

function SummaryCard({ dominio, buNome, vpNome, totalMacros, totalProcessos }: SummaryCardProps) {
  return (
    <div className="cadeia-summary-card">
      <div className="cadeia-summary-top">
        <div className="cadeia-summary-top-left">
          <span className="cadeia-summary-eyebrow">CADEIA DE VALOR • DOMÍNIO</span>
          <h2 className="cadeia-summary-title">{dominio.nome}</h2>
          <span className="cadeia-summary-code">{dominio.codigo}</span>
        </div>
        <span className="cadeia-summary-status cadeia-summary-status--desatualizado">Desatualizado</span>
      </div>

      <div className="cadeia-summary-chips">
        <div className="cadeia-summary-chip">
          <Building2 size={14} />
          <span>{buNome}</span>
        </div>
        <div className="cadeia-summary-chip">
          <Users size={14} />
          <span>{vpNome}</span>
        </div>
      </div>

      <div className="cadeia-summary-stats">
        <div className="cadeia-summary-stat">
          <span className="cadeia-summary-stat-value">{dominio.jornadas.length}</span>
          <span className="cadeia-summary-stat-label">Jornadas</span>
        </div>
        <div className="cadeia-summary-stat-divider" />
        <div className="cadeia-summary-stat">
          <span className="cadeia-summary-stat-value">{totalMacros}</span>
          <span className="cadeia-summary-stat-label">Macroprocessos</span>
        </div>
        <div className="cadeia-summary-stat-divider" />
        <div className="cadeia-summary-stat">
          <span className="cadeia-summary-stat-value">{totalProcessos}</span>
          <span className="cadeia-summary-stat-label">Processos</span>
        </div>
      </div>

      <div className="cadeia-summary-divider" />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
interface CadeiaDeValorViewProps {
  dominio: DominioCompleto;
  buNome?: string;
  vpNome?: string;
}

export function CadeiaDeValorView({ dominio, buNome = 'Business Unit', vpNome = '(VPTECH) EQUIPE PÓS E OPM' }: CadeiaDeValorViewProps) {
  const allMacros = dominio.jornadas.flatMap(j => j.macroprocessos);
  const totalMacros = allMacros.length;
  const totalProcessos = allMacros.reduce((acc, m) => acc + m.processos.length, 0);

  return (
    <div className="cadeia-de-valor">
      <SummaryCard
        dominio={dominio}
        buNome={buNome}
        vpNome={vpNome}
        totalMacros={totalMacros}
        totalProcessos={totalProcessos}
      />

      <div className="cadeia-jornadas">
        {dominio.jornadas.map((jornada, idx) => (
          <JornadaSection key={jornada.id} jornada={jornada} statusIdx={idx} />
        ))}
      </div>
    </div>
  );
}
