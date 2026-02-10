/**
 * GPS 2.0 - Organogram View Component
 * Visualização hierárquica em TELA CHEIA com zoom e pan
 * Cards mostram: Nome, Cargo/Área, Artefato com métricas
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ChevronDown, ChevronRight, X, ZoomIn, ZoomOut, Maximize2, Minimize2,
  Building2, Route, GitBranch, Boxes, FileText, ExternalLink, Search, Home,
  Mail, Calendar, MapPin, Briefcase, Clock, Cake, Users
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type {
  BusinessUnit, DominioCompleto, JornadaCompleta,
  MacroprocessoCompleto, Processo, VP
} from '../../types';
import { vps } from '../../data/organizationData';
import './OrganogramView.css';

interface OrganogramViewProps {
  businessUnits: BusinessUnit[];
  onSelectBU?: (bu: BusinessUnit) => void;
  onSelectDominio?: (dominio: DominioCompleto) => void;
  onSelectJornada?: (jornada: JornadaCompleta) => void;
  onSelectMacro?: (macro: MacroprocessoCompleto) => void;
  onSelectProcesso?: (processo: Processo) => void;
}

// CEO Data
const ceo = {
  id: 'ceo-1',
  nome: 'Roberto Valério',
  cargo: 'CEO',
  area: 'Presidência Executiva',
  foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  cor: '#7C3AED',
  email: 'roberto.valerio@cogna.com.br',
  matricula: '079001000001',
  status: 'ATIVO',
  dataAdmissao: '15/01/2010',
  tempoEmpresa: '15 anos',
  localTrabalho: 'EC - COGNA - SP - SÃO PAULO - PAULISTA',
  modalidadeTrabalho: 'Presencial',
  diasSemana: 'Segunda a Sexta',
  aniversario: '12/03',
};

// Helper para obter iniciais
function getInitials(nome: string): string {
  return nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

// Tipo do layout
type LayoutMode = 'horizontal' | 'vertical';

// Estado de expansão por nível
interface ExpandedNodes {
  [key: string]: boolean;
}

// Tipo para pessoa com dados completos
interface PersonProfile {
  nome: string;
  cargo?: string;
  area?: string;
  foto?: string;
  email?: string;
  matricula?: string;
  status?: string;
  dataAdmissao?: string;
  tempoEmpresa?: string;
  localTrabalho?: string;
  modalidadeTrabalho?: string;
  diasSemana?: string;
  aniversario?: string;
}

// ========================================
// PROFILE MODAL - Modal de perfil detalhado
// ========================================
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'ceo' | 'vp' | 'bu' | 'dominio' | 'jornada' | 'macro' | 'processo' | null;
  data: any;
  onOpenFullPage?: () => void;
}

function ProfileModal({ isOpen, onClose, type, data, onOpenFullPage }: ProfileModalProps) {
  if (!isOpen || !data) return null;

  const getColor = () => {
    switch (type) {
      case 'ceo': return '#7C3AED';
      case 'vp': return '#7C3AED';
      case 'bu': return data.cor || '#9755FE';
      case 'dominio': return '#0EA5E9';
      case 'jornada': return '#22C55E';
      case 'macro': return '#F59E0B';
      case 'processo': return '#EC4899';
      default: return '#9755FE';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'ceo': return 'Presidência';
      case 'vp': return 'Vice-Presidente';
      case 'bu': return 'Business Unit';
      case 'dominio': return 'Domínio';
      case 'jornada': return 'Jornada';
      case 'macro': return 'Macroprocesso';
      case 'processo': return 'Processo';
      default: return '';
    }
  };

  // Dados da pessoa (responsável ou próprio)
  const person: PersonProfile = data.responsavel || data;
  const artefatoNome = data.nome || '';
  const artefatoCodigo = data.codigo || '';

  // Métricas do artefato
  const metrics = [];
  if (data.totalDominios !== undefined) metrics.push(`${data.totalDominios} Domínios`);
  if (data.totalJornadas !== undefined) metrics.push(`${data.totalJornadas} Jornadas`);
  if (data.totalMacroprocessos !== undefined) metrics.push(`${data.totalMacroprocessos} Macroprocessos`);
  if (data.totalProcessos !== undefined) metrics.push(`${data.totalProcessos} Processos`);

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header com tipo e cor */}
        <div className="profile-modal-header" style={{ borderLeftColor: getColor() }}>
          <div className="profile-modal-header-content">
            <span className="profile-modal-type" style={{ color: getColor() }}>
              {getTypeLabel().toUpperCase()}
            </span>
            {artefatoCodigo && (
              <span className="profile-modal-codigo">{artefatoCodigo}</span>
            )}
          </div>
          <div className="profile-modal-header-actions">
            <span className={`profile-modal-status profile-modal-status--${(person.status || 'ATIVO').toLowerCase()}`}>
              {person.status || 'ATIVO'}
            </span>
            <button className="profile-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="profile-modal-body">
          {/* Foto e info básica */}
          <div className="profile-modal-hero">
            <Avatar className="profile-modal-avatar">
              {person.foto && <AvatarImage src={person.foto} alt={person.nome} />}
              <AvatarFallback style={{ backgroundColor: getColor(), color: '#fff', fontSize: '32px' }}>
                {getInitials(person.nome || '')}
              </AvatarFallback>
            </Avatar>
            <div className="profile-modal-person">
              <h2 className="profile-modal-name">{person.nome}</h2>
              <p className="profile-modal-cargo">{person.cargo || person.area || data.cargo}</p>
              {person.matricula && (
                <span className="profile-modal-matricula">{person.matricula}</span>
              )}
            </div>
          </div>

          {/* Artefato info */}
          {type !== 'ceo' && type !== 'vp' && (
            <div className="profile-modal-artefato">
              <div className="profile-modal-artefato-header">
                <span className="profile-modal-artefato-label">Responsável por</span>
              </div>
              <div className="profile-modal-artefato-content">
                <span className="profile-modal-artefato-nome">{artefatoNome}</span>
                {metrics.length > 0 && (
                  <span className="profile-modal-artefato-metrics">
                    {metrics.join(' • ')}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Contato */}
          <div className="profile-modal-section">
            <div className="profile-modal-row">
              <Mail size={16} />
              <span>{person.email || `${person.nome?.split(' ')[0].toLowerCase()}.${person.nome?.split(' ').slice(-1)[0].toLowerCase()}@cogna.com.br`}</span>
            </div>
          </div>

          {/* Informações de trabalho */}
          <div className="profile-modal-grid">
            <div className="profile-modal-info-card">
              <div className="profile-modal-info-icon">
                <Calendar size={16} />
              </div>
              <div className="profile-modal-info-content">
                <span className="profile-modal-info-label">Admitido dia</span>
                <span className="profile-modal-info-value">{person.dataAdmissao || '01/01/2020'}</span>
              </div>
            </div>
            <div className="profile-modal-info-card">
              <div className="profile-modal-info-icon">
                <Clock size={16} />
              </div>
              <div className="profile-modal-info-content">
                <span className="profile-modal-info-label">Tempo de Empresa</span>
                <span className="profile-modal-info-value">{person.tempoEmpresa || '5 anos'}</span>
              </div>
            </div>
          </div>

          <div className="profile-modal-section profile-modal-section--full">
            <div className="profile-modal-row profile-modal-row--block">
              <MapPin size={16} />
              <div>
                <span className="profile-modal-row-label">Local de Trabalho</span>
                <span className="profile-modal-row-value">{person.localTrabalho || 'EC - COGNA - SP - SÃO PAULO - PAULISTA'}</span>
              </div>
            </div>
          </div>

          <div className="profile-modal-grid">
            <div className="profile-modal-info-card profile-modal-info-card--light">
              <div className="profile-modal-info-icon">
                <Briefcase size={16} />
              </div>
              <div className="profile-modal-info-content">
                <span className="profile-modal-info-label">Modalidade de Trabalho</span>
                <span className="profile-modal-info-value">{person.modalidadeTrabalho || 'Híbrido'}</span>
              </div>
            </div>
            <div className="profile-modal-info-card profile-modal-info-card--light">
              <div className="profile-modal-info-icon">
                <Calendar size={16} />
              </div>
              <div className="profile-modal-info-content">
                <span className="profile-modal-info-label">Dias da Semana</span>
                <span className="profile-modal-info-value">{person.diasSemana || 'Segunda - Quarta - Quinta'}</span>
              </div>
            </div>
          </div>

          {/* Aniversário */}
          <div className="profile-modal-birthday">
            <Cake size={18} />
            <div>
              <span className="profile-modal-birthday-label">Aniversário</span>
              <span className="profile-modal-birthday-value">{person.aniversario || '01/01'}</span>
            </div>
          </div>

          {/* Stats do artefato (se não for pessoa) */}
          {metrics.length > 0 && (
            <div className="profile-modal-stats">
              {data.totalDominios !== undefined && (
                <div className="profile-modal-stat">
                  <span className="profile-modal-stat-value">{data.totalDominios}</span>
                  <span className="profile-modal-stat-label">Domínios</span>
                </div>
              )}
              {data.totalJornadas !== undefined && (
                <div className="profile-modal-stat">
                  <span className="profile-modal-stat-value">{data.totalJornadas}</span>
                  <span className="profile-modal-stat-label">Jornadas</span>
                </div>
              )}
              {data.totalMacroprocessos !== undefined && (
                <div className="profile-modal-stat">
                  <span className="profile-modal-stat-value">{data.totalMacroprocessos}</span>
                  <span className="profile-modal-stat-label">Macros</span>
                </div>
              )}
              {data.totalProcessos !== undefined && (
                <div className="profile-modal-stat">
                  <span className="profile-modal-stat-value">{data.totalProcessos}</span>
                  <span className="profile-modal-stat-label">Processos</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {onOpenFullPage && (
          <div className="profile-modal-footer">
            <button className="profile-modal-action" onClick={onOpenFullPage}>
              <ExternalLink size={16} />
              Ver página completa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// ORG NODE CARD - Novo design
// ========================================
interface OrgNodeCardProps {
  tipo: 'ceo' | 'vp' | 'bu' | 'dominio' | 'jornada' | 'macro' | 'processo';
  // Dados da pessoa
  pessoaNome: string;
  pessoaCargo?: string;
  pessoaFoto?: string;
  // Dados do artefato
  artefatoCodigo?: string;
  artefatoNome?: string;
  // Métricas
  totalJornadas?: number;
  totalMacros?: number;
  totalProcessos?: number;
  // Outros
  cor?: string;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  layout: LayoutMode;
}

function OrgNodeCard({
  tipo, pessoaNome, pessoaCargo, pessoaFoto, artefatoCodigo, artefatoNome,
  totalJornadas, totalMacros, totalProcessos, cor,
  isExpanded, hasChildren, onToggle, onClick, layout
}: OrgNodeCardProps) {
  const typeColors: Record<string, string> = {
    ceo: '#7C3AED',
    vp: '#7C3AED',
    bu: cor || '#9755FE',
    dominio: '#0EA5E9',
    jornada: '#22C55E',
    macro: '#F59E0B',
    processo: '#EC4899',
  };

  const typeLabels: Record<string, string> = {
    ceo: 'PRESIDÊNCIA',
    vp: 'VP',
    bu: 'BU',
    dominio: 'DOMÍNIO',
    jornada: 'JORNADA',
    macro: 'MACRO',
    processo: 'PROCESSO',
  };

  const bgColor = typeColors[tipo] || '#9755FE';

  // Montar string de métricas
  const metricsItems: string[] = [];
  if (totalJornadas !== undefined && totalJornadas > 0) {
    metricsItems.push(`${totalJornadas} jornadas`);
  }
  if (totalMacros !== undefined && totalMacros > 0) {
    metricsItems.push(`${totalMacros} macros`);
  }
  if (totalProcessos !== undefined && totalProcessos > 0) {
    metricsItems.push(`${totalProcessos} processos`);
  }

  return (
    <div className={`org-card org-card--${tipo} ${layout === 'vertical' ? 'org-card--vertical' : ''}`}>
      <button
        className="org-card-content"
        onClick={onClick}
        type="button"
      >
        <Avatar className="org-card-avatar">
          {pessoaFoto && <AvatarImage src={pessoaFoto} alt={pessoaNome} />}
          <AvatarFallback style={{ backgroundColor: bgColor, color: '#fff' }}>
            {getInitials(pessoaNome)}
          </AvatarFallback>
        </Avatar>
        <div className="org-card-info">
          {/* Tipo badge */}
          <div className="org-card-type-row">
            <span className="org-card-type" style={{ color: bgColor }}>{artefatoCodigo || typeLabels[tipo]}</span>
          </div>
          {/* Nome da pessoa */}
          <span className="org-card-name">{pessoaNome}</span>
          {/* Cargo */}
          {pessoaCargo && <span className="org-card-cargo">{pessoaCargo}</span>}
          {/* Artefato com métricas */}
          {artefatoNome && (
            <span className="org-card-artefato">
              {artefatoNome}
              {metricsItems.length > 0 && (
                <span className="org-card-metrics"> - {metricsItems.join(' - ')}</span>
              )}
            </span>
          )}
        </div>
      </button>
      {hasChildren && (
        <button
          className={`org-card-toggle ${isExpanded ? 'org-card-toggle--expanded' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
          type="button"
        >
          {layout === 'vertical' ? (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
      )}
    </div>
  );
}

// ========================================
// TREE NODES (Recursivos)
// ========================================

// Processo Node
interface ProcessoNodeProps {
  processo: Processo;
  layout: LayoutMode;
  onOpenModal: (type: string, data: any) => void;
}

function ProcessoNode({ processo, layout, onOpenModal }: ProcessoNodeProps) {
  return (
    <div className={`org-tree-node ${layout === 'vertical' ? 'org-tree-node--vertical' : ''}`}>
      <div className="org-tree-connector" />
      <OrgNodeCard
        tipo="processo"
        pessoaNome={processo.responsavel?.nome || 'Não definido'}
        pessoaCargo={processo.responsavel?.cargo}
        pessoaFoto={processo.responsavel?.foto}
        artefatoCodigo={processo.codigo}
        artefatoNome={processo.nome}
        layout={layout}
        onClick={() => onOpenModal('processo', processo)}
      />
    </div>
  );
}

// Macro Node
interface MacroNodeProps {
  macro: MacroprocessoCompleto;
  layout: LayoutMode;
  expanded: ExpandedNodes;
  onToggle: (id: string) => void;
  onOpenModal: (type: string, data: any) => void;
}

function MacroNode({ macro, layout, expanded, onToggle, onOpenModal }: MacroNodeProps) {
  const isExpanded = expanded[macro.id] || false;
  const hasChildren = macro.processos && macro.processos.length > 0;

  return (
    <div className={`org-tree-node ${layout === 'vertical' ? 'org-tree-node--vertical' : ''}`}>
      <div className="org-tree-connector" />
      <div className="org-tree-branch">
        <OrgNodeCard
          tipo="macro"
          pessoaNome={macro.responsavel?.nome || 'Não definido'}
          pessoaCargo={macro.responsavel?.cargo}
          pessoaFoto={macro.responsavel?.foto}
          artefatoCodigo={macro.codigo}
          artefatoNome={macro.nome}
          totalProcessos={macro.totalProcessos}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onToggle={() => onToggle(macro.id)}
          onClick={() => onOpenModal('macro', macro)}
          layout={layout}
        />
        {isExpanded && hasChildren && (
          <div className={`org-tree-children ${layout === 'vertical' ? 'org-tree-children--vertical' : ''}`}>
            {macro.processos.map(processo => (
              <ProcessoNode
                key={processo.id}
                processo={processo}
                layout={layout}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Jornada Node
interface JornadaNodeProps {
  jornada: JornadaCompleta;
  layout: LayoutMode;
  expanded: ExpandedNodes;
  onToggle: (id: string) => void;
  onOpenModal: (type: string, data: any) => void;
}

function JornadaNode({ jornada, layout, expanded, onToggle, onOpenModal }: JornadaNodeProps) {
  const isExpanded = expanded[jornada.id] || false;
  const hasChildren = jornada.macroprocessos && jornada.macroprocessos.length > 0;

  return (
    <div className={`org-tree-node ${layout === 'vertical' ? 'org-tree-node--vertical' : ''}`}>
      <div className="org-tree-connector" />
      <div className="org-tree-branch">
        <OrgNodeCard
          tipo="jornada"
          pessoaNome={jornada.responsavel?.nome || 'Não definido'}
          pessoaCargo={jornada.responsavel?.cargo}
          pessoaFoto={jornada.responsavel?.foto}
          artefatoCodigo={jornada.codigo}
          artefatoNome={jornada.nome}
          totalMacros={jornada.totalMacroprocessos}
          totalProcessos={jornada.totalProcessos}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onToggle={() => onToggle(jornada.id)}
          onClick={() => onOpenModal('jornada', jornada)}
          layout={layout}
        />
        {isExpanded && hasChildren && (
          <div className={`org-tree-children ${layout === 'vertical' ? 'org-tree-children--vertical' : ''}`}>
            {jornada.macroprocessos.map(macro => (
              <MacroNode
                key={macro.id}
                macro={macro}
                layout={layout}
                expanded={expanded}
                onToggle={onToggle}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Dominio Node
interface DominioNodeProps {
  dominio: DominioCompleto;
  layout: LayoutMode;
  expanded: ExpandedNodes;
  onToggle: (id: string) => void;
  onOpenModal: (type: string, data: any) => void;
}

function DominioNode({ dominio, layout, expanded, onToggle, onOpenModal }: DominioNodeProps) {
  const isExpanded = expanded[dominio.id] || false;
  const hasChildren = dominio.jornadas && dominio.jornadas.length > 0;

  return (
    <div className={`org-tree-node ${layout === 'vertical' ? 'org-tree-node--vertical' : ''}`}>
      <div className="org-tree-connector" />
      <div className="org-tree-branch">
        <OrgNodeCard
          tipo="dominio"
          pessoaNome={dominio.responsavel?.nome || 'Não definido'}
          pessoaCargo={dominio.responsavel?.cargo}
          pessoaFoto={dominio.responsavel?.foto}
          artefatoCodigo={dominio.codigo}
          artefatoNome={dominio.nome}
          totalJornadas={dominio.totalJornadas}
          totalMacros={dominio.totalMacroprocessos}
          totalProcessos={dominio.totalProcessos}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onToggle={() => onToggle(dominio.id)}
          onClick={() => onOpenModal('dominio', dominio)}
          layout={layout}
        />
        {isExpanded && hasChildren && (
          <div className={`org-tree-children ${layout === 'vertical' ? 'org-tree-children--vertical' : ''}`}>
            {dominio.jornadas.map(jornada => (
              <JornadaNode
                key={jornada.id}
                jornada={jornada}
                layout={layout}
                expanded={expanded}
                onToggle={onToggle}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// BU Node
interface BUNodeProps {
  bu: BusinessUnit;
  layout: LayoutMode;
  expanded: ExpandedNodes;
  onToggle: (id: string) => void;
  onOpenModal: (type: string, data: any) => void;
}

function BUNode({ bu, layout, expanded, onToggle, onOpenModal }: BUNodeProps) {
  const isExpanded = expanded[bu.id] || false;
  const hasChildren = bu.dominios && bu.dominios.length > 0;

  return (
    <div className={`org-tree-node ${layout === 'vertical' ? 'org-tree-node--vertical' : ''}`}>
      <div className="org-tree-connector" />
      <div className="org-tree-branch">
        <OrgNodeCard
          tipo="bu"
          pessoaNome={bu.responsavel?.nome || 'Não definido'}
          pessoaCargo={bu.responsavel?.cargo || bu.responsavel?.area}
          pessoaFoto={bu.responsavel?.foto}
          artefatoCodigo={bu.codigo}
          artefatoNome={bu.nome}
          totalJornadas={bu.totalJornadas}
          totalMacros={bu.totalMacroprocessos}
          totalProcessos={bu.totalProcessos}
          cor={bu.cor}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onToggle={() => onToggle(bu.id)}
          onClick={() => onOpenModal('bu', bu)}
          layout={layout}
        />
        {isExpanded && hasChildren && (
          <div className={`org-tree-children ${layout === 'vertical' ? 'org-tree-children--vertical' : ''}`}>
            {bu.dominios.map(dominio => (
              <DominioNode
                key={dominio.id}
                dominio={dominio}
                layout={layout}
                expanded={expanded}
                onToggle={onToggle}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// VP Node
interface VPNodeProps {
  vp: VP;
  bus: BusinessUnit[];
  layout: LayoutMode;
  expanded: ExpandedNodes;
  onToggle: (id: string) => void;
  onOpenModal: (type: string, data: any) => void;
}

function VPNode({ vp, bus, layout, expanded, onToggle, onOpenModal }: VPNodeProps) {
  const isExpanded = expanded[vp.id] || false;
  const hasChildren = bus.length > 0;

  // Calcular totais
  const totalBUs = bus.length;
  const totalProcessos = bus.reduce((acc, bu) => acc + bu.totalProcessos, 0);

  return (
    <div className={`org-tree-node ${layout === 'vertical' ? 'org-tree-node--vertical' : ''}`}>
      <div className="org-tree-connector" />
      <div className="org-tree-branch">
        <OrgNodeCard
          tipo="vp"
          pessoaNome={vp.nome}
          pessoaCargo={vp.cargo}
          pessoaFoto={vp.foto}
          artefatoNome={`${totalBUs} Business Units`}
          totalProcessos={totalProcessos}
          cor={vp.cor}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onToggle={() => onToggle(vp.id)}
          onClick={() => onOpenModal('vp', { ...vp, totalBUs, totalProcessos })}
          layout={layout}
        />
        {isExpanded && hasChildren && (
          <div className={`org-tree-children ${layout === 'vertical' ? 'org-tree-children--vertical' : ''}`}>
            {bus.map(bu => (
              <BUNode
                key={bu.id}
                bu={bu}
                layout={layout}
                expanded={expanded}
                onToggle={onToggle}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// MAIN COMPONENT - FULLSCREEN
// ========================================
export function OrganogramView({
  businessUnits,
  onSelectBU,
  onSelectDominio,
  onSelectJornada,
  onSelectMacro,
  onSelectProcesso
}: OrganogramViewProps) {
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Layout mode
  const [layout, setLayout] = useState<LayoutMode>('horizontal');

  // Expanded nodes
  const [expanded, setExpanded] = useState<ExpandedNodes>({});

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Zoom and pan
  const [scale, setScale] = useState(0.7);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);

  // Group BUs by VP
  const busByVP = businessUnits.reduce((acc, bu) => {
    const vpId = bu.vpId;
    if (!acc[vpId]) {
      acc[vpId] = [];
    }
    acc[vpId].push(bu);
    return acc;
  }, {} as Record<string, BusinessUnit[]>);

  // Active VPs
  const activeVPs = vps.filter(vp => busByVP[vp.id]?.length > 0);

  // Totais globais
  const totalProcessos = businessUnits.reduce((acc, bu) => acc + bu.totalProcessos, 0);

  // Toggle expansion
  const handleToggle = useCallback((id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Open modal
  const handleOpenModal = useCallback((type: string, data: any) => {
    setModalType(type);
    setModalData(data);
    setModalOpen(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalType(null);
    setModalData(null);
  }, []);

  // Open full page from modal
  const handleOpenFullPage = useCallback(() => {
    if (!modalType || !modalData) return;
    handleCloseModal();
    setIsFullscreen(false);
    switch (modalType) {
      case 'bu': onSelectBU?.(modalData); break;
      case 'dominio': onSelectDominio?.(modalData); break;
      case 'jornada': onSelectJornada?.(modalData); break;
      case 'macro': onSelectMacro?.(modalData); break;
      case 'processo': onSelectProcesso?.(modalData); break;
    }
  }, [modalType, modalData, onSelectBU, onSelectDominio, onSelectJornada, onSelectMacro, onSelectProcesso, handleCloseModal]);

  // Zoom controls
  const handleZoomIn = () => setScale(s => Math.min(s + 0.1, 2));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.1, 0.2));
  const handleFitScreen = () => {
    setScale(0.5);
    setPosition({ x: 0, y: 0 });
  };
  const handleResetView = () => {
    setScale(0.7);
    setPosition({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale(s => Math.min(Math.max(s + delta, 0.2), 2));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && isFullscreen) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel, isFullscreen]);

  // ESC to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Open fullscreen on mount
  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
    setScale(0.7);
    setPosition({ x: 0, y: 0 });
  };

  // Collapse/Expand all
  const handleCollapseAll = () => {
    setExpanded({});
  };

  const handleExpandFirstLevel = () => {
    const newExpanded: ExpandedNodes = { ceo: true };
    activeVPs.forEach(vp => {
      newExpanded[vp.id] = true;
    });
    setExpanded(newExpanded);
  };

  // Preview card for non-fullscreen mode
  if (!isFullscreen) {
    return (
      <div className="organogram-preview">
        <div className="organogram-preview-card" onClick={handleOpenFullscreen}>
          <div className="organogram-preview-icon">
            <GitBranch size={48} />
          </div>
          <div className="organogram-preview-content">
            <h3 className="organogram-preview-title">Visualizar Organograma</h3>
            <p className="organogram-preview-description">
              Clique para abrir a visualização em tela cheia da hierarquia organizacional
            </p>
            <div className="organogram-preview-stats">
              <span>{activeVPs.length} VPs</span>
              <span>•</span>
              <span>{businessUnits.length} BUs</span>
              <span>•</span>
              <span>{totalProcessos} Processos</span>
            </div>
          </div>
          <Maximize2 className="organogram-preview-expand" size={24} />
        </div>
      </div>
    );
  }

  // Fullscreen view
  return (
    <div className="organogram-fullscreen">
      {/* Header */}
      <header className="organogram-header">
        <div className="organogram-header-left">
          <button className="organogram-back-btn" onClick={() => setIsFullscreen(false)}>
            <Home size={18} />
            <span>Voltar</span>
          </button>
          <div className="organogram-header-divider" />
          <h1 className="organogram-title">Hierarquia Organizacional</h1>
        </div>

        <div className="organogram-header-center">
          <div className="organogram-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar na hierarquia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="organogram-header-right">
          {/* Layout Toggle */}
          <div className="organogram-layout-toggle">
            <span className="organogram-layout-label">Layout</span>
            <div className="organogram-layout-switch">
              <button
                className={`organogram-layout-btn ${layout === 'horizontal' ? 'organogram-layout-btn--active' : ''}`}
                onClick={() => setLayout('horizontal')}
              >
                Horizontal
              </button>
              <button
                className={`organogram-layout-btn ${layout === 'vertical' ? 'organogram-layout-btn--active' : ''}`}
                onClick={() => setLayout('vertical')}
              >
                Vertical
              </button>
            </div>
          </div>

          <div className="organogram-header-divider" />

          {/* Quick actions */}
          <button className="organogram-action-btn" onClick={handleCollapseAll} title="Recolher tudo">
            <Minimize2 size={18} />
          </button>
          <button className="organogram-action-btn" onClick={handleExpandFirstLevel} title="Expandir VPs">
            <Maximize2 size={18} />
          </button>

          <div className="organogram-header-divider" />

          <button className="organogram-close-btn" onClick={() => setIsFullscreen(false)}>
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Legend */}
      <div className="organogram-legend-bar">
        <div className="organogram-legend-items">
          <span className="organogram-legend-item">
            <span className="organogram-legend-dot" style={{ background: '#7C3AED' }} />
            VP
          </span>
          <span className="organogram-legend-item">
            <span className="organogram-legend-dot" style={{ background: '#9755FE' }} />
            BU
          </span>
          <span className="organogram-legend-item">
            <span className="organogram-legend-dot" style={{ background: '#0EA5E9' }} />
            Domínio
          </span>
          <span className="organogram-legend-item">
            <span className="organogram-legend-dot" style={{ background: '#22C55E' }} />
            Jornada
          </span>
          <span className="organogram-legend-item">
            <span className="organogram-legend-dot" style={{ background: '#F59E0B' }} />
            Macro
          </span>
          <span className="organogram-legend-item">
            <span className="organogram-legend-dot" style={{ background: '#EC4899' }} />
            Processo
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`organogram-canvas ${isDragging ? 'organogram-canvas--dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="organogram-content"
          style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
          }}
        >
          <div className={`org-tree ${layout === 'vertical' ? 'org-tree--vertical' : ''}`}>
            {/* CEO */}
            <div className="org-tree-root">
              <OrgNodeCard
                tipo="ceo"
                pessoaNome={ceo.nome}
                pessoaCargo={ceo.area}
                pessoaFoto={ceo.foto}
                artefatoNome={`${activeVPs.length} Vice-Presidentes`}
                totalProcessos={totalProcessos}
                cor={ceo.cor}
                hasChildren={activeVPs.length > 0}
                isExpanded={expanded['ceo'] !== false}
                onToggle={() => handleToggle('ceo')}
                onClick={() => handleOpenModal('ceo', ceo)}
                layout={layout}
              />
            </div>

            {/* VPs */}
            {expanded['ceo'] !== false && activeVPs.length > 0 && (
              <div className={`org-tree-children org-tree-children--root ${layout === 'vertical' ? 'org-tree-children--vertical' : ''}`}>
                {activeVPs.map(vp => (
                  <VPNode
                    key={vp.id}
                    vp={vp}
                    bus={busByVP[vp.id] || []}
                    layout={layout}
                    expanded={expanded}
                    onToggle={handleToggle}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>
            )}
          </div>

          {businessUnits.length === 0 && (
            <div className="organogram-empty">
              <p>Nenhuma Business Unit encontrada</p>
            </div>
          )}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="organogram-zoom-controls">
        <button className="organogram-zoom-btn" onClick={handleFitScreen} title="Ajustar à tela">
          <Maximize2 size={18} />
        </button>
        <button className="organogram-zoom-btn" onClick={handleResetView} title="Zoom padrão">
          <Home size={18} />
        </button>
        <div className="organogram-zoom-divider" />
        <button className="organogram-zoom-btn" onClick={handleZoomOut} title="Diminuir zoom">
          <ZoomOut size={18} />
        </button>
        <span className="organogram-zoom-level">{Math.round(scale * 100)}%</span>
        <button className="organogram-zoom-btn" onClick={handleZoomIn} title="Aumentar zoom">
          <ZoomIn size={18} />
        </button>
      </div>

      {/* Mini Help */}
      <div className="organogram-help">
        <span>Arraste para mover • Scroll para zoom • Clique nos cards para detalhes</span>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        type={modalType as any}
        data={modalData}
        onOpenFullPage={modalType && modalType !== 'ceo' && modalType !== 'vp' ? handleOpenFullPage : undefined}
      />
    </div>
  );
}
