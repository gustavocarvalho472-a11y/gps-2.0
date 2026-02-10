/**
 * GPS 2.0 - Processo Page (Cadastros)
 * Página de visualização detalhada de um processo
 * Inclui abas: Fluxo BPMN, Lista de Atividades, SIPOC
 */

import { useState } from 'react';
import {
  ArrowLeft, ChevronRight, Route, GitBranch, Boxes, Building2, Users,
  MoreHorizontal, Eye, Workflow, CheckCircle2, Circle, List, FileText,
  ClipboardList, ArrowRight, Package, Box, UserCheck
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { ProcessoDetalhado } from '../../types';
import './ProcessoPage.css';

interface ProcessoPageProps {
  processo: ProcessoDetalhado;
  onBack: () => void;
}

// Mock data para etapas BPMN
const mockBpmnSteps = [
  { id: 1, tipo: 'inicio', nome: 'Início', status: 'concluido' },
  { id: 2, tipo: 'tarefa', nome: 'Receber Solicitação', status: 'concluido' },
  { id: 3, tipo: 'gateway', nome: 'Validar Dados?', status: 'concluido' },
  { id: 4, tipo: 'tarefa', nome: 'Processar Informações', status: 'em_andamento' },
  { id: 5, tipo: 'tarefa', nome: 'Aprovar Resultado', status: 'pendente' },
  { id: 6, tipo: 'gateway', nome: 'Aprovado?', status: 'pendente' },
  { id: 7, tipo: 'tarefa', nome: 'Finalizar Processo', status: 'pendente' },
  { id: 8, tipo: 'fim', nome: 'Fim', status: 'pendente' }
];

// Mock data para lista de subprocessos/atividades
const mockListaAtividades = [
  { id: 1, codigo: 'ATI-001', nome: 'Receber solicitação do cliente', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Atendimento' },
  { id: 2, codigo: 'ATI-002', nome: 'Validar dados cadastrais', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Cadastro' },
  { id: 3, codigo: 'ATI-003', nome: 'Verificar documentação', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Compliance' },
  { id: 4, codigo: 'ATI-004', nome: 'Analisar crédito', tipo: 'atividade', status: 'desatualizado', responsavel: 'Analista de Crédito' },
  { id: 5, codigo: 'ATI-005', nome: 'Aprovar ou rejeitar proposta', tipo: 'decisao', status: 'atualizado', responsavel: 'Gerente de Operações' },
  { id: 6, codigo: 'ATI-006', nome: 'Gerar contrato', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Contratos' },
  { id: 7, codigo: 'ATI-007', nome: 'Coletar assinaturas', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Contratos' },
  { id: 8, codigo: 'ATI-008', nome: 'Registrar operação', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Backoffice' },
  { id: 9, codigo: 'ATI-009', nome: 'Notificar cliente', tipo: 'atividade', status: 'desatualizado', responsavel: 'Sistema Automático' },
  { id: 10, codigo: 'ATI-010', nome: 'Arquivar documentos', tipo: 'atividade', status: 'atualizado', responsavel: 'Analista de Documentação' },
];

// Mock data SIPOC
const mockSIPOC = {
  supplier: 'Cliente, Sistema de CRM, Equipe Comercial',
  input: 'Solicitação de crédito, Dados cadastrais, Documentos pessoais',
  processSteps: [
    'Receber solicitação do cliente',
    'Validar dados cadastrais no sistema',
    'Verificar documentação e compliance',
    'Analisar perfil de crédito',
    'Aprovar ou rejeitar proposta',
    'Gerar contrato e coletar assinaturas',
    'Registrar operação no sistema',
    'Notificar cliente sobre resultado'
  ],
  output: 'Contrato assinado, Operação registrada, Notificação enviada',
  customer: 'Cliente final, Área Financeira, Compliance'
};

// Cores SIPOC
const SIPOC_COLORS = {
  S: { bg: '#EEF2FF', border: '#818CF8', text: '#4338CA' },
  I: { bg: '#FFFBEB', border: '#F59E0B', text: '#B45309' },
  P: { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8' },
  O: { bg: '#ECFDF5', border: '#10B981', text: '#047857' },
  C: { bg: '#FDF2F8', border: '#F472B6', text: '#BE185D' },
};

export function ProcessoPage({ processo, onBack }: ProcessoPageProps) {
  const [activeTab, setActiveTab] = useState<'bpmn' | 'lista' | 'sipoc'>('bpmn');

  // Determinar tags de status
  const isAtualizado = processo.status === 'ativo';
  const isCritico = processo.criticidade === 'critico' || processo.criticidade === 'alta';

  // Formatar datas
  const formatDate = (dateString?: string) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="processo-page">
      {/* Header com Breadcrumb */}
      <header className="processo-header">
        <div className="processo-header-nav">
          <button className="processo-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
          <nav className="processo-breadcrumb">
            <span>Cadastros</span>
            <ChevronRight size={16} />
            <span>Processos</span>
            <ChevronRight size={16} />
            <span className="processo-breadcrumb-current">{processo.nome}</span>
          </nav>
        </div>
      </header>

      {/* Card Principal */}
      <div className="processo-card">
        {/* Cabeçalho do Card */}
        <div className="processo-card-header">
          <div className="processo-card-info">
            <span className="processo-card-type">Processo</span>
            <h1 className="processo-card-title">{processo.nome}</h1>
            <span className="processo-card-code">{processo.codigo}</span>
          </div>

          <div className="processo-card-actions">
            {isCritico && (
              <span className="processo-tag processo-tag--critico">Crítico</span>
            )}
            <span className={`processo-tag processo-tag--${isAtualizado ? 'atualizado' : 'desatualizado'}`}>
              {isAtualizado ? 'Atualizado' : 'Desatualizado'}
            </span>
            <button className="processo-more-btn">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Hierarquia */}
        <div className="processo-hierarchy">
          {processo.dominio && (
            <div className="processo-hierarchy-item">
              <div className="processo-hierarchy-icon processo-hierarchy-icon--dominio">
                <Route size={18} />
              </div>
              <div className="processo-hierarchy-info">
                <span className="processo-hierarchy-label">Domínio</span>
                <span className="processo-hierarchy-value">
                  {processo.dominio.codigo} - {processo.dominio.nome}
                </span>
              </div>
            </div>
          )}

          {processo.jornada && (
            <div className="processo-hierarchy-item">
              <div className="processo-hierarchy-icon processo-hierarchy-icon--jornada">
                <GitBranch size={18} />
              </div>
              <div className="processo-hierarchy-info">
                <span className="processo-hierarchy-label">Jornada</span>
                <span className="processo-hierarchy-value">
                  {processo.jornada.codigo} - {processo.jornada.nome}
                </span>
              </div>
            </div>
          )}

          {processo.macroprocesso && (
            <div className="processo-hierarchy-item">
              <div className="processo-hierarchy-icon processo-hierarchy-icon--macro">
                <Boxes size={18} />
              </div>
              <div className="processo-hierarchy-info">
                <span className="processo-hierarchy-label">Macroprocesso</span>
                <span className="processo-hierarchy-value">
                  {processo.macroprocesso.codigo} - {processo.macroprocesso.nome}
                </span>
              </div>
            </div>
          )}

          {processo.bu && (
            <div className="processo-hierarchy-item">
              <div className="processo-hierarchy-icon processo-hierarchy-icon--bu">
                <Building2 size={18} />
              </div>
              <div className="processo-hierarchy-info">
                <span className="processo-hierarchy-label">Business Unit</span>
                <span className="processo-hierarchy-value">{processo.bu.nome}</span>
              </div>
            </div>
          )}

          {processo.vp && (
            <div className="processo-hierarchy-item">
              <div className="processo-hierarchy-icon processo-hierarchy-icon--vp">
                <Users size={18} />
              </div>
              <div className="processo-hierarchy-info">
                <span className="processo-hierarchy-label">VP</span>
                <span className="processo-hierarchy-value">{processo.vp.nome}</span>
              </div>
            </div>
          )}
        </div>

        {/* Responsável e Ações */}
        <div className="processo-responsavel-section">
          {processo.responsavel && (
            <div className="processo-responsavel">
              <div className="processo-responsavel-avatar">
                <Avatar className="processo-avatar">
                  <AvatarImage src={processo.responsavel.foto} alt={processo.responsavel.nome} />
                  <AvatarFallback>
                    {processo.responsavel.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="processo-responsavel-info">
                <span className="processo-responsavel-label">Responsável</span>
                <span className="processo-responsavel-name">{processo.responsavel.nome}</span>
                <span className="processo-responsavel-details">
                  {processo.responsavel.cargo}
                  {processo.responsavel.area && ` • ${processo.responsavel.area}`}
                </span>
              </div>
            </div>
          )}

          <button className="processo-action-btn">
            <Eye size={16} />
            Visualizar aprovações
          </button>
        </div>

        {/* Footer com datas */}
        <div className="processo-footer">
          <span className="processo-date">Criado em {formatDate(processo.criadoEm)}</span>
          <span className="processo-date">Última atualização em {formatDate(processo.atualizadoEm)}</span>
        </div>
      </div>

      {/* Toggle de visualização - layout consistente com outras páginas */}
      <div className="processo-view-toggle">
        <span className="processo-view-label">Visualização</span>
        <div className="processo-view-options">
          <button
            className={`processo-view-btn ${activeTab === 'bpmn' ? 'processo-view-btn--active' : ''}`}
            onClick={() => setActiveTab('bpmn')}
          >
            <Workflow size={16} />
            <span>Fluxo BPMN</span>
          </button>
          <button
            className={`processo-view-btn ${activeTab === 'lista' ? 'processo-view-btn--active' : ''}`}
            onClick={() => setActiveTab('lista')}
          >
            <List size={16} />
            <span>Lista de Atividades</span>
          </button>
          <button
            className={`processo-view-btn ${activeTab === 'sipoc' ? 'processo-view-btn--active' : ''}`}
            onClick={() => setActiveTab('sipoc')}
          >
            <ClipboardList size={16} />
            <span>SIPOC</span>
          </button>
        </div>
      </div>

      {/* Conteúdo das tabs */}
      {activeTab === 'bpmn' && (
        <div className="processo-bpmn-section">
          <div className="processo-section-header">
            <Workflow size={20} />
            <h2>Fluxo do Processo (BPMN)</h2>
          </div>
          <p className="processo-section-desc">
            Visualização do fluxo de atividades do processo seguindo a notação BPMN.
          </p>

          <div className="bpmn-legend">
            <div className="bpmn-legend-item">
              <div className="bpmn-icon bpmn-icon--inicio"><Circle size={12} /></div>
              <span>Início/Fim</span>
            </div>
            <div className="bpmn-legend-item">
              <div className="bpmn-icon bpmn-icon--tarefa"></div>
              <span>Tarefa</span>
            </div>
            <div className="bpmn-legend-item">
              <div className="bpmn-icon bpmn-icon--gateway"></div>
              <span>Gateway (Decisão)</span>
            </div>
          </div>

          <div className="bpmn-flow-container">
            <div className="bpmn-flow">
              {mockBpmnSteps.map((step, index) => (
                <div key={step.id} className="bpmn-step-wrapper">
                  <div className={`bpmn-step bpmn-step--${step.tipo} bpmn-step--${step.status}`}>
                    {step.tipo === 'inicio' && <Circle size={24} />}
                    {step.tipo === 'fim' && <CheckCircle2 size={24} />}
                    {step.tipo === 'tarefa' && <span className="bpmn-step-name">{step.nome}</span>}
                    {step.tipo === 'gateway' && <span className="bpmn-step-name">{step.nome}</span>}
                  </div>
                  {step.tipo !== 'inicio' && step.tipo !== 'fim' && (
                    <span className="bpmn-step-label">{step.nome}</span>
                  )}
                  {index < mockBpmnSteps.length - 1 && (
                    <div className={`bpmn-connector bpmn-connector--${step.status}`}>
                      <ChevronRight size={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bpmn-status-legend">
            <div className="bpmn-status-item">
              <span className="bpmn-status-dot bpmn-status-dot--concluido"></span>
              <span>Concluído</span>
            </div>
            <div className="bpmn-status-item">
              <span className="bpmn-status-dot bpmn-status-dot--em_andamento"></span>
              <span>Em Andamento</span>
            </div>
            <div className="bpmn-status-item">
              <span className="bpmn-status-dot bpmn-status-dot--pendente"></span>
              <span>Pendente</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lista' && (
        <div className="processo-lista-section">
          <div className="processo-section-header">
            <List size={20} />
            <h2>Lista de Atividades</h2>
          </div>
          <p className="processo-section-desc">
            Visualização em lista das atividades que compõem este processo.
          </p>

          <div className="lista-table-wrapper">
            <div className="lista-table">
              {/* Header */}
              <div className="lista-row lista-row--header">
                <div className="lista-cell lista-cell--status"></div>
                <div className="lista-cell lista-cell--codigo">Código</div>
                <div className="lista-cell lista-cell--nome">Atividade</div>
                <div className="lista-cell lista-cell--tipo">Tipo</div>
                <div className="lista-cell lista-cell--responsavel">Responsável</div>
                <div className="lista-cell lista-cell--acoes"></div>
              </div>

              {/* Rows */}
              {mockListaAtividades.map((atividade, index) => (
                <div
                  key={atividade.id}
                  className={`lista-row ${index % 2 === 0 ? 'lista-row--even' : 'lista-row--odd'}`}
                >
                  <div className="lista-cell lista-cell--status">
                    <span className={`lista-status-indicator lista-status-indicator--${atividade.status}`}></span>
                  </div>
                  <div className="lista-cell lista-cell--codigo">
                    <span className="lista-codigo">{atividade.codigo}</span>
                  </div>
                  <div className="lista-cell lista-cell--nome">
                    <FileText size={14} className="lista-nome-icon" />
                    <span className="lista-nome">{atividade.nome}</span>
                  </div>
                  <div className="lista-cell lista-cell--tipo">
                    <span className={`lista-tipo lista-tipo--${atividade.tipo}`}>
                      {atividade.tipo === 'decisao' ? 'Decisão' : 'Atividade'}
                    </span>
                  </div>
                  <div className="lista-cell lista-cell--responsavel">
                    <span className="lista-responsavel">{atividade.responsavel}</span>
                  </div>
                  <div className="lista-cell lista-cell--acoes">
                    <button className="lista-action-btn" title="Ver detalhes">
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lista-legend">
            <div className="lista-legend-item">
              <span className="lista-status-indicator lista-status-indicator--atualizado"></span>
              <span>Atualizado</span>
            </div>
            <div className="lista-legend-item">
              <span className="lista-status-indicator lista-status-indicator--desatualizado"></span>
              <span>Desatualizado</span>
            </div>
          </div>
        </div>
      )}

      {/* SIPOC Tab */}
      {activeTab === 'sipoc' && (
        <div className="processo-sipoc-section">
          <div className="processo-section-header">
            <ClipboardList size={20} />
            <h2>Análise SIPOC</h2>
          </div>
          <p className="processo-section-desc">
            Visualização SIPOC (Supplier, Input, Process, Output, Customer) do processo.
          </p>

          {/* SIPOC Blocks */}
          <div className="sipoc-blocks">
            {/* S - Supplier */}
            <div className="sipoc-block" style={{ borderLeftColor: SIPOC_COLORS.S.border }}>
              <div className="sipoc-block-header" style={{ backgroundColor: SIPOC_COLORS.S.bg }}>
                <Users size={20} style={{ color: SIPOC_COLORS.S.text }} />
                <div className="sipoc-block-title">
                  <span className="sipoc-block-letter" style={{ color: SIPOC_COLORS.S.text }}>S</span>
                  <span className="sipoc-block-name">Fornecedor (Supplier)</span>
                </div>
              </div>
              <div className="sipoc-block-content">
                <p>{mockSIPOC.supplier}</p>
              </div>
            </div>

            <div className="sipoc-arrow">
              <ArrowRight size={24} />
            </div>

            {/* I - Input */}
            <div className="sipoc-block" style={{ borderLeftColor: SIPOC_COLORS.I.border }}>
              <div className="sipoc-block-header" style={{ backgroundColor: SIPOC_COLORS.I.bg }}>
                <Package size={20} style={{ color: SIPOC_COLORS.I.text }} />
                <div className="sipoc-block-title">
                  <span className="sipoc-block-letter" style={{ color: SIPOC_COLORS.I.text }}>I</span>
                  <span className="sipoc-block-name">Entrada (Input)</span>
                </div>
              </div>
              <div className="sipoc-block-content">
                <p>{mockSIPOC.input}</p>
              </div>
            </div>

            <div className="sipoc-arrow">
              <ArrowRight size={24} />
            </div>

            {/* P - Process */}
            <div className="sipoc-block sipoc-block--process" style={{ borderLeftColor: SIPOC_COLORS.P.border }}>
              <div className="sipoc-block-header" style={{ backgroundColor: SIPOC_COLORS.P.bg }}>
                <Workflow size={20} style={{ color: SIPOC_COLORS.P.text }} />
                <div className="sipoc-block-title">
                  <span className="sipoc-block-letter" style={{ color: SIPOC_COLORS.P.text }}>P</span>
                  <span className="sipoc-block-name">Processo (Process)</span>
                </div>
              </div>
              <div className="sipoc-block-content">
                <div className="sipoc-process-steps">
                  {mockSIPOC.processSteps.map((step, idx) => (
                    <div key={idx} className="sipoc-step">
                      <div className="sipoc-step-marker">
                        <span className="sipoc-step-num">{idx + 1}</span>
                        {idx < mockSIPOC.processSteps.length - 1 && <div className="sipoc-step-line" />}
                      </div>
                      <span className="sipoc-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sipoc-arrow">
              <ArrowRight size={24} />
            </div>

            {/* O - Output */}
            <div className="sipoc-block" style={{ borderLeftColor: SIPOC_COLORS.O.border }}>
              <div className="sipoc-block-header" style={{ backgroundColor: SIPOC_COLORS.O.bg }}>
                <Box size={20} style={{ color: SIPOC_COLORS.O.text }} />
                <div className="sipoc-block-title">
                  <span className="sipoc-block-letter" style={{ color: SIPOC_COLORS.O.text }}>O</span>
                  <span className="sipoc-block-name">Saída (Output)</span>
                </div>
              </div>
              <div className="sipoc-block-content">
                <p>{mockSIPOC.output}</p>
              </div>
            </div>

            <div className="sipoc-arrow">
              <ArrowRight size={24} />
            </div>

            {/* C - Customer */}
            <div className="sipoc-block" style={{ borderLeftColor: SIPOC_COLORS.C.border }}>
              <div className="sipoc-block-header" style={{ backgroundColor: SIPOC_COLORS.C.bg }}>
                <UserCheck size={20} style={{ color: SIPOC_COLORS.C.text }} />
                <div className="sipoc-block-title">
                  <span className="sipoc-block-letter" style={{ color: SIPOC_COLORS.C.text }}>C</span>
                  <span className="sipoc-block-name">Cliente (Customer)</span>
                </div>
              </div>
              <div className="sipoc-block-content">
                <p>{mockSIPOC.customer}</p>
              </div>
            </div>
          </div>

          {/* SIPOC Legend */}
          <div className="sipoc-legend">
            <div className="sipoc-legend-item">
              <span className="sipoc-legend-dot" style={{ backgroundColor: SIPOC_COLORS.S.border }}></span>
              <span>Supplier - Quem fornece os insumos</span>
            </div>
            <div className="sipoc-legend-item">
              <span className="sipoc-legend-dot" style={{ backgroundColor: SIPOC_COLORS.I.border }}></span>
              <span>Input - O que entra no processo</span>
            </div>
            <div className="sipoc-legend-item">
              <span className="sipoc-legend-dot" style={{ backgroundColor: SIPOC_COLORS.P.border }}></span>
              <span>Process - Etapas executadas</span>
            </div>
            <div className="sipoc-legend-item">
              <span className="sipoc-legend-dot" style={{ backgroundColor: SIPOC_COLORS.O.border }}></span>
              <span>Output - O que o processo produz</span>
            </div>
            <div className="sipoc-legend-item">
              <span className="sipoc-legend-dot" style={{ backgroundColor: SIPOC_COLORS.C.border }}></span>
              <span>Customer - Quem recebe o resultado</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
