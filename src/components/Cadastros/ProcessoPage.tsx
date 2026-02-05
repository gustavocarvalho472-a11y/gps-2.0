/**
 * GPS 2.0 - Processo Page (Cadastros)
 * Página de visualização detalhada de um processo
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, Route, GitBranch, Boxes, Building2, Users, MoreHorizontal, Eye, Grid3X3, Workflow, CheckCircle2, Circle, User, UserCheck, Bell, Play } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { ProcessoDetalhado } from '../../types';
import './ProcessoPage.css';

interface ProcessoPageProps {
  processo: ProcessoDetalhado;
  onBack: () => void;
}

// Mock data para matriz DERI
const mockDeriData = [
  {
    atividade: 'Análise de requisitos',
    decisao: ['Gerente de Produto'],
    execucao: ['Analista de Negócios', 'Analista de Sistemas'],
    responsavel: ['Tech Lead'],
    informado: ['Stakeholders', 'Equipe de QA']
  },
  {
    atividade: 'Desenvolvimento',
    decisao: ['Tech Lead'],
    execucao: ['Desenvolvedores'],
    responsavel: ['Tech Lead'],
    informado: ['Gerente de Produto', 'QA']
  },
  {
    atividade: 'Testes e Validação',
    decisao: ['QA Lead'],
    execucao: ['Equipe de QA'],
    responsavel: ['QA Lead'],
    informado: ['Tech Lead', 'Desenvolvedores']
  },
  {
    atividade: 'Aprovação e Deploy',
    decisao: ['Gerente de TI'],
    execucao: ['DevOps'],
    responsavel: ['Tech Lead'],
    informado: ['Todos os stakeholders']
  }
];

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

export function ProcessoPage({ processo, onBack }: ProcessoPageProps) {
  const [activeTab, setActiveTab] = useState<'deri' | 'bpmn'>('deri');

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

      {/* Tabs de visualização */}
      <div className="processo-tabs">
        <button
          className={`processo-tab ${activeTab === 'deri' ? 'processo-tab--active' : ''}`}
          onClick={() => setActiveTab('deri')}
        >
          <Grid3X3 size={18} />
          Matriz DERI
        </button>
        <button
          className={`processo-tab ${activeTab === 'bpmn' ? 'processo-tab--active' : ''}`}
          onClick={() => setActiveTab('bpmn')}
        >
          <Workflow size={18} />
          Fluxo BPMN
        </button>
      </div>

      {/* Conteúdo das tabs */}
      {activeTab === 'deri' && (
        <div className="processo-deri-section">
          <div className="processo-section-header">
            <Grid3X3 size={20} />
            <h2>Matriz DERI - Responsabilidades</h2>
          </div>
          <p className="processo-section-desc">
            Matriz de responsabilidades definindo quem Decide, Executa, é Responsável e deve ser Informado em cada atividade.
          </p>

          <div className="deri-legend">
            <div className="deri-legend-item">
              <span className="deri-badge deri-badge--d">D</span>
              <span>Decisão</span>
            </div>
            <div className="deri-legend-item">
              <span className="deri-badge deri-badge--e">E</span>
              <span>Execução</span>
            </div>
            <div className="deri-legend-item">
              <span className="deri-badge deri-badge--r">R</span>
              <span>Responsável</span>
            </div>
            <div className="deri-legend-item">
              <span className="deri-badge deri-badge--i">I</span>
              <span>Informado</span>
            </div>
          </div>

          <div className="deri-table-wrapper">
            <table className="deri-table">
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th>
                    <div className="deri-header">
                      <User size={14} />
                      Decisão (D)
                    </div>
                  </th>
                  <th>
                    <div className="deri-header">
                      <Play size={14} />
                      Execução (E)
                    </div>
                  </th>
                  <th>
                    <div className="deri-header">
                      <UserCheck size={14} />
                      Responsável (R)
                    </div>
                  </th>
                  <th>
                    <div className="deri-header">
                      <Bell size={14} />
                      Informado (I)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockDeriData.map((row, index) => (
                  <tr key={index}>
                    <td className="deri-atividade">{row.atividade}</td>
                    <td>
                      <div className="deri-cell">
                        {row.decisao.map((pessoa, i) => (
                          <span key={i} className="deri-pessoa deri-pessoa--d">{pessoa}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="deri-cell">
                        {row.execucao.map((pessoa, i) => (
                          <span key={i} className="deri-pessoa deri-pessoa--e">{pessoa}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="deri-cell">
                        {row.responsavel.map((pessoa, i) => (
                          <span key={i} className="deri-pessoa deri-pessoa--r">{pessoa}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="deri-cell">
                        {row.informado.map((pessoa, i) => (
                          <span key={i} className="deri-pessoa deri-pessoa--i">{pessoa}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
    </div>
  );
}
